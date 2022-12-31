/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_PUBLIC_A11YWATCH_API:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3280"
        : "https://api.a11ywatch.com",
  },
};

module.exports = nextConfig;
