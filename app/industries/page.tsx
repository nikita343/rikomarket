import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { industries } from "@/lib/industries";
import { getAllProducts } from "@/lib/products";
import { Container, PageHero, Button } from "@/components/ui";
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
        title="Aštuonios pramonės šakos."
        sub="Tiekiame techninių žarnų asortimentą medienos apdirbimo, vėdinimo, žemės ūkio, chemijos, specialiosios technikos ir kitiems sektoriams."
      />

      <section className="bg-bg py-[60px]">
        <Container>
          {industries.map((ind, idx) => {
            const flip = idx % 2 === 1;
            const products = all.filter((p) => p.industries.includes(ind.id)).slice(0, 4);
            const tiles = products.length ? products : all.slice(0, 4);
            return (
              <div
                key={ind.id}
                className={`grid items-center gap-14 py-14 lg:grid-cols-[1.1fr_1fr] ${
                  idx < industries.length - 1 ? "border-b border-line" : ""
                }`}
              >
                <div className={flip ? "lg:order-2" : ""}>
                  <div className="mb-3.5 flex items-center gap-3.5">
                    <div className="flex h-14 w-14 items-center justify-center bg-red text-white">
                      <Icon name={ind.icon} size={28} className="text-white" />
                    </div>
                    <span className="text-xs font-bold uppercase tracking-[0.1em] text-mute">
                      0{idx + 1} / 0{industries.length}
                    </span>
                  </div>
                  <h2 className="heading text-3xl">{ind.name}</h2>
                  <p className="mt-4 max-w-[540px] text-base leading-relaxed text-ink">
                    {ind.desc} Tinkamos žarnos parinkimas priklauso nuo darbinės
                    temperatūros, slėgio ir kontaktuojančių medžiagų.
                  </p>
                  <div className="mt-[22px] flex flex-wrap gap-2">
                    {TAGS.slice(0, 3 + (idx % 2)).map((t) => (
                      <span
                        key={t}
                        className="border border-line bg-bg-alt px-2.5 py-1.5 text-[11.5px] font-semibold uppercase tracking-[0.06em] text-ink"
                      >
                        {t}
                      </span>
                    ))}
                  </div>
                  <div className="mt-[26px]">
                    <Button href="/products" kind="primary">
                      Žiūrėti tinkamas žarnas
                    </Button>
                  </div>
                </div>

                <div className={`grid grid-cols-2 gap-3 ${flip ? "lg:order-1" : ""}`}>
                  {tiles.map((p) => (
                    <Link
                      key={p.slug}
                      href={`/products/${p.slug}`}
                      className="group block overflow-hidden border border-line bg-white"
                    >
                      <div className="relative h-32 overflow-hidden bg-bg-warm">
                        {p.image && (
                          <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            sizes="(min-width: 1024px) 25vw, 50vw"
                            className="object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        )}
                      </div>
                      <div className="px-3 py-2.5 text-[12.5px] font-semibold leading-tight text-navy">
                        {p.name}
                      </div>
                    </Link>
                  ))}
                </div>
              </div>
            );
          })}
        </Container>
      </section>
    </>
  );
}
