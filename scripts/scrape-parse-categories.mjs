// Parse cached category pages into a raw hierarchy (UA names + parent links).
//   node scripts/scrape-parse-categories.mjs
import fs from "node:fs";
import path from "node:path";

const CACHE = path.join(process.cwd(), "scripts", ".scrape-cache");
const CAT_DIR = path.join(CACHE, "category");
const urls = JSON.parse(fs.readFileSync(path.join(CACHE, "category-urls.json"), "utf8"));

const unescape = (s) =>
  s
    .replace(/&#8217;|&rsquo;|&#039;|&#39;/g, "’")
    .replace(/&#8211;|&ndash;/g, "–")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&nbsp;/g, " ")
    .replace(/&laquo;/g, "«")
    .replace(/&raquo;/g, "»")
    .replace(/&#8220;|&ldquo;/g, "“")
    .replace(/&#8221;|&rdquo;/g, "”")
    .replace(/\s+/g, " ")
    .trim();
const strip = (s) => unescape(s.replace(/<[^>]+>/g, ""));

// slug path → cache filename used by scrape-fetch.mjs
const fileFor = (url) =>
  url.replace(/\/$/, "").split("/").slice(4).join("__") + ".html";

const segs = (url) => url.replace(/\/$/, "").split("/").slice(4); // after product-category/

const byId = new Map();

function ensure(id, fields) {
  const cur = byId.get(id) || { id };
  byId.set(id, { ...cur, ...Object.fromEntries(Object.entries(fields).filter(([, v]) => v != null)) });
}

for (const url of urls) {
  const parts = segs(url);
  const id = parts[parts.length - 1];
  const parentId = parts.length > 1 ? parts[parts.length - 2] : null;

  const file = path.join(CAT_DIR, fileFor(url));
  let nameUA = id;
  let parentNameUA = null;
  if (fs.existsSync(file)) {
    const h = fs.readFileSync(file, "utf8");
    const h1 = h.match(/<h1[^>]*>([\s\S]*?)<\/h1>/);
    if (h1) nameUA = strip(h1[1]);
    const bc = h.match(/class="breadcrumb"[^>]*>([\s\S]*?)<\/ul>/);
    if (bc) {
      const crumbs = [...bc[1].matchAll(/<li[^>]*>([\s\S]*?)<\/li>/g)]
        .map((m) => strip(m[1]))
        .filter(Boolean);
      // crumbs: Home, Каталог, [parent...], leaf
      if (crumbs.length >= 2) parentNameUA = crumbs[crumbs.length - 2];
    }
  }
  ensure(id, { nameUA, parentId, slug: id });
  // Register the parent even if it has no standalone page/sitemap entry.
  if (parentId && parentNameUA && parentNameUA !== "Каталог") {
    ensure(parentId, { nameUA: byId.get(parentId)?.nameUA ?? parentNameUA, parentId: null, slug: parentId });
  } else if (parentId) {
    ensure(parentId, { nameUA: byId.get(parentId)?.nameUA ?? parentId, parentId: null, slug: parentId });
  }
}

const out = [...byId.values()].sort((a, b) =>
  (a.parentId ?? "") === (b.parentId ?? "")
    ? a.id.localeCompare(b.id)
    : (a.parentId ?? "").localeCompare(b.parentId ?? ""),
);
fs.writeFileSync(path.join(CACHE, "categories-raw.json"), JSON.stringify(out, null, 2));
console.log(`categories: ${out.length}`);
console.log("top-level:", out.filter((c) => !c.parentId).map((c) => `${c.id}=${c.nameUA}`).join("\n  "));
