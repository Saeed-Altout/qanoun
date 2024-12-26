"use client";

import { useTranslations } from "next-intl";
import {
  Users,
  FileText,
  Calendar,
  TrendingUp,
  DollarSign,
  Clock,
} from "lucide-react";

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: number;
}

function StatCard({ title, value, icon, trend }: StatCardProps) {
  return (
    <div className="bg-white p-6 rounded-lg border border-gray-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-600">{title}</p>
          <p className="text-2xl font-semibold text-gray-900 mt-2">{value}</p>
        </div>
        <div className="h-12 w-12 bg-[#B4975A]/10 rounded-full flex items-center justify-center">
          {icon}
        </div>
      </div>
      {trend !== undefined && (
        <div className="mt-4 flex items-center">
          <TrendingUp
            className={`h-4 w-4 ${
              trend >= 0 ? "text-green-500" : "text-red-500"
            }`}
          />
          <span
            className={`text-sm ml-1 ${
              trend >= 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {trend}%
          </span>
          <span className="text-sm text-gray-500 ml-1">vs last month</span>
        </div>
      )}
    </div>
  );
}

export function Stats() {
  const t = useTranslations("Dashboard.stats");

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      <StatCard
        title={t("totalClients")}
        value="124"
        icon={<Users className="h-6 w-6 text-[#B4975A]" />}
        trend={12}
      />
      <StatCard
        title={t("activeConsultations")}
        value="38"
        icon={<FileText className="h-6 w-6 text-[#B4975A]" />}
        trend={-5}
      />
      <StatCard
        title={t("upcomingMeetings")}
        value="8"
        icon={<Calendar className="h-6 w-6 text-[#B4975A]" />}
      />
      <StatCard
        title={t("revenue")}
        value="$12,450"
        icon={<DollarSign className="h-6 w-6 text-[#B4975A]" />}
        trend={8}
      />
      <StatCard
        title={t("avgResponseTime")}
        value="2.4h"
        icon={<Clock className="h-6 w-6 text-[#B4975A]" />}
        trend={-15}
      />
      <StatCard
        title={t("successRate")}
        value="94%"
        icon={<TrendingUp className="h-6 w-6 text-[#B4975A]" />}
        trend={3}
      />
    </div>
  );
}
