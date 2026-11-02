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
import { categoryLandingFor, categoryLandings, cities, type City, type Faq } from "@/lib/landing";

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

// The company as a local business (Store is a LocalBusiness, which is an
// Organization), so it can be matched to "near me" / city searches and to a
// Google Business Profile. No street address yet — the client gives it out per
// inquiry; add `streetAddress` + `geo` here once they publish it.
export function organizationJsonLd(locale: Locale) {
  const s = getSite(locale);
  return {
    "@context": "https://schema.org",
    "@type": "Store",
    "@id": `${SITE_URL}/#organization`,
    name: s.nameFull,
    alternateName: company.nameShort,
    description: s.descLong,
    url: absoluteUrl(localeHref(locale, "/")),
    logo: absoluteUrl("/brand/logo-v2.jpg"),
    image: absoluteUrl("/og/og-lt.jpg"),
    email: company.email,
    telephone: company.phone,
    vatID: "LT100020123613",
    currenciesAccepted: "EUR",
    address: {
      "@type": "PostalAddress",
      addressLocality: locale === "ru" ? "Электренай" : "Elektrėnai",
      addressCountry: "LT",
    },
    openingHoursSpecification: [
      {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
    ],
    areaServed: [
      { "@type": "Country", name: locale === "ru" ? "Литва" : "Lietuva" },
      ...cities.map((c) => ({ "@type": "City", name: c.names[locale].name })),
    ],
    knowsLanguage: ["lt", "ru"],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: locale === "ru" ? "Технические рукава и соединения" : "Techninės žarnos ir jungtys",
      itemListElement: categoryLandings.map((c) => ({
        "@type": "OfferCatalog",
        name: c.copy[locale].h1,
        url: absoluteUrl(localeHref(locale, `/products/category/${c.slug}`)),
      })),
    },
    contactPoint: [
      {
        "@type": "ContactPoint",
        telephone: company.phone,
        email: company.email,
        contactType: "sales",
        areaServed: "LT",
        availableLanguage: ["lt", "ru"],
      },
      {
        "@type": "ContactPoint",
        telephone: company.phone2,
        contactType: "sales",
        areaServed: "LT",
        availableLanguage: ["lt", "ru"],
      },
    ],
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
  const ru = locale === "ru";
  const props = [
    [ru ? "Внутренний диаметр (DN)" : "Vidinis diametras (DN)", p.dn],
    [ru ? "Рабочая температура" : "Darbinė temperatūra", p.temp],
    [ru ? "Давление" : "Slėgis", p.pressure],
    [ru ? "Вакуум" : "Vakuumas", p.vacuum],
    [ru ? "Материал" : "Medžiaga", p.material],
    [ru ? "Армирование" : "Armavimas", p.reinforcement],
    [ru ? "Стандартная длина" : "Standartinis ilgis", p.standardLength],
  ].filter(([, v]) => v && v.trim());
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: p.name,
    url: absoluteUrl(localeHref(locale, `/products/${p.slug}`)),
    ...(p.image ? { image: absoluteUrl(p.image) } : {}),
    description: metaDescription(p.shortNote || p.description || p.name, 300),
    ...(categoryLabel ? { category: categoryLabel } : {}),
    ...(props.length
      ? {
          additionalProperty: props.map(([name, value]) => ({
            "@type": "PropertyValue",
            name,
            value: value.replace(/\.$/, ""),
          })),
        }
      : {}),
    // No offers/brand on purpose: prices are on request and Riko Market resells
    // several makers; an Offer without a price is an error in Google's eyes.
  };
}

export function faqJsonLd(faq: Faq[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faq.map((f) => ({
      "@type": "Question",
      name: f.q,
      acceptedAnswer: { "@type": "Answer", text: f.a },
    })),
  };
}

// A category page: a collection whose items are the product pages.
export function collectionJsonLd(opts: {
  locale: Locale;
  path: string;
  name: string;
  description: string;
  products: { name: string; slug: string }[];
}) {
  const url = absoluteUrl(localeHref(opts.locale, opts.path));
  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${url}#page`,
    url,
    name: opts.name,
    description: opts.description,
    inLanguage: opts.locale,
    isPartOf: { "@id": `${SITE_URL}/#website` },
    about: { "@id": `${SITE_URL}/#organization` },
    mainEntity: {
      "@type": "ItemList",
      numberOfItems: opts.products.length,
      itemListElement: opts.products.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        name: p.name,
        url: absoluteUrl(localeHref(opts.locale, `/products/${p.slug}`)),
      })),
    },
  };
}

// A city page: the supply/delivery service, scoped to that city.
export function cityServiceJsonLd(city: City, locale: Locale, name: string, description: string) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    serviceType: locale === "ru" ? "Поставка технических рукавов" : "Techninių žarnų tiekimas",
    url: absoluteUrl(localeHref(locale, `/technines-zarnos/${city.slug}`)),
    provider: { "@id": `${SITE_URL}/#organization` },
    areaServed: {
      "@type": "City",
      name: city.names[locale].name,
      containedInPlace: { "@type": "Country", name: locale === "ru" ? "Литва" : "Lietuva" },
    },
  };
}

// ── Product page title + description ───────────────────────────────────────
// Catalogue names are model names ("Tipas A1. Polivinilchloridas – lengva
// konstrukcija") that nobody searches for. The title adds the hose type people
// do type ("PVC žarna"), and the description leads with the searchable specs.

const NOUN = /žarn|рукав|jungt|соедин|apkab|хомут|tarpikl|уплотн|movos|муфт/i;
const FITTINGS = "elementi-ziednannya";

export function productTitle(p: Product, locale: Locale): string {
  const kw = categoryLandingFor(p.category)?.copy[locale].keyword;
  if (!kw || p.category === FITTINGS || NOUN.test(p.name)) return p.name;
  return `${p.name} | ${kw}`;
}

export function productDescription(p: Product, locale: Locale): string {
  const kw = categoryLandingFor(p.category)?.copy[locale].keyword;
  const head = p.category === FITTINGS || !kw ? p.name : kw.charAt(0).toUpperCase() + kw.slice(1);
  const clean = (v: string) => v.trim().replace(/\.$/, "");
  const specs = [p.dn && `DN ${clean(p.dn)}`, p.temp && clean(p.temp)].filter(Boolean).join(", ");
  const tail = locale === "ru" ? "Доставка по всей Литве." : "Pristatymas visoje Lietuvoje.";
  const note = (p.shortNote || "").trim().replace(/([^.!?…])$/, "$1.");
  // Specs and delivery first: the note is the part that may get truncated.
  return metaDescription(`${head}${specs ? `: ${specs}` : ""}. ${tail} ${note}`.replace(/\.\s*\./g, "."));
}
