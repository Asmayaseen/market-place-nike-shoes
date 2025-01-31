/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
      remotePatterns: [
        {
          protocol: "https", // Specify protocol (http/https)
          hostname: "cdn.sanity.io", // Sanity's CDN hostname
          pathname: "/images/**", // Allow all images from Sanity
        },
      ],
    },
  };
  
  export default nextConfig;
  