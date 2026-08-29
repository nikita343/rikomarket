import { Manrope } from "next/font/google";
import "@/app/globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { htmlLang, type Locale } from "@/lib/i18n";

// Direction B typography: Manrope for both headings and body. latin-ext covers
// Lithuanian glyphs (ž č ū ė į š), cyrillic covers the Russian locale.
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext", "cyrillic"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

// Shared document shell. Each locale has its own root layout (app/(lt) and
// app/ru), so `lang` is correct per locale and the header/footer are localized.
export function SiteLayout({
  locale,
  children,
}: {
  locale: Locale;
  children: React.ReactNode;
}) {
  return (
    <html lang={htmlLang[locale]} className={`${manrope.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-bg text-ink">
        <Header locale={locale} />
        <main className="flex-1">{children}</main>
        <Footer locale={locale} />
      </body>
    </html>
  );
}
