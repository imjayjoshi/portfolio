/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  transpilePackages: [
    "@studio-freight/lenis",
  ],
};

export default nextConfig;
