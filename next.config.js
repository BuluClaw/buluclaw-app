/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "standalone",

  experimental: {
    turbo: {},       
    serverActions: {
      allowedOrigins: ["*"],
    },
  },
};

module.exports = nextConfig;