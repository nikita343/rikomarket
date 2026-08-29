import type { Metadata } from "next";
import { ProductDetailPage } from "@/components/pages/ProductDetail";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import { getDict } from "@/lib/dictionary";
import { getSite } from "@/lib/site";

const locale = "lt" as const;
type Params = Promise<{ slug: string }>;

export function generateStaticParams() {
  return getAllProducts(locale).map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: { params: Params }): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug, locale);
  if (!product) return { title: getDict(locale).product.notFound };
  return {
    title: product.name,
    description: product.description || product.shortNote || getSite(locale).descShort,
  };
}

export default async function Page({ params }: { params: Params }) {
  const { slug } = await params;
  return <ProductDetailPage slug={slug} locale={locale} />;
}
