"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Hash,
  Copy,
  Check,
  Sparkles,
  ArrowRight,
  Sliders,
  RefreshCw,
  FileSpreadsheet,
} from "lucide-react";

interface InvoiceNumberGeneratorWidgetProps {
  onUseNumber?: (num: string) => void;
}

export function InvoiceNumberGeneratorWidget({ onUseNumber }: InvoiceNumberGeneratorWidgetProps) {
  const [prefix, setPrefix] = useState("INV");
  const [includeYear, setIncludeYear] = useState(true);
  const [yearFormat, setYearFormat] = useState<"YYYY" | "YY">("YYYY");
  const [delimiter, setDelimiter] = useState("-");
  const [startNumber, setStartNumber] = useState(1001);
  const [padding, setPadding] = useState(4);
  const [batchCount, setBatchCount] = useState(10);
  const [copiedBatch, setCopiedBatch] = useState(false);
  const [copiedSingle, setCopiedSingle] = useState<string | null>(null);

  const currentYear = new Date().getFullYear();
  const yearStr = yearFormat === "YYYY" ? `${currentYear}` : `${currentYear}`.slice(-2);

  const generatedNumbers = useMemo(() => {
    const list: string[] = [];
    for (let i = 0; i < batchCount; i++) {
      const num = startNumber + i;
      const paddedNum = String(num).padStart(padding, "0");
      let formatted = prefix;
      if (includeYear) {
        formatted += `${delimiter}${yearStr}`;
      }
      formatted += `${delimiter}${paddedNum}`;
      list.push(formatted);
    }
    return list;
  }, [prefix, includeYear, yearStr, delimiter, startNumber, padding, batchCount]);

  const handleCopyBatch = () => {
    navigator.clipboard.writeText(generatedNumbers.join("\n"));
    setCopiedBatch(true);
    setTimeout(() => setCopiedBatch(false), 2000);
  };

  const handleCopySingle = (num: string) => {
    navigator.clipboard.writeText(num);
    setCopiedSingle(num);
    setTimeout(() => setCopiedSingle(null), 2000);
  };

  return (
    <div className="p-6 sm:p-8 rounded-3xl bg-surface border border-hairline shadow-xl space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-6 border-b border-hairline">
        <div>
          <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-income-bg text-income border border-income-border text-xs font-semibold uppercase tracking-wider mb-2 font-mono">
            <Hash className="w-3.5 h-3.5" />
            <span>Sequential Number Generator</span>
          </div>
          <h3 className="text-xl font-bold text-ink tracking-tight">
            Professional Invoice Numbering System
          </h3>
          <p className="text-xs sm:text-sm text-ink-secondary">
            Generate standardized, sequential, audit-compliant invoice numbers for your business.
          </p>
        </div>

        <button
          type="button"
          onClick={handleCopyBatch}
          className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-active text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all self-start sm:self-auto"
        >
          {copiedBatch ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
          <span>{copiedBatch ? "Copied List!" : `Copy ${batchCount} Numbers`}</span>
        </button>
      </div>

      {/* Generator Form Controls */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        {/* Prefix */}
        <div>
          <label className="block text-xs font-semibold text-ink-secondary mb-1">Prefix</label>
          <select
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-hairline bg-canvas text-ink text-xs font-mono font-bold focus:border-primary focus:outline-none"
          >
            <option value="INV">INV</option>
            <option value="BILL">BILL</option>
            <option value="REC">REC</option>
            <option value="EXP">EXP</option>
            <option value="PO">PO</option>
            <option value="SVC">SVC</option>
            <option value="EST">EST</option>
          </select>
        </div>

        {/* Include Year */}
        <div>
          <label className="block text-xs font-semibold text-ink-secondary mb-1">Year Tag</label>
          <select
            value={includeYear ? yearFormat : "NONE"}
            onChange={(e) => {
              if (e.target.value === "NONE") {
                setIncludeYear(false);
              } else {
                setIncludeYear(true);
                setYearFormat(e.target.value as any);
              }
            }}
            className="w-full px-3 py-2 rounded-xl border border-hairline bg-canvas text-ink text-xs font-mono font-semibold focus:border-primary focus:outline-none"
          >
            <option value="YYYY">YYYY ({currentYear})</option>
            <option value="YY">YY ({`${currentYear}`.slice(-2)})</option>
            <option value="NONE">No Year</option>
          </select>
        </div>

        {/* Delimiter */}
        <div>
          <label className="block text-xs font-semibold text-ink-secondary mb-1">Separator</label>
          <select
            value={delimiter}
            onChange={(e) => setDelimiter(e.target.value)}
            className="w-full px-3 py-2 rounded-xl border border-hairline bg-canvas text-ink text-xs font-mono font-bold focus:border-primary focus:outline-none"
          >
            <option value="-">Hyphen (-)</option>
            <option value="/">Slash (/)</option>
            <option value=".">Dot (.)</option>
            <option value="_">Underscore (_)</option>
          </select>
        </div>

        {/* Starting Number */}
        <div>
          <label className="block text-xs font-semibold text-ink-secondary mb-1">Start #</label>
          <input
            type="number"
            min="1"
            value={startNumber}
            onChange={(e) => setStartNumber(parseInt(e.target.value) || 1)}
            className="w-full px-3 py-2 rounded-xl border border-hairline bg-canvas text-ink text-xs font-mono font-bold focus:border-primary focus:outline-none"
          />
        </div>

        {/* Padding */}
        <div>
          <label className="block text-xs font-semibold text-ink-secondary mb-1">Zero Padding</label>
          <select
            value={padding}
            onChange={(e) => setPadding(parseInt(e.target.value) || 4)}
            className="w-full px-3 py-2 rounded-xl border border-hairline bg-canvas text-ink text-xs font-mono font-semibold focus:border-primary focus:outline-none"
          >
            <option value="3">3 digits (001)</option>
            <option value="4">4 digits (0001)</option>
            <option value="5">5 digits (00001)</option>
            <option value="6">6 digits (000001)</option>
          </select>
        </div>

        {/* Batch Count */}
        <div>
          <label className="block text-xs font-semibold text-ink-secondary mb-1">Batch Count</label>
          <select
            value={batchCount}
            onChange={(e) => setBatchCount(parseInt(e.target.value) || 10)}
            className="w-full px-3 py-2 rounded-xl border border-hairline bg-canvas text-ink text-xs font-mono font-semibold focus:border-primary focus:outline-none"
          >
            <option value="10">10 Numbers</option>
            <option value="25">25 Numbers</option>
            <option value="50">50 Numbers</option>
          </select>
        </div>
      </div>

      {/* Generated Sequence Display Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-2.5">
        {generatedNumbers.map((num, idx) => (
          <div
            key={num}
            className="p-3 rounded-xl border border-hairline bg-canvas hover:border-primary/60 flex items-center justify-between transition-colors group"
          >
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-mono text-ink-muted">#{idx + 1}</span>
              <span className="text-xs font-mono font-bold text-ink">{num}</span>
            </div>

            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => handleCopySingle(num)}
                className="p-1 rounded text-ink-muted hover:text-ink hover:bg-surface"
                title="Copy single number"
              >
                {copiedSingle === num ? (
                  <Check className="w-3.5 h-3.5 text-income" />
                ) : (
                  <Copy className="w-3.5 h-3.5" />
                )}
              </button>

              {onUseNumber && (
                <button
                  type="button"
                  onClick={() => onUseNumber(num)}
                  className="px-2 py-0.5 rounded text-[10px] font-bold bg-income-bg text-income hover:bg-income hover:text-white transition-colors"
                >
                  Use
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Funnel Callout to Main Invoice Generator */}
      <div className="p-5 rounded-2xl bg-homepage-mintcream dark:bg-surface-raised border border-income-border flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h4 className="text-sm font-bold text-ink">
            Need a complete invoice for number #{generatedNumbers[0]}?
          </h4>
          <p className="text-xs text-ink-secondary mt-0.5">
            Create, download, and print professional invoices with custom logos and automatic math calculations.
          </p>
        </div>

        <Link
          href="/invoice-generator"
          className="px-5 py-2.5 rounded-xl bg-primary hover:bg-primary-active text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all self-start sm:self-auto shrink-0"
        >
          <span>Create Complete Invoice Free</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
