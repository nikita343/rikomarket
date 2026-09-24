import "@testing-library/jest-dom";
import React from "react";

// next/image renders a real <img> in tests (avoids the optimizer / loader config).
jest.mock("next/image", () => ({
  __esModule: true,
  default: ({ src, alt, fill, priority, ...rest }: Record<string, unknown>) =>
    // eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text
    React.createElement("img", {
      src: typeof src === "string" ? src : "",
      alt: (alt as string) ?? "",
      ...rest,
    }),
}));

// Navigation mock with a tiny in-memory URL, so components that keep state in
// the query string (ProductsBrowser's ?category=) behave like in the browser:
// router.push() changes the URL and useSearchParams() re-renders with it.
// Reset to "/" before every test.
type NavStore = { url: string; set: (u: string) => void; reset: () => void };
jest.mock("next/navigation", () => {
  // eslint-disable-next-line @typescript-eslint/no-require-imports
  const R = require("react") as typeof React;
  const listeners = new Set<() => void>();
  const store: NavStore = {
    url: "/",
    set(u) {
      store.url = u;
      listeners.forEach((l) => l());
    },
    reset() {
      store.url = "/";
    },
  };
  (globalThis as unknown as { __nav: NavStore }).__nav = store;
  const subscribe = (l: () => void) => {
    listeners.add(l);
    return () => listeners.delete(l);
  };
  const useUrl = () => R.useSyncExternalStore(subscribe, () => store.url);
  return {
    useSearchParams: () => new URLSearchParams(useUrl().split("?")[1] ?? ""),
    useRouter: () => ({
      push: (u: string) => store.set(u),
      replace: (u: string) => store.set(u),
      prefetch: jest.fn(),
    }),
    usePathname: () => useUrl().split("?")[0],
    notFound: () => {
      throw new Error("NEXT_NOT_FOUND");
    },
  };
});

beforeEach(() => {
  (globalThis as unknown as { __nav?: NavStore }).__nav?.reset();
});
