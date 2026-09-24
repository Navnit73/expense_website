"use client";

import React, { useState } from "react";
import {
  Scan,
  Receipt,
  BarChart3,
  FileCheck,
  Sparkles,
  ShieldCheck,
  Zap,
  Tag,
  FolderOpen,
  ArrowRight,
  Plus,
  Layers,
  CheckCircle2,
  RefreshCw,
} from "lucide-react";
import { ReceiptUploader } from "./ReceiptUploader";
import { ReceiptFieldEditorModal } from "./ReceiptFieldEditorModal";
import { ReceiptTimelineView } from "./ReceiptTimelineView";
import { ReceiptAnalyticsWidget } from "./ReceiptAnalyticsWidget";
import { ReceiptExportModal } from "./ReceiptExportModal";
import { useReceiptStore } from "@/lib/receipt-engine/receipt-store";
import { ReceiptItem, OCRScanResult } from "@/lib/receipt-engine/types";

export type ReceiptEngineVariant =
  | "scanner"
  | "tracker"
  | "scanner-app"
  | "organizer"
  | "tracking-app"
  | "expense-app"
  | "taxes-scanner"
  | "small-business"
  | "categorizer"
  | "taxes-tracker";

interface UnifiedReceiptEngineProps {
  variant?: ReceiptEngineVariant;
  initialTab?: "scan" | "tracker" | "reports" | "tax";
  customHeadline?: string;
  customSubheadline?: string;
  highlightFeatures?: string[];
}

export function UnifiedReceiptEngine({
  variant = "scanner",
  initialTab = "scan",
  customHeadline,
  customSubheadline,
  highlightFeatures = [
    "100% Client-Side OCR (Zero server uploads)",
    "Instant Merchant, Date & Tax Extraction",
    "Auto-Expense Categorization",
    "Export to CSV & PDF Ledgers",
  ],
}: UnifiedReceiptEngineProps) {
  const {
    receipts,
    isLoaded,
    selectedReceipt,
    setSelectedReceipt,
    addReceipt,
    updateReceipt,
    deleteReceipt,
    deleteBulkReceipts,
    resetToSampleData,
    checkDuplicate,
  } = useReceiptStore();

  const [activeTab, setActiveTab] = useState<"scan" | "tracker" | "reports" | "tax">(
    initialTab || (variant === "tracker" || variant === "organizer" ? "tracker" : "scan")
  );
  const [isScanning, setIsScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState({ percent: 0, message: "" });
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const [isExportOpen, setIsExportOpen] = useState(false);
  const [pendingScanReceipt, setPendingScanReceipt] = useState<ReceiptItem | null>(null);
  const [duplicateMatch, setDuplicateMatch] = useState<ReceiptItem | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Called when OCR completes on image
  const handleScanComplete = (result: OCRScanResult, previewUrl?: string, fileName?: string) => {
    const isBusiness =
      variant === "taxes-scanner" ||
      variant === "small-business" ||
      variant === "expense-app"
        ? true
        : result.taxCategory.startsWith("Schedule C");

    const newScanItem: ReceiptItem = {
      id: `temp-${Date.now()}`,
      merchant: result.merchant,
      date: result.date,
      subtotal: result.subtotal,
      tax: result.tax,
      tip: result.tip,
      total: result.total,
      currency: result.currency,
      category: result.category,
      taxCategory: result.taxCategory,
      isBusiness,
      taxYear: "2026",
      paymentMethod: result.paymentMethod,
      status: "verified",
      tags: isBusiness ? ["#tax-deductible", "#verified-ocr"] : ["#personal", "#verified-ocr"],
      notes: `Auto-extracted from ${fileName || "uploaded receipt"} via OCR engine.`,
      confidence: result.confidence,
      fieldConfidence: result.fieldConfidence,
      rawText: result.rawText,
      imageUrl: previewUrl,
      fileName,
      createdAt: new Date().toISOString(),
    };

    // Check for duplicate
    const dup = checkDuplicate(newScanItem.merchant, newScanItem.date, newScanItem.total);
    setDuplicateMatch(dup || null);

    setPendingScanReceipt(newScanItem);
    setIsEditorOpen(true);
  };

  // Save reviewed receipt
  const handleSaveReceipt = (item: ReceiptItem) => {
    if (item.id.startsWith("temp-")) {
      const { id, createdAt, ...rest } = item;
      const saved = addReceipt(rest);
      showToast(`Receipt for "${saved.merchant}" ($${saved.total.toFixed(2)}) saved to ledger!`);
    } else {
      updateReceipt(item.id, item);
      showToast(`Receipt for "${item.merchant}" updated successfully!`);
    }
    setPendingScanReceipt(null);
    setDuplicateMatch(null);
  };

  const handleOpenEdit = (item: ReceiptItem) => {
    setSelectedReceipt(item);
    setPendingScanReceipt(item);
    const dup = checkDuplicate(item.merchant, item.date, item.total, item.id);
    setDuplicateMatch(dup || null);
    setIsEditorOpen(true);
  };

  return (
    <div className="w-full bg-surface border border-hairline rounded-3xl shadow-xl overflow-hidden">
      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-4 py-3 rounded-xl bg-ink text-surface text-xs font-semibold shadow-2xl flex items-center gap-2 border border-hairline animate-bounce">
          <CheckCircle2 className="w-4 h-4 text-primary" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* Top Banner Toolbar */}
      <div className="p-4 sm:p-6 bg-canvas border-b border-hairline flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-income animate-ping" />
            <span className="text-[11px] font-mono uppercase font-bold text-income tracking-wider">
              Expenseliy Client-Side Engine v2.4
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-extrabold text-ink tracking-tight">
            {customHeadline || "Smart Receipt OCR & Tracking Workspace"}
          </h2>
          <p className="text-xs sm:text-sm text-ink-secondary mt-0.5">
            {customSubheadline ||
              "Scan, categorize, track, and organize receipts in real time with zero latency."}
          </p>
        </div>

        {/* Tab Controls */}
        <div className="flex items-center gap-1.5 p-1 bg-surface rounded-2xl border border-hairline self-start md:self-auto overflow-x-auto max-w-full">
          <button
            type="button"
            onClick={() => setActiveTab("scan")}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === "scan"
                ? "bg-primary text-white shadow-xs"
                : "text-ink-secondary hover:text-ink hover:bg-canvas"
            }`}
          >
            <Scan className="w-3.5 h-3.5" />
            <span>OCR Scanner</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("tracker")}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === "tracker"
                ? "bg-primary text-white shadow-xs"
                : "text-ink-secondary hover:text-ink hover:bg-canvas"
            }`}
          >
            <Receipt className="w-3.5 h-3.5" />
            <span>Tracker ({receipts.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("reports")}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === "reports"
                ? "bg-primary text-white shadow-xs"
                : "text-ink-secondary hover:text-ink hover:bg-canvas"
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>Analytics</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab("tax")}
            className={`px-3 sm:px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shrink-0 ${
              activeTab === "tax"
                ? "bg-primary text-white shadow-xs"
                : "text-ink-secondary hover:text-ink hover:bg-canvas"
            }`}
          >
            <FileCheck className="w-3.5 h-3.5" />
            <span>Tax Summary</span>
          </button>
        </div>
      </div>

      {/* Feature Highlights Pills */}
      <div className="px-4 sm:px-6 py-2.5 bg-homepage-mintcream/60 dark:bg-surface-raised/40 border-b border-hairline flex flex-wrap items-center gap-y-2 gap-x-6 text-[11px] text-ink-muted">
        {highlightFeatures.map((feat, fIdx) => (
          <div key={fIdx} className="flex items-center gap-1.5">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
            <span>{feat}</span>
          </div>
        ))}
      </div>

      {/* Tab Panels */}
      <div className="p-4 sm:p-8 bg-surface">
        {activeTab === "scan" && (
          <div className="space-y-8">
            <ReceiptUploader
              onScanComplete={handleScanComplete}
              isScanning={isScanning}
              setIsScanning={setIsScanning}
              scanProgress={scanProgress}
              setScanProgress={setScanProgress}
            />

            {/* Recent Scanned Receipts Teaser */}
            <div className="pt-6 border-t border-hairline">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-sm font-bold text-ink flex items-center gap-2">
                  <Receipt className="w-4 h-4 text-primary" />
                  <span>Recent Receipts in Your Active Ledger</span>
                </h3>
                <button
                  type="button"
                  onClick={() => setActiveTab("tracker")}
                  className="text-xs text-primary hover:underline font-semibold flex items-center gap-1"
                >
                  <span>View All {receipts.length}</span>
                  <span>→</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {receipts.slice(0, 3).map((r) => (
                  <div
                    key={r.id}
                    onClick={() => handleOpenEdit(r)}
                    className="p-3.5 rounded-xl border border-hairline bg-canvas hover:border-primary/60 cursor-pointer transition-colors flex items-center justify-between"
                  >
                    <div>
                      <div className="text-xs font-bold text-ink">{r.merchant}</div>
                      <div className="text-[11px] text-ink-muted font-mono">
                        {r.date} • {r.category}
                      </div>
                    </div>
                    <span className="text-xs font-mono font-bold text-ink">
                      ${r.total.toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "tracker" && (
          <ReceiptTimelineView
            receipts={receipts}
            onSelectReceipt={handleOpenEdit}
            onDeleteReceipt={(id) => {
              deleteReceipt(id);
              showToast("Receipt deleted.");
            }}
            onDeleteBulk={(ids) => {
              deleteBulkReceipts(ids);
              showToast(`${ids.length} receipts deleted.`);
            }}
            onAddNewScan={() => setActiveTab("scan")}
            onOpenExport={() => setIsExportOpen(true)}
          />
        )}

        {activeTab === "reports" && (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-bold text-ink">Expense & Receipt Insights</h3>
                <p className="text-xs text-ink-secondary">
                  Real-time aggregation of your verified receipts and monthly variances.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsExportOpen(true)}
                className="px-4 py-2 rounded-xl bg-primary text-white text-xs font-bold shadow-xs hover:bg-primary-active"
              >
                Download Ledger CSV
              </button>
            </div>

            <ReceiptAnalyticsWidget receipts={receipts} />
          </div>
        )}

        {activeTab === "tax" && (
          <div className="space-y-6">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <h3 className="text-base font-bold text-ink">Tax Preparation & Schedule C Deductions</h3>
                <p className="text-xs text-ink-secondary">
                  Review tax-deductible expenses grouped by IRS Schedule C categories.
                </p>
              </div>
              <button
                type="button"
                onClick={() => setIsExportOpen(true)}
                className="px-4 py-2 rounded-xl bg-sky text-white text-xs font-bold shadow-xs hover:bg-sky/90"
              >
                Export Tax Package CSV
              </button>
            </div>

            <ReceiptAnalyticsWidget receipts={receipts} taxYear="2026" />

            {/* Disclaimer */}
            <div className="p-4 rounded-xl bg-canvas border border-hairline text-xs text-ink-muted leading-relaxed">
              <strong>Recordkeeping Notice:</strong> Expenseliy is a financial record-keeping and
              OCR ingestion tool. It assists with document retention and category organization.
              Deductibility determinations should be confirmed with your certified CPA or tax advisor
              under IRS Rev. Proc. 97-22 guidelines.
            </div>
          </div>
        )}
      </div>

      {/* Field Review / Edit Modal */}
      <ReceiptFieldEditorModal
        receipt={pendingScanReceipt}
        isOpen={isEditorOpen}
        onClose={() => {
          setIsEditorOpen(false);
          setPendingScanReceipt(null);
          setDuplicateMatch(null);
        }}
        onSave={handleSaveReceipt}
        onDelete={
          pendingScanReceipt && !pendingScanReceipt.id.startsWith("temp-")
            ? (id) => {
                deleteReceipt(id);
                setIsEditorOpen(false);
                showToast("Receipt deleted.");
              }
            : undefined
        }
        duplicateReceipt={duplicateMatch}
      />

      {/* Export Modal */}
      <ReceiptExportModal
        receipts={receipts}
        isOpen={isExportOpen}
        onClose={() => setIsExportOpen(false)}
      />
    </div>
  );
}
