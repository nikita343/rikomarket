// Application industries — fixed reference data (from Ricomarket 2/src/data.jsx).
import type { IconName } from "@/components/icons";
import type { Locale } from "@/lib/i18n";

export type Industry = {
  id: string;
  name: string; // Lithuanian
  nameRu: string;
  desc: string; // Lithuanian
  descRu: string;
  icon: IconName;
};

// Name + description in the requested locale.
export const industryText = (i: Industry, locale: Locale) =>
  locale === "ru" ? { name: i.nameRu, desc: i.descRu } : { name: i.name, desc: i.desc };

export const industries: Industry[] = [
  { id: "wood", name: "Medienos apdirbimas", nameRu: "Деревообработка", desc: "Drožlių, dulkių ištraukimas, CNC staklės, granulių linijos.", descRu: "Отвод стружки и пыли, станки с ЧПУ, линии гранулирования.", icon: "wood" },
  { id: "vent", name: "Vėdinimo sistemos", nameRu: "Вентиляционные системы", desc: "Aukštų ir žemų temperatūrų vėdinimas, chemikalų garai.", descRu: "Вентиляция при высоких и низких температурах, химические пары.", icon: "vent" },
  { id: "food", name: "Maisto pramonė", nameRu: "Пищевая промышленность", desc: "Sertifikuoti žarnų gaminiai, atitinkantys maisto kontaktui keliamus reikalavimus.", descRu: "Сертифицированные рукава, отвечающие требованиям контакта с пищевыми продуктами.", icon: "food" },
  { id: "chem", name: "Cheminė pramonė", nameRu: "Химическая промышленность", desc: "Atsparios chemikalams žarnos. Galvanika, laboratorijos, garų ištraukimas.", descRu: "Химически стойкие рукава. Гальваника, лаборатории, отвод паров.", icon: "chem" },
  { id: "agri", name: "Žemės ūkis", nameRu: "Сельское хозяйство", desc: "Sėjamosios, granuliatoriai, purkštuvai, grūdų transportavimas.", descRu: "Сеялки, грануляторы, опрыскиватели, транспортировка зерна.", icon: "agri" },
  { id: "spec", name: "Specialioji technika", nameRu: "Спецтехника", desc: "Asenizacija, komunalinė technika, motopompos, vakuuminiai siurbliai.", descRu: "Ассенизация, коммунальная техника, мотопомпы, вакуумные насосы.", icon: "spec" },
];

const byId = new Map(industries.map((i) => [i.id, i]));
export const industryById = (id: string): Industry | undefined => byId.get(id);
