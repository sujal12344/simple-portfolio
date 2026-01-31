/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        hostname: "github.com",
        protocol: "https",
      },
      {
        hostname: "arkimals-game.com",
        protocol: "https",
      },
      {
        hostname: "parivartanx.com",
        protocol: "https",
      },
      {
        hostname: "raffl.pro",
        protocol: "https",
      },
    ],
    qualities: [75, 90, 100],
    formats: ["image/avif", "image/webp"],
  },
};

module.exports = nextConfig;
