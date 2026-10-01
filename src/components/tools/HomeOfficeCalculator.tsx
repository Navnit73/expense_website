"use client";

import React, { useState } from "react";
import {
  Building2,
  Home,
  CheckCircle2,
  DollarSign,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Percent,
  Sliders,
} from "lucide-react";

export interface HomeOfficeProps {
  initialHomeSqFt?: number;
  initialOfficeSqFt?: number;
  currencySymbol?: string;
  className?: string;
}

const PRESETS = [
  { label: "Dedicated Bedroom (150 sq ft / 1200 sq ft)", office: 150, home: 1200, rent: 2200, util: 250, net: 90 },
  { label: "Studio Corner (80 sq ft / 650 sq ft)", office: 80, home: 650, rent: 1600, util: 180, net: 80 },
  { label: "Large Office (280 sq ft / 2400 sq ft)", office: 280, home: 2400, rent: 3200, util: 380, net: 120 },
  { label: "Basement Suite (350 sq ft / 2800 sq ft)", office: 350, home: 2800, rent: 3500, util: 420, net: 150 },
];

export function HomeOfficeCalculator({
  initialHomeSqFt = 1500,
  initialOfficeSqFt = 200,
  currencySymbol = "$",
  className = "",
}: HomeOfficeProps) {
  const [homeSqFt, setHomeSqFt] = useState<number>(initialHomeSqFt);
  const [officeSqFt, setOfficeSqFt] = useState<number>(initialOfficeSqFt);
  const [monthlyRentOrMortgage, setMonthlyRentOrMortgage] = useState<number>(2400);
  const [monthlyUtilities, setMonthlyUtilities] = useState<number>(280);
  const [monthlyInternet, setMonthlyInternet] = useState<number>(90);
  const [annualInsurance, setAnnualInsurance] = useState<number>(1200);
  const [annualRepairs, setAnnualRepairs] = useState<number>(800);
  const [taxBracketPct, setTaxBracketPct] = useState<number>(24);
  const [currency, setCurrency] = useState<string>(currencySymbol);
  const [copied, setCopied] = useState<boolean>(false);

  // Simplified IRS Method ($5 / sq ft, capped at 300 sq ft = $1,500 max)
  const simplifiedEligibleSqFt = Math.min(300, Math.max(0, officeSqFt));
  const simplifiedDeduction = simplifiedEligibleSqFt * 5;

  // Actual Expense Method
  const officePercentage = homeSqFt > 0 ? Math.min(100, (officeSqFt / homeSqFt) * 100) : 0;
  const annualHousingCost = monthlyRentOrMortgage * 12;
  const annualUtilitiesCost = monthlyUtilities * 12;
  const annualInternetCost = monthlyInternet * 12;
  const totalIndirectExpenses = annualHousingCost + annualUtilitiesCost + annualInternetCost + annualInsurance + annualRepairs;
  const actualExpenseDeduction = (totalIndirectExpenses * officePercentage) / 100;

  const isActualBetter = actualExpenseDeduction > simplifiedDeduction;
  const optimalDeduction = Math.max(simplifiedDeduction, actualExpenseDeduction);
  const difference = Math.abs(actualExpenseDeduction - simplifiedDeduction);
  const cashTaxSaved = (optimalDeduction * taxBracketPct) / 100;

  const handleReset = () => {
    setHomeSqFt(1500);
    setOfficeSqFt(200);
    setMonthlyRentOrMortgage(2400);
    setMonthlyUtilities(280);
    setMonthlyInternet(90);
    setAnnualInsurance(1200);
    setAnnualRepairs(800);
  };

  const handleCopy = () => {
    const text = `=== Home Office Tax Deduction Comparison ===
Home Size: ${homeSqFt} sq ft | Dedicated Workspace: ${officeSqFt} sq ft (${officePercentage.toFixed(1)}% of home)
-------------------------------------------
1. Simplified Method: ${currency}${simplifiedDeduction.toLocaleString()} ($5/sq ft up to 300 sq ft)
2. Actual Expenses Method: ${currency}${Math.round(actualExpenseDeduction).toLocaleString()}
   - Annual Total Home Costs: ${currency}${Math.round(totalIndirectExpenses).toLocaleString()}
   - Deductible Share (${officePercentage.toFixed(1)}%): ${currency}${Math.round(actualExpenseDeduction).toLocaleString()}
-------------------------------------------
Winner: ${isActualBetter ? "Actual Expense Method" : "Simplified IRS Method"}
Advantage: ${currency}${Math.round(difference).toLocaleString()} higher deduction
Estimated Tax Savings (${taxBracketPct}% bracket): ${currency}${Math.round(cashTaxSaved).toLocaleString()}
Calculated via Expenseliy Home Office Calculator`;

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
                IRS Form 8829 & Simplified Option
              </span>
              <span className="inline-flex items-center text-xs text-ink-muted">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-income" /> Exclusive & Regular Use
              </span>
            </div>
            <h2 className="text-2xl font-bold text-ink tracking-tight">
              Home Office Tax Deduction Calculator (Simplified vs Actual)
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              Find out whether claiming the simplified $5/sq ft rate or tracking actual home bills yields a bigger write-off.
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
              <option value="CAD $">CAD ($)</option>
              <option value="£">GBP (£)</option>
              <option value="€">EUR (€)</option>
              <option value="AUD $">AUD ($)</option>
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

        {/* Quick Presets */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-ink-muted font-medium whitespace-nowrap">Presets:</span>
          {PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => {
                setOfficeSqFt(p.office);
                setHomeSqFt(p.home);
                setMonthlyRentOrMortgage(p.rent);
                setMonthlyUtilities(p.util);
                setMonthlyInternet(p.net);
              }}
              className="px-3 py-1 rounded-md bg-surface-raised hover:bg-income-bg hover:text-income border border-hairline text-ink-secondary transition-all whitespace-nowrap font-medium"
            >
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-muted">
            1. Workspace Dimensions
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="home-sq-ft" className="block text-xs font-semibold text-ink mb-1.5">
                Total Home Area (sq ft)
              </label>
              <input
                id="home-sq-ft"
                type="number"
                min="200"
                value={homeSqFt || ""}
                onChange={(e) => setHomeSqFt(Math.max(1, Number(e.target.value) || 1))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-raised border border-hairline text-ink text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-income"
              />
            </div>
            <div>
              <label htmlFor="office-sq-ft" className="block text-xs font-semibold text-ink mb-1.5">
                Dedicated Office Area (sq ft)
              </label>
              <input
                id="office-sq-ft"
                type="number"
                min="10"
                value={officeSqFt || ""}
                onChange={(e) => setOfficeSqFt(Math.max(0, Number(e.target.value) || 0))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-raised border border-hairline text-ink text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-income"
              />
            </div>
          </div>

          <div className="p-3 rounded-xl bg-surface-raised border border-hairline flex items-center justify-between text-xs">
            <span className="text-ink-muted">Office Percentage of Home:</span>
            <span className="font-bold text-ink">{officePercentage.toFixed(1)}%</span>
          </div>

          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-muted pt-2">
            2. Annual Household Operating Expenses
          </h3>

          <div className="space-y-3 text-sm">
            <div>
              <div className="flex justify-between text-xs mb-1">
                <label htmlFor="rent-mortgage" className="font-medium text-ink">Monthly Rent or Mortgage Interest</label>
                <span className="text-ink-muted">{currency}{monthlyRentOrMortgage * 12}/yr</span>
              </div>
              <input
                id="rent-mortgage"
                type="number"
                value={monthlyRentOrMortgage || ""}
                onChange={(e) => setMonthlyRentOrMortgage(Math.max(0, Number(e.target.value) || 0))}
                className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-hairline text-ink text-sm"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="monthly-utils" className="text-xs text-ink-muted font-medium block mb-1">
                  Monthly Utilities (Power/Gas/Water)
                </label>
                <input
                  id="monthly-utils"
                  type="number"
                  value={monthlyUtilities || ""}
                  onChange={(e) => setMonthlyUtilities(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-hairline text-ink text-sm"
                />
              </div>

              <div>
                <label htmlFor="monthly-internet" className="text-xs text-ink-muted font-medium block mb-1">
                  Monthly Internet & Phone
                </label>
                <input
                  id="monthly-internet"
                  type="number"
                  value={monthlyInternet || ""}
                  onChange={(e) => setMonthlyInternet(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-hairline text-ink text-sm"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label htmlFor="annual-ins" className="text-xs text-ink-muted font-medium block mb-1">
                  Annual Home Insurance
                </label>
                <input
                  id="annual-ins"
                  type="number"
                  value={annualInsurance || ""}
                  onChange={(e) => setAnnualInsurance(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-hairline text-ink text-sm"
                />
              </div>

              <div>
                <label htmlFor="annual-repairs" className="text-xs text-ink-muted font-medium block mb-1">
                  Annual General Repairs
                </label>
                <input
                  id="annual-repairs"
                  type="number"
                  value={annualRepairs || ""}
                  onChange={(e) => setAnnualRepairs(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-hairline text-ink text-sm"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-surface-raised to-surface border border-hairline-strong shadow-md">
            <div className="flex items-center justify-between pb-4 border-b border-hairline">
              <div>
                <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider">
                  Recommended Tax Deduction
                </span>
                <div className="text-3xl sm:text-4xl font-black text-income mt-1">
                  {currency}{Math.round(optimalDeduction).toLocaleString()}
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-income-bg text-income border border-income-border">
                  {isActualBetter ? "Actual Expenses Win" : "Simplified Method Wins"}
                </span>
                <p className="text-xs text-ink-muted mt-1">
                  +{currency}{Math.round(difference).toLocaleString()} higher deduction
                </p>
              </div>
            </div>

            {/* Estimated Tax Saved */}
            <div className="my-5 p-4 rounded-xl bg-income-bg/60 border border-income-border flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <DollarSign className="w-5 h-5 text-income shrink-0" />
                <div>
                  <p className="text-xs font-bold text-ink">Estimated Cash Tax Savings</p>
                  <p className="text-xs text-ink-muted">In ~{taxBracketPct}% income tax bracket</p>
                </div>
              </div>
              <div className="text-right font-black text-xl text-income">
                {currency}{Math.round(cashTaxSaved).toLocaleString()}
              </div>
            </div>

            {/* Side-by-Side Comparison */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-sm">
              <div className={`p-4 rounded-xl border ${!isActualBetter ? "bg-income-bg/30 border-income-border" : "bg-surface border-hairline"}`}>
                <p className="text-xs font-bold text-ink mb-1">1. Simplified Method</p>
                <p className="text-xl font-bold text-ink">
                  {currency}{simplifiedDeduction.toLocaleString()}
                </p>
                <p className="text-[11px] text-ink-muted mt-1">
                  {simplifiedEligibleSqFt} sq ft × $5 (Max 300 sq ft)
                </p>
              </div>

              <div className={`p-4 rounded-xl border ${isActualBetter ? "bg-income-bg/30 border-income-border" : "bg-surface border-hairline"}`}>
                <p className="text-xs font-bold text-ink mb-1">2. Actual Expenses</p>
                <p className="text-xl font-bold text-ink">
                  {currency}{Math.round(actualExpenseDeduction).toLocaleString()}
                </p>
                <p className="text-[11px] text-ink-muted mt-1">
                  {officePercentage.toFixed(1)}% of {currency}{Math.round(totalIndirectExpenses).toLocaleString()}
                </p>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-hairline">
              <button
                onClick={handleCopy}
                className="w-full py-2.5 px-4 rounded-xl bg-surface hover:bg-surface-raised border border-hairline text-ink font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-income" /> : <Copy className="w-4 h-4 text-ink-muted" />}
                {copied ? "Copied Summary!" : "Copy Deduction Breakdown"}
              </button>
            </div>
          </div>

          {/* Exclusive Use Rule Reminder */}
          <div className="p-4 rounded-xl bg-surface-raised border border-hairline flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-income shrink-0 mt-0.5" />
            <div className="text-xs text-ink-muted space-y-1">
              <p className="font-semibold text-ink">IRS "Exclusive Use" Rule</p>
              <p>
                The designated home office space must be used <strong>exclusively</strong> and <strong>regularly</strong> as your principal place of business. Guest rooms or dining tables with dual personal use do not qualify.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
