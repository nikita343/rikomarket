import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDict } from "@/lib/dictionary";
import { localeHref, type Locale } from "@/lib/i18n";
import {
  cities,
  cityPath,
  formatDn,
  formatTemp,
  specRange,
  purposeLandingBySlug,
  purposeLandings,
  purposePath,
} from "@/lib/landing";
import { groupByCategory, purposeLandingProducts } from "@/lib/landing-products";
import { breadcrumbJsonLd, collectionJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { Container, PageHero, SectionHead } from "@/components/ui";
import { ProductCard } from "@/components/ProductCard";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { InquiryBand } from "@/components/pages/CategoryLanding";

export const purposeLandingParams = () => purposeLandings.map((u) => ({ slug: u.slug }));

export function purposeLandingMetadata(slug: string, locale: Locale): Metadata {
  const u = purposeLandingBySlug(slug);
  if (!u) return { robots: { index: false } };
  const c = u.copy[locale];
  return pageMetadata({ locale, path: purposePath(u.slug), title: c.title, description: c.description });
}

// "Žarnos drožlėms ir dulkėms", "ventiliacijos žarnos" — hoses by what they
// carry, the way people search. Products come from the `industries` tag in the
// catalogue; the "how to choose" lines only repeat what the catalogue says.
export function PurposeLandingPage({ slug, locale }: { slug: string; locale: Locale }) {
  const u = purposeLandingBySlug(slug);
  if (!u) notFound();
  const t = getDict(locale);
  const c = u.copy[locale];
  const path = purposePath(u.slug);
  const products = purposeLandingProducts(u, locale);
  const groups = groupByCategory(products);
  const range = specRange(products);
  const dn = formatDn(range, locale);
  const temp = formatTemp(range, locale);

  const facts = [
    dn && { label: t.landing.specDn, value: dn },
    temp && { label: t.landing.specTemp, value: temp },
    { label: t.landing.specCount, value: String(products.length) },
  ].filter(Boolean) as { label: string; value: string }[];

  return (
    <>
      <JsonLd
        data={[
          collectionJsonLd({ locale, path, name: c.h1, description: c.description, products }),
          breadcrumbJsonLd([
            { name: t.common.home, path: localeHref(locale, "/") },
            { name: t.common.products, path: localeHref(locale, "/products") },
            { name: c.h1, path: localeHref(locale, path) },
          ]),
          faqJsonLd(c.faq),
        ]}
      />
      <PageHero
        locale={locale}
        breadcrumb={[
          { label: t.common.home, href: localeHref(locale, "/") },
          { label: t.common.products, href: localeHref(locale, "/products") },
          { label: c.h1 },
        ]}
        eyebrow={t.landing.useEyebrow}
        title={c.h1}
      />

      <section className="bg-bg pt-10">
        <Container className="grid gap-8 lg:grid-cols-[1.6fr_1fr]">
          <div className="grid gap-4 text-[16px] leading-relaxed text-ink">
            {c.intro.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
          <dl className="grid content-start gap-px self-start overflow-hidden rounded-[4px] border border-line bg-line">
            {facts.map((f) => (
              <div key={f.label} className="flex items-baseline justify-between gap-4 bg-white px-5 py-4">
                <dt className="text-[12px] font-semibold uppercase tracking-[0.08em] text-mute">{f.label}</dt>
                <dd className="text-right text-[17px] font-extrabold tabular-nums text-navy">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* How to choose — numbered like the city pages' ordering steps */}
      <section className="bg-bg pt-12">
        <Container>
          <SectionHead title={t.landing.chooseTitle} className="mb-6" />
          <ol className="grid gap-3 md:grid-cols-2">
            {c.choose.map((line, i) => (
              <li key={line} className="flex gap-4 rounded-[4px] border border-line bg-white p-5">
                <span className="flex h-9 w-9 shrink-0 items-center justify-center bg-red text-[15px] font-extrabold text-white">
                  {i + 1}
                </span>
                <span className="text-[14.5px] leading-relaxed text-ink">{line}</span>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="bg-bg py-12">
        <Container>
          <h2 className="heading mb-6 text-[28px]">
            {t.landing.productsTitle} — {c.h1}
          </h2>
          <div className="grid gap-8">
            {groups.map((g) => (
              <div key={g.landing.slug}>
                <h3 className="mb-3 flex items-baseline gap-2 text-[17px] font-extrabold text-navy">
                  <Link
                    href={localeHref(locale, `/products/category/${g.landing.slug}`)}
                    className="nav-link hover:text-red"
                  >
                    {g.landing.copy[locale].h1}
                  </Link>
                  <span className="text-[13px] font-semibold text-mute">· {g.products.length}</span>
                </h3>
                <div className="grid gap-2.5">
                  {g.products.map((p) => (
                    <ProductCard key={p.slug} product={p} locale={locale} />
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </section>

      <FaqSection eyebrow={t.landing.faqEyebrow} title={t.landing.faqTitle} items={c.faq} className="border-t border-line bg-bg-alt py-16" />

      <section className="bg-bg py-14">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead title={t.landing.useTitle} className="mb-5" />
            <div className="flex flex-wrap gap-2">
              {purposeLandings
                .filter((o) => o.slug !== u.slug)
                .map((o) => (
                  <Link
                    key={o.slug}
                    href={localeHref(locale, purposePath(o.slug))}
                    className="rounded-[4px] border border-line bg-white px-4 py-2.5 text-sm font-bold text-navy hover:border-navy"
                  >
                    {o.copy[locale].h1}
                  </Link>
                ))}
            </div>
          </div>
          <div>
            <SectionHead title={t.landing.deliveryTitle} sub={t.landing.deliverySub} className="mb-5" />
            <div className="flex flex-wrap gap-x-4 gap-y-2 text-sm">
              {cities.map((city) => (
                <Link
                  key={city.slug}
                  href={localeHref(locale, cityPath(city.slug))}
                  className="nav-link font-semibold text-navy hover:text-red"
                >
                  {city.names[locale].name}
                </Link>
              ))}
            </div>
          </div>
        </Container>
      </section>

      <InquiryBand locale={locale} />
    </>
  );
}
