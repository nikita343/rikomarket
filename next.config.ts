import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // Pin the workspace root to this project — there are stray lockfiles in
  // parent directories that Next would otherwise infer as the root.
  turbopack: {
    root: path.join(__dirname),
  },
};

export default nextConfig;
