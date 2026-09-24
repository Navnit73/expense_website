"use client";

import React, { useState } from "react";
import {
  FileText,
  Printer,
  Sparkles,
  Download,
  Hash,
  LayoutTemplate,
  FileSpreadsheet,
  CheckCircle2,
  Receipt,
  Layers,
  ArrowRight,
  Zap,
  ShieldCheck,
  Eye,
  Edit3,
  RotateCcw,
} from "lucide-react";
import { InvoiceForm } from "./InvoiceForm";
import { InvoiceLivePreview } from "./InvoiceLivePreview";
import { InvoiceNumberGeneratorWidget } from "./InvoiceNumberGeneratorWidget";
import { InvoiceTemplateSelector, InvoiceTemplatePreset } from "./InvoiceTemplateSelector";
import { useInvoiceStore } from "@/lib/invoice-engine/invoice-store";
import { DocumentType } from "@/lib/invoice-engine/types";

export type InvoiceEngineMode =
  | "invoice"
  | "bill"
  | "receipt"
  | "number-generator"
  | "excel"
  | "template-picker";

interface UnifiedInvoiceEngineProps {
  mode?: InvoiceEngineMode;
  initialType?: DocumentType;
  customHeadline?: string;
  customSubheadline?: string;
  highlightFeatures?: string[];
}

export function UnifiedInvoiceEngine({
  mode = "invoice",
  initialType = "invoice",
  customHeadline,
  customSubheadline,
  highlightFeatures = [
    "100% Free & Private (Runs in Browser)",
    "Backend High-Resolution PDF Generation",
    "7 Curated Professional Design Themes",
    "Instant Multi-Currency & Tax Balancing",
  ],
}: UnifiedInvoiceEngineProps) {
  const {
    invoice,
    isLoaded,
    updateInvoice,
    addItem,
    updateItem,
    removeItem,
    resetInvoice,
  } = useInvoiceStore(initialType);

  const [activeTab, setActiveTab] = useState<"editor" | "preview" | "templates" | "number-generator">(
    mode === "number-generator"
      ? "number-generator"
      : mode === "template-picker"
      ? "templates"
      : "editor"
  );

  const handleSelectTemplatePreset = (preset: InvoiceTemplatePreset) => {
    updateInvoice({
      ...preset.sampleData,
      template: preset.theme,
    });
    setActiveTab("editor");
  };

  const handleUseGeneratedNumber = (num: string) => {
    updateInvoice({ invoiceNumber: num });
    setActiveTab("editor");
  };

  return (
    <div
      role="region"
      aria-label="Interactive Invoice & Billing Generator"
      className="w-full bg-surface border-2 border-emerald-700/30 dark:border-emerald-500/40 rounded-3xl shadow-2xl overflow-hidden transition-all ring-1 ring-emerald-500/20"
    >
      {/* 1. Distinguished Top Studio Header (Distinctive Emerald & Slate Styling) */}
      <header className="p-5 sm:p-7 bg-gradient-to-r from-emerald-950 via-slate-900 to-emerald-950 border-b border-emerald-600/30 text-white flex flex-col md:flex-row md:items-center justify-between gap-5">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
            <span className="text-[11px] font-mono uppercase font-bold text-emerald-300 tracking-wider">
              Expenseliy Invoice Studio • Free Tool
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white tracking-tight">
            {customHeadline || "Free Professional Invoice & Bill Generator"}
          </h2>
          <p className="text-xs sm:text-sm text-slate-300 mt-1 max-w-2xl leading-relaxed">
            {customSubheadline ||
              "Create, customize, and export professional PDF invoices, retail bills, and sales receipts with zero sign-up."}
          </p>
        </div>

        {/* Accessible Tab Navigation */}
        <nav
          role="tablist"
          aria-label="Invoice Studio Navigation"
          className="flex items-center gap-1.5 p-1.5 bg-slate-800/90 rounded-2xl border border-slate-700 self-start md:self-auto overflow-x-auto max-w-full shadow-inner"
        >
          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "editor"}
            aria-controls="invoice-editor-panel"
            id="tab-invoice-editor"
            onClick={() => setActiveTab("editor")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none ${
              activeTab === "editor"
                ? "bg-emerald-600 text-white shadow-md font-extrabold"
                : "text-slate-300 hover:text-white hover:bg-slate-700/60"
            }`}
          >
            <Edit3 className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Editor</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "preview"}
            aria-controls="invoice-preview-panel"
            id="tab-invoice-preview"
            onClick={() => setActiveTab("preview")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none ${
              activeTab === "preview"
                ? "bg-emerald-600 text-white shadow-md font-extrabold"
                : "text-slate-300 hover:text-white hover:bg-slate-700/60"
            }`}
          >
            <Eye className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Preview Invoice</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "templates"}
            aria-controls="invoice-templates-panel"
            id="tab-invoice-templates"
            onClick={() => setActiveTab("templates")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none ${
              activeTab === "templates"
                ? "bg-emerald-600 text-white shadow-md font-extrabold"
                : "text-slate-300 hover:text-white hover:bg-slate-700/60"
            }`}
          >
            <LayoutTemplate className="w-3.5 h-3.5" aria-hidden="true" />
            <span>7 Templates</span>
          </button>

          <button
            type="button"
            role="tab"
            aria-selected={activeTab === "number-generator"}
            aria-controls="invoice-number-panel"
            id="tab-invoice-number"
            onClick={() => setActiveTab("number-generator")}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none ${
              activeTab === "number-generator"
                ? "bg-emerald-600 text-white shadow-md font-extrabold"
                : "text-slate-300 hover:text-white hover:bg-slate-700/60"
            }`}
          >
            <Hash className="w-3.5 h-3.5" aria-hidden="true" />
            <span>Number Tool</span>
          </button>
        </nav>
      </header>

      {/* 2. Feature Highlights Strip (High Contrast Badges) */}
      <div className="px-5 sm:px-7 py-2.5 bg-emerald-50/80 dark:bg-slate-800/80 border-b border-emerald-600/20 flex flex-wrap items-center gap-y-2 gap-x-6 text-xs text-slate-800 dark:text-slate-200">
        {highlightFeatures.map((feat, fIdx) => (
          <div key={fIdx} className="flex items-center gap-1.5">
            <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400 shrink-0" aria-hidden="true" />
            <span className="font-medium">{feat}</span>
          </div>
        ))}
      </div>

      {/* 3. Main Tool Workspace */}
      <main className="p-4 sm:p-8 bg-slate-50/60 dark:bg-surface">
        {activeTab === "editor" && (
          <div
            id="invoice-editor-panel"
            role="tabpanel"
            aria-labelledby="tab-invoice-editor"
            className="max-w-4xl mx-auto"
          >
            <InvoiceForm
              invoice={invoice}
              onUpdate={updateInvoice}
              onAddItem={addItem}
              onUpdateItem={updateItem}
              onRemoveItem={removeItem}
              onReset={resetInvoice}
              onPreview={() => setActiveTab("preview")}
            />
          </div>
        )}

        {activeTab === "preview" && (
          <div
            id="invoice-preview-panel"
            role="tabpanel"
            aria-labelledby="tab-invoice-preview"
            className="max-w-4xl mx-auto"
          >
            <InvoiceLivePreview
              invoice={invoice}
              onBackToEditor={() => setActiveTab("editor")}
            />
          </div>
        )}

        {activeTab === "templates" && (
          <div
            id="invoice-templates-panel"
            role="tabpanel"
            aria-labelledby="tab-invoice-templates"
          >
            <InvoiceTemplateSelector onSelectTemplate={handleSelectTemplatePreset} />
          </div>
        )}

        {activeTab === "number-generator" && (
          <div
            id="invoice-number-panel"
            role="tabpanel"
            aria-labelledby="tab-invoice-number"
          >
            <InvoiceNumberGeneratorWidget onUseNumber={handleUseGeneratedNumber} />
          </div>
        )}
      </main>
    </div>
  );
}
