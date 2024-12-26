"use client";

import { useTranslations } from "next-intl";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { motion } from "framer-motion";

export function Contact() {
  const t = useTranslations("Contact");

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-[#B4975A] mb-4">
              {t("title")}
            </h2>
            <p className="text-gray-600">{t("description")}</p>
          </div>
          <motion.form
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Input placeholder={t("namePlaceholder")} />
              <Input type="email" placeholder={t("emailPlaceholder")} />
            </div>
            <Input placeholder={t("subjectPlaceholder")} />
            <Textarea placeholder={t("messagePlaceholder")} className="h-32" />
            <div className="text-center">
              <Button
                type="submit"
                size="lg"
                className="bg-[#B4975A] hover:bg-[#9A7F4A] text-white"
              >
                {t("submitButton")}
              </Button>
            </div>
          </motion.form>
        </div>
      </div>
    </section>
  );
}
