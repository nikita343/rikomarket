import { Suspense } from "react";
import { getAllProducts, countByCategory } from "@/lib/products";
import { categories, categoryName } from "@/lib/categories";
import { getDict } from "@/lib/dictionary";
import { localeHref, type Locale } from "@/lib/i18n";
import { Container, PageHero } from "@/components/ui";
import {
  ProductsBrowser,
  type BrowserCat,
  type BrowserProduct,
} from "@/components/ProductsBrowser";

// Statically rendered (SSG). The selected category is read from the URL
// client-side, so this page stays static — no per-request server rendering.
export function ProductsPage({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  const counts = countByCategory();
  const browserCats: BrowserCat[] = categories.map((c) => ({
    id: c.id,
    name: categoryName(c, locale),
    parent: c.parent,
    count: counts[c.id] ?? 0,
  }));

  // Trim products to just what the client needs (keeps the JSON payload small).
  const products: BrowserProduct[] = getAllProducts(locale).map((p) => ({
    slug: p.slug,
    name: p.name,
    category: p.category,
    categories: p.categories,
    shortNote: p.shortNote,
    image: p.image,
    dn: p.dn,
    temp: p.temp,
    pressure: p.pressure,
  }));

  return (
    <>
      <PageHero
        locale={locale}
        breadcrumb={[
          { label: t.common.home, href: localeHref(locale, "/") },
          { label: t.common.products, href: localeHref(locale, "/products") },
        ]}
        eyebrow={t.productsPage.eyebrow}
        title={t.productsPage.title}
        sub={t.productsPage.sub}
      />

      <section className="bg-bg pb-20 pt-10">
        <Container>
          <Suspense fallback={null}>
            <ProductsBrowser products={products} categories={browserCats} locale={locale} />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
