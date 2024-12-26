import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin();

/** @type {import('next').NextConfig} */
const nextConfig: NextConfig = {
  /* config options here */
  // i18n: {
  //   locales: ["en", "ar"],
  //   defaultLocale: "en",
  // },
};

export default withNextIntl(nextConfig);
