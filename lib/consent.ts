// Cookie consent state (GDPR / ePrivacy). Client-only helpers.
//
// Policy: nothing that sets a cookie or sends data to Google loads before the
// visitor says yes. Google Analytics is only injected after "Sutinku" (accept)
// or an explicit "analytics on" in the settings — Consent Mode "basic". The
// choice is stored in localStorage (strictly necessary, no consent needed) and
// re-asked when CONSENT_VERSION changes or after CONSENT_MAX_AGE_DAYS.

export const CONSENT_KEY = "rk-consent";
export const CONSENT_VERSION = 1;
export const CONSENT_MAX_AGE_DAYS = 180; // re-ask after ~6 months
export const CONSENT_EVENT = "rk-consent-change"; // fired on every change
export const OPEN_SETTINGS_EVENT = "rk-consent-open"; // footer "cookie settings" link

export type Consent = { v: number; analytics: boolean; ts: number };

// The in-memory copy is used only when storage itself is unavailable
// (blocked cookies, some private modes) — never to paper over an empty store.
let memory: string | null = null;
function rawConsent(): string | null {
  try {
    return window.localStorage.getItem(CONSENT_KEY);
  } catch {
    return memory; // storage blocked: fall back to this visit's choice
  }
}

export function parseConsent(raw: string | null): Consent | null {
  if (!raw) return null;
  try {
    const c = JSON.parse(raw) as Consent;
    if (c.v !== CONSENT_VERSION || typeof c.analytics !== "boolean") return null;
    if (Date.now() - c.ts > CONSENT_MAX_AGE_DAYS * 864e5) return null;
    return c;
  } catch {
    return null;
  }
}

export const readConsent = (): Consent | null => parseConsent(rawConsent());

// useSyncExternalStore plumbing. The snapshot is the raw stored string (a
// stable primitive). On the server it is SSR_SNAPSHOT, so nothing consent-
// dependent renders until the browser has read storage — no hydration mismatch.
export const SSR_SNAPSHOT = "__ssr__";
export const consentSnapshot = rawConsent;
export const consentServerSnapshot = () => SSR_SNAPSHOT;
export function subscribeConsent(cb: () => void) {
  const onStorage = (e: StorageEvent) => e.key === CONSENT_KEY && cb();
  window.addEventListener(CONSENT_EVENT, cb);
  window.addEventListener("storage", onStorage); // other tabs
  return () => {
    window.removeEventListener(CONSENT_EVENT, cb);
    window.removeEventListener("storage", onStorage);
  };
}

export function saveConsent(analytics: boolean): Consent {
  const c: Consent = { v: CONSENT_VERSION, analytics, ts: Date.now() };
  memory = JSON.stringify(c);
  try {
    window.localStorage.setItem(CONSENT_KEY, memory);
  } catch {
    // Storage unavailable: the in-memory copy applies for this visit.
  }
  window.dispatchEvent(new CustomEvent<Consent>(CONSENT_EVENT, { detail: c }));
  if (!analytics) clearAnalyticsCookies();
  return c;
}

// Withdrawing consent must stop processing: delete the _ga cookies GA set.
export function clearAnalyticsCookies() {
  const host = window.location.hostname;
  const domains = ["", host, `.${host}`, `.${host.replace(/^www\./, "")}`];
  for (const name of document.cookie.split(";").map((c) => c.split("=")[0].trim())) {
    if (!/^_ga($|_)|^_gid$|^_gat/.test(name)) continue;
    for (const d of domains) {
      document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ""}`;
    }
  }
}
