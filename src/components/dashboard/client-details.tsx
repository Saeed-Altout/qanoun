"use client";

import { useTranslations } from "next-intl";
import { Mail, Phone, Calendar, MapPin, AlertCircle } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Client } from "@/types/client";

// This would come from your API in a real application
const mockClientDetails: Client & {
  address: string;
  joinedDate: string;
  caseHistory: Array<{
    id: number;
    title: string;
    date: string;
    type: string;
    status: string;
  }>;
  notes: Array<{
    id: number;
    content: string;
    date: string;
  }>;
} = {
  id: 1,
  name: "Ahmed Hassan",
  email: "ahmed.hassan@example.com",
  phone: "+971 50 123 4567",
  status: "active",
  lastContact: "2024-03-15",
  cases: 2,
  address: "123 Sheikh Zayed Road, Dubai, UAE",
  joinedDate: "2023-12-01",
  caseHistory: [
    {
      id: 1,
      title: "Contract Review",
      date: "2024-03-15",
      type: "Legal Review",
      status: "In Progress",
    },
    {
      id: 2,
      title: "Property Dispute",
      date: "2024-02-20",
      type: "Litigation",
      status: "Completed",
    },
  ],
  notes: [
    {
      id: 1,
      content: "Client requested documentation for property case",
      date: "2024-03-15",
    },
    {
      id: 2,
      content: "Follow up meeting scheduled for contract review",
      date: "2024-03-10",
    },
  ],
};

export function ClientDetails() {
  const t = useTranslations("Dashboard.clientDetails");

  // In a real application, you would fetch the client details based on the ID
  const client = mockClientDetails;

  const getStatusColor = (status: Client["status"]) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "completed":
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full bg-[#B4975A]/10 flex items-center justify-center text-[#B4975A] text-xl font-medium">
              {client.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                {client.name}
              </h2>
              <Badge className={getStatusColor(client.status)}>
                {t(`status.${client.status}`)}
              </Badge>
            </div>
          </div>
        </div>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex items-center gap-3">
            <Mail className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">{t("email")}</p>
              <p className="text-gray-900">{client.email}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Phone className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">{t("phone")}</p>
              <p className="text-gray-900">{client.phone}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <MapPin className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">{t("address")}</p>
              <p className="text-gray-900">{client.address}</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Calendar className="h-5 w-5 text-gray-400" />
            <div>
              <p className="text-sm text-gray-500">{t("joinedDate")}</p>
              <p className="text-gray-900">{client.joinedDate}</p>
            </div>
          </div>
        </div>
      </div>

      <Tabs defaultValue="cases" className="w-full">
        <TabsList>
          <TabsTrigger value="cases">{t("tabs.cases")}</TabsTrigger>
          <TabsTrigger value="notes">{t("tabs.notes")}</TabsTrigger>
        </TabsList>
        <TabsContent value="cases" className="mt-6">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">
                {t("caseHistory")}
              </h3>
            </div>
            <div className="border-t border-gray-200">
              {client.caseHistory.map((caseItem) => (
                <div
                  key={caseItem.id}
                  className="p-4 border-b border-gray-200 last:border-b-0"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <h4 className="font-medium text-gray-900">
                        {caseItem.title}
                      </h4>
                      <p className="text-sm text-gray-500">{caseItem.type}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-sm text-gray-500">{caseItem.date}</p>
                      <Badge variant="outline" className="mt-1">
                        {caseItem.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
        <TabsContent value="notes" className="mt-6">
          <div className="bg-white rounded-lg border border-gray-200">
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900">
                {t("clientNotes")}
              </h3>
            </div>
            <div className="border-t border-gray-200">
              {client.notes.map((note) => (
                <div
                  key={note.id}
                  className="p-4 border-b border-gray-200 last:border-b-0"
                >
                  <div className="flex items-start gap-3">
                    <AlertCircle className="h-5 w-5 text-gray-400 mt-0.5" />
                    <div>
                      <p className="text-gray-900">{note.content}</p>
                      <p className="text-sm text-gray-500 mt-1">{note.date}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}
