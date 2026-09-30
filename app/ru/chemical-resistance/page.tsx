import type { Metadata } from "next";
import { ChemResistancePage } from "@/components/pages/ChemicalResistance";
import { getDict } from "@/lib/dictionary";
import { pageMetadata } from "@/lib/seo";

const locale = "ru" as const;
const t = getDict(locale).chemPage;

export const metadata: Metadata = pageMetadata({
  locale,
  path: "/chemical-resistance",
  title: t.metaTitle,
  description: t.metaDesc,
});

export default function Page() {
  return <ChemResistancePage locale={locale} />;
}
