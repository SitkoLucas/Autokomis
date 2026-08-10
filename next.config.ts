import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // Unikamy auto-generowanego AGENTS.md z myślnikami typograficznymi
  agentRules: false,
};

export default nextConfig;
