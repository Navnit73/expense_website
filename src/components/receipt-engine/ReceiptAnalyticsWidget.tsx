"use client";

import React, { useMemo } from "react";
import { ReceiptItem } from "@/lib/receipt-engine/types";
import {
  TrendingUp,
  DollarSign,
  Receipt,
  FileCheck2,
  PieChart,
  ShieldAlert,
  Percent,
} from "lucide-react";

interface ReceiptAnalyticsWidgetProps {
  receipts: ReceiptItem[];
  taxYear?: string;
}

export function ReceiptAnalyticsWidget({ receipts, taxYear = "2026" }: ReceiptAnalyticsWidgetProps) {
  const stats = useMemo(() => {
    let totalSpend = 0;
    let totalTax = 0;
    let businessSpend = 0;
    let personalSpend = 0;
    let deductibleEstimate = 0;

    const categoryMap: Record<string, number> = {};
    const monthMap: Record<string, number> = {
      "01": 0, "02": 0, "03": 0, "04": 0, "05": 0, "06": 0,
      "07": 0, "08": 0, "09": 0, "10": 0, "11": 0, "12": 0,
    };

    receipts.forEach((r) => {
      totalSpend += r.total;
      totalTax += r.tax;

      if (r.isBusiness) {
        businessSpend += r.total;
        const rate = r.taxCategory?.includes("Meals (50%)") ? 0.5 : 1.0;
        deductibleEstimate += r.total * rate;
      } else {
        personalSpend += r.total;
      }

      categoryMap[r.category] = (categoryMap[r.category] || 0) + r.total;

      if (r.date) {
        const parts = r.date.split("-");
        if (parts.length >= 2 && monthMap[parts[1]] !== undefined) {
          monthMap[parts[1]] += r.total;
        }
      }
    });

    const sortedCategories = Object.entries(categoryMap)
      .map(([name, amount]) => ({
        name,
        amount,
        pct: totalSpend > 0 ? (amount / totalSpend) * 100 : 0,
      }))
      .sort((a, b) => b.amount - a.amount);

    return {
      totalSpend,
      totalTax,
      businessSpend,
      personalSpend,
      deductibleEstimate,
      businessPct: totalSpend > 0 ? (businessSpend / totalSpend) * 100 : 0,
      sortedCategories,
      monthMap,
    };
  }, [receipts]);

  const monthLabels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const maxMonthValue = Math.max(...Object.values(stats.monthMap), 100);

  return (
    <div className="flex flex-col gap-6">
      {/* Top 4 KPI Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Spend */}
        <div className="p-5 rounded-2xl bg-surface border border-hairline shadow-sm">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold text-ink-muted">Total Tracked Expenses</span>
            <div className="w-8 h-8 rounded-lg bg-income-bg text-primary flex items-center justify-center">
              <DollarSign className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-ink font-mono tracking-tight">
            ${stats.totalSpend.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-ink-muted mt-1 font-mono">
            {receipts.length} verified receipts
          </div>
        </div>

        {/* Business Deductibles */}
        <div className="p-5 rounded-2xl bg-surface border border-hairline shadow-sm">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold text-ink-muted">Est. Tax Deductions</span>
            <div className="w-8 h-8 rounded-lg bg-sky-bg text-sky flex items-center justify-center">
              <FileCheck2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-sky font-mono tracking-tight">
            ${stats.deductibleEstimate.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-ink-muted mt-1">
            Schedule C Write-offs ({stats.businessPct.toFixed(0)}% business share)
          </div>
        </div>

        {/* Sales Tax Paid */}
        <div className="p-5 rounded-2xl bg-surface border border-hairline shadow-sm">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold text-ink-muted">Total Sales Tax / VAT</span>
            <div className="w-8 h-8 rounded-lg bg-warning-bg text-warning flex items-center justify-center">
              <Receipt className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-ink font-mono tracking-tight">
            ${stats.totalTax.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <div className="text-[11px] text-ink-muted mt-1">
            {stats.totalSpend > 0 ? ((stats.totalTax / stats.totalSpend) * 100).toFixed(1) : 0}% avg sales tax rate
          </div>
        </div>

        {/* Business vs Personal Split */}
        <div className="p-5 rounded-2xl bg-surface border border-hairline shadow-sm">
          <div className="flex items-center justify-between gap-2 mb-2">
            <span className="text-xs font-semibold text-ink-muted">Business vs Personal</span>
            <div className="w-8 h-8 rounded-lg bg-canvas text-ink flex items-center justify-center">
              <PieChart className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-ink font-mono tracking-tight">
            {stats.businessPct.toFixed(0)}% <span className="text-sm font-normal text-ink-muted">Biz</span>
          </div>
          <div className="w-full h-2 bg-hairline rounded-full overflow-hidden mt-2 flex">
            <div className="bg-primary h-full" style={{ width: `${stats.businessPct}%` }} title="Business" />
            <div className="bg-sky h-full" style={{ width: `${100 - stats.businessPct}%` }} title="Personal" />
          </div>
        </div>
      </div>

      {/* Category Breakdown & Monthly Bar Chart */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Category Breakdown */}
        <div className="p-5 sm:p-6 rounded-2xl bg-surface border border-hairline shadow-sm">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-ink">Category Spending Distribution</h4>
            <span className="text-xs font-mono text-ink-muted">{stats.sortedCategories.length} categories</span>
          </div>

          <div className="space-y-3">
            {stats.sortedCategories.slice(0, 6).map((cat) => (
              <div key={cat.name} className="space-y-1">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-ink">{cat.name}</span>
                  <div className="flex items-center gap-2 font-mono">
                    <span className="text-ink-muted">{cat.pct.toFixed(1)}%</span>
                    <span className="font-bold text-ink">${cat.amount.toFixed(2)}</span>
                  </div>
                </div>
                <div className="w-full h-1.5 bg-canvas rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary rounded-full transition-all duration-500"
                    style={{ width: `${cat.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Monthly Expense Trend */}
        <div className="p-5 sm:p-6 rounded-2xl bg-surface border border-hairline shadow-sm flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-bold text-ink">2026 Monthly Cash Outflow</h4>
            <span className="text-xs text-ink-muted font-mono">Monthly variance</span>
          </div>

          <div className="h-40 flex items-end gap-1.5 sm:gap-2 pt-4">
            {monthLabels.map((lbl, idx) => {
              const mKey = String(idx + 1).padStart(2, "0");
              const val = stats.monthMap[mKey] || 0;
              const heightPct = maxMonthValue > 0 ? (val / maxMonthValue) * 100 : 0;

              return (
                <div key={lbl} className="flex-1 flex flex-col items-center gap-1.5 group relative">
                  {/* Tooltip on hover */}
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-8 px-2 py-1 bg-ink text-surface text-[10px] font-mono rounded shadow-md pointer-events-none whitespace-nowrap z-10">
                    ${val.toFixed(0)}
                  </div>

                  <div className="w-full bg-canvas rounded-t h-28 flex items-end overflow-hidden">
                    <div
                      className={`w-full transition-all duration-300 rounded-t ${
                        val > 0 ? "bg-primary hover:bg-primary-active" : "bg-transparent"
                      }`}
                      style={{ height: `${Math.max(val > 0 ? 8 : 0, heightPct)}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-mono text-ink-muted group-hover:text-primary transition-colors">
                    {lbl}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
