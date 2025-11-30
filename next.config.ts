import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true, // Disable Next.js image optimization
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        // Allows all Cloudinary accounts and paths
      },
    ],
  },
};

export default nextConfig;
