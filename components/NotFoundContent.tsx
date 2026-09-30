import { Container, Button } from "@/components/ui";
import { localeHref, type Locale } from "@/lib/i18n";

const COPY: Record<Locale, { eyebrow: string; title: string; text: string; home: string; products: string }> = {
  lt: {
    eyebrow: "Klaida 404",
    title: "Puslapis nerastas",
    text: "Atsiprašome, tokio puslapio nėra arba jis buvo perkeltas. Grįžkite į pradžią arba peržiūrėkite produktų katalogą.",
    home: "Į pradžią",
    products: "Produktų katalogas",
  },
  ru: {
    eyebrow: "Ошибка 404",
    title: "Страница не найдена",
    text: "Такой страницы нет или она была перемещена. Вернитесь на главную или откройте каталог продукции.",
    home: "На главную",
    products: "Каталог продукции",
  },
};

export function NotFoundContent({ locale }: { locale: Locale }) {
  const c = COPY[locale];
  return (
    <section className="bg-bg py-24">
      <Container>
        <span className="eyebrow">{c.eyebrow}</span>
        <h1 className="mt-3 text-4xl font-extrabold tracking-tight text-navy sm:text-5xl">{c.title}</h1>
        <p className="mt-4 max-w-xl text-base text-mute">{c.text}</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Button href={localeHref(locale, "/")}>{c.home}</Button>
          <Button href={localeHref(locale, "/products")} kind="outline" icon={false}>
            {c.products}
          </Button>
        </div>
      </Container>
    </section>
  );
}
