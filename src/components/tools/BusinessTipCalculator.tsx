"use client";

import React, { useState } from "react";
import {
  Utensils,
  DollarSign,
  Users,
  RotateCcw,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
} from "lucide-react";

export function BusinessTipCalculator({ className = "" }: { className?: string }) {
  const [billSubtotal, setBillSubtotal] = useState<number>(145);
  const [taxAmount, setTaxAmount] = useState<number>(12.5);
  const [tipPercentage, setTipPercentage] = useState<number>(20);
  const [tipOnTax, setTipOnTax] = useState<boolean>(false);
  const [numPeople, setNumPeople] = useState<number>(3);
  const [currency, setCurrency] = useState<string>("$");
  const [roundUp, setRoundUp] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);

  // Calculations
  const tipBase = tipOnTax ? billSubtotal + taxAmount : billSubtotal;
  let rawTip = (tipBase * tipPercentage) / 100;
  let totalWithTipAndTax = billSubtotal + taxAmount + rawTip;

  if (roundUp) {
    const roundedTotal = Math.ceil(totalWithTipAndTax);
    rawTip += roundedTotal - totalWithTipAndTax;
    totalWithTipAndTax = roundedTotal;
  }

  const perPersonTotal = numPeople > 0 ? totalWithTipAndTax / numPeople : 0;
  const perPersonTip = numPeople > 0 ? rawTip / numPeople : 0;

  const handleReset = () => {
    setBillSubtotal(145);
    setTaxAmount(12.5);
    setTipPercentage(20);
    setNumPeople(3);
    setRoundUp(false);
  };

  const handleCopy = () => {
    const text = `=== Business Meal Receipt & Tip Split ===
Bill Subtotal: ${currency}${billSubtotal.toFixed(2)}
Tax: ${currency}${taxAmount.toFixed(2)}
Tip (${tipPercentage}% ${tipOnTax ? "on total" : "pre-tax"}): ${currency}${rawTip.toFixed(2)}
-------------------------------------------
Total Bill: ${currency}${totalWithTipAndTax.toFixed(2)}
Split Among: ${numPeople} people
Per Person Share: ${currency}${perPersonTotal.toFixed(2)} (incl. ${currency}${perPersonTip.toFixed(2)} tip)
Calculated via Expenseliy Business Meal Tools`;

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
                Client Dining & Bill Splitter
              </span>
              <span className="inline-flex items-center text-xs text-ink-muted">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-income" /> 100% Client-Side
              </span>
            </div>
            <h2 className="text-2xl font-bold text-ink tracking-tight">
              Business Meal Tip & Bill Split Calculator
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              Calculate pre-tax tips, split dinner bills evenly among clients or colleagues, and generate receipt breakdowns.
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
            1. Restaurant Receipt Details
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="meal-subtotal-input" className="block text-xs font-semibold text-ink mb-1">Meal Subtotal (Pre-Tax)</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-xs">{currency}</span>
                <input
                  id="meal-subtotal-input"
                  type="number"
                  min="0"
                  value={billSubtotal || ""}
                  onChange={(e) => setBillSubtotal(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full pl-7 pr-3 py-2.5 rounded-xl bg-surface-raised border border-hairline text-ink text-sm font-semibold"
                />
              </div>
            </div>

            <div>
              <label htmlFor="tax-amount-input" className="block text-xs font-semibold text-ink mb-1">Tax Amount</label>
              <div className="relative">
                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-ink-muted text-xs">{currency}</span>
                <input
                  id="tax-amount-input"
                  type="number"
                  min="0"
                  value={taxAmount || ""}
                  onChange={(e) => setTaxAmount(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full pl-7 pr-3 py-2.5 rounded-xl bg-surface-raised border border-hairline text-ink text-sm font-semibold"
                />
              </div>
            </div>
          </div>

          {/* Tip Percentage Buttons */}
          <div className="space-y-2">
            <label className="block text-xs font-semibold text-ink">Tip Percentage</label>
            <div className="grid grid-cols-5 gap-2">
              {[15, 18, 20, 22, 25].map((pct) => (
                <button
                  key={pct}
                  type="button"
                  onClick={() => setTipPercentage(pct)}
                  className={`py-2 rounded-xl text-xs font-bold transition-all ${
                    tipPercentage === pct
                      ? "bg-income text-white"
                      : "bg-surface-raised text-ink border border-hairline hover:border-income"
                  }`}
                >
                  {pct}%
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            <div>
              <label htmlFor="num-diners-input" className="block text-xs font-semibold text-ink mb-1">Number of Diners (Split)</label>
              <input
                id="num-diners-input"
                type="number"
                min="1"
                max="50"
                value={numPeople}
                onChange={(e) => setNumPeople(Math.max(1, Number(e.target.value) || 1))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-surface-raised border border-hairline text-ink text-sm font-semibold"
              />
            </div>

            <div className="flex flex-col justify-end gap-2 text-xs text-ink font-medium">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={roundUp}
                  onChange={(e) => setRoundUp(e.target.checked)}
                  className="accent-income rounded"
                />
                Round total to whole dollar
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={tipOnTax}
                  onChange={(e) => setTipOnTax(e.target.checked)}
                  className="accent-income rounded"
                />
                Calculate tip on post-tax total
              </label>
            </div>
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-surface-raised to-surface border border-hairline-strong shadow-md">
            <div className="flex items-center justify-between pb-4 border-b border-hairline">
              <div>
                <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider">
                  Total Bill (With Tip & Tax)
                </span>
                <div className="text-4xl sm:text-5xl font-black text-ink mt-1">
                  {currency}{totalWithTipAndTax.toFixed(2)}
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-income-bg text-income border border-income-border">
                  Tip: {currency}{rawTip.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Split Highlight */}
            <div className="my-5 p-4 rounded-xl bg-income-bg/60 border border-income-border flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="w-5 h-5 text-income" />
                <div>
                  <p className="text-xs font-bold text-ink">Per Person Payment</p>
                  <p className="text-xs text-ink-muted">Equal split among {numPeople} diners</p>
                </div>
              </div>
              <div className="text-right font-black text-2xl text-income">
                {currency}{perPersonTotal.toFixed(2)}
                <span className="text-xs font-normal text-ink-muted block">each</span>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-hairline">
              <button
                onClick={handleCopy}
                className="w-full py-2.5 px-4 rounded-xl bg-surface hover:bg-surface-raised border border-hairline text-ink font-semibold text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-4 h-4 text-income" /> : <Copy className="w-4 h-4 text-ink-muted" />}
                {copied ? "Copied Meal Split!" : "Copy Meal Receipt Summary"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
