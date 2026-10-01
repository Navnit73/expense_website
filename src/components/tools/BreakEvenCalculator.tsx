"use client";

import React, { useState } from "react";
import {
  Target,
  DollarSign,
  TrendingUp,
  RotateCcw,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  Package,
} from "lucide-react";

export interface BreakEvenProps {
  initialFixedCosts?: number;
  initialUnitPrice?: number;
  initialVariableCost?: number;
  currencySymbol?: string;
  className?: string;
}

export function BreakEvenCalculator({
  initialFixedCosts = 6000,
  initialUnitPrice = 120,
  initialVariableCost = 45,
  currencySymbol = "$",
  className = "",
}: BreakEvenProps) {
  const [fixedCosts, setFixedCosts] = useState<number>(initialFixedCosts);
  const [unitPrice, setUnitPrice] = useState<number>(initialUnitPrice);
  const [variableCost, setVariableCost] = useState<number>(initialVariableCost);
  const [targetMonthlyProfit, setTargetMonthlyProfit] = useState<number>(5000);
  const [currency, setCurrency] = useState<string>(currencySymbol);
  const [copied, setCopied] = useState<boolean>(false);

  // Calculations
  const unitContributionMargin = unitPrice - variableCost;
  const contributionMarginRatio = unitPrice > 0 ? (unitContributionMargin / unitPrice) * 100 : 0;

  const breakEvenUnits = unitContributionMargin > 0 ? Math.ceil(fixedCosts / unitContributionMargin) : 0;
  const breakEvenRevenue = breakEvenUnits * unitPrice;

  // Units needed to reach Target Profit
  const targetUnits = unitContributionMargin > 0 ? Math.ceil((fixedCosts + targetMonthlyProfit) / unitContributionMargin) : 0;
  const targetRevenue = targetUnits * unitPrice;

  const handleReset = () => {
    setFixedCosts(6000);
    setUnitPrice(120);
    setVariableCost(45);
    setTargetMonthlyProfit(5000);
  };

  const handleCopy = () => {
    const text = `=== Break-Even Financial Analysis ===
Monthly Fixed Costs: ${currency}${fixedCosts.toLocaleString()}
Selling Price per Unit: ${currency}${unitPrice.toFixed(2)}
Variable Cost per Unit: ${currency}${variableCost.toFixed(2)}
Unit Contribution Margin: ${currency}${unitContributionMargin.toFixed(2)} (${contributionMarginRatio.toFixed(1)}%)
-------------------------------------------
Break-Even Point: ${breakEvenUnits.toLocaleString()} units / month
Break-Even Monthly Revenue: ${currency}${breakEvenRevenue.toLocaleString()}
To Reach Target Profit (${currency}${targetMonthlyProfit.toLocaleString()}):
- Sell: ${targetUnits.toLocaleString()} units / month (${currency}${targetRevenue.toLocaleString()} revenue)
Calculated via Expenseliy Business Financial Tools`;

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
                Break-Even Feasibility Model
              </span>
              <span className="inline-flex items-center text-xs text-ink-muted">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-income" /> 100% Accurate Math
              </span>
            </div>
            <h2 className="text-2xl font-bold text-ink tracking-tight">
              Break-Even Point & Unit Volume Calculator
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              Find out exactly how many units you must sell each month to cover overhead costs and reach target profits.
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
            1. Cost & Revenue Inputs
          </h3>

          <div className="space-y-2">
            <label htmlFor="fixed-costs-input" className="block text-sm font-semibold text-ink">Total Monthly Fixed Costs (Overhead)</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted font-medium">{currency}</span>
              <input
                id="fixed-costs-input"
                type="number"
                min="0"
                step="500"
                value={fixedCosts || ""}
                onChange={(e) => setFixedCosts(Math.max(0, Number(e.target.value) || 0))}
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-surface-raised border border-hairline text-ink font-semibold text-base focus:outline-none focus:ring-2 focus:ring-income"
              />
            </div>
            <p className="text-xs text-ink-muted">Rent, SaaS tools, salaries, insurance, hosting.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="unit-price-input" className="block text-xs font-semibold text-ink mb-1.5">Unit Selling Price</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-xs">{currency}</span>
                <input
                  id="unit-price-input"
                  type="number"
                  min="1"
                  value={unitPrice || ""}
                  onChange={(e) => setUnitPrice(Math.max(1, Number(e.target.value) || 1))}
                  className="w-full pl-7 pr-3 py-2.5 rounded-xl bg-surface-raised border border-hairline text-ink text-sm font-semibold"
                />
              </div>
            </div>

            <div>
              <label htmlFor="var-cost-input" className="block text-xs font-semibold text-ink mb-1.5">Variable Cost per Unit</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-xs">{currency}</span>
                <input
                  id="var-cost-input"
                  type="number"
                  min="0"
                  value={variableCost || ""}
                  onChange={(e) => setVariableCost(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full pl-7 pr-3 py-2.5 rounded-xl bg-surface-raised border border-hairline text-ink text-sm font-semibold"
                />
              </div>
            </div>
          </div>

          <div className="space-y-2 pt-2 border-t border-hairline">
            <label htmlFor="target-profit-input" className="block text-xs font-semibold text-ink">Target Desired Monthly Profit ({currency})</label>
            <input
              id="target-profit-input"
              type="number"
              min="0"
              step="500"
              value={targetMonthlyProfit || ""}
              onChange={(e) => setTargetMonthlyProfit(Math.max(0, Number(e.target.value) || 0))}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-raised border border-hairline text-ink text-sm font-semibold"
            />
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-surface-raised to-surface border border-hairline-strong shadow-md">
            <div className="flex items-center justify-between pb-4 border-b border-hairline">
              <div>
                <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider">
                  Break-Even Sales Volume
                </span>
                <div className="text-4xl sm:text-5xl font-black text-ink mt-1">
                  {breakEvenUnits.toLocaleString()}
                  <span className="text-base font-normal text-ink-muted"> units / mo</span>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-income-bg text-income border border-income-border">
                  {currency}{breakEvenRevenue.toLocaleString()} Revenue
                </span>
              </div>
            </div>

            {/* Target Profit Tier Box */}
            <div className="my-5 p-4 rounded-xl bg-income-bg/60 border border-income-border flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-ink">To Hit {currency}{targetMonthlyProfit.toLocaleString()} Net Profit</p>
                <p className="text-xs text-ink-muted">Required monthly sales</p>
              </div>
              <div className="text-right font-black text-xl text-income">
                {targetUnits.toLocaleString()} units
                <span className="text-xs font-normal text-ink-muted block">{currency}{targetRevenue.toLocaleString()} / mo</span>
              </div>
            </div>

            {/* Contribution Margin Metrics */}
            <div className="space-y-3 pt-2 text-xs">
              <div className="flex justify-between items-center text-ink-secondary">
                <span>Unit Contribution Margin (Profit per unit):</span>
                <span className="font-bold text-ink">{currency}{unitContributionMargin.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-ink-secondary">
                <span>Contribution Margin Ratio:</span>
                <span className="font-bold text-ink">{contributionMarginRatio.toFixed(1)}%</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-hairline">
              <button
                onClick={handleCopy}
                className="w-full py-2.5 px-4 rounded-xl bg-surface hover:bg-surface-raised border border-hairline text-ink font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-income" /> : <Copy className="w-4 h-4 text-ink-muted" />}
                {copied ? "Copied Analysis!" : "Copy Break-Even Summary"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
