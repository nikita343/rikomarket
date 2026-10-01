// Company / site-wide content, per locale. Contact details that are the same in
// every language (phone, e-mail, domain) live in `company`; everything with
// words in it lives in `site[locale]`.
import type { Locale } from "@/lib/i18n";

// Company registration code (įmonės kodas). Still missing from the client —
// while it is empty the footer and contacts page simply leave it out, so no
// placeholder ever ships.
const companyCode = "";
const vat = "LT100020123613";
const legal = (codeLabel: string, vatLabel: string) =>
  [companyCode && `${codeLabel} ${companyCode}`, `${vatLabel} ${vat}`].filter(Boolean).join(" · ");

export const company = {
  nameShort: "Riko Market",
  // Main number (client, 2026-10-01: "must be first priority / the main one").
  phone: "+370 60 70 40 30",
  phoneHref: "tel:+37060704030",
  // Secondary number — shown smaller, under the main one.
  phone2: "+370 661 42272",
  phone2Href: "tel:+37066142272",
  email: "rikomarket.lt@gmail.com",
  website: "www.rikomarket.lt",
} as const;

export type Usp = { title: string; desc: string; icon: string };
export type NavItem = { label: string; href: string };

export type SiteContent = {
  nameFull: string;
  tagline: string;
  descShort: string;
  descLong: string;
  address: string;
  hours: string;
  foundedNote: string;
  legalLine: string;
  nav: readonly NavItem[];
  usps: readonly Usp[];
};

export const site: Record<Locale, SiteContent> = {
  lt: {
    nameFull: "UAB „Riko Market“",
    tagline: "Lankstūs sprendimai – patikimas rezultatas",
    descShort:
      "Techninės žarnos: PVC, PUR, KLIN, metalo, gumos. Diametrai 10–1200 mm. Temperatūros −150 … +1100 °C.",
    descLong:
      "Tiekiame techninių žarnų ir sujungimo elementų asortimentą medienos apdirbimo, vėdinimo, žemės ūkio, chemijos ir specialiosios technikos sektoriams.",
    address: "Elektrėnai, Lietuva",
    hours: "I–V / 9:00–18:00",
    foundedNote: legal("Įm. kodas", "PVM"),
    legalLine: `© 2026 UAB „Riko Market“ · ${legal("Įm. kodas", "PVM")}`,
    nav: [
      { label: "Pagrindinis", href: "/" },
      { label: "Produktai", href: "/products" },
      { label: "Pritaikymo sritys", href: "/industries" },
      { label: "Cheminis atsparumas", href: "/chemical-resistance" },
      { label: "Matavimo vienetai", href: "/units" },
      { label: "Kontaktai", href: "/contacts" },
    ],
    usps: [
      {
        title: "Pristatymas visoje Lietuvoje",
        desc: "Greitas siuntimas iš sandėlio Elektrėnuose. Pristatymas per 1–3 d.d.",
        icon: "truck",
      },
      {
        title: "Gamintojo kaina",
        desc: "Tiesioginės sutartys su Europos gamintojais. Be tarpininkų.",
        icon: "tag",
      },
      {
        title: "Pagalba parenkant",
        desc: "Inžinieriai padės parinkti tinkamą žarną pagal Jūsų darbo sąlygas.",
        icon: "wrench",
      },
    ],
  },
  ru: {
    nameFull: "UAB «Riko Market»",
    tagline: "Гибкие решения — надёжный результат",
    descShort:
      "Технические рукава: ПВХ, ПУ, KLIN, металлорукава, резина. Диаметры 10–1200 мм. Температуры −150 … +1100 °C.",
    descLong:
      "Поставляем технические рукава и соединительные элементы для деревообработки, вентиляции, сельского хозяйства, химической промышленности и спецтехники.",
    address: "Электренай, Литва",
    hours: "Пн–Пт / 9:00–18:00",
    foundedNote: legal("Код предприятия", "НДС"),
    legalLine: `© 2026 UAB «Riko Market» · ${legal("Код предприятия", "НДС")}`,
    nav: [
      { label: "Главная", href: "/" },
      { label: "Продукция", href: "/products" },
      { label: "Области применения", href: "/industries" },
      { label: "Химическая стойкость", href: "/chemical-resistance" },
      { label: "Единицы измерения", href: "/units" },
      { label: "Контакты", href: "/contacts" },
    ],
    usps: [
      {
        title: "Доставка по всей Литве",
        desc: "Быстрая отправка со склада в Электренае. Доставка за 1–3 рабочих дня.",
        icon: "truck",
      },
      {
        title: "Цена производителя",
        desc: "Прямые договоры с европейскими производителями. Без посредников.",
        icon: "tag",
      },
      {
        title: "Помощь в подборе",
        desc: "Инженеры помогут подобрать рукав под ваши условия эксплуатации.",
        icon: "wrench",
      },
    ],
  },
};

export const getSite = (locale: Locale): SiteContent => site[locale];
