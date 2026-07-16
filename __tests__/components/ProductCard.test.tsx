import { render, screen } from "@testing-library/react";
import { ProductCard, type ProductCardData } from "@/components/ProductCard";

const base: ProductCardData = {
  slug: "klyn-k1-d-teflon-steklovolokno",
  name: "KLIN K1/D. Teflonas + stiklo pluoštas",
  category: "rukava-typu-klyn",
  shortNote: "Aukštatemperatūrinė žarna",
  image: "/products/orig/900.jpg",
  dn: "50–1150 mm",
  temp: "nuo −70 °C iki +260 °C",
  pressure: "",
};

describe("ProductCard", () => {
  it("links to the product detail page", () => {
    render(<ProductCard product={base} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/products/klyn-k1-d-teflon-steklovolokno");
  });

  it("renders the product name, category name and short note", () => {
    render(<ProductCard product={base} />);
    expect(screen.getByText(base.name)).toBeInTheDocument();
    expect(screen.getByText("KLIN tipo žarnos")).toBeInTheDocument(); // resolved category
    expect(screen.getByText(base.shortNote)).toBeInTheDocument();
  });

  it("shows the DN and temperature spec values", () => {
    render(<ProductCard product={base} />);
    expect(screen.getByText("50–1150 mm")).toBeInTheDocument();
    expect(screen.getByText("nuo −70 °C iki +260 °C")).toBeInTheDocument();
  });

  it("falls back to a dash for empty spec values", () => {
    render(<ProductCard product={base} />);
    // pressure is empty → renders "—"
    expect(screen.getAllByText("—").length).toBeGreaterThan(0);
  });

  it("renders the image with the product name as alt text", () => {
    render(<ProductCard product={base} />);
    expect(screen.getByAltText(base.name)).toHaveAttribute("src", base.image);
  });
});
