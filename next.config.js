/** @type {import('next').NextConfig} */
const nextConfig = {
   eslint: {
    ignoreDuringBuilds: true
  },
  images: {
    remotePatterns: [
      {
        hostname: 'github.com',
        protocol: 'https',
      }
    ]

  }
}

module.exports = nextConfig
