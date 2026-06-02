import { chromium } from "playwright";
import fs from "node:fs";

const BASE = "http://localhost:3100";
const OUT = "/tmp/shots";
fs.mkdirSync(OUT, { recursive: true });

const pages = [
  ["home", "/"],
  ["produktai", "/produktai"],
  ["produktai-pvc", "/produktai?kategorija=pvc"],
  ["detail-pvc-vent", "/produktai/pvc-vent"],
  ["kontaktai", "/kontaktai"],
  ["pritaikymas", "/pritaikymas"],
  ["cheminis", "/cheminis-atsparumas"],
  ["matavimo", "/matavimo-vienetai"],
];

const browser = await chromium.launch();
const ctx = await browser.newContext({
  viewport: { width: 1320, height: 900 },
  deviceScaleFactor: 1,
});
const page = await ctx.newPage();

for (const [name, path] of pages) {
  await page.goto(BASE + path, { waitUntil: "networkidle" });
  await page.waitForTimeout(400);
  // full page
  await page.screenshot({ path: `${OUT}/${name}-full.png`, fullPage: true });
  // above-the-fold
  await page.screenshot({ path: `${OUT}/${name}-top.png`, fullPage: false });
  console.log("shot", name);
}

await browser.close();
console.log("DONE");
