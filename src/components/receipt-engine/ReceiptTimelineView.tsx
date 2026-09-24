"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  SlidersHorizontal,
  Calendar,
  Building2,
  Tag,
  DollarSign,
  ArrowUpDown,
  LayoutGrid,
  List,
  Clock,
  Trash2,
  FileSpreadsheet,
  Download,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Edit3,
  ExternalLink,
  Plus,
} from "lucide-react";
import { ReceiptItem, ReceiptFilterOptions, ExpenseCategory } from "@/lib/receipt-engine/types";
import { filterReceipts } from "@/lib/receipt-engine/receipt-store";

interface ReceiptTimelineViewProps {
  receipts: ReceiptItem[];
  onSelectReceipt: (receipt: ReceiptItem) => void;
  onDeleteReceipt: (id: string) => void;
  onDeleteBulk: (ids: string[]) => void;
  onAddNewScan: () => void;
  onOpenExport: () => void;
}

const CATEGORY_COLORS: Record<string, string> = {
  "Food & Dining": "bg-amber-500/10 text-amber-600 border-amber-500/20 dark:text-amber-400",
  "Travel & Lodging": "bg-sky-500/10 text-sky-600 border-sky-500/20 dark:text-sky-400",
  "Office & Supplies": "bg-emerald-500/10 text-emerald-600 border-emerald-500/20 dark:text-emerald-400",
  "Software & SaaS": "bg-indigo-500/10 text-indigo-600 border-indigo-500/20 dark:text-indigo-400",
  "Utilities & Internet": "bg-cyan-500/10 text-cyan-600 border-cyan-500/20 dark:text-cyan-400",
  "Shopping & Equipment": "bg-pink-500/10 text-pink-600 border-pink-500/20 dark:text-pink-400",
  "Healthcare & Medical": "bg-rose-500/10 text-rose-600 border-rose-500/20 dark:text-rose-400",
  "Transportation & Gas": "bg-purple-500/10 text-purple-600 border-purple-500/20 dark:text-purple-400",
  "Advertising & Marketing": "bg-orange-500/10 text-orange-600 border-orange-500/20 dark:text-orange-400",
  "Legal & Professional": "bg-blue-500/10 text-blue-600 border-blue-500/20 dark:text-blue-400",
  "Repairs & Maintenance": "bg-yellow-500/10 text-yellow-600 border-yellow-500/20 dark:text-yellow-400",
  "Entertainment": "bg-fuchsia-500/10 text-fuchsia-600 border-fuchsia-500/20 dark:text-fuchsia-400",
  "Other": "bg-gray-500/10 text-gray-600 border-gray-500/20 dark:text-gray-400",
};

export function ReceiptTimelineView({
  receipts,
  onSelectReceipt,
  onDeleteReceipt,
  onDeleteBulk,
  onAddNewScan,
  onOpenExport,
}: ReceiptTimelineViewProps) {
  const [viewMode, setViewMode] = useState<"grid" | "list" | "timeline">("grid");
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [filters, setFilters] = useState<ReceiptFilterOptions>({
    search: "",
    category: "all",
    taxYear: "all",
    type: "all",
    status: "all",
    sortBy: "date-desc",
    dateRange: "all",
  });

  const filtered = useMemo(() => filterReceipts(receipts, filters), [receipts, filters]);

  const toggleSelectAll = () => {
    if (selectedIds.length === filtered.length) {
      setSelectedIds([]);
    } else {
      setSelectedIds(filtered.map((r) => r.id));
    }
  };

  const toggleSelect = (id: string) => {
    setSelectedIds((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const handleBulkDelete = () => {
    if (selectedIds.length > 0) {
      onDeleteBulk(selectedIds);
      setSelectedIds([]);
    }
  };

  const totalFilteredSum = useMemo(() => {
    return filtered.reduce((sum, r) => sum + r.total, 0);
  }, [filtered]);

  const totalTaxSum = useMemo(() => {
    return filtered.reduce((sum, r) => sum + r.tax, 0);
  }, [filtered]);

  return (
    <div className="flex flex-col gap-6">
      {/* Control Bar */}
      <div className="p-4 sm:p-5 rounded-2xl bg-surface border border-hairline shadow-sm flex flex-col gap-4">
        {/* Search & Main Actions */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-ink-muted absolute left-3.5 top-3" />
            <input
              type="text"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              placeholder="Search merchant, tag (#client), notes, amount..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-hairline bg-canvas text-ink text-xs sm:text-sm focus:border-primary focus:outline-none"
            />
          </div>

          <div className="flex items-center gap-2">
            {/* View Mode Switcher */}
            <div className="flex items-center p-1 rounded-xl border border-hairline bg-canvas">
              <button
                type="button"
                onClick={() => setViewMode("grid")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "grid"
                    ? "bg-surface text-primary shadow-xs"
                    : "text-ink-muted hover:text-ink"
                }`}
                title="Grid Cards"
              >
                <LayoutGrid className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "list"
                    ? "bg-surface text-primary shadow-xs"
                    : "text-ink-muted hover:text-ink"
                }`}
                title="List Table"
              >
                <List className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => setViewMode("timeline")}
                className={`p-1.5 rounded-lg transition-colors ${
                  viewMode === "timeline"
                    ? "bg-surface text-primary shadow-xs"
                    : "text-ink-muted hover:text-ink"
                }`}
                title="Timeline Feed"
              >
                <Clock className="w-4 h-4" />
              </button>
            </div>

            <button
              type="button"
              onClick={onOpenExport}
              className="px-3.5 py-2 rounded-xl border border-hairline bg-surface hover:bg-canvas text-ink text-xs font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
            >
              <Download className="w-3.5 h-3.5 text-primary" />
              <span className="hidden sm:inline">Export</span>
            </button>

            <button
              type="button"
              onClick={onAddNewScan}
              className="px-4 py-2 rounded-xl bg-primary hover:bg-primary-active text-white text-xs font-bold flex items-center gap-1.5 shadow-sm transition-all"
            >
              <Plus className="w-4 h-4" />
              <span>Scan Receipt</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center justify-between gap-3 pt-3 border-t border-hairline text-xs">
          <div className="flex flex-wrap items-center gap-2">
            {/* Category Filter */}
            <select
              value={filters.category}
              onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              className="px-2.5 py-1.5 rounded-lg border border-hairline bg-canvas text-ink text-xs focus:border-primary focus:outline-none"
            >
              <option value="all">All Categories</option>
              <option value="Food & Dining">Food & Dining</option>
              <option value="Travel & Lodging">Travel & Lodging</option>
              <option value="Office & Supplies">Office & Supplies</option>
              <option value="Software & SaaS">Software & SaaS</option>
              <option value="Transportation & Gas">Transportation & Gas</option>
              <option value="Healthcare & Medical">Healthcare & Medical</option>
              <option value="Shopping & Equipment">Shopping & Equipment</option>
              <option value="Utilities & Internet">Utilities & Internet</option>
              <option value="Advertising & Marketing">Advertising</option>
            </select>

            {/* Tax Year Filter */}
            <select
              value={filters.taxYear}
              onChange={(e) => setFilters({ ...filters, taxYear: e.target.value })}
              className="px-2.5 py-1.5 rounded-lg border border-hairline bg-canvas text-ink text-xs focus:border-primary focus:outline-none font-mono"
            >
              <option value="all">All Tax Years</option>
              <option value="2026">2026 Tax Year</option>
              <option value="2025">2025 Tax Year</option>
              <option value="2024">2024 Tax Year</option>
            </select>

            {/* Type Filter */}
            <select
              value={filters.type}
              onChange={(e) => setFilters({ ...filters, type: e.target.value as any })}
              className="px-2.5 py-1.5 rounded-lg border border-hairline bg-canvas text-ink text-xs focus:border-primary focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="business">Business (1099)</option>
              <option value="personal">Personal</option>
            </select>

            {/* Sort Order */}
            <select
              value={filters.sortBy}
              onChange={(e) => setFilters({ ...filters, sortBy: e.target.value as any })}
              className="px-2.5 py-1.5 rounded-lg border border-hairline bg-canvas text-ink text-xs focus:border-primary focus:outline-none"
            >
              <option value="date-desc">Newest Date First</option>
              <option value="date-asc">Oldest Date First</option>
              <option value="amount-desc">Highest Amount ($)</option>
              <option value="amount-asc">Lowest Amount ($)</option>
              <option value="merchant-asc">Merchant (A to Z)</option>
            </select>
          </div>

          {/* Quick Summary Pill */}
          <div className="flex items-center gap-3 text-xs text-ink-muted">
            <span>
              Showing <strong>{filtered.length}</strong> of {receipts.length} receipts
            </span>
            <span className="font-bold text-ink font-mono">
              Total: ${totalFilteredSum.toFixed(2)}
            </span>
          </div>
        </div>

        {/* Bulk Selection Bar */}
        {selectedIds.length > 0 && (
          <div className="p-3 rounded-xl bg-income-bg border border-income-border flex items-center justify-between gap-3 text-xs">
            <span className="font-semibold text-income">
              {selectedIds.length} receipt{selectedIds.length > 1 ? "s" : ""} selected
            </span>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleBulkDelete}
                className="px-3 py-1.5 rounded-lg bg-expense hover:bg-expense/90 text-white font-semibold flex items-center gap-1.5 transition-colors shadow-xs"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Delete Selected</span>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Main Content Area */}
      {filtered.length === 0 ? (
        <div className="p-12 text-center rounded-2xl bg-surface border border-hairline flex flex-col items-center gap-3">
          <div className="w-12 h-12 rounded-xl bg-canvas flex items-center justify-center text-ink-muted">
            <Search className="w-6 h-6" />
          </div>
          <h4 className="text-base font-bold text-ink">No matching receipts found</h4>
          <p className="text-xs text-ink-secondary max-w-sm">
            Try adjusting your search query, filter criteria, or upload a new receipt.
          </p>
          <button
            type="button"
            onClick={() =>
              setFilters({
                search: "",
                category: "all",
                taxYear: "all",
                type: "all",
                status: "all",
                sortBy: "date-desc",
                dateRange: "all",
              })
            }
            className="mt-2 px-4 py-2 rounded-lg border border-hairline text-xs font-semibold text-primary hover:bg-canvas"
          >
            Reset Filters
          </button>
        </div>
      ) : viewMode === "grid" ? (
        /* GRID VIEW */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((item) => {
            const isSelected = selectedIds.includes(item.id);
            const catColor = CATEGORY_COLORS[item.category] || CATEGORY_COLORS["Other"];

            return (
              <div
                key={item.id}
                onClick={() => onSelectReceipt(item)}
                className={`p-5 rounded-2xl bg-surface border transition-all cursor-pointer hover:border-primary/60 hover:shadow-md flex flex-col justify-between group relative ${
                  isSelected ? "border-primary ring-1 ring-primary/40 bg-income-bg/10" : "border-hairline"
                }`}
              >
                <div>
                  {/* Top line: Category, Date, Checkbox */}
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <span
                      className={`px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${catColor}`}
                    >
                      {item.category}
                    </span>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-ink-muted">{item.date}</span>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) => {
                          e.stopPropagation();
                          toggleSelect(item.id);
                        }}
                        className="rounded border-hairline-strong text-primary focus:ring-primary h-4 w-4 cursor-pointer"
                      />
                    </div>
                  </div>

                  {/* Merchant & Amount */}
                  <div className="flex items-start justify-between gap-3 mb-2">
                    <h4 className="text-base font-bold text-ink group-hover:text-primary transition-colors line-clamp-1">
                      {item.merchant}
                    </h4>
                    <span className="text-base font-extrabold text-ink font-mono shrink-0">
                      ${item.total.toFixed(2)}
                    </span>
                  </div>

                  {/* Breakdown & Tax Category */}
                  <div className="text-[11px] text-ink-muted flex items-center justify-between gap-2 mb-3 font-mono">
                    <span>Tax: ${item.tax.toFixed(2)}</span>
                    <span className="px-1.5 py-0.5 rounded bg-canvas text-ink-secondary text-[10px] font-sans">
                      {item.isBusiness ? "Business" : "Personal"} • {item.taxYear}
                    </span>
                  </div>

                  {/* Notes snippet */}
                  {item.notes && (
                    <p className="text-xs text-ink-secondary leading-relaxed line-clamp-2 mb-3">
                      {item.notes}
                    </p>
                  )}

                  {/* Tags */}
                  {item.tags && item.tags.length > 0 && (
                    <div className="flex flex-wrap gap-1 mb-3">
                      {item.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-1.5 py-0.5 rounded text-[10px] font-medium bg-canvas text-ink-muted border border-hairline"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Actions */}
                <div className="pt-3 border-t border-hairline flex items-center justify-between text-xs text-ink-muted">
                  <div className="flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-primary" />
                    <span className="text-[11px] font-mono">{item.confidence}% OCR</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectReceipt(item);
                      }}
                      className="text-primary hover:underline font-semibold flex items-center gap-1"
                    >
                      <Edit3 className="w-3.5 h-3.5" />
                      <span>Edit</span>
                    </button>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onDeleteReceipt(item.id);
                      }}
                      className="text-ink-muted hover:text-expense transition-colors"
                      title="Delete"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : viewMode === "list" ? (
        /* TABLE LIST VIEW */
        <div className="overflow-x-auto rounded-2xl border border-hairline bg-surface shadow-sm">
          <table className="w-full text-left text-xs">
            <thead className="bg-canvas border-b border-hairline text-ink font-semibold uppercase tracking-wider text-[11px] font-mono">
              <tr>
                <th className="p-3.5 w-8">
                  <input
                    type="checkbox"
                    checked={selectedIds.length === filtered.length && filtered.length > 0}
                    onChange={toggleSelectAll}
                    className="rounded border-hairline-strong text-primary focus:ring-primary h-4 w-4 cursor-pointer"
                  />
                </th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5">Merchant</th>
                <th className="p-3.5">Category</th>
                <th className="p-3.5">Type</th>
                <th className="p-3.5 text-right">Tax</th>
                <th className="p-3.5 text-right">Total</th>
                <th className="p-3.5 text-center">Confidence</th>
                <th className="p-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-hairline">
              {filtered.map((item) => {
                const isSelected = selectedIds.includes(item.id);
                const catColor = CATEGORY_COLORS[item.category] || CATEGORY_COLORS["Other"];

                return (
                  <tr
                    key={item.id}
                    onClick={() => onSelectReceipt(item)}
                    className={`hover:bg-canvas/80 cursor-pointer transition-colors ${
                      isSelected ? "bg-income-bg/20" : ""
                    }`}
                  >
                    <td className="p-3.5" onClick={(e) => e.stopPropagation()}>
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={() => toggleSelect(item.id)}
                        className="rounded border-hairline-strong text-primary focus:ring-primary h-4 w-4 cursor-pointer"
                      />
                    </td>
                    <td className="p-3.5 font-mono text-ink-muted whitespace-nowrap">{item.date}</td>
                    <td className="p-3.5 font-bold text-ink whitespace-nowrap">{item.merchant}</td>
                    <td className="p-3.5 whitespace-nowrap">
                      <span className={`px-2 py-0.5 rounded text-[11px] font-semibold border ${catColor}`}>
                        {item.category}
                      </span>
                    </td>
                    <td className="p-3.5 text-ink-secondary whitespace-nowrap">
                      {item.isBusiness ? "Business" : "Personal"} ({item.taxYear})
                    </td>
                    <td className="p-3.5 text-right font-mono text-ink-muted whitespace-nowrap">
                      ${item.tax.toFixed(2)}
                    </td>
                    <td className="p-3.5 text-right font-bold font-mono text-ink whitespace-nowrap">
                      ${item.total.toFixed(2)}
                    </td>
                    <td className="p-3.5 text-center font-mono text-primary whitespace-nowrap">
                      {item.confidence}%
                    </td>
                    <td className="p-3.5 text-right whitespace-nowrap" onClick={(e) => e.stopPropagation()}>
                      <div className="flex items-center justify-end gap-2">
                        <button
                          type="button"
                          onClick={() => onSelectReceipt(item)}
                          className="p-1 rounded text-ink-muted hover:text-primary hover:bg-canvas"
                          title="Edit receipt"
                        >
                          <Edit3 className="w-3.5 h-3.5" />
                        </button>
                        <button
                          type="button"
                          onClick={() => onDeleteReceipt(item.id)}
                          className="p-1 rounded text-ink-muted hover:text-expense hover:bg-canvas"
                          title="Delete"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      ) : (
        /* TIMELINE FEED VIEW */
        <div className="relative pl-6 sm:pl-8 border-l-2 border-primary/30 space-y-6">
          {filtered.map((item) => (
            <div key={item.id} className="relative group">
              {/* Timeline marker */}
              <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-4 h-4 rounded-full bg-surface border-2 border-primary group-hover:scale-125 transition-transform" />

              <div
                onClick={() => onSelectReceipt(item)}
                className="p-4 sm:p-5 rounded-2xl bg-surface border border-hairline hover:border-primary/60 cursor-pointer transition-all shadow-xs"
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-mono font-bold text-primary">{item.date}</span>
                    <span className="text-xs text-ink-muted">•</span>
                    <h4 className="text-sm sm:text-base font-bold text-ink">{item.merchant}</h4>
                  </div>
                  <span className="text-base font-extrabold text-ink font-mono">
                    ${item.total.toFixed(2)}
                  </span>
                </div>

                <p className="text-xs text-ink-secondary mb-3">
                  {item.notes || `Scanned receipt categorized under ${item.category}.`}
                </p>

                <div className="flex flex-wrap items-center justify-between gap-2 text-xs text-ink-muted pt-2 border-t border-hairline">
                  <div className="flex items-center gap-2">
                    <span className="px-2 py-0.5 rounded bg-canvas text-ink-secondary text-[11px] font-medium">
                      {item.category}
                    </span>
                    <span className="text-[11px] font-mono">
                      Tax: ${item.tax.toFixed(2)}
                    </span>
                  </div>
                  <span className="text-[11px] text-primary font-mono">{item.confidence}% OCR match</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
