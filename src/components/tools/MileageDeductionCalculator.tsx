"use client";

import React, { useState } from "react";
import {
  Car,
  DollarSign,
  Fuel,
  TrendingUp,
  ShieldCheck,
  RotateCcw,
  Copy,
  Check,
  Sparkles,
  Download,
  AlertCircle,
  FileSpreadsheet,
} from "lucide-react";

export interface MileageCalculatorProps {
  initialBusinessMiles?: number;
  currencySymbol?: string;
  className?: string;
}

const MILEAGE_PRESETS = [
  { label: "Gig / Rideshare (24k mi)", miles: 24000, gas: 3800, maint: 1800, ins: 1600, dep: 2200 },
  { label: "Outside Sales (15k mi)", miles: 15000, gas: 2400, maint: 1100, ins: 1400, dep: 1800 },
  { label: "Solo Contractor (8k mi)", miles: 8000, gas: 1200, maint: 600, ins: 1200, dep: 1400 },
  { label: "Occasional Travel (3k mi)", miles: 3000, gas: 450, maint: 300, ins: 1100, dep: 1000 },
];

export function MileageDeductionCalculator({
  initialBusinessMiles = 15000,
  currencySymbol = "$",
  className = "",
}: MileageCalculatorProps) {
  const [businessMiles, setBusinessMiles] = useState<number>(initialBusinessMiles);
  const [medicalMiles, setMedicalMiles] = useState<number>(0);
  const [charityMiles, setCharityMiles] = useState<number>(0);
  const [currency, setCurrency] = useState<string>(currencySymbol);
  const [marginalTaxRate, setMarginalTaxRate] = useState<number>(27); // combined fed+state+SE
  const [copied, setCopied] = useState<boolean>(false);

  // Actual Vehicle Expenses Comparison
  const [totalAnnualMiles, setTotalAnnualMiles] = useState<number>(20000);
  const [gasExpense, setGasExpense] = useState<number>(2400);
  const [maintenanceExpense, setMaintenanceExpense] = useState<number>(1100);
  const [insuranceExpense, setInsuranceExpense] = useState<number>(1400);
  const [depreciationExpense, setDepreciationExpense] = useState<number>(1800);

  // IRS Standard Mileage Rates (2026/2024+ benchmark)
  const RATE_BUSINESS = 0.67; // $0.67 / mile
  const RATE_MEDICAL = 0.21; // $0.21 / mile
  const RATE_CHARITY = 0.14; // $0.14 / mile

  // Standard Method Deductions
  const businessDeduction = businessMiles * RATE_BUSINESS;
  const medicalDeduction = medicalMiles * RATE_MEDICAL;
  const charityDeduction = charityMiles * RATE_CHARITY;
  const totalStandardDeduction = businessDeduction + medicalDeduction + charityDeduction;

  // Actual Expense Method
  const totalActualVehicleExpenses = gasExpense + maintenanceExpense + insuranceExpense + depreciationExpense;
  const businessUsePercentage = totalAnnualMiles > 0 ? Math.min(100, (businessMiles / totalAnnualMiles) * 100) : 0;
  const totalActualDeduction = (totalActualVehicleExpenses * businessUsePercentage) / 100;

  // Method Comparison
  const isStandardBetter = totalStandardDeduction >= totalActualDeduction;
  const deductionDifference = Math.abs(totalStandardDeduction - totalActualDeduction);
  const recommendedDeduction = Math.max(totalStandardDeduction, totalActualDeduction);
  const estimatedTaxSavings = (recommendedDeduction * marginalTaxRate) / 100;

  const handleReset = () => {
    setBusinessMiles(15000);
    setMedicalMiles(0);
    setCharityMiles(0);
    setTotalAnnualMiles(20000);
    setGasExpense(2400);
    setMaintenanceExpense(1100);
    setInsuranceExpense(1400);
    setDepreciationExpense(1800);
  };

  const handleCopySummary = () => {
    const text = `=== IRS Mileage Deduction Calculation ===
Business Miles: ${businessMiles.toLocaleString()} mi @ $${RATE_BUSINESS}/mi = ${currency}${Math.round(businessDeduction).toLocaleString()}
Medical/Moving Miles: ${medicalMiles.toLocaleString()} mi @ $${RATE_MEDICAL}/mi = ${currency}${Math.round(medicalDeduction).toLocaleString()}
Charitable Miles: ${charityMiles.toLocaleString()} mi @ $${RATE_CHARITY}/mi = ${currency}${Math.round(charityDeduction).toLocaleString()}
-------------------------------------------
Standard Mileage Deduction: ${currency}${Math.round(totalStandardDeduction).toLocaleString()}
Actual Expenses Method (${businessUsePercentage.toFixed(1)}% business use): ${currency}${Math.round(totalActualDeduction).toLocaleString()}
Recommended Method: ${isStandardBetter ? "Standard IRS Mileage Rate" : "Actual Vehicle Expenses Method"}
Advantage: ${currency}${Math.round(deductionDifference).toLocaleString()} higher deduction
Estimated Cash Tax Savings (${marginalTaxRate}% bracket): ${currency}${Math.round(estimatedTaxSavings).toLocaleString()}
Calculated via Expenseliy Mileage & Expense Tools`;

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  const downloadSampleMileageCsv = () => {
    const csvContent =
      "data:text/csv;charset=utf-8," +
      "Date,Starting Location,Destination,Business Purpose,Start Odometer,End Odometer,Total Miles,Rate,Deduction Amount\n" +
      `2026-03-01,Home Office,Client Site A,Consulting Client Meeting,12400,12435,35,0.67,23.45\n` +
      `2026-03-04,Home Office,Supply Depot,Equipment & Hardware Pickup,12435,12457,22,0.67,14.74\n` +
      `2026-03-10,Client Site A,Airport Terminal,Out of State Client Conference,12457,12502,45,0.67,30.15\n`;
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "IRS_Compliant_Mileage_Log_Template.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className={`w-full rounded-2xl bg-surface border border-hairline shadow-sm overflow-hidden ${className}`}>
      {/* Header Bar */}
      <div className="p-6 md:p-8 bg-gradient-to-r from-sky-bg/40 via-surface to-surface border-b border-hairline">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-bg text-sky border border-sky-border">
                IRS Standard Rates: $0.67 / mi
              </span>
              <span className="inline-flex items-center text-xs text-ink-muted">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-income" /> IRS Schedule C Compliant
              </span>
            </div>
            <h2 className="text-2xl font-bold text-ink tracking-tight">
              IRS Mileage Deduction & Actual Expense Calculator
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              Compare the standard IRS mileage rate against actual vehicle operating expenses to maximize your write-off.
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
          {MILEAGE_PRESETS.map((preset) => (
            <button
              key={preset.label}
              onClick={() => {
                setBusinessMiles(preset.miles);
                setGasExpense(preset.gas);
                setMaintenanceExpense(preset.maint);
                setInsuranceExpense(preset.ins);
                setDepreciationExpense(preset.dep);
                setTotalAnnualMiles(Math.round(preset.miles * 1.25));
              }}
              className="px-3 py-1 rounded-md bg-surface-raised hover:bg-sky-bg hover:text-sky border border-hairline text-ink-secondary transition-all whitespace-nowrap font-medium"
            >
              {preset.label}
            </button>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-muted">
            1. Business & Personal Mileage
          </h3>

          {/* Business Miles */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label htmlFor="business-miles" className="font-semibold text-ink flex items-center gap-1.5">
                <Car className="w-4 h-4 text-sky" /> Business Miles Driven
              </label>
              <span className="text-xs font-bold text-sky">${RATE_BUSINESS} / mile</span>
            </div>
            <div className="relative">
              <input
                id="business-miles"
                type="number"
                min="0"
                step="500"
                value={businessMiles || ""}
                onChange={(e) => setBusinessMiles(Math.max(0, Number(e.target.value) || 0))}
                className="w-full px-4 py-3 rounded-xl bg-surface-raised border border-hairline text-ink font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-sky"
                placeholder="15000"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-semibold text-ink-muted">
                miles
              </span>
            </div>
            <input
              type="range"
              min="500"
              max="60000"
              step="500"
              value={Math.min(businessMiles, 60000)}
              onChange={(e) => setBusinessMiles(Number(e.target.value))}
              aria-label="Business miles slider"
              className="w-full accent-sky cursor-pointer"
            />
          </div>

          {/* Secondary Miles (Medical & Charity) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-1">
            <div>
              <label htmlFor="medical-miles" className="block text-xs font-semibold text-ink mb-1.5">
                Medical / Moving Miles (${RATE_MEDICAL}/mi)
              </label>
              <input
                id="medical-miles"
                type="number"
                min="0"
                value={medicalMiles || ""}
                onChange={(e) => setMedicalMiles(Math.max(0, Number(e.target.value) || 0))}
                placeholder="0"
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-raised border border-hairline text-ink text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky"
              />
            </div>

            <div>
              <label htmlFor="charity-miles" className="block text-xs font-semibold text-ink mb-1.5">
                Charitable Miles (${RATE_CHARITY}/mi)
              </label>
              <input
                id="charity-miles"
                type="number"
                min="0"
                value={charityMiles || ""}
                onChange={(e) => setCharityMiles(Math.max(0, Number(e.target.value) || 0))}
                placeholder="0"
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-raised border border-hairline text-ink text-sm font-medium focus:outline-none focus:ring-2 focus:ring-sky"
              />
            </div>
          </div>

          {/* Actual Expense Method Comparison Accordion / Block */}
          <div className="pt-2 border-t border-hairline space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-muted">
                2. Actual Vehicle Operating Expenses
              </h3>
              <span className="text-xs text-ink-muted">Optional comparison</span>
            </div>

            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <label htmlFor="total-annual-miles" className="text-xs text-ink-muted font-medium block mb-1">Total Annual Miles (All Use)</label>
                <input
                  id="total-annual-miles"
                  type="number"
                  value={totalAnnualMiles || ""}
                  onChange={(e) => setTotalAnnualMiles(Math.max(1, Number(e.target.value) || 1))}
                  className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-hairline text-ink text-sm"
                />
              </div>
              <div>
                <label htmlFor="gas-expense" className="text-xs text-ink-muted font-medium block mb-1">Annual Gas & Oil ({currency})</label>
                <input
                  id="gas-expense"
                  type="number"
                  value={gasExpense || ""}
                  onChange={(e) => setGasExpense(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-hairline text-ink text-sm"
                />
              </div>
              <div>
                <label htmlFor="maint-expense" className="text-xs text-ink-muted font-medium block mb-1">Repairs, Tires, Maint ({currency})</label>
                <input
                  id="maint-expense"
                  type="number"
                  value={maintenanceExpense || ""}
                  onChange={(e) => setMaintenanceExpense(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-hairline text-ink text-sm"
                />
              </div>
              <div>
                <label htmlFor="ins-dep-expense" className="text-xs text-ink-muted font-medium block mb-1">Insurance & Depreciation ({currency})</label>
                <input
                  id="ins-dep-expense"
                  type="number"
                  value={insuranceExpense + depreciationExpense || ""}
                  onChange={(e) => {
                    const half = (Number(e.target.value) || 0) / 2;
                    setInsuranceExpense(half);
                    setDepreciationExpense(half);
                  }}
                  className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-hairline text-ink text-sm"
                />
              </div>
            </div>

            <div className="text-xs text-ink-muted">
              Business use ratio: <strong className="text-ink">{businessUsePercentage.toFixed(1)}%</strong> of total vehicle operating costs.
            </div>
          </div>
        </div>

        {/* Right Output & Deduction Comparison */}
        <div className="lg:col-span-6 space-y-6">
          {/* Winner Method Box */}
          <div className="p-6 rounded-2xl bg-gradient-to-br from-surface-raised to-surface border border-hairline-strong shadow-md">
            <div className="flex items-center justify-between pb-4 border-b border-hairline">
              <div>
                <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider">
                  Optimal Tax Write-Off
                </span>
                <div className="text-3xl sm:text-4xl font-black text-income mt-1">
                  {currency}{Math.round(recommendedDeduction).toLocaleString()}
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-income-bg text-income border border-income-border">
                  {isStandardBetter ? "Standard Rate Wins" : "Actual Expenses Win"}
                </span>
                <p className="text-xs text-ink-muted mt-1">
                  +{currency}{Math.round(deductionDifference).toLocaleString()} advantage
                </p>
              </div>
            </div>

            {/* Estimated Cash Tax Savings */}
            <div className="my-5 p-4 rounded-xl bg-income-bg/60 border border-income-border flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <DollarSign className="w-5 h-5 text-income shrink-0" />
                <div>
                  <p className="text-xs font-bold text-ink">Estimated Tax Savings in Cash</p>
                  <p className="text-xs text-ink-muted">Based on ~{marginalTaxRate}% combined tax bracket</p>
                </div>
              </div>
              <div className="text-right font-black text-xl text-income">
                {currency}{Math.round(estimatedTaxSavings).toLocaleString()}
              </div>
            </div>

            {/* Side-by-Side Comparison */}
            <div className="grid grid-cols-2 gap-3 pt-2 text-sm">
              <div className={`p-3.5 rounded-xl border ${isStandardBetter ? "bg-income-bg/30 border-income-border" : "bg-surface border-hairline"}`}>
                <p className="text-xs font-bold text-ink mb-1">Standard IRS Method</p>
                <p className="text-lg font-bold text-ink">
                  {currency}{Math.round(totalStandardDeduction).toLocaleString()}
                </p>
                <p className="text-[11px] text-ink-muted mt-1">
                  {businessMiles.toLocaleString()} mi × ${RATE_BUSINESS}
                </p>
              </div>

              <div className={`p-3.5 rounded-xl border ${!isStandardBetter ? "bg-income-bg/30 border-income-border" : "bg-surface border-hairline"}`}>
                <p className="text-xs font-bold text-ink mb-1">Actual Expense Method</p>
                <p className="text-lg font-bold text-ink">
                  {currency}{Math.round(totalActualDeduction).toLocaleString()}
                </p>
                <p className="text-[11px] text-ink-muted mt-1">
                  {businessUsePercentage.toFixed(1)}% of {currency}{Math.round(totalActualVehicleExpenses).toLocaleString()}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="mt-6 pt-4 border-t border-hairline flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleCopySummary}
                className="flex-1 py-2.5 px-4 rounded-xl bg-surface hover:bg-surface-raised border border-hairline text-ink font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-income" /> : <Copy className="w-4 h-4 text-ink-muted" />}
                {copied ? "Copied Summary!" : "Copy Tax Summary"}
              </button>

              <button
                onClick={downloadSampleMileageCsv}
                className="py-2.5 px-4 rounded-xl bg-surface-raised hover:bg-surface border border-hairline text-ink font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                title="Download CSV mileage log template"
              >
                <FileSpreadsheet className="w-4 h-4 text-sky" /> IRS CSV Log
              </button>
            </div>
          </div>

          {/* IRS Recordkeeping Tip */}
          <div className="p-4 rounded-xl bg-surface-raised border border-hairline flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-sky shrink-0 mt-0.5" />
            <div className="text-xs text-ink-muted space-y-1">
              <p className="font-semibold text-ink">IRS Mileage Audit Requirement</p>
              <p>
                To qualify for the mileage deduction, the IRS requires a contemporaneous log showing the <strong>date</strong>, <strong>destination</strong>, <strong>business purpose</strong>, and <strong>mileage</strong> for each trip.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
