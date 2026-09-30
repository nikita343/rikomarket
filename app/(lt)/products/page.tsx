import type { Metadata } from "next";
import { ProductsPage } from "@/components/pages/Products";
import { getDict } from "@/lib/dictionary";
import { pageMetadata } from "@/lib/seo";

const locale = "lt" as const;
const t = getDict(locale).productsPage;

export const metadata: Metadata = pageMetadata({
  locale,
  path: "/products",
  title: t.metaTitle,
  description: t.metaDesc,
});

export default function Page() {
  return <ProductsPage locale={locale} />;
}
