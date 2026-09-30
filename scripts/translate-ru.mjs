// Build the Russian catalogue: data/products.ru.json (same shape as
// data/products.json, every human-readable string swapped for Russian) and
// lib/chem-ru.ts (Russian names for the chemical-resistance table).
//
// Two sources, in priority order:
//   1. scripts/.scrape-cache/products-ru-raw.json — the client's OWN Russian
//      pages from rikomarket.com.ua/ru/ (run `node scripts/scrape-ru.mjs`).
//      Each Ukrainian page links its Russian twin, so lines and table cells are
//      matched position by position and the site's exact technical wording wins.
//      What is learned this way is written to scripts/translations-ru-site.json.
//   2. scripts/translations-ru.json — the hand dictionary, used for everything
//      the old site has no page for (the polynect PVC hoses, the Metalhex metal
//      hoses, UI-adjacent strings) and wherever an alignment does not line up.
//
// Product NAMES keep the catalogue's own wording by default, because the
// Lithuanian catalogue renamed several products (Tipas B5, Tipas Flat B1 …) and
// the two locales should agree. Pass --names=site to take the old site's H1s.
//
//   node scripts/scrape-generate.mjs   # LT catalogue first
//   node scripts/translate-ru.mjs      # then the RU overlay
import fs from "node:fs";
import path from "node:path";
import { makeNote } from "./note.mjs";

const ROOT = process.cwd();
const CACHE = path.join(ROOT, "scripts", ".scrape-cache");
const useSiteNames = process.argv.includes("--names=site");

const hand = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts", "translations-ru.json"), "utf8"));
const products = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "products.json"), "utf8"));
const rawUA = readJson(path.join(CACHE, "products-raw.json"));
const rawRU = readJson(path.join(CACHE, "products-ru-raw.json"));

function readJson(file) {
  return fs.existsSync(file) ? JSON.parse(fs.readFileSync(file, "utf8")) : null;
}

// ── 1. Learn LT → RU pairs from the old site's Russian pages ────────────────
// The Lithuanian catalogue was generated from the Ukrainian pages line by line,
// so LT line i of a product corresponds to RU line i of its Russian twin. Only
// products whose line and table shapes match exactly are used.
const site = {};
const report = { aligned: [], skipped: [], noTwin: [], conflicts: [] };

// Every aligned pair is a vote; the most common Russian wording per LT string
// wins (ties: first seen). A single mis-scraped page can then no longer
// overwrite a string every other product agrees on.
const votes = new Map();
function learn(lt, ru) {
  if (typeof lt !== "string" || typeof ru !== "string") return;
  const k = lt.trim();
  const v = ru.trim();
  if (!k || !v) return;
  if (!votes.has(k)) votes.set(k, new Map());
  const m = votes.get(k);
  m.set(v, (m.get(v) ?? 0) + 1);
}
function settleVotes() {
  report.conflicts.length = 0;
  for (const [k, m] of votes) {
    const ranked = [...m.entries()].sort((a, b) => b[1] - a[1]);
    site[k] = ranked[0][0];
    if (ranked.length > 1) report.conflicts.push([k, ranked[0][0], ranked[1][0]]);
  }
}

// Line counts alone are not proof two pages line up: the old RU pages sometimes
// drop one line and repeat another, which keeps the count but shifts every line
// after it (that is how "Matmenys" once became "Диапазон диаметров: 200-400 мм.").
// A pair only counts as aligned when both sides are the same kind of line
// (heading or not) and carry the same numbers.
const numbers = (s) => (String(s).match(/\d+(?:[.,]\d+)?/g) ?? []).map((n) => n.replace(",", ".")).join("|");
const lineFits = (lt, ru) =>
  !!lt.heading === !!ru.heading && numbers(lt.text) === numbers(ru.text);

if (rawRU) {
  const uaBySlug = new Map((rawUA ?? []).map((p) => [p.slug, p]));

  for (const p of products) {
    const ru = rawRU.products[p.slug];
    if (!ru) {
      report.noTwin.push(p.slug);
      continue;
    }
    const ua = uaBySlug.get(p.slug);
    // The generator dropped empty lines, so re-apply that filter to the RU side.
    const ruLines = ru.lines.filter((l) => l.text.trim());
    const uaLines = (ua?.lines ?? []).filter((l) => l.text.trim());

    const linesFit =
      p.descLines.length > 0 &&
      ruLines.length === p.descLines.length &&
      (!uaLines.length || uaLines.length === p.descLines.length) &&
      p.descLines.every((l, i) => lineFits(l, ruLines[i]));

    const ruTable = ru.tables?.[0] ?? null;
    const tableFit =
      !p.specTable ||
      (ruTable &&
        ruTable.length === p.specTable.rows.length + 1 &&
        ruTable[0].length === p.specTable.headers.length);

    if (!linesFit || !tableFit) {
      report.skipped.push(`${p.slug} (lines ${p.descLines.length}/${ruLines.length}, table ${p.specTable ? p.specTable.rows.length + 1 : 0}/${ruTable ? ruTable.length : 0})`);
      continue;
    }

    p.descLines.forEach((l, i) => learn(l.text, ruLines[i].text));
    if (p.specTable && ruTable) {
      p.specTable.headers.forEach((h, i) => learn(h, ruTable[0][i]));
      p.specTable.rows.forEach((row, r) => row.forEach((c, i) => learn(c, ruTable[r + 1][i])));
    }
    if (useSiteNames) learn(p.name, ru.nameRU);
    report.aligned.push(p.slug);
  }

  // Category names, for lib/categories.ts (CAT_RU in scripts/scrape-generate.mjs).
  const catNames = {};
  for (const [slug, c] of Object.entries(rawRU.categories ?? {})) {
    if (c.nameRU) catNames[slug] = c.nameRU;
  }
  fs.writeFileSync(
    path.join(CACHE, "categories-ru-names.json"),
    JSON.stringify(catNames, null, 1),
  );

  settleVotes();
  fs.writeFileSync(
    path.join(ROOT, "scripts", "translations-ru-site.json"),
    JSON.stringify(site, null, 1) + "\n",
  );
}

// Category names come from lib/categories.ts, which scrape-generate.mjs fills
// from the same old-site pages — keep the products' `subcategory` field in step.
{
  const catSrc = fs.readFileSync(path.join(ROOT, "lib", "categories.ts"), "utf8");
  for (const m of catSrc.matchAll(/name: "((?:[^"\\]|\\.)*)", nameRu: "((?:[^"\\]|\\.)*)"/g)) {
    learn(JSON.parse(`"${m[1]}"`), JSON.parse(`"${m[2]}"`));
  }
}settleVotes();


// Wording fixed by hand where the old site is ambiguous: it writes "Диаметр вн."
// for both the inner and the outer diameter, so the two columns read the same.
const FIXED = {
  "Vidinis diametras [mm]": "Внутренний диаметр [мм]",
  "Išorinis diametras [mm]": "Наружный диаметр [мм]",
  // The old site has both; only this one is grammatical.
  "Visa produkcija sertifikuota": "Вся продукция сертифицирована",
};

// Site wording wins over the hand dictionary; FIXED wins over both.
const dict = { ...hand, ...site, ...FIXED };

// Bare "number + unit" cells ("0,8 mm", "30 mm³", "10 bar") only need the unit
// in Russian; the LT generator writes them with Latin units.
const RU_UNITS = { mm: "мм", "mm³": "мм³", bar: "бар", kg: "кг" };
const unitCell = (s) => {
  const m = s.trim().match(/^([\d\s,.×x–-]+)\s?(mm³|mm|bar|kg)$/);
  return m ? `${m[1].trim()} ${RU_UNITS[m[2]]}` : null;
};

const misses = new Map();
const tr = (s) => {
  if (typeof s !== "string" || !s.trim()) return s;
  if (dict[s.trim()] === undefined && unitCell(s)) return unitCell(s);
  const hit = dict[s.trim()];
  if (hit === undefined) {
    if (/[A-Za-zĄČĘĖĮŠŲŪŽąčęėįšųūž]/.test(s)) misses.set(s, (misses.get(s) ?? 0) + 1);
    return s;
  }
  return hit;
};

// ── ПВХ wording (client review 2026-09) ─────────────────────────────────────
// The client wants the material called "ПВХ" everywhere in Russian — never
// "полихлорвинил" / "поливинилхлорид", in names, categories or descriptions.
// Applied last, so it holds whatever the old site or the dictionary says.
function pvh(s) {
  if (typeof s !== "string") return s;
  return s
    .replace(/Поливинилхлорид \(PVC\)/g, "ПВХ")
    .replace(/(эластичн[а-яё]*) полихлорвинилов[а-яё]* (?:фольг|плёнк|пленк)[а-яё]*/gi, "$1 ПВХ-плёнкой")
    .replace(/полихлорвинилов(?:ый|ая|ое|ой|ого|ому|ым|ую|ые|ых|ыми)/gi, "ПВХ")
    .replace(/(?:полихлорвинил|поливинилхлорид)(?:ом|ам|ами|ах|а|у|е|ы)?(?![а-яё])/gi, "ПВХ")
    // Typos carried over from the old site's Russian pages.
    .replace(/(?<![А-ЯЁа-яё])ПХВ(?![А-ЯЁа-яё])/g, "ПВХ")
    .replace(/спираль их /g, "спираль из ")
    .replace(/([а-яё]) :/gi, "$1:");
}
const deepPvh = (v) =>
  typeof v === "string" ? pvh(v)
    : Array.isArray(v) ? v.map(deepPvh)
    : v && typeof v === "object" ? Object.fromEntries(Object.entries(v).map(([k, x]) => [k, deepPvh(x)]))
    : v;

// ── 2. Emit the Russian catalogue ───────────────────────────────────────────
// shortNote is not translated: it is re-derived from the Russian description
// below (scripts/note.mjs), so it is always a whole sentence.
const TEXT_FIELDS = ["name", "subcategory", "dn", "temp", "pressure",
  "wallThickness", "standardLength", "vacuum", "bendRadius", "material",
  "reinforcement", "colorsAvailable", "certifications", "origin"];

const ru = products.map((p) => {
  const out = { ...p };
  for (const f of TEXT_FIELDS) {
    // Diameter ranges derived from size tables ("16–100 mm") only need the unit.
    if (f === "dn" && p.dn && dict[p.dn.trim()] === undefined && /^[\d\s,.–-]+mm$/.test(p.dn.trim())) {
      out.dn = p.dn.replace(/mm$/, "мм");
      continue;
    }
    out[f] = tr(p[f]);
  }
  out.descLines = (p.descLines ?? []).map((l) => ({ text: tr(l.text), heading: l.heading }));
  out.description = out.descLines.map((l) => l.text).join("\n");
  out.sizes = (p.sizes ?? []).map(tr);
  out.specTable = p.specTable
    ? { headers: p.specTable.headers.map(tr), rows: p.specTable.rows.map((r) => r.map(tr)) }
    : null;
  const final = deepPvh(out);
  final.shortNote = makeNote(final.descLines);
  return final;
});

fs.writeFileSync(path.join(ROOT, "data", "products.ru.json"), JSON.stringify(ru, null, 2) + "\n");

// ── 3. Russian labels for the chemical-resistance table ─────────────────────
const chemSrc = fs.readFileSync(path.join(ROOT, "lib", "chem-data.ts"), "utf8");
const names = [...chemSrc.matchAll(/\{"name":"((?:[^"\\]|\\.)*)"/g)].map((m) => JSON.parse(`"${m[1]}"`));
const materials = JSON.parse(
  "[" + chemSrc.match(/export const chemMaterials = \[([\s\S]*?)\] as const;/)[1].replace(/,\s*$/, "") + "]",
);

// The old site's Russian table is in the same row order as the Lithuanian names
// listed positionally in scripts/translate-chem.mjs — align on that when the
// row counts agree, otherwise fall back to the dictionary.
let chemFromSite = 0;
if (rawRU?.chem?.length) {
  const chemScript = fs.readFileSync(path.join(ROOT, "scripts", "translate-chem.mjs"), "utf8");
  const ltArr = chemScript.match(/const lt = (\[[\s\S]*?\]);/);
  if (ltArr) {
    const ltNames = JSON.parse(ltArr[1].replace(/,(\s*\])/g, "$1"));
    if (ltNames.length === rawRU.chem.length) {
      ltNames.forEach((n, i) => {
        if (!site[n]) chemFromSite += 1;
        dict[n] = rawRU.chem[i];
      });
    } else {
      console.warn(
        `chemical table: ${ltNames.length} Lithuanian names vs ${rawRU.chem.length} Russian rows — keeping the dictionary`,
      );
    }
  }
}

const nameMap = Object.fromEntries(names.map((n) => [n, tr(n)]));
fs.writeFileSync(
  path.join(ROOT, "lib", "chem-ru.ts"),
  `// Russian labels for the chemical-resistance table — generated by\n` +
  `// scripts/translate-ru.mjs, do not edit by hand.\n\n` +
  `export const chemMaterialsRu: string[] = ${JSON.stringify(materials.map(tr), null, 2)};\n\n` +
  `export const chemNameRu: Record<string, string> = ${JSON.stringify(nameMap, null, 2)};\n`,
);

// ── Report ──────────────────────────────────────────────────────────────────
console.log(`products.ru.json: ${ru.length} products`);
if (rawRU) {
  console.log(`from the old site's RU pages: ${report.aligned.length} products, ${Object.keys(site).length} strings`);
  console.log(`  no Russian twin (dictionary): ${report.noTwin.length}`, report.noTwin.slice(0, 12));
  console.log(`  shape mismatch (dictionary): ${report.skipped.length}`);
  for (const s of report.skipped.slice(0, 12)) console.log(`    ${s}`);
  if (report.conflicts.length) {
    console.log(`  same LT string, different RU wording: ${report.conflicts.length}`);
    for (const [k, a, b] of report.conflicts.slice(0, 8)) {
      console.log(`    "${k.slice(0, 50)}" → "${a.slice(0, 40)}" | "${b.slice(0, 40)}"`);
    }
  }
  if (chemFromSite) console.log(`chemical names taken from the site: ${chemFromSite}`);
} else {
  console.log("scripts/.scrape-cache/products-ru-raw.json not found — using the hand dictionary only.");
  console.log("Run `node scripts/scrape-ru.mjs` to pull the old site's Russian wording.");
}
console.log(`chem-ru.ts: ${materials.length} materials, ${names.length} substances`);
const missArr = [...misses.entries()].sort((a, b) => b[1] - a[1]);
console.log(`untranslated strings: ${missArr.length}`);
for (const [s, n] of missArr.slice(0, 25)) console.log(`  (${n}) ${s.slice(0, 90)}`);
