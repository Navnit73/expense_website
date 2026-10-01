"use client";

import React, { useState } from "react";
import {
  MapPin,
  Calendar,
  DollarSign,
  Utensils,
  Hotel,
  RotateCcw,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

interface CityRate {
  city: string;
  lodging: number;
  mie: number; // Meals & Incidental Expenses
}

const GSA_RATES: CityRate[] = [
  { city: "New York City, NY", lodging: 288, mie: 79 },
  { city: "San Francisco, CA", lodging: 270, mie: 79 },
  { city: "Chicago, IL", lodging: 220, mie: 74 },
  { city: "Washington, DC", lodging: 258, mie: 79 },
  { city: "Austin, TX", lodging: 185, mie: 69 },
  { city: "Miami, FL", lodging: 210, mie: 69 },
  { city: "Standard US Baseline (CONUS)", lodging: 107, mie: 59 },
];

export function PerDiemCalculator({ className = "" }: { className?: string }) {
  const [selectedCity, setSelectedCity] = useState<string>("New York City, NY");
  const [days, setDays] = useState<number>(4);
  const [lodgingNights, setLodgingNights] = useState<number>(3);
  const [customLodgingRate, setCustomLodgingRate] = useState<number>(288);
  const [customMieRate, setCustomMieRate] = useState<number>(79);
  const [currency, setCurrency] = useState<string>("$");
  const [copied, setCopied] = useState<boolean>(false);

  const handleCityChange = (cityName: string) => {
    setSelectedCity(cityName);
    const found = GSA_RATES.find((c) => c.city === cityName);
    if (found) {
      setCustomLodgingRate(found.lodging);
      setCustomMieRate(found.mie);
    }
  };

  // First and last day travel rule: 75% of M&IE rate
  const fullDays = Math.max(0, days - 2);
  const firstLastDaysCount = Math.min(days, 2);
  const totalMealsAllowed = (fullDays * customMieRate) + (firstLastDaysCount * customMieRate * 0.75);
  const totalLodgingAllowed = lodgingNights * customLodgingRate;
  const totalPerDiemReimbursement = totalMealsAllowed + totalLodgingAllowed;

  // IRS 50% rule for business meals
  const taxDeductibleMealsPortion = totalMealsAllowed * 0.50;
  const totalTaxDeductibleExpenses = totalLodgingAllowed + taxDeductibleMealsPortion;

  const handleReset = () => {
    handleCityChange("New York City, NY");
    setDays(4);
    setLodgingNights(3);
  };

  const handleCopy = () => {
    const text = `=== Business Travel Per Diem Allowance ===
Destination: ${selectedCity}
Duration: ${days} travel days (${lodgingNights} hotel nights)
Daily Lodging Rate: ${currency}${customLodgingRate}/night | Daily M&IE Rate: ${currency}${customMieRate}/day
-------------------------------------------
Total Lodging Allowance: ${currency}${totalLodgingAllowed.toFixed(2)}
Total Meals & Incidentals (M&IE): ${currency}${totalMealsAllowed.toFixed(2)} (75% rule on travel days)
Total Travel Expense Voucher: ${currency}${totalPerDiemReimbursement.toFixed(2)}
IRS Deductible Portion (100% lodging + 50% meals): ${currency}${totalTaxDeductibleExpenses.toFixed(2)}
Calculated via Expenseliy Per Diem Tools`;

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
                GSA Federal Benchmark & 75% Rule
              </span>
              <span className="inline-flex items-center text-xs text-ink-muted">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-income" /> 100% IRS Compliant
              </span>
            </div>
            <h2 className="text-2xl font-bold text-ink tracking-tight">
              Business Travel Per Diem & Meal Deduction Calculator
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              Calculate daily meal allowances (M&IE), lodging limits, and IRS 50% business meal write-offs for domestic travel.
            </p>
          </div>

          <div className="flex items-center gap-2">
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
            1. Travel Destination & Duration
          </h3>

          <div className="space-y-2">
            <label htmlFor="per-diem-city-select" className="block text-xs font-semibold text-ink">Destination City Preset</label>
            <select
              id="per-diem-city-select"
              value={selectedCity}
              onChange={(e) => handleCityChange(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl bg-surface-raised border border-hairline text-ink text-sm font-medium"
            >
              {GSA_RATES.map((r) => (
                <option key={r.city} value={r.city}>
                  {r.city} (Lodging: ${r.lodging}/nt, Meals: ${r.mie}/day)
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="per-diem-days-input" className="block text-xs font-semibold text-ink mb-1.5">Total Travel Days</label>
              <input
                id="per-diem-days-input"
                type="number"
                min="1"
                value={days}
                onChange={(e) => {
                  const val = Math.max(1, Number(e.target.value) || 1);
                  setDays(val);
                  setLodgingNights(Math.max(0, val - 1));
                }}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-raised border border-hairline text-ink text-sm font-semibold"
              />
              <span className="text-[11px] text-ink-muted mt-1 block">First/Last day at 75% M&IE</span>
            </div>

            <div>
              <label htmlFor="per-diem-nights-input" className="block text-xs font-semibold text-ink mb-1.5">Hotel / Lodging Nights</label>
              <input
                id="per-diem-nights-input"
                type="number"
                min="0"
                value={lodgingNights}
                onChange={(e) => setLodgingNights(Math.max(0, Number(e.target.value) || 0))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-raised border border-hairline text-ink text-sm font-semibold"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-2">
            <div>
              <label htmlFor="custom-lodging-rate-input" className="text-xs text-ink-muted font-medium block mb-1">Max Lodging / Night</label>
              <input
                id="custom-lodging-rate-input"
                type="number"
                value={customLodgingRate}
                onChange={(e) => setCustomLodgingRate(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-hairline text-ink text-sm"
              />
            </div>

            <div>
              <label htmlFor="custom-mie-rate-input" className="text-xs text-ink-muted font-medium block mb-1">Daily Meals & Incidentals</label>
              <input
                id="custom-mie-rate-input"
                type="number"
                value={customMieRate}
                onChange={(e) => setCustomMieRate(Number(e.target.value))}
                className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-hairline text-ink text-sm"
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
                  Total Allowed Travel Allowance
                </span>
                <div className="text-3xl sm:text-4xl font-black text-income mt-1">
                  {currency}{totalPerDiemReimbursement.toFixed(2)}
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-ink-muted block">IRS Deductible Portion:</span>
                <span className="text-lg font-bold text-ink">{currency}{totalTaxDeductibleExpenses.toFixed(2)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 my-5">
              <div className="p-3.5 rounded-xl bg-surface border border-hairline">
                <span className="text-xs text-ink-muted block mb-1 flex items-center gap-1"><Hotel className="w-3.5 h-3.5" /> Lodging Total</span>
                <span className="text-lg font-bold text-ink">{currency}{totalLodgingAllowed.toFixed(2)}</span>
                <span className="text-[11px] text-ink-muted block mt-1">{lodgingNights} nights × {currency}{customLodgingRate}</span>
              </div>

              <div className="p-3.5 rounded-xl bg-surface border border-hairline">
                <span className="text-xs text-ink-muted block mb-1 flex items-center gap-1"><Utensils className="w-3.5 h-3.5" /> Meals & Incidentals</span>
                <span className="text-lg font-bold text-ink">{currency}{totalMealsAllowed.toFixed(2)}</span>
                <span className="text-[11px] text-ink-muted block mt-1">Includes 75% travel day rule</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-hairline">
              <button
                onClick={handleCopy}
                className="w-full py-2.5 px-4 rounded-xl bg-surface hover:bg-surface-raised border border-hairline text-ink font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-income" /> : <Copy className="w-4 h-4 text-ink-muted" />}
                {copied ? "Copied Travel Summary!" : "Copy Per Diem Expense Voucher"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
