import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // AVIF pesa menos que WebP; los navegadores que no lo soportan reciben WebP
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
