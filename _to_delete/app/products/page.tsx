import type { Metadata } from "next";
import { Suspense } from "react";
import { getAllProducts, countByCategory } from "@/lib/products";
import { categories } from "@/lib/categories";
import { Container, PageHero } from "@/components/ui";
import { ProductsBrowser, type BrowserCat, type BrowserProduct } from "@/components/ProductsBrowser";

export const metadata: Metadata = {
  title: "Produktai",
  description:
    "Visas techninių žarnų asortimentas: PVC, PUR, KLIN, metalo ir sujungimo elementai.",
};

// Statically rendered (SSG). The selected category is read from the URL
// client-side, so this page stays static — no per-request server rendering.
export default function ProductsPage() {
  const counts = countByCategory();
  const browserCats: BrowserCat[] = categories.map((c) => ({
    id: c.id,
    name: c.name,
    parent: c.parent,
    count: counts[c.id] ?? 0,
  }));

  // Trim products to just what the client needs (keeps the JSON payload small).
  const products: BrowserProduct[] = getAllProducts().map((p) => ({
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
        breadcrumb={[
          { label: "Pagrindinis", href: "/" },
          { label: "Produktai", href: "/products" },
        ]}
        eyebrow="Produktai"
        title="Produktų kategorijos."
        sub="Pasirinkite kategoriją. Diametrai 10–1200 mm, temperatūros nuo −150 iki +1100 °C."
      />

      <section className="bg-bg pb-20 pt-10">
        <Container>
          <Suspense fallback={null}>
            <ProductsBrowser products={products} categories={browserCats} />
          </Suspense>
        </Container>
      </section>
    </>
  );
}
