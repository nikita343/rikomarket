import type { Metadata } from "next";
import { ProductDetailPage } from "@/components/pages/ProductDetail";
import { JsonLd } from "@/components/JsonLd";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import { categoryById, categoryName } from "@/lib/categories";
import { getDict } from "@/lib/dictionary";
import { getSite } from "@/lib/site";
import { localeHref } from "@/lib/i18n";
import { breadcrumbJsonLd, pageMetadata, productDescription, productJsonLd, productTitle } from "@/lib/seo";
import { categoryPath } from "@/lib/landing";

const locale = "ru" as const;
type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getAllProducts(locale).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug, locale);
  if (!product) return { title: getDict(locale).product.notFound, robots: { index: false } };
  return pageMetadata({
    locale,
    path: `/products/${product.slug}`,
    title: productTitle(product, locale),
    description: productDescription(product, locale),
    image: product.image ? { url: product.image, alt: product.name } : undefined,
  });
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  const product = getProductBySlug(slug, locale);
  const nav = getSite(locale).nav;
  const category = product ? categoryById(product.category) : undefined;
  const catLabel = category ? categoryName(category, locale) : undefined;
  return (
    <>
      {product && (
        <JsonLd
          data={[
            productJsonLd(product, locale, catLabel),
            breadcrumbJsonLd([
              { name: nav[0].label, path: localeHref(locale, "/") },
              { name: nav[1].label, path: localeHref(locale, "/products") },
              ...(category && catLabel
                ? [{ name: catLabel, path: localeHref(locale, categoryPath(category.id)) }]
                : []),
              { name: product.name, path: localeHref(locale, `/products/${product.slug}`) },
            ]),
          ]}
        />
      )}
      <ProductDetailPage slug={slug} locale={locale} />
    </>
  );
}
