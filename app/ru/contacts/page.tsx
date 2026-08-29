import type { Metadata } from "next";
import { ContactsPage } from "@/components/pages/Contacts";
import { getDict } from "@/lib/dictionary";

const t = getDict("ru").contactsPage;
export const metadata: Metadata = { title: t.metaTitle, description: t.metaDesc };

export default function Page() {
  return <ContactsPage locale="ru" />;
}
