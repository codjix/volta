import { NextConfig } from "next";
const bundle = process.env.BUNDLE;

const nextConfig: NextConfig = {
  output: bundle == "1" ? "standalone" : undefined,
  images: { unoptimized: bundle == "1" },
  sassOptions: {
    implementation: "sass",
    prependData: `@import "@/styles/_mantine.scss";`,
    includePaths: ["./src/styles"],
  },
  experimental: {
    optimizePackageImports: ["@mantine/core", "@mantine/hooks"],
    serverSourceMaps: false,
  },
};

export default nextConfig;
