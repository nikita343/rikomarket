import type { Metadata } from "next";
import { getAllProducts, countByCategory } from "@/lib/products";
import { categories, categoryById } from "@/lib/categories";
import { Container, PageHero } from "@/components/ui";
import { ProductsBrowser, type BrowserCat } from "@/components/ProductsBrowser";

export const metadata: Metadata = {
  title: "Produktai",
  description:
    "Visas techninių žarnų asortimentas: PVC, PUR, KLIN, metalo, gumos ir sujungimo elementai.",
};

type SearchParams = Promise<{ category?: string }>;

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { category } = await searchParams;
  const activeCat = category ? categoryById(category) : undefined;
  const counts = countByCategory();

  const browserCats: BrowserCat[] = categories.map((c) => ({
    id: c.id,
    name: c.name,
    sub: c.sub,
    count: counts[c.id] ?? 0,
  }));

  return (
    <>
      <PageHero
        breadcrumb={[
          { label: "Pagrindinis", href: "/" },
          { label: "Produktai", href: "/products" },
          ...(activeCat ? [{ label: activeCat.name }] : []),
        ]}
        eyebrow="Produktai"
        title="Visas asortimentas."
        sub="Filtruokite pagal kategoriją kairėje. Diametrai 10–1200 mm, temperatūros nuo −150 iki +1100 °C."
      />

      <section className="bg-bg pb-20 pt-10">
        <Container>
          <ProductsBrowser
            products={getAllProducts()}
            categories={browserCats}
            initialCategory={activeCat?.id}
          />
        </Container>
      </section>
    </>
  );
}
