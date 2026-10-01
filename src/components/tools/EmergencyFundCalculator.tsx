"use client";

import React, { useState } from "react";
import {
  ShieldAlert,
  ShieldCheck,
  DollarSign,
  TrendingUp,
  RotateCcw,
  Copy,
  Check,
  Sparkles,
  Calendar,
} from "lucide-react";

export function EmergencyFundCalculator({ className = "" }: { className?: string }) {
  const [housing, setHousing] = useState<number>(1800);
  const [groceries, setGroceries] = useState<number>(600);
  const [utilities, setUtilities] = useState<number>(250);
  const [transportation, setTransportation] = useState<number>(400);
  const [insuranceHealth, setInsuranceHealth] = useState<number>(350);
  const [minimumDebt, setMinimumDebt] = useState<number>(200);
  const [currentSavings, setCurrentSavings] = useState<number>(8500);
  const [monthlyContribution, setMonthlyContribution] = useState<number>(500);
  const [currency, setCurrency] = useState<string>("$");
  const [copied, setCopied] = useState<boolean>(false);

  // Calculations
  const monthlyEssentialCost =
    housing + groceries + utilities + transportation + insuranceHealth + minimumDebt;

  const fund3Months = monthlyEssentialCost * 3;
  const fund6Months = monthlyEssentialCost * 6;
  const fund12Months = monthlyEssentialCost * 12;

  // Selected Target (Default to 6 months)
  const targetFund = fund6Months;
  const savingsGap = Math.max(0, targetFund - currentSavings);
  const monthsToGoal = monthlyContribution > 0 ? Math.ceil(savingsGap / monthlyContribution) : 0;
  const currentMonthsFunded = monthlyEssentialCost > 0 ? currentSavings / monthlyEssentialCost : 0;

  const handleReset = () => {
    setHousing(1800);
    setGroceries(600);
    setUtilities(250);
    setTransportation(400);
    setInsuranceHealth(350);
    setMinimumDebt(200);
    setCurrentSavings(8500);
    setMonthlyContribution(500);
  };

  const handleCopy = () => {
    const text = `=== Emergency Safety Net Fund Analysis ===
Monthly Essential Living Expenses: ${currency}${monthlyEssentialCost.toLocaleString()} / mo
Current Emergency Reserves: ${currency}${currentSavings.toLocaleString()} (${currentMonthsFunded.toFixed(1)} months funded)
-------------------------------------------
3-Month Safety Target (Lean): ${currency}${fund3Months.toLocaleString()}
6-Month Safety Target (Standard): ${currency}${fund6Months.toLocaleString()}
12-Month Safety Target (Freelancer/Solo): ${currency}${fund12Months.toLocaleString()}
-------------------------------------------
Gap to 6-Month Target: ${currency}${savingsGap.toLocaleString()}
Time to Fully Funded (@ ${currency}${monthlyContribution}/mo): ${monthsToGoal} months
Calculated via Expenseliy Emergency Fund Tools`;

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
                Safety Net & Runway Planner
              </span>
              <span className="inline-flex items-center text-xs text-ink-muted">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-income" /> 3, 6, 12-Month Targets
              </span>
            </div>
            <h2 className="text-2xl font-bold text-ink tracking-tight">
              Emergency Fund & Cash Runway Calculator
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              Calculate your exact monthly survival baseline and see how many months you need to save for complete financial peace of mind.
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
            1. Monthly Non-Negotiable Essentials
          </h3>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div>
              <label htmlFor="ef-rent-input" className="font-semibold text-ink block mb-1">Rent / Mortgage</label>
              <input
                id="ef-rent-input"
                type="number"
                value={housing || ""}
                onChange={(e) => setHousing(Math.max(0, Number(e.target.value) || 0))}
                className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-hairline text-ink"
              />
            </div>

            <div>
              <label htmlFor="ef-groceries-input" className="font-semibold text-ink block mb-1">Essential Groceries</label>
              <input
                id="ef-groceries-input"
                type="number"
                value={groceries || ""}
                onChange={(e) => setGroceries(Math.max(0, Number(e.target.value) || 0))}
                className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-hairline text-ink"
              />
            </div>

            <div>
              <label htmlFor="ef-utilities-input" className="font-semibold text-ink block mb-1">Utilities & Internet</label>
              <input
                id="ef-utilities-input"
                type="number"
                value={utilities || ""}
                onChange={(e) => setUtilities(Math.max(0, Number(e.target.value) || 0))}
                className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-hairline text-ink"
              />
            </div>

            <div>
              <label htmlFor="ef-transport-input" className="font-semibold text-ink block mb-1">Transit / Gas / Auto</label>
              <input
                id="ef-transport-input"
                type="number"
                value={transportation || ""}
                onChange={(e) => setTransportation(Math.max(0, Number(e.target.value) || 0))}
                className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-hairline text-ink"
              />
            </div>

            <div>
              <label htmlFor="ef-insurance-input" className="font-semibold text-ink block mb-1">Health & Insurances</label>
              <input
                id="ef-insurance-input"
                type="number"
                value={insuranceHealth || ""}
                onChange={(e) => setInsuranceHealth(Math.max(0, Number(e.target.value) || 0))}
                className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-hairline text-ink"
              />
            </div>

            <div>
              <label htmlFor="ef-debt-input" className="font-semibold text-ink block mb-1">Minimum Debt Dues</label>
              <input
                id="ef-debt-input"
                type="number"
                value={minimumDebt || ""}
                onChange={(e) => setMinimumDebt(Math.max(0, Number(e.target.value) || 0))}
                className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-hairline text-ink"
              />
            </div>
          </div>

          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-muted pt-2">
            2. Current Savings & Monthly Inflow
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="ef-current-savings" className="block text-xs font-semibold text-ink mb-1">Current Emergency Cash</label>
              <input
                id="ef-current-savings"
                type="number"
                value={currentSavings || ""}
                onChange={(e) => setCurrentSavings(Math.max(0, Number(e.target.value) || 0))}
                className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-hairline text-ink text-sm font-bold"
              />
            </div>

            <div>
              <label htmlFor="ef-monthly-saving" className="block text-xs font-semibold text-ink mb-1">Monthly Saving Capacity</label>
              <input
                id="ef-monthly-saving"
                type="number"
                value={monthlyContribution || ""}
                onChange={(e) => setMonthlyContribution(Math.max(0, Number(e.target.value) || 0))}
                className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-hairline text-ink text-sm font-bold"
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
                  Current Safety Runway
                </span>
                <div className="text-4xl sm:text-5xl font-black text-income mt-1">
                  {currentMonthsFunded.toFixed(1)}
                  <span className="text-base font-normal text-ink-muted"> months</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-ink-muted block">Essential Burn:</span>
                <span className="text-base font-bold text-ink">{currency}{monthlyEssentialCost.toLocaleString()} / mo</span>
              </div>
            </div>

            {/* Target Tier Cards */}
            <div className="grid grid-cols-3 gap-2.5 my-5">
              <div className="p-3 rounded-xl bg-surface border border-hairline text-center">
                <span className="text-[11px] text-ink-muted font-semibold block">3-Mo (Lean)</span>
                <span className="text-sm font-bold text-ink">{currency}{fund3Months.toLocaleString()}</span>
              </div>
              <div className="p-3 rounded-xl bg-income-bg/50 border border-income-border text-center">
                <span className="text-[11px] text-income font-bold block">6-Mo (Standard)</span>
                <span className="text-sm font-bold text-income">{currency}{fund6Months.toLocaleString()}</span>
              </div>
              <div className="p-3 rounded-xl bg-surface border border-hairline text-center">
                <span className="text-[11px] text-ink-muted font-semibold block">12-Mo (Solo)</span>
                <span className="text-sm font-bold text-ink">{currency}{fund12Months.toLocaleString()}</span>
              </div>
            </div>

            <div className="p-3.5 rounded-xl bg-surface border border-hairline text-xs text-ink-secondary space-y-1">
              <div className="flex justify-between font-semibold text-ink">
                <span>Gap to 6-Month Goal:</span>
                <span>{currency}{savingsGap.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span>Timeline to Goal (@ {currency}{monthlyContribution}/mo):</span>
                <span className="font-bold text-income">{monthsToGoal} months</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-hairline">
              <button
                onClick={handleCopy}
                className="w-full py-2.5 px-4 rounded-xl bg-surface hover:bg-surface-raised border border-hairline text-ink font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-income" /> : <Copy className="w-4 h-4 text-ink-muted" />}
                {copied ? "Copied Safety Plan!" : "Copy Emergency Fund Plan"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
