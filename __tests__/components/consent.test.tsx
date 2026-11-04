import { act, render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { CookieBanner, CookieSettingsLink } from "@/components/CookieBanner";
import { CONSENT_KEY, CONSENT_VERSION, readConsent } from "@/lib/consent";
import { Analytics } from "@/components/Analytics";

// Render next/script as a plain marker so we can see whether GA would load.
jest.mock("next/script", () => ({
  __esModule: true,
  default: (p: { src?: string; id?: string }) => <i data-testid="script" data-src={p.src ?? p.id} />,
}));

const loadAnalytics = () => {
  process.env.NEXT_PUBLIC_GA_ID = "G-TEST123";
  return Analytics;
};

beforeEach(() => {
  localStorage.clear();
  document.cookie = "_ga=GA1.1.1; path=/";
});

describe("cookie consent", () => {
  it("shows the banner to a first-time visitor with equal accept / reject", () => {
    render(<CookieBanner locale="lt" />);
    expect(screen.getByRole("dialog")).toBeInTheDocument();
    const accept = screen.getByRole("button", { name: "Sutinku" });
    const reject = screen.getByRole("button", { name: "Atmesti" });
    expect(accept.className).toBe(reject.className); // same weight, no dark pattern
    expect(screen.getByRole("link", { name: /Privatumo ir slapukų politika/ })).toHaveAttribute("href", "/privacy");
  });

  it("does not load Google Analytics before consent, loads it after accept", async () => {
    loadAnalytics();
    render(
      <>
        <CookieBanner locale="lt" />
        <Analytics />
      </>,
    );
    expect(screen.queryByTestId("script")).toBeNull();
    await userEvent.setup().click(screen.getByRole("button", { name: "Sutinku" }));
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(readConsent()?.analytics).toBe(true);
    expect(screen.getAllByTestId("script")[0]).toHaveAttribute(
      "data-src",
      "https://www.googletagmanager.com/gtag/js?id=G-TEST123",
    );
  });

  it("rejecting stores the choice, keeps GA off and clears _ga cookies", async () => {
    loadAnalytics();
    render(
      <>
        <CookieBanner locale="ru" />
        <Analytics />
      </>,
    );
    await userEvent.setup().click(screen.getByRole("button", { name: "Отклонить" }));
    expect(readConsent()?.analytics).toBe(false);
    expect(screen.queryByTestId("script")).toBeNull();
    expect(document.cookie).not.toMatch(/_ga=/);
  });

  it("settings start with analytics unticked, and the footer link reopens them", async () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ v: CONSENT_VERSION, analytics: true, ts: Date.now() }));
    render(
      <>
        <CookieBanner locale="lt" />
        <CookieSettingsLink label="Slapukų nustatymai" />
      </>,
    );
    expect(screen.queryByRole("dialog")).toBeNull(); // already decided
    const user = userEvent.setup();
    await user.click(screen.getByRole("button", { name: "Slapukų nustatymai" }));
    const box = screen.getByRole("checkbox", { name: /Analitika/ });
    expect(box).toBeChecked(); // reflects the stored choice
    await user.click(box);
    await user.click(screen.getByRole("button", { name: "Išsaugoti pasirinkimą" }));
    expect(readConsent()?.analytics).toBe(false);
  });

  it("asks again when the stored choice is stale", () => {
    localStorage.setItem(CONSENT_KEY, JSON.stringify({ v: CONSENT_VERSION, analytics: true, ts: Date.now() - 400 * 864e5 }));
    act(() => {
      render(<CookieBanner locale="lt" />);
    });
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });

  it("fresh visitors get analytics unticked in settings", async () => {
    render(<CookieBanner locale="lt" />);
    await userEvent.setup().click(screen.getByRole("button", { name: "Nustatymai" }));
    expect(screen.getByRole("checkbox", { name: /Analitika/ })).not.toBeChecked();
  });
});
