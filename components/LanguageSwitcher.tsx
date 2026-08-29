"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { locales, localeHref, localeLabel, splitLocale, type Locale } from "@/lib/i18n";
import { getDict } from "@/lib/dictionary";

// LT | RU switch. Keeps the visitor on the same page: the current pathname is
// stripped of its locale prefix and re-prefixed for the target locale.
export function LanguageSwitcher({
  locale,
  className = "",
}: {
  locale: Locale;
  className?: string;
}) {
  const pathname = usePathname() || "/";
  const { rest } = splitLocale(pathname);

  return (
    <div
      className={`flex items-center gap-1 ${className}`}
      role="group"
      aria-label={getDict(locale).common.language}
    >
      {locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={localeHref(l, rest)}
            hrefLang={l}
            aria-current={active ? "true" : undefined}
            className={`px-1.5 py-1 text-[12.5px] font-bold uppercase tracking-[0.06em] transition-colors ${
              active ? "text-red" : "text-mute hover:text-navy"
            }`}
          >
            {localeLabel[l]}
          </Link>
        );
      })}
    </div>
  );
}
