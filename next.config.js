/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  pageExtensions: [
    "./portfolio/kidlit_illustrations/index.js",
    "./portfolio/morbidre_designs/index.js",
    "./portfolio/morbidre_illustrations/index.js",
  ],
};

module.exports = nextConfig;
