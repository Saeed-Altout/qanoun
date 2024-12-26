"use client";

import { useTranslations } from "next-intl";
import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { ClientList } from "@/components/dashboard/client-list";
import { AddClientModal } from "@/components/dashboard/add-client-modal";
import { useState } from "react";
import { Client } from "@/types/client";

export default function ClientsPage() {
  const t = useTranslations("Dashboard.clients");
  const [clients, setClients] = useState<Client[]>([]);

  const handleAddClient = (newClient: Client) => {
    setClients((prevClients) => [...prevClients, newClient]);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="flex">
        <Sidebar />
        <main className="flex-1 p-8">
          <div className="mb-8 flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-semibold text-gray-800">
                {t("title")}
              </h1>
              <p className="text-gray-600 mt-1">{t("subtitle")}</p>
            </div>
            <AddClientModal onAddClient={handleAddClient} />
          </div>
          <ClientList clients={clients} setClients={setClients} />
        </main>
      </div>
    </div>
  );
}
