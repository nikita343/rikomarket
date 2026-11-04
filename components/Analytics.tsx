"use client";

import Script from "next/script";
import { useEffect, useSyncExternalStore } from "react";
import {
  CONSENT_EVENT,
  consentServerSnapshot,
  consentSnapshot,
  parseConsent,
  subscribeConsent,
  type Consent,
} from "@/lib/consent";

// GA4 property "rikomarket.lt" (account "Riko Market"). The built-in ID only
// fires on the live domain, so Vercel previews and localhost never send data.
// NEXT_PUBLIC_GA_ID overrides it and fires wherever it is set.
const DEFAULT_GA_ID = "G-7HGXETF88X";
const LIVE_HOSTS = ["www.rikomarket.lt", "rikomarket.lt"];
// Read inside the component; Next inlines NEXT_PUBLIC_* at build time anyway.
const gaId = (): string | undefined => {
  const fromEnv = process.env.NEXT_PUBLIC_GA_ID;
  if (fromEnv) return fromEnv;
  if (typeof window === "undefined") return undefined;
  return LIVE_HOSTS.includes(window.location.hostname) ? DEFAULT_GA_ID : undefined;
};

type GtagWindow = Window & { gtag?: (...args: unknown[]) => void; [k: `ga-disable-${string}`]: boolean };

// Loads Google Analytics only once the visitor has accepted analytics cookies.
// If consent is withdrawn later, GA is switched off for the rest of the visit
// and its cookies are deleted (lib/consent.ts).
export function Analytics() {
  const GA_ID = gaId();
  const snapshot = useSyncExternalStore(subscribeConsent, consentSnapshot, consentServerSnapshot);
  const allowed = Boolean(parseConsent(snapshot)?.analytics);

  // Once gtag is on the page, a withdrawal must also stop it mid-visit.
  useEffect(() => {
    const onChange = (e: Event) => {
      const ok = (e as CustomEvent<Consent>).detail.analytics;
      const w = window as unknown as GtagWindow;
      const GA_ID = gaId();
      if (!GA_ID) return;
      w[`ga-disable-${GA_ID}`] = !ok;
      w.gtag?.("consent", "update", { analytics_storage: ok ? "granted" : "denied" });
    };
    window.addEventListener(CONSENT_EVENT, onChange);
    return () => window.removeEventListener(CONSENT_EVENT, onChange);
  }, []);

  if (!GA_ID || !allowed) return null;

  return (
    <>
      <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
      <Script id="ga4-init" strategy="afterInteractive">
        {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
window['ga-disable-${GA_ID}'] = false;
gtag('consent', 'default', {
  analytics_storage: 'granted',
  ad_storage: 'denied',
  ad_user_data: 'denied',
  ad_personalization: 'denied'
});
gtag('js', new Date());
gtag('config', '${GA_ID}', {
  allow_google_signals: false,
  allow_ad_personalization_signals: false,
  cookie_expires: 34128000
});`}
      </Script>
    </>
  );
}
