import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

// This plugin is required for next-intl to work properly
const withNextIntl = require('next-intl/plugin')('./i18n.ts');

export default withNextIntl(nextConfig);
