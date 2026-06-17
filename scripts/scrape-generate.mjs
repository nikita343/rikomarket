// Generate the final Lithuanian data from the scraped raw JSON + translation
// dictionaries. Writes:
//   data/products.json              – all 147 products (LT)
//   lib/categories.ts               – full category hierarchy (LT)
//   scripts/.scrape-cache/image-manifest.json – localPath -> remote URL
// Reports any UA strings left untranslated.
//   node scripts/scrape-generate.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CACHE = path.join(ROOT, "scripts", ".scrape-cache");
const rawProducts = JSON.parse(fs.readFileSync(path.join(CACHE, "products-raw.json"), "utf8"));
const rawCats = JSON.parse(fs.readFileSync(path.join(CACHE, "categories-raw.json"), "utf8"));

const dict = {
  ...JSON.parse(fs.readFileSync(path.join(ROOT, "scripts", "translations-cats.json"), "utf8")),
  ...JSON.parse(fs.readFileSync(path.join(ROOT, "scripts", "translations-names.json"), "utf8")),
  ...JSON.parse(fs.readFileSync(path.join(ROOT, "scripts", "translations-desc.json"), "utf8")),
  ...JSON.parse(fs.readFileSync(path.join(ROOT, "scripts", "translations-table.json"), "utf8")),
};

// Fold quote / dash / whitespace variants so hand-typed keys match the source.
const normalize = (s) =>
  String(s)
    .replace(/[“”„«»]/g, '"')
    .replace(/[‘’´`]/g, "'")
    .replace(/[–—−]/g, "-")
    .replace(/ /g, " ")
    .replace(/\s+/g, " ")
    .trim();

const NMAP = new Map(Object.entries(dict).map(([k, v]) => [normalize(k), v]));
const misses = new Map();
function tr(s) {
  if (s == null || s === "") return "";
  const hit = NMAP.get(normalize(s));
  if (hit === undefined) {
    misses.set(s, (misses.get(s) ?? 0) + 1);
    return s;
  }
  return hit;
}

// ── Categories ──────────────────────────────────────────────────────
const MERGE = {
  "elementy-zyednan": "elementi-ziednannya", // dedupe connection-element twins
  // Russian-variant category slugs referenced by a few products' meta:
  "bez-spirali-ru": "bez-spirali",
  "dlya-vibroproseivayushhih-mashin": "dlya-vibroprosivnih-mashin",
  "rukava-yz-polyuretana": "rukava-z-poliuretanu",
};
const canon = (id) => (id == null ? null : MERGE[id] ?? id);

const catMap = new Map(); // id -> {id,name,slug,parent}
for (const c of rawCats) {
  const id = canon(c.id);
  if (catMap.has(id)) continue;
  catMap.set(id, { id, name: tr(c.nameUA), slug: id, parent: canon(c.parentId) });
}
// fix parents that point at a merged-away id
for (const c of catMap.values()) c.parent = c.parent && catMap.has(c.parent) ? c.parent : (c.parent ? canon(c.parent) : null);

// Per client: keep only these 5 material categories (drop "Kita"/rizne and all
// application categories). Their subcategories are kept too.
const KEEP_TOP = new Set([
  "rukava-z-polihlorvinilu", "rukava-z-poliuretanu", "rukava-typu-klyn",
  "metalorukavy", "elementi-ziednannya",
]);
const PVC = "rukava-z-polihlorvinilu", PUR = "rukava-z-poliuretanu",
  KLIN = "rukava-typu-klyn", METAL = "metalorukavy", FIT = "elementi-ziednannya";
// Application landing pages have no material category — fold each into the best
// fitting one of the 5 (client request; application names → material family).
const FOLD = {
  "dlya-verstativ-chpu": PUR, "dlya-ruchnogo-zastosuvannya": PVC,
  "dlya-vyrobnycztva-mebliv": PVC, "dlya-obrobky-masyviv": PUR, "dlya-pelet": PUR,
  "dlya-struzhkopylotyagiv": PUR, "dlya-alkogolyu": PVC, "dlya-zernovyh": PVC,
  "dlya-molochnyh-produktiv": PVC, "dlya-vysokyh-temperatur": KLIN, "dlya-sokiv": PVC,
  "dlya-himichnyh-laboratorij": KLIN, "dlya-himichnyh-vypariv": KLIN, "dlya-galvaniky": PVC,
  "dlya-naftopererobnoyi-promyslovosti-1": FIT, "dlya-naftopererobnoyi-promyslovosti-2": FIT,
  "dlya-granulyatoriv": PUR, "dlya-zemsnaryadiv-i-motopomp": PVC, "dlya-pnevmotransportu": PUR,
  "dlya-siyalok": PVC, "dlya-opryskuvachiv-ta-himichnyh-dobryv": PVC,
  "dlya-transportuvannya-zernovyh": PVC, "dlya-himichnix-vypariv": KLIN,
  "dlya-mobilnyh-kondyczioneriv": KLIN, "dlya-vyhlopnyh-gaziv": KLIN, "dlya-galvaniky-2": PVC,
  "dlya-teplovyh-garmat": KLIN, "dlya-vysokyh-temperatur-2": KLIN, "dlya-nyzkyh-temperatur": KLIN,
  "dlya-shaht-z-zagrozoyu-vybuhu": KLIN, "gnuchki-rukavy": PVC,
  "dlya-vodopostachannya-1": PVC, "dlya-vodopostachannya-2": PVC, "dlya-vodopostachannya-3": PVC,
  "dlya-vodopostachannya-4": PVC, "dlya-vodopostachannya-5": PVC, "dlya-vodopostachannya-6": PVC,
  "dlya-vodopostachannya-7": PVC, "dlya-vodopostachannya-8": PVC, "dlya-vodopostachannya": PVC,
  "dlya-vyhlopnyh-gaziv-2": KLIN, "dlya-vyhlopnyh-gaziv-3": KLIN, "dlya-vyhlopnyh-gaziv-4": KLIN,
  "dlya-vyhlopnyh-gaziv-5": KLIN, "dlya-vyhlopnyh-gaziv-6": KLIN, "dlya-vyhlopnyh-gaziv-7": KLIN,
  "dlya-betonu-ta-czementu": PUR, "dlya-komunalnoyi-tehniky": PVC,
  "dlya-dorozhnyh-vakuumnyh-pylotyagiv": PVC, "dlya-motopomp": PVC, "dlya-promyvky": PVC,
  "dlya-asenizacziyi": PVC, "z-oczynkovanoyi-stali": METAL, "z-nerzhaviyuchoyi-stali": METAL,
  "dlya-naftopererobnoyi-promyslovosti": FIT, "zagalni-harakterystyky-7": PVC,
  "tpr": KLIN, "tpr-600": KLIN,
};
const APP_TOP_INDUSTRY = {
  derevoobrobna: "wood", ventilyacziya: "vent", "himichna-promislovist": "chem",
  "silske-gospodarstvo": "agri", "specztehnika-2": "spec", "vihlopni-gazi": "exhaust",
};
const COLOR_BY_TOP = {
  "rukava-z-polihlorvinilu": "navy", "rukava-z-poliuretanu": "red",
  "rukava-typu-klyn": "navy", metalorukavy: "silver",
  "elementi-ziednannya": "silver", rizne: "navy",
};

function topAncestor(id) {
  let cur = catMap.get(id);
  const seen = new Set();
  while (cur && cur.parent && catMap.has(cur.parent) && !seen.has(cur.id)) {
    seen.add(cur.id);
    cur = catMap.get(cur.parent);
  }
  return cur ? cur.id : id;
}

// Category ids that survive the keep-only-5 filter (the 5 tops + their children).
const keptIds = new Set(
  [...catMap.keys()].filter((id) => KEEP_TOP.has(topAncestor(id))),
);

// ── Spec derivation helpers ─────────────────────────────────────────
const afterColon = (s) => {
  const i = s.indexOf(":");
  return i >= 0 ? s.slice(i + 1).trim() : s.trim();
};
function deriveSpecs(descLines) {
  const out = { dn: "", temp: "", pressure: "", wallThickness: "", standardLength: "" };
  for (const { text } of descLines) {
    const t = text.trim();
    if (!out.temp && /^(Darbinė temperatūra|Temperatūrų diapazonas)/i.test(t) && /\d/.test(t)) out.temp = afterColon(t);
    else if (!out.dn && /^Diametrų diapazonas/i.test(t)) out.dn = afterColon(t);
    else if (!out.standardLength && /^Ilgis/i.test(t)) out.standardLength = afterColon(t);
    else if (!out.wallThickness && /sienelės storis/i.test(t)) out.wallThickness = afterColon(t);
    else if (!out.pressure && /^(Darbinis slėgis|Slėgis)\b/i.test(t) && /\d/.test(t)) out.pressure = afterColon(t);
  }
  return out;
}

// ── Products ────────────────────────────────────────────────────────
const imageManifest = {};
const products = rawProducts.map((p) => {
  const allCats = [...new Set(p.categorySlugs.map(canon).filter((c) => catMap.has(c)))];
  // industries derived from the FULL tree (incl. application cats) before filtering
  const industries = [...new Set(allCats.map((c) => APP_TOP_INDUSTRY[topAncestor(c)]).filter(Boolean))];

  let cats = allCats.filter((c) => keptIds.has(c)); // memberships among the kept 5
  let primaryTop, subcategory;
  if (cats.length) {
    primaryTop = topAncestor(cats[0]);
    const child = cats.find((c) => catMap.get(c)?.parent); // a sub-category
    subcategory = child ? catMap.get(child).name : "";
  } else {
    // orphan application page → fold into a material family
    primaryTop = FOLD[p.slug];
    if (!primaryTop) {
      console.warn("UNMAPPED orphan, defaulting to PVC:", p.slug);
      primaryTop = PVC;
    }
    cats = [primaryTop];
    subcategory = "";
  }

  const descLines = (p.lines || [])
    .map((l) => ({ text: tr(l.text), heading: !!l.heading }))
    .filter((l) => l.text);
  const description = descLines.map((l) => l.text).join("\n");

  // first table → spec table (translate header + textual cells; numbers pass through)
  let specTable = null;
  let sizes = [];
  if (p.tables && p.tables[0] && p.tables[0].length > 1) {
    const [header, ...rows] = p.tables[0];
    const trHeader = header.map(tr);
    specTable = { headers: trHeader, rows: rows.map((r) => r.map(tr)) };
    if (/diametr/i.test(trHeader[0] || "")) {
      sizes = rows.map((r) => r[0]).filter((v) => /^\d+([.,]\d+)?$/.test((v || "").trim()));
    }
  }

  const specs = deriveSpecs(descLines);

  let image = "";
  if (p.image) {
    const base = p.image.split("/").pop().split("?")[0];
    image = `/products/orig/${base}`;
    imageManifest[image] = p.image;
  }

  // a concise note: first non-heading application/usage line, trimmed
  const noteSrc = descLines.find((l) => !l.heading && /[a-ząčęėįšųūž]/i.test(l.text));
  const shortNote = noteSrc ? noteSrc.text.split(/[.;]/)[0].slice(0, 70).trim() : "";

  return {
    slug: p.slug,
    name: tr(p.nameUA),
    category: primaryTop,
    categories: cats,
    subcategory,
    industries,
    color: COLOR_BY_TOP[primaryTop] ?? "navy",
    featured: false,
    image,
    shortNote,
    description,
    descLines,
    ...specs,
    vacuum: "",
    bendRadius: "",
    material: "",
    reinforcement: "",
    colorsAvailable: "",
    certifications: "",
    origin: "",
    sizes,
    specTable,
  };
});

// Feature a handful of flagship products on the homepage.
const FEATURED = new Set([
  "rukav-pvh-vent", "typ-a1-polyhlorvynyl-legkaya-konstrukczyya", "klyn-k1-d-teflon-steklovolokno",
  "z-nerzhaviyuchoyi-stali", "brs-kamlok-camlock-tip-a-aljuminiievij", "typ-v1-poliuretan-legka-konstrukcziya",
]);
for (const p of products) if (FEATURED.has(p.slug)) p.featured = true;

// ── Emit categories.ts (only the kept 5 trees) ──────────────────────
// Stable display order for the 5 top-level material families.
const TOP_ORDER = [
  "rukava-z-polihlorvinilu", "rukava-z-poliuretanu", "rukava-typu-klyn",
  "metalorukavy", "elementi-ziednannya",
];
const orderedCats = [...catMap.values()]
  .filter((c) => keptIds.has(c.id))
  .sort((a, b) => {
    const ta = topAncestor(a.id), tb = topAncestor(b.id);
    if (ta !== tb) return TOP_ORDER.indexOf(ta) - TOP_ORDER.indexOf(tb);
    if (!a.parent !== !b.parent) return a.parent ? 1 : -1; // parent before child
    return a.name.localeCompare(b.name, "lt");
  });
const catsLiteral = orderedCats
  .map((c) => `  { id: ${JSON.stringify(c.id)}, name: ${JSON.stringify(c.name)}, slug: ${JSON.stringify(c.slug)}, parent: ${JSON.stringify(c.parent)} },`)
  .join("\n");
const categoriesTs = `// Product categories — the 5 material families kept per client request
// (PVC / PUR / KLIN / metal / sujungimo elementai), names translated to
// Lithuanian. Generated by scripts/scrape-generate.mjs — do not edit by hand.
// \`parent\` is the parent category id, or null for a top-level category.

export type Category = {
  id: string;
  name: string;
  slug: string;
  parent: string | null;
};

export const categories: Category[] = [
${catsLiteral}
];

const byId = new Map(categories.map((c) => [c.id, c]));
export const categoryById = (id: string): Category | undefined => byId.get(id);
export const childrenOf = (parentId: string): Category[] =>
  categories.filter((c) => c.parent === parentId);
export const topCategories = (): Category[] => categories.filter((c) => !c.parent);

// Walk to the top-level ancestor of a category.
export function topAncestor(id: string): Category | undefined {
  let cur = byId.get(id);
  const seen = new Set<string>();
  while (cur && cur.parent && byId.has(cur.parent) && !seen.has(cur.id)) {
    seen.add(cur.id);
    cur = byId.get(cur.parent);
  }
  return cur;
}
`;
fs.writeFileSync(path.join(ROOT, "lib", "categories.ts"), categoriesTs);

// ── Emit products.json + image manifest ─────────────────────────────
fs.writeFileSync(path.join(ROOT, "data", "products.json"), JSON.stringify(products, null, 2) + "\n");
fs.writeFileSync(path.join(CACHE, "image-manifest.json"), JSON.stringify(imageManifest, null, 2));

// ── Report ──────────────────────────────────────────────────────────
console.log(`categories: ${orderedCats.length} (top-level ${orderedCats.filter((c) => !c.parent).length})`);
console.log(`products: ${products.length}`);
const unknownCatRefs = new Set();
for (const p of rawProducts) for (const s of p.categorySlugs) if (!catMap.has(canon(s))) unknownCatRefs.add(s);
console.log(`unknown category refs from products: ${unknownCatRefs.size}`, [...unknownCatRefs]);
const missArr = [...misses.entries()].sort((a, b) => b[1] - a[1]);
console.log(`translation misses: ${missArr.length}`);
for (const [s, n] of missArr.slice(0, 40)) console.log(`  (${n}) ${s.slice(0, 80)}`);
fs.writeFileSync(path.join(CACHE, "misses.json"), JSON.stringify(missArr, null, 2));
