import {
  getAllProducts,
  getProductBySlug,
  getProductsByCategory,
  countByCategory,
} from "@/lib/products";
import { categoryById, topCategories } from "@/lib/categories";

describe("lib/products", () => {
  const all = getAllProducts();

  it("loads the catalog from data/products.json", () => {
    expect(all.length).toBeGreaterThan(90);
    expect(all[0]).toHaveProperty("slug");
    expect(all[0]).toHaveProperty("descLines");
  });

  it("caches the parsed catalog (same reference on repeat calls)", () => {
    expect(getAllProducts()).toBe(all);
  });

  describe("getProductBySlug", () => {
    it("finds an existing product", () => {
      const p = getProductBySlug("klyn-k1-d-teflon-steklovolokno");
      expect(p?.name).toBe("KLIN K1/D. Teflonas + stiklo pluoštas");
    });
    it("returns undefined for a missing slug", () => {
      expect(getProductBySlug("no-such-product")).toBeUndefined();
    });
  });

  describe("getProductsByCategory", () => {
    it("returns products for a top-level category (subtree included)", () => {
      const klin = getProductsByCategory("rukava-typu-klyn");
      expect(klin.length).toBeGreaterThan(0);
      expect(klin.every((p) => p.category === "rukava-typu-klyn")).toBe(true);
    });

    it("a parent category includes products from its child subcategories", () => {
      const pvcAll = getProductsByCategory("rukava-z-polihlorvinilu").length;
      const child = getProductsByCategory("armovani-pvh-stallyu-ua").length;
      expect(child).toBeGreaterThan(0);
      expect(pvcAll).toBeGreaterThanOrEqual(child);
    });

    it("returns an empty array for an unknown category", () => {
      expect(getProductsByCategory("unknown-cat")).toEqual([]);
    });
  });

  describe("countByCategory", () => {
    const counts = countByCategory();

    it("counts every product under some top-level category", () => {
      const topTotal = topCategories().reduce((sum, c) => sum + (counts[c.id] ?? 0), 0);
      // Each product has exactly one primary top-level family, so the sum of the
      // 5 top-level counts equals the catalog size.
      expect(topTotal).toBe(all.length);
    });

    it("rolls counts up so a parent >= any of its children", () => {
      expect(counts["rukava-z-poliuretanu"]).toBeGreaterThanOrEqual(
        counts["bez-spirali"] ?? 0,
      );
    });
  });

  describe("data integrity", () => {
    it("every product's primary category exists and is top-level", () => {
      for (const p of all) {
        const cat = categoryById(p.category);
        expect(cat).toBeDefined();
        expect(cat?.parent).toBeNull();
      }
    });

    it("every category membership id resolves to a real category", () => {
      for (const p of all) {
        for (const id of p.categories) {
          expect(categoryById(id)).toBeDefined();
        }
      }
    });

    it("has unique product slugs", () => {
      const slugs = all.map((p) => p.slug);
      expect(new Set(slugs).size).toBe(slugs.length);
    });
  });
});
