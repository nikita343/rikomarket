import type { Metadata } from "next";
import { Container, PageHero } from "@/components/ui";
import { ChemTable } from "@/components/ChemTable";

export const metadata: Metadata = {
  title: "Cheminis atsparumas",
  description:
    "Cheminio atsparumo lentelė: žarnų medžiagų (PVC, PUR, Santoprenas, Silikonas, Teflonas, Nitrilas, Chloroprenas, Hipalonas, Polietilenas) atsparumas chemikalams.",
};

export default function ChemResistancePage() {
  return (
    <>
      <PageHero
        breadcrumb={[{ label: "Pagrindinis", href: "/" }, { label: "Cheminio atsparumo lentelė" }]}
        eyebrow="Informacinė lentelė"
        title="Cheminio atsparumo lentelė."
        sub="Pagrindinių žarnų medžiagų atsparumas dažniausiai naudojamiems chemikalams. Rekomenduojame pasitarti su mūsų inžinieriais dėl konkretaus pritaikymo."
      />

      <section className="bg-bg py-[50px] pb-16">
        <Container>
          <ChemTable />
        </Container>
      </section>
    </>
  );
}
