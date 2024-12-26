"use client";

import { LawyerList } from "@/components/sections/lawyer-list";
import { LawyerFilters } from "@/components/sections/lawyer-filters";
import { Footer } from "@/components/footer";
import { useState } from "react";
import { useLocale } from "next-intl";

// Sample data for different languages
const lawyersData = {
  en: [
    {
      id: 1,
      name: "Ahmed Hassan",
      specialty: "corporate",
      experience: 8,
      rating: 4.8,
      reviews: 124,
      location: "Dubai",
      image: "/lawyers/lawyer1.jpg",
    },
    {
      id: 2,
      name: "Sarah Ahmed",
      specialty: "family",
      experience: 12,
      rating: 4.9,
      reviews: 89,
      location: "Abu Dhabi",
      image: "/lawyers/lawyer2.jpg",
    },
    {
      id: 3,
      name: "Mohammed Ali",
      specialty: "criminal",
      experience: 15,
      rating: 4.7,
      reviews: 156,
      location: "Sharjah",
      image: "/lawyers/lawyer3.jpg",
    },
    {
      id: 4,
      name: "Fatima Khan",
      specialty: "realEstate",
      experience: 6,
      rating: 4.6,
      reviews: 78,
      location: "Dubai",
      image: "/lawyers/lawyer4.jpg",
    },
    {
      id: 5,
      name: "Omar Hassan",
      specialty: "intellectual",
      experience: 10,
      rating: 4.9,
      reviews: 112,
      location: "Dubai",
      image: "/lawyers/lawyer5.jpg",
    },
    {
      id: 6,
      name: "Layla Ahmed",
      specialty: "labor",
      experience: 7,
      rating: 4.5,
      reviews: 67,
      location: "Abu Dhabi",
      image: "/lawyers/lawyer6.jpg",
    },
  ],
  ar: [
    {
      id: 1,
      name: "أحمد حسن",
      specialty: "corporate",
      experience: 8,
      rating: 4.8,
      reviews: 124,
      location: "دبي",
      image: "/lawyers/lawyer1.jpg",
    },
    {
      id: 2,
      name: "سارة أحمد",
      specialty: "family",
      experience: 12,
      rating: 4.9,
      reviews: 89,
      location: "أبو ظبي",
      image: "/lawyers/lawyer2.jpg",
    },
    {
      id: 3,
      name: "محمد علي",
      specialty: "criminal",
      experience: 15,
      rating: 4.7,
      reviews: 156,
      location: "الشارقة",
      image: "/lawyers/lawyer3.jpg",
    },
    {
      id: 4,
      name: "فاطمة خان",
      specialty: "realEstate",
      experience: 6,
      rating: 4.6,
      reviews: 78,
      location: "دبي",
      image: "/lawyers/lawyer4.jpg",
    },
    {
      id: 5,
      name: "عمر حسن",
      specialty: "intellectual",
      experience: 10,
      rating: 4.9,
      reviews: 112,
      location: "دبي",
      image: "/lawyers/lawyer5.jpg",
    },
    {
      id: 6,
      name: "ليلى أحمد",
      specialty: "labor",
      experience: 7,
      rating: 4.5,
      reviews: 67,
      location: "أبو ظبي",
      image: "/lawyers/lawyer6.jpg",
    },
  ],
};

export default function LawyersPage() {
  const locale = useLocale();
  const [filteredLawyers, setFilteredLawyers] = useState(
    lawyersData[locale as keyof typeof lawyersData]
  );

  const handleFilter = async (filters: {
    search: string;
    specialties: string[];
    experience: string[];
  }) => {
    // Simulate API call delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const filtered = lawyersData[locale as keyof typeof lawyersData].filter(
      (lawyer) => {
        const matchesSearch = filters.search
          ? lawyer.name.toLowerCase().includes(filters.search.toLowerCase()) ||
            lawyer.specialty
              .toLowerCase()
              .includes(filters.search.toLowerCase())
          : true;

        const matchesSpecialty = filters.specialties.length
          ? filters.specialties.includes(lawyer.specialty)
          : true;

        const matchesExperience = filters.experience.length
          ? filters.experience.some((exp) => {
              const [min, max] = exp.split("-").map(Number);
              if (exp === "10+") return lawyer.experience >= 10;
              return (
                lawyer.experience >= min && lawyer.experience <= (max || min)
              );
            })
          : true;

        return matchesSearch && matchesSpecialty && matchesExperience;
      }
    );

    setFilteredLawyers(filtered);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          <aside className="lg:col-span-1">
            <LawyerFilters onFilter={handleFilter} />
          </aside>
          <div className="lg:col-span-3">
            <LawyerList lawyers={filteredLawyers} />
          </div>
        </div>
      </div>
      <Footer />
    </main>
  );
}
