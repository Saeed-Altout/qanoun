"use client";

import { useTranslations, useLocale } from "next-intl";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Search, Loader2 } from "lucide-react";
import { useState } from "react";

const specialties = [
  "corporate",
  "criminal",
  "family",
  "realEstate",
  "intellectual",
  "labor",
];

const experience = ["0-2", "3-5", "6-10", "10+"];

interface FilterProps {
  onFilter: (filters: {
    search: string;
    specialties: string[];
    experience: string[];
  }) => void;
}

export function LawyerFilters({ onFilter }: FilterProps) {
  const t = useTranslations("Lawyers.filters");
  const locale = useLocale();
  const isRTL = locale === "ar";

  const [isLoading, setIsLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSpecialties, setSelectedSpecialties] = useState<string[]>([]);
  const [selectedExperience, setSelectedExperience] = useState<string[]>([]);

  const handleSpecialtyChange = (specialty: string, checked: boolean) => {
    setSelectedSpecialties((prev) =>
      checked ? [...prev, specialty] : prev.filter((s) => s !== specialty)
    );
  };

  const handleExperienceChange = (years: string, checked: boolean) => {
    setSelectedExperience((prev) =>
      checked ? [...prev, years] : prev.filter((e) => e !== years)
    );
  };

  const handleApplyFilters = async () => {
    setIsLoading(true);
    try {
      await onFilter({
        search: searchTerm,
        specialties: selectedSpecialties,
        experience: selectedExperience,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg border border-gray-100 sticky top-4">
      <div className="space-y-8">
        {/* Search */}
        <div>
          <h3 className="text-lg font-semibold text-[#B4975A] mb-4 text-right">
            {t("search")}
          </h3>
          <div className="relative">
            <Input
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder={t("searchPlaceholder")}
              className={`${
                isRTL ? "pr-10 text-right" : "pl-10 text-left"
              } border-gray-200 focus:border-[#B4975A] focus:ring-[#B4975A]`}
              dir={isRTL ? "rtl" : "ltr"}
            />
            <Search
              className={`absolute ${
                isRTL ? "right-3" : "left-3"
              } top-2.5 h-5 w-5 text-gray-400`}
            />
          </div>
        </div>

        {/* Specialties */}
        <div>
          <h3 className="text-lg font-semibold text-[#B4975A] mb-4 text-right">
            {t("specialties.title")}
          </h3>
          <div className="space-y-3">
            {specialties.map((specialty) => (
              <div
                key={specialty}
                className="flex items-center justify-end hover:bg-gray-50 p-2 rounded-md transition-colors"
              >
                <Label
                  htmlFor={specialty}
                  className={`cursor-pointer text-gray-700 hover:text-[#B4975A] transition-colors select-none ${
                    isRTL ? "ml-3" : "mr-3"
                  }`}
                >
                  {t(`specialties.${specialty}`)}
                </Label>
                <Checkbox
                  id={specialty}
                  checked={selectedSpecialties.includes(specialty)}
                  onCheckedChange={(checked) =>
                    handleSpecialtyChange(specialty, checked as boolean)
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Experience */}
        <div>
          <h3 className="text-lg font-semibold text-[#B4975A] mb-4 text-right">
            {t("experience.title")}
          </h3>
          <div className="space-y-3">
            {experience.map((years) => (
              <div
                key={years}
                className="flex items-center justify-end hover:bg-gray-50 p-2 rounded-md transition-colors"
              >
                <Label
                  htmlFor={years}
                  className={`cursor-pointer text-gray-700 hover:text-[#B4975A] transition-colors select-none ${
                    isRTL ? "ml-3" : "mr-3"
                  }`}
                >
                  {t(`experience.${years}`)}
                </Label>
                <Checkbox
                  id={years}
                  checked={selectedExperience.includes(years)}
                  onCheckedChange={(checked) =>
                    handleExperienceChange(years, checked as boolean)
                  }
                />
              </div>
            ))}
          </div>
        </div>

        {/* Apply Filters */}
        <Button
          onClick={handleApplyFilters}
          disabled={isLoading}
          className="w-full bg-[#B4975A] hover:bg-[#9A7F4A] transition-colors disabled:opacity-50"
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              {t("loading")}
            </>
          ) : (
            t("apply")
          )}
        </Button>
      </div>
    </div>
  );
}
