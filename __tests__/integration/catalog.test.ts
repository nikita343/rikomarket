import fs from "node:fs";
import path from "node:path";
import { getAllProducts, getProductBySlug, getProductsByCategory } from "@/lib/products";
import { categoryById, childrenOf } from "@/lib/categories";

// End-to-end data integrity: the generated catalog (data/products.json) must stay
// consistent with the category model and with the image assets on disk.
describe("catalog integration", () => {
  const products = getAllProducts();
  const publicDir = path.join(process.cwd(), "public");

  it("every product resolves via its slug (generateStaticParams contract)", () => {
    for (const p of products) {
      expect(getProductBySlug(p.slug)).toBe(p);
    }
  });

  it("every product image file exists in /public", () => {
    const missing = products
      .filter((p) => p.image)
      .filter((p) => !fs.existsSync(path.join(publicDir, p.image)))
      .map((p) => `${p.slug} → ${p.image}`);
    expect(missing).toEqual([]);
  });

  it("KLIN category mirrors the original site exactly (17 products)", () => {
    expect(getProductsByCategory("rukava-typu-klyn")).toHaveLength(17);
  });

  it("PVC 'Armuotos PVC spirale' holds the 12 imported polynect hoses", () => {
    const inSub = products.filter((p) => p.categories.includes("armovani-pvh-stallyu-ua"));
    expect(inSub).toHaveLength(12);
    expect(inSub.some((p) => p.name.includes("Vacuum FR"))).toBe(true);
  });

  it("no product is left in a removed category (Kita / application areas)", () => {
    const removed = ["rizne", "ventilyacziya", "vihlopni-gazi", "derevoobrobna"];
    for (const p of products) {
      for (const r of removed) {
        expect(p.categories).not.toContain(r);
        expect(p.category).not.toBe(r);
      }
      // and the removed ids are not defined as categories anymore
    }
    for (const r of removed) expect(categoryById(r)).toBeUndefined();
  });

  it("a category with sub-categories has no products attached directly to the parent", () => {
    // Client rule: selecting a parent shows only its sub-category contents, so
    // every product under a parent-with-children must live in a child category.
    for (const parent of getAllProducts()
      .map((p) => p.category)
      .filter((id, i, arr) => arr.indexOf(id) === i)) {
      const children = childrenOf(parent);
      if (children.length === 0) continue; // leaf categories hold products directly
      const childIds = new Set(children.map((c) => c.id));
      const direct = getProductsByCategory(parent).filter(
        (p) => !p.categories.some((c) => childIds.has(c)),
      );
      expect(direct).toEqual([]);
    }
  });

  it("a parent's product count equals the union of its sub-categories", () => {
    const children = childrenOf("rukava-z-polihlorvinilu");
    const parentCount = getProductsByCategory("rukava-z-polihlorvinilu").length;
    const subUnion = new Set(
      children.flatMap((c) => getProductsByCategory(c.id).map((p) => p.slug)),
    );
    expect(parentCount).toBe(subUnion.size);
  });

  it("featured products (homepage) all exist", () => {
    const featured = products.filter((p) => p.featured);
    expect(featured.length).toBeGreaterThan(0);
    for (const p of featured) expect(getProductBySlug(p.slug)).toBeDefined();
  });

  it("products with a spec table have header/row shape consistency", () => {
    for (const p of products) {
      if (!p.specTable) continue;
      const width = p.specTable.headers.length;
      expect(width).toBeGreaterThan(0);
      // rows may legitimately vary, but should not be empty
      expect(p.specTable.rows.length).toBeGreaterThan(0);
    }
  });
});
