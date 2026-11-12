import { languageAlternates, metaDescription, pageMetadata, SITE_URL } from "@/lib/seo";
import sitemap from "@/app/sitemap";
import { getAllProducts } from "@/lib/products";
import { allCategoryLandings, cities, DELIVERY_PATH, purposeLandings } from "@/lib/landing";

describe("lib/seo", () => {
  it("gives every page its own canonical URL and hreflang pair", () => {
    const lt = pageMetadata({ locale: "lt", path: "/products/x", title: "X", description: "d" });
    const ru = pageMetadata({ locale: "ru", path: "/products/x", title: "X", description: "d" });
    expect(lt.alternates?.canonical).toBe("/products/x");
    expect(ru.alternates?.canonical).toBe("/ru/products/x");
    expect(languageAlternates("/products/x")).toEqual({
      lt: "/products/x",
      ru: "/ru/products/x",
      "x-default": "/products/x",
    });
  });

  it("uses the locale share image unless a page brings its own", () => {
    const page = pageMetadata({ locale: "ru", path: "/units", title: "U", description: "d" });
    expect(JSON.stringify(page.openGraph)).toContain("/og/og-ru.jpg");
    const product = pageMetadata({
      locale: "lt", path: "/products/x", title: "X", description: "d",
      image: { url: "/products/orig/x.jpg", alt: "X" },
    });
    expect(JSON.stringify(product.openGraph)).toContain("/products/orig/x.jpg");
  });

  it("keeps descriptions snippet-sized and cuts on a word", () => {
    const long = "žodis ".repeat(80);
    const out = metaDescription(long);
    expect(out.length).toBeLessThanOrEqual(158);
    expect(out.endsWith("…")).toBe(true);
    expect(metaDescription("  short\n text ")).toBe("short text");
  });

  it("lists every page in both languages in the sitemap", () => {
    const entries = sitemap();
    // 8 static pages (incl. /pristatymas), 5 categories + 3 fittings sub-pages,
    // 6 "hoses by use" pages, the city pages and every product.
    const pages =
      8 + allCategoryLandings.length + purposeLandings.length + cities.length + getAllProducts("lt").length;
    expect(entries).toHaveLength(pages * 2);
    const urls = entries.map((e) => e.url);
    expect(urls).toContain(`${SITE_URL}${DELIVERY_PATH}`);
    expect(urls).toContain(`${SITE_URL}/ru/zarnos/ventiliacijai`);
    expect(urls).toContain(`${SITE_URL}/products/category/camlock-jungtys`);
    expect(entries.every((e) => e.url.startsWith(SITE_URL))).toBe(true);
    expect(new Set(entries.map((e) => e.url)).size).toBe(entries.length);
  });
});
