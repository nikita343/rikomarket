// Category id → landing-page slug. Kept tiny and dependency-free so client
// components (CategoryTabs) can link to landing pages without bundling the
// landing copy in lib/landing.ts.
export const CATEGORY_SLUGS: Record<string, string> = {
  "rukava-z-polihlorvinilu": "pvc-zarnos",
  "rukava-z-poliuretanu": "pur-zarnos",
  "rukava-typu-klyn": "klin-zarnos",
  metalorukavy: "metalines-zarnos",
  "elementi-ziednannya": "sujungimo-elementai",
};

// URL of a category's landing page, or the filtered catalogue for categories
// without one (subcategories).
export function categoryPath(categoryId: string): string {
  const slug = CATEGORY_SLUGS[categoryId];
  return slug ? `/products/category/${slug}` : `/products?category=${categoryId}`;
}
