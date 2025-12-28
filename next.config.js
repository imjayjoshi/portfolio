/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: [],
  },
  transpilePackages: [
    "three",
    "@react-three/fiber",
    "gsap",
    "@studio-freight/lenis",
  ],
};

export default nextConfig;
