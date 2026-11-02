import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDict } from "@/lib/dictionary";
import { localeHref, type Locale } from "@/lib/i18n";
import { getProductsByCategory } from "@/lib/products";
import { categoryById, categoryName } from "@/lib/categories";
import { industries, industryText } from "@/lib/industries";
import {
  categoryLandings,
  cities,
  cityBySlug,
  cityCopy,
  cityPath,
  formatDn,
  formatTemp,
  specRange,
} from "@/lib/landing";
import { breadcrumbJsonLd, cityServiceJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { Container, PageHero, SectionHead } from "@/components/ui";
import { Icon } from "@/components/icons";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { InquiryBand } from "@/components/pages/CategoryLanding";

export const cityLandingParams = () => cities.map((c) => ({ city: c.slug }));

export function cityLandingMetadata(slug: string, locale: Locale): Metadata {
  const city = cityBySlug(slug);
  if (!city) return { robots: { index: false } };
  const c = cityCopy(city, locale);
  return pageMetadata({ locale, path: cityPath(city.slug), title: c.title, description: c.description });
}

// "Techninės žarnos Vilniuje" — the page that answers a city search. Every
// sentence is true for the city; city-specific facts live in lib/landing.ts.
export function CityLandingPage({ slug, locale }: { slug: string; locale: Locale }) {
  const city = cityBySlug(slug);
  if (!city) notFound();
  const t = getDict(locale);
  const c = cityCopy(city, locale);
  const path = cityPath(city.slug);
  const deliveryLabel = t.landing.deliveryEyebrow;

  return (
    <>
      <JsonLd
        data={[
          cityServiceJsonLd(city, locale, c.h1, c.description),
          breadcrumbJsonLd([
            { name: t.common.home, path: localeHref(locale, "/") },
            { name: city.names[locale].name, path: localeHref(locale, path) },
          ]),
          faqJsonLd(c.faq),
        ]}
      />
      <PageHero
        locale={locale}
        breadcrumb={[
          { label: t.common.home, href: localeHref(locale, "/") },
          { label: deliveryLabel },
          { label: city.names[locale].name },
        ]}
        eyebrow={t.landing.cityEyebrow}
        title={c.h1}
        sub={city.note ? `${c.sub} ${city.note[locale]}` : c.sub}
      />

      {/* What we supply — one card per hose type with its real spec range */}
      <section className="bg-bg py-14">
        <Container>
          <SectionHead title={t.landing.cityCatsTitle} className="mb-7" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {categoryLandings.map((l) => {
              const products = getProductsByCategory(l.categoryId, locale);
              const r = specRange(products);
              const specs = [formatDn(r, locale) && `DN ${formatDn(r, locale)}`, formatTemp(r, locale)]
                .filter(Boolean)
                .join(" · ");
              const cat = categoryById(l.categoryId);
              return (
                <Link
                  key={l.slug}
                  href={localeHref(locale, `/products/category/${l.slug}`)}
                  className="group flex flex-col rounded-[4px] border border-line bg-white p-5 transition-colors hover:border-navy"
                >
                  <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-mute">
                    {cat ? categoryName(cat, locale) : ""} · {products.length}
                  </div>
                  <h3 className="mt-1.5 text-[17px] font-extrabold text-navy group-hover:text-red">
                    {l.copy[locale].h1} {city.names[locale].inCity}
                  </h3>
                  <p className="mt-2 line-clamp-3 text-[13.5px] leading-snug text-mute">{l.copy[locale].intro[0]}</p>
                  {specs && <div className="mt-3 text-[13px] font-bold tabular-nums text-ink">{specs}</div>}
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      {/* How to order */}
      <section className="border-y border-line bg-bg-alt py-14">
        <Container>
          <SectionHead title={c.howTitle} className="mb-7" />
          <ol className="grid gap-4 md:grid-cols-3">
            {c.how.map((step, i) => (
              <li key={step} className="flex gap-4 rounded-[4px] border border-line bg-white p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-red text-[15px] font-extrabold text-white">
                  {i + 1}
                </span>
                <span className="text-[14.5px] leading-relaxed text-ink">{step}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      {/* Industries */}
      <section className="bg-bg py-14">
        <Container>
          <SectionHead title={t.landing.industriesTitle} className="mb-6" />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind) => {
              const it = industryText(ind, locale);
              return (
                <Link
                  key={ind.id}
                  href={localeHref(locale, `/industries#${ind.id}`)}
                  className="group flex items-center gap-4 rounded-[4px] border border-line bg-white px-4 py-3.5 hover:border-navy"
                >
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center bg-navy">
                    <Icon name={ind.icon} size={22} className="text-white" />
                  </span>
                  <span>
                    <span className="block text-[15px] font-bold text-navy">{it.name}</span>
                    <span className="block text-[12.5px] leading-snug text-mute">{it.desc}</span>
                  </span>
                </Link>
              );
            })}
          </div>
        </Container>
      </section>

      <FaqSection eyebrow={t.landing.faqEyebrow} title={t.landing.faqTitle} items={c.faq} className="border-t border-line bg-bg-alt py-16" />

      {/* Other cities — keeps the set crawlable from every city page */}
      <section className="bg-bg py-12">
        <Container>
          <SectionHead title={t.landing.deliveryTitle} sub={t.landing.deliverySub} className="mb-5" />
          <div className="flex flex-wrap gap-2">
            {cities
              .filter((o) => o.slug !== city.slug)
              .map((o) => (
                <Link
                  key={o.slug}
                  href={localeHref(locale, cityPath(o.slug))}
                  className="rounded-[4px] border border-line bg-white px-4 py-2.5 text-sm font-bold text-navy hover:border-navy"
                >
                  {o.names[locale].name}
                </Link>
              ))}
          </div>
        </Container>
      </section>

      <InquiryBand locale={locale} />
    </>
  );
}
