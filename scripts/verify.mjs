import { chromium } from "playwright";
import fs from "node:fs";

const BASE = "http://localhost:3100";
const OUT = "/tmp/shots2";
fs.mkdirSync(OUT, { recursive: true });

const browser = await chromium.launch();
const ctx = await browser.newContext({ viewport: { width: 1320, height: 900 } });
const page = await ctx.newPage();
const log = (...a) => console.log(...a);

// 1) Home — check header/hero gap (hero top should sit ~right under header)
await page.goto(BASE + "/", { waitUntil: "networkidle" });
await page.screenshot({ path: `${OUT}/home-top.png` });

// 2) Products — filtering + pagination
await page.goto(BASE + "/products", { waitUntil: "networkidle" });
const countText = async () =>
  (await page.locator("text=/Rasta/").first().innerText()).replace(/\s+/g, " ");
log("products initial:", await countText());
await page.screenshot({ path: `${OUT}/products-all.png`, fullPage: true });

// Click PUR category
await page.getByRole("button", { name: /PUR žarnos/ }).click();
await page.waitForTimeout(300);
log("after PUR click:", await countText());
log("URL:", page.url());

// Apply a temperature filter checkbox (Iki +90 °C)
await page.goto(BASE + "/products", { waitUntil: "networkidle" });
await page.getByText("Iki +90 °C").click();
await page.waitForTimeout(300);
log("after temp<=90 filter:", await countText());
await page.screenshot({ path: `${OUT}/products-filtered.png`, fullPage: true });

// 3) Units converter — type a value, check result changes
await page.goto(BASE + "/units", { waitUntil: "networkidle" });
const resultLoc = page.locator("text=Rezultatas").locator("xpath=following-sibling::div").first();
const r1 = (await resultLoc.innerText()).trim();
log("converter 1,5 bar->kPa:", r1);
await page.screenshot({ path: `${OUT}/units.png` });

// 4) Chemical resistance — search filter
await page.goto(BASE + "/chemical-resistance", { waitUntil: "networkidle" });
const rowCount = async () => page.locator("table tbody tr").count();
log("chem rows initial:", await rowCount());
await page.getByPlaceholder("Ieškoti chemikalo…").fill("Ацетон");
await page.waitForTimeout(300);
log("chem rows after search 'Ацетон':", await rowCount());
await page.screenshot({ path: `${OUT}/chem-top.png` });

// 5) Contacts — confirm no form/map
await page.goto(BASE + "/contacts", { waitUntil: "networkidle" });
log("contacts has textarea?", (await page.locator("textarea").count()) > 0);
log("contacts has 'Žemėlapis'?", (await page.getByText("Žemėlapis").count()) > 0);
await page.screenshot({ path: `${OUT}/contacts.png`, fullPage: true });

// 6) Product detail — confirm tabs/downloads removed
await page.goto(BASE + "/products/pvc-vent", { waitUntil: "networkidle" });
log("detail has 'Atsisiuntimai'?", (await page.getByText("Atsisiuntimai").count()) > 0);
log("detail has 'Specifikacija' heading?", (await page.getByText("Specifikacija", { exact: true }).count()) > 0);
await page.screenshot({ path: `${OUT}/detail.png`, fullPage: true });

await browser.close();
log("DONE");
