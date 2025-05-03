/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  webpack: (config) => {
    // Disable Webpack file caching to prevent ENOSPC errors
    config.cache = false;
    return config;
  },
};

module.exports = nextConfig;
