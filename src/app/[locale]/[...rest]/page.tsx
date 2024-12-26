import { routing } from "@/i18n/routing";
import { notFound } from "next/navigation";

export default function CatchAllPage() {
  notFound();
}

// Generate static params for catch-all routes
export function generateStaticParams() {
  return routing.locales.map((locale) => ({
    locale,
    rest: ["404"],
  }));
}
