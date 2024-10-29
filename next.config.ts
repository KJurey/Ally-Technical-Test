import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["flagsapi.com", "cdn.weatherapi.com"],
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/dashboard/weather",
        permanent: false,
      },
    ];
  },
  /* config options here */
};

export default nextConfig;
