/** @type {import('next').NextConfig} */


const terryPratchett = {
    key: 'X-Clacks-Overhead',
    value: 'GNU Terry Pratchett',
}

const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    outputStandalone: true
  },
  images: {
    domains: ['raw.githubusercontent.com'],
  },
  async headers() {
    return [
      {
        source: '/',
        headers: [
          terryPratchett
        ],
      },
      {
        source: '/:ditto',
        headers: [
          terryPratchett
        ],
      },
      {
        source: '/_next\/([^\/]+\/?)*',
        headers: [
          terryPratchett
        ],
      },
    ]
  },
}

module.exports = nextConfig
