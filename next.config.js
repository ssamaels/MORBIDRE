/** @type {import('next').NextConfig} */
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
};

module.exports = nextConfig;
