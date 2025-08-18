/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: false, // 🔥 disable lightningcss, fallback to PostCSS
  },
};

module.exports = nextConfig;
