"use client";

import React, { createContext, useContext, useState } from "react";

export interface Document {
  id: number;
  name: string;
  type: "contract" | "report" | "legal" | "other";
  size: string;
  lastModified: string;
  status: "active" | "archived";
}

interface DocumentContextType {
  documents: Document[];
  addDocument: (document: Omit<Document, "id">) => void;
  deleteDocument: (id: number) => void;
}

const DocumentContext = createContext<DocumentContextType | undefined>(
  undefined
);

export function DocumentProvider({ children }: { children: React.ReactNode }) {
  const [documents, setDocuments] = useState<Document[]>([]);

  const addDocument = (document: Omit<Document, "id">) => {
    setDocuments((prev) => {
      const newId =
        prev.length > 0 ? Math.max(...prev.map((d) => d.id)) + 1 : 1;
      return [{ ...document, id: newId }, ...prev];
    });
  };

  const deleteDocument = (id: number) => {
    setDocuments((prev) => prev.filter((doc) => doc.id !== id));
  };

  return (
    <DocumentContext.Provider
      value={{ documents, addDocument, deleteDocument }}
    >
      {children}
    </DocumentContext.Provider>
  );
}

export function useDocuments() {
  const context = useContext(DocumentContext);
  if (context === undefined) {
    throw new Error("useDocuments must be used within a DocumentProvider");
  }
  return context;
}
