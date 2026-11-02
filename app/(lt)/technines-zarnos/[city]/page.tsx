import type { Metadata } from "next";
import { CityLandingPage, cityLandingMetadata, cityLandingParams } from "@/components/pages/CityLanding";

const locale = "lt" as const;

export const dynamicParams = false;
export const generateStaticParams = cityLandingParams;

export async function generateMetadata({ params }: { params: Promise<{ city: string }> }): Promise<Metadata> {
  return cityLandingMetadata((await params).city, locale);
}

export default async function Page({ params }: { params: Promise<{ city: string }> }) {
  return <CityLandingPage slug={(await params).city} locale={locale} />;
}
