"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { LawScaleAnimation } from "@/components/law-scale-animation";

export function Hero() {
  const t = useTranslations("HomePage");

  return (
    <section className="bg-white py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-12">
          <div className="flex-1 space-y-6 text-right">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-[#B4975A]">
              {t("title")}
            </h1>
            <h2 className="text-xl md:text-2xl text-[#B4975A]">
              {t("subtitle")}
            </h2>
            <p className="text-gray-600 text-base md:text-lg max-w-2xl leading-relaxed">
              {t("description")}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button
                asChild
                className="bg-[#B4975A] hover:bg-[#9A7F4A] text-white w-full sm:w-auto"
              >
                <Link href="/register">{t("lawyerRegister")}</Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-[#B4975A] text-[#B4975A] hover:bg-[#B4975A] hover:text-white w-full sm:w-auto"
              >
                <Link href="/lawyers">{t("browseButton")}</Link>
              </Button>
            </div>
          </div>
          <div className="flex-1 w-full md:w-auto">
            <LawScaleAnimation />
          </div>
        </div>
      </div>
    </section>
  );
}
