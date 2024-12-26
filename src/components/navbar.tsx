"use client";

import { useTranslations } from "next-intl";
import { Logo } from "@/components/ui/logo";
import { Button } from "@/components/ui/button";
import { usePathname } from "next/navigation";
import { Link } from "@/navigation";

export function Navbar() {
  const t = useTranslations("Navbar");
  const pathname = usePathname();

  // Check if user is logged in (you'll need to implement your auth logic)
  const isLoggedIn = true; // Replace with actual auth check

  return (
    <nav className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link href="/" className="flex items-center">
              <Logo className="h-8 w-auto" />
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link
                href="/"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  pathname === "/"
                    ? "text-[#B4975A] border-b-2 border-[#B4975A]"
                    : "text-gray-500 hover:text-[#B4975A]"
                }`}
              >
                {t("home")}
              </Link>
              <Link
                href="/lawyers"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  pathname === "/lawyers"
                    ? "text-[#B4975A] border-b-2 border-[#B4975A]"
                    : "text-gray-500 hover:text-[#B4975A]"
                }`}
              >
                {t("lawyers")}
              </Link>
              <Link
                href="/firms"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  pathname === "/firms"
                    ? "text-[#B4975A] border-b-2 border-[#B4975A]"
                    : "text-gray-500 hover:text-[#B4975A]"
                }`}
              >
                {t("firms")}
              </Link>
              <Link
                href="/blog"
                className={`inline-flex items-center px-1 pt-1 text-sm font-medium ${
                  pathname === "/blog"
                    ? "text-[#B4975A] border-b-2 border-[#B4975A]"
                    : "text-gray-500 hover:text-[#B4975A]"
                }`}
              >
                {t("blog")}
              </Link>
            </div>
          </div>
          <div className="flex items-center">
            {isLoggedIn ? (
              <Link href="/dashboard">
                <Button
                  variant="outline"
                  className="border-[#B4975A] text-[#B4975A] hover:bg-[#B4975A] hover:text-white"
                >
                  {t("dashboard")}
                </Button>
              </Link>
            ) : (
              <Button
                variant="outline"
                className="border-[#B4975A] text-[#B4975A] hover:bg-[#B4975A] hover:text-white"
              >
                {t("login")}
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
