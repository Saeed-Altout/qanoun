"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Star, MapPin, Briefcase, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { useState } from "react";

interface Lawyer {
  id: number;
  name: string;
  specialty: string;
  experience: number;
  rating: number;
  reviews: number;
  location: string;
  image: string;
}

interface LawyerListProps {
  lawyers: Lawyer[];
}

export function LawyerList({ lawyers }: LawyerListProps) {
  const t = useTranslations("Lawyers");
  const tSpecialties = useTranslations("Lawyers.filters.specialties");
  const [imageError, setImageError] = useState<{ [key: number]: boolean }>({});

  const handleImageError = (lawyerId: number) => {
    setImageError((prev) => ({ ...prev, [lawyerId]: true }));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold text-[#B4975A]">
          {t("title")} <span className="text-gray-600">({lawyers.length})</span>
        </h2>
        <select className="border rounded-lg p-2 text-right">
          <option value="rating">{t("sortBy.rating")}</option>
          <option value="experience">{t("sortBy.experience")}</option>
          <option value="reviews">{t("sortBy.reviews")}</option>
        </select>
      </div>

      {lawyers.length === 0 ? (
        <div className="text-center py-8 text-gray-500">{t("noResults")}</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {lawyers.map((lawyer, index) => (
            <motion.div
              key={lawyer.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <div className="bg-white rounded-lg p-6 border border-gray-100">
                <div className="flex gap-4">
                  <div className="relative w-24 h-24 flex-shrink-0">
                    {imageError[lawyer.id] ? (
                      <div className="w-full h-full rounded-lg bg-gray-100 flex items-center justify-center">
                        <User className="w-12 h-12 text-gray-400" />
                      </div>
                    ) : (
                      <Image
                        src={lawyer.image}
                        alt={lawyer.name}
                        fill
                        className="object-cover rounded-lg"
                        onError={() => handleImageError(lawyer.id)}
                      />
                    )}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-[#B4975A] mb-2">
                      {lawyer.name}
                    </h3>
                    <p className="text-gray-600 mb-2">
                      {tSpecialties(lawyer.specialty)}
                    </p>
                    <div className="flex items-center gap-4 text-sm text-gray-500">
                      <div className="flex items-center gap-1">
                        <Briefcase size={16} />
                        {lawyer.experience} {t("years")}
                      </div>
                      <div className="flex items-center gap-1">
                        <MapPin size={16} />
                        {lawyer.location}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="w-5 h-5 text-[#B4975A] fill-[#B4975A]" />
                        <span className="font-semibold ml-1">
                          {lawyer.rating}
                        </span>
                      </div>
                      <span className="text-sm text-gray-500">
                        ({lawyer.reviews} {t("reviews")})
                      </span>
                    </div>
                    <Button
                      variant="outline"
                      className="border-[#B4975A] text-[#B4975A] hover:bg-[#B4975A] hover:text-white"
                    >
                      {t("viewProfile")}
                    </Button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
}
