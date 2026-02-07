import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    localPatterns: [
      {
        pathname: "**",
      },
    ],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "be-sporton.agunacourse.com",
        pathname: "/uploads/**",
      },
    ],
  },
};

export default nextConfig;
