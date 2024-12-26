"use client";

import { useState, useEffect, useCallback } from "react";
import { useTranslations } from "next-intl";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Upload, Check, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { useDocuments } from "@/contexts/document-context";

interface FormData {
  file: File | null;
  name: string;
  type: "contract" | "report" | "legal" | "other";
}

const MAX_FILE_SIZE = 5 * 1024 * 1024; // 5MB in bytes
const STORAGE_LIMIT = 100 * 1024 * 1024; // 100MB in bytes

export function UploadDocumentModal() {
  const t = useTranslations("Dashboard.documents");
  const { toast } = useToast();
  const { documents, addDocument } = useDocuments();
  const [open, setOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [formData, setFormData] = useState<FormData>({
    file: null,
    name: "",
    type: "contract",
  });

  const resetForm = useCallback(() => {
    setFormData({ file: null, name: "", type: "contract" });
    setProgress(0);
    setUploading(false);
  }, []);

  const handleComplete = useCallback(() => {
    if (!formData.file) return;

    addDocument({
      name: formData.name,
      type: formData.type,
      size: `${(formData.file.size / (1024 * 1024)).toFixed(1)} MB`,
      lastModified: new Date().toISOString().split("T")[0],
      status: "active",
    });

    toast({
      title: t("uploadSuccess.title"),
      description: t("uploadSuccess.description"),
    });

    setOpen(false);
    resetForm();
  }, [formData, addDocument, t, toast, setOpen, resetForm]);

  useEffect(() => {
    if (!uploading) return;

    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          handleComplete();
          return 100;
        }
        return prev + 10;
      });
    }, 500);

    return () => clearInterval(interval);
  }, [uploading, handleComplete]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.file || !formData.name || !formData.type) return;
    setProgress(0);
    setUploading(true);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      resetForm();
    }
    setOpen(newOpen);
  };

  // Calculate total storage used
  const totalStorageUsed = documents.reduce((acc, doc) => {
    const sizeInMB = parseFloat(doc.size.replace(" MB", ""));
    return acc + sizeInMB * 1024 * 1024;
  }, 0);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];

      if (file.size > MAX_FILE_SIZE) {
        toast({
          title: t("fileError.title"),
          description: t("fileError.tooLarge"),
          variant: "destructive",
        });
        e.target.value = "";
        return;
      }

      if (totalStorageUsed + file.size > STORAGE_LIMIT) {
        toast({
          title: t("fileError.title"),
          description: t("fileError.storageLimit"),
          variant: "destructive",
        });
        e.target.value = "";
        return;
      }

      setFormData((prev) => ({
        ...prev,
        file,
        name: prev.name || file.name,
      }));
    }
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        <Button className="bg-[#B4975A] hover:bg-[#9A7F4A]">
          <Upload className="h-5 w-5 mr-2" />
          {t("upload")}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("uploadDocument")}</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label htmlFor="file">{t("form.file")}</Label>
            <div className="relative">
              <Input
                id="file"
                type="file"
                onChange={handleFileChange}
                required
                disabled={uploading}
                className={cn(
                  "cursor-pointer",
                  formData.file && "border-green-500 border-dashed"
                )}
              />
              {formData.file && (
                <Check className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-green-500" />
              )}
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="name">{t("form.name")}</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) =>
                setFormData((prev) => ({ ...prev, name: e.target.value }))
              }
              required
              disabled={uploading}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="type">{t("form.type")}</Label>
            <Select
              value={formData.type}
              onValueChange={(
                value: "contract" | "report" | "legal" | "other"
              ) => setFormData((prev) => ({ ...prev, type: value }))}
              disabled={uploading}
            >
              <SelectTrigger>
                <SelectValue placeholder={t("form.selectType")} />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="contract">{t("types.contract")}</SelectItem>
                <SelectItem value="report">{t("types.report")}</SelectItem>
                <SelectItem value="legal">{t("types.legal")}</SelectItem>
                <SelectItem value="other">{t("types.other")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {uploading && (
            <div className="space-y-2">
              <div className="flex justify-between text-sm text-gray-500">
                <span>{t("uploading")}</span>
                <span>{progress}%</span>
              </div>
              <Progress value={progress} className="h-2" />
            </div>
          )}

          <div className="flex justify-end gap-3 mt-6">
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={uploading}
            >
              {t("form.cancel")}
            </Button>
            <Button
              type="submit"
              className="bg-[#B4975A] hover:bg-[#9A7F4A]"
              disabled={
                uploading || !formData.file || !formData.name || !formData.type
              }
            >
              {uploading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  {t("uploading")}
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4 mr-2" />
                  {t("form.upload")}
                </>
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
