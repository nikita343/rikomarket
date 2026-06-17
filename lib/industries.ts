// Application industries — fixed reference data (from Ricomarket 2/src/data.jsx).
import type { IconName } from "@/components/icons";

export type Industry = {
  id: string;
  name: string;
  desc: string;
  icon: IconName;
};

export const industries: Industry[] = [
  { id: "wood", name: "Medienos apdirbimas", desc: "Drožlių, dulkių ištraukimas, CNC staklės, granulių linijos.", icon: "wood" },
  { id: "vent", name: "Vėdinimo sistemos", desc: "Aukštų ir žemų temperatūrų vėdinimas, chemikalų garai.", icon: "vent" },
  { id: "food", name: "Maisto pramonė", desc: "Sertifikuoti žarnų gaminiai, atitinkantys maisto kontaktui keliamus reikalavimus.", icon: "food" },
  { id: "chem", name: "Cheminė pramonė", desc: "Atsparios chemikalams žarnos. Galvanika, laboratorijos, garų ištraukimas.", icon: "chem" },
  { id: "agri", name: "Žemės ūkis", desc: "Sėjamosios, granuliatoriai, purkštuvai, grūdų transportavimas.", icon: "agri" },
  { id: "spec", name: "Specialioji technika", desc: "Asenizacija, komunalinė technika, motopompos, vakuuminiai siurbliai.", icon: "spec" },
];

const byId = new Map(industries.map((i) => [i.id, i]));
export const industryById = (id: string): Industry | undefined => byId.get(id);
