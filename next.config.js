/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/nextjs-deployment-example',
  assetPrefix: '/nextjs-deployment-example/',
  images: {
    unoptimized: true,
  },
}

module.exports = nextConfig
