"use client";

import { usePathname, useRouter, Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "./ui/button";

export function Navbar() {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const handleLanguageChange = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  return (
    <nav className="border-b bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-[#B4975A]">
                {t("title")}
              </h1>
            </Link>
            <div className="hidden md:flex items-center gap-6">
              <Link href="/" className="text-gray-600 hover:text-[#B4975A]">
                {t("home")}
              </Link>
              <Link
                href="/lawyers"
                className="text-gray-600 hover:text-[#B4975A]"
              >
                {t("lawyers")}
              </Link>
              <Link
                href="/firms"
                className="text-gray-600 hover:text-[#B4975A]"
              >
                {t("firms")}
              </Link>
              <Link href="/blog" className="text-gray-600 hover:text-[#B4975A]">
                {t("blog")}
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={handleLanguageChange}
              className="border-[#B4975A] text-[#B4975A] hover:bg-[#B4975A] hover:text-white"
            >
              {locale === "en" ? "العربية" : "English"}
            </Button>
          </div>
        </div>
      </div>
    </nav>
  );
}
