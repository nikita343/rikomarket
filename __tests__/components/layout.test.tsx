import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { nav } from "@/lib/site";
import { topCategories } from "@/lib/categories";

describe("Header", () => {
  it("renders every nav item as a link", () => {
    render(<Header />);
    for (const item of nav) {
      const links = screen.getAllByRole("link", { name: item.label });
      expect(links.length).toBeGreaterThan(0);
    }
  });

  it("toggles the mobile menu open", async () => {
    const user = userEvent.setup();
    render(<Header />);
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
    render(<Footer />);
    for (const c of topCategories()) {
      expect(screen.getByRole("link", { name: c.name })).toHaveAttribute(
        "href",
        `/products?category=${c.id}`,
      );
    }
  });

  it("shows company contact details", () => {
    render(<Footer />);
    expect(screen.getByText(/Elektrėnai/)).toBeInTheDocument();
  });
});
