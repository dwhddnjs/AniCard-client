/** @type {import('next').NextConfig} */
const nextConfig = {
  // async rewrites() {
  //   return [
  //     {
  //       source: "/",
  //       destination: "/auth/login",
  //     },
  //   ];
  // },
  images: {
    domains: ["images.dog.ceo", "nng-phinf.pstatic.net"],
  },
};

module.exports = nextConfig;
