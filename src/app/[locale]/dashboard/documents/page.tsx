"use client";

import { useTranslations } from "next-intl";
import { Header } from "@/components/dashboard/header";
import { Sidebar } from "@/components/dashboard/sidebar";
import { DocumentList } from "@/components/dashboard/document-list";
import { UploadDocumentModal } from "@/components/dashboard/upload-document-modal";
import { DocumentProvider } from "@/contexts/document-context";

export default function DocumentsPage() {
  const t = useTranslations("Dashboard.documents");

  return (
    <DocumentProvider>
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
              <UploadDocumentModal />
            </div>
            <DocumentList />
          </main>
        </div>
      </div>
    </DocumentProvider>
  );
}
