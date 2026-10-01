import { render, screen, fireEvent } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { IndustryGallery } from "@/components/IndustryGallery";
import { IndustriesPage } from "@/components/pages/Industries";
import { industries } from "@/lib/industries";

const labels = { enlarge: "Enlarge", close: "Close", prev: "Previous", next: "Next" };
const photos = [
  { src: "/a.jpg", caption: "Alpha" },
  { src: "/b.jpg", caption: "Beta" },
  { src: "/c.jpg", caption: "Gamma" },
];

describe("IndustryGallery", () => {
  it("renders one enlarge button per photo, with its caption, and no links", () => {
    render(<IndustryGallery photos={photos} labels={labels} />);
    expect(screen.getAllByRole("button", { name: /^Enlarge:/ })).toHaveLength(3);
    expect(screen.getByText("Beta")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("opens a photo enlarged, steps through, and closes", async () => {
    const user = userEvent.setup();
    render(<IndustryGallery photos={photos} labels={labels} />);

    await user.click(screen.getByRole("button", { name: "Enlarge: Beta" }));
    const dialog = screen.getByRole("dialog", { name: "Beta" });
    expect(dialog).toHaveTextContent("2 / 3");

    await user.click(screen.getByRole("button", { name: "Next" }));
    expect(screen.getByRole("dialog", { name: "Gamma" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Next" })); // wraps around
    expect(screen.getByRole("dialog", { name: "Alpha" })).toBeInTheDocument();
    await user.click(screen.getByRole("button", { name: "Previous" }));
    expect(screen.getByRole("dialog", { name: "Gamma" })).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Close" }));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });

  it("supports the keyboard (arrows, Escape) and closes on a backdrop click", async () => {
    const user = userEvent.setup();
    render(<IndustryGallery photos={photos} labels={labels} />);
    await user.click(screen.getByRole("button", { name: "Enlarge: Alpha" }));

    fireEvent.keyDown(window, { key: "ArrowRight" });
    expect(screen.getByRole("dialog", { name: "Beta" })).toBeInTheDocument();
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    fireEvent.keyDown(window, { key: "ArrowLeft" });
    expect(screen.getByRole("dialog", { name: "Gamma" })).toBeInTheDocument();
    fireEvent.keyDown(window, { key: "Escape" });
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Enlarge: Alpha" }));
    await user.click(screen.getByRole("dialog"));
    expect(screen.queryByRole("dialog")).not.toBeInTheDocument();
  });
});

describe("IndustriesPage", () => {
  it.each(["lt", "ru"] as const)("shows every industry with its photos and no product links (%s)", (locale) => {
    render(<IndustriesPage locale={locale} />);
    for (const ind of industries) {
      expect(document.getElementById(ind.id)).not.toBeNull();
      expect(ind.photos.length).toBeGreaterThan(0);
    }
    const total = industries.reduce((n, i) => n + i.photos.length, 0);
    expect(screen.getAllByRole("button", { name: /:/ })).toHaveLength(total);
    // Only breadcrumb links remain — no "view hoses" links into the catalog.
    for (const a of screen.queryAllByRole("link")) {
      expect(a.getAttribute("href")).not.toMatch(/products/);
    }
    expect(screen.queryByText(/Высокая температура|Aukšta temperatūra/)).not.toBeInTheDocument();
  });
});
