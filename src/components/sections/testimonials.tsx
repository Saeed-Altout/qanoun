"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Star } from "lucide-react";

export function Testimonials() {
  const t = useTranslations("Testimonials");

  return (
    <section className="py-16 md:py-24 bg-white">
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
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[1, 2, 3].map((index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-lg p-8 h-[280px] flex flex-col justify-between border border-gray-100 transition-all duration-300">
                <div>
                  <div className="flex gap-1 mb-6">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        size={20}
                        className="fill-[#B4975A] text-[#B4975A]"
                      />
                    ))}
                  </div>
                  <p className="text-gray-600 text-base leading-relaxed mb-6">
                    {t(`testimonial${index}`)}
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-[#B4975A] text-lg mb-1">
                    {t(`name${index}`)}
                  </h4>
                  <p className="text-gray-500 text-sm">
                    {t(`position${index}`)}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
