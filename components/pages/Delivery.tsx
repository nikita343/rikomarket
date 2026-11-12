import Link from "next/link";
import type { Metadata } from "next";
import { company, getSite } from "@/lib/site";
import { getDict } from "@/lib/dictionary";
import { localeHref, type Locale } from "@/lib/i18n";
import { cities, cityPath, DELIVERY_PATH, deliveryCopy } from "@/lib/landing";
import { breadcrumbJsonLd, faqJsonLd, pageMetadata } from "@/lib/seo";
import { Container, PageHero, SectionHead } from "@/components/ui";
import { Icon } from "@/components/icons";
import { FaqSection } from "@/components/FaqSection";
import { JsonLd } from "@/components/JsonLd";
import { InquiryBand } from "@/components/pages/CategoryLanding";

export function deliveryMetadata(locale: Locale): Metadata {
  const c = deliveryCopy[locale];
  return pageMetadata({ locale, path: DELIVERY_PATH, title: c.title, description: c.description });
}

// "Užsakymas ir pristatymas" — how a company orders, what to put in the
// inquiry, delivery and invoices. Only confirmed facts; see lib/landing.ts.
export function DeliveryPage({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const c = deliveryCopy[locale];

  return (
    <>
      <JsonLd
        data={[
          breadcrumbJsonLd([
            { name: t.common.home, path: localeHref(locale, "/") },
            { name: c.h1, path: localeHref(locale, DELIVERY_PATH) },
          ]),
          faqJsonLd(c.faq),
        ]}
      />
      <PageHero
        locale={locale}
        breadcrumb={[{ label: t.common.home, href: localeHref(locale, "/") }, { label: c.h1 }]}
        eyebrow={c.eyebrow}
        title={c.h1}
        sub={c.sub}
      />

      {/* Key facts */}
      <section className="bg-bg pt-10">
        <Container>
          <dl className="grid gap-px overflow-hidden rounded-[4px] border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
            {c.facts.map((f) => (
              <div key={f.label} className="bg-white px-5 py-4">
                <dt className="text-[12px] font-semibold uppercase tracking-[0.08em] text-mute">{f.label}</dt>
                <dd className="mt-1 text-[17px] font-extrabold text-navy">{f.value}</dd>
              </div>
            ))}
          </dl>
        </Container>
      </section>

      {/* How to order */}
      <section className="bg-bg py-14">
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

      {/* What to include · invoices · contacts */}
      <section className="border-y border-line bg-bg-alt py-14">
        <Container className="grid gap-10 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <SectionHead title={c.includeTitle} className="mb-6" />
            <ul className="grid gap-2.5">
              {c.include.map((item) => (
                <li key={item} className="flex items-start gap-3 rounded-[4px] border border-line bg-white px-4 py-3 text-[14.5px] text-ink">
                  <Icon name="arrow" size={14} className="mt-1 shrink-0 text-red" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>
          <div className="grid content-start gap-6">
            <div className="rounded-[4px] border border-line bg-white p-6">
              <h2 className="text-[19px] font-extrabold text-navy">{c.invoiceTitle}</h2>
              <p className="mt-2.5 text-[14.5px] leading-relaxed text-ink">{c.invoice}</p>
            </div>
            <div className="rounded-[4px] border border-line bg-white p-6">
              <h2 className="text-[19px] font-extrabold text-navy">{c.contactTitle}</h2>
              <div className="mt-4 grid gap-3 text-[14.5px] text-ink">
                <a href={company.phoneHref} className="flex items-center gap-2.5 font-bold text-navy hover:text-red">
                  <Icon name="phone" size={16} className="shrink-0 text-red" />
                  {company.phone}
                </a>
                <a href={company.phone2Href} className="flex items-center gap-2.5 hover:text-red">
                  <Icon name="phone" size={16} className="shrink-0 text-red" />
                  {company.phone2}
                </a>
                <a href={`mailto:${company.email}`} className="flex items-center gap-2.5 hover:text-red">
                  <Icon name="mail" size={16} className="shrink-0 text-red" />
                  {company.email}
                </a>
                <div className="flex items-center gap-2.5">
                  <Icon name="clock" size={16} className="shrink-0 text-red" />
                  {getSite(locale).hours}
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <FaqSection eyebrow={t.landing.faqEyebrow} title={t.landing.faqTitle} items={c.faq} className="bg-bg py-16" />

      <section className="border-t border-line bg-bg-alt py-12">
        <Container>
          <SectionHead title={t.landing.deliveryTitle} sub={t.landing.deliverySub} className="mb-5" />
          <div className="flex flex-wrap gap-2">
            {cities.map((city) => (
              <Link
                key={city.slug}
                href={localeHref(locale, cityPath(city.slug))}
                className="rounded-[4px] border border-line bg-white px-4 py-2.5 text-sm font-bold text-navy hover:border-navy"
              >
                {city.names[locale].name}
              </Link>
            ))}
          </div>
        </Container>
      </section>

      <InquiryBand locale={locale} deliveryLink={false} />
    </>
  );
}
