// Server-side product catalog, sourced from data/products.csv.
//
// Add or edit products by editing the CSV — no code changes needed. Columns
// are parsed into the Product shape below; `industries` and `sizes` are
// pipe-separated ("agri|spec"), and `featured` is "1"/"0".
//
// This module reads the filesystem, so it must only be imported from server
// components / server code (never a "use client" file).

import fs from "node:fs";
import path from "node:path";
import Papa from "papaparse";

export type Product = {
  slug: string;
  name: string;
  category: string; // category id (see lib/categories.ts)
  subcategory: string;
  industries: string[];
  color: string; // visual swatch hint: navy | red | silver
  featured: boolean;
  image: string; // path under /public, e.g. /products/prod-black-spiral.jpg
  shortNote: string;
  description: string;
  // Technical specifications (any may be empty)
  dn: string;
  temp: string;
  pressure: string;
  vacuum: string;
  wallThickness: string;
  bendRadius: string;
  standardLength: string;
  material: string;
  reinforcement: string;
  colorsAvailable: string;
  certifications: string;
  origin: string;
  sizes: string[]; // available diameters, e.g. ["DN50", "DN63", ...]
};

type RawRow = Record<string, string>;

const CSV_PATH = path.join(process.cwd(), "data", "products.csv");

function parseList(value: string | undefined): string[] {
  if (!value) return [];
  return value
    .split("|")
    .map((s) => s.trim())
    .filter(Boolean);
}

function toProduct(row: RawRow): Product {
  return {
    slug: row.slug?.trim() ?? "",
    name: row.name?.trim() ?? "",
    category: row.category?.trim() ?? "",
    subcategory: row.subcategory?.trim() ?? "",
    industries: parseList(row.industries),
    color: row.color?.trim() || "navy",
    featured: row.featured?.trim() === "1",
    image: row.image?.trim() ?? "",
    shortNote: row.shortNote?.trim() ?? "",
    description: row.description?.trim() ?? "",
    dn: row.dn?.trim() ?? "",
    temp: row.temp?.trim() ?? "",
    pressure: row.pressure?.trim() ?? "",
    vacuum: row.vacuum?.trim() ?? "",
    wallThickness: row.wallThickness?.trim() ?? "",
    bendRadius: row.bendRadius?.trim() ?? "",
    standardLength: row.standardLength?.trim() ?? "",
    material: row.material?.trim() ?? "",
    reinforcement: row.reinforcement?.trim() ?? "",
    colorsAvailable: row.colorsAvailable?.trim() ?? "",
    certifications: row.certifications?.trim() ?? "",
    origin: row.origin?.trim() ?? "",
    sizes: parseList(row.sizes),
  };
}

let cache: Product[] | null = null;

export function getAllProducts(): Product[] {
  if (cache) return cache;

  const csv = fs.readFileSync(CSV_PATH, "utf8");
  const { data, errors } = Papa.parse<RawRow>(csv, {
    header: true,
    skipEmptyLines: true,
  });
  if (errors.length) {
    const first = errors[0];
    throw new Error(
      `Nepavyko perskaityti products.csv (eilutė ${first.row}): ${first.message}`,
    );
  }

  cache = data.map(toProduct).filter((p) => p.slug && p.name);
  return cache;
}

export function getProductBySlug(slug: string): Product | undefined {
  return getAllProducts().find((p) => p.slug === slug);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return getAllProducts().filter((p) => p.category === categoryId);
}

export function getFeaturedProducts(): Product[] {
  return getAllProducts().filter((p) => p.featured);
}

export function countByCategory(): Record<string, number> {
  const counts: Record<string, number> = {};
  for (const p of getAllProducts()) {
    counts[p.category] = (counts[p.category] ?? 0) + 1;
  }
  return counts;
}
