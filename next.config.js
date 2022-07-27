/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  publicRuntimeConfig: {
    url: process.env.DIRECTUS_URL,
  },
  serverRuntimeConfig: {
    email: process.env.DIRECTUS_EMAIL,
    password: process.env.DIRECTUS_PASSWORD,
  },
  images: {
    domains: ['fam.directus.app'],
  },
};

module.exports = nextConfig;
