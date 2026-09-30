// Shared SEO helpers: absolute URLs, per-page metadata (canonical, hreflang,
// Open Graph, Twitter) and schema.org JSON-LD.
//
// The production origin comes from NEXT_PUBLIC_SITE_URL (set it in Vercel →
// Settings → Environment Variables). Without it we fall back to the company
// domain, so canonical URLs never point at a *.vercel.app preview.
import type { Metadata } from "next";
import { company, getSite } from "@/lib/site";
import { defaultLocale, localeHref, locales, type Locale } from "@/lib/i18n";
import type { Product } from "@/lib/products";

export const SITE_URL = (process.env.NEXT_PUBLIC_SITE_URL || `https://${company.website}`).replace(/\/$/, "");

export const absoluteUrl = (path: string) => `${SITE_URL}${path === "/" ? "" : path}`;

export const ogLocale: Record<Locale, string> = { lt: "lt_LT", ru: "ru_RU" };

// Default share image per locale (1200×630, public/og/). Pages without a
// picture of their own — everything except product pages — use it.
export const defaultOgImage: Record<Locale, { url: string; alt: string; width: number; height: number }> = {
  lt: { url: "/og/og-lt.jpg", alt: "UAB „Riko Market“ — techninės žarnos ir sujungimo elementai", width: 1200, height: 630 },
  ru: { url: "/og/og-ru.jpg", alt: "UAB «Riko Market» — технические рукава и соединительные элементы", width: 1200, height: 630 },
};

// hreflang map for a locale-independent path ("/products/x").
export function languageAlternates(path: string): Record<string, string> {
  const map: Record<string, string> = {};
  for (const l of locales) map[l] = localeHref(l, path);
  map["x-default"] = localeHref(defaultLocale, path);
  return map;
}

// Trim prose to a search-snippet-sized description, cutting on a word boundary.
export function metaDescription(text: string, max = 158): string {
  const clean = text.replace(/\s+/g, " ").trim();
  if (clean.length <= max) return clean;
  const cut = clean.slice(0, max - 1);
  return `${cut.slice(0, Math.max(cut.lastIndexOf(" "), max - 30)).replace(/[\s,.;:–—-]+$/, "")}…`;
}

type PageMetaInput = {
  locale: Locale;
  path: string; // locale-independent path, e.g. "/products"
  title: string; // page title (the layout template appends the brand)
  description: string;
  absoluteTitle?: boolean; // home page: use the title as-is
  image?: { url: string; alt: string }; // defaults to the locale's opengraph-image
  type?: "website" | "article";
};

export function pageMetadata({
  locale,
  path,
  title,
  description,
  absoluteTitle,
  image,
  type = "website",
}: PageMetaInput): Metadata {
  const url = localeHref(locale, path);
  const desc = metaDescription(description);
  const fullTitle = absoluteTitle ? title : `${title} — ${company.nameShort}`;
  const img = image ?? defaultOgImage[locale];
  return {
    title: absoluteTitle ? { absolute: title } : title,
    description: desc,
    alternates: { canonical: url, languages: languageAlternates(path) },
    openGraph: {
      type,
      url,
      siteName: company.nameShort,
      locale: ogLocale[locale],
      alternateLocale: locales.filter((l) => l !== locale).map((l) => ogLocale[l]),
      title: fullTitle,
      description: desc,
      images: [img],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description: desc,
      images: [img.url],
    },
  };
}

// ── JSON-LD ────────────────────────────────────────────────────────────────

export function organizationJsonLd(locale: Locale) {
  const s = getSite(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${SITE_URL}/#organization`,
    name: s.nameFull,
    alternateName: company.nameShort,
    url: absoluteUrl(localeHref(locale, "/")),
    logo: absoluteUrl("/brand/logo-v2.jpg"),
    image: absoluteUrl("/brand/logo-v2.jpg"),
    email: company.email,
    telephone: company.phone,
    vatID: "LT100020123613",
    address: {
      "@type": "PostalAddress",
      addressLocality: locale === "ru" ? "Электренай" : "Elektrėnai",
      addressCountry: "LT",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: company.phone,
      email: company.email,
      contactType: "sales",
      areaServed: "LT",
      availableLanguage: ["lt", "ru"],
    },
  };
}

export function websiteJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": `${SITE_URL}/#website`,
    url: absoluteUrl(localeHref(locale, "/")),
    name: company.nameShort,
    inLanguage: locale,
    publisher: { "@id": `${SITE_URL}/#organization` },
  };
}

export function breadcrumbJsonLd(items: { name: string; path: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((it, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.path),
    })),
  };
}

export function productJsonLd(p: Product, locale: Locale, categoryLabel?: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    url: absoluteUrl(localeHref(locale, `/products/${p.slug}`)),
    ...(p.image ? { image: absoluteUrl(p.image) } : {}),
    description: metaDescription(p.shortNote || p.description || p.name, 300),
    ...(categoryLabel ? { category: categoryLabel } : {}),
    // No price or brand: prices are on request and Riko Market resells several
    // makers, and an Offer without a price is flagged as an error by Google.
  };
}
