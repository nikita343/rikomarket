import { getAllProducts, getProductBySlug } from "@/lib/products";
import { categories } from "@/lib/categories";
import { chemData } from "@/lib/chem-data";
import { chemMaterialsRu, chemNameRu } from "@/lib/chem-ru";
import { localeHref, splitLocale, locales } from "@/lib/i18n";

// The Russian catalogue is generated from the Lithuanian one
// (scripts/translate-ru.mjs) and must stay structurally identical.
describe("russian catalogue", () => {
  const lt = getAllProducts("lt");
  const ru = getAllProducts("ru");
  const ltOnly = /[ąčęėįšųūžĄČĘĖĮŠŲŪŽ]/;

  it("has the same products, in the same order", () => {
    expect(ru.map((p) => p.slug)).toEqual(lt.map((p) => p.slug));
  });

  it("keeps every non-text field identical", () => {
    ru.forEach((r, i) => {
      const l = lt[i];
      expect(r.category).toBe(l.category);
      expect(r.categories).toEqual(l.categories);
      expect(r.industries).toEqual(l.industries);
      expect(r.image).toBe(l.image);
      expect(r.featured).toBe(l.featured);
      expect(r.specTable?.rows.length ?? 0).toBe(l.specTable?.rows.length ?? 0);
      expect(r.specTable?.headers.length ?? 0).toBe(l.specTable?.headers.length ?? 0);
      expect(r.descLines.length).toBe(l.descLines.length);
      expect(r.sizes.length).toBe(l.sizes.length);
    });
  });

  it("leaves no Lithuanian text in the Russian names and descriptions", () => {
    const leftovers = ru
      .filter((p) => ltOnly.test(p.name) || ltOnly.test(p.description) || ltOnly.test(p.subcategory))
      .map((p) => p.slug);
    expect(leftovers).toEqual([]);
  });

  it("translates the metal hoses transferred from the supplier", () => {
    const a = getProductBySlug("metalhex-a", "ru");
    expect(a?.name).toContain("Рукав");
    expect(a?.specTable?.headers[0]).toBe("Код изделия");
    expect(a?.specTable?.rows).toHaveLength(44);
  });

  it("gives every category a Russian name", () => {
    for (const c of categories) {
      expect(c.nameRu.length).toBeGreaterThan(0);
      expect(ltOnly.test(c.nameRu)).toBe(false);
    }
  });

  it("gives every chemical a Russian label", () => {
    expect(chemMaterialsRu).toHaveLength(9);
    for (const row of chemData) {
      expect(chemNameRu[row.name]).toBeTruthy();
    }
  });
});

describe("locale routing", () => {
  it("keeps Lithuanian at the root and prefixes Russian", () => {
    expect(localeHref("lt", "/products")).toBe("/products");
    expect(localeHref("ru", "/products")).toBe("/ru/products");
    expect(localeHref("ru", "/")).toBe("/ru");
    expect(localeHref("ru", "mailto:a@b.c")).toBe("mailto:a@b.c");
  });

  it("round-trips a path through split + href", () => {
    for (const path of ["/", "/products", "/products/metalhex-a", "/contacts"]) {
      for (const l of locales) {
        const href = localeHref(l, path);
        const { locale, rest } = splitLocale(href);
        expect(locale).toBe(l);
        expect(rest).toBe(path);
      }
    }
  });
});
