const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ENABLE_BUNDLE_ANALYZER === 'true',
  openAnalyzer: false,
});

/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
};

module.exports = withBundleAnalyzer(nextConfig);
