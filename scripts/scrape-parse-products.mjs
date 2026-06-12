// Parse cached product pages into structured raw JSON (UA text).
//   node scripts/scrape-parse-products.mjs [slug ...]   (no args = all)
import fs from "node:fs";
import path from "node:path";

const CACHE = path.join(process.cwd(), "scripts", ".scrape-cache");
const PROD_DIR = path.join(CACHE, "product");
const urls = JSON.parse(fs.readFileSync(path.join(CACHE, "product-urls.json"), "utf8"));

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

const slugOf = (url) => url.replace(/\/$/, "").split("/").pop();

function parseTable(tableHtml) {
  const rows = [...tableHtml.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)].map((r) =>
    [...r[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((c) => collapse(c[1])),
  );
  return rows.filter((r) => r.some((c) => c));
}

// Standalone section labels (a whole line equal to one of these is a heading).
const HEADING_EXACT = new Set(
  [
    "Конструкція", "Будова", "Структура", "Розміри", "Розмір", "Властивості",
    "Характеристики", "Особливості", "Переваги", "Застосування", "Додаток",
    "Матеріал", "Опис", "Призначення", "Технічні параметри", "Хімічна стійкість",
    "Робоча температура", "Діапазон температур",
  ].map((s) => s.toLowerCase()),
);

function parseDescription(html) {
  const anchor = html.indexOf('id="tab-description"');
  if (anchor < 0) return { lines: [], tables: [] };
  const start = html.indexOf(">", anchor) + 1; // skip past the opening tag itself
  const ends = ['class="related', 'id="reviews"', 'class="woocommerce-tabs']
    .map((m) => html.indexOf(m, start))
    .filter((i) => i > 0);
  const end = ends.length ? Math.min(...ends) : html.length;
  let slice = html.slice(start, end).replace(/<[^>]*$/, ""); // drop a trailing partial tag

  // pull tables out first, then remove them from the prose slice
  const tables = [...slice.matchAll(/<table[\s\S]*?<\/table>/gi)].map((m) => parseTable(m[0]));
  slice = slice.replace(/<table[\s\S]*?<\/table>/gi, " ");

  // Normalize every block boundary to a newline so the inline-<br> style
  // (e.g. tpr) and the <h2>-section style both split cleanly.
  slice = slice
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/(h[1-6]|p|li|div|tr)>/gi, "\n")
    .replace(/<(li|h[1-6])[^>]*>/gi, "\n");
  const text = unescape(slice.replace(/<[^>]+>/g, " "));

  const lines = [];
  for (const raw of text.split("\n")) {
    const t = raw.replace(/[ \t]+/g, " ").trim();
    if (!t || t === "Опис") continue;
    const heading = /:$/.test(t) || HEADING_EXACT.has(t.toLowerCase());
    lines.push({ text: t, heading });
  }
  return { lines, tables };
}

function parseProduct(url) {
  const slug = slugOf(url);
  const file = path.join(PROD_DIR, `${slug}.html`);
  if (!fs.existsSync(file)) return { slug, missing: true };
  const html = fs.readFileSync(file, "utf8");

  const h1 = html.match(/<h1[^>]*class="product_title[^"]*"[^>]*>([\s\S]*?)<\/h1>/);
  const title = html.match(/<title>([\s\S]*?)<\/title>/);
  const nameUA = h1 ? collapse(h1[1]) : title ? collapse(title[1]).replace(/\s*[–-]\s*Рiко-Маркет.*/u, "") : slug;

  // categories from product meta "posted_in"
  const meta = html.match(/class="posted_in">([\s\S]*?)<\/span>/);
  const categorySlugs = meta
    ? [...meta[1].matchAll(/\/product-category\/[^"']*?\/?([^/"']+)\/"/g)].map((m) => m[1])
    : [];

  // main image — Porto lazy-loads the real URL into data-oi on .woocommerce-main-image
  let image = "";
  const mainImg =
    html.match(/data-oi="([^"]+)"[^>]*\bwoocommerce-main-image/) ||
    html.match(/\bwoocommerce-main-image\b[^>]*data-oi="([^"]+)"/) ||
    html.match(/data-large_image="([^"]+)"/);
  if (mainImg) image = unescape(mainImg[1]);

  const { lines, tables } = parseDescription(html);

  return { slug, url, nameUA, categorySlugs, image, lines, tables };
}

const wanted = process.argv.slice(2);
const list = wanted.length ? urls.filter((u) => wanted.includes(slugOf(u))) : urls;
const products = list.map(parseProduct);

const missing = products.filter((p) => p.missing).map((p) => p.slug);
const noDesc = products.filter((p) => !p.missing && p.lines.length === 0).map((p) => p.slug);

if (!wanted.length) {
  fs.writeFileSync(path.join(CACHE, "products-raw.json"), JSON.stringify(products, null, 2));
  console.log(`parsed: ${products.length}`);
  console.log(`missing html: ${missing.length}`, missing.slice(0, 10));
  console.log(`no description sections: ${noDesc.length}`, noDesc.slice(0, 20));
} else {
  console.log(JSON.stringify(products, null, 2));
}
