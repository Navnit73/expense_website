"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  DollarSign,
  Percent,
  RotateCcw,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  ArrowRightLeft,
} from "lucide-react";

export interface ProfitMarginProps {
  initialCost?: number;
  initialRevenue?: number;
  currencySymbol?: string;
  className?: string;
}

export function ProfitMarginCalculator({
  initialCost = 40,
  initialRevenue = 100,
  currencySymbol = "$",
  className = "",
}: ProfitMarginProps) {
  const [costPrice, setCostPrice] = useState<number>(initialCost);
  const [sellingPrice, setSellingPrice] = useState<number>(initialRevenue);
  const [currency, setCurrency] = useState<string>(currencySymbol);
  const [copied, setCopied] = useState<boolean>(false);

  // Calculations
  const grossProfit = sellingPrice - costPrice;
  const grossMarginPct = sellingPrice > 0 ? (grossProfit / sellingPrice) * 100 : 0;
  const markupPct = costPrice > 0 ? (grossProfit / costPrice) * 100 : 0;

  const handleReset = () => {
    setCostPrice(40);
    setSellingPrice(100);
  };

  const handleCopy = () => {
    const text = `=== Profit Margin & Markup Calculation ===
Cost of Goods (COGS): ${currency}${costPrice.toFixed(2)}
Selling Price (Revenue): ${currency}${sellingPrice.toFixed(2)}
-------------------------------------------
Gross Profit: ${currency}${grossProfit.toFixed(2)}
Gross Profit Margin: ${grossMarginPct.toFixed(2)}%
Markup Percentage: ${markupPct.toFixed(2)}%
Calculated via Expenseliy Business Tools`;

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
                E-Commerce & Retail Pricing
              </span>
              <span className="inline-flex items-center text-xs text-ink-muted">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-income" /> Real-time Conversion
              </span>
            </div>
            <h2 className="text-2xl font-bold text-ink tracking-tight">
              Profit Margin & Markup Calculator
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              Instantly calculate gross profit margin percentage, markup on cost, and selling price targets.
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
        {/* Inputs */}
        <div className="lg:col-span-6 space-y-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-muted">
            1. Pricing Variables
          </h3>

          <div className="space-y-2">
            <label htmlFor="cost-price-input" className="block text-sm font-semibold text-ink">Cost of Goods / Item Cost (COGS)</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted font-medium">{currency}</span>
              <input
                id="cost-price-input"
                type="number"
                min="0"
                step="1"
                value={costPrice || ""}
                onChange={(e) => setCostPrice(Math.max(0, Number(e.target.value) || 0))}
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-surface-raised border border-hairline text-ink font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-income"
              />
            </div>
          </div>

          <div className="space-y-2">
            <label htmlFor="selling-price-input" className="block text-sm font-semibold text-ink">Selling Price (Revenue per Unit)</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted font-medium">{currency}</span>
              <input
                id="selling-price-input"
                type="number"
                min="0"
                step="1"
                value={sellingPrice || ""}
                onChange={(e) => setSellingPrice(Math.max(0, Number(e.target.value) || 0))}
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-surface-raised border border-hairline text-ink font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-income"
              />
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-raised border border-hairline text-xs space-y-2">
            <h4 className="font-bold text-ink">Margin vs. Markup Rule of Thumb:</h4>
            <p className="text-ink-secondary leading-relaxed">
              • <strong>Margin</strong> is the percentage of the <em>selling price</em> that is pure profit: (Profit / Price).
            </p>
            <p className="text-ink-secondary leading-relaxed">
              • <strong>Markup</strong> is the percentage added on top of your <em>cost</em>: (Profit / Cost).
            </p>
          </div>
        </div>

        {/* Outputs */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-surface-raised to-surface border border-hairline-strong shadow-md">
            <div className="flex items-center justify-between pb-4 border-b border-hairline">
              <div>
                <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider">
                  Gross Profit Per Unit
                </span>
                <div className={`text-4xl font-black mt-1 ${grossProfit >= 0 ? "text-income" : "text-expense"}`}>
                  {currency}{grossProfit.toFixed(2)}
                </div>
              </div>
              <div className="text-right">
                <span className={`inline-flex px-3 py-1 rounded-full text-xs font-bold border ${grossProfit >= 0 ? "bg-income-bg text-income border-income-border" : "bg-expense-bg text-expense border-expense-border"}`}>
                  {grossProfit >= 0 ? "Profitable" : "Loss"}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 my-5">
              <div className="p-4 rounded-xl bg-surface border border-hairline text-center">
                <span className="text-xs text-ink-muted font-medium block mb-1">Gross Profit Margin</span>
                <span className="text-2xl font-black text-income">{grossMarginPct.toFixed(1)}%</span>
                <span className="text-[11px] text-ink-muted block mt-1">of revenue</span>
              </div>

              <div className="p-4 rounded-xl bg-surface border border-hairline text-center">
                <span className="text-xs text-ink-muted font-medium block mb-1">Markup on Cost</span>
                <span className="text-2xl font-black text-sky">{markupPct.toFixed(1)}%</span>
                <span className="text-[11px] text-ink-muted block mt-1">above cost</span>
              </div>
            </div>

            <div className="space-y-2 pt-2 text-xs text-ink-secondary border-t border-hairline">
              <div className="flex justify-between">
                <span>Cost Portion of Selling Price:</span>
                <span className="font-semibold text-ink">{(100 - grossMarginPct).toFixed(1)}%</span>
              </div>
              <div className="flex justify-between">
                <span>Profit Multiplier:</span>
                <span className="font-semibold text-ink">{(sellingPrice / Math.max(1, costPrice)).toFixed(2)}x</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-hairline">
              <button
                onClick={handleCopy}
                className="w-full py-2.5 px-4 rounded-xl bg-surface hover:bg-surface-raised border border-hairline text-ink font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-income" /> : <Copy className="w-4 h-4 text-ink-muted" />}
                {copied ? "Copied Metrics!" : "Copy Margin & Markup Breakdown"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
