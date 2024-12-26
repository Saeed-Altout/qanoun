"use client";

import { useTranslations } from "next-intl";
import { Link } from "@/navigation";
import {
  Home,
  Users,
  Calendar,
  FileText,
  MessageSquare,
  Settings,
  HelpCircle,
  LogOut,
} from "lucide-react";

export function Sidebar() {
  const t = useTranslations("Dashboard.sidebar");

  const menuItems = [
    { icon: Home, label: "dashboard", href: "/dashboard" },
    { icon: Users, label: "clients", href: "/dashboard/clients" },
    { icon: Calendar, label: "calendar", href: "/dashboard/calendar" },
    { icon: FileText, label: "documents", href: "/dashboard/documents" },
    { icon: MessageSquare, label: "messages", href: "/dashboard/messages" },
    { icon: Settings, label: "settings", href: "/dashboard/settings" },
    { icon: HelpCircle, label: "help", href: "/dashboard/help" },
  ];

  return (
    <aside className="w-64 bg-white border-r border-gray-200 min-h-screen p-4">
      <nav className="space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.label}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors"
          >
            <item.icon className="h-5 w-5" />
            <span>{t(item.label)}</span>
          </Link>
        ))}
        <button className="flex items-center gap-3 px-4 py-3 text-red-600 hover:bg-red-50 rounded-lg transition-colors w-full mt-8">
          <LogOut className="h-5 w-5" />
          <span>{t("logout")}</span>
        </button>
      </nav>
    </aside>
  );
}
