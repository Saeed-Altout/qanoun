"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Scale, Users, Briefcase, Shield } from "lucide-react";

const services = [
  {
    icon: Scale,
    titleKey: "legalConsultation",
    descriptionKey: "legalConsultationDesc",
    delay: 0,
  },
  {
    icon: Users,
    titleKey: "expertLawyers",
    descriptionKey: "expertLawyersDesc",
    delay: 0.1,
  },
  {
    icon: Briefcase,
    titleKey: "caseManagement",
    descriptionKey: "caseManagementDesc",
    delay: 0.2,
  },
  {
    icon: Shield,
    titleKey: "clientProtection",
    descriptionKey: "clientProtectionDesc",
    delay: 0.3,
  },
];

export function Services() {
  const t = useTranslations("Services");

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <h2 className="text-3xl md:text-4xl font-bold text-[#B4975A] mb-4">
              {t("title")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("description")}
            </p>
          </motion.div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service) => (
            <motion.div
              key={service.titleKey}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: service.delay }}
              viewport={{ once: true }}
              className="group"
            >
              <div className="bg-white rounded-lg h-[250px] p-8 flex flex-col items-center justify-center text-center transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(180,151,90,0.15)] cursor-pointer">
                <div className="mb-6">
                  <service.icon className="w-16 h-16 text-[#B4975A]" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-[#B4975A]">
                  {t(service.titleKey)}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  {t(service.descriptionKey)}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
