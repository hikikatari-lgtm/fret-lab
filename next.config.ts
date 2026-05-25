import path from "node:path";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  turbopack: {
    // モノレポではないが /Users/music に別の package-lock.json があるため明示
    root: path.resolve(__dirname),
  },
};

export default nextConfig;
