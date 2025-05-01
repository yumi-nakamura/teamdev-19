import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [new URL('https://placehold.jp/50x50.png')],
  },
};

export default nextConfig;
