import type { NextConfig } from "next";

// GitHub Pages serves the site from /<repo>, so CI passes the prefix in.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  output: "export",
  basePath,
  images: { unoptimized: true },
};

export default nextConfig;
