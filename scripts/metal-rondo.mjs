// Build scripts/metal-rondo.json — the "Metalinės žarnos" (metal hose) catalog,
// transferred from the supplier catalogue at
// https://rondo2.pl/katalog-produktow/weze-metalowe/ (Metalhex A / B / B1 and
// Metalhex inox C / D / D1) and translated to Lithuanian.
//
// All six types share one dimension table: the galvanized types cover 18–337 mm
// (44 sizes, incl. the steel-profile thickness column), the stainless types the
// 50–337 mm subset (32 sizes, no thickness column). Product codes differ only by
// the suffix, so the table is generated instead of transcribed six times.
//
//   node scripts/metal-rondo.mjs
import fs from "node:fs";
import path from "node:path";

// [inner Ø, outer Ø, bend radius, mass kg/m, steel profile thickness]
const DIMS = [
  [18, 22, 120, "0,2", "0,2"], [20, 24, 130, "0,2", "0,2"], [22, 26, 140, "0,2", "0,2"],
  [26, 30, 160, "0,3", "0,2"], [28, 32, 170, "0,3", "0,2"], [30, 34, 180, "0,3", "0,2"],
  [32, 36, 190, "0,3", "0,2"], [35, 39, 205, "0,3", "0,2"], [38, 42, 220, "0,4", "0,2"],
  [40, 44, 230, "0,4", "0,2"], [45, 49, 255, "0,4", "0,2"], [48, 52, 270, "0,4", "0,2"],
  [50, 60, 160, "0,8", "0,4"], [55, 65, 180, "0,9", "0,4"], [60, 70, 215, "1,0", "0,4"],
  [65, 75, 230, "1,1", "0,4"], [70, 80, 240, "1,2", "0,4"], [75, 85, 255, "1,3", "0,4"],
  [80, 90, 270, "1,3", "0,4"], [85, 95, 275, "1,5", "0,4"], [90, 100, 280, "1,9", "0,4"],
  [95, 105, 290, "2,0", "0,4"], [100, 110, 300, "2,0", "0,4"], [105, 115, 315, "2,1", "0,4"],
  [110, 120, 330, "2,2", "0,4"], [112, 122, 340, "2,3", "0,4"], [120, 130, 380, "2,4", "0,4"],
  [124, 134, 390, "2,5", "0,4"], [125, 135, 400, "2,5", "0,4"], [130, 140, 410, "2,9", "0,4"],
  [135, 145, 420, "3,0", "0,4"], [140, 150, 440, "3,1", "0,4"], [146, 156, 450, "3,2", "0,4"],
  [150, 160, 460, "3,4", "0,4"], [158, 168, 480, "3,4", "0,4"], [160, 170, 490, "3,6", "0,4"],
  [168, 178, 500, "3,9", "0,4"], [180, 190, 545, "4,0", "0,4"], [202, 212, 560, "5,5", "0,4"],
  [225, 235, 630, "6,2", "0,4"], [250, 260, 700, "6,9", "0,4"], [280, 290, 760, "7,5", "0,4"],
  [300, 310, 850, "8,2", "0,4"], [337, 347, 910, "8,8", "0,4"],
];

const HEAD_GAL = ["Gaminio kodas", "Vidinis diametras [mm]", "Išorinis diametras [mm]",
  "Lenkimo spindulys [mm]", "Apytikslė masė [kg/m]", "Plieno profilio storis [mm]"];
const HEAD_INOX = HEAD_GAL.slice(0, 5);

const code = (dn, suffix) => `5 – 01 – ${String(dn).padStart(4, "0")} – ${suffix}`;
const table = (suffix, inox) => {
  const rows = DIMS.filter((d) => !inox || d[0] >= 50).map(([i, o, r, m, t]) => {
    const row = [code(i, suffix), String(i), String(o), String(r), m];
    return inox ? row : [...row, t];
  });
  return { headers: inox ? HEAD_INOX : HEAD_GAL, rows };
};

// Shared prose blocks (LT).
const lines = ({ steel, seal, temp, uses, extra = [] }) => [
  { text: "Konstrukcija", heading: true },
  { text: `Lankstūs daugiakampio profilio metaliniai rankovai iš profiliuoto ${steel}.`, heading: false },
  { text: `Sandarinimas: ${seal}.`, heading: false },
  { text: "Profilis suformuotas taip, kad žarna išlaikytų formą ir būtų atspari mechaniniams pažeidimams.", heading: false },
  { text: "Savybės", heading: true },
  { text: `Šiluminis atsparumas: ${temp}.`, heading: false },
  { text: "Didelis mechaninis atsparumas ir atsparumas dilimui, ypač transportuojant abrazyvines medžiagas.", heading: false },
  { text: "Atitinka ATEX direktyvos reikalavimus – tinka sprogioje aplinkoje.", heading: false },
  ...extra.map((text) => ({ text, heading: false })),
  { text: "Matmenys", heading: true },
  { text: `Diametrų diapazonas: ${steel.includes("nerūdijančio") ? "50–337 mm" : "18–337 mm"}.`, heading: false },
  { text: "Ilgis: 5 m, 10 m; kai kuriems diametrams, iš anksto susitarus, galimi didesni ilgiai.", heading: false },
  { text: "Pritaikymas", heading: true },
  ...uses.map((text) => ({ text, heading: false })),
  { text: "Techniniai parametrai", heading: true },
  { text: "Visų parametrų tolerancija – 5 %.", heading: false },
  { text: "Dėl savo konstrukcijos metalinės žarnos neužtikrina 100 % sandarumo; šalinant dūmus rekomenduojama rinktis dvigubą diametrą.", heading: false },
  { text: "Elektrostatiniams krūviams nuvesti rekomenduojama įžeminti žarnos spiralę.", heading: false },
];

const USES_HOT = [
  "Karšto oro ir dūmų šalinimas.",
  "Abrazyvinių birių medžiagų gravitacinis transportavimas.",
  "Darbas sprogioje aplinkoje ir aukštoje temperatūroje.",
  "Apsauginės žarnos plastikinėms žarnoms ir kabeliams.",
];
const USES_VENT = [
  "Vėdinimo sistemos ir pramoniniai dulkių siurbliai.",
  "Išmetamųjų dujų ir dūmų šalinimas.",
  "Abrazyvinių birių medžiagų transportavimas.",
  "Medienos apdirbimo pramonė.",
];

const GAL = "cinkuoto plieno";
const INOX = "nerūdijančio plieno";

const products = [
  {
    slug: "metalhex-a", name: "Metalhex A. Cinkuoto plieno žarna", steel: "gal",
    image: "/products/orig/galvanized.jpg",
    seal: "Be sandariklio", temp: "iki +500 °C", suffix: "1",
    material: "Profiliuotas cinkuotas plienas", dn: "18–337 mm",
    lines: lines({ steel: GAL, seal: "profilis be sandariklio", temp: "iki +500 °C", uses: USES_HOT }),
  },
  {
    slug: "metalhex-b", name: "Metalhex B. Cinkuoto plieno žarna su silikoniniu sandarikliu", steel: "gal",
    image: "/products/orig/galvanized-1.jpg",
    seal: "Silikoninis", temp: "iki +300 °C", suffix: "1 U",
    material: "Profiliuotas cinkuotas plienas", dn: "18–337 mm",
    lines: lines({ steel: GAL, seal: "silikoninis sandariklis", temp: "iki +300 °C", uses: USES_VENT }),
  },
  {
    slug: "metalhex-b1", name: "Metalhex B1. Cinkuoto plieno žarna su stiklo pluošto sandarikliu", steel: "gal",
    image: "/products/orig/galvanized.jpg",
    seal: "Stiklo pluoštas", temp: "iki +500 °C", suffix: "1 UW",
    material: "Profiliuotas cinkuotas plienas", dn: "18–337 mm",
    lines: lines({ steel: GAL, seal: "stiklo pluošto sandariklis", temp: "iki +500 °C", uses: USES_HOT }),
  },
  {
    slug: "metalhex-inox-c", name: "Metalhex inox C. Nerūdijančio plieno žarna", steel: "inox",
    image: "/products/orig/stainless-steel.jpg",
    seal: "Be sandariklio", temp: "iki +650 °C", suffix: "2",
    material: "Profiliuotas nerūdijantis plienas", dn: "50–337 mm",
    lines: lines({ steel: INOX, seal: "profilis be sandariklio", temp: "iki +650 °C", uses: USES_HOT }),
  },
  {
    slug: "metalhex-inox-d", name: "Metalhex inox D. Nerūdijančio plieno žarna su silikoniniu sandarikliu", steel: "inox",
    image: "/products/orig/stainless-steel-1.jpg",
    seal: "Silikoninis", temp: "iki +300 °C", suffix: "2 U",
    material: "Profiliuotas nerūdijantis plienas", dn: "50–337 mm",
    lines: lines({ steel: INOX, seal: "silikoninis sandariklis", temp: "iki +300 °C", uses: USES_VENT }),
  },
  {
    slug: "metalhex-inox-d1", name: "Metalhex inox D1. Nerūdijančio plieno žarna su stiklo pluošto sandarikliu", steel: "inox",
    image: "/products/orig/stainless-steel.jpg",
    seal: "Stiklo pluoštas", temp: "iki +650 °C", suffix: "2 UW",
    material: "Profiliuotas nerūdijantis plienas", dn: "50–337 mm",
    lines: lines({ steel: INOX, seal: "stiklo pluošto sandariklis", temp: "iki +650 °C", uses: USES_HOT }),
  },
].map((p) => ({
  slug: p.slug,
  name: p.name,
  steel: p.steel,
  image: p.image,
  industries: p.steel === "gal" ? ["wood", "vent", "exhaust", "spec"] : ["vent", "exhaust", "chem", "spec"],
  dn: p.dn,
  temp: p.temp,
  standardLength: "5 m, 10 m",
  material: p.material,
  reinforcement: "Daugiakampis plieno profilis",
  sealing: p.seal,
  certifications: "ATEX",
  origin: "Lenkija",
  lines: p.lines,
  specTable: table(p.suffix, p.steel === "inox"),
}));

fs.writeFileSync(
  path.join(process.cwd(), "scripts", "metal-rondo.json"),
  JSON.stringify(products, null, 2) + "\n",
);
console.log(`metal-rondo.json: ${products.length} products, rows`,
  products.map((p) => p.specTable.rows.length).join("/"));
