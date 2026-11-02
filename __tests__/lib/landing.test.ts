import { categoryLandings, cities, cityCopy, formatTemp, specRange } from "@/lib/landing";
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
