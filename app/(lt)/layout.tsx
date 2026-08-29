import type { Metadata } from "next";
import { SiteLayout } from "@/components/SiteLayout";
import { getDict } from "@/lib/dictionary";
import { getSite } from "@/lib/site";
import { company } from "@/lib/site";

const locale = "lt" as const;
const t = getDict(locale);

export const metadata: Metadata = {
  title: {
    default: t.home.metaTitle,
    template: `%s — ${company.nameShort}`,
  },
  description: getSite(locale).descShort,
  alternates: {
    canonical: "/",
    languages: { lt: "/", ru: "/ru" },
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <SiteLayout locale={locale}>{children}</SiteLayout>;
}
