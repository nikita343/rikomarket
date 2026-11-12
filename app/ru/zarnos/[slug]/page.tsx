import type { Metadata } from "next";
import { PurposeLandingPage, purposeLandingMetadata, purposeLandingParams } from "@/components/pages/PurposeLanding";

const locale = "ru" as const;

export const dynamicParams = false;
export const generateStaticParams = purposeLandingParams;

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  return purposeLandingMetadata((await params).slug, locale);
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  return <PurposeLandingPage slug={(await params).slug} locale={locale} />;
}
