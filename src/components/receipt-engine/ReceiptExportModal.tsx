"use client";

import React, { useState } from "react";
import {
  X,
  FileSpreadsheet,
  FileText,
  Printer,
  Copy,
  Check,
  Download,
  Receipt,
  FileCheck2,
  Calendar,
} from "lucide-react";
import { ReceiptItem } from "@/lib/receipt-engine/types";
import { exportReceiptsToCSV, exportTaxSummaryCSV } from "@/lib/receipt-engine/receipt-store";

interface ReceiptExportModalProps {
  receipts: ReceiptItem[];
  isOpen: boolean;
  onClose: () => void;
}

export function ReceiptExportModal({ receipts, isOpen, onClose }: ReceiptExportModalProps) {
  const [copiedJson, setCopiedJson] = useState(false);
  const [selectedTaxYear, setSelectedTaxYear] = useState("2026");

  if (!isOpen) return null;

  const handleCopyJSON = () => {
    navigator.clipboard.writeText(JSON.stringify(receipts, null, 2));
    setCopiedJson(true);
    setTimeout(() => setCopiedJson(false), 2000);
  };

  const handlePrintStatement = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-xs flex items-center justify-center p-4">
      <div className="relative bg-surface rounded-2xl max-w-lg w-full border border-hairline shadow-2xl overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-5 border-b border-hairline flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-income-bg text-primary flex items-center justify-center border border-income-border">
              <Download className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-ink">Export Receipts & Ledgers</h3>
              <p className="text-xs text-ink-muted">Download records for accounting, audits, or taxes</p>
            </div>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="p-1.5 rounded-lg text-ink-muted hover:text-ink hover:bg-canvas"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Export Options */}
        <div className="p-6 space-y-4">
          {/* Option 1: Standard CSV */}
          <div className="p-4 rounded-xl border border-hairline hover:border-primary/60 bg-canvas transition-colors flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <FileSpreadsheet className="w-5 h-5 text-primary mt-0.5" />
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-ink">Full Receipt Ledger (CSV)</h4>
                <p className="text-[11px] text-ink-secondary">
                  Includes line items, merchants, categories, tax breakdowns, and notes ({receipts.length} items).
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => exportReceiptsToCSV(receipts)}
              className="px-3.5 py-1.5 rounded-lg bg-primary hover:bg-primary-active text-white text-xs font-semibold shrink-0 shadow-xs transition-colors"
            >
              Download CSV
            </button>
          </div>

          {/* Option 2: Tax Summary CSV */}
          <div className="p-4 rounded-xl border border-hairline hover:border-sky/60 bg-canvas transition-colors space-y-3">
            <div className="flex items-start justify-between gap-4">
              <div className="flex items-start gap-3">
                <FileCheck2 className="w-5 h-5 text-sky mt-0.5" />
                <div>
                  <h4 className="text-xs sm:text-sm font-bold text-ink">
                    Tax Deduction Summary Report (CSV)
                  </h4>
                  <p className="text-[11px] text-ink-secondary">
                    Aggregated Schedule C write-offs (Meals 50%, Office, Travel, Software).
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center justify-between pt-2 border-t border-hairline/60">
              <div className="flex items-center gap-2">
                <span className="text-[11px] text-ink-muted font-mono">Tax Year:</span>
                <select
                  value={selectedTaxYear}
                  onChange={(e) => setSelectedTaxYear(e.target.value)}
                  className="px-2 py-1 rounded bg-surface border border-hairline text-xs font-mono text-ink"
                >
                  <option value="2026">2026</option>
                  <option value="2025">2025</option>
                  <option value="2024">2024</option>
                </select>
              </div>

              <button
                type="button"
                onClick={() => exportTaxSummaryCSV(receipts, selectedTaxYear)}
                className="px-3.5 py-1.5 rounded-lg bg-sky hover:bg-sky/90 text-white text-xs font-semibold shadow-xs transition-colors"
              >
                Download Tax CSV
              </button>
            </div>
          </div>

          {/* Option 3: Print Statement / PDF */}
          <div className="p-4 rounded-xl border border-hairline hover:border-ink-muted bg-canvas transition-colors flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <Printer className="w-5 h-5 text-ink-secondary mt-0.5" />
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-ink">Printable Statement / PDF</h4>
                <p className="text-[11px] text-ink-secondary">
                  Open clean browser print dialog formatted for receipts expense report.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handlePrintStatement}
              className="px-3.5 py-1.5 rounded-lg border border-hairline-strong bg-surface hover:bg-canvas text-ink text-xs font-semibold shrink-0 transition-colors"
            >
              Print / PDF
            </button>
          </div>

          {/* Option 4: Raw JSON */}
          <div className="p-4 rounded-xl border border-hairline hover:border-ink-muted bg-canvas transition-colors flex items-center justify-between gap-4">
            <div className="flex items-start gap-3">
              <FileText className="w-5 h-5 text-ink-muted mt-0.5" />
              <div>
                <h4 className="text-xs sm:text-sm font-bold text-ink">JSON Ledger Payload</h4>
                <p className="text-[11px] text-ink-secondary">
                  Developer raw JSON payload with all OCR metadata and confidence scores.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={handleCopyJSON}
              className="px-3.5 py-1.5 rounded-lg border border-hairline bg-surface hover:bg-canvas text-ink text-xs font-semibold shrink-0 flex items-center gap-1 transition-colors"
            >
              {copiedJson ? <Check className="w-3.5 h-3.5 text-income" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copiedJson ? "Copied" : "Copy JSON"}</span>
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 bg-canvas border-t border-hairline flex items-center justify-end">
          <button
            type="button"
            onClick={onClose}
            className="px-5 py-2 rounded-lg border border-hairline bg-surface text-ink text-xs font-semibold hover:bg-canvas transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
