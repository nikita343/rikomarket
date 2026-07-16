import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import {
  ProductsBrowser,
  type BrowserCat,
  type BrowserProduct,
} from "@/components/ProductsBrowser";
import { getAllProducts, countByCategory } from "@/lib/products";
import { categories as allCategories } from "@/lib/categories";

// Build the exact props the /products page hands to the browser, from real data.
function realProps() {
  const counts = countByCategory();
  const categories: BrowserCat[] = allCategories.map((c) => ({
    id: c.id,
    name: c.name,
    parent: c.parent,
    count: counts[c.id] ?? 0,
  }));
  const products: BrowserProduct[] = getAllProducts().map((p) => ({
    slug: p.slug,
    name: p.name,
    category: p.category,
    categories: p.categories,
    shortNote: p.shortNote,
    image: p.image,
    dn: p.dn,
    temp: p.temp,
    pressure: p.pressure,
  }));
  return { products, categories };
}

describe("ProductsBrowser — category-first flow (real catalog)", () => {
  it("shows 5 category cards by default (no product list yet)", () => {
    const { products, categories } = realProps();
    render(<ProductsBrowser products={products} categories={categories} />);

    for (const name of [
      "PVC žarnos",
      "PUR žarnos",
      "KLIN tipo žarnos",
      "Metalinės žarnos",
      "Sujungimo elementai",
    ]) {
      expect(screen.getByRole("button", { name: new RegExp(name) })).toBeInTheDocument();
    }
    // The filter sidebar only appears after a category is chosen.
    expect(screen.queryByText("Vidinis diametras")).not.toBeInTheDocument();
  });

  it("drills into KLIN, paginates (17 > page size) and returns to the cards", async () => {
    const user = userEvent.setup();
    const { products, categories } = realProps();
    render(<ProductsBrowser products={products} categories={categories} />);

    await user.click(screen.getByRole("button", { name: /KLIN tipo žarnos/ }));

    // Now in the browse view: sidebar filters + a results header.
    expect(screen.getByText("Vidinis diametras")).toBeInTheDocument();
    expect(screen.getByText(/kategorija „KLIN tipo žarnos/)).toBeInTheDocument();
    // 17 KLIN products > PAGE_SIZE (12) → a second page button exists.
    expect(screen.getByRole("button", { name: "2" })).toBeInTheDocument();

    // Back to the category grid.
    await user.click(screen.getByRole("button", { name: /Visos kategorijos/ }));
    expect(screen.queryByText("Vidinis diametras")).not.toBeInTheDocument();
    expect(screen.getByRole("button", { name: /Metalinės žarnos/ })).toBeInTheDocument();
  });
});

describe("ProductsBrowser — filtering & sorting (deterministic dataset)", () => {
  const categories: BrowserCat[] = [
    { id: "cat-a", name: "Cat A", parent: null, count: 3 },
  ];
  const mk = (slug: string, dn: string, temp: string): BrowserProduct => ({
    slug,
    name: slug.toUpperCase(),
    category: "cat-a",
    categories: ["cat-a"],
    shortNote: "",
    image: "",
    dn,
    temp,
    pressure: "",
  });
  const products = [
    mk("small", "20 mm", "+90 °C"),
    mk("medium", "80 mm", "+260 °C"),
    mk("large", "600 mm", "+650 °C"),
  ];

  async function openCategory() {
    const user = userEvent.setup();
    render(<ProductsBrowser products={products} categories={categories} />);
    await user.click(screen.getByRole("button", { name: /Cat A/ }));
    return user;
  }

  it("lists all products of the category", async () => {
    await openCategory();
    expect(screen.getByText("SMALL")).toBeInTheDocument();
    expect(screen.getByText("MEDIUM")).toBeInTheDocument();
    expect(screen.getByText("LARGE")).toBeInTheDocument();
  });

  it("narrows by the diameter bucket filter", async () => {
    const user = await openCategory();
    await user.click(screen.getByLabelText("10–50 mm"));
    expect(screen.getByText("SMALL")).toBeInTheDocument();
    expect(screen.queryByText("MEDIUM")).not.toBeInTheDocument();
    expect(screen.queryByText("LARGE")).not.toBeInTheDocument();
    expect(screen.getByText(/Rasta/)).toHaveTextContent("Rasta 1");
  });

  it("narrows by the working-temperature bucket filter", async () => {
    const user = await openCategory();
    await user.click(screen.getByLabelText("Iki +90 °C"));
    expect(screen.getByText("SMALL")).toBeInTheDocument();
    expect(screen.queryByText("LARGE")).not.toBeInTheDocument();
  });

  it("shows an empty state when filters exclude everything", async () => {
    const user = await openCategory();
    // A diameter bucket no product falls into together with temp — pick 500+ then Iki +90
    await user.click(screen.getByLabelText("500+ mm")); // only LARGE
    await user.click(screen.getByLabelText("Iki +90 °C")); // LARGE is +650 → excluded
    expect(screen.getByText("Pagal pasirinktus filtrus produktų nerasta.")).toBeInTheDocument();
  });

  it("sorts by diameter ascending", async () => {
    const user = await openCategory();
    await user.selectOptions(screen.getByRole("combobox"), "dn");
    const names = screen.getAllByText(/^(SMALL|MEDIUM|LARGE)$/).map((n) => n.textContent);
    expect(names).toEqual(["SMALL", "MEDIUM", "LARGE"]);
  });
});
