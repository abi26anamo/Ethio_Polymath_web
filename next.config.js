/** @type {import('next').NextConfig} */

const dotenv = require('dotenv');
const nextConfig = {}

dotenv.config();

module.exports = {
  ...nextConfig,
  env: {
    GOOGLE_SHEETS: process.env.GOOGLE_SHEETS,
    APP_URL: process.env.APP_URL,
    MOBILE_URL: process.env.MOBILE_URL,
  },

  images: {
    domains: ['anyatestdata.s3.amazonaws.com'],
  },
};

