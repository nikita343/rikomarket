import {
  categories,
  categoryById,
  childrenOf,
  topCategories,
  topAncestor,
} from "@/lib/categories";

describe("lib/categories", () => {
  it("exposes the 5 kept material families as top-level categories", () => {
    const tops = topCategories();
    expect(tops).toHaveLength(5);
    expect(tops.every((c) => c.parent === null)).toBe(true);
    expect(tops.map((c) => c.id).sort()).toEqual(
      [
        "elementi-ziednannya",
        "metalorukavy",
        "rukava-typu-klyn",
        "rukava-z-polihlorvinilu",
        "rukava-z-poliuretanu",
      ].sort(),
    );
  });

  describe("categoryById", () => {
    it("returns the matching category", () => {
      expect(categoryById("rukava-typu-klyn")?.name).toBe("KLIN tipo žarnos");
    });
    it("returns undefined for an unknown id", () => {
      expect(categoryById("does-not-exist")).toBeUndefined();
    });
  });

  describe("childrenOf", () => {
    it("returns direct children of a parent", () => {
      const kids = childrenOf("rukava-z-poliuretanu");
      expect(kids.map((c) => c.id).sort()).toEqual(
        ["armovani-metallospiralyu", "armovani-pvh-stallyu", "bez-spirali"].sort(),
      );
      expect(kids.every((c) => c.parent === "rukava-z-poliuretanu")).toBe(true);
    });
    it("returns an empty array for a leaf category", () => {
      expect(childrenOf("rukava-typu-klyn")).toEqual([]);
    });
  });

  describe("topAncestor", () => {
    it("returns itself for a top-level category", () => {
      expect(topAncestor("metalorukavy")?.id).toBe("metalorukavy");
    });
    it("walks a child up to its top-level parent", () => {
      expect(topAncestor("armovani-pvh-stallyu-ua")?.id).toBe("rukava-z-polihlorvinilu");
    });
    it("returns undefined for an unknown id", () => {
      expect(topAncestor("nope")).toBeUndefined();
    });
  });

  it("every child's parent id resolves to a real category (no dangling links)", () => {
    for (const c of categories) {
      if (c.parent !== null) {
        expect(categoryById(c.parent)).toBeDefined();
      }
    }
  });
});
