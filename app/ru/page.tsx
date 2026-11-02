import type { Metadata } from "next";
import { HomePage } from "@/components/pages/Home";
import { JsonLd } from "@/components/JsonLd";
import { getDict } from "@/lib/dictionary";
import { homeFaq } from "@/lib/landing";
import { faqJsonLd, organizationJsonLd, pageMetadata, websiteJsonLd } from "@/lib/seo";

const locale = "ru" as const;

export const metadata: Metadata = pageMetadata({
  locale,
  path: "/",
  title: getDict(locale).home.metaTitle,
  absoluteTitle: true,
  description: getDict(locale).home.metaDesc,
});

export default function Page() {
  return (
    <>
      <JsonLd data={[organizationJsonLd(locale), websiteJsonLd(locale), faqJsonLd(homeFaq[locale])]} />
      <HomePage locale={locale} />
    </>
  );
}
