import { getConversions } from "@/lib/reference";
import { getDict } from "@/lib/dictionary";
import { localeHref, type Locale } from "@/lib/i18n";
import { Container, PageHero } from "@/components/ui";
import { Icon, type IconName } from "@/components/icons";
import { UnitConverter } from "@/components/UnitConverter";

export function UnitsPage({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const conv = getConversions(locale);
  const blocks: { title: string; icon: IconName; rows: [string, string][] }[] = [
    { title: t.unitsPage.pressure, icon: "spool", rows: conv.pressure },
    { title: t.unitsPage.length, icon: "filter", rows: conv.length },
    { title: t.unitsPage.temperature, icon: "clock", rows: conv.temp },
    { title: t.unitsPage.flowRate, icon: "tag", rows: conv.flow },
  ];

  return (
    <>
      <PageHero
        locale={locale}
        breadcrumb={[
          { label: t.common.home, href: localeHref(locale, "/") },
          { label: t.unitsPage.breadcrumb },
        ]}
        eyebrow={t.unitsPage.eyebrow}
        title={t.unitsPage.title}
        sub={t.unitsPage.sub}
      />

      <section className="bg-bg py-[50px] pb-16">
        <Container>
          <div className="mb-[30px]">
            <UnitConverter locale={locale} />
          </div>

          <div className="grid gap-[22px] lg:grid-cols-2">
            {blocks.map((b) => (
              <div key={b.title} className="border border-line bg-white">
                <div className="flex items-center gap-3 border-b border-line bg-bg-alt px-[22px] py-4">
                  <div className="flex h-9 w-9 items-center justify-center bg-red text-white">
                    <Icon name={b.icon} size={18} className="text-white" />
                  </div>
                  <h2 className="text-lg font-bold text-navy">{b.title}</h2>
                </div>
                <table className="spec-table w-full">
                  <tbody>
                    {b.rows.map((r, j) => (
                      <tr key={j} className={j > 0 ? "border-t border-line-soft" : ""}>
                        <td className="w-2/5 text-sm font-bold tabular-nums text-navy">{r[0]}</td>
                        <td className="text-sm tabular-nums text-ink">{r[1]}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ))}
          </div>
        </Container>
      </section>
    </>
  );
}
