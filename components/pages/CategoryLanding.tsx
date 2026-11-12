import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getDict } from "@/lib/dictionary";
import { localeHref, type Locale } from "@/lib/i18n";
import {
  allCategoryLandings,
  categoryLandingBySlug,
  categoryLandings,
  childLandings,
  cities,
  cityPath,
  DELIVERY_PATH,
  formatDn,
  formatTemp,
  specRange,
  type CategoryLanding,
} from "@/lib/landing";
import { categoryLandingProducts } from "@/lib/landing-products";
import {
  breadcrumbJsonLd,
  collectionJsonLd,
  faqJsonLd,
  pageMetadata,
} from "@/lib/seo";
import { Container, PageHero, Button, SectionHead } from "@/components/ui";
import { ProductCard } from "@/components/ProductCard";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";

export const categoryLandingParams = () => allCategoryLandings.map((c) => ({ slug: c.slug }));

export function categoryLandingMetadata(slug: string, locale: Locale): Metadata {
  const l = categoryLandingBySlug(slug);
  if (!l) return { robots: { index: false } };
  const c = l.copy[locale];
  return pageMetadata({ locale, path: `/products/category/${l.slug}`, title: c.title, description: c.description });
}

const landingPath = (l: CategoryLanding) => `/products/category/${l.slug}`;

// A real, indexable page per hose type — "PVC žarnos", "metalinės žarnos" —
// and per coupling system ("Camlock jungtys", "žarnų apkabos"), with the
// intro, key specs, every product and a FAQ.
export function CategoryLandingPage({ slug, locale }: { slug: string; locale: Locale }) {
  const l = categoryLandingBySlug(slug);
  if (!l) notFound();
  const t = getDict(locale);
  const c = l.copy[locale];
  const path = landingPath(l);
  const parent = l.parent ? categoryLandingBySlug(l.parent) : undefined;
  const children = childLandings(l.slug);
  // Sub-pages link to their parent and siblings; category pages to the others.
  const others = parent
    ? [parent, ...childLandings(parent.slug).filter((o) => o.slug !== l.slug)]
    : categoryLandings.filter((o) => o.slug !== l.slug);
  const products = categoryLandingProducts(l, locale);
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
            ...(parent ? [{ name: parent.copy[locale].h1, path: localeHref(locale, landingPath(parent)) }] : []),
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
          ...(parent ? [{ label: parent.copy[locale].h1, href: localeHref(locale, landingPath(parent)) }] : []),
          { label: c.h1 },
        ]}
        eyebrow={t.landing.catEyebrow}
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

      {/* Parent overview → one card per coupling system */}
      {children.length > 0 && (
        <section className="bg-bg pt-10">
          <Container>
            <SectionHead title={t.landing.fittingTypesTitle} className="mb-5" />
            <div className="grid gap-3 sm:grid-cols-3">
              {children.map((o) => {
                const count = categoryLandingProducts(o, locale).length;
                return (
                  <Link
                    key={o.slug}
                    href={localeHref(locale, landingPath(o))}
                    className="group flex flex-col rounded-[4px] border border-line bg-white p-5 transition-colors hover:border-navy"
                  >
                    <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-mute">
                      {t.landing.specCount}: {count}
                    </div>
                    <h3 className="mt-1.5 text-[17px] font-extrabold text-navy group-hover:text-red">
                      {o.copy[locale].h1}
                    </h3>
                    <p className="mt-2 line-clamp-3 text-[13.5px] leading-snug text-mute">{o.copy[locale].intro[0]}</p>
                  </Link>
                );
              })}
            </div>
          </Container>
        </section>
      )}

      <section className="bg-bg py-12">
        <Container>
          <h2 className="heading mb-6 text-[28px]">
            {t.landing.productsTitle} — {c.h1}
          </h2>
          <div className="grid gap-2.5">
            {products.map((p) => (
              <ProductCard key={p.slug} product={p} locale={locale} />
            ))}
          </div>
        </Container>
      </section>

      <FaqSection eyebrow={t.landing.faqEyebrow} title={t.landing.faqTitle} items={c.faq} className="border-t border-line bg-bg-alt py-16" />

      <section className="bg-bg py-14">
        <Container className="grid gap-12 lg:grid-cols-2">
          <div>
            <SectionHead title={t.landing.otherCats} className="mb-5" />
            <div className="flex flex-wrap gap-2">
              {others.map((o) => (
                <Link
                  key={o.slug}
                  href={localeHref(locale, landingPath(o))}
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

export function InquiryBand({ locale, deliveryLink = true }: { locale: Locale; deliveryLink?: boolean }) {
  const t = getDict(locale).landing;
  return (
    <section className="bg-navy text-white">
      <Container className="flex flex-col items-start justify-between gap-6 py-12 lg:flex-row lg:items-center">
        <div>
          <h2 className="text-[30px] font-extrabold leading-tight">{t.ctaTitle}</h2>
          <p className="mt-3 max-w-[640px] text-white/85">{t.ctaText}</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button href={localeHref(locale, "/contacts")} kind="primary" size="lg">
            {t.ctaButton}
          </Button>
          {deliveryLink && (
            <Button href={localeHref(locale, DELIVERY_PATH)} kind="outlineLight" size="lg" icon={false}>
              {t.deliveryLink}
            </Button>
          )}
        </div>
      </Container>
    </section>
  );
}
