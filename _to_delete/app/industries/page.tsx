import type { Metadata } from "next";
import Link from "next/link";
import { industries } from "@/lib/industries";
import { getAllProducts } from "@/lib/products";
import { Container, PageHero } from "@/components/ui";
import { Icon } from "@/components/icons";

export const metadata: Metadata = {
  title: "Pritaikymo sritys",
  description:
    "Techninių žarnų pritaikymas pramonės šakose: mediena, vėdinimas, žemės ūkis, chemija, specialioji technika ir kt.",
};

const TAGS = ["Aukšta temperatūra", "Abrazyvinė aplinka", "Lankstumas", "Antistatinis"];

export default function IndustriesPage() {
  const all = getAllProducts();

  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Pagrindinis", href: "/" }, { label: "Pritaikymo sritys" }]}
        eyebrow="Pritaikymo sritys"
        title="Šešios pramonės šakos."
        sub="Tiekiame techninių žarnų asortimentą medienos apdirbimo, vėdinimo, žemės ūkio, chemijos, maisto ir specialiosios technikos sektoriams."
      />

      <section className="bg-bg py-[60px]">
        <Container>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {industries.map((ind, idx) => {
              const count = all.filter((p) => p.industries.includes(ind.id)).length;
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
                  <h2 className="heading text-xl">{ind.name}</h2>
                  <p className="mt-2.5 flex-1 text-[14px] leading-relaxed text-ink">{ind.desc}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {TAGS.slice(0, 2 + (idx % 2)).map((t) => (
                      <span
                        key={t}
                        className="border border-line bg-bg-alt px-2.5 py-1 text-[11px] font-semibold uppercase tracking-[0.06em] text-ink"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <Link
                    href="/products"
                    className="nav-link mt-5 inline-flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-[0.06em] text-red"
                  >
                    Žiūrėti žarnas {count > 0 && <span className="text-mute">({count})</span>}
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
