import { industries, industryText, photoCaption } from "@/lib/industries";
import { getDict } from "@/lib/dictionary";
import { localeHref, type Locale } from "@/lib/i18n";
import { Container, PageHero } from "@/components/ui";
import { Icon } from "@/components/icons";
import { IndustryGallery } from "@/components/IndustryGallery";

// Application areas: each industry with its photo gallery. Per the client
// (2026-09) there are no product links and no generic property tags here —
// just the industry and pictures of hoses in use.
export function IndustriesPage({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const labels = {
    enlarge: t.industriesPage.enlarge,
    close: t.industriesPage.close,
    prev: t.industriesPage.prev,
    next: t.industriesPage.next,
  };

  return (
    <>
      <PageHero
        locale={locale}
        breadcrumb={[
          { label: t.common.home, href: localeHref(locale, "/") },
          { label: t.industriesPage.eyebrow },
        ]}
        eyebrow={t.industriesPage.eyebrow}
        title={t.industriesPage.title}
        sub={t.industriesPage.sub}
      />

      <section className="bg-bg py-[60px]">
        <Container className="grid gap-6">
          {industries.map((ind) => {
            const { name, desc } = industryText(ind, locale);
            return (
              <article
                key={ind.id}
                id={ind.id}
                className="grid scroll-mt-28 gap-6 border border-line bg-white p-6 lg:grid-cols-[300px_1fr] lg:gap-10 lg:p-8"
              >
                <div>
                  <div className="mb-4 flex h-14 w-14 items-center justify-center bg-red text-white">
                    <Icon name={ind.icon} size={28} className="text-white" />
                  </div>
                  <h2 className="heading text-xl">{name}</h2>
                  <p className="mt-2.5 text-[14px] leading-relaxed text-ink">{desc}</p>
                </div>
                <IndustryGallery
                  photos={ind.photos.map((p) => ({ src: p.src, caption: photoCaption(p, locale) }))}
                  labels={labels}
                />
              </article>
            );
          })}
        </Container>
      </section>
    </>
  );
}
