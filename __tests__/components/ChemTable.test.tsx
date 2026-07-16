import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ChemTable } from "@/components/ChemTable";
import { chemData } from "@/lib/chem-data";

describe("ChemTable", () => {
  it("renders all chemical rows initially with the total count", () => {
    render(<ChemTable />);
    expect(screen.getByText(`${chemData.length} / ${chemData.length}`)).toBeInTheDocument();
  });

  it("filters rows by the search query", async () => {
    const user = userEvent.setup();
    render(<ChemTable />);
    const input = screen.getByPlaceholderText("Ieškoti chemikalo…");
    await user.type(input, "aceton");
    // count shrinks and matching rows remain
    expect(screen.getByText(/Acetonas/)).toBeInTheDocument();
    const countText = screen.getByText(new RegExp(`/ ${chemData.length}$`));
    const shown = parseInt(countText.textContent!.split("/")[0].trim(), 10);
    expect(shown).toBeGreaterThan(0);
    expect(shown).toBeLessThan(chemData.length);
  });

  it("shows an empty-state message when nothing matches", async () => {
    const user = userEvent.setup();
    render(<ChemTable />);
    await user.type(screen.getByPlaceholderText("Ieškoti chemikalo…"), "zzzzzznope");
    expect(screen.getByText("Chemikalų nerasta.")).toBeInTheDocument();
  });
});
