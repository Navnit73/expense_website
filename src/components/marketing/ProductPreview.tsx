"use client";

import React, { useState } from "react";
import {
  TrendingUp,
  Wallet,
  Sparkles,
  ArrowUpRight,
  ArrowDownLeft,
  Laptop,
  Briefcase,
  Layers,
  Search,
} from "lucide-react";
import { Badge } from "./Badge";

interface Transaction {
  id: string;
  type: "income" | "expense" | "investment";
  merchant: string;
  category: string;
  paymentMethod: string;
  date: string;
  amount: string;
  tag: string;
}

const SAMPLE_TRANSACTIONS: Transaction[] = [
  {
    id: "tx-1",
    type: "income",
    merchant: "Stripe Payout (Client Retainer)",
    category: "Consulting / Freelance",
    paymentMethod: "Bank Transfer",
    date: "Aug 24, 2026",
    amount: "+$4,500.00",
    tag: "Business",
  },
  {
    id: "tx-2",
    type: "expense",
    merchant: "AWS & Vercel Cloud Infrastructure",
    category: "Software & SaaS",
    paymentMethod: "Corporate Card",
    date: "Aug 23, 2026",
    amount: "-$342.80",
    tag: "Recurring",
  },
  {
    id: "tx-3",
    type: "investment",
    merchant: "Vanguard S&P 500 Index (VOO)",
    category: "Index Funds / Stocks",
    paymentMethod: "Direct Debit",
    date: "Aug 21, 2026",
    amount: "$1,200.00",
    tag: "Portfolio",
  },
  {
    id: "tx-4",
    type: "expense",
    merchant: "Blue Bottle Coffee / Team Sync",
    category: "Food & Dining",
    paymentMethod: "Debit Card",
    date: "Aug 20, 2026",
    amount: "-$48.50",
    tag: "Team",
  },
  {
    id: "tx-5",
    type: "expense",
    merchant: "WeWork Office Space",
    category: "Workspace",
    paymentMethod: "Auto-pay",
    date: "Aug 18, 2026",
    amount: "-$650.00",
    tag: "Fixed",
  },
];

export function ProductPreview() {
  const [activeTab, setActiveTab] = useState<"all" | "expense" | "income" | "investment">("all");

  const filteredTransactions = SAMPLE_TRANSACTIONS.filter((tx) => {
    if (activeTab === "all") return true;
    return tx.type === activeTab;
  });

  return (
    <div className="w-full bg-surface border border-hairline-strong rounded-md overflow-hidden text-left">
      {/* Top Application Bar Mockup */}
      <div className="bg-canvas border-b border-hairline px-4 py-3 flex items-center justify-between gap-4">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <span className="w-2.5 h-2.5 rounded-sm bg-expense opacity-70" />
            <span className="w-2.5 h-2.5 rounded-sm bg-warning opacity-70" />
            <span className="w-2.5 h-2.5 rounded-sm bg-income opacity-70" />
          </div>
          <span className="text-xs font-mono text-ink-muted ml-2 hidden sm:inline-block">
            app.expenseliy.com/dashboard
          </span>
        </div>

        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1 text-[11px] font-mono text-ink-muted bg-surface border border-hairline px-2.5 py-1 rounded-md">
            <Search className="w-3 h-3 text-ink-faint" />
            <span>Filter transactions...</span>
          </div>
          <Badge variant="income" size="sm">
            Live Demo
          </Badge>
        </div>
      </div>

      {/* Main Dashboard Preview Content */}
      <div className="p-4 sm:p-6 lg:p-8 flex flex-col gap-6">
        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {/* Total Net Balance */}
          <div className="bg-surface border border-hairline rounded-md p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-1 mb-2">
              <span className="text-xs font-medium text-ink-muted">Net Cash & Assets</span>
              <Wallet className="w-4 h-4 text-sky" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
              $24,850.00
            </div>
            <div className="text-[11px] text-income font-medium mt-1 flex items-center gap-0.5">
              <TrendingUp className="w-3 h-3" />
              <span>+18.4% this month</span>
            </div>
          </div>

          {/* Monthly Income */}
          <div className="bg-income-bg border border-income-border rounded-md p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-1 mb-2">
              <span className="text-xs font-medium text-ink-secondary">Total Income</span>
              <ArrowDownLeft className="w-4 h-4 text-income" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-income tracking-tight">
              $8,400.00
            </div>
            <div className="text-[11px] text-ink-muted mt-1">Salary & Freelance</div>
          </div>

          {/* Monthly Expenses */}
          <div className="bg-expense-bg border border-expense-border rounded-md p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-1 mb-2">
              <span className="text-xs font-medium text-ink-secondary">Total Expenses</span>
              <ArrowUpRight className="w-4 h-4 text-expense" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-expense tracking-tight">
              $3,240.50
            </div>
            <div className="text-[11px] text-ink-muted mt-1">38.5% savings rate</div>
          </div>

          {/* Investment Portfolio */}
          <div className="bg-investment-bg border border-investment-border rounded-md p-4 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-1 mb-2">
              <span className="text-xs font-medium text-ink-secondary">Investments</span>
              <Layers className="w-4 h-4 text-investment" />
            </div>
            <div className="text-xl sm:text-2xl font-bold text-investment tracking-tight">
              $19,689.50
            </div>
            <div className="text-[11px] text-ink-muted mt-1">Stocks, ETFs & Crypto</div>
          </div>
        </div>

        {/* AI Insight Card Callout */}
        <div className="bg-surface-raised border border-hairline-strong rounded-md p-4 flex items-start gap-3">
          <div className="w-8 h-8 rounded-md bg-income-bg border border-income-border flex items-center justify-center shrink-0 text-primary mt-0.5">
            <Sparkles className="w-4 h-4" />
          </div>
          <div className="flex flex-col gap-1 text-xs sm:text-sm">
            <div className="flex items-center gap-2">
              <span className="font-bold text-ink">Algorithmic Financial Analysis</span>
              <span className="text-[10px] uppercase font-mono px-1.5 py-0.5 rounded bg-surface border border-hairline text-ink-muted">
                Informational
              </span>
            </div>
            <p className="text-ink-secondary leading-relaxed">
              Your savings rate is <strong>38.5%</strong> this month, exceeding your 30% baseline.
              Recurring software subscriptions increased by <strong>14%</strong> across 2 vendor
              renewals.
            </p>
          </div>
        </div>

        {/* Category Breakdown & Trend Bar */}
        <div className="bg-surface border border-hairline rounded-md p-4 sm:p-5">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
            <h4 className="text-xs font-semibold uppercase tracking-wider text-ink font-mono">
              Monthly Spending Distribution
            </h4>
            <span className="text-xs text-ink-muted">Total: $3,240.50</span>
          </div>

          {/* Segmented Bar */}
          <div className="w-full h-3 rounded-md bg-canvas overflow-hidden flex gap-0.5 mb-4 border border-hairline">
            <div className="h-full bg-primary" style={{ width: "38%" }} title="Housing 38%" />
            <div className="h-full bg-secondary" style={{ width: "22%" }} title="Food & Dining 22%" />
            <div className="h-full bg-sky" style={{ width: "18%" }} title="Software & SaaS 18%" />
            <div className="h-full bg-warning" style={{ width: "12%" }} title="Transport 12%" />
            <div className="h-full bg-ink-faint" style={{ width: "10%" }} title="Utilities 10%" />
          </div>

          {/* Legend */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2 text-xs">
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-primary" />
              <span className="text-ink font-medium">Housing (38%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-secondary" />
              <span className="text-ink font-medium">Dining (22%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-sky" />
              <span className="text-ink font-medium">SaaS (18%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-warning" />
              <span className="text-ink font-medium">Transit (12%)</span>
            </div>
            <div className="flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-sm bg-ink-faint" />
              <span className="text-ink font-medium">Utilities (10%)</span>
            </div>
          </div>
        </div>

        {/* Ledger & Transactions Table */}
        <div className="bg-surface border border-hairline rounded-md overflow-hidden">
          <div className="p-4 border-b border-hairline flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-canvas">
            <div className="flex items-center gap-2">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-ink font-mono">
                Recent Transaction Ledger
              </h4>
              <span className="text-xs text-ink-muted">({filteredTransactions.length} records)</span>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1 text-xs">
              <button
                type="button"
                onClick={() => setActiveTab("all")}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  activeTab === "all"
                    ? "bg-surface text-ink font-bold border border-hairline-strong"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                All
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("expense")}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  activeTab === "expense"
                    ? "bg-surface text-expense font-bold border border-expense-border"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                Expenses
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("income")}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  activeTab === "income"
                    ? "bg-surface text-income font-bold border border-income-border"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                Income
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("investment")}
                className={`px-2.5 py-1 rounded-md transition-colors ${
                  activeTab === "investment"
                    ? "bg-surface text-investment font-bold border border-investment-border"
                    : "text-ink-muted hover:text-ink"
                }`}
              >
                Investments
              </button>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-hairline text-ink-muted bg-surface">
                  <th className="py-2.5 px-4 font-semibold">Merchant / Description</th>
                  <th className="py-2.5 px-4 font-semibold hidden md:table-cell">Category</th>
                  <th className="py-2.5 px-4 font-semibold hidden sm:table-cell">Method</th>
                  <th className="py-2.5 px-4 font-semibold hidden lg:table-cell">Date</th>
                  <th className="py-2.5 px-4 font-semibold text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-canvas transition-colors">
                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-6 h-6 rounded-md flex items-center justify-center shrink-0 ${
                            tx.type === "income"
                              ? "bg-income-bg text-income border border-income-border"
                              : tx.type === "expense"
                              ? "bg-expense-bg text-expense border border-expense-border"
                              : "bg-investment-bg text-investment border border-investment-border"
                          }`}
                        >
                          {tx.type === "income" ? (
                            <Briefcase className="w-3 h-3" />
                          ) : tx.type === "expense" ? (
                            <Laptop className="w-3 h-3" />
                          ) : (
                            <Layers className="w-3 h-3" />
                          )}
                        </div>
                        <div>
                          <div className="font-semibold text-ink">{tx.merchant}</div>
                          <div className="text-[11px] text-ink-muted md:hidden">
                            {tx.category} • {tx.date}
                          </div>
                        </div>
                      </div>
                    </td>
                    <td className="py-3 px-4 text-ink-secondary hidden md:table-cell">
                      {tx.category}
                    </td>
                    <td className="py-3 px-4 text-ink-muted hidden sm:table-cell">
                      {tx.paymentMethod}
                    </td>
                    <td className="py-3 px-4 text-ink-muted hidden lg:table-cell">{tx.date}</td>
                    <td className="py-3 px-4 text-right font-bold font-mono">
                      <span
                        className={
                          tx.type === "income"
                            ? "text-income"
                            : tx.type === "expense"
                            ? "text-expense"
                            : "text-investment"
                        }
                      >
                        {tx.amount}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
