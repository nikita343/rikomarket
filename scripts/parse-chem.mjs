// Parse the UA chemical-resistance table HTML into structured JSON.
//   node scripts/parse-chem.mjs
import fs from "node:fs";

const html = fs.readFileSync("/tmp/chem.html", "utf8");

function decode(s) {
  return s
    .replace(/<[^>]+>/g, "")
    .replace(/&#8211;|&ndash;|&#x2013;/g, "–")
    .replace(/&#8212;|&mdash;/g, "–")
    .replace(/&#177;|&plusmn;|&#xB1;/g, "±")
    .replace(/&#8217;|&rsquo;/g, "’")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

// Normalize a resistance symbol cell to one of: + | - | +- | o | ""
function normSym(raw) {
  const s = decode(raw);
  if (s === "+") return "+";
  if (s === "±") return "+-";
  if (s === "–" || s === "-" || s === "—") return "-";
  if (s === "о" || s === "o" || s === "О" || s === "O") return "o";
  return "";
}

// Pull every <tr>…</tr>, then its <td>…</td> cells.
const rows = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map((m) =>
  [...m[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((c) => c[1]),
);

const data = [];
for (const cells of rows) {
  if (cells.length !== 10) continue; // data rows = name + 9 materials
  const name = decode(cells[0]);
  if (!name || name.length > 80) continue; // skip legend description rows
  const vals = cells.slice(1).map(normSym);
  // require at least one real symbol so we skip stray rows
  if (!vals.some((v) => v)) continue;
  data.push({ name, vals });
}

// Distribution of cell counts (debug)
const dist = {};
for (const c of rows) dist[c.length] = (dist[c.length] ?? 0) + 1;

fs.writeFileSync("/tmp/chem.json", JSON.stringify(data, null, 0));
console.log("cell-count distribution:", dist);
console.log("parsed chemicals:", data.length);
console.log("first 3:", JSON.stringify(data.slice(0, 3)));
console.log("last 2:", JSON.stringify(data.slice(-2)));
