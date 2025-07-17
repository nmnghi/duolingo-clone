/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['d2pur3iezf4d1j.cloudfront.net'],
  },
  async headers() {
    return [
      {
        source: "/api/(.*)",
        headers: [
          { key: "Access-Control-Allow-Origin", value: "*" },
          {
            key: "Access-Control-Allow-Methods",
            value: "GET, POST, DELETE, OPTIONS",
          },
          {
            key: "Access-Control-Allow-Headers",
            value: "Content-Type, Authorization",
          },
          {
            key: "Content-Range",
            value: "bytes : 0-9/*",
          },
        ],
      },
    ];
  },
};

const withNextIntl = require('next-intl/plugin')();
module.exports = withNextIntl(nextConfig);