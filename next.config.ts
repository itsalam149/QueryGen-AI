import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true, // Prevents build failures due to lint errors
  },
};

export default nextConfig;
