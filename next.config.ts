// // import type { NextConfig } from "next";
// //DO NOT TOUCH THIS FILE LOLLLLLL
const isDev = process.env.NODE_ENV !== 'production';

const nextConfig = {
  basePath: isDev ? undefined : '/Sip-OR-Spin',
  assetPrefix: isDev ? undefined : '/Sip-OR-Spin',
  output: "export",
};

export default nextConfig;
