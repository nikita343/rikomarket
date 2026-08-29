// Collect every catalog string that needs a Russian translation and write
// numbered chunks to scripts/i18n/chunks/. Each entry carries the Lithuanian
// source plus, where we can recover it, the original Ukrainian string the LT
// text was translated from (scripts/translations-*.json) — the RU translation
// should follow the Ukrainian original when the two disagree.
//   node scripts/i18n-extract.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const products = JSON.parse(fs.readFileSync(path.join(ROOT, "data", "products.json"), "utf8"));

// lib/chem-data.ts is TypeScript, so pull the two literals out of the source.
const chemSrc = fs.readFileSync(path.join(ROOT, "lib", "chem-data.ts"), "utf8");
const chemData = [...chemSrc.matchAll(/\{"name":"((?:[^"\\]|\\.)*)"/g)].map((m) => ({
  name: JSON.parse(`"${m[1]}"`),
}));
const chemMaterials = JSON.parse(
  "[" + chemSrc.match(/export const chemMaterials = \[([\s\S]*?)\] as const;/)[1].replace(/,\s*$/, "") + "]",
);

// LT -> UA reverse map from the existing dictionaries
const uaByLt = new Map();
for (const f of ["cats", "names", "desc", "table", "polynect"]) {
  const dict = JSON.parse(fs.readFileSync(path.join(ROOT, "scripts", `translations-${f}.json`), "utf8"));
  for (const [ua, lt] of Object.entries(dict)) if (lt && !uaByLt.has(lt)) uaByLt.set(lt, ua);
}

const hasLetters = (s) => /[A-Za-zА-Яа-яЁёІіЇїЄєĄČĘĖĮŠŲŪŽąčęėįšųūž]/.test(s);
const seen = new Set();
const items = [];
const add = (s, ctx) => {
  if (typeof s !== "string") return;
  const v = s.trim();
  if (!v || seen.has(v) || !hasLetters(v)) return;
  seen.add(v);
  const ua = uaByLt.get(v);
  items.push(ua ? { lt: v, ua, ctx } : { lt: v, ctx });
};

for (const p of products) {
  add(p.name, "product name");
  add(p.subcategory, "category name");
  add(p.shortNote, "product teaser");
  for (const k of ["dn", "temp", "pressure", "wallThickness", "standardLength", "vacuum",
    "bendRadius", "material", "reinforcement", "colorsAvailable", "certifications", "origin"]) add(p[k], "spec value");
  for (const l of p.descLines ?? []) add(l.text, l.heading ? "description heading" : "description line");
  for (const s of p.sizes ?? []) add(s, "size");
  for (const h of p.specTable?.headers ?? []) add(h, "table header");
  for (const r of p.specTable?.rows ?? []) for (const c of r) add(c, "table cell");
}
for (const m of chemMaterials) add(m, "hose material (chemical-resistance table column)");
for (const r of chemData) add(r.name, "chemical / substance name");

const CHUNK = 120;
const dir = path.join(ROOT, "scripts", "i18n", "chunks");
fs.rmSync(dir, { recursive: true, force: true });
fs.mkdirSync(dir, { recursive: true });
let n = 0;
for (let i = 0; i < items.length; i += CHUNK) {
  n += 1;
  fs.writeFileSync(path.join(dir, `chunk-${String(n).padStart(2, "0")}.json`),
    JSON.stringify(items.slice(i, i + CHUNK), null, 1) + "\n");
}
console.log(`${items.length} strings, ${n} chunks, with UA original: ${items.filter((i) => i.ua).length}`);
