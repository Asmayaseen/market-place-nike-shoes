import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io', // your image host domain
        port: '',
        pathname: '/**', // you can adjust the path to match the URL pattern
      },
    ],
  },
};

export default nextConfig;
