import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: "export",  // ← Static export (no server needed)
  distDir: "out",    // Output directory
  trailingSlash: false,
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
  // Disable ISR, SSG, and API routes
  generateEtags: false,
};

export default nextConfig;
