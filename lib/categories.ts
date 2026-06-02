// Product categories — fixed reference data (from Ricomarket 2/src/data.jsx).
// Products reference a category by `id`; CSV stores only the id.

export type Category = {
  id: string;
  name: string;
  slug: string;
  desc: string;
  sub: string[];
};

export const categories: Category[] = [
  {
    id: "pvc",
    name: "PVC žarnos",
    slug: "pvc-zarnos",
    desc: "Polivinilchlorido žarnos su metalo arba PVC spirale, taip pat siūline armatūra.",
    sub: ["Su metalo spirale", "Su PVC spirale", "Su siūline armatūra"],
  },
  {
    id: "pur",
    name: "PUR žarnos",
    slug: "pur-zarnos",
    desc: "Poliuretano žarnos abrazyvinėms medžiagoms, granulėms, dulkėms.",
    sub: ["Su metalo spirale", "Su PVC spirale", "Be spiralės (FLAT)"],
  },
  {
    id: "klin",
    name: "KLIN tipo žarnos",
    slug: "klin-zarnos",
    desc: "Teflono, stiklo pluošto, nitrilo žarnos aukštoms ir žemoms temperatūroms.",
    sub: ["Tefloninės (PTFE)", "Stiklo pluošto", "Nitrilas, PE, PUR"],
  },
  {
    id: "metal",
    name: "Metalinės žarnos",
    slug: "metalines-zarnos",
    desc: "Lankstūs metaliniai vamzdžiai iš nerūdijančio ir cinkuoto plieno.",
    sub: ["Nerūdijantis plienas", "Cinkuotas plienas"],
  },
  {
    id: "rubber",
    name: "Gumos gaminiai",
    slug: "gumos-gaminiai",
    desc: "Techninės gumos gaminiai ir žarnos pramonės naudojimui.",
    sub: ["Hidraulinės", "Slėginės", "Vakuuminės"],
  },
  {
    id: "fittings",
    name: "Sujungimo elementai",
    slug: "sujungimo-elementai",
    desc: "Camlock greitojo sujungimo perėjikliai, antgaliai, apkabos.",
    sub: ["Camlock aliuminis", "Camlock nerūdijantis", "Antgaliai"],
  },
];

const byId = new Map(categories.map((c) => [c.id, c]));
export const categoryById = (id: string): Category | undefined => byId.get(id);
