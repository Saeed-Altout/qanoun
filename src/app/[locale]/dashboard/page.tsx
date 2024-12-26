"use client";

import { useTranslations } from "next-intl";
import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { Calendar } from "@/components/dashboard/calendar";

export default function DashboardPage() {
  const t = useTranslations("Dashboard");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="mb-6 flex justify-between items-center">
            <h1 className="text-2xl font-semibold text-gray-800">
              {t("calendar.title")} 2024
            </h1>
            <button className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors">
              {t("calendar.addTask")}
            </button>
          </div>
          <Calendar />
        </main>
      </div>
    </div>
  );
}
