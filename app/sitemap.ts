import type { MetadataRoute } from "next";
// Imported as JSON (not via lib/products.ts, which reads the filesystem) so
// this route stays a plain static file.
import products from "@/data/products.json";
import { localeHref, locales } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/seo";
import { CATEGORY_SLUGS } from "@/lib/category-paths";
import { cities, cityPath } from "@/lib/landing";

// Every page in both languages, each entry listing its translations so search
// engines pair /products/x with /ru/products/x.
const STATIC_PATHS = ["/", "/products", "/industries", "/chemical-resistance", "/units", "/contacts", "/privacy"];

export default function sitemap(): MetadataRoute.Sitemap {
  const productPaths = (products as { slug: string }[]).map((p) => `/products/${p.slug}`);
  const categoryPaths = Object.values(CATEGORY_SLUGS).map((s) => `/products/category/${s}`);
  const cityPaths = cities.map((c) => cityPath(c.slug));
  const priority = (path: string) =>
    path === "/" ? 1
    : path === "/products" || path.startsWith("/products/category/") ? 0.9
    : path.startsWith("/technines-zarnos/") ? 0.8
    : path.startsWith("/products/") ? 0.7
    : 0.6;
  const entries: MetadataRoute.Sitemap = [];
  for (const path of [...STATIC_PATHS, ...categoryPaths, ...cityPaths, ...productPaths]) {
    const languages = Object.fromEntries(locales.map((l) => [l, absoluteUrl(localeHref(l, path))]));
    for (const l of locales) {
      entries.push({
        url: absoluteUrl(localeHref(l, path)),
        changeFrequency: path.startsWith("/products/") ? "monthly" : "weekly",
        priority: priority(path),
        alternates: { languages },
      });
    }
  }
  return entries;
}
