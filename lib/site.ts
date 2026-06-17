// Company / site-wide content. Translated from rikomarket.com.ua and aligned
// with the Lithuanian design canvas (Ricomarket 2/src/data.jsx).

export const company = {
  nameShort: "Riko Market",
  nameFull: "UAB „Riko Market“",
  tagline: "Lankstūs sprendimai – patikimas rezultatas",
  descShort:
    "Techninės žarnos: PVC, PUR, KLIN, metalo, gumos. Diametrai 10–1200 mm. Temperatūros −150 … +1100 °C.",
  descLong:
    "Tiekiame techninių žarnų ir sujungimo elementų asortimentą medienos apdirbimo, vėdinimo, žemės ūkio, chemijos ir specialiosios technikos sektoriams.",
  phone: "+370 661 42272",
  phoneHref: "tel:+37066142272",
  email: "rikomarket.lt@gmail.com",
  website: "www.rikomarket.lt",
  address: "Elektrėnai, Lietuva",
  hours: "I–V / 9:00–18:00",
  foundedNote: "Įm. kodas 305XXXXXX · PVM LT100020123613",
  legalLine:
    "© 2026 UAB „Riko Market“ · Įm. kodas 305XXXXXX · PVM LT100020123613",
} as const;

export const nav = [
  { label: "Pagrindinis", href: "/" },
  { label: "Produktai", href: "/products" },
  { label: "Pritaikymo sritys", href: "/industries" },
  { label: "Cheminis atsparumas", href: "/chemical-resistance" },
  { label: "Matavimo vienetai", href: "/units" },
  { label: "Kontaktai", href: "/contacts" },
] as const;

export const usps = [
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
] as const;
