import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CategoryTabs, type TabCat } from "@/components/CategoryTabs";
import type { ProductCardData } from "@/components/ProductCard";

const cats: TabCat[] = [
  { id: "rukava-typu-klyn", name: "KLIN tipo žarnos", count: 2 },
  { id: "metalorukavy", name: "Metalinės žarnos", count: 1 },
];

const mk = (slug: string, name: string, category: string): ProductCardData => ({
  slug,
  name,
  category,
  shortNote: "",
  image: "/x.jpg",
  dn: "",
  temp: "",
  pressure: "",
});

const productsByCat: Record<string, ProductCardData[]> = {
  "rukava-typu-klyn": [
    mk("klin-a", "KLIN A", "rukava-typu-klyn"),
    mk("klin-b", "KLIN B", "rukava-typu-klyn"),
  ],
  metalorukavy: [mk("met-a", "Metal A", "metalorukavy")],
};

describe("CategoryTabs", () => {
  it("shows the first tab's products by default", () => {
    render(<CategoryTabs cats={cats} productsByCat={productsByCat} />);
    expect(screen.getByText("KLIN A")).toBeInTheDocument();
    expect(screen.getByText("KLIN B")).toBeInTheDocument();
    expect(screen.queryByText("Metal A")).not.toBeInTheDocument();
  });

  it("switches products when another tab is clicked", async () => {
    const user = userEvent.setup();
    render(<CategoryTabs cats={cats} productsByCat={productsByCat} />);
    await user.click(screen.getByRole("button", { name: /Metalinės žarnos/ }));
    expect(screen.getByText("Metal A")).toBeInTheDocument();
    expect(screen.queryByText("KLIN A")).not.toBeInTheDocument();
  });

  it("renders per-tab counts", () => {
    render(<CategoryTabs cats={cats} productsByCat={productsByCat} />);
    const klinTab = screen.getByRole("button", { name: /KLIN tipo žarnos/ });
    expect(within(klinTab).getByText("2")).toBeInTheDocument();
  });

  it("the CTA links to the active category's product listing", async () => {
    const user = userEvent.setup();
    render(<CategoryTabs cats={cats} productsByCat={productsByCat} />);
    expect(
      screen.getByRole("link", { name: /Visi „KLIN tipo žarnos“ produktai/ }),
    ).toHaveAttribute("href", "/products?category=rukava-typu-klyn");
    await user.click(screen.getByRole("button", { name: /Metalinės žarnos/ }));
    expect(
      screen.getByRole("link", { name: /Visi „Metalinės žarnos“ produktai/ }),
    ).toHaveAttribute("href", "/products?category=metalorukavy");
  });
});
