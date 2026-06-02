import type { Metadata } from "next";
import { company } from "@/lib/site";
import { Container, PageHero, Button } from "@/components/ui";
import { Icon, type IconName } from "@/components/icons";

export const metadata: Metadata = {
  title: "Kontaktai",
  description: "Susisiekite su UAB „Riko Market“ — Vilnius, Lietuva.",
};

const DETAILS: { ic: IconName; label: string; value: string; sub: string }[] = [
  { ic: "pin", label: "Adresas", value: company.address, sub: "Detalų adresą atsiųsime atsakydami į užklausą" },
  { ic: "phone", label: "Telefonas", value: company.phone, sub: company.hours },
  { ic: "mail", label: "El. paštas", value: company.email, sub: "Atsakome per 1 d.d." },
  { ic: "clock", label: "Darbo laikas", value: company.hours, sub: "Šeštadieniais — pagal susitarimą" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Pagrindinis", href: "/" }, { label: "Kontaktai" }]}
        eyebrow="Kontaktai"
        title="Susisiekite su mumis."
        sub="Mūsų inžinieriai padės parinkti žarną, paskaičiuoti kiekį ir suderinti pristatymą."
      />

      <section className="bg-bg py-[60px]">
        <Container>
          <div className="grid gap-14 lg:grid-cols-2">
            {/* Contact details */}
            <div className="border border-line bg-white p-8">
              <h2 className="heading text-[22px] font-bold">{company.nameFull}</h2>
              <div className="mt-1 text-[13px] text-mute">Lietuvos {company.foundedNote}</div>

              <div className="mt-[26px] grid gap-[22px]">
                {DETAILS.map((r, i) => (
                  <div
                    key={r.label}
                    className={`flex gap-4 ${i < DETAILS.length - 1 ? "border-b border-line-soft pb-[22px]" : ""}`}
                  >
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center bg-red text-white">
                      <Icon name={r.ic} size={22} className="text-white" />
                    </div>
                    <div>
                      <div className="text-[11px] font-bold uppercase tracking-[0.1em] text-mute">
                        {r.label}
                      </div>
                      <div className="mt-1 text-[22px] font-bold text-navy">{r.value}</div>
                      <div className="mt-1 text-[13px] text-mute">{r.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Company history + quick contact */}
            <div className="flex flex-col gap-[22px]">
              <div className="bg-navy p-[26px] text-white">
                <div className="text-base font-bold">Įmonės istorija</div>
                <p className="mt-2.5 text-sm leading-relaxed text-white/85">{company.descLong}</p>
              </div>

              <div className="flex flex-1 flex-col justify-center border border-line bg-white p-[26px]">
                <h3 className="heading text-lg font-bold">Reikia pasiūlymo?</h3>
                <p className="mt-2 text-sm leading-relaxed text-mute">
                  Paskambinkite arba parašykite — nurodykite žarnos tipą, kiekį, diametrą ir
                  darbinę temperatūrą, ir paruošime pasiūlymą.
                </p>
                <div className="mt-5 flex flex-wrap gap-3">
                  <Button href={company.phoneHref} kind="primary" icon={false} external>
                    <Icon name="phone" size={14} /> {company.phone}
                  </Button>
                  <Button href={`mailto:${company.email}`} kind="outline" icon={false} external>
                    <Icon name="mail" size={14} /> El. paštas
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
