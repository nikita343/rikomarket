import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { UnitConverter } from "@/components/UnitConverter";

describe("UnitConverter", () => {
  it("renders with a default pressure conversion (1,5 bar → kPa = 150)", () => {
    render(<UnitConverter />);
    // default value 1,5 bar → kPa
    expect(screen.getByDisplayValue("1,5")).toBeInTheDocument();
    expect(screen.getByText("150")).toBeInTheDocument();
  });

  it("recalculates when the input value changes", async () => {
    const user = userEvent.setup();
    render(<UnitConverter />);
    const input = screen.getByDisplayValue("1,5");
    await user.clear(input);
    await user.type(input, "2"); // 2 bar → kPa = 200
    expect(screen.getByText("200")).toBeInTheDocument();
  });

  it("shows a dash for non-numeric input", async () => {
    const user = userEvent.setup();
    render(<UnitConverter />);
    const input = screen.getByDisplayValue("1,5");
    await user.clear(input);
    await user.type(input, "abc");
    expect(screen.getByText("—")).toBeInTheDocument();
  });

  it("switches quantity to Temperature and converts °C → °F", async () => {
    const user = userEvent.setup();
    render(<UnitConverter />);
    await user.click(screen.getByRole("button", { name: "Temperatūra" }));
    const input = screen.getByDisplayValue("1,5");
    await user.clear(input);
    await user.type(input, "100"); // 100°C → 212°F
    expect(screen.getByText("212")).toBeInTheDocument();
  });

  it("switches to Length and converts m → cm", async () => {
    const user = userEvent.setup();
    render(<UnitConverter />);
    await user.click(screen.getByRole("button", { name: "Ilgis" }));
    // default length units: from=mm, to=cm; 1,5 mm → cm = 0,15
    expect(screen.getByText("0,15")).toBeInTheDocument();
  });
});
