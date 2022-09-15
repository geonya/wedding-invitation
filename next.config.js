/** @type {import('next').NextConfig} */
const nextConfig = {
  swcMinify: true,
  env: {
    BASE_URL: process.env.BASE_URL,
  },
}

module.exports = nextConfig
