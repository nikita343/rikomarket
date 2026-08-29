import type { Metadata } from "next";
import { ChemResistancePage } from "@/components/pages/ChemicalResistance";
import { getDict } from "@/lib/dictionary";

const t = getDict("ru").chemPage;
export const metadata: Metadata = { title: t.metaTitle, description: t.metaDesc };

export default function Page() {
  return <ChemResistancePage locale="ru" />;
}
