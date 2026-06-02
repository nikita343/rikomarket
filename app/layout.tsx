import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { company } from "@/lib/site";

// Direction B typography: Manrope for both headings and body. latin-ext
// covers Lithuanian glyphs (ž č ū ė į š).
const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

export const metadata: Metadata = {
  title: {
    default: `${company.nameShort} — techninės žarnos ir sujungimo elementai`,
    template: `%s — ${company.nameShort}`,
  },
  description: company.descShort,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="lt" className={`${manrope.variable} h-full`}>
      <body className="flex min-h-full flex-col bg-bg text-ink">
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
