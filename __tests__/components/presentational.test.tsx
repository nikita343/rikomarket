import { render, screen } from "@testing-library/react";
import { IndustryTile } from "@/components/IndustryTile";
import { Icon, type IconName } from "@/components/icons";
import { Button, Container, Eyebrow, SectionHead, PageHero, Logo } from "@/components/ui";
import { industries } from "@/lib/industries";

describe("IndustryTile", () => {
  it("renders the industry name + desc and links to /industries", () => {
    render(<IndustryTile industry={industries[0]} />);
    expect(screen.getByText(industries[0].name)).toBeInTheDocument();
    expect(screen.getByText(industries[0].desc)).toBeInTheDocument();
    expect(screen.getByRole("link")).toHaveAttribute("href", "/industries");
  });
});

describe("Icon", () => {
  const NAMES: IconName[] = [
    "truck", "tag", "wrench", "phone", "mail", "pin", "clock", "search", "user",
    "arrow", "chev", "check", "shield", "doc", "spool", "filter", "warehouse",
    "factory", "wood", "vent", "food", "chem", "agri", "spec", "oil", "exhaust",
  ];

  it.each(NAMES)("renders an svg for icon %s", (name) => {
    const { container } = render(<Icon name={name} />);
    const svg = container.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveAttribute("width", "22");
  });

  it("honors a custom size", () => {
    const { container } = render(<Icon name="arrow" size={40} />);
    expect(container.querySelector("svg")).toHaveAttribute("width", "40");
  });
});

describe("ui components", () => {
  it("Container renders children", () => {
    render(<Container>hello</Container>);
    expect(screen.getByText("hello")).toBeInTheDocument();
  });

  it("Button renders an internal Link when href is set", () => {
    render(<Button href="/products">Katalogas</Button>);
    const link = screen.getByRole("link", { name: /Katalogas/ });
    expect(link).toHaveAttribute("href", "/products");
  });

  it("Button renders an external anchor when external is set", () => {
    render(
      <Button href="tel:+37060000000" external icon={false}>
        Skambinti
      </Button>,
    );
    expect(screen.getByRole("link", { name: "Skambinti" })).toHaveAttribute(
      "href",
      "tel:+37060000000",
    );
  });

  it("Button renders a <button> when no href", () => {
    render(<Button icon={false}>Siųsti</Button>);
    expect(screen.getByRole("button", { name: "Siųsti" })).toBeInTheDocument();
  });

  it("Eyebrow renders its label", () => {
    render(<Eyebrow tone="yellow">UAB</Eyebrow>);
    expect(screen.getByText("UAB")).toBeInTheDocument();
  });

  it("SectionHead renders eyebrow, title and sub", () => {
    render(<SectionHead eyebrow="Produktai" title="Katalogas" sub="Aprašymas" />);
    expect(screen.getByText("Produktai")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Katalogas" })).toBeInTheDocument();
    expect(screen.getByText("Aprašymas")).toBeInTheDocument();
  });

  it("PageHero renders a breadcrumb and last crumb is not a link", () => {
    render(
      <PageHero
        breadcrumb={[{ label: "Pagrindinis", href: "/" }, { label: "Produktai" }]}
        eyebrow="P"
        title="Produktai"
      />,
    );
    expect(screen.getByRole("link", { name: "Pagrindinis" })).toHaveAttribute("href", "/");
    // "Produktai" appears as the h1 and as a non-link crumb
    expect(screen.getByRole("heading", { name: "Produktai" })).toBeInTheDocument();
  });

  it("Logo links home", () => {
    render(<Logo />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/");
  });
});
