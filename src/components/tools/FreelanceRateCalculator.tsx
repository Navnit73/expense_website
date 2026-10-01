"use client";

import React, { useState } from "react";
import {
  DollarSign,
  Clock,
  Briefcase,
  TrendingUp,
  RotateCcw,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  Calendar,
  Layers,
} from "lucide-react";

export interface FreelanceRateProps {
  initialTargetIncome?: number;
  currencySymbol?: string;
  className?: string;
}

const INDUSTRY_PRESETS = [
  { label: "Software Engineer", target: 120000, overhead: 14000, billableHours: 25, ptoWeeks: 4 },
  { label: "Product / UX Designer", target: 95000, overhead: 10000, billableHours: 25, ptoWeeks: 4 },
  { label: "Marketing / SEO Consultant", target: 80000, overhead: 8000, billableHours: 24, ptoWeeks: 3 },
  { label: "Copywriter / Content", target: 65000, overhead: 5000, billableHours: 22, ptoWeeks: 3 },
  { label: "Senior Strategist", target: 160000, overhead: 18000, billableHours: 20, ptoWeeks: 5 },
];

export function FreelanceRateCalculator({
  initialTargetIncome = 95000,
  currencySymbol = "$",
  className = "",
}: FreelanceRateProps) {
  const [targetTakeHome, setTargetTakeHome] = useState<number>(initialTargetIncome);
  const [annualOverhead, setAnnualOverhead] = useState<number>(10000);
  const [billableHoursPerWeek, setBillableHoursPerWeek] = useState<number>(25);
  const [vacationHolidaysWeeks, setVacationHolidaysWeeks] = useState<number>(4);
  const [taxBufferPct, setTaxBufferPct] = useState<number>(28); // SE tax + income tax
  const [profitBufferPct, setProfitBufferPct] = useState<number>(15); // Reinvestment / downtime buffer
  const [currency, setCurrency] = useState<string>(currencySymbol);
  const [copied, setCopied] = useState<boolean>(false);

  // Calculations
  const workingWeeksPerYear = Math.max(1, 52 - vacationHolidaysWeeks);
  const totalAnnualBillableHours = workingWeeksPerYear * billableHoursPerWeek;

  // Gross Revenue Required = (Target Take Home + Overhead) / (1 - TaxRate - ProfitRate)
  // Or Net Revenue needed = (Target / (1 - TaxRate)) + Overhead + Profit Margin
  const preTaxIncomeNeeded = targetTakeHome / (1 - taxBufferPct / 100);
  const profitMarginAmount = (preTaxIncomeNeeded + annualOverhead) * (profitBufferPct / 100);
  const grossRevenueTarget = preTaxIncomeNeeded + annualOverhead + profitMarginAmount;

  const breakEvenHourlyRate = totalAnnualBillableHours > 0 ? (preTaxIncomeNeeded + annualOverhead) / totalAnnualBillableHours : 0;
  const targetHourlyRate = totalAnnualBillableHours > 0 ? grossRevenueTarget / totalAnnualBillableHours : 0;
  const dayRate = targetHourlyRate * 8;
  const weeklyRate = targetHourlyRate * billableHoursPerWeek;
  const monthlyRetainer = grossRevenueTarget / 12;

  // W-2 Equivalent Salary (Accounting for employee benefits, matching 401k, half SE tax paid by employer)
  const w2EquivalentSalary = targetTakeHome * 1.15;

  const handleReset = () => {
    setTargetTakeHome(95000);
    setAnnualOverhead(10000);
    setBillableHoursPerWeek(25);
    setVacationHolidaysWeeks(4);
    setTaxBufferPct(28);
    setProfitBufferPct(15);
  };

  const handleCopy = () => {
    const text = `=== Freelance Billable Rate Recommendation ===
Desired Net Take-Home: ${currency}${targetTakeHome.toLocaleString()} / year
Annual Business Overhead: ${currency}${annualOverhead.toLocaleString()} / year
Working Schedule: ${billableHoursPerWeek} billable hrs/wk × ${workingWeeksPerYear} weeks (${totalAnnualBillableHours} hrs/yr)
Gross Annual Revenue Goal: ${currency}${Math.round(grossRevenueTarget).toLocaleString()}
-------------------------------------------
Recommended Hourly Rate: ${currency}${Math.round(targetHourlyRate)} / hr
Day Rate (8 hrs): ${currency}${Math.round(dayRate)} / day
Weekly Client Retainer: ${currency}${Math.round(weeklyRate)} / week
Monthly Client Retainer: ${currency}${Math.round(monthlyRetainer)} / month
Minimum Break-Even Floor: ${currency}${Math.round(breakEvenHourlyRate)} / hr
Equivalent Full-Time W-2 Salary: ${currency}${Math.round(w2EquivalentSalary).toLocaleString()}
Calculated via Expenseliy Freelance Rate Calculator`;

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
                Freelance & Agency Pricing Engine
              </span>
              <span className="inline-flex items-center text-xs text-ink-muted">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-income" /> 100% Client-Side
              </span>
            </div>
            <h2 className="text-2xl font-bold text-ink tracking-tight">
              Freelance Hourly Rate & Target Salary Calculator
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              Calculate the exact hourly, daily, and monthly rate to charge based on take-home goals, taxes, overhead, and non-billable hours.
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
          <span className="text-ink-muted font-medium whitespace-nowrap">Industry Roles:</span>
          {INDUSTRY_PRESETS.map((p) => (
            <button
              key={p.label}
              onClick={() => {
                setTargetTakeHome(p.target);
                setAnnualOverhead(p.overhead);
                setBillableHoursPerWeek(p.billableHours);
                setVacationHolidaysWeeks(p.ptoWeeks);
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
            1. Income Goal & Overhead
          </h3>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label htmlFor="target-income" className="font-semibold text-ink">Desired Annual Take-Home (Net Salary)</label>
              <span className="text-xs text-income font-medium">{currency}{Math.round(targetTakeHome / 12)}/mo</span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted font-medium">
                {currency}
              </span>
              <input
                id="target-income"
                type="number"
                min="10000"
                step="5000"
                value={targetTakeHome || ""}
                onChange={(e) => setTargetTakeHome(Math.max(0, Number(e.target.value) || 0))}
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-surface-raised border border-hairline text-ink font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-income"
              />
            </div>
            <input
              type="range"
              min="30000"
              max="300000"
              step="5000"
              value={Math.min(targetTakeHome, 300000)}
              onChange={(e) => setTargetTakeHome(Number(e.target.value))}
              aria-label="Target income slider"
              className="w-full accent-income cursor-pointer"
            />
          </div>

          <div className="space-y-2">
            <div className="flex justify-between items-center text-sm">
              <label htmlFor="annual-overhead" className="font-semibold text-ink">Annual Business Overhead & Software</label>
              <span className="text-xs text-ink-muted">SaaS, health insurance, gear, CPA</span>
            </div>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted font-medium">
                {currency}
              </span>
              <input
                id="annual-overhead"
                type="number"
                min="0"
                step="500"
                value={annualOverhead || ""}
                onChange={(e) => setAnnualOverhead(Math.max(0, Number(e.target.value) || 0))}
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-surface-raised border border-hairline text-ink font-semibold text-base focus:outline-none focus:ring-2 focus:ring-income"
              />
            </div>
          </div>

          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-muted pt-2">
            2. Working Schedule & Reality Check
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="billable-hrs" className="block text-xs font-semibold text-ink mb-1.5">
                Billable Hours / Week: <span className="text-income">{billableHoursPerWeek} hrs</span>
              </label>
              <input
                id="billable-hrs"
                type="range"
                min="10"
                max="40"
                step="1"
                value={billableHoursPerWeek}
                onChange={(e) => setBillableHoursPerWeek(Number(e.target.value))}
                className="w-full accent-income cursor-pointer"
              />
              <p className="text-[11px] text-ink-muted mt-1">
                Typical freelance average is 20–25 hrs (rest is admin/marketing).
              </p>
            </div>

            <div>
              <label htmlFor="vacation-wks" className="block text-xs font-semibold text-ink mb-1.5">
                Unpaid PTO / Holidays: <span className="text-income">{vacationHolidaysWeeks} weeks</span>
              </label>
              <input
                id="vacation-wks"
                type="range"
                min="1"
                max="10"
                step="1"
                value={vacationHolidaysWeeks}
                onChange={(e) => setVacationHolidaysWeeks(Number(e.target.value))}
                className="w-full accent-income cursor-pointer"
              />
              <p className="text-[11px] text-ink-muted mt-1">
                {workingWeeksPerYear} active working weeks ({totalAnnualBillableHours} billable hrs/yr).
              </p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 pt-2">
            <div>
              <label htmlFor="tax-buffer" className="text-xs text-ink-muted font-medium block mb-1">
                Tax Buffer (%): {taxBufferPct}%
              </label>
              <input
                id="tax-buffer"
                type="range"
                min="15"
                max="45"
                value={taxBufferPct}
                onChange={(e) => setTaxBufferPct(Number(e.target.value))}
                className="w-full accent-income cursor-pointer"
              />
            </div>
            <div>
              <label htmlFor="profit-margin" className="text-xs text-ink-muted font-medium block mb-1">
                Profit Margin Buffer: {profitBufferPct}%
              </label>
              <input
                id="profit-margin"
                type="range"
                min="0"
                max="30"
                value={profitBufferPct}
                onChange={(e) => setProfitBufferPct(Number(e.target.value))}
                className="w-full accent-income cursor-pointer"
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
                  Target Hourly Billable Rate
                </span>
                <div className="text-4xl sm:text-5xl font-black text-income mt-1">
                  {currency}{Math.round(targetHourlyRate)}
                  <span className="text-sm font-normal text-ink-muted"> / hour</span>
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-income-bg text-income border border-income-border">
                  Gross: {currency}{Math.round(grossRevenueTarget).toLocaleString()}/yr
                </span>
                <p className="text-xs text-ink-muted mt-1">Total revenue needed</p>
              </div>
            </div>

            {/* Pricing Packages Grid */}
            <div className="grid grid-cols-3 gap-3 my-5">
              <div className="p-3 rounded-xl bg-surface border border-hairline text-center">
                <span className="text-[11px] text-ink-muted font-medium block">Day Rate (8h)</span>
                <span className="text-base font-bold text-ink">{currency}{Math.round(dayRate)}</span>
              </div>
              <div className="p-3 rounded-xl bg-surface border border-hairline text-center">
                <span className="text-[11px] text-ink-muted font-medium block">Weekly Retainer</span>
                <span className="text-base font-bold text-ink">{currency}{Math.round(weeklyRate)}</span>
              </div>
              <div className="p-3 rounded-xl bg-surface border border-hairline text-center">
                <span className="text-[11px] text-ink-muted font-medium block">Monthly Retainer</span>
                <span className="text-base font-bold text-ink">{currency}{Math.round(monthlyRetainer)}</span>
              </div>
            </div>

            {/* Rate Safety Thresholds */}
            <div className="space-y-3 pt-2 text-sm">
              <div className="flex justify-between items-center text-ink-secondary">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-expense inline-block" />
                  Absolute Break-Even Floor (0% profit)
                </span>
                <span className="font-semibold text-ink">
                  {currency}{Math.round(breakEvenHourlyRate)} / hr
                </span>
              </div>

              <div className="flex justify-between items-center text-ink-secondary">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-sky inline-block" />
                  Equivalent Full-Time W-2 Job
                </span>
                <span className="font-semibold text-ink">
                  {currency}{Math.round(w2EquivalentSalary).toLocaleString()} / yr
                </span>
              </div>

              <div className="flex justify-between items-center text-ink-secondary">
                <span className="flex items-center gap-1.5">
                  <span className="w-2.5 h-2.5 rounded-full bg-income inline-block" />
                  Annual Billable Hours Capacity
                </span>
                <span className="font-semibold text-ink">
                  {totalAnnualBillableHours} hours / yr
                </span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-hairline">
              <button
                onClick={handleCopy}
                className="w-full py-2.5 px-4 rounded-xl bg-surface hover:bg-surface-raised border border-hairline text-ink font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-income" /> : <Copy className="w-4 h-4 text-ink-muted" />}
                {copied ? "Copied Rate Card!" : "Copy Freelance Rate Summary"}
              </button>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-raised border border-hairline flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-income shrink-0 mt-0.5" />
            <div className="text-xs text-ink-muted space-y-1">
              <p className="font-semibold text-ink">Invoicing Tip</p>
              <p>
                Use Expenseliy Free Invoice Generator to create sleek, itemized client invoices with your calculated hourly rates and zero transaction fees.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
