"use client";

import React, { useState } from "react";
import {
  CreditCard,
  Plus,
  Trash2,
  DollarSign,
  TrendingDown,
  RotateCcw,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";

interface DebtItem {
  id: string;
  name: string;
  balance: number;
  rate: number; // APR %
  minPayment: number;
}

export function DebtPayoffCalculator({ className = "" }: { className?: string }) {
  const [extraPayment, setExtraPayment] = useState<number>(300);
  const [strategy, setStrategy] = useState<"avalanche" | "snowball">("avalanche");
  const [currency, setCurrency] = useState<string>("$");
  const [copied, setCopied] = useState<boolean>(false);

  const [debts, setDebts] = useState<DebtItem[]>([
    { id: "1", name: "Credit Card (High APR)", balance: 6500, rate: 24.99, minPayment: 180 },
    { id: "2", name: "Personal Consolidation Loan", balance: 12000, rate: 11.5, minPayment: 320 },
    { id: "3", name: "Auto Loan", balance: 18000, rate: 6.2, minPayment: 410 },
  ]);

  const addDebt = () => {
    setDebts([
      ...debts,
      {
        id: Math.random().toString(36).substring(2, 9),
        name: "New Debt Account",
        balance: 3000,
        rate: 18.0,
        minPayment: 90,
      },
    ]);
  };

  const removeDebt = (id: string) => {
    if (debts.length > 1) {
      setDebts(debts.filter((d) => d.id !== id));
    }
  };

  const updateDebt = (id: string, field: keyof DebtItem, val: string | number) => {
    setDebts(debts.map((d) => (d.id === id ? { ...d, [field]: val } : d)));
  };

  const totalBalance = debts.reduce((acc, d) => acc + d.balance, 0);
  const totalMinPayment = debts.reduce((acc, d) => acc + d.minPayment, 0);
  const totalMonthlyBudget = totalMinPayment + extraPayment;

  // Payoff Simulation Function
  const simulatePayoff = (method: "avalanche" | "snowball") => {
    let currentDebts = debts.map((d) => ({ ...d }));
    // Sort debts based on method
    if (method === "avalanche") {
      currentDebts.sort((a, b) => b.rate - a.rate); // Highest interest rate first
    } else {
      currentDebts.sort((a, b) => a.balance - b.balance); // Lowest balance first
    }

    let months = 0;
    let totalInterest = 0;
    const maxMonths = 360; // 30 yr safety limit

    while (currentDebts.some((d) => d.balance > 0) && months < maxMonths) {
      months++;
      let extraAvailable = extraPayment;

      // 1. Accrue monthly interest on all active balances
      for (const d of currentDebts) {
        if (d.balance > 0) {
          const monthlyRate = d.rate / 100 / 12;
          const interest = d.balance * monthlyRate;
          totalInterest += interest;
          d.balance += interest;
        }
      }

      // 2. Pay minimums
      for (const d of currentDebts) {
        if (d.balance > 0) {
          const payment = Math.min(d.balance, d.minPayment);
          d.balance -= payment;
        }
      }

      // 3. Put extra payment toward top targeted priority debt
      for (const d of currentDebts) {
        if (d.balance > 0 && extraAvailable > 0) {
          const extraApplied = Math.min(d.balance, extraAvailable);
          d.balance -= extraApplied;
          extraAvailable -= extraApplied;
        }
      }
    }

    return { months, totalInterest };
  };

  const avalancheResult = simulatePayoff("avalanche");
  const snowballResult = simulatePayoff("snowball");
  const activeResult = strategy === "avalanche" ? avalancheResult : snowballResult;

  const handleReset = () => {
    setDebts([
      { id: "1", name: "Credit Card (High APR)", balance: 6500, rate: 24.99, minPayment: 180 },
      { id: "2", name: "Personal Consolidation Loan", balance: 12000, rate: 11.5, minPayment: 320 },
      { id: "3", name: "Auto Loan", balance: 18000, rate: 6.2, minPayment: 410 },
    ]);
    setExtraPayment(300);
  };

  const handleCopy = () => {
    const text = `=== Debt Payoff Strategy Simulation ===
Total Debt Principal: ${currency}${totalBalance.toLocaleString()}
Total Minimum Monthly Payment: ${currency}${totalMinPayment.toLocaleString()}
Extra Monthly Acceleration: +${currency}${extraPayment.toLocaleString()} / mo (Total: ${currency}${totalMonthlyBudget.toLocaleString()}/mo)
-------------------------------------------
1. Debt Avalanche (Highest APR First):
   - Debt-Free in: ${avalancheResult.months} months (${(avalancheResult.months / 12).toFixed(1)} years)
   - Total Interest Paid: ${currency}${Math.round(avalancheResult.totalInterest).toLocaleString()}

2. Debt Snowball (Lowest Balance First):
   - Debt-Free in: ${snowballResult.months} months (${(snowballResult.months / 12).toFixed(1)} years)
   - Total Interest Paid: ${currency}${Math.round(snowballResult.totalInterest).toLocaleString()}
-------------------------------------------
Active Selected Strategy: ${strategy === "avalanche" ? "Debt Avalanche" : "Debt Snowball"}
Calculated via Expenseliy Debt Freedom Tools`;

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
                Avalanche vs Snowball Engine
              </span>
              <span className="inline-flex items-center text-xs text-ink-muted">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-income" /> 100% Free & Accurate
              </span>
            </div>
            <h2 className="text-2xl font-bold text-ink tracking-tight">
              Debt Snowball vs. Avalanche Payoff Calculator
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              Compare mathematical interest savings vs psychological momentum to reach complete debt freedom fastest.
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
        {/* Strategy Switcher */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-lg">
          <button
            type="button"
            onClick={() => setStrategy("avalanche")}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              strategy === "avalanche"
                ? "bg-income-bg/60 border-income-border shadow-sm"
                : "bg-surface-raised border-hairline"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-ink flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-income" /> Debt Avalanche
              </span>
              <span className="text-[11px] font-bold text-income">Saves Most Cash</span>
            </div>
            <p className="text-[11px] text-ink-muted mt-1">Pay highest interest rate debt first.</p>
          </button>

          <button
            type="button"
            onClick={() => setStrategy("snowball")}
            className={`p-3.5 rounded-xl border text-left transition-all ${
              strategy === "snowball"
                ? "bg-sky-bg/60 border-sky-border shadow-sm"
                : "bg-surface-raised border-hairline"
            }`}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-ink flex items-center gap-1.5">
                <TrendingDown className="w-4 h-4 text-sky" /> Debt Snowball
              </span>
              <span className="text-[11px] font-bold text-sky">Fastest Wins</span>
            </div>
            <p className="text-[11px] text-ink-muted mt-1">Pay smallest balance debt first.</p>
          </button>
        </div>

        {/* Debts Table */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              Your Debts & Loans ({debts.length})
            </h4>
            <button
              onClick={addDebt}
              className="text-xs font-semibold text-income hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Debt Account
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-raised text-ink-muted border-y border-hairline">
                <tr>
                  <th className="py-2.5 px-3 font-semibold">Account / Creditor</th>
                  <th className="py-2.5 px-3 font-semibold w-28">Balance ({currency})</th>
                  <th className="py-2.5 px-3 font-semibold w-24">APR (%)</th>
                  <th className="py-2.5 px-3 font-semibold w-28">Min. Payment</th>
                  <th className="py-2.5 px-2 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {debts.map((d) => (
                  <tr key={d.id}>
                    <td className="py-2 px-3">
                      <input
                        type="text"
                        value={d.name}
                        onChange={(e) => updateDebt(d.id, "name", e.target.value)}
                        className="w-full px-2 py-1 rounded bg-surface border border-hairline text-ink text-xs font-medium"
                      />
                    </td>
                    <td className="py-2 px-3">
                      <input
                        type="number"
                        min="0"
                        value={d.balance || ""}
                        onChange={(e) => updateDebt(d.id, "balance", Number(e.target.value))}
                        className="w-full px-2 py-1 rounded bg-surface border border-hairline text-ink text-xs font-bold"
                      />
                    </td>
                    <td className="py-2 px-3">
                      <input
                        type="number"
                        min="0"
                        step="0.1"
                        value={d.rate || ""}
                        onChange={(e) => updateDebt(d.id, "rate", Number(e.target.value))}
                        className="w-full px-2 py-1 rounded bg-surface border border-hairline text-ink text-xs"
                      />
                    </td>
                    <td className="py-2 px-3">
                      <input
                        type="number"
                        min="0"
                        value={d.minPayment || ""}
                        onChange={(e) => updateDebt(d.id, "minPayment", Number(e.target.value))}
                        className="w-full px-2 py-1 rounded bg-surface border border-hairline text-ink text-xs"
                      />
                    </td>
                    <td className="py-2 px-2 text-right">
                      <button
                        onClick={() => removeDebt(d.id)}
                        disabled={debts.length <= 1}
                        className="text-ink-muted hover:text-expense p-1 disabled:opacity-30 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Acceleration & Comparison Result */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 pt-4 border-t border-hairline">
          <div className="lg:col-span-5 space-y-4">
            <label htmlFor="extra-payment-input" className="block text-xs font-semibold text-ink">
              Extra Monthly Debt Acceleration Payment ({currency})
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted font-medium">{currency}</span>
              <input
                id="extra-payment-input"
                type="number"
                min="0"
                step="50"
                value={extraPayment || ""}
                onChange={(e) => setExtraPayment(Math.max(0, Number(e.target.value) || 0))}
                className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-surface-raised border border-hairline text-ink font-bold text-base focus:outline-none focus:ring-2 focus:ring-income"
              />
            </div>
            <p className="text-xs text-ink-muted">
              Total monthly payment budget: <strong className="text-ink">{currency}{totalMonthlyBudget.toLocaleString()} / mo</strong>
            </p>
          </div>

          <div className="lg:col-span-7 p-6 rounded-2xl bg-gradient-to-br from-surface-raised to-surface border border-hairline-strong shadow-md">
            <div className="flex items-center justify-between pb-4 border-b border-hairline">
              <div>
                <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider">
                  Months to Total Debt Freedom
                </span>
                <div className="text-3xl sm:text-4xl font-black text-income mt-1">
                  {activeResult.months} months
                  <span className="text-sm font-normal text-ink-muted"> ({(activeResult.months / 12).toFixed(1)} yrs)</span>
                </div>
              </div>
              <div className="text-right">
                <span className="text-xs text-ink-muted block">Total Interest:</span>
                <span className="text-lg font-bold text-ink">{currency}{Math.round(activeResult.totalInterest).toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4 flex justify-end">
              <button
                onClick={handleCopy}
                className="py-2 px-4 rounded-xl bg-surface hover:bg-surface-raised border border-hairline text-ink font-semibold text-xs flex items-center gap-1.5 transition-all cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-income" /> : <Copy className="w-3.5 h-3.5 text-ink-muted" />}
                {copied ? "Copied Payoff Plan!" : "Copy Payoff Plan"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
