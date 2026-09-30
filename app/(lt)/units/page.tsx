import type { Metadata } from "next";
import { UnitsPage } from "@/components/pages/Units";
import { getDict } from "@/lib/dictionary";
import { pageMetadata } from "@/lib/seo";

const locale = "lt" as const;
const t = getDict(locale).unitsPage;

export const metadata: Metadata = pageMetadata({
  locale,
  path: "/units",
  title: t.metaTitle,
  description: t.metaDesc,
});

export default function Page() {
  return <UnitsPage locale={locale} />;
}
