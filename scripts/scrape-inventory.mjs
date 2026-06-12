// Build the translation inventory: every unique UA string the generator will
// need a Lithuanian equivalent for. Writes scripts/.scrape-cache/strings.json.
//   node scripts/scrape-inventory.mjs
import fs from "node:fs";
import path from "node:path";

const CACHE = path.join(process.cwd(), "scripts", ".scrape-cache");
const P = JSON.parse(fs.readFileSync(path.join(CACHE, "products-raw.json"), "utf8"));
const C = JSON.parse(fs.readFileSync(path.join(CACHE, "categories-raw.json"), "utf8"));

const isNumeric = (s) => /^[\d\s.,×x*/+\-–—°ºCСcс%]+$/u.test(s) || /^[GМM]\s?\d/.test(s);

const freq = (arr) => {
  const m = new Map();
  for (const s of arr) m.set(s, (m.get(s) ?? 0) + 1);
  return [...m.entries()].sort((a, b) => b[1] - a[1]);
};

const names = P.map((p) => p.nameUA);
const descLines = P.flatMap((p) => p.lines.map((l) => l.text));
const tableCells = P.flatMap((p) => p.tables.flatMap((t) => t.flat()))
  .filter((c) => c && !isNumeric(c));
const catNames = C.map((c) => c.nameUA);

const out = {
  names: freq(names),
  descLines: freq(descLines),
  tableCells: freq(tableCells),
  catNames: freq(catNames),
};
fs.writeFileSync(path.join(CACHE, "strings.json"), JSON.stringify(out, null, 2));
console.log("unique names:", out.names.length);
console.log("unique desc lines:", out.descLines.length);
console.log("unique non-numeric table cells:", out.tableCells.length);
console.log("unique category names:", out.catNames.length);
console.log("TOTAL unique strings:", out.names.length + out.descLines.length + out.tableCells.length + out.catNames.length);
