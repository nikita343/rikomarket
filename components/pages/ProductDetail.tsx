import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getProductBySlug, getProductsByCategory, type Product } from "@/lib/products";
import { categoryById, categoryName } from "@/lib/categories";
import { industryById, industryText } from "@/lib/industries";
import { company } from "@/lib/site";
import { getDict, type Dict } from "@/lib/dictionary";
import { localeHref, type Locale } from "@/lib/i18n";
import { ProductCard } from "@/components/ProductCard";
import { Container, Button, SectionHead } from "@/components/ui";
import { Icon } from "@/components/icons";

// Key chips at a glance — only those with values, capped at 6.
function keyChips(p: Product, t: Dict): { l: string; v: string }[] {
  const c = t.product.chips;
  return [
    { l: c.dn, v: p.dn },
    { l: c.temp, v: p.temp },
    { l: c.pressure, v: p.pressure },
    { l: c.bend, v: p.bendRadius },
    { l: c.length, v: p.standardLength },
    { l: c.certificates, v: p.certifications },
    { l: c.vacuum, v: p.vacuum },
  ]
    .filter((chip) => chip.v)
    .slice(0, 6);
}

function specRows(p: Product, t: Dict): { k: string; v: string }[] {
  const s = t.product.specs;
  return (
    [
      [s.dn, p.dn],
      [s.temp, p.temp],
      [s.pressure, p.pressure],
      [s.vacuum, p.vacuum],
      [s.wallThickness, p.wallThickness],
      [s.bendRadius, p.bendRadius],
      [s.material, p.material],
      [s.reinforcement, p.reinforcement],
      [s.colors, p.colorsAvailable],
      [s.standardLength, p.standardLength],
      [s.sizes, p.sizes.join(", ")],
      [s.certifications, p.certifications],
      [s.origin, p.origin],
    ] as [string, string][]
  )
    .filter(([, v]) => v)
    .map(([k, v]) => ({ k, v }));
}

export function ProductDetailPage({ slug, locale }: { slug: string; locale: Locale }) {
  const product = getProductBySlug(slug, locale);
  if (!product) notFound();

  const t = getDict(locale);
  const category = categoryById(product.category);
  const chips = keyChips(product, t);
  const rows = specRows(product, t);
  const leadText =
    product.shortNote ||
    product.descLines.find((l) => !l.heading)?.text ||
    product.description;
  const industryNames = product.industries
    .map((id) => {
      const ind = industryById(id);
      return ind ? industryText(ind, locale).name : undefined;
    })
    .filter((n): n is string => Boolean(n));
  const related = getProductsByCategory(product.category, locale)
    .filter((p) => p.slug !== product.slug)
    .slice(0, 4);

  return (
    <>
      {/* Breadcrumb bar */}
      <section className="border-b border-line bg-bg-alt">
        <Container className="py-5">
          <nav
            aria-label={t.common.breadcrumbLabel}
            className="flex flex-wrap items-center gap-2 text-[12.5px] text-mute"
          >
            <Link href={localeHref(locale, "/")} className="nav-link hover:text-red">
              {t.common.home}
            </Link>
            <span className="opacity-50">/</span>
            <Link href={localeHref(locale, "/products")} className="nav-link hover:text-red">
              {t.common.products}
            </Link>
            {category && (
              <>
                <span className="opacity-50">/</span>
                <Link
                  href={localeHref(locale, `/products?category=${category.id}`)}
                  className="nav-link hover:text-red"
                >
                  {categoryName(category, locale)}
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
                  {t.product.inStock}
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
                    <Image
                      src={product.image}
                      alt=""
                      width={80}
                      height={50}
                      className="h-full w-full object-contain"
                    />
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
                {category ? categoryName(category, locale) : ""}
                {product.subcategory ? ` · ${product.subcategory}` : ""}
              </span>
              <h1 className="heading mt-3 text-3xl sm:text-4xl">{product.name}</h1>
              <p className="mt-4 max-w-[540px] text-[15.5px] leading-relaxed text-ink">
                {leadText}
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
                    {t.product.applications}
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {industryNames.map((n) => (
                      <Link
                        key={n}
                        href={localeHref(locale, "/industries")}
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
                <div className="text-base font-bold">{t.product.customTitle}</div>
                <div className="mb-4 mt-1.5 text-[13.5px] text-white/85">
                  {t.product.customText}
                </div>
                <div className="flex flex-wrap gap-3">
                  <Button href={company.phoneHref} kind="primary" icon={false} external>
                    <Icon name="phone" size={14} /> {t.common.call}
                  </Button>
                  <Button
                    href={`mailto:${company.email}?subject=${encodeURIComponent(
                      t.product.mailSubject + product.name,
                    )}`}
                    kind="outlineLight"
                    icon={false}
                    external
                  >
                    <Icon name="mail" size={14} /> {t.common.email}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Full description */}
      {product.descLines.length > 0 && (
        <section className="border-t border-line bg-bg-alt py-12 pb-14">
          <Container>
            <SectionHead
              eyebrow={t.product.descEyebrow}
              title={t.product.descTitle}
              className="mb-7"
            />
            <div className="max-w-[760px] space-y-2.5">
              {product.descLines.map((line, i) =>
                line.heading ? (
                  <h3
                    key={i}
                    className="pt-3 text-[15px] font-bold uppercase tracking-[0.04em] text-navy first:pt-0"
                  >
                    {line.text.replace(/:$/, "")}
                  </h3>
                ) : (
                  <p key={i} className="text-[15px] leading-relaxed text-ink">
                    {line.text}
                  </p>
                ),
              )}
            </div>
          </Container>
        </section>
      )}

      {/* Dimensions table (sourced 1:1 from the original product page) */}
      {product.specTable && product.specTable.rows.length > 0 && (
        <section className="border-t border-line bg-bg py-12 pb-14">
          <Container>
            <SectionHead
              eyebrow={t.product.dimsEyebrow}
              title={t.product.dimsTitle}
              className="mb-7"
            />
            <div className="max-w-full overflow-x-auto border border-line">
              <table className="w-full min-w-[480px] border-collapse bg-white text-sm">
                <thead>
                  <tr className="bg-navy text-white">
                    {product.specTable.headers.map((h, i) => (
                      <th
                        key={i}
                        className="border-r border-white/15 px-3 py-2.5 text-left text-xs font-bold uppercase tracking-[0.04em] last:border-r-0"
                      >
                        {h}
                      </th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {product.specTable.rows.map((r, ri) => (
                    <tr key={ri} className={`border-t border-line ${ri % 2 ? "bg-bg-warm" : "bg-white"}`}>
                      {r.map((c, ci) => (
                        <td
                          key={ci}
                          className="border-r border-line-soft px-3 py-2 tabular-nums text-ink last:border-r-0"
                        >
                          {c}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Container>
        </section>
      )}

      {/* Specifications */}
      {rows.length > 0 && (
        <section className="border-t border-line bg-bg py-12 pb-16">
          <Container>
            <SectionHead
              eyebrow={t.product.specsEyebrow}
              title={t.product.specsTitle}
              className="mb-7"
            />
            <table className="spec-table max-w-[820px] border border-line bg-white">
              <thead>
                <tr className="bg-navy text-white">
                  <th className="w-2/5 text-xs font-bold uppercase tracking-[0.08em]">
                    {t.product.parameter}
                  </th>
                  <th className="text-xs font-bold uppercase tracking-[0.08em]">
                    {t.product.value}
                  </th>
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
            <SectionHead
              eyebrow={t.product.relatedEyebrow}
              title={t.product.relatedTitle}
              className="mb-7"
            />
            <div className="grid gap-3 lg:grid-cols-2">
              {related.map((p) => (
                <ProductCard key={p.slug} product={p} locale={locale} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </>
  );
}
