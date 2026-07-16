// Fetch + parse the polynect.com.ua hose products that replace the contents of
// the PVC "Armuotos PVC spirale" subcategory. The client asked for everything in
// https://polynect.com.ua/product-category/rukava-i-shlangi/ from the first
// product up to and including "Vacuum FR" (listing order).
//   node scripts/scrape-polynect.mjs
import fs from "node:fs";
import path from "node:path";

const CACHE = path.join(process.cwd(), "scripts", ".scrape-cache");
const DIR = path.join(CACHE, "polynect");
fs.mkdirSync(DIR, { recursive: true });

// Listing order, first → "Vacuum FR" (inclusive).
const SLUGS = [
  "rukava-i-shlangi-gardenpress",
  "rukav-agrochem",
  "rukav-aquaflex",
  "rukav-aspirato",
  "rukav-aspirato-pu",
  "crystal-x",
  "crystalline",
  "rukav-elastic-super-nova",
  "rukav-grain-press",
  "rukav-grain-press-s",
  "rukav-terraspray-20-bar-60-bar",
  "rukav-vacuum-fr",
];

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

const unescape = (s) =>
  s
    .replace(/&#8217;|&rsquo;|&#039;|&#39;/g, "’")
    .replace(/&#8211;|&ndash;|&#x2013;/g, "–")
    .replace(/&#8212;|&mdash;/g, "—")
    .replace(/&#176;|&deg;/g, "°")
    .replace(/&#8243;|&Prime;/g, "″")
    .replace(/&#8220;|&ldquo;/g, "“")
    .replace(/&#8221;|&rdquo;/g, "”")
    .replace(/&#215;|&times;/g, "×")
    .replace(/&nbsp;|&#160;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
const collapse = (s) => unescape(s.replace(/<[^>]+>/g, " ")).replace(/\s+/g, " ").trim();

async function getHtml(slug) {
  const file = path.join(DIR, `${slug}.html`);
  if (fs.existsSync(file)) return fs.readFileSync(file, "utf8");
  const res = await fetch(`https://polynect.com.ua/product/${slug}/`, {
    headers: { "User-Agent": UA },
  });
  if (!res.ok) throw new Error(`HTTP ${res.status} for ${slug}`);
  const html = await res.text();
  fs.writeFileSync(file, html, "utf8");
  await sleep(250);
  return html;
}

function parseTable(tableHtml) {
  return [...tableHtml.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/gi)]
    .map((r) => [...r[1].matchAll(/<t[dh][^>]*>([\s\S]*?)<\/t[dh]>/gi)].map((c) => collapse(c[1])))
    .filter((r) => r.some((c) => c));
}

function parse(slug, rawHtml) {
  // The theme ships a commented-out duplicate of the description — drop comments
  // first so we only read the live copy.
  const html = rawHtml.replace(/<!--[\s\S]*?-->/g, "");

  const h1 = html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
  const nameUA = h1 ? collapse(h1[1]) : slug;

  const og = html.match(/<meta property="og:image" content="([^"]+)"/);
  const image = og ? unescape(og[1]) : "";

  // Description block: starts at the first <strong> label, ends at the related/footer.
  const start = html.search(/<p>\s*<strong>\s*(Властивості|Опис|Характеристики)/i);
  let lines = [];
  let tables = [];
  if (start >= 0) {
    const ends = ["single-product-related", "related", "site-footer", "<footer"]
      .map((m) => html.indexOf(m, start))
      .filter((i) => i > 0);
    const end = ends.length ? Math.min(...ends) : html.length;
    let slice = html.slice(start, end).replace(/<[^>]*$/, "");

    tables = [...slice.matchAll(/<table[\s\S]*?<\/table>/gi)].map((m) => parseTable(m[0]));
    slice = slice.replace(/<table[\s\S]*?<\/table>/gi, " ");
    // images inside the prose are noise
    slice = slice.replace(/<img[^>]*>/gi, " ");

    // <strong>Label</strong> and block ends become line breaks
    slice = slice
      .replace(/<br\s*\/?>/gi, "\n")
      .replace(/<\/(p|li|div|h[1-6])>/gi, "\n")
      .replace(/<(li|h[1-6])[^>]*>/gi, "\n")
      .replace(/<strong[^>]*>/gi, "\n@@B@@")
      .replace(/<\/strong>/gi, "@@/B@@");
    const text = unescape(slice.replace(/<[^>]+>/g, " "));

    for (const raw of text.split("\n")) {
      let t = raw.replace(/[ \t]+/g, " ").trim();
      if (!t) continue;
      // A line that is *only* a bold label is a heading; "Label: value" stays inline.
      const boldOnly = /^@@B@@([^@]*)@@\/B@@$/.exec(t);
      const heading = Boolean(boldOnly) && !/:\s*$/.test(boldOnly[1]) ? true : /:$/.test(t.replace(/@@\/?B@@/g, "").trim());
      t = t.replace(/@@\/?B@@/g, "").replace(/\s+/g, " ").trim();
      if (!t) continue;
      lines.push({ text: t, heading });
    }
  }
  return { slug, url: `https://polynect.com.ua/product/${slug}/`, nameUA, image, lines, tables };
}

const out = [];
for (const slug of SLUGS) {
  const html = await getHtml(slug);
  out.push(parse(slug, html));
}
fs.writeFileSync(path.join(CACHE, "polynect-raw.json"), JSON.stringify(out, null, 2));
console.log(`parsed ${out.length} polynect products`);
for (const p of out) {
  console.log(`  ${p.slug.padEnd(32)} | ${p.nameUA.padEnd(34)} | lines:${String(p.lines.length).padStart(2)} table:${p.tables[0]?.length ?? 0} img:${p.image ? "y" : "n"}`);
}
