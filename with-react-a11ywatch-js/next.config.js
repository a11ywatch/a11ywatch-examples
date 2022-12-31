/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_A11YWATCH_API:
      process.env.NEXT_PUBLIC_A11YWATCH_API || "https://api.a11ywatch.com",
  },
};

module.exports = nextConfig;
