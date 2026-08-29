// Fetch and parse the Russian copy of the original site (rikomarket.com.ua/ru/),
// so the Russian locale reuses the client's own technical wording instead of a
// re-translation. Every cached Ukrainian page carries a
// <link rel="alternate" hreflang="ru"> pointing at its Russian twin — that link
// is the mapping, so products stay matched by page, not by name.
//
// Writes:
//   scripts/.scrape-cache/ru-url-map.json      – UA slug -> RU URL (product + category)
//   scripts/.scrape-cache/product-ru/*.html    – cached RU pages
//   scripts/.scrape-cache/products-ru-raw.json – parsed RU text, keyed by UA slug
//
//   node scripts/scrape-ru.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CACHE = path.join(ROOT, "scripts", ".scrape-cache");
const UA_DIR = path.join(CACHE, "product");
const RU_DIR = path.join(CACHE, "product-ru");
const RU_CAT_DIR = path.join(CACHE, "category-ru");
for (const d of [RU_DIR, RU_CAT_DIR]) fs.mkdirSync(d, { recursive: true });

const AGENT = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getText(url) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": AGENT } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (e) {
      if (attempt === 3) throw e;
      await sleep(1000 * attempt);
    }
  }
}

// ── UA slug -> RU URL, read from the hreflang links in the cached UA pages ──
function buildMap() {
  const map = { product: {}, category: {} };
  for (const [key, dir] of [["product", UA_DIR], ["category", path.join(CACHE, "category")]]) {
    if (!fs.existsSync(dir)) continue;
    for (const f of fs.readdirSync(dir).filter((n) => n.endsWith(".html"))) {
      const html = fs.readFileSync(path.join(dir, f), "utf8");
      const hit = html.match(/<link rel="alternate" href="([^"]+)" hreflang="ru"/);
      if (hit) map[key][f.replace(/\.html$/, "")] = hit[1];
    }
  }
  return map;
}

const MAP_FILE = path.join(CACHE, "ru-url-map.json");
const map = fs.existsSync(MAP_FILE)
  ? JSON.parse(fs.readFileSync(MAP_FILE, "utf8"))
  : buildMap();
fs.writeFileSync(MAP_FILE, JSON.stringify(map, null, 1));

// ── Parsing (mirrors scripts/scrape-parse-products.mjs, Russian headings) ────
const unescape = (s) =>
  s
    .replace(/&#8217;|&rsquo;|&#039;|&#39;/g, "’")
    .replace(/&#8211;|&ndash;|&#x2013;/g, "–")
    .replace(/&#8212;|&mdash;/g, "—")
    .replace(/&#176;|&deg;/g, "°")
    .replace(/&#177;|&plusmn;/g, "±")
    .replace(/&#8243;|&Prime;/g, "″")
    .replace(/&#8220;|&ldquo;/g, "“")
    .replace(/&#8221;|&rdquo;/g, "”")
    .replace(/&#215;|&times;/g, "×")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&laquo;/g, "«")
    .replace(/&raquo;/g, "»")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
const collapse = (s) => unescape(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

const HEADING_EXACT = new Set(
  [
    "Конструкция", "Строение", "Структура", "Размеры", "Размер", "Свойства",
    "Характеристики", "Особенности", "Преимущества", "Применение", "Приложение",
    "Материал", "Описание", "Назначение", "Технические параметры",
    "Химическая стойкость", "Рабочая температура", "Диапазон температур",
  ].map((s) => s.toLowerCase()),
);

function parseTable(tableHtml) {
  const rows = [...tableHtml.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map((r) =>
    [...r[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((c) => collapse(c[1])),
  );
  return rows.filter((r) => r.some((c) => c));
}

function parseDescription(html) {
  const anchor = html.indexOf('id="tab-description"');
  if (anchor < 0) return { lines: [], tables: [] };
  const start = html.indexOf(">", anchor) + 1;
  const ends = ['class="related', 'id="reviews"', 'class="woocommerce-tabs']
    .map((m) => html.indexOf(m, start))
    .filter((i) => i > 0);
  const end = ends.length ? Math.min(...ends) : html.length;
  let slice = html.slice(start, end).replace(/<[^>]*$/, "");

  const tables = [...slice.matchAll(/<table[\s\S]*?<\/table>/gi)].map((m) => parseTable(m[0]));
  slice = slice.replace(/<table[\s\S]*?<\/table>/gi, " ");

  slice = slice
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(h[1-6]|p|li|div|tr)>/gi, "\n")
    .replace(/<(li|h[1-6])[^>]*>/gi, "\n");
  const text = unescape(slice.replace(/<[^>]+>/g, " "));

  const lines = [];
  for (const raw of text.split("\n")) {
    const t = raw.replace(/[ \t]+/g, " ").trim();
    if (!t || t === "Описание" || t === "Опис") continue;
    const heading = /:$/.test(t) || HEADING_EXACT.has(t.toLowerCase());
    lines.push({ text: t, heading });
  }
  return { lines, tables };
}

function parsePage(html, fallbackName) {
  const h1 = html.match(/<h1[^>]*class="product_title[^"]*"[^>]*>([\s\S]*?)<\/h1>/);
  const title = html.match(/<title>([\s\S]*?)<\/title>/);
  const nameRU = h1
    ? collapse(h1[1])
    : title
      ? collapse(title[1]).replace(/\s*[–-]\s*Рiко-Маркет.*/u, "")
      : fallbackName;
  return { nameRU, ...parseDescription(html) };
}

// ── Fetch + parse ───────────────────────────────────────────────────────────
async function cached(dir, slug, url) {
  const file = path.join(dir, `${slug}.html`);
  if (fs.existsSync(file)) return fs.readFileSync(file, "utf8");
  const html = await getText(url);
  fs.writeFileSync(file, html, "utf8");
  await sleep(250);
  return html;
}

const products = {};
let fetched = 0, failed = 0;
for (const [slug, url] of Object.entries(map.product)) {
  try {
    const html = await cached(RU_DIR, slug, url);
    products[slug] = { slug, url, ...parsePage(html, slug) };
    fetched += 1;
    if (fetched % 25 === 0) console.log(`  ${fetched} product pages...`);
  } catch (e) {
    failed += 1;
    console.error(`FAIL ${url}: ${e.message}`);
  }
}

// Category pages: the <h1> is the Russian category name.
const cats = {};
for (const [slug, url] of Object.entries(map.category)) {
  try {
    const html = await cached(RU_CAT_DIR, slug, url);
    const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    cats[slug] = { url, nameRU: h1 ? collapse(h1[1]) : "" };
  } catch (e) {
    console.error(`FAIL ${url}: ${e.message}`);
  }
}

// Chemical-resistance table: find the Russian twin through the UA page's hreflang.
const CHEM_UA = "https://rikomarket.com.ua/tablyczya-himichnoyi-stijkosti/";
let chem = [];
try {
  const uaHtml = await cached(CACHE, "chem-ua", CHEM_UA);
  const alt = uaHtml.match(/<link rel="alternate" href="([^"]+)" hreflang="ru"/);
  if (!alt) throw new Error("no hreflang=ru on the chemical-resistance page");
  const ruHtml = await cached(CACHE, "chem-ru", alt[1]);
  // Data rows are name + 9 material columns.
  for (const m of ruHtml.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)) {
    const cells = [...m[1].matchAll(/<td[^>]*>([\s\S]*?)<\/td>/gi)].map((c) => collapse(c[1]));
    if (cells.length !== 10) continue;
    const name = cells[0];
    if (!name || name.length > 80) continue;
    if (!cells.slice(1).some((v) => v)) continue;
    chem.push(name);
  }
} catch (e) {
  console.error(`chemical-resistance table: ${e.message}`);
}

fs.writeFileSync(
  path.join(CACHE, "products-ru-raw.json"),
  JSON.stringify({ products, categories: cats, chem }, null, 2),
);
console.log(`RU chemical names: ${chem.length}`);

const noDesc = Object.values(products).filter((p) => p.lines.length === 0).map((p) => p.slug);
console.log(`RU products parsed: ${Object.keys(products).length} (failed ${failed})`);
console.log(`RU categories parsed: ${Object.keys(cats).length}`);
console.log(`no description: ${noDesc.length}`, noDesc.slice(0, 15));
