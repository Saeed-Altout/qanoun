"use client";

import { useTranslations } from "next-intl";
import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { ClientDetails } from "@/components/dashboard/client-details";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "@/navigation";

export default function ClientDetailsPage() {
  const t = useTranslations("Dashboard.clientDetails");

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="mb-8">
            <div className="flex items-center gap-4 mb-6">
              <Link href="/dashboard/clients">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="h-5 w-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-semibold text-gray-800">
                {t("title")}
              </h1>
            </div>
            <ClientDetails />
          </div>
        </main>
      </div>
    </div>
  );
}
