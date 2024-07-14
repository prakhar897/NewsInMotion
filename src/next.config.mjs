/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/news-in-motion/get-snapshots',
        destination: 'https://master-node-backend.onrender.com/news-in-motion/get-snapshots',
      },
    ];
  },
};

export default nextConfig;