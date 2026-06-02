import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getAllProducts,
  getProductBySlug,
  getProductsByCategory,
  type Product,
} from "@/lib/products";
import { categoryById } from "@/lib/categories";
import { industryById } from "@/lib/industries";
import { company } from "@/lib/site";
import { ProductCard } from "@/components/ProductCard";
import { Container, Button, SectionHead } from "@/components/ui";
import { Icon } from "@/components/icons";

type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getAllProducts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return { title: "Produktas nerastas" };
  return {
    title: product.name,
    description: product.description || product.shortNote || company.descShort,
  };
}

// Key chips at a glance — only those with values, capped at 6.
function keyChips(p: Product): { l: string; v: string }[] {
  return [
    { l: "DN", v: p.dn },
    { l: "Temp.", v: p.temp },
    { l: "Slėgis", v: p.pressure },
    { l: "Lenkimas", v: p.bendRadius },
    { l: "Ilgis", v: p.standardLength },
    { l: "Sertifikatai", v: p.certifications },
    { l: "Vakuumas", v: p.vacuum },
  ]
    .filter((c) => c.v)
    .slice(0, 6);
}

function specRows(p: Product): { k: string; v: string }[] {
  return (
    [
      ["Vidinis diametras (DN)", p.dn],
      ["Darbinė temperatūra", p.temp],
      ["Darbinis slėgis", p.pressure],
      ["Vakuumas", p.vacuum],
      ["Sienelės storis", p.wallThickness],
      ["Min. lenkimo spindulys", p.bendRadius],
      ["Medžiaga", p.material],
      ["Armatūra", p.reinforcement],
      ["Spalvos", p.colorsAvailable],
      ["Standartinis ilgis", p.standardLength],
      ["Tiekiami diametrai", p.sizes.join(", ")],
      ["Sertifikatai", p.certifications],
      ["Pagaminta", p.origin],
    ] as [string, string][]
  )
    .filter(([, v]) => v)
    .map(([k, v]) => ({ k, v }));
}

export default async function ProductPage({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const category = categoryById(product.category);
  const chips = keyChips(product);
  const rows = specRows(product);
  const industryNames = product.industries
    .map((id) => industryById(id)?.name)
    .filter((n): n is string => Boolean(n));
  const related = getProductsByCategory(product.category)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  return (
    <>
      {/* Breadcrumb bar */}
      <section className="border-b border-line bg-bg-alt">
        <Container className="py-5">
          <nav aria-label="Naršymo kelias" className="flex flex-wrap items-center gap-2 text-[12.5px] text-mute">
            <Link href="/" className="nav-link hover:text-red">Pagrindinis</Link>
            <span className="opacity-50">/</span>
            <Link href="/products" className="nav-link hover:text-red">Produktai</Link>
            {category && (
              <>
                <span className="opacity-50">/</span>
                <Link href={`/products?category=${category.id}`} className="nav-link hover:text-red">
                  {category.name}
                </Link>
              </>
            )}
            {product.subcategory && (
              <>
                <span className="opacity-50">/</span>
                <span>{product.subcategory}</span>
              </>
            )}
            <span className="opacity-50">/</span>
            <strong className="font-semibold text-navy">{product.name}</strong>
          </nav>
        </Container>
      </section>

      {/* Overview */}
      <section className="bg-bg py-11">
        <Container>
          <div className="grid gap-10 lg:grid-cols-[1.05fr_1fr] lg:gap-14">
            {/* Gallery */}
            <div>
              <div className="relative flex h-[420px] items-center justify-center border border-line bg-bg-warm p-6 lg:h-[460px]">
                {product.image && (
                  <Image
                    src={product.image}
                    alt={product.name}
                    fill
                    priority
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="object-contain p-6"
                  />
                )}
                <span className="absolute left-[18px] top-[18px] bg-red px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.08em] text-white">
                  Sandėlyje
                </span>
                {product.subcategory && (
                  <span className="absolute right-[18px] top-[18px] border border-line bg-white px-2.5 py-1.5 text-[11px] font-bold uppercase tracking-[0.06em] text-navy">
                    {product.subcategory}
                  </span>
                )}
              </div>
              <div className="mt-3 grid grid-cols-5 gap-2">
                <div className="flex h-20 items-center justify-center border-2 border-red bg-bg-warm p-1.5">
                  {product.image && (
                    <Image src={product.image} alt="" width={80} height={50} className="h-full w-full object-contain" />
                  )}
                </div>
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="flex h-20 items-center justify-center border border-line bg-bg-warm/60" />
                ))}
              </div>
            </div>

            {/* Info */}
            <div>
              <span className="eyebrow">
                {category?.name}
                {product.subcategory ? ` · ${product.subcategory}` : ""}
              </span>
              <h1 className="heading mt-3 text-3xl sm:text-4xl">{product.name}</h1>
              <p className="mt-4 max-w-[540px] text-[15.5px] leading-relaxed text-ink">
                {product.description || product.shortNote}
              </p>

              {/* Key chips */}
              {chips.length > 0 && (
                <div className="mt-[22px] grid grid-cols-2 gap-2.5 sm:grid-cols-3">
                  {chips.map((s) => (
                    <div key={s.l} className="border border-line bg-bg-alt px-3.5 py-3">
                      <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-mute">
                        {s.l}
                      </div>
                      <div className="mt-1 text-sm font-extrabold tabular-nums text-navy">
                        {s.v}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Industries */}
              {industryNames.length > 0 && (
                <div className="mt-[22px]">
                  <div className="mb-2.5 text-[11px] font-bold uppercase tracking-[0.1em] text-mute">
                    Pritaikymo sritys
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {industryNames.map((n) => (
                      <Link
                        key={n}
                        href="/industries"
                        className="nav-link border border-line bg-white px-3 py-1.5 text-[12.5px] font-semibold text-navy"
                      >
                        {n}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {/* CTA box */}
              <div className="mt-7 bg-navy p-[22px] text-white">
                <div className="text-base font-bold">Reikia individualios konfigūracijos?</div>
                <div className="mb-4 mt-1.5 text-[13.5px] text-white/85">
                  Susisiekite su mūsų inžinieriumi — gausite parinkimo rekomendacijas ir kainą.
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button href={company.phoneHref} kind="primary" icon={false} external>
                    <Icon name="phone" size={14} /> Skambinti
                  </Button>
                  <Button
                    href={`mailto:${company.email}?subject=${encodeURIComponent("Užklausa: " + product.name)}`}
                    kind="outlineLight"
                    icon={false}
                    external
                  >
                    <Icon name="mail" size={14} /> El. paštas
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Specifications */}
      {rows.length > 0 && (
        <section className="border-t border-line bg-bg py-12 pb-16">
          <Container>
            <SectionHead eyebrow="Techniniai duomenys" title="Specifikacija" className="mb-7" />
            <table className="spec-table max-w-[820px] border border-line bg-white">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="w-2/5 text-xs font-bold uppercase tracking-[0.08em]">Parametras</th>
                  <th className="text-xs font-bold uppercase tracking-[0.08em]">Reikšmė</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((r, i) => (
                  <tr key={r.k} className={`border-t border-line ${i % 2 ? "bg-bg-warm" : "bg-white"}`}>
                    <td className="text-sm font-medium text-mute">{r.k}</td>
                    <td className="text-sm font-bold tabular-nums text-ink">{r.v}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Container>
        </section>
      )}

      {/* Related */}
      {related.length > 0 && (
        <section className="border-t border-line bg-bg-alt py-16">
          <Container>
            <SectionHead eyebrow="Panašios pozicijos" title="Susijusios prekės" className="mb-7" />
            <div className="grid gap-3 lg:grid-cols-2">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
