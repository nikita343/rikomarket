import type { Metadata } from "next";
import { SiteLayout } from "@/components/SiteLayout";
import { NotFoundContent } from "@/components/NotFoundContent";

// URLs that match no route at all. The site has two root layouts (LT and RU),
// so this page renders its own shell — in Lithuanian, the default locale.
export const metadata: Metadata = {
  title: "Puslapis nerastas — Riko Market",
  robots: { index: false },
};

export default function GlobalNotFound() {
  return (
    <SiteLayout locale="lt">
      <NotFoundContent locale="lt" />
    </SiteLayout>
  );
}
