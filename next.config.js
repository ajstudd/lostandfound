/** @type {import('next').NextConfig} */
const nextConfig = {
async rewrites() {
  return [
    {
      source: '/api/:path*',
      destination: 'http://localhost:8080/:path*', // Ensure this is the correct destination
    },
  ];
},
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: { unoptimized: true },
};

module.exports = nextConfig;
