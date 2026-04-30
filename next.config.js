/** @type {import('next').NextConfig} */
const nextConfig = {
  // eslint: {
  //   ignoreDuringBuilds: true,
  // },
  outputFileTracingIncludes: {
    '/api/**/*': ['./data/**/*.json'],
     '/*': ['./node_modules/next/dist/compiled/@next/font/**/*'],
  },
  images: { unoptimized: true },
  experimental: {
    // outputFileTracingIncludes: {
    //   '/*': ['./node_modules/next/dist/compiled/@next/font/**/*'],
    // },
  },
};

module.exports = nextConfig;
