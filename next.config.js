/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/shop",
      },
    ];
  },
};

module.exports = nextConfig;
