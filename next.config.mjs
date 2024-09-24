/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'fadl4n.s3.amazonaws.com',
      },
      {
        protocol: 'https',
        hostname: 'fadl4n.s3.us-east-1.amazonaws.com',
      },
    ],
  },
};

export default nextConfig;
