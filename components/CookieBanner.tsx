"use client";

import Link from "next/link";
import { useEffect, useState, useSyncExternalStore } from "react";
import { getDict } from "@/lib/dictionary";
import { localeHref, type Locale } from "@/lib/i18n";
import {
  OPEN_SETTINGS_EVENT,
  SSR_SNAPSHOT,
  consentServerSnapshot,
  consentSnapshot,
  parseConsent,
  readConsent,
  saveConsent,
  subscribeConsent,
} from "@/lib/consent";

// GDPR cookie notice. "Accept" and "Reject" are equal, side by side, one click
// each (EDPB guidance: refusing must be as easy as accepting). Nothing
// optional is pre-ticked. The footer "Cookie settings" link reopens it.
export function CookieBanner({ locale }: { locale: Locale }) {
  const t = getDict(locale).consent;
  const snapshot = useSyncExternalStore(subscribeConsent, consentSnapshot, consentServerSnapshot);
  const undecided = snapshot !== SSR_SNAPSHOT && !parseConsent(snapshot);
  const [reopened, setReopened] = useState(false); // footer "cookie settings"
  const [details, setDetails] = useState(false);
  const [analytics, setAnalytics] = useState(false);

  useEffect(() => {
    const reopen = () => {
      setAnalytics(Boolean(readConsent()?.analytics));
      setDetails(true);
      setReopened(true);
    };
    window.addEventListener(OPEN_SETTINGS_EVENT, reopen);
    return () => window.removeEventListener(OPEN_SETTINGS_EVENT, reopen);
  }, []);

  if (!undecided && !reopened) return null;

  const choose = (value: boolean) => {
    saveConsent(value);
    setReopened(false);
    setDetails(false);
  };

  const btn =
    "inline-flex flex-1 items-center justify-center rounded-[4px] px-4 py-3 text-[13px] font-bold tracking-[0.04em] transition-colors sm:flex-none";

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-labelledby="rk-consent-title"
      className="fixed inset-x-3 bottom-3 z-[60] mx-auto max-w-[560px] rounded-[6px] border border-line bg-white p-5 text-ink shadow-[0_18px_50px_rgba(20,35,58,0.28)] sm:inset-x-auto sm:left-5 sm:bottom-5 sm:p-6"
    >
      <h2 id="rk-consent-title" className="text-[16px] font-extrabold text-navy">
        {t.title}
      </h2>
      <p className="mt-2 text-[13.5px] leading-relaxed text-mute">
        {t.text}{" "}
        <Link href={localeHref(locale, "/privacy")} className="font-semibold text-navy underline underline-offset-2 hover:text-red">
          {t.policyLink}
        </Link>
      </p>

      {details && (
        <div className="mt-4 grid gap-2.5">
          <label className="flex items-start gap-3 rounded-[4px] border border-line-soft bg-bg p-3">
            <input type="checkbox" checked disabled className="mt-0.5 h-4 w-4 accent-navy" />
            <span>
              <span className="block text-[13.5px] font-bold text-navy">{t.necessary}</span>
              <span className="block text-[12.5px] leading-snug text-mute">{t.necessaryDesc}</span>
            </span>
          </label>
          <label className="flex cursor-pointer items-start gap-3 rounded-[4px] border border-line-soft bg-bg p-3">
            <input
              type="checkbox"
              checked={analytics}
              onChange={(e) => setAnalytics(e.target.checked)}
              className="mt-0.5 h-4 w-4 accent-red"
            />
            <span>
              <span className="block text-[13.5px] font-bold text-navy">{t.analytics}</span>
              <span className="block text-[12.5px] leading-snug text-mute">{t.analyticsDesc}</span>
            </span>
          </label>
        </div>
      )}

      <div className="mt-4 flex flex-wrap gap-2">
        <button type="button" onClick={() => choose(true)} className={`${btn} bg-navy text-white hover:bg-navy-2`}>
          {t.accept}
        </button>
        <button type="button" onClick={() => choose(false)} className={`${btn} bg-navy text-white hover:bg-navy-2`}>
          {t.reject}
        </button>
        {details ? (
          <button
            type="button"
            onClick={() => choose(analytics)}
            className={`${btn} border-[1.5px] border-navy text-navy hover:bg-navy hover:text-white`}
          >
            {t.save}
          </button>
        ) : (
          <button
            type="button"
            onClick={() => setDetails(true)}
            className={`${btn} border-[1.5px] border-navy text-navy hover:bg-navy hover:text-white`}
          >
            {t.settings}
          </button>
        )}
      </div>
    </div>
  );
}

// Footer link that reopens the banner so visitors can change or withdraw consent.
export function CookieSettingsLink({ label, className }: { label: string; className?: string }) {
  return (
    <button
      type="button"
      onClick={() => window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))}
      className={className}
    >
      {label}
    </button>
  );
}
