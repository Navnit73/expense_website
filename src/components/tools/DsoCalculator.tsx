"use client";

import React, { useState } from "react";
import {
  Clock,
  DollarSign,
  TrendingUp,
  RotateCcw,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  Activity,
} from "lucide-react";

export interface DsoProps {
  initialReceivables?: number;
  initialCreditSales?: number;
  currencySymbol?: string;
  className?: string;
}

export function DsoCalculator({
  initialReceivables = 45000,
  initialCreditSales = 180000,
  currencySymbol = "$",
  className = "",
}: DsoProps) {
  const [accountsReceivable, setAccountsReceivable] = useState<number>(initialReceivables);
  const [totalCreditSales, setTotalCreditSales] = useState<number>(initialCreditSales);
  const [periodDays, setPeriodDays] = useState<number>(90); // 90 days (quarter)
  const [currency, setCurrency] = useState<string>(currencySymbol);
  const [copied, setCopied] = useState<boolean>(false);

  // Calculations
  // DSO = (Accounts Receivable / Total Credit Sales) * Number of Days
  const dso = totalCreditSales > 0 ? (accountsReceivable / totalCreditSales) * periodDays : 0;
  const arTurnover = accountsReceivable > 0 ? totalCreditSales / accountsReceivable : 0;

  const getDsoRating = (days: number) => {
    if (days <= 30) return { label: "Excellent (< 30 days)", color: "bg-income-bg text-income border-income-border" };
    if (days <= 45) return { label: "Good (30–45 days)", color: "bg-sky-bg text-sky border-sky-border" };
    if (days <= 60) return { label: "Warning (45–60 days)", color: "bg-warning-bg text-warning border-warning-border" };
    return { label: "Critical (> 60 days)", color: "bg-expense-bg text-expense border-expense-border" };
  };

  const rating = getDsoRating(dso);

  const handleReset = () => {
    setAccountsReceivable(45000);
    setTotalCreditSales(180000);
    setPeriodDays(90);
  };

  const handleCopy = () => {
    const text = `=== Days Sales Outstanding (DSO) Analysis ===
Accounts Receivable Balance: ${currency}${accountsReceivable.toLocaleString()}
Total Credit Sales (${periodDays} days): ${currency}${totalCreditSales.toLocaleString()}
-------------------------------------------
Days Sales Outstanding (DSO): ${dso.toFixed(1)} days
AR Turnover Ratio: ${arTurnover.toFixed(2)}x
Collection Health Score: ${rating.label}
Calculated via Expenseliy Invoicing & Cash Flow Tools`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className={`w-full rounded-2xl bg-surface border border-hairline shadow-sm overflow-hidden ${className}`}>
      {/* Header Bar */}
      <div className="p-6 md:p-8 bg-gradient-to-r from-sky-bg/30 via-surface to-surface border-b border-hairline">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${rating.color}`}>
                {rating.label}
              </span>
              <span className="inline-flex items-center text-xs text-ink-muted">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-income" /> Working Capital Metric
              </span>
            </div>
            <h2 className="text-2xl font-bold text-ink tracking-tight">
              Days Sales Outstanding (DSO) & Accounts Receivable Calculator
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              Measure how quickly your business collects cash from unpaid customer invoices.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              aria-label="Currency"
              className="px-3 py-2 text-sm font-medium rounded-lg bg-surface-raised border border-hairline text-ink hover:border-sky/60 focus:outline-none focus:ring-2 focus:ring-sky"
            >
              <option value="$">USD ($)</option>
              <option value="€">EUR (€)</option>
              <option value="£">GBP (£)</option>
              <option value="CAD $">CAD ($)</option>
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
      </div>

      {/* Main Grid */}
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-muted">
            1. Receivables & Sales Period
          </h3>

          <div className="space-y-2">
            <label htmlFor="ar-balance-input" className="block text-sm font-semibold text-ink">Current Accounts Receivable (Unpaid Invoices)</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted font-medium">{currency}</span>
              <input
                id="ar-balance-input"
                type="number"
                min="0"
                step="1000"
                value={accountsReceivable || ""}
                onChange={(e) => setAccountsReceivable(Math.max(0, Number(e.target.value) || 0))}
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-surface-raised border border-hairline text-ink font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-sky"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="credit-sales-input" className="block text-sm font-semibold text-ink">Total Gross Credit Invoiced Sales in Period</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted font-medium">{currency}</span>
              <input
                id="credit-sales-input"
                type="number"
                min="1"
                step="5000"
                value={totalCreditSales || ""}
                onChange={(e) => setTotalCreditSales(Math.max(1, Number(e.target.value) || 1))}
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-surface-raised border border-hairline text-ink font-semibold text-base focus:outline-none focus:ring-2 focus:ring-sky"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="measurement-period-select" className="block text-xs font-semibold text-ink">Measurement Period</label>
            <select
              id="measurement-period-select"
              value={periodDays}
              onChange={(e) => setPeriodDays(Number(e.target.value))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-raised border border-hairline text-ink text-sm font-medium"
            >
              <option value="30">Monthly (30 Days)</option>
              <option value="90">Quarterly (90 Days)</option>
              <option value="180">Semi-Annual (180 Days)</option>
              <option value="365">Annual (365 Days)</option>
            </select>
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-surface-raised to-surface border border-hairline-strong shadow-md">
            <div className="flex items-center justify-between pb-4 border-b border-hairline">
              <div>
                <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider">
                  Days Sales Outstanding (DSO)
                </span>
                <div className="text-4xl sm:text-5xl font-black text-ink mt-1">
                  {dso.toFixed(1)}
                  <span className="text-base font-normal text-ink-muted"> days</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-ink-muted block">AR Turnover:</span>
                <span className="text-lg font-bold text-sky">{arTurnover.toFixed(2)}x / period</span>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-surface border border-hairline my-5 text-xs text-ink-secondary space-y-1.5">
              <p className="font-bold text-ink">Interpretation:</p>
              <p>
                On average, it takes your business <strong className="text-ink">{Math.round(dso)} days</strong> to turn invoiced sales into collected cash.
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-hairline">
              <button
                onClick={handleCopy}
                className="w-full py-2.5 px-4 rounded-xl bg-surface hover:bg-surface-raised border border-hairline text-ink font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-income" /> : <Copy className="w-4 h-4 text-ink-muted" />}
                {copied ? "Copied DSO Analysis!" : "Copy DSO Summary"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
