/** @type {import('next').NextConfig} */

const withImages = require('next-images');
module.exports = withImages();

module.exports = {
  // --------------------------------------------------------------------------------
  // 📌  Next.js configuration for image sources
  // --------------------------------------------------------------------------------
  images: {
    domains: [
      'wunder-strapi-staging.s3.eu-west-2.amazonaws.com',
      'wunderalpha-strapi-staging.s3.eu-west-2.amazonaws.com',
      'wunder-strapi-uat.s3.eu-west-2.amazonaws.com',
    ],
  },
  // --------------------------------------------------------------------------------
  // 📌  To test headers use: curl -v http://localhost:8000/.well-known/apple-app-site-association
  // --------------------------------------------------------------------------------
  experimental: {
    async headers() {
      return [
        {
          source: '/.well-known/apple-app-site-association',
          headers: [{ key: 'content-type', value: 'application/json' }],
        },
      ];
    },
  },

  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
};
