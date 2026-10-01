"use client";

import React, { useState } from "react";
import {
  Percent,
  DollarSign,
  RotateCcw,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  ArrowRightLeft,
} from "lucide-react";

const TAX_RATES = [
  { label: "UK VAT (20%)", rate: 20 },
  { label: "EU Standard (Germany 19%)", rate: 19 },
  { label: "EU (France 20%)", rate: 20 },
  { label: "EU (Ireland 23%)", rate: 23 },
  { label: "Canada GST (5%)", rate: 5 },
  { label: "Canada HST (13%)", rate: 13 },
  { label: "Australia GST (10%)", rate: 10 },
  { label: "US California (7.25%)", rate: 7.25 },
  { label: "US New York (8.875%)", rate: 8.875 },
  { label: "US Texas (8.25%)", rate: 8.25 },
];

export function SalesTaxVatCalculator({ className = "" }: { className?: string }) {
  const [mode, setMode] = useState<"add" | "extract">("add");
  const [amount, setAmount] = useState<number>(100);
  const [taxRate, setTaxRate] = useState<number>(20);
  const [currency, setCurrency] = useState<string>("$");
  const [copied, setCopied] = useState<boolean>(false);

  // Calculations
  let netPrice = 0;
  let taxAmount = 0;
  let grossPrice = 0;

  if (mode === "add") {
    // Adding tax to net
    netPrice = amount;
    taxAmount = (netPrice * taxRate) / 100;
    grossPrice = netPrice + taxAmount;
  } else {
    // Extracting tax from gross (Reverse VAT)
    // Gross = Net * (1 + rate/100) -> Net = Gross / (1 + rate/100)
    grossPrice = amount;
    netPrice = grossPrice / (1 + taxRate / 100);
    taxAmount = grossPrice - netPrice;
  }

  const handleReset = () => {
    setAmount(100);
    setTaxRate(20);
    setMode("add");
  };

  const handleCopy = () => {
    const text = `=== Sales Tax & VAT Calculation ===
Mode: ${mode === "add" ? "Add Tax to Net Amount" : "Extract Tax from Gross Total (Reverse VAT)"}
Tax Rate: ${taxRate}%
-------------------------------------------
Net Amount (Excl. Tax): ${currency}${netPrice.toFixed(2)}
Sales Tax / VAT (${taxRate}%): ${currency}${taxAmount.toFixed(2)}
Total Gross Amount (Incl. Tax): ${currency}${grossPrice.toFixed(2)}
Calculated via Expenseliy Free Financial Tools`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className={`w-full rounded-2xl bg-surface border border-hairline shadow-sm overflow-hidden ${className}`}>
      {/* Header Bar */}
      <div className="p-6 md:p-8 bg-gradient-to-r from-income-bg/30 via-surface to-surface border-b border-hairline">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-income-bg text-income border border-income-border">
                Forward & Reverse Tax Engine
              </span>
              <span className="inline-flex items-center text-xs text-ink-muted">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-income" /> Global VAT / GST Support
              </span>
            </div>
            <h2 className="text-2xl font-bold text-ink tracking-tight">
              Sales Tax & Reverse VAT / GST Calculator
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              Add sales tax to base prices or reverse-calculate the net amount and VAT included in total receipts.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              aria-label="Currency"
              className="px-3 py-2 text-sm font-medium rounded-lg bg-surface-raised border border-hairline text-ink hover:border-income/60 focus:outline-none focus:ring-2 focus:ring-income"
            >
              <option value="$">USD ($)</option>
              <option value="€">EUR (€)</option>
              <option value="£">GBP (£)</option>
              <option value="CAD $">CAD ($)</option>
              <option value="AUD $">AUD ($)</option>
              <option value="₹">INR (₹)</option>
            </select>
            <button
              onClick={handleReset}
              className="p-2 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised border border-hairline transition-colors"
              title="Reset"
              aria-label="Reset form"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Global Preset Rates */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-ink-muted font-medium whitespace-nowrap">Presets:</span>
          {TAX_RATES.map((t) => (
            <button
              key={t.label}
              onClick={() => setTaxRate(t.rate)}
              className="px-3 py-1 rounded-md bg-surface-raised hover:bg-income-bg hover:text-income border border-hairline text-ink-secondary transition-all whitespace-nowrap font-medium"
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-6">
          {/* Mode Switcher */}
          <div className="grid grid-cols-2 gap-2 p-1 rounded-xl bg-surface-raised border border-hairline">
            <button
              type="button"
              onClick={() => setMode("add")}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                mode === "add"
                  ? "bg-surface text-ink shadow-sm border border-hairline"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              1. Add Tax (+ Net to Gross)
            </button>
            <button
              type="button"
              onClick={() => setMode("extract")}
              className={`py-2 px-3 rounded-lg text-xs font-bold transition-all ${
                mode === "extract"
                  ? "bg-surface text-ink shadow-sm border border-hairline"
                  : "text-ink-muted hover:text-ink"
              }`}
            >
              2. Extract Tax (Reverse VAT)
            </button>
          </div>

          <div className="space-y-2">
            <label htmlFor="amount-input" className="block text-sm font-semibold text-ink">
              {mode === "add" ? "Net Amount (Excluding Tax)" : "Total Gross Amount (Including Tax)"}
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted font-medium">{currency}</span>
              <input
                id="amount-input"
                type="number"
                min="0"
                step="5"
                value={amount || ""}
                onChange={(e) => setAmount(Math.max(0, Number(e.target.value) || 0))}
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-surface-raised border border-hairline text-ink font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-income"
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs">
              <label htmlFor="tax-rate-input" className="font-semibold text-ink">Tax Rate Percentage (%)</label>
              <span className="font-bold text-income">{taxRate}%</span>
            </div>
            <input
              id="tax-rate-input"
              type="number"
              min="0"
              max="100"
              step="0.25"
              value={taxRate || ""}
              onChange={(e) => setTaxRate(Math.max(0, Number(e.target.value) || 0))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-raised border border-hairline text-ink font-semibold text-sm"
            />
            <input
              type="range"
              min="0"
              max="35"
              step="0.5"
              value={Math.min(taxRate, 35)}
              onChange={(e) => setTaxRate(Number(e.target.value))}
              aria-label="Tax rate percentage slider"
              className="w-full accent-income cursor-pointer"
            />
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-surface-raised to-surface border border-hairline-strong shadow-md">
            <div className="flex items-center justify-between pb-4 border-b border-hairline">
              <div>
                <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider">
                  Total Final Amount
                </span>
                <div className="text-4xl sm:text-5xl font-black text-income mt-1">
                  {currency}{grossPrice.toFixed(2)}
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-income-bg text-income border border-income-border">
                  Tax: {currency}{taxAmount.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="space-y-3 my-5 text-sm">
              <div className="flex justify-between items-center text-ink-secondary">
                <span>Net Amount (Base Price):</span>
                <span className="font-bold text-ink">{currency}{netPrice.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-ink-secondary">
                <span>Tax Rate Applied:</span>
                <span className="font-semibold text-ink">{taxRate}%</span>
              </div>
              <div className="flex justify-between items-center text-ink-secondary">
                <span>Calculated Tax Amount:</span>
                <span className="font-bold text-income">+{currency}{taxAmount.toFixed(2)}</span>
              </div>
              <div className="pt-2 border-t border-hairline flex justify-between items-center font-bold text-base text-ink">
                <span>Gross Total:</span>
                <span>{currency}{grossPrice.toFixed(2)}</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-hairline">
              <button
                onClick={handleCopy}
                className="w-full py-2.5 px-4 rounded-xl bg-surface hover:bg-surface-raised border border-hairline text-ink font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-income" /> : <Copy className="w-4 h-4 text-ink-muted" />}
                {copied ? "Copied Tax Calculation!" : "Copy Tax Summary"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
