"use client";

import React, { useState } from "react";
import {
  DollarSign,
  PieChart,
  Calendar,
  CheckCircle2,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  Info,
  TrendingDown,
  ShieldCheck,
  Building2,
} from "lucide-react";

export interface SelfEmploymentTaxProps {
  initialGrossIncome?: number;
  initialExpenses?: number;
  currencySymbol?: string;
  className?: string;
}

const TAX_PRESETS = [
  { label: "Side Hustle ($25k)", gross: 25000, expenses: 4000 },
  { label: "Full-Time Solo ($85k)", gross: 85000, expenses: 15000 },
  { label: "Senior Consultant ($175k)", gross: 175000, expenses: 25000 },
  { label: "High Earner ($260k)", gross: 260000, expenses: 40000 },
];

export function SelfEmploymentTaxCalculator({
  initialGrossIncome = 85000,
  initialExpenses = 15000,
  currencySymbol = "$",
  className = "",
}: SelfEmploymentTaxProps) {
  const [grossIncome, setGrossIncome] = useState<number>(initialGrossIncome);
  const [expenses, setExpenses] = useState<number>(initialExpenses);
  const [filingStatus, setFilingStatus] = useState<"single" | "married" | "head">("single");
  const [stateTaxRate, setStateTaxRate] = useState<number>(5);
  const [currency, setCurrency] = useState<string>(currencySymbol);
  const [copied, setCopied] = useState<boolean>(false);

  // 2026 Tax Limits & Constants
  const SS_WAGE_CAP = 168600; // Social security wage threshold
  const SS_RATE = 0.124; // 12.4%
  const MEDICARE_RATE = 0.029; // 2.9%
  const ADDL_MEDICARE_THRESHOLD = filingStatus === "married" ? 250000 : 200000;
  const ADDL_MEDICARE_RATE = 0.009; // 0.9%

  // Calculations
  const netProfit = Math.max(0, grossIncome - expenses);
  // IRS Schedule SE calculates SE tax on 92.35% of net business profit
  const taxableSEIncome = netProfit * 0.9235;

  // Social Security portion
  const ssTaxable = Math.min(taxableSEIncome, SS_WAGE_CAP);
  const socialSecurityTax = ssTaxable * SS_RATE;

  // Medicare portion
  const baseMedicareTax = taxableSEIncome * MEDICARE_RATE;
  const excessForAddl = Math.max(0, taxableSEIncome - ADDL_MEDICARE_THRESHOLD);
  const addlMedicareTax = excessForAddl * ADDL_MEDICARE_RATE;
  const medicareTax = baseMedicareTax + addlMedicareTax;

  const totalSETax = socialSecurityTax + medicareTax;

  // Above-the-line deduction: 50% of SE tax is deductible on Form 1040
  const seDeduction = totalSETax * 0.5;
  const adjustedGrossIncome = Math.max(0, netProfit - seDeduction);

  // Estimated Federal Income Tax (Tiered simplified estimate)
  let estFedTax = 0;
  if (filingStatus === "single") {
    if (adjustedGrossIncome > 100000) {
      estFedTax = 14000 + (adjustedGrossIncome - 100000) * 0.24;
    } else if (adjustedGrossIncome > 47000) {
      estFedTax = 5400 + (adjustedGrossIncome - 47000) * 0.22;
    } else if (adjustedGrossIncome > 11600) {
      estFedTax = 1160 + (adjustedGrossIncome - 11600) * 0.12;
    } else {
      estFedTax = adjustedGrossIncome * 0.10;
    }
  } else {
    if (adjustedGrossIncome > 200000) {
      estFedTax = 28000 + (adjustedGrossIncome - 200000) * 0.24;
    } else if (adjustedGrossIncome > 94000) {
      estFedTax = 10800 + (adjustedGrossIncome - 94000) * 0.22;
    } else if (adjustedGrossIncome > 23200) {
      estFedTax = 2320 + (adjustedGrossIncome - 23200) * 0.12;
    } else {
      estFedTax = adjustedGrossIncome * 0.10;
    }
  }

  const estStateTax = (adjustedGrossIncome * stateTaxRate) / 100;
  const totalTaxLiability = totalSETax + estFedTax + estStateTax;
  const effectiveTaxRate = grossIncome > 0 ? (totalTaxLiability / grossIncome) * 100 : 0;
  const quarterlyEstimatedTax = totalTaxLiability / 4;
  const takeHomeNetProfit = Math.max(0, grossIncome - expenses - totalTaxLiability);

  const handleCopySummary = () => {
    const text = `=== 1099 Self-Employment Tax Estimate ===
Gross Revenue: ${currency}${grossIncome.toLocaleString()}
Business Expenses: ${currency}${expenses.toLocaleString()}
Net Schedule C Profit: ${currency}${netProfit.toLocaleString()}
-------------------------------------------
Social Security Tax (12.4%): ${currency}${Math.round(socialSecurityTax).toLocaleString()}
Medicare Tax (2.9%): ${currency}${Math.round(medicareTax).toLocaleString()}
Total Self-Employment Tax: ${currency}${Math.round(totalSETax).toLocaleString()}
50% Above-the-line Deduction: ${currency}${Math.round(seDeduction).toLocaleString()}
Estimated Federal Income Tax: ${currency}${Math.round(estFedTax).toLocaleString()}
Estimated State Tax (${stateTaxRate}%): ${currency}${Math.round(estStateTax).toLocaleString()}
-------------------------------------------
Total Estimated Tax Liability: ${currency}${Math.round(totalTaxLiability).toLocaleString()}
Effective Total Tax Rate: ${effectiveTaxRate.toFixed(1)}%
Recommended Quarterly Payment (Q1-Q4): ${currency}${Math.round(quarterlyEstimatedTax).toLocaleString()} / quarter
Estimated Annual Take-Home: ${currency}${Math.round(takeHomeNetProfit).toLocaleString()}
Calculated via Expenseliy Free Financial Tools`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const handleReset = () => {
    setGrossIncome(85000);
    setExpenses(15000);
    setFilingStatus("single");
    setStateTaxRate(5);
  };

  return (
    <div className={`w-full rounded-2xl bg-surface border border-hairline shadow-sm overflow-hidden ${className}`}>
      {/* Header Bar */}
      <div className="p-6 md:p-8 bg-gradient-to-r from-income-bg/40 via-surface to-surface border-b border-hairline">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-income-bg text-income border border-income-border">
                IRS Schedule SE & 1040 (2026 Model)
              </span>
              <span className="inline-flex items-center text-xs text-ink-muted">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-income" /> 100% Client-Side
              </span>
            </div>
            <h2 className="text-2xl font-bold text-ink tracking-tight">
              1099 Self-Employment & Quarterly Tax Calculator
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              Estimate your federal SE tax, Medicare, income taxes, and IRS quarterly payment amounts.
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
              title="Reset to defaults"
              aria-label="Reset form"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Quick Presets */}
        <div className="mt-6 flex items-center gap-2 overflow-x-auto pb-1 text-xs">
          <span className="text-ink-muted font-medium whitespace-nowrap">Quick Presets:</span>
          {TAX_PRESETS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                setGrossIncome(preset.gross);
                setExpenses(preset.expenses);
              }}
              className="px-3 py-1 rounded-md bg-surface-raised hover:bg-income-bg hover:text-income border border-hairline text-ink-secondary transition-all whitespace-nowrap font-medium"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Calculator Body */}
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs Column */}
        <div className="lg:col-span-6 space-y-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-muted">
            1. Income & Expenses
          </h3>

          {/* Gross 1099 Income */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label htmlFor="se-gross-income" className="font-semibold text-ink">Gross 1099 / Business Revenue</label>
              <span className="text-xs text-ink-muted">Annual total</span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted font-medium">
                {currency}
              </span>
              <input
                id="se-gross-income"
                type="number"
                min="0"
                step="1000"
                value={grossIncome || ""}
                onChange={(e) => setGrossIncome(Math.max(0, Number(e.target.value) || 0))}
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-surface-raised border border-hairline text-ink font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-income"
                placeholder="85000"
              />
            </div>
            <input
              type="range"
              min="10000"
              max="350000"
              step="5000"
              value={Math.min(grossIncome, 350000)}
              onChange={(e) => setGrossIncome(Number(e.target.value))}
              aria-label="Gross income slider"
              className="w-full accent-income cursor-pointer"
            />
          </div>

          {/* Business Expenses */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label htmlFor="se-expenses" className="font-semibold text-ink">Deductible Business Expenses</label>
              <span className="text-xs text-income font-medium">Reduces taxable profit</span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted font-medium">
                {currency}
              </span>
              <input
                id="se-expenses"
                type="number"
                min="0"
                step="500"
                value={expenses || ""}
                onChange={(e) => setExpenses(Math.max(0, Number(e.target.value) || 0))}
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-surface-raised border border-hairline text-ink font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-income"
                placeholder="15000"
              />
            </div>
            <p className="text-xs text-ink-muted">
              Includes software, mileage, home office, equipment, meals, and contractors.
            </p>
          </div>

          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-muted pt-2">
            2. Filing Details & State
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Filing Status */}
            <div>
              <label htmlFor="se-filing-status" className="block text-xs font-semibold text-ink mb-1.5">Filing Status</label>
              <select
                id="se-filing-status"
                value={filingStatus}
                onChange={(e) => setFilingStatus(e.target.value as "single" | "married" | "head")}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-raised border border-hairline text-ink text-sm font-medium focus:outline-none focus:ring-2 focus:ring-income"
              >
                <option value="single">Single</option>
                <option value="married">Married Filing Jointly</option>
                <option value="head">Head of Household</option>
              </select>
            </div>

            {/* State Tax Rate */}
            <div>
              <label htmlFor="se-state-tax" className="block text-xs font-semibold text-ink mb-1.5">
                Estimated State Tax (%): {stateTaxRate}%
              </label>
              <input
                id="se-state-tax"
                type="range"
                min="0"
                max="13"
                step="0.5"
                value={stateTaxRate}
                onChange={(e) => setStateTaxRate(Number(e.target.value))}
                className="w-full accent-income mt-2 cursor-pointer"
              />
              <div className="flex justify-between text-[11px] text-ink-muted mt-1">
                <span>0% (TX/FL/WA)</span>
                <span>5% (Avg)</span>
                <span>13% (CA/NY)</span>
              </div>
            </div>
          </div>

          {/* Schedule C Net Profit Callout */}
          <div className="p-4 rounded-xl bg-surface-raised border border-hairline flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-lg bg-income-bg text-income flex items-center justify-center font-bold">
                <DollarSign className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs text-ink-muted font-medium">Net Schedule C Profit</p>
                <p className="text-lg font-bold text-ink">
                  {currency}{Math.round(netProfit).toLocaleString()}
                </p>
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs text-ink-muted">Taxable SE Base (92.35%)</span>
              <p className="text-sm font-semibold text-ink">
                {currency}{Math.round(taxableSEIncome).toLocaleString()}
              </p>
            </div>
          </div>
        </div>

        {/* Right Output & Breakdown Column */}
        <div className="lg:col-span-6 space-y-6">
          {/* Main Result Card */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-surface-raised to-surface border border-hairline-strong shadow-md">
            <div className="flex items-center justify-between pb-4 border-b border-hairline">
              <div>
                <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider">
                  Total Estimated Tax Burden
                </span>
                <div className="text-3xl sm:text-4xl font-black text-ink mt-1">
                  {currency}{Math.round(totalTaxLiability).toLocaleString()}
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex px-3 py-1 rounded-full text-sm font-bold bg-income-bg text-income border border-income-border">
                  {effectiveTaxRate.toFixed(1)}% Total Rate
                </span>
                <p className="text-xs text-ink-muted mt-1">Effective tax rate</p>
              </div>
            </div>

            {/* Quarterly Payment Hero Highlight */}
            <div className="my-5 p-4 rounded-xl bg-income-bg/60 border border-income-border flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Calendar className="w-5 h-5 text-income shrink-0" />
                <div>
                  <p className="text-xs font-bold text-ink">Recommended Quarterly IRS Payment</p>
                  <p className="text-xs text-ink-muted">Due Apr 15, Jun 15, Sep 15, Jan 15</p>
                </div>
              </div>
              <div className="text-right font-black text-xl text-income">
                {currency}{Math.round(quarterlyEstimatedTax).toLocaleString()}
                <span className="text-xs font-normal text-ink-muted block">/ quarter</span>
              </div>
            </div>

            {/* Itemized Tax Breakdown */}
            <div className="space-y-3 pt-2 text-sm">
              <div className="flex justify-between items-center text-ink-secondary">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-income inline-block" />
                  Social Security Tax (12.4%)
                </span>
                <span className="font-semibold text-ink">
                  {currency}{Math.round(socialSecurityTax).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center text-ink-secondary">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky inline-block" />
                  Medicare Tax (2.9% + Addl)
                </span>
                <span className="font-semibold text-ink">
                  {currency}{Math.round(medicareTax).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center text-ink-secondary">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-warning inline-block" />
                  Federal Income Tax (Est.)
                </span>
                <span className="font-semibold text-ink">
                  {currency}{Math.round(estFedTax).toLocaleString()}
                </span>
              </div>

              <div className="flex justify-between items-center text-ink-secondary">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500 inline-block" />
                  State Income Tax ({stateTaxRate}%)
                </span>
                <span className="font-semibold text-ink">
                  {currency}{Math.round(estStateTax).toLocaleString()}
                </span>
              </div>

              <div className="pt-3 border-t border-hairline flex justify-between items-center font-bold">
                <span className="text-income">Estimated Annual Take-Home Pay</span>
                <span className="text-lg text-income">
                  {currency}{Math.round(takeHomeNetProfit).toLocaleString()}
                </span>
              </div>
            </div>

            {/* Copy Button */}
            <div className="mt-6 pt-4 border-t border-hairline flex gap-3">
              <button
                onClick={handleCopySummary}
                className="w-full py-2.5 px-4 rounded-xl bg-surface hover:bg-surface-raised border border-hairline text-ink font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-income" /> Copied Breakdown!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4 text-ink-muted" /> Copy Tax Summary
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Tax Saving Pro Tip */}
          <div className="p-4 rounded-xl bg-surface-raised border border-hairline flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-income shrink-0 mt-0.5" />
            <div className="text-xs text-ink-muted space-y-1">
              <p className="font-semibold text-ink">Tax Deduction Advantage</p>
              <p>
                Every <strong className="text-ink">{currency}1,000</strong> of documented business receipts tracked in Expenseliy saves you approx{" "}
                <strong className="text-income">{currency}{Math.round(1000 * (0.153 + 0.22 + stateTaxRate / 100))}</strong> in combined taxes!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
