/** @type {import('next').NextConfig} */

const nextConfig = {
  reactStrictMode: true,
  output: 'standalone',
  images: {
    domains: ['raw.githubusercontent.com'],
  }
}

module.exports = nextConfig
