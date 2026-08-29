import type { Metadata } from "next";
import { ProductsPage } from "@/components/pages/Products";
import { getDict } from "@/lib/dictionary";

const t = getDict("lt").productsPage;
export const metadata: Metadata = { title: t.metaTitle, description: t.metaDesc };

export default function Page() {
  return <ProductsPage locale="lt" />;
}
