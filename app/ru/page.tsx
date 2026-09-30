import type { Metadata } from "next";
import { HomePage } from "@/components/pages/Home";
import { JsonLd } from "@/components/JsonLd";
import { getDict } from "@/lib/dictionary";
import { getSite } from "@/lib/site";
import { organizationJsonLd, pageMetadata, websiteJsonLd } from "@/lib/seo";

const locale = "ru" as const;

export const metadata: Metadata = pageMetadata({
  locale,
  path: "/",
  title: getDict(locale).home.metaTitle,
  absoluteTitle: true,
  description: getSite(locale).descShort,
});

export default function Page() {
  return (
    <>
      <JsonLd data={[organizationJsonLd(locale), websiteJsonLd(locale)]} />
      <HomePage locale={locale} />
    </>
  );
}
