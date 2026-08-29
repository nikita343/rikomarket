import Link from "next/link";
import { industries, industryText } from "@/lib/industries";
import { getAllProducts } from "@/lib/products";
import { getDict } from "@/lib/dictionary";
import { localeHref, type Locale } from "@/lib/i18n";
import { Container, PageHero } from "@/components/ui";
import { Icon } from "@/components/icons";

export function IndustriesPage({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const all = getAllProducts(locale);

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
        <Container>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, idx) => {
              const count = all.filter((p) => p.industries.includes(ind.id)).length;
              const { name, desc } = industryText(ind, locale);
              return (
                <div
                  key={ind.id}
                  className="flex flex-col border border-line bg-white p-6 transition-colors hover:border-navy"
                >
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center bg-red text-white">
                      <Icon name={ind.icon} size={28} className="text-white" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.1em] text-mute">
                      0{idx + 1} / 0{industries.length}
                    </span>
                  </div>
                  <h2 className="heading text-xl">{name}</h2>
                  <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-ink">{desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {t.industriesPage.tags.slice(0, 2 + (idx % 2)).map((tag: string) => (
                      <span
                        key={tag}
                        className="border border-line bg-bg-alt px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={localeHref(locale, "/products")}
                    className="nav-link mt-5 inline-flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-[0.06em] text-red"
                  >
                    {t.industriesPage.viewHoses}{" "}
                    {count > 0 && <span className="text-mute">({count})</span>}
                    <Icon name="arrow" size={14} />
                  </Link>
                </div>
              );
            })}
          </div>
        </Container>
      </section>
    </>
  );
}
