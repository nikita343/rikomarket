import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project — there are stray lockfiles in
  // parent directories that Next would otherwise infer as the root.
  turbopack: {
    root: path.join(/*turbopackIgnore: true*/ __dirname),
  },
  // The site has two root layouts (app/(lt) and app/ru), so unmatched URLs
  // need app/global-not-found.tsx to render a proper 404 page.
  experimental: {
    globalNotFound: true,
  },
};

export default nextConfig;
