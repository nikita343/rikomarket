import type { Metadata } from "next";
import { IndustriesPage } from "@/components/pages/Industries";
import { getDict } from "@/lib/dictionary";
import { pageMetadata } from "@/lib/seo";

const locale = "ru" as const;
const t = getDict(locale).industriesPage;

export const metadata: Metadata = pageMetadata({
  locale,
  path: "/industries",
  title: t.metaTitle,
  description: t.metaDesc,
});

export default function Page() {
  return <IndustriesPage locale={locale} />;
}
