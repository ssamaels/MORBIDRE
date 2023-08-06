/** @type {import('next').NextConfig} */
const { i18n } = require("./next-i18next.config");
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
  env: {
    HOST_ROOT: process.env.HOST_ROOT,
  },
  i18n,
  reactStrictMode: true,
};

module.exports = nextConfig;
