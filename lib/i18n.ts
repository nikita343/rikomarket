// Locale plumbing. Lithuanian is the default locale and lives at the root of
// the site (/, /products, …); Russian is prefixed (/ru, /ru/products, …), so
// none of the existing Lithuanian URLs change.

export const locales = ["lt", "ru"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "lt";

export const localeLabel: Record<Locale, string> = { lt: "LT", ru: "RU" };
export const htmlLang: Record<Locale, string> = { lt: "lt", ru: "ru" };

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

// Prefix an app-internal href with the locale segment ("/products" → "/ru/products").
export function localeHref(locale: Locale, href: string): string {
  if (locale === defaultLocale) return href;
  if (!href.startsWith("/")) return href; // mailto:, tel:, external
  return href === "/" ? `/${locale}` : `/${locale}${href}`;
}

// Split a pathname into its locale and the locale-independent remainder.
export function splitLocale(pathname: string): { locale: Locale; rest: string } {
  for (const l of locales) {
    if (l === defaultLocale) continue;
    if (pathname === `/${l}`) return { locale: l, rest: "/" };
    if (pathname.startsWith(`/${l}/`)) return { locale: l, rest: pathname.slice(l.length + 1) };
  }
  return { locale: defaultLocale, rest: pathname || "/" };
}

// Collator for list sorting — Lithuanian and Russian order differently.
export const collatorFor = (locale: Locale) => (locale === "ru" ? "ru" : "lt");
