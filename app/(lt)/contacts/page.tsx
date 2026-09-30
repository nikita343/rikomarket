import type { Metadata } from "next";
import { ContactsPage } from "@/components/pages/Contacts";
import { getDict } from "@/lib/dictionary";
import { pageMetadata } from "@/lib/seo";

const locale = "lt" as const;
const t = getDict(locale).contactsPage;

export const metadata: Metadata = pageMetadata({
  locale,
  path: "/contacts",
  title: t.metaTitle,
  description: t.metaDesc,
});

export default function Page() {
  return <ContactsPage locale={locale} />;
}
