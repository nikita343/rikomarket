import type { Metadata } from "next";
import {
  CategoryLandingPage,
  categoryLandingMetadata,
  categoryLandingParams,
} from "@/components/pages/CategoryLanding";

const locale = "lt" as const;

export const dynamicParams = false;
export const generateStaticParams = categoryLandingParams;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return categoryLandingMetadata((await params).slug, locale);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <CategoryLandingPage slug={(await params).slug} locale={locale} />;
}
