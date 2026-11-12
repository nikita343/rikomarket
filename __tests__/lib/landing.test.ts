import {
  allCategoryLandings,
  categoryLandingBySlug,
  categoryLandings,
  cities,
  cityCopy,
  DELIVERY_PATH,
  deliveryCopy,
  fittingLandings,
  FITTINGS_CATEGORY,
  formatTemp,
  purposeLandingForIndustry,
  purposeLandings,
  purposePath,
  specRange,
} from "@/lib/landing";
import { categoryLandingProducts, groupByCategory, purposeLandingProducts } from "@/lib/landing-products";
import { industries } from "@/lib/industries";
import { CATEGORY_SLUGS } from "@/lib/category-paths";
import { categoryById } from "@/lib/categories";
import { getAllProducts, getProductsByCategory } from "@/lib/products";
import { faqJsonLd, organizationJsonLd, productDescription, productTitle } from "@/lib/seo";

describe("lib/landing", () => {
  it("has a landing page for every top-level category, in both languages", () => {
    for (const l of categoryLandings) {
      expect(categoryById(l.categoryId)).toBeDefined();
      expect(CATEGORY_SLUGS[l.categoryId]).toBe(l.slug);
      expect(getProductsByCategory(l.categoryId).length).toBeGreaterThan(0);
      for (const loc of ["lt", "ru"] as const) {
        const c = l.copy[loc];
        expect(c.description.length).toBeLessThanOrEqual(158);
        expect(c.faq.length).toBeGreaterThan(0);
      }
    }
  });

  it("treats a lone temperature as an upper bound", () => {
    expect(formatTemp(specRange(getProductsByCategory("metalorukavy")), "lt")).toBe("iki +650 °C");
    expect(formatTemp(specRange(getProductsByCategory("rukava-z-poliuretanu")), "lt")).toBe("−40 … +150 °C");
  });

  it("writes city copy with the right case forms", () => {
    const vilnius = cities.find((c) => c.slug === "vilnius")!;
    expect(cityCopy(vilnius, "lt").h1).toBe("Techninės žarnos Vilniuje");
    expect(cityCopy(vilnius, "ru").h1).toBe("Технические рукава в Вильнюсе");
    expect(cityCopy(vilnius, "lt").description).toContain("į Vilnių");
    expect(new Set(cities.map((c) => c.slug)).size).toBe(cities.length);
  });

  it("puts the searchable hose type into product titles and descriptions", () => {
    const p = getAllProducts("lt").find((x) => x.name.startsWith("Tipas A1."))!;
    expect(productTitle(p, "lt")).toMatch(/\| PVC žarna$/);
    expect(productDescription(p, "lt")).toMatch(/^PVC žarna: DN /);
  });

  it("emits valid FAQ and local-business schema", () => {
    expect(faqJsonLd([{ q: "Q?", a: "A." }]).mainEntity[0].acceptedAnswer.text).toBe("A.");
    const org = organizationJsonLd("lt");
    expect(org["@type"]).toBe("Store");
    expect(org.openingHoursSpecification[0].opens).toBe("09:00");
  });
});

describe("fittings sub-pages and hoses-by-use pages", () => {
  const byLtName = (name: string) => getAllProducts("lt").find((p) => p.name === name)!;
  const slugsOf = (list: { slug: string }[]) => new Set(list.map((p) => p.slug));

  it("lists at least one product on every new page, identically in both languages", () => {
    for (const l of fittingLandings) {
      const lt = categoryLandingProducts(l, "lt");
      const ru = categoryLandingProducts(l, "ru");
      expect(lt.length).toBeGreaterThan(0);
      expect(slugsOf(ru)).toEqual(slugsOf(lt));
      expect(l.parent && categoryLandingBySlug(l.parent)).toBeTruthy();
    }
    for (const u of purposeLandings) {
      const lt = purposeLandingProducts(u, "lt");
      const ru = purposeLandingProducts(u, "ru");
      expect(lt.length).toBeGreaterThan(0);
      expect(slugsOf(ru)).toEqual(slugsOf(lt));
      // Tag-driven, hoses only, and every item lands in a category group.
      expect(lt.every((p) => p.industries.includes(u.tag) && p.category !== FITTINGS_CATEGORY)).toBe(true);
      expect(groupByCategory(lt).reduce((n, g) => n + g.products.length, 0)).toBe(lt.length);
    }
  });

  it("keeps Camlock, STORZ and clamps apart", () => {
    const page = (slug: string) => slugsOf(categoryLandingProducts(categoryLandingBySlug(slug)!, "lt"));
    const camlock = page("camlock-jungtys");
    const storz = page("storz-jungtys");
    const clamps = page("zarnu-apkabos");
    const overlap = (a: Set<string>, b: Set<string>) => [...a].filter((s) => b.has(s));
    expect(overlap(camlock, storz)).toEqual([]);
    expect(overlap(camlock, clamps)).toEqual([]);
    expect(overlap(storz, clamps)).toEqual([]);

    const fittings = getProductsByCategory(FITTINGS_CATEGORY, "lt");
    for (const p of fittings) {
      expect(camlock.has(p.slug)).toBe(/camlock/i.test(p.name));
      expect(storz.has(p.slug)).toBe(/storz/i.test(p.name));
      expect(clamps.has(p.slug)).toBe(/apkab/i.test(p.name));
    }
    // Gaskets go with their coupling system, never with the clamps.
    expect(camlock.has(byLtName("EPDM sandarinimo žiedas (tarpiklis) Camlock jungtims").slug)).toBe(true);
    expect(storz.has(byLtName("Tarpiklis STORZ jungtims").slug)).toBe(true);
    // A clamp is not on the Camlock page; a cable tie or Tankwagen gasket is on none.
    expect(camlock.has(byLtName("Spyruoklinė apkaba").slug)).toBe(false);
    for (const name of ["Kabelinis dirželis su skyle varžtui 4×150 mm", "Tankwagen movos tarpiklis 3″ (NBR)"]) {
      const s = byLtName(name).slug;
      expect(camlock.has(s) || storz.has(s) || clamps.has(s)).toBe(false);
    }
  });

  it("keeps the 'exhaust' tag out of the industries page", () => {
    expect(industries.some((i) => i.id === "exhaust")).toBe(false);
    expect(purposeLandings.find((u) => u.tag === "exhaust")).toBeDefined();
    expect(purposeLandingForIndustry("spec")).toBeUndefined();
    expect(purposeLandingForIndustry("wood")?.slug).toBe("drozlems-ir-dulkems");
  });

  it("writes snippet-sized, unique titles and descriptions", () => {
    const pages = [
      ...allCategoryLandings.map((l) => l.copy),
      ...purposeLandings.map((u) => u.copy),
      deliveryCopy,
    ];
    for (const loc of ["lt", "ru"] as const) {
      const titles = pages.map((c) => c[loc].title);
      expect(new Set(titles).size).toBe(titles.length);
      for (const c of pages) {
        expect(c[loc].description.length).toBeLessThanOrEqual(158);
        expect(c[loc].title.length).toBeLessThanOrEqual(64);
        expect(c[loc].faq.length).toBeGreaterThan(0);
      }
    }
    expect(new Set(purposeLandings.map((u) => purposePath(u.slug))).size).toBe(purposeLandings.length);
    expect(DELIVERY_PATH).toBe("/pristatymas");
  });
});
