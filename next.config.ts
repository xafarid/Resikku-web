import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  devIndicators: false,
  output: "export",
  trailingSlash: false,
  typescript: {
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
  generateEtags: false,
};

export default nextConfig;
