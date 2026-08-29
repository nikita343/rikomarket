import { getDict } from "@/lib/dictionary";
import { localeHref, type Locale } from "@/lib/i18n";
import { Container, PageHero } from "@/components/ui";
import { ChemTable } from "@/components/ChemTable";

export function ChemResistancePage({ locale }: { locale: Locale }) {
  const t = getDict(locale);
  return (
    <>
      <PageHero
        locale={locale}
        breadcrumb={[
          { label: t.common.home, href: localeHref(locale, "/") },
          { label: t.chemPage.title.replace(/\.$/, "") },
        ]}
        eyebrow={t.chemPage.eyebrow}
        title={t.chemPage.title}
        sub={t.chemPage.sub}
      />

      <section className="bg-bg py-[50px] pb-16">
        <Container>
          <ChemTable locale={locale} />
        </Container>
      </section>
    </>
  );
}
