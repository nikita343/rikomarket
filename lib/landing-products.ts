// Which catalogue items a landing page lists. Server-only (reads the catalogue
// through lib/products.ts) — lib/landing.ts stays filesystem-free so the
// sitemap can import it.
//
// Filters run on the Lithuanian record and the matching slugs are then taken
// from the requested locale, so /camlock-jungtys and /ru/camlock-jungtys can
// never list different products because a name was translated differently.
import { getAllProducts, getProductsByCategory, type Product } from "@/lib/products";
import { categoryLandings, FITTINGS_CATEGORY, type CategoryLanding, type PurposeLanding } from "@/lib/landing";
import { collatorFor, defaultLocale, type Locale } from "@/lib/i18n";

function pick(pred: (p: Product) => boolean, locale: Locale): Product[] {
  const slugs = new Set(getAllProducts(defaultLocale).filter(pred).map((p) => p.slug));
  const byName = new Intl.Collator(collatorFor(locale), { numeric: true }).compare;
  return getAllProducts(locale)
    .filter((p) => slugs.has(p.slug))
    .sort((a, b) => byName(a.name, b.name));
}

export function categoryLandingProducts(l: CategoryLanding, locale: Locale = defaultLocale): Product[] {
  const match = l.match;
  if (!match) return getProductsByCategory(l.categoryId, locale);
  return pick((p) => p.category === l.categoryId && match(p), locale);
}

export function purposeLandingProducts(u: PurposeLanding, locale: Locale = defaultLocale): Product[] {
  return pick((p) => p.category !== FITTINGS_CATEGORY && p.industries.includes(u.tag), locale);
}

// A use page's products grouped by hose type, in the order of the category
// landings (PVC, PUR, KLIN, metal), so long lists read as sections.
export function groupByCategory(products: Product[]): { landing: CategoryLanding; products: Product[] }[] {
  return categoryLandings
    .map((landing) => ({ landing, products: products.filter((p) => p.category === landing.categoryId) }))
    .filter((g) => g.products.length > 0);
}
