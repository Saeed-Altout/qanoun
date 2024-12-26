"use client";

import { useState } from "react";
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
import { Label } from "@/components/ui/label";
import { Share2, Copy, Check } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface ShareDocumentDialogProps {
  documentName: string;
  trigger?: React.ReactNode;
}

export function ShareDocumentDialog({
  documentName,
  trigger,
}: ShareDocumentDialogProps) {
  const t = useTranslations("Dashboard.documents");
  const { toast } = useToast();
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [email, setEmail] = useState("");

  const shareLink = `${
    window.location.origin
  }/documents/shared/${encodeURIComponent(documentName)}`;

  const handleCopy = async () => {
    await navigator.clipboard.writeText(shareLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would typically send the share invitation
    toast({
      title: t("share.success.title"),
      description: t("share.success.description"),
    });
    setEmail("");
    setOpen(false);
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setEmail("");
      setCopied(false);
    }
    setOpen(newOpen);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>
        {trigger || (
          <Button variant="ghost" size="sm">
            <Share2 className="h-4 w-4 mr-2" />
            {t("actions.share")}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{t("share.title")}</DialogTitle>
        </DialogHeader>
        <div className="space-y-4 mt-4">
          <div className="space-y-2">
            <Label>{t("share.link")}</Label>
            <div className="flex gap-2">
              <Input value={shareLink} readOnly className="flex-1" />
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={handleCopy}
              >
                {copied ? (
                  <Check className="h-4 w-4 text-green-500" />
                ) : (
                  <Copy className="h-4 w-4" />
                )}
              </Button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <span className="w-full border-t" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white px-2 text-gray-500">
                {t("share.or")}
              </span>
            </div>
          </div>
          <form onSubmit={handleShare} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">{t("share.email")}</Label>
              <Input
                id="email"
                type="email"
                placeholder={t("share.emailPlaceholder")}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <Button
              type="submit"
              className="w-full bg-[#B4975A] hover:bg-[#9A7F4A]"
            >
              {t("share.send")}
            </Button>
          </form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
