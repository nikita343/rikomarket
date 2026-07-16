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

// Default navigation mocks. Individual tests can override useSearchParams.
jest.mock("next/navigation", () => ({
  useSearchParams: () => new URLSearchParams(),
  useRouter: () => ({ push: jest.fn(), replace: jest.fn(), prefetch: jest.fn() }),
  usePathname: () => "/",
  notFound: () => {
    throw new Error("NEXT_NOT_FOUND");
  },
}));
