"use client";

import { usePathname, useRouter, Link } from "@/i18n/routing";
import { useLocale, useTranslations } from "next-intl";
import { Button } from "./ui/button";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

export function Navbar() {
  const t = useTranslations("Navbar");
  const pathname = usePathname();
  const router = useRouter();
  const locale = useLocale();

  const handleLanguageChange = () => {
    const nextLocale = locale === "en" ? "ar" : "en";
    router.replace(pathname, { locale: nextLocale });
  };

  const navItems = [
    { href: "/", label: t("home") },
    { href: "/lawyers", label: t("lawyers") },
    { href: "/firms", label: t("firms") },
    { href: "/blog", label: t("blog") },
  ];

  return (
    <motion.nav
      className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          <Link href="/" className="flex-shrink-0 relative group">
            <motion.h1
              className="text-2xl font-bold text-[#B4975A] transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {t("title")}
            </motion.h1>
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#B4975A] transition-all duration-200 group-hover:w-full" />
          </Link>

          <div className="hidden md:flex items-center justify-center flex-1 gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "relative group py-2 text-base transition-colors duration-200",
                  pathname === item.href
                    ? "text-[#B4975A] font-medium"
                    : "text-gray-600 hover:text-[#B4975A]"
                )}
              >
                {item.label}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#B4975A] transition-all duration-200 group-hover:w-full" />
              </Link>
            ))}
          </div>

          <motion.div
            className="flex items-center gap-4"
            whileHover={{ scale: 1.02 }}
          >
            <Button
              variant="outline"
              size="sm"
              onClick={handleLanguageChange}
              className="border-[#B4975A] text-[#B4975A] hover:bg-[#B4975A] hover:text-white transition-all duration-200"
            >
              {locale === "en" ? "العربية" : "English"}
            </Button>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
}
