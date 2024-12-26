"use client";

import { useTranslations, useLocale } from "next-intl";
import {
  MoreHorizontal,
  Download,
  Share2,
  Trash2,
  Search,
  FolderX,
  File,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useState } from "react";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useDocuments } from "@/contexts/document-context";
import { Progress } from "@/components/ui/progress";
import { ShareDocumentDialog } from "@/components/dashboard/share-document-dialog";

export function DocumentList() {
  const t = useTranslations("Dashboard.documents");
  const locale = useLocale();
  const isRTL = locale === "ar";
  const { documents, deleteDocument } = useDocuments();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<
    "all" | "contract" | "report" | "legal" | "other"
  >("all");

  const filteredDocuments = documents.filter((doc) => {
    const matchesSearch = doc.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || doc.type === typeFilter;

    return matchesSearch && matchesType;
  });

  const getTypeColor = (type: string) => {
    switch (type) {
      case "contract":
        return "bg-blue-100 text-blue-800";
      case "report":
        return "bg-green-100 text-green-800";
      case "legal":
        return "bg-purple-100 text-purple-800";
      case "other":
        return "bg-gray-100 text-gray-800";
    }
  };

  // Calculate storage usage
  const totalStorageUsed = documents.reduce((acc, doc) => {
    const sizeInMB = parseFloat(doc.size.replace(" MB", ""));
    return acc + sizeInMB;
  }, 0);

  const storagePercentage = (totalStorageUsed / 100) * 100;

  const handleDelete = (id: number) => {
    deleteDocument(id);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white p-4 rounded-lg border border-gray-200">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>{t("storageUsed")}</span>
          <span>{totalStorageUsed.toFixed(1)} MB / 100 MB</span>
        </div>
        <Progress value={storagePercentage} className="h-2" />
      </div>

      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
        <div className="relative flex-1 max-w-sm">
          <Search
            className={`absolute ${
              isRTL ? "right-3" : "left-3"
            } top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400`}
          />
          <Input
            placeholder={t("filters.search")}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className={`${isRTL ? "pr-10" : "pl-10"}`}
          />
        </div>
        <div className="flex items-center gap-4">
          <Select
            value={typeFilter}
            onValueChange={(
              value: "all" | "other" | "contract" | "report" | "legal"
            ) => setTypeFilter(value)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder={t("filters.type")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("filters.allTypes")}</SelectItem>
              <SelectItem value="contract">{t("types.contract")}</SelectItem>
              <SelectItem value="report">{t("types.report")}</SelectItem>
              <SelectItem value="legal">{t("types.legal")}</SelectItem>
              <SelectItem value="other">{t("types.other")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="bg-white rounded-lg border border-gray-200">
        <div className="overflow-x-auto">
          {filteredDocuments.length > 0 ? (
            <table className="w-full" dir={isRTL ? "rtl" : "ltr"}>
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-4 text-sm font-medium text-gray-500">
                    {t("table.name")}
                  </th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-500">
                    {t("table.type")}
                  </th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-500">
                    {t("table.size")}
                  </th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-500">
                    {t("table.lastModified")}
                  </th>
                  <th className="px-6 py-4 text-sm font-medium text-gray-500">
                    {t("table.actions")}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                {filteredDocuments.map((doc) => (
                  <tr key={doc.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="h-10 w-10 rounded-lg bg-[#B4975A]/10 flex items-center justify-center">
                          <File className="h-5 w-5 text-[#B4975A]" />
                        </div>
                        <div className="font-medium text-gray-900">
                          {doc.name}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <Badge className={getTypeColor(doc.type)}>
                        {t(`types.${doc.type}`)}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {doc.size}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-500">
                      {doc.lastModified}
                    </td>
                    <td className="px-6 py-4">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreHorizontal className="h-5 w-5" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align={isRTL ? "start" : "end"}>
                          <DropdownMenuItem>
                            <Download className="h-4 w-4 mr-2" />
                            {t("actions.download")}
                          </DropdownMenuItem>
                          <DropdownMenuItem asChild>
                            <ShareDocumentDialog
                              documentName={doc.name}
                              trigger={
                                <button className="w-full flex items-center px-2 py-1.5">
                                  <Share2 className="h-4 w-4 mr-2" />
                                  {t("actions.share")}
                                </button>
                              }
                            />
                          </DropdownMenuItem>
                          <DropdownMenuSeparator />
                          <DropdownMenuItem
                            className="text-red-600"
                            onClick={() => handleDelete(doc.id)}
                          >
                            <Trash2 className="h-4 w-4 mr-2" />
                            {t("actions.delete")}
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="px-6 py-12 text-center">
              <div className="flex flex-col items-center justify-center gap-3">
                <div className="h-12 w-12 rounded-full bg-gray-100 flex items-center justify-center">
                  <FolderX className="h-6 w-6 text-gray-400" />
                </div>
                <div className="text-gray-500">
                  <p className="text-lg font-medium">
                    {searchQuery || typeFilter !== "all"
                      ? t("noSearchResults")
                      : t("noDocuments")}
                  </p>
                  <p className="text-sm">
                    {searchQuery || typeFilter !== "all"
                      ? t("tryAdjustingFilters")
                      : t("uploadYourFirstDocument")}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
