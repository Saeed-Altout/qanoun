"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Link } from "@/i18n/routing";
import { motion } from "framer-motion";

export function CTA() {
  const t = useTranslations("CTA");

  return (
    <section className="py-16 md:py-24 bg-[#B4975A]">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-center text-white"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6">{t("title")}</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto opacity-90">
            {t("description")}
          </p>
          <Button
            asChild
            size="lg"
            className="bg-white text-[#B4975A] hover:bg-gray-100"
          >
            <Link href="/register">{t("button")}</Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
