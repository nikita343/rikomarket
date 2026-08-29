import type { Metadata } from "next";
import { convPressure, convLength, convTemp, convFlow } from "@/lib/reference";
import { Container, PageHero } from "@/components/ui";
import { Icon, type IconName } from "@/components/icons";
import { UnitConverter } from "@/components/UnitConverter";

export const metadata: Metadata = {
  title: "Matavimo vienetai",
  description:
    "Slėgio, ilgio, temperatūros ir srauto matavimo vienetų konvertavimas ir formulės.",
};

const BLOCKS: { title: string; icon: IconName; rows: [string, string][] }[] = [
  { title: "Slėgis", icon: "spool", rows: convPressure },
  { title: "Ilgis", icon: "filter", rows: convLength },
  { title: "Temperatūra", icon: "clock", rows: convTemp },
  { title: "Srauto greitis", icon: "tag", rows: convFlow },
];

export default function ConversionPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Pagrindinis", href: "/" }, { label: "Matavimo vienetų konvertavimas" }]}
        eyebrow="Informacinė lentelė"
        title="Matavimo vienetų konvertavimas."
        sub="Įveskite reikšmę ir pasirinkite vienetus — rezultatas perskaičiuojamas iškart. Žemiau — dažniausių formulių lentelės."
      />

      <section className="bg-bg py-[50px] pb-16">
        <Container>
          <div className="mb-[30px]">
            <UnitConverter />
          </div>

          <div className="grid gap-[22px] lg:grid-cols-2">
            {BLOCKS.map((b) => (
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
