import type { Metadata } from "next";
import { UnitsPage } from "@/components/pages/Units";
import { getDict } from "@/lib/dictionary";

const t = getDict("ru").unitsPage;
export const metadata: Metadata = { title: t.metaTitle, description: t.metaDesc };

export default function Page() {
  return <UnitsPage locale="ru" />;
}
