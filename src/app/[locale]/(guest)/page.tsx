import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { LawScaleAnimation } from "@/components/law-scale-animation";

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <div className="container mx-auto px-4">
      <div className="flex flex-col md:flex-row items-center justify-between gap-8 py-12">
        <div className="flex-1 space-y-6 text-right">
          <h1 className="text-4xl font-bold text-[#B4975A]">{t("title")}</h1>
          <p className="text-2xl text-[#B4975A]">{t("subtitle")}</p>
          <p className="text-gray-600 max-w-xl">{t("description")}</p>
          <div className="flex gap-4 justify-end">
            <Button
              asChild
              variant="outline"
              className="border-[#B4975A] text-[#B4975A] hover:bg-[#B4975A] hover:text-white"
            >
              <Link href="/register">{t("lawyerRegister")}</Link>
            </Button>
            <Button
              asChild
              className="bg-[#B4975A] hover:bg-[#9A7F4A] text-white"
            >
              <Link href="/login">{t("clientRegister")}</Link>
            </Button>
          </div>
        </div>
        <div className="flex-1">
          <LawScaleAnimation />
        </div>
      </div>
    </div>
  );
}
