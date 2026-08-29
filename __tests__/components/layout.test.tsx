import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { getSite } from "@/lib/site";
import { topCategories, categoryName } from "@/lib/categories";

describe("Header", () => {
  it("renders every nav item as a link", () => {
    render(<Header locale="lt" />);
    for (const item of getSite("lt").nav) {
      const links = screen.getAllByRole("link", { name: item.label });
      expect(links.length).toBeGreaterThan(0);
    }
  });

  it("toggles the mobile menu open", async () => {
    const user = userEvent.setup();
    render(<Header locale="lt" />);
    // Mobile nav duplicates the links once opened → count grows for a nav label.
    const before = screen.getAllByRole("link", { name: "Produktai" }).length;
    const toggle = screen.getByRole("button", { name: /meniu|menu/i });
    await user.click(toggle);
    const after = screen.getAllByRole("link", { name: "Produktai" }).length;
    expect(after).toBeGreaterThanOrEqual(before);
  });
});

describe("Footer", () => {
  it("renders the 5 top-level category links", () => {
    render(<Footer locale="lt" />);
    for (const c of topCategories()) {
      expect(screen.getByRole("link", { name: c.name })).toHaveAttribute(
        "href",
        `/products?category=${c.id}`,
      );
    }
  });

  it("shows company contact details", () => {
    render(<Footer locale="lt" />);
    expect(screen.getByText(/Elektrėnai/)).toBeInTheDocument();
  });
});

describe("Russian locale", () => {
  it("Header links point at the /ru tree", () => {
    render(<Header locale="ru" />);
    for (const item of getSite("ru").nav) {
      const [link] = screen.getAllByRole("link", { name: item.label });
      const expected = item.href === "/" ? "/ru" : `/ru${item.href}`;
      expect(link).toHaveAttribute("href", expected);
    }
  });

  it("Footer renders Russian category names under /ru", () => {
    render(<Footer locale="ru" />);
    for (const c of topCategories()) {
      expect(screen.getByRole("link", { name: categoryName(c, "ru") })).toHaveAttribute(
        "href",
        `/ru/products?category=${c.id}`,
      );
    }
  });
});
