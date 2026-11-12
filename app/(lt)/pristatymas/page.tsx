import type { Metadata } from "next";
import { DeliveryPage, deliveryMetadata } from "@/components/pages/Delivery";

const locale = "lt" as const;

export const metadata: Metadata = deliveryMetadata(locale);

export default function Page() {
  return <DeliveryPage locale={locale} />;
}
