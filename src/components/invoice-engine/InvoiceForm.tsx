"use client";

import React, { useRef, useState } from "react";
import {
  Plus,
  Trash2,
  Building2,
  User,
  Calendar,
  DollarSign,
  Percent,
  FileText,
  RotateCcw,
  Sparkles,
  Layers,
  Upload,
  CreditCard,
  Image as ImageIcon,
  X,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Eye,
  Download,
  Printer,
  FileSpreadsheet,
  Loader2,
} from "lucide-react";
import {
  InvoiceData,
  InvoiceItem,
  CURRENCY_OPTIONS,
  InvoiceTemplateTheme,
  DocumentType,
  DEFAULT_INVOICE_DATA,
} from "@/lib/invoice-engine/types";
import { exportInvoiceToCSV, downloadInvoicePDF, printInvoicePDF } from "@/lib/invoice-engine/invoice-store";

interface InvoiceFormProps {
  invoice: InvoiceData;
  onUpdate: (updates: Partial<InvoiceData>) => void;
  onAddItem: () => void;
  onUpdateItem: (id: string, updates: Partial<InvoiceItem>) => void;
  onRemoveItem: (id: string) => void;
  onReset: () => void;
  onPreview?: () => void;
}

const TEMPLATE_THEMES: {
  id: InvoiceTemplateTheme;
  name: string;
  colorClass: string;
  dotColor: string;
}[] = [
  {
    id: "modern",
    name: "Modern Emerald",
    colorClass: "border-emerald-600 text-emerald-900 bg-emerald-50 dark:bg-emerald-950/40 dark:text-emerald-200",
    dotColor: "bg-emerald-600",
  },
  {
    id: "corporate",
    name: "Executive Navy",
    colorClass: "border-blue-600 text-blue-900 bg-blue-50 dark:bg-blue-950/40 dark:text-blue-200",
    dotColor: "bg-blue-700",
  },
  {
    id: "classic",
    name: "Clean Slate",
    colorClass: "border-zinc-700 text-zinc-900 bg-zinc-100 dark:bg-zinc-800 dark:text-zinc-100",
    dotColor: "bg-zinc-800",
  },
  {
    id: "creative",
    name: "Creative Violet",
    colorClass: "border-purple-600 text-purple-900 bg-purple-50 dark:bg-purple-950/40 dark:text-purple-200",
    dotColor: "bg-purple-600",
  },
  {
    id: "sunset",
    name: "Sunset Coral",
    colorClass: "border-orange-600 text-orange-950 bg-orange-50 dark:bg-orange-950/40 dark:text-orange-200",
    dotColor: "bg-orange-600",
  },
  {
    id: "freelance",
    name: "Freelance Cyan",
    colorClass: "border-cyan-600 text-cyan-950 bg-cyan-50 dark:bg-cyan-950/40 dark:text-cyan-200",
    dotColor: "bg-cyan-600",
  },
  {
    id: "thermal",
    name: "POS Receipt",
    colorClass: "border-gray-800 text-gray-950 bg-gray-200 dark:bg-gray-800 dark:text-gray-100",
    dotColor: "bg-gray-900",
  },
];

export function InvoiceForm({
  invoice,
  onUpdate,
  onAddItem,
  onUpdateItem,
  onRemoveItem,
  onReset,
  onPreview,
}: InvoiceFormProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      await downloadInvoicePDF(invoice);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handlePrint = async () => {
    setIsPrinting(true);
    try {
      await printInvoicePDF(invoice);
    } finally {
      setIsPrinting(false);
    }
  };

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          onUpdate({
            sender: {
              ...invoice.sender,
              logoUrl: event.target.result as string,
            },
          });
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemoveLogo = () => {
    onUpdate({
      sender: {
        ...invoice.sender,
        logoUrl: undefined,
      },
    });
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleCurrencyChange = (code: string) => {
    const selected = CURRENCY_OPTIONS.find((c) => c.code === code);
    if (selected) {
      onUpdate({
        currency: selected.code,
        currencySymbol: selected.symbol,
      });
    }
  };

  const handleLoadSample = () => {
    onUpdate({
      ...DEFAULT_INVOICE_DATA,
      invoiceNumber: `INV-2026-${Math.floor(1000 + Math.random() * 9000)}`,
      issueDate: new Date().toISOString().split("T")[0],
    });
  };

  return (
    <form
      role="form"
      aria-label="Invoice Details Form"
      onSubmit={(e) => e.preventDefault()}
      className="flex flex-col gap-6 text-slate-900 dark:text-slate-100"
    >
      {/* 1. Header Toolbar: Template Style & Document Type */}
      <section
        aria-labelledby="template-theme-heading"
        className="bg-white dark:bg-surface-raised border border-slate-300 dark:border-hairline rounded-2xl p-4 sm:p-5 shadow-sm space-y-4"
      >
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h3 id="template-theme-heading" className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider font-mono">
              Invoice Template & Currency
            </h3>
            <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
              Select a color palette and currency for live preview and PDF download.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-2">
            <div>
              <label htmlFor="doc-type-select" className="sr-only">
                Document Type
              </label>
              <select
                id="doc-type-select"
                value={invoice.type}
                onChange={(e) => onUpdate({ type: e.target.value as DocumentType })}
                className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-hairline bg-slate-50 dark:bg-surface text-slate-900 dark:text-white text-xs font-bold focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
              >
                <option value="invoice">Commercial Invoice</option>
                <option value="bill">Retail / POS Bill</option>
                <option value="receipt">Payment Receipt</option>
              </select>
            </div>

            <div>
              <label htmlFor="currency-select" className="sr-only">
                Currency
              </label>
              <select
                id="currency-select"
                value={invoice.currency}
                onChange={(e) => handleCurrencyChange(e.target.value)}
                className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-hairline bg-slate-50 dark:bg-surface text-slate-900 dark:text-white text-xs font-bold focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
              >
                {CURRENCY_OPTIONS.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.symbol} {c.code}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleLoadSample}
              className="px-2.5 py-1.5 rounded-xl border border-emerald-600/40 bg-emerald-50 dark:bg-emerald-950/40 text-emerald-800 dark:text-emerald-300 hover:bg-emerald-100 text-xs font-bold transition-colors shrink-0 focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
              title="Load example sample data"
            >
              <span>Sample Data</span>
            </button>

            {onPreview && (
              <button
                type="button"
                onClick={onPreview}
                aria-label="Preview invoice in real-time layout"
                className="px-3 py-1.5 rounded-xl bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-950 text-xs font-extrabold flex items-center gap-1.5 transition-all shadow-xs focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none shrink-0"
              >
                <Eye className="w-3.5 h-3.5 text-emerald-400 dark:text-emerald-600" aria-hidden="true" />
                <span>Preview</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              aria-label="Download high resolution PDF invoice"
              className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-xs transition-all disabled:opacity-50 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none shrink-0"
            >
              {isGeneratingPDF ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                  <span className="hidden sm:inline">Generating...</span>
                </>
              ) : (
                <>
                  <Download className="w-3.5 h-3.5" aria-hidden="true" />
                  <span>Download PDF</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* Visual Template Selector Pills */}
        <div
          role="radiogroup"
          aria-label="Select Invoice Template Theme"
          className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2"
        >
          {TEMPLATE_THEMES.map((theme) => {
            const isSelected = invoice.template === theme.id;
            return (
              <button
                key={theme.id}
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => onUpdate({ template: theme.id })}
                className={`p-2.5 rounded-xl border text-left flex flex-col gap-1 transition-all focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none ${
                  isSelected
                    ? `${theme.colorClass} ring-2 ring-emerald-600 font-extrabold shadow-sm`
                    : "border-slate-200 dark:border-hairline bg-slate-50/80 dark:bg-surface hover:bg-slate-100 dark:hover:bg-surface-raised text-slate-700 dark:text-slate-300"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className={`w-3.5 h-3.5 rounded-full ${theme.dotColor}`} aria-hidden="true" />
                  {isSelected && <CheckCircle2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />}
                </div>
                <span className="text-xs tracking-tight truncate font-semibold">{theme.name}</span>
              </button>
            );
          })}
        </div>
      </section>

      {/* 2. Paper Canvas Workspace */}
      <div className="bg-white dark:bg-surface border border-slate-300 dark:border-hairline rounded-3xl p-6 sm:p-8 shadow-sm space-y-8">
        {/* Top Business & Document Meta Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pb-6 border-b border-slate-200 dark:border-hairline">
          {/* Sender / Business Details (Left) */}
          <fieldset className="space-y-3.5">
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <Building2 className="w-4 h-4 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
                <legend className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 font-mono">
                  Your Business Details
                </legend>
              </div>

              {/* Logo Uploader */}
              <div>
                <input
                  type="file"
                  id="business-logo-upload"
                  ref={fileInputRef}
                  onChange={handleLogoUpload}
                  accept="image/*"
                  aria-label="Upload business logo image"
                  className="hidden"
                />
                {invoice.sender.logoUrl ? (
                  <div className="relative inline-block group">
                    <img
                      src={invoice.sender.logoUrl}
                      alt="Business Logo"
                      className="h-10 max-w-36 object-contain rounded border border-slate-300 dark:border-hairline"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveLogo}
                      aria-label="Remove business logo"
                      className="absolute -top-1.5 -right-1.5 w-5 h-5 rounded-full bg-rose-600 text-white flex items-center justify-center text-xs shadow-sm hover:bg-rose-700 transition-colors focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-none"
                    >
                      <X className="w-3.5 h-3.5" aria-hidden="true" />
                    </button>
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    aria-label="Upload your business logo image"
                    className="px-2.5 py-1 rounded-lg border border-dashed border-slate-400 hover:border-emerald-600 text-xs font-bold text-slate-700 dark:text-slate-300 hover:text-emerald-700 flex items-center gap-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
                  >
                    <Upload className="w-3.5 h-3.5" aria-hidden="true" />
                    <span>Upload Logo</span>
                  </button>
                )}
              </div>
            </div>

            <div>
              <label htmlFor="sender-name-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Company / Business Name *
              </label>
              <input
                id="sender-name-input"
                type="text"
                required
                placeholder="Acme Studio LLC"
                value={invoice.sender.name}
                onChange={(e) =>
                  onUpdate({ sender: { ...invoice.sender, name: e.target.value } })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-hairline bg-slate-50 dark:bg-canvas text-slate-900 dark:text-white text-sm font-bold focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:border-emerald-600 focus-visible:outline-none"
              />
            </div>

            <div>
              <label htmlFor="sender-address-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Street Address
              </label>
              <input
                id="sender-address-input"
                type="text"
                placeholder="742 Evergreen Terrace, Suite 400"
                value={invoice.sender.address}
                onChange={(e) =>
                  onUpdate({ sender: { ...invoice.sender, address: e.target.value } })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-hairline bg-slate-50 dark:bg-canvas text-slate-900 dark:text-white text-xs focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
              />
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label htmlFor="sender-city-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  City, State, Zip
                </label>
                <input
                  id="sender-city-input"
                  type="text"
                  placeholder="Austin, TX 78701"
                  value={invoice.sender.cityStateZip}
                  onChange={(e) =>
                    onUpdate({ sender: { ...invoice.sender, cityStateZip: e.target.value } })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-hairline bg-slate-50 dark:bg-canvas text-slate-900 dark:text-white text-xs focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
                />
              </div>
              <div>
                <label htmlFor="sender-taxid-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Tax ID / EIN / VAT
                </label>
                <input
                  id="sender-taxid-input"
                  type="text"
                  placeholder="EIN: 12-3456789"
                  value={invoice.sender.taxId || ""}
                  onChange={(e) =>
                    onUpdate({ sender: { ...invoice.sender, taxId: e.target.value } })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-hairline bg-slate-50 dark:bg-canvas text-slate-900 dark:text-white text-xs font-mono focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-2.5">
              <div>
                <label htmlFor="sender-email-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Billing Email
                </label>
                <input
                  id="sender-email-input"
                  type="email"
                  placeholder="billing@company.com"
                  value={invoice.sender.email}
                  onChange={(e) =>
                    onUpdate({ sender: { ...invoice.sender, email: e.target.value } })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-hairline bg-slate-50 dark:bg-canvas text-slate-900 dark:text-white text-xs focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
                />
              </div>
              <div>
                <label htmlFor="sender-phone-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Phone Number
                </label>
                <input
                  id="sender-phone-input"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={invoice.sender.phone}
                  onChange={(e) =>
                    onUpdate({ sender: { ...invoice.sender, phone: e.target.value } })
                  }
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-hairline bg-slate-50 dark:bg-canvas text-slate-900 dark:text-white text-xs focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
                />
              </div>
            </div>
          </fieldset>

          {/* Document Meta (Right) */}
          <fieldset className="space-y-3.5">
            <div className="flex items-center justify-between">
              <legend className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 font-mono">
                {invoice.type.toUpperCase()} Reference & Status
              </legend>
              <div>
                <label htmlFor="invoice-status-select" className="sr-only">
                  Invoice Payment Status
                </label>
                <select
                  id="invoice-status-select"
                  value={invoice.status}
                  onChange={(e) =>
                    onUpdate({
                      status: e.target.value as InvoiceData["status"],
                    })
                  }
                  className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider border focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none ${
                    invoice.status === "paid"
                      ? "bg-emerald-100 text-emerald-950 border-emerald-400 font-extrabold"
                      : invoice.status === "pending"
                      ? "bg-amber-100 text-amber-950 border-amber-400 font-extrabold"
                      : "bg-slate-100 text-slate-900 border-slate-300 font-bold"
                  }`}
                >
                  <option value="draft">Draft</option>
                  <option value="sent">Sent</option>
                  <option value="pending">Pending</option>
                  <option value="paid">Paid</option>
                  <option value="overdue">Overdue</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="invoice-number-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  {invoice.type.toUpperCase()} Number *
                </label>
                <input
                  id="invoice-number-input"
                  type="text"
                  required
                  value={invoice.invoiceNumber}
                  onChange={(e) => onUpdate({ invoiceNumber: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-hairline bg-slate-50 dark:bg-canvas text-slate-900 dark:text-white font-mono font-bold text-xs focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:border-emerald-600 focus-visible:outline-none"
                />
              </div>

              <div>
                <label htmlFor="reference-number-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  PO / Ref # (Optional)
                </label>
                <input
                  id="reference-number-input"
                  type="text"
                  placeholder="PO-94021"
                  value={invoice.referenceNumber || ""}
                  onChange={(e) => onUpdate({ referenceNumber: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-hairline bg-slate-50 dark:bg-canvas text-slate-900 dark:text-white font-mono text-xs focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="issue-date-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Issue Date *
                </label>
                <input
                  id="issue-date-input"
                  type="date"
                  required
                  value={invoice.issueDate}
                  onChange={(e) => onUpdate({ issueDate: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-hairline bg-slate-50 dark:bg-canvas text-slate-900 dark:text-white text-xs font-mono focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
                />
              </div>

              <div>
                <label htmlFor="due-date-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                  Payment Due Date
                </label>
                <input
                  id="due-date-input"
                  type="date"
                  value={invoice.dueDate}
                  onChange={(e) => onUpdate({ dueDate: e.target.value })}
                  className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-hairline bg-slate-50 dark:bg-canvas text-slate-900 dark:text-white text-xs font-mono focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
                />
              </div>
            </div>
          </fieldset>
        </div>

        {/* Client / Bill To Card */}
        <fieldset className="space-y-3">
          <div className="flex items-center gap-2">
            <User className="w-4 h-4 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
            <legend className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 font-mono">
              {invoice.type === "receipt" ? "Customer Details" : "Billed To (Client Details)"}
            </legend>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <div>
              <label htmlFor="client-name-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Client / Company Name *
              </label>
              <input
                id="client-name-input"
                type="text"
                required
                placeholder="Summit Retail Corp"
                value={invoice.client.name}
                onChange={(e) =>
                  onUpdate({ client: { ...invoice.client, name: e.target.value } })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-hairline bg-slate-50 dark:bg-canvas text-slate-900 dark:text-white text-sm font-bold focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:border-emerald-600 focus-visible:outline-none"
              />
            </div>

            <div>
              <label htmlFor="client-email-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Client Email Address
              </label>
              <input
                id="client-email-input"
                type="email"
                placeholder="invoices@client.com"
                value={invoice.client.email}
                onChange={(e) =>
                  onUpdate({ client: { ...invoice.client, email: e.target.value } })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-hairline bg-slate-50 dark:bg-canvas text-slate-900 dark:text-white text-xs focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label htmlFor="client-address-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                Client Address
              </label>
              <input
                id="client-address-input"
                type="text"
                placeholder="300 Mountain Way"
                value={invoice.client.address}
                onChange={(e) =>
                  onUpdate({ client: { ...invoice.client, address: e.target.value } })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-hairline bg-slate-50 dark:bg-canvas text-slate-900 dark:text-white text-xs focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
              />
            </div>

            <div>
              <label htmlFor="client-city-input" className="block text-xs font-semibold text-slate-700 dark:text-slate-300 mb-1">
                City, State, Zip
              </label>
              <input
                id="client-city-input"
                type="text"
                placeholder="Boulder, CO 80302"
                value={invoice.client.cityStateZip}
                onChange={(e) =>
                  onUpdate({ client: { ...invoice.client, cityStateZip: e.target.value } })
                }
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-hairline bg-slate-50 dark:bg-canvas text-slate-900 dark:text-white text-xs focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
              />
            </div>
          </div>
        </fieldset>

        {/* 3. Line Items Table */}
        <fieldset className="space-y-3">
          <div className="flex items-center justify-between">
            <legend className="text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 font-mono">
              Line Items & Services
            </legend>
            <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
              {invoice.items.length} {invoice.items.length === 1 ? "item" : "items"}
            </span>
          </div>

          <div className="border border-slate-300 dark:border-hairline rounded-2xl overflow-hidden bg-slate-50 dark:bg-canvas">
            {/* Table Header */}
            <div className="grid grid-cols-12 gap-2 px-4 py-2.5 bg-slate-100 dark:bg-surface border-b border-slate-300 dark:border-hairline text-xs font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              <div className="col-span-6">Description</div>
              <div className="col-span-2 text-center">Qty / Hours</div>
              <div className="col-span-2 text-right">Price ({invoice.currencySymbol})</div>
              <div className="col-span-2 text-right">Total ({invoice.currencySymbol})</div>
            </div>

            {/* Item Rows */}
            <div className="divide-y divide-slate-200 dark:divide-hairline">
              {invoice.items.map((item, idx) => (
                <div
                  key={item.id}
                  className="grid grid-cols-12 gap-2 px-4 py-3 items-center group hover:bg-white dark:hover:bg-surface/50 transition-colors"
                >
                  <div className="col-span-6 flex items-center gap-2">
                    <button
                      type="button"
                      onClick={() => onRemoveItem(item.id)}
                      disabled={invoice.items.length <= 1}
                      aria-label={`Delete line item ${idx + 1}: ${item.description || "unnamed"}`}
                      className={`p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950 transition-colors focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-none ${
                        invoice.items.length <= 1 ? "opacity-20 cursor-not-allowed" : ""
                      }`}
                      title="Delete Line Item"
                    >
                      <Trash2 className="w-4 h-4" aria-hidden="true" />
                    </button>
                    <input
                      type="text"
                      aria-label={`Description for item ${idx + 1}`}
                      value={item.description}
                      onChange={(e) => onUpdateItem(item.id, { description: e.target.value })}
                      placeholder="Item description or service..."
                      className="w-full px-2.5 py-1.5 rounded-lg border border-slate-200 hover:border-slate-400 focus-visible:border-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-600 bg-white dark:bg-surface text-xs font-medium text-slate-900 dark:text-white focus-visible:outline-none"
                    />
                  </div>

                  <div className="col-span-2">
                    <input
                      type="number"
                      min="1"
                      step="1"
                      aria-label={`Quantity for item ${idx + 1}`}
                      value={item.quantity}
                      onChange={(e) =>
                        onUpdateItem(item.id, {
                          quantity: parseFloat(e.target.value) || 0,
                          amount: (parseFloat(e.target.value) || 0) * item.rate,
                        })
                      }
                      className="w-full px-2 py-1.5 text-center rounded-lg border border-slate-200 hover:border-slate-400 focus-visible:border-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-600 bg-white dark:bg-surface text-xs font-mono font-bold text-slate-900 dark:text-white focus-visible:outline-none"
                    />
                  </div>

                  <div className="col-span-2 text-right">
                    <input
                      type="number"
                      min="0"
                      step="0.01"
                      aria-label={`Unit rate for item ${idx + 1}`}
                      value={item.rate}
                      onChange={(e) =>
                        onUpdateItem(item.id, {
                          rate: parseFloat(e.target.value) || 0,
                          amount: item.quantity * (parseFloat(e.target.value) || 0),
                        })
                      }
                      className="w-full px-2 py-1.5 text-right rounded-lg border border-slate-200 hover:border-slate-400 focus-visible:border-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-600 bg-white dark:bg-surface text-xs font-mono font-bold text-slate-900 dark:text-white focus-visible:outline-none"
                    />
                  </div>

                  <div className="col-span-2 text-right font-mono font-black text-xs text-slate-900 dark:text-white">
                    {invoice.currencySymbol}
                    {(item.quantity * item.rate).toFixed(2)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={onAddItem}
            aria-label="Add a new line item to this invoice"
            className="w-full py-2.5 rounded-xl border-2 border-dashed border-emerald-600/40 hover:border-emerald-600 text-xs font-extrabold text-emerald-800 dark:text-emerald-300 hover:bg-emerald-50 dark:hover:bg-emerald-950/40 flex items-center justify-center gap-1.5 transition-all shadow-xs focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
          >
            <Plus className="w-4 h-4" aria-hidden="true" />
            <span>Add Line Item</span>
          </button>
        </fieldset>

        {/* 4. Bottom Grid: Notes, Payment & Financial Totals */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 pt-4 border-t border-slate-200 dark:border-hairline">
          {/* Notes & Payment Instructions (Left 7 cols) */}
          <div className="md:col-span-7 space-y-4">
            <div>
              <label htmlFor="payment-instructions-input" className="block text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-1 font-mono">
                Payment Instructions / Bank Wire
              </label>
              <textarea
                id="payment-instructions-input"
                rows={2}
                value={invoice.paymentInstructions || ""}
                onChange={(e) => onUpdate({ paymentInstructions: e.target.value })}
                placeholder="Bank: Silicon Valley Bank | Routing: 121000358 | Account: 9827401923"
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-hairline bg-slate-50 dark:bg-canvas text-slate-900 dark:text-white text-xs focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none resize-none font-mono"
              />
            </div>

            <div>
              <label htmlFor="invoice-notes-input" className="block text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-1 font-mono">
                Notes / Client Thank You
              </label>
              <textarea
                id="invoice-notes-input"
                rows={2}
                value={invoice.notes}
                onChange={(e) => onUpdate({ notes: e.target.value })}
                placeholder="Thank you for your business! Please reach out with any questions."
                className="w-full p-3 rounded-xl border border-slate-300 dark:border-hairline bg-slate-50 dark:bg-canvas text-slate-900 dark:text-white text-xs focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none resize-none"
              />
            </div>

            <div>
              <label htmlFor="invoice-terms-input" className="block text-xs font-bold uppercase tracking-wider text-slate-800 dark:text-slate-200 mb-1 font-mono">
                Terms & Conditions
              </label>
              <input
                id="invoice-terms-input"
                type="text"
                value={invoice.terms}
                onChange={(e) => onUpdate({ terms: e.target.value })}
                placeholder="Net 30. Direct bank transfer instructions listed above."
                className="w-full px-3.5 py-2 rounded-xl border border-slate-300 dark:border-hairline bg-slate-50 dark:bg-canvas text-slate-900 dark:text-white text-xs focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
              />
            </div>
          </div>

          {/* Totals Breakdown Card (Right 5 cols) */}
          <div className="md:col-span-5 bg-slate-50 dark:bg-canvas border border-slate-300 dark:border-hairline rounded-2xl p-5 space-y-3">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-900 dark:text-white font-mono block pb-2 border-b border-slate-200 dark:border-hairline">
              Financial Summary
            </span>

            {/* Subtotal */}
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-700 dark:text-slate-300">Subtotal:</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white">
                {invoice.currencySymbol}
                {invoice.subtotal.toFixed(2)}
              </span>
            </div>

            {/* Discount */}
            <div className="flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                <label htmlFor="discount-input">Discount:</label>
                <input
                  id="discount-input"
                  type="number"
                  min="0"
                  max="100"
                  aria-label="Discount percentage"
                  value={invoice.discountValue}
                  onChange={(e) =>
                    onUpdate({ discountValue: parseFloat(e.target.value) || 0 })
                  }
                  className="w-12 px-1.5 py-0.5 text-center rounded border border-slate-300 dark:border-hairline bg-white dark:bg-surface text-slate-900 dark:text-white text-xs font-mono focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
                />
                <span>%</span>
              </div>
              <span className="font-mono font-bold text-emerald-800 dark:text-emerald-400 text-xs">
                -{invoice.currencySymbol}
                {invoice.discountAmount.toFixed(2)}
              </span>
            </div>

            {/* Tax */}
            <div className="flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                <label htmlFor="tax-input">Tax Rate:</label>
                <input
                  id="tax-input"
                  type="number"
                  min="0"
                  step="0.1"
                  aria-label="Tax rate percentage"
                  value={invoice.taxRate}
                  onChange={(e) =>
                    onUpdate({ taxRate: parseFloat(e.target.value) || 0 })
                  }
                  className="w-14 px-1.5 py-0.5 text-center rounded border border-slate-300 dark:border-hairline bg-white dark:bg-surface text-slate-900 dark:text-white text-xs font-mono focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
                />
                <span>%</span>
              </div>
              <span className="font-mono font-bold text-slate-900 dark:text-white text-xs">
                +{invoice.currencySymbol}
                {invoice.taxAmount.toFixed(2)}
              </span>
            </div>

            {/* Optional Shipping */}
            <div className="flex items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-1 font-medium text-slate-700 dark:text-slate-300">
                <label htmlFor="shipping-input">Shipping:</label>
                <input
                  id="shipping-input"
                  type="number"
                  min="0"
                  step="1"
                  aria-label="Shipping fee amount"
                  value={invoice.shipping}
                  onChange={(e) =>
                    onUpdate({ shipping: parseFloat(e.target.value) || 0 })
                  }
                  className="w-14 px-1.5 py-0.5 text-center rounded border border-slate-300 dark:border-hairline bg-white dark:bg-surface text-slate-900 dark:text-white text-xs font-mono focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
                />
              </div>
              <span className="font-mono font-bold text-slate-900 dark:text-white text-xs">
                +{invoice.currencySymbol}
                {invoice.shipping.toFixed(2)}
              </span>
            </div>

            {/* Grand Total */}
            <div className="pt-3 border-t-2 border-emerald-600/30 flex items-center justify-between">
              <span className="text-sm font-black text-slate-900 dark:text-white">Grand Total:</span>
              <span className="text-xl font-black font-mono text-emerald-700 dark:text-emerald-400">
                {invoice.currencySymbol}
                {invoice.total.toFixed(2)}
              </span>
            </div>

            {/* Balance Due */}
            {invoice.amountPaid > 0 && (
              <div className="flex items-center justify-between text-xs pt-1">
                <span className="font-semibold text-slate-700 dark:text-slate-300">Balance Due:</span>
                <span className="font-mono font-bold text-rose-700 dark:text-rose-400">
                  {invoice.currencySymbol}
                  {invoice.balanceDue.toFixed(2)}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Primary Action Bar */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-6 border-t-2 border-slate-200 dark:border-hairline">
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onReset}
              aria-label="Reset invoice document to initial blank state"
              className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-hairline bg-slate-100 dark:bg-surface-raised hover:bg-rose-50 dark:hover:bg-rose-950/40 text-slate-700 dark:text-slate-300 hover:text-rose-700 dark:hover:text-rose-400 text-xs font-bold flex items-center gap-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-rose-500 focus-visible:outline-none"
            >
              <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Reset</span>
            </button>

            <button
              type="button"
              onClick={() => exportInvoiceToCSV(invoice)}
              aria-label="Export invoice line items as CSV spreadsheet"
              className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-hairline bg-white dark:bg-surface hover:bg-slate-100 dark:hover:bg-surface-raised text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
            >
              <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
              <span>CSV</span>
            </button>

            <button
              type="button"
              onClick={handlePrint}
              disabled={isPrinting}
              aria-label="Print high-resolution PDF document"
              className="px-3.5 py-2 rounded-xl border border-slate-300 dark:border-hairline bg-white dark:bg-surface hover:bg-slate-100 dark:hover:bg-surface-raised text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
            >
              {isPrinting ? (
                <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" aria-hidden="true" />
              ) : (
                <Printer className="w-3.5 h-3.5 text-slate-700 dark:text-slate-300" aria-hidden="true" />
              )}
              <span>{isPrinting ? "Preparing..." : "Print"}</span>
            </button>
          </div>

          <div className="flex items-center gap-3">
            {onPreview && (
              <button
                type="button"
                onClick={onPreview}
                aria-label="Preview invoice in real-time layout"
                className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-slate-900 dark:bg-white hover:bg-slate-800 dark:hover:bg-slate-100 text-white dark:text-slate-950 text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-sm transition-all focus-visible:ring-2 focus-visible:ring-emerald-500 focus-visible:outline-none"
              >
                <Eye className="w-4 h-4 text-emerald-400 dark:text-emerald-600" aria-hidden="true" />
                <span>Preview Invoice</span>
              </button>
            )}

            <button
              type="button"
              onClick={handleDownloadPDF}
              disabled={isGeneratingPDF}
              aria-label="Download high resolution PDF invoice"
              className="flex-1 sm:flex-none px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs sm:text-sm font-extrabold flex items-center justify-center gap-2 shadow-sm transition-all disabled:opacity-50 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
            >
              {isGeneratingPDF ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" aria-hidden="true" />
                  <span>Generating PDF...</span>
                </>
              ) : (
                <>
                  <Download className="w-4 h-4" aria-hidden="true" />
                  <span>Download PDF</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </form>
  );
}
