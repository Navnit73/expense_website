"use client";

import React, { useState } from "react";
import {
  PieChart,
  Plus,
  Trash2,
  DollarSign,
  TrendingUp,
  RotateCcw,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  Building,
  CreditCard,
} from "lucide-react";

interface AssetLiabilityItem {
  id: string;
  name: string;
  value: number;
}

export function NetWorthCalculator({ className = "" }: { className?: string }) {
  const [currency, setCurrency] = useState<string>("$");
  const [copied, setCopied] = useState<boolean>(false);

  const [assets, setAssets] = useState<AssetLiabilityItem[]>([
    { id: "1", name: "Checking & Cash Savings", value: 18500 },
    { id: "2", name: "Retirement / 401(k) / IRA", value: 65000 },
    { id: "3", name: "Brokerage & Stocks", value: 24000 },
    { id: "4", name: "Real Estate Primary Home Value", value: 380000 },
    { id: "5", name: "Vehicles / Car Equity", value: 16000 },
  ]);

  const [liabilities, setLiabilities] = useState<AssetLiabilityItem[]>([
    { id: "1", name: "Home Mortgage Principal", value: 275000 },
    { id: "2", name: "Auto Loan Balance", value: 11000 },
    { id: "3", name: "Credit Card Balances", value: 3400 },
    { id: "4", name: "Student Loans", value: 14000 },
  ]);

  const addAsset = () => {
    setAssets([...assets, { id: Math.random().toString(36).substring(2, 9), name: "New Asset / Account", value: 5000 }]);
  };

  const removeAsset = (id: string) => {
    if (assets.length > 1) setAssets(assets.filter((a) => a.id !== id));
  };

  const updateAsset = (id: string, field: "name" | "value", val: string | number) => {
    setAssets(assets.map((a) => (a.id === id ? { ...a, [field]: val } : a)));
  };

  const addLiability = () => {
    setLiabilities([...liabilities, { id: Math.random().toString(36).substring(2, 9), name: "New Debt / Loan", value: 2000 }]);
  };

  const removeLiability = (id: string) => {
    if (liabilities.length > 1) setLiabilities(liabilities.filter((l) => l.id !== id));
  };

  const updateLiability = (id: string, field: "name" | "value", val: string | number) => {
    setLiabilities(liabilities.map((l) => (l.id === id ? { ...l, [field]: val } : l)));
  };

  const totalAssets = assets.reduce((acc, a) => acc + a.value, 0);
  const totalLiabilities = liabilities.reduce((acc, l) => acc + l.value, 0);
  const netWorth = totalAssets - totalLiabilities;
  const debtToAssetRatio = totalAssets > 0 ? (totalLiabilities / totalAssets) * 100 : 0;

  const handleReset = () => {
    setAssets([
      { id: "1", name: "Checking & Cash Savings", value: 18500 },
      { id: "2", name: "Retirement / 401(k) / IRA", value: 65000 },
      { id: "3", name: "Brokerage & Stocks", value: 24000 },
      { id: "4", name: "Real Estate Primary Home Value", value: 380000 },
      { id: "5", name: "Vehicles / Car Equity", value: 16000 },
    ]);
    setLiabilities([
      { id: "1", name: "Home Mortgage Principal", value: 275000 },
      { id: "2", name: "Auto Loan Balance", value: 11000 },
      { id: "3", name: "Credit Card Balances", value: 3400 },
      { id: "4", name: "Student Loans", value: 14000 },
    ]);
  };

  const handleCopy = () => {
    const text = `=== Personal Net Worth Balance Sheet ===
Total Assets: ${currency}${totalAssets.toLocaleString()}
Total Liabilities: ${currency}${totalLiabilities.toLocaleString()}
-------------------------------------------
Total Net Worth: ${currency}${netWorth.toLocaleString()}
Debt-to-Asset Ratio: ${debtToAssetRatio.toFixed(1)}%
Calculated via Expenseliy Net Worth Tools`;

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
                Personal Balance Sheet
              </span>
              <span className="inline-flex items-center text-xs text-ink-muted">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-income" /> 100% Private & Client-Side
              </span>
            </div>
            <h2 className="text-2xl font-bold text-ink tracking-tight">
              Net Worth & Personal Balance Sheet Calculator
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              Track your complete assets against debts and liabilities to monitor your true wealth trajectory.
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
      <div className="p-6 md:p-8 space-y-6">
        {/* Net Worth Hero Card */}
        <div className="p-6 rounded-2xl bg-gradient-to-br from-surface-raised to-surface border border-hairline-strong shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider">
              Total Net Worth
            </span>
            <div className={`text-4xl sm:text-5xl font-black mt-1 ${netWorth >= 0 ? "text-income" : "text-expense"}`}>
              {currency}{netWorth.toLocaleString()}
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <div className="p-3 rounded-xl bg-income-bg/40 border border-income-border text-center">
              <span className="text-ink-muted block mb-0.5">Total Assets</span>
              <span className="font-bold text-income text-base">{currency}{totalAssets.toLocaleString()}</span>
            </div>
            <div className="p-3 rounded-xl bg-expense-bg/40 border border-expense-border text-center">
              <span className="text-ink-muted block mb-0.5">Total Debts</span>
              <span className="font-bold text-expense text-base">-{currency}{totalLiabilities.toLocaleString()}</span>
            </div>
            <button
              onClick={handleCopy}
              className="p-3 rounded-xl bg-surface border border-hairline text-ink font-semibold flex items-center gap-1.5 hover:bg-surface-raised transition-all cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-income" /> : <Copy className="w-4 h-4 text-ink-muted" />}
              {copied ? "Copied!" : "Copy"}
            </button>
          </div>
        </div>

        {/* Side-by-side Assets vs Liabilities */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 pt-2">
          {/* Assets Column */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold uppercase tracking-wider text-income flex items-center gap-1.5">
                <Building className="w-3.5 h-3.5" /> What You Own (Assets)
              </h4>
              <button onClick={addAsset} className="text-xs font-semibold text-income hover:underline flex items-center gap-1 cursor-pointer">
                <Plus className="w-3.5 h-3.5" /> Add Asset
              </button>
            </div>

            <div className="space-y-2">
              {assets.map((a) => (
                <div key={a.id} className="flex items-center gap-2 p-2 rounded-xl bg-surface-raised border border-hairline text-xs">
                  <input
                    type="text"
                    value={a.name}
                    onChange={(e) => updateAsset(a.id, "name", e.target.value)}
                    className="flex-1 px-2 py-1 rounded bg-surface border border-hairline text-ink font-medium"
                  />
                  <div className="relative w-28">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-ink-muted">{currency}</span>
                    <input
                      type="number"
                      min="0"
                      value={a.value || ""}
                      onChange={(e) => updateAsset(a.id, "value", Number(e.target.value))}
                      className="w-full pl-6 pr-2 py-1 rounded bg-surface border border-hairline text-ink font-bold text-right"
                    />
                  </div>
                  <button onClick={() => removeAsset(a.id)} className="p-1 text-ink-muted hover:text-expense cursor-pointer">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Liabilities Column */}
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <h4 className="text-xs font-bold uppercase tracking-wider text-expense flex items-center gap-1.5">
                <CreditCard className="w-3.5 h-3.5" /> What You Owe (Liabilities)
              </h4>
              <button onClick={addLiability} className="text-xs font-semibold text-expense hover:underline flex items-center gap-1 cursor-pointer">
                <Plus className="w-3.5 h-3.5" /> Add Debt
              </button>
            </div>

            <div className="space-y-2">
              {liabilities.map((l) => (
                <div key={l.id} className="flex items-center gap-2 p-2 rounded-xl bg-surface-raised border border-hairline text-xs">
                  <input
                    type="text"
                    value={l.name}
                    onChange={(e) => updateLiability(l.id, "name", e.target.value)}
                    className="flex-1 px-2 py-1 rounded bg-surface border border-hairline text-ink font-medium"
                  />
                  <div className="relative w-28">
                    <span className="absolute left-2 top-1/2 -translate-y-1/2 text-ink-muted">{currency}</span>
                    <input
                      type="number"
                      min="0"
                      value={l.value || ""}
                      onChange={(e) => updateLiability(l.id, "value", Number(e.target.value))}
                      className="w-full pl-6 pr-2 py-1 rounded bg-surface border border-hairline text-ink font-bold text-right text-expense"
                    />
                  </div>
                  <button onClick={() => removeLiability(l.id)} className="p-1 text-ink-muted hover:text-expense cursor-pointer">
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
