"use client";

import React, { useState, useEffect } from "react";
import {
  X,
  CheckCircle2,
  AlertTriangle,
  FileText,
  DollarSign,
  Calendar,
  Building2,
  Tag,
  CreditCard,
  Percent,
  Sparkles,
  Layers,
  Save,
  Trash2,
  Copy,
  Check,
  Eye,
} from "lucide-react";
import {
  ReceiptItem,
  ExpenseCategory,
  TaxDeductionCategory,
} from "@/lib/receipt-engine/types";

const EXPENSE_CATEGORIES: ExpenseCategory[] = [
  "Food & Dining",
  "Travel & Lodging",
  "Office & Supplies",
  "Software & SaaS",
  "Utilities & Internet",
  "Shopping & Equipment",
  "Healthcare & Medical",
  "Transportation & Gas",
  "Advertising & Marketing",
  "Legal & Professional",
  "Repairs & Maintenance",
  "Entertainment",
  "Other",
];

const TAX_CATEGORIES: TaxDeductionCategory[] = [
  "Schedule C: Meals (50%)",
  "Schedule C: Office Expenses",
  "Schedule C: Travel",
  "Schedule C: Software & Subscriptions",
  "Schedule C: Advertising & Marketing",
  "Schedule C: Legal & Professional",
  "Schedule C: Supplies & Materials",
  "Schedule C: Vehicle & Transportation",
  "Schedule C: Utilities & Phone",
  "Medical & Healthcare (HSA/FSA)",
  "Personal (Non-Deductible)",
  "Other Deduction",
];

interface ReceiptFieldEditorModalProps {
  receipt: ReceiptItem | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (updated: ReceiptItem) => void;
  onDelete?: (id: string) => void;
  duplicateReceipt?: ReceiptItem | null;
}

export function ReceiptFieldEditorModal({
  receipt,
  isOpen,
  onClose,
  onSave,
  onDelete,
  duplicateReceipt,
}: ReceiptFieldEditorModalProps) {
  const [formData, setFormData] = useState<ReceiptItem | null>(null);
  const [activeTab, setActiveTab] = useState<"fields" | "rawText" | "image">("fields");
  const [newTag, setNewTag] = useState("");
  const [copiedRaw, setCopiedRaw] = useState(false);

  useEffect(() => {
    if (receipt) {
      setFormData({ ...receipt });
    }
  }, [receipt]);

  if (!isOpen || !formData) return null;

  const handleSubtotalChange = (val: number) => {
    const subtotal = Math.max(0, val);
    const tax = formData.tax || 0;
    const tip = formData.tip || 0;
    setFormData({
      ...formData,
      subtotal,
      total: parseFloat((subtotal + tax + tip).toFixed(2)),
    });
  };

  const handleTaxChange = (val: number) => {
    const tax = Math.max(0, val);
    const subtotal = formData.subtotal || 0;
    const tip = formData.tip || 0;
    setFormData({
      ...formData,
      tax,
      total: parseFloat((subtotal + tax + tip).toFixed(2)),
    });
  };

  const handleTipChange = (val: number) => {
    const tip = Math.max(0, val);
    const subtotal = formData.subtotal || 0;
    const tax = formData.tax || 0;
    setFormData({
      ...formData,
      tip,
      total: parseFloat((subtotal + tax + tip).toFixed(2)),
    });
  };

  const handleAddTag = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && newTag.trim()) {
      e.preventDefault();
      const formatted = newTag.startsWith("#") ? newTag.trim() : `#${newTag.trim()}`;
      if (!formData.tags.includes(formatted)) {
        setFormData({
          ...formData,
          tags: [...formData.tags, formatted],
        });
      }
      setNewTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData({
      ...formData,
      tags: formData.tags.filter((t) => t !== tagToRemove),
    });
  };

  const handleCopyRaw = () => {
    if (formData.rawText) {
      navigator.clipboard.writeText(formData.rawText);
      setCopiedRaw(true);
      setTimeout(() => setCopiedRaw(false), 2000);
    }
  };

  // Math consistency check
  const mathMatches =
    Math.abs(formData.total - ((formData.subtotal || 0) + (formData.tax || 0) + (formData.tip || 0))) < 0.05;

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
      <div className="relative bg-surface rounded-2xl max-w-2xl w-full my-8 border border-hairline shadow-2xl flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="p-4 sm:p-5 border-b border-hairline flex items-center justify-between gap-3 bg-surface sticky top-0 z-10 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-income-bg border border-income-border flex items-center justify-center text-primary">
              <Sparkles className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base sm:text-lg font-bold text-ink">
                  {formData.merchant || "Receipt Verification"}
                </h3>
                <span className="px-2 py-0.5 rounded-full text-[11px] font-bold bg-income-bg text-income border border-income-border font-mono">
                  {formData.confidence || 95}% OCR Confidence
                </span>
              </div>
              <p className="text-xs text-ink-muted">
                Review and refine auto-extracted fields before saving to your ledger.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-canvas transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Duplicate Alert Banner */}
        {duplicateReceipt && (
          <div className="mx-4 sm:mx-6 mt-4 p-3.5 rounded-xl bg-warning-bg border border-warning-border flex items-start gap-3 text-xs text-warning">
            <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5" />
            <div className="flex-1">
              <span className="font-bold">Potential Duplicate Detected:</span> Another receipt for{" "}
              <strong>{duplicateReceipt.merchant}</strong> on <strong>{duplicateReceipt.date}</strong> for{" "}
              <strong>${duplicateReceipt.total.toFixed(2)}</strong> already exists in your ledger.
            </div>
          </div>
        )}

        {/* Tab Selector */}
        <div className="flex items-center gap-2 px-4 sm:px-6 pt-3 border-b border-hairline text-xs">
          <button
            type="button"
            onClick={() => setActiveTab("fields")}
            className={`pb-2.5 font-bold transition-all border-b-2 ${
              activeTab === "fields"
                ? "border-primary text-primary"
                : "border-transparent text-ink-muted hover:text-ink"
            }`}
          >
            Extracted Fields
          </button>
          {formData.rawText && (
            <button
              type="button"
              onClick={() => setActiveTab("rawText")}
              className={`pb-2.5 font-bold transition-all border-b-2 ${
                activeTab === "rawText"
                  ? "border-primary text-primary"
                  : "border-transparent text-ink-muted hover:text-ink"
              }`}
            >
              Raw OCR Text
            </button>
          )}
          {formData.imageUrl && (
            <button
              type="button"
              onClick={() => setActiveTab("image")}
              className={`pb-2.5 font-bold transition-all border-b-2 ${
                activeTab === "image"
                  ? "border-primary text-primary"
                  : "border-transparent text-ink-muted hover:text-ink"
              }`}
            >
              Receipt Image
            </button>
          )}
        </div>

        {/* Modal Body */}
        <div className="p-4 sm:p-6 overflow-y-auto flex-1 space-y-4 text-xs sm:text-sm">
          {activeTab === "fields" && (
            <>
              {/* Row 1: Merchant & Date */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ink-secondary mb-1 flex items-center justify-between">
                    <span>Merchant / Vendor Name</span>
                    {formData.fieldConfidence?.merchant && (
                      <span className="text-[10px] text-primary font-mono">
                        {formData.fieldConfidence.merchant}% match
                      </span>
                    )}
                  </label>
                  <div className="relative">
                    <Building2 className="w-4 h-4 text-ink-muted absolute left-3 top-2.5" />
                    <input
                      type="text"
                      value={formData.merchant}
                      onChange={(e) => setFormData({ ...formData, merchant: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-hairline-strong bg-canvas text-ink text-xs sm:text-sm focus:border-primary focus:outline-none"
                      placeholder="e.g. Starbucks Coffee"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink-secondary mb-1 flex items-center justify-between">
                    <span>Transaction Date</span>
                    {formData.fieldConfidence?.date && (
                      <span className="text-[10px] text-primary font-mono">
                        {formData.fieldConfidence.date}% match
                      </span>
                    )}
                  </label>
                  <div className="relative">
                    <Calendar className="w-4 h-4 text-ink-muted absolute left-3 top-2.5" />
                    <input
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full pl-9 pr-3 py-2 rounded-lg border border-hairline-strong bg-canvas text-ink text-xs sm:text-sm focus:border-primary focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Row 2: Amounts (Subtotal, Tax, Tip, Total) */}
              <div className="p-4 rounded-xl bg-canvas border border-hairline space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider text-ink font-mono">
                    Financial Breakdown
                  </span>
                  <span
                    className={`text-[11px] font-semibold flex items-center gap-1 ${
                      mathMatches ? "text-income" : "text-warning"
                    }`}
                  >
                    {mathMatches ? (
                      <>
                        <CheckCircle2 className="w-3.5 h-3.5" />
                        <span>Math Balanced</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Check Subtotal + Tax = Total</span>
                      </>
                    )}
                  </span>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  <div>
                    <label className="block text-[11px] text-ink-muted mb-1">Subtotal ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.subtotal}
                      onChange={(e) => handleSubtotalChange(parseFloat(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-hairline-strong bg-surface text-ink text-xs font-semibold focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-ink-muted mb-1">Tax Paid ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.tax}
                      onChange={(e) => handleTaxChange(parseFloat(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-hairline-strong bg-surface text-ink text-xs font-semibold focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] text-ink-muted mb-1">Tip ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.tip || 0}
                      onChange={(e) => handleTipChange(parseFloat(e.target.value) || 0)}
                      className="w-full px-2.5 py-1.5 rounded-lg border border-hairline-strong bg-surface text-ink text-xs font-semibold focus:border-primary focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-[11px] font-bold text-primary mb-1">Grand Total ($)</label>
                    <input
                      type="number"
                      step="0.01"
                      value={formData.total}
                      onChange={(e) => setFormData({ ...formData, total: parseFloat(e.target.value) || 0 })}
                      className="w-full px-2.5 py-1.5 rounded-lg border-2 border-primary bg-surface text-ink text-xs font-bold focus:outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* Row 3: Category & Tax Deduction Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-ink-secondary mb-1">
                    Expense Category
                  </label>
                  <select
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value as ExpenseCategory })}
                    className="w-full px-3 py-2 rounded-lg border border-hairline-strong bg-canvas text-ink text-xs sm:text-sm focus:border-primary focus:outline-none"
                  >
                    {EXPENSE_CATEGORIES.map((cat) => (
                      <option key={cat} value={cat}>
                        {cat}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink-secondary mb-1">
                    Tax Deduction Category (Schedule C)
                  </label>
                  <select
                    value={formData.taxCategory}
                    onChange={(e) =>
                      setFormData({ ...formData, taxCategory: e.target.value as TaxDeductionCategory })
                    }
                    className="w-full px-3 py-2 rounded-lg border border-hairline-strong bg-canvas text-ink text-xs sm:text-sm focus:border-primary focus:outline-none"
                  >
                    {TAX_CATEGORIES.map((tCat) => (
                      <option key={tCat} value={tCat}>
                        {tCat}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Row 4: Classification & Tax Year */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-center">
                <div>
                  <label className="block text-xs font-semibold text-ink-secondary mb-1">
                    Classification
                  </label>
                  <div className="flex items-center gap-2 p-1 rounded-lg border border-hairline bg-canvas">
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, isBusiness: true })}
                      className={`flex-1 py-1 rounded text-xs font-semibold transition-colors ${
                        formData.isBusiness
                          ? "bg-primary text-white shadow-xs"
                          : "text-ink-muted hover:text-ink"
                      }`}
                    >
                      Business (1099)
                    </button>
                    <button
                      type="button"
                      onClick={() => setFormData({ ...formData, isBusiness: false })}
                      className={`flex-1 py-1 rounded text-xs font-semibold transition-colors ${
                        !formData.isBusiness
                          ? "bg-primary text-white shadow-xs"
                          : "text-ink-muted hover:text-ink"
                      }`}
                    >
                      Personal
                    </button>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink-secondary mb-1">
                    Tax Year
                  </label>
                  <select
                    value={formData.taxYear}
                    onChange={(e) => setFormData({ ...formData, taxYear: e.target.value })}
                    className="w-full px-3 py-2 rounded-lg border border-hairline-strong bg-canvas text-ink text-xs sm:text-sm focus:border-primary focus:outline-none font-mono"
                  >
                    <option value="2026">2026 Tax Year</option>
                    <option value="2025">2025 Tax Year</option>
                    <option value="2024">2024 Tax Year</option>
                    <option value="2023">2023 Tax Year</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-ink-secondary mb-1">
                    Payment Method
                  </label>
                  <input
                    type="text"
                    value={formData.paymentMethod || ""}
                    onChange={(e) => setFormData({ ...formData, paymentMethod: e.target.value })}
                    placeholder="e.g. Visa *4921"
                    className="w-full px-3 py-2 rounded-lg border border-hairline-strong bg-canvas text-ink text-xs sm:text-sm focus:border-primary focus:outline-none"
                  >
                  </input>
                </div>
              </div>

              {/* Row 5: Tags & Notes */}
              <div>
                <label className="block text-xs font-semibold text-ink-secondary mb-1">
                  Tags (Press Enter to add)
                </label>
                <div className="flex flex-wrap items-center gap-1.5 p-2 rounded-lg border border-hairline bg-canvas min-h-[42px]">
                  {formData.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-2 py-0.5 rounded bg-surface border border-hairline text-primary text-xs font-semibold flex items-center gap-1"
                    >
                      <span>{tag}</span>
                      <button
                        type="button"
                        onClick={() => handleRemoveTag(tag)}
                        className="text-ink-muted hover:text-expense"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  <input
                    type="text"
                    value={newTag}
                    onChange={(e) => setNewTag(e.target.value)}
                    onKeyDown={handleAddTag}
                    placeholder="#client-meeting, #supplies..."
                    className="flex-1 bg-transparent text-xs text-ink placeholder:text-ink-muted focus:outline-none min-w-[120px]"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-ink-secondary mb-1">
                  Notes & Purpose
                </label>
                <textarea
                  rows={2}
                  value={formData.notes || ""}
                  onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  placeholder="e.g. Team lunch with prospective client discussing Q4 contract."
                  className="w-full p-2.5 rounded-lg border border-hairline-strong bg-canvas text-ink text-xs sm:text-sm focus:border-primary focus:outline-none"
                />
              </div>
            </>
          )}

          {activeTab === "rawText" && (
            <div className="relative">
              <button
                type="button"
                onClick={handleCopyRaw}
                className="absolute top-2 right-2 px-2.5 py-1 rounded bg-surface border border-hairline text-ink text-xs font-semibold flex items-center gap-1.5 hover:bg-canvas shadow-xs"
              >
                {copiedRaw ? <Check className="w-3.5 h-3.5 text-income" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copiedRaw ? "Copied" : "Copy Text"}</span>
              </button>
              <pre className="p-4 rounded-xl bg-canvas border border-hairline font-mono text-xs text-ink-secondary whitespace-pre-wrap leading-relaxed overflow-x-auto max-h-72">
                {formData.rawText}
              </pre>
            </div>
          )}

          {activeTab === "image" && formData.imageUrl && (
            <div className="flex justify-center p-4 rounded-xl bg-canvas border border-hairline">
              <img
                src={formData.imageUrl}
                alt="Receipt Full Preview"
                className="max-h-80 object-contain rounded-lg border border-hairline shadow-sm"
              />
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 sm:p-5 border-t border-hairline bg-surface flex items-center justify-between gap-3 rounded-b-2xl">
          {onDelete ? (
            <button
              type="button"
              onClick={() => onDelete(formData.id)}
              className="px-3 py-2 rounded-lg text-expense hover:bg-expense-bg border border-transparent hover:border-expense-border text-xs font-semibold flex items-center gap-1.5 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              <span>Delete Receipt</span>
            </button>
          ) : (
            <div />
          )}

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded-lg border border-hairline text-xs font-semibold text-ink hover:bg-canvas transition-colors"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={() => {
                onSave(formData);
                onClose();
              }}
              className="px-6 py-2 rounded-lg bg-primary hover:bg-primary-active text-white text-xs sm:text-sm font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Save className="w-4 h-4" />
              <span>Save to Expenseliy Ledger</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
