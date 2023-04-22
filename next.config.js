/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    OL_BASE_URL: process.env.OL_BASE_URL,
    COVERS_BASE_URL: process.env.COVERS_BASE_URL,
  },
  images: {
    domains: ['covers.openlibrary.org'],
  },
}

module.exports = nextConfig
