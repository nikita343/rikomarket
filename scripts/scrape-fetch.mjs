// Fetch every product + product-category page from the original Ukrainian site
// into a local HTML cache (scripts/.scrape-cache/). Re-runnable: skips files
// already cached. Polite 250ms delay between requests.
//   node scripts/scrape-fetch.mjs
import fs from "node:fs";
import path from "node:path";

const BASE = "https://rikomarket.com.ua";
const CACHE = path.join(process.cwd(), "scripts", ".scrape-cache");
const PROD_DIR = path.join(CACHE, "product");
const CAT_DIR = path.join(CACHE, "category");
for (const d of [CACHE, PROD_DIR, CAT_DIR]) fs.mkdirSync(d, { recursive: true });

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function getText(url) {
  for (let attempt = 1; attempt <= 3; attempt++) {
    try {
      const res = await fetch(url, { headers: { "User-Agent": UA } });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return await res.text();
    } catch (e) {
      if (attempt === 3) throw e;
      await sleep(1000 * attempt);
    }
  }
}

// Pull <loc> entries out of a sitemap XML.
function locs(xml) {
  return [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
}

async function main() {
  const prodXml = await getText(`${BASE}/wp-sitemap-posts-product-1.xml`);
  const catXml = await getText(`${BASE}/wp-sitemap-taxonomies-product_cat-1.xml`);
  const productUrls = locs(prodXml);
  const categoryUrls = locs(catXml);
  console.log(`products: ${productUrls.length}, categories: ${categoryUrls.length}`);

  fs.writeFileSync(path.join(CACHE, "product-urls.json"), JSON.stringify(productUrls, null, 2));
  fs.writeFileSync(path.join(CACHE, "category-urls.json"), JSON.stringify(categoryUrls, null, 2));

  const jobs = [
    ...productUrls.map((u) => ({ url: u, dir: PROD_DIR })),
    ...categoryUrls.map((u) => ({ url: u, dir: CAT_DIR })),
  ];

  let fetched = 0, skipped = 0, failed = 0;
  for (const { url, dir } of jobs) {
    // slug = last path segment(s); for nested cats keep a flat safe name
    const slug = url.replace(/\/$/, "").split("/").slice(4).join("__") || "index";
    const file = path.join(dir, `${slug}.html`);
    if (fs.existsSync(file)) { skipped++; continue; }
    try {
      const html = await getText(url);
      fs.writeFileSync(file, html, "utf8");
      fetched++;
      if (fetched % 20 === 0) console.log(`  fetched ${fetched}...`);
      await sleep(250);
    } catch (e) {
      failed++;
      console.error(`FAIL ${url}: ${e.message}`);
    }
  }
  console.log(`done. fetched=${fetched} skipped=${skipped} failed=${failed}`);
}

main();
