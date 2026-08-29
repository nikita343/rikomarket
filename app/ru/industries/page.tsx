import type { Metadata } from "next";
import { IndustriesPage } from "@/components/pages/Industries";
import { getDict } from "@/lib/dictionary";

const t = getDict("ru").industriesPage;
export const metadata: Metadata = { title: t.metaTitle, description: t.metaDesc };

export default function Page() {
  return <IndustriesPage locale="ru" />;
}
