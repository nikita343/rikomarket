// Download every product image referenced in image-manifest.json into
// public/products/orig/. Re-runnable: skips files already present.
//   node scripts/scrape-images.mjs
import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const manifest = JSON.parse(
  fs.readFileSync(path.join(ROOT, "scripts", ".scrape-cache", "image-manifest.json"), "utf8"),
);
const OUT = path.join(ROOT, "public", "products", "orig");
fs.mkdirSync(OUT, { recursive: true });

const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

let fetched = 0, skipped = 0, failed = 0;
for (const [localPath, remote] of Object.entries(manifest)) {
  const file = path.join(ROOT, "public", localPath);
  if (fs.existsSync(file)) { skipped++; continue; }
  try {
    const res = await fetch(remote, { headers: { "User-Agent": UA } });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    const buf = Buffer.from(await res.arrayBuffer());
    fs.writeFileSync(file, buf);
    fetched++;
    if (fetched % 25 === 0) console.log(`  fetched ${fetched}...`);
    await sleep(150);
  } catch (e) {
    failed++;
    console.error(`FAIL ${remote}: ${e.message}`);
  }
}
console.log(`done. fetched=${fetched} skipped=${skipped} failed=${failed}`);
