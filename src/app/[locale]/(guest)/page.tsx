import { Hero } from "@/components/sections/hero";
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("HomePage");

  return (
    <main className="min-h-screen bg-gray-50">
      <Hero />
      <section className="py-12 md:py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl md:text-3xl font-bold text-[#B4975A] text-right mb-6">
            {t("categoriesTitle")}
          </h2>
          <p className="text-gray-600 text-base md:text-lg leading-relaxed text-right max-w-4xl">
            {t("categoriesDescription")}
          </p>
        </div>
      </section>
    </main>
  );
}
