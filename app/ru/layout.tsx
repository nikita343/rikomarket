import type { Metadata, Viewport } from "next";
import { SiteLayout } from "@/components/SiteLayout";
import { getDict } from "@/lib/dictionary";
import { company, getSite } from "@/lib/site";
import { SITE_URL, defaultOgImage, ogLocale } from "@/lib/seo";

const locale = "ru" as const;
const t = getDict(locale);

// Site-wide defaults. Each page sets its own canonical URL, hreflang links and
// Open Graph data through pageMetadata() in lib/seo.ts — nothing URL-specific
// lives here, or every page would inherit the home page's canonical.
export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: t.home.metaTitle,
    template: `%s — ${company.nameShort}`,
  },
  description: getSite(locale).descShort,
  applicationName: company.nameShort,
  openGraph: {
    type: "website",
    siteName: company.nameShort,
    locale: ogLocale[locale],
    images: [defaultOgImage[locale]],
  },
  // Vercel preview deployments must never be indexed.
  robots:
    process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production"
      ? { index: false, follow: false }
      : { index: true, follow: true },
  formatDetection: { telephone: false, email: false, address: false },
};

export const viewport: Viewport = {
  themeColor: "#14233a",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <SiteLayout locale={locale}>{children}</SiteLayout>;
}
