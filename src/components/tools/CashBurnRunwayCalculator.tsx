"use client";

import React, { useState } from "react";
import {
  Flame,
  DollarSign,
  Calendar,
  AlertTriangle,
  RotateCcw,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  TrendingDown,
} from "lucide-react";

export interface CashBurnProps {
  initialCash?: number;
  initialMonthlyExpenses?: number;
  initialMonthlyRevenue?: number;
  currencySymbol?: string;
  className?: string;
}

export function CashBurnRunwayCalculator({
  initialCash = 120000,
  initialMonthlyExpenses = 18000,
  initialMonthlyRevenue = 6000,
  currencySymbol = "$",
  className = "",
}: CashBurnProps) {
  const [cashBalance, setCashBalance] = useState<number>(initialCash);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(initialMonthlyExpenses);
  const [monthlyRevenue, setMonthlyRevenue] = useState<number>(initialMonthlyRevenue);
  const [currency, setCurrency] = useState<string>(currencySymbol);
  const [copied, setCopied] = useState<boolean>(false);

  // Calculations
  const grossBurnRate = monthlyExpenses;
  const netBurnRate = Math.max(0, monthlyExpenses - monthlyRevenue);
  const isCashFlowPositive = monthlyRevenue >= monthlyExpenses;
  const runwayMonths = !isCashFlowPositive && netBurnRate > 0 ? cashBalance / netBurnRate : 999;

  // Zero Cash Date (ZCD)
  const now = new Date();
  const zcdDate = new Date(now.getFullYear(), now.getMonth() + Math.floor(runwayMonths), now.getDate());
  const zcdString = zcdDate.toLocaleDateString("en-US", { month: "short", year: "numeric" });

  const getHealthBadge = (months: number) => {
    if (isCashFlowPositive) {
      return { text: "Cash Flow Positive 🚀", color: "bg-income-bg text-income border-income-border" };
    }
    if (months >= 12) {
      return { text: "Strong Runway (12+ mos)", color: "bg-income-bg text-income border-income-border" };
    }
    if (months >= 6) {
      return { text: "Moderate Runway (6-12 mos)", color: "bg-sky-bg text-sky border-sky-border" };
    }
    return { text: "Critical Runway (<6 mos)", color: "bg-expense-bg text-expense border-expense-border" };
  };

  const badge = getHealthBadge(runwayMonths);

  const handleReset = () => {
    setCashBalance(120000);
    setMonthlyExpenses(18000);
    setMonthlyRevenue(6000);
  };

  const handleCopy = () => {
    const text = `=== Startup Cash Burn & Runway Analysis ===
Current Cash Reserves: ${currency}${cashBalance.toLocaleString()}
Monthly Gross Operating Costs: ${currency}${grossBurnRate.toLocaleString()} / mo
Monthly Revenue: ${currency}${monthlyRevenue.toLocaleString()} / mo
-------------------------------------------
Net Monthly Burn Rate: ${currency}${netBurnRate.toLocaleString()} / mo
Estimated Runway: ${isCashFlowPositive ? "Infinite (Profitable)" : `${runwayMonths.toFixed(1)} months`}
Estimated Zero Cash Date: ${isCashFlowPositive ? "N/A" : zcdString}
Calculated via Expenseliy Startup Runway Calculator`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className={`w-full rounded-2xl bg-surface border border-hairline shadow-sm overflow-hidden ${className}`}>
      {/* Header Bar */}
      <div className="p-6 md:p-8 bg-gradient-to-r from-expense-bg/30 via-surface to-surface border-b border-hairline">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold border ${badge.color}`}>
                {badge.text}
              </span>
              <span className="inline-flex items-center text-xs text-ink-muted">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-income" /> Runway Forecasting
              </span>
            </div>
            <h2 className="text-2xl font-bold text-ink tracking-tight">
              Startup Cash Burn Rate & Runway Calculator
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              Calculate your monthly gross burn, net cash drain, and exact months of financial runway until Zero Cash Date (ZCD).
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
            1. Treasury & Cash Flow
          </h3>

          <div className="space-y-2">
            <label htmlFor="cash-balance-input" className="block text-sm font-semibold text-ink">Current Total Cash Balance</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted font-medium">{currency}</span>
              <input
                id="cash-balance-input"
                type="number"
                min="0"
                step="5000"
                value={cashBalance || ""}
                onChange={(e) => setCashBalance(Math.max(0, Number(e.target.value) || 0))}
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-surface-raised border border-hairline text-ink font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-income"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="monthly-expenses-input" className="block text-sm font-semibold text-ink">Total Monthly Operating Expenses (Gross Burn)</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted font-medium">{currency}</span>
              <input
                id="monthly-expenses-input"
                type="number"
                min="0"
                step="1000"
                value={monthlyExpenses || ""}
                onChange={(e) => setMonthlyExpenses(Math.max(0, Number(e.target.value) || 0))}
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-surface-raised border border-hairline text-ink font-semibold text-base focus:outline-none focus:ring-2 focus:ring-expense"
              />
            </div>
            <p className="text-xs text-ink-muted">Payroll, contractor invoices, server hosting, advertising.</p>
          </div>

          <div className="space-y-2">
            <label htmlFor="monthly-revenue-input" className="block text-sm font-semibold text-ink">Monthly Revenue (Cash Inflow)</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted font-medium">{currency}</span>
              <input
                id="monthly-revenue-input"
                type="number"
                min="0"
                step="1000"
                value={monthlyRevenue || ""}
                onChange={(e) => setMonthlyRevenue(Math.max(0, Number(e.target.value) || 0))}
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-surface-raised border border-hairline text-ink font-semibold text-base focus:outline-none focus:ring-2 focus:ring-income"
              />
            </div>
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-surface-raised to-surface border border-hairline-strong shadow-md">
            <div className="flex items-center justify-between pb-4 border-b border-hairline">
              <div>
                <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider">
                  Remaining Runway
                </span>
                <div className="text-4xl sm:text-5xl font-black text-ink mt-1">
                  {isCashFlowPositive ? "Infinite" : `${runwayMonths.toFixed(1)}`}
                  <span className="text-base font-normal text-ink-muted"> {isCashFlowPositive ? "∞" : "months"}</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-ink-muted block">Zero Cash Date:</span>
                <span className="text-base font-bold text-ink">{isCashFlowPositive ? "Cash Positive" : zcdString}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 my-5">
              <div className="p-4 rounded-xl bg-surface border border-hairline text-center">
                <span className="text-xs text-ink-muted font-medium block mb-1">Gross Monthly Burn</span>
                <span className="text-xl font-bold text-ink">{currency}{grossBurnRate.toLocaleString()}</span>
                <span className="text-[11px] text-ink-muted block mt-1">total spend</span>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-hairline text-center">
                <span className="text-xs text-ink-muted font-medium block mb-1">Net Monthly Burn</span>
                <span className="text-xl font-bold text-expense">-{currency}{netBurnRate.toLocaleString()}</span>
                <span className="text-[11px] text-ink-muted block mt-1">net cash drain</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-hairline">
              <button
                onClick={handleCopy}
                className="w-full py-2.5 px-4 rounded-xl bg-surface hover:bg-surface-raised border border-hairline text-ink font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-income" /> : <Copy className="w-4 h-4 text-ink-muted" />}
                {copied ? "Copied Runway Report!" : "Copy Runway Summary"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
