import { useState, useEffect, useMemo } from "react";
import { ReceiptItem, ReceiptFilterOptions } from "./types";
import { INITIAL_LEDGER_RECEIPTS } from "./sample-receipts";

const STORAGE_KEY = "expenseliy_receipts_v2";

export function useReceiptStore() {
  const [receipts, setReceipts] = useState<ReceiptItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [selectedReceipt, setSelectedReceipt] = useState<ReceiptItem | null>(null);

  // Initialize from LocalStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReceipts(parsed);
          setIsLoaded(true);
          return;
        }
      }
      // Seed with initial realistic ledger
      setReceipts(INITIAL_LEDGER_RECEIPTS);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_LEDGER_RECEIPTS));
    } catch (e) {
      console.error("Failed to load receipts from localStorage", e);
      setReceipts(INITIAL_LEDGER_RECEIPTS);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to LocalStorage whenever receipts change
  const persistReceipts = (updated: ReceiptItem[]) => {
    setReceipts(updated);
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save receipts to localStorage", e);
    }
  };

  const addReceipt = (item: Omit<ReceiptItem, "id" | "createdAt">): ReceiptItem => {
    const newReceipt: ReceiptItem = {
      ...item,
      id: `rcpt-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      createdAt: new Date().toISOString(),
    };
    const updated = [newReceipt, ...receipts];
    persistReceipts(updated);
    return newReceipt;
  };

  const updateReceipt = (id: string, updates: Partial<ReceiptItem>) => {
    const updated = receipts.map((r) => (r.id === id ? { ...r, ...updates } : r));
    persistReceipts(updated);
    if (selectedReceipt?.id === id) {
      setSelectedReceipt((prev) => (prev ? { ...prev, ...updates } : null));
    }
  };

  const deleteReceipt = (id: string) => {
    const updated = receipts.filter((r) => r.id !== id);
    persistReceipts(updated);
    if (selectedReceipt?.id === id) {
      setSelectedReceipt(null);
    }
  };

  const deleteBulkReceipts = (ids: string[]) => {
    const idSet = new Set(ids);
    const updated = receipts.filter((r) => !idSet.has(r.id));
    persistReceipts(updated);
    if (selectedReceipt && idSet.has(selectedReceipt.id)) {
      setSelectedReceipt(null);
    }
  };

  const resetToSampleData = () => {
    persistReceipts(INITIAL_LEDGER_RECEIPTS);
  };

  const clearAllReceipts = () => {
    persistReceipts([]);
    setSelectedReceipt(null);
  };

  // Duplicate Check
  const checkDuplicate = (merchant: string, date: string, total: number, ignoreId?: string) => {
    return receipts.find(
      (r) =>
        r.id !== ignoreId &&
        r.merchant.toLowerCase().trim() === merchant.toLowerCase().trim() &&
        r.date === date &&
        Math.abs(r.total - total) < 0.05
    );
  };

  return {
    receipts,
    isLoaded,
    selectedReceipt,
    setSelectedReceipt,
    addReceipt,
    updateReceipt,
    deleteReceipt,
    deleteBulkReceipts,
    resetToSampleData,
    clearAllReceipts,
    checkDuplicate,
  };
}

/**
 * Filter and sort receipts helper
 */
export function filterReceipts(receipts: ReceiptItem[], filters: ReceiptFilterOptions): ReceiptItem[] {
  return receipts
    .filter((item) => {
      // Search text query
      if (filters.search.trim()) {
        const query = filters.search.toLowerCase().trim();
        const matchesMerchant = item.merchant.toLowerCase().includes(query);
        const matchesCategory = item.category.toLowerCase().includes(query);
        const matchesNotes = item.notes?.toLowerCase().includes(query);
        const matchesTags = item.tags?.some((t) => t.toLowerCase().includes(query));
        const matchesAmount = item.total.toString().includes(query);
        if (!matchesMerchant && !matchesCategory && !matchesNotes && !matchesTags && !matchesAmount) {
          return false;
        }
      }

      // Category filter
      if (filters.category && filters.category !== "all") {
        if (item.category !== filters.category) return false;
      }

      // Tax Year
      if (filters.taxYear && filters.taxYear !== "all") {
        if (item.taxYear !== filters.taxYear) return false;
      }

      // Business vs Personal
      if (filters.type === "business" && !item.isBusiness) return false;
      if (filters.type === "personal" && item.isBusiness) return false;

      // Status
      if (filters.status && filters.status !== "all") {
        if (item.status !== filters.status) return false;
      }

      // Min / Max Amount
      if (filters.minAmount !== undefined && item.total < filters.minAmount) return false;
      if (filters.maxAmount !== undefined && item.total > filters.maxAmount) return false;

      return true;
    })
    .sort((a, b) => {
      if (filters.sortBy === "date-desc") return new Date(b.date).getTime() - new Date(a.date).getTime();
      if (filters.sortBy === "date-asc") return new Date(a.date).getTime() - new Date(b.date).getTime();
      if (filters.sortBy === "amount-desc") return b.total - a.total;
      if (filters.sortBy === "amount-asc") return a.total - b.total;
      if (filters.sortBy === "merchant-asc") return a.merchant.localeCompare(b.merchant);
      return 0;
    });
}

/**
 * Generate and download CSV
 */
export function exportReceiptsToCSV(receipts: ReceiptItem[], filename = "expenseliy-receipts.csv") {
  const headers = [
    "ID",
    "Date",
    "Merchant / Vendor",
    "Category",
    "Tax Category",
    "Subtotal",
    "Tax",
    "Tip",
    "Total",
    "Currency",
    "Type",
    "Tax Year",
    "Payment Method",
    "Status",
    "Confidence (%)",
    "Tags",
    "Notes",
  ];

  const rows = receipts.map((r) => [
    r.id,
    r.date,
    `"${r.merchant.replace(/"/g, '""')}"`,
    `"${r.category}"`,
    `"${r.taxCategory}"`,
    r.subtotal.toFixed(2),
    r.tax.toFixed(2),
    (r.tip || 0).toFixed(2),
    r.total.toFixed(2),
    r.currency,
    r.isBusiness ? "Business" : "Personal",
    r.taxYear,
    `"${r.paymentMethod || ""}"`,
    r.status,
    r.confidence,
    `"${(r.tags || []).join(", ")}"`,
    `"${(r.notes || "").replace(/"/g, '""')}"`,
  ]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Generate and download Tax Deduction Summary CSV
 */
export function exportTaxSummaryCSV(receipts: ReceiptItem[], taxYear = "2026") {
  const filtered = receipts.filter((r) => r.isBusiness && (!taxYear || r.taxYear === taxYear));
  
  // Group by Tax Category
  const grouped: Record<string, { count: number; subtotal: number; tax: number; total: number; deductibleEst: number }> = {};

  filtered.forEach((r) => {
    const cat = r.taxCategory || "Other Deduction";
    if (!grouped[cat]) {
      grouped[cat] = { count: 0, subtotal: 0, tax: 0, total: 0, deductibleEst: 0 };
    }
    grouped[cat].count += 1;
    grouped[cat].subtotal += r.subtotal;
    grouped[cat].tax += r.tax;
    grouped[cat].total += r.total;

    // Meals standard 50% rule, others 100%
    const rate = cat.includes("Meals (50%)") ? 0.5 : 1.0;
    grouped[cat].deductibleEst += r.total * rate;
  });

  const headers = ["Tax Category", "Receipt Count", "Subtotal ($)", "Tax Paid ($)", "Gross Total ($)", "Estimated Deductible Amount ($)"];
  const rows = Object.entries(grouped).map(([cat, stats]) => [
    `"${cat}"`,
    stats.count,
    stats.subtotal.toFixed(2),
    stats.tax.toFixed(2),
    stats.total.toFixed(2),
    stats.deductibleEst.toFixed(2),
  ]);

  const totalGross = Object.values(grouped).reduce((acc, s) => acc + s.total, 0);
  const totalDeductible = Object.values(grouped).reduce((acc, s) => acc + s.deductibleEst, 0);

  rows.push([`"TOTAL FOR TAX YEAR ${taxYear}"`, filtered.length, "", "", totalGross.toFixed(2), totalDeductible.toFixed(2)]);

  const csvContent = "data:text/csv;charset=utf-8," + [headers.join(","), ...rows.map((e) => e.join(","))].join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `expenseliy-tax-summary-${taxYear}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
