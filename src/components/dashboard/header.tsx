"use client";

import { useTranslations, useLocale } from "next-intl";
import { Bell, Search, User } from "lucide-react";
import { Logo } from "@/components/ui/logo";

export function Header() {
  const t = useTranslations("Dashboard.header");
  const locale = useLocale();
  const isRTL = locale === "ar";

  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <Logo className="h-8 w-auto" />
          <div className="relative">
            <Search
              className={`absolute ${
                isRTL ? "right-3" : "left-3"
              } top-1/2 -translate-y-1/2 text-gray-400 h-5 w-5`}
            />
            <input
              type="text"
              placeholder={t("search")}
              className={`${
                isRTL ? "pr-10" : "pl-10"
              } py-2 border border-gray-200 rounded-lg focus:outline-none focus:border-[#B4975A] w-64`}
              dir={isRTL ? "rtl" : "ltr"}
            />
          </div>
        </div>
        <div className="flex items-center gap-4">
          <button className="p-2 hover:bg-gray-100 rounded-lg">
            <Bell className="h-5 w-5 text-gray-600" />
          </button>
          <div className="flex items-center gap-2">
            <div className={`text-${isRTL ? "left" : "right"}`}>
              <p className="text-sm font-medium text-gray-700">Hassan Ahmad</p>
              <p className="text-xs text-gray-500">{t("admin")}</p>
            </div>
            <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center">
              <User className="h-6 w-6 text-gray-600" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
