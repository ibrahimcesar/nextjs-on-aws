/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  swcMinify: false,
  output: 'standalone',
  images: {
    domains: ['raw.githubusercontent.com'],
  }
}

module.exports = nextConfig