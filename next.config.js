/** @type {import('next').NextConfig} */
const nextConfig = {
async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: 'https://lost-and-found-api-bq99.onrender.com/:path*', // Ensure this is the correct destination
    },
  ];
},
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
