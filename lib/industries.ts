// Application industries — fixed reference data (from Ricomarket 2/src/data.jsx).
import type { IconName } from "@/components/icons";
import type { Locale } from "@/lib/i18n";

// One photo in an industry's gallery (files live in public/industries/<id>/).
// The rikomarket.com.ua photos are the old site's application tiles (300×300,
// the largest size the old site has); the food-industry photos are generated.
export type IndustryPhoto = {
  src: string;
  caption: string; // Lithuanian
  captionRu: string;
};

export type Industry = {
  id: string;
  name: string; // Lithuanian
  nameRu: string;
  desc: string; // Lithuanian
  descRu: string;
  icon: IconName;
  photos: IndustryPhoto[];
};

// Name + description in the requested locale.
export const industryText = (i: Industry, locale: Locale) =>
  locale === "ru" ? { name: i.nameRu, desc: i.descRu } : { name: i.name, desc: i.desc };

export const photoCaption = (p: IndustryPhoto, locale: Locale) =>
  locale === "ru" ? p.captionRu : p.caption;

const photo = (industry: string, file: string, caption: string, captionRu: string): IndustryPhoto => ({
  src: `/industries/${industry}/${file}.jpg`,
  caption,
  captionRu,
});

export const industries: Industry[] = [
  {
    id: "wood", name: "Medienos apdirbimas", nameRu: "Деревообработка",
    desc: "Drožlių, dulkių ištraukimas, CNC staklės, granulių linijos.",
    descRu: "Отвод стружки и пыли, станки с ЧПУ, линии гранулирования.",
    icon: "wood",
    photos: [
      photo("wood", "cnc", "CNC staklėms", "Для станков с ЧПУ"),
      photo("wood", "furniture", "Baldų gamybai", "Для производства мебели"),
      photo("wood", "solid-wood", "Masyvo apdirbimui", "Для обработки массива"),
      photo("wood", "pellets", "Granulių gamybai", "Для производства пеллет"),
      photo("wood", "manual", "Rankiniam naudojimui", "Для ручного использования"),
      photo("wood", "chip-extractors", "Drožlių siurbliams", "Для стружкоотсосов"),
    ],
  },
  {
    id: "vent", name: "Vėdinimo sistemos", nameRu: "Вентиляционные системы",
    desc: "Aukštų ir žemų temperatūrų vėdinimas, chemikalų garai.",
    descRu: "Вентиляция при высоких и низких температурах, химические пары.",
    icon: "vent",
    photos: [
      photo("vent", "high-temp", "Aukštoms temperatūroms", "Для высоких температур"),
      photo("vent", "low-temp", "Žemoms temperatūroms", "Для низких температур"),
      photo("vent", "chemical-fumes", "Cheminiams garams", "Для химических испарений"),
      photo("vent", "mines", "Šachtoms su sprogimo pavojumi", "Для шахт с угрозой взрыва"),
    ],
  },
  {
    id: "food", name: "Maisto pramonė", nameRu: "Пищевая промышленность",
    desc: "Sertifikuoti žarnų gaminiai, atitinkantys maisto kontaktui keliamus reikalavimus.",
    descRu: "Сертифицированные рукава, отвечающие требованиям контакта с пищевыми продуктами.",
    icon: "food",
    photos: [
      photo("food", "wine", "Vyno gamybai", "Для виноделия"),
      photo("food", "juice", "Sulčių gamybai", "Для производства соков"),
      photo("food", "dairy", "Pieno pramonei", "Для молочной промышленности"),
      photo("food", "grain", "Birių produktų transportavimui", "Для транспортировки сыпучих продуктов"),
    ],
  },
  {
    id: "chem", name: "Cheminė pramonė", nameRu: "Химическая промышленность",
    desc: "Atsparios chemikalams žarnos. Galvanika, laboratorijos, garų ištraukimas.",
    descRu: "Химически стойкие рукава. Гальваника, лаборатории, отвод паров.",
    icon: "chem",
    photos: [
      photo("chem", "electroplating", "Galvanikai", "Для гальваники"),
      photo("chem", "chemical-vapours", "Cheminiams garams", "Для химических паров"),
      photo("chem", "laboratories", "Cheminėms laboratorijoms", "Для химических лабораторий"),
    ],
  },
  {
    id: "agri", name: "Žemės ūkis", nameRu: "Сельское хозяйство",
    desc: "Sėjamosios, granuliatoriai, purkštuvai, grūdų transportavimas.",
    descRu: "Сеялки, грануляторы, опрыскиватели, транспортировка зерна.",
    icon: "agri",
    photos: [
      photo("agri", "vibrating-screens", "Vibracinėms sijojimo mašinoms", "Для виброситовых машин"),
      photo("agri", "granulators", "Granuliatoriams", "Для грануляторов"),
      photo("agri", "dredgers-pumps", "Žemsiurbėms ir motopompoms", "Для земснарядов и мотопомп"),
      photo("agri", "sprayers", "Purkštuvams ir cheminėms trąšoms", "Для опрыскивателей и химических удобрений"),
      photo("agri", "pneumatic-transport", "Pneumotransportui", "Для пневмотранспорта"),
      photo("agri", "seeders", "Sėjamosioms", "Для сеялок"),
      photo("agri", "grain", "Grūdų transportavimui", "Для транспортировки зерна"),
    ],
  },
  {
    id: "spec", name: "Specialioji technika", nameRu: "Спецтехника",
    desc: "Asenizacija, komunalinė technika, motopompos, vakuuminiai siurbliai.",
    descRu: "Ассенизация, коммунальная техника, мотопомпы, вакуумные насосы.",
    icon: "spec",
    photos: [
      photo("spec", "sewage", "Asenizacijai", "Для ассенизации"),
      photo("spec", "road-vacuum", "Kelių vakuuminiams siurbliams", "Для дорожных вакуумных пылесосов"),
      photo("spec", "municipal", "Komunalinei technikai", "Для коммунальной техники"),
      photo("spec", "motor-pumps", "Motopompoms", "Для мотопомп"),
    ],
  },
];

const byId = new Map(industries.map((i) => [i.id, i]));
export const industryById = (id: string): Industry | undefined => byId.get(id);
