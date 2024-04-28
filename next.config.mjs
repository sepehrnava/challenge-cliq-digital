/* eslint-disable import/no-extraneous-dependencies, import/extensions */
import withBundleAnalyzer from "@next/bundle-analyzer";

const bundleAnalyzer = withBundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    // domains: ["developer.accuweather.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "developer.accuweather.com",
        pathname: "/**",
      },
    ],
  },
};

/** @type {import('next').NextConfig} */
export default bundleAnalyzer(nextConfig);
