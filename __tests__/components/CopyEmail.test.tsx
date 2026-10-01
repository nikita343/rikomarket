import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { CopyEmail } from "@/components/CopyEmail";
import { ContactsPage } from "@/components/pages/Contacts";
import { company } from "@/lib/site";

// fireEvent (not userEvent): userEvent installs its own clipboard stub.
describe("CopyEmail", () => {
  it("copies the address, confirms it, then resets the label", async () => {
    const writeText = jest.fn().mockResolvedValue(undefined);
    Object.defineProperty(navigator, "clipboard", { value: { writeText }, configurable: true });

    render(<CopyEmail email="a@b.lt" label="Copy" copiedLabel="Copied" />);
    fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    expect(writeText).toHaveBeenCalledWith("a@b.lt");
    expect(await screen.findByText("✓ Copied")).toBeInTheDocument();
    await waitFor(() => expect(screen.getByRole("button")).toHaveTextContent(/^Copy$/), {
      timeout: 3000,
    });
  });

  it("falls back to execCommand when the Clipboard API is unavailable", async () => {
    Object.defineProperty(navigator, "clipboard", {
      value: { writeText: jest.fn().mockRejectedValue(new Error("denied")) },
      configurable: true,
    });
    const exec = jest.fn().mockReturnValue(true);
    Object.defineProperty(document, "execCommand", { value: exec, configurable: true });

    render(<CopyEmail email="a@b.lt" label="Copy" copiedLabel="Copied" />);
    fireEvent.click(screen.getByRole("button", { name: "Copy" }));
    expect(await screen.findByText("✓ Copied")).toBeInTheDocument();
    expect(exec).toHaveBeenCalledWith("copy");
  });
});

describe("ContactsPage", () => {
  it.each([
    ["lt", "Kopijuoti"],
    ["ru", "Скопировать"],
  ] as const)("shows the e-mail with a copy button (%s)", (locale, label) => {
    render(<ContactsPage locale={locale} />);
    expect(screen.getAllByText(company.email).length).toBeGreaterThan(0);
    expect(screen.getByRole("button", { name: label })).toBeInTheDocument();
  });
});
