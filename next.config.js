/** @type {import('next').NextConfig} */
const nextConfig = {
   eslint: {
    ignoreDuringBuilds: true
  },
  output: 'export',
  images: {
    remotePatterns: [
      {
        hostname: 'github.com',
        protocol: 'https',
      },
      {
        hostname: 'arkimals-game.com',
        protocol: 'https',
      },
      {
        hostname: 'parivartanx.com',
        protocol: 'https',
      },
      {
        hostname: 'raffl.pro',
        protocol: 'https',
      }
    ]

  }
}

module.exports = nextConfig
