import type { Metadata } from "next";
import { PrivacyPage, privacyIntro, privacyTitle } from "@/components/pages/Privacy";
import { pageMetadata } from "@/lib/seo";

const locale = "ru" as const;

export const metadata: Metadata = pageMetadata({
  locale,
  path: "/privacy",
  title: privacyTitle(locale),
  description: privacyIntro(locale),
});

export default function Page() {
  return <PrivacyPage locale={locale} />;
}
