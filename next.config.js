/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: "/",
        destination: "/auth/login",
      },
    ];
  },
  images: {
    domains: ["images.dog.ceo"],
  },
};

module.exports = nextConfig;
