"use client";

import React, { useState, useMemo } from "react";
import {
  Search,
  Filter,
  CheckCircle2,
  DollarSign,
  FileText,
  ShieldCheck,
  Tag,
  Plus,
  Trash2,
  Download,
  Info,
  Sparkles,
} from "lucide-react";

interface ScheduleCItem {
  id: string;
  name: string;
  irsLine: string;
  category: "Tech & Software" | "Marketing" | "Travel & Vehicles" | "Operations & Office" | "Professional Fees" | "Facilities";
  deductiblePct: number;
  description: string;
  receiptRules: string;
}

const DEDUCTIONS_DATABASE: ScheduleCItem[] = [
  {
    id: "software-saas",
    name: "Software & SaaS Subscriptions (Figma, Adobe, Notion, AWS)",
    irsLine: "Line 18 (Office Expense) or Line 27a (Other)",
    category: "Tech & Software",
    deductiblePct: 100,
    description: "Cloud software, productivity apps, web hosting, code repositories, domain names, and design tools.",
    receiptRules: "Digital invoice/receipt showing payment, billing date, and vendor details.",
  },
  {
    id: "computer-hardware",
    name: "Laptops, Monitors, Phones & Work Hardware",
    irsLine: "Line 13 (Depreciation) or Section 179 / De Minimis",
    category: "Tech & Software",
    deductiblePct: 100,
    description: "Laptops, cameras, audio equipment, tablets under $2,500 can be expensed immediately under De Minimis Safe Harbor.",
    receiptRules: "Itemized purchase receipt showing merchant, serial/model, and proof of purchase.",
  },
  {
    id: "advertising-ads",
    name: "Google, Meta, TikTok Ads & SEO Services",
    irsLine: "Line 8 (Advertising)",
    category: "Marketing",
    deductiblePct: 100,
    description: "Paid advertising spend, PPC campaigns, sponsored posts, business cards, email marketing software, brand merchandise.",
    receiptRules: "Ad account billing receipts or monthly statement showing ad spend charge.",
  },
  {
    id: "business-meals",
    name: "Client Business Lunches & Dinners",
    irsLine: "Line 24b (Deductible Meals)",
    category: "Travel & Vehicles",
    deductiblePct: 50,
    description: "Food and drinks with clients, contractors, or prospects where substantial business was conducted.",
    receiptRules: "Itemized restaurant receipt + note on who attended and business purpose discussed.",
  },
  {
    id: "business-travel",
    name: "Flights, Trains & Hotels (Out-of-Town Travel)",
    irsLine: "Line 24a (Travel)",
    category: "Travel & Vehicles",
    deductiblePct: 100,
    description: "Airfare, lodging, rideshares, baggage fees, and tolls for overnight business trips.",
    receiptRules: "Boarding passes, airline receipts, hotel folios showing destination and business dates.",
  },
  {
    id: "business-mileage",
    name: "Vehicle Mileage for Client Meetings / Errand Runs",
    irsLine: "Line 9 (Car and Truck Expenses)",
    category: "Travel & Vehicles",
    deductiblePct: 100,
    description: "Standard IRS mileage rate ($0.67/mi) or actual gas, maintenance, and insurance ratio.",
    receiptRules: "Contemporaneous mileage log with date, origin/destination, miles, and business reason.",
  },
  {
    id: "contract-labor",
    name: "Freelancers, Contractors & Virtual Assistants (1099)",
    irsLine: "Line 11 (Contract Labor)",
    category: "Professional Fees",
    deductiblePct: 100,
    description: "Payments to subcontractors, developers, copywriters, and virtual assistants. (Issue Form 1099-NEC if > $600/yr).",
    receiptRules: "Invoices from contractor + Form W-9 on file + payment transaction records.",
  },
  {
    id: "legal-accounting",
    name: "Legal Fees, CPA, Bookkeeping & Tax Prep",
    irsLine: "Line 17 (Legal & Professional Services)",
    category: "Professional Fees",
    deductiblePct: 100,
    description: "Lawyer consultations, LLC formation filings, CPA tax prep fees, bookkeeping software.",
    receiptRules: "Itemized CPA/attorney invoices specifying business-related scope.",
  },
  {
    id: "home-office",
    name: "Home Office Space (Dedicated Room)",
    irsLine: "Line 30 (Expenses for Business Use of Home)",
    category: "Facilities",
    deductiblePct: 100,
    description: "Simplified $5/sq ft (up to 300 sq ft) or proportional rent, power, heat, and home internet.",
    receiptRules: "Floor plan measurements + monthly rent/utility receipts if using actual expense method.",
  },
  {
    id: "coworking-desk",
    name: "Coworking Space (WeWork, Regus, Desk Rental)",
    irsLine: "Line 20b (Rent or Lease - Other Business Property)",
    category: "Facilities",
    deductiblePct: 100,
    description: "Monthly membership for dedicated desks, hot desks, conference room rentals.",
    receiptRules: "Monthly coworking membership invoice / subscription confirmation.",
  },
  {
    id: "education-courses",
    name: "Online Courses, Books, Conferences & Certifications",
    irsLine: "Line 27a (Other Expenses)",
    category: "Operations & Office",
    deductiblePct: 100,
    description: "Education that maintains or improves skills required in your current business trade.",
    receiptRules: "Course receipt, syllabus/ticket, and conference confirmation.",
  },
  {
    id: "bank-fees-processing",
    name: "Stripe, PayPal & Bank Merchant Processing Fees",
    irsLine: "Line 27a (Other Expenses)",
    category: "Operations & Office",
    deductiblePct: 100,
    description: "Credit card transaction processing fees (e.g. 2.9% + 30¢), wire transfer charges, bank monthly maintenance.",
    receiptRules: "Monthly merchant statements (Stripe/PayPal annual financial report).",
  },
  {
    id: "business-insurance",
    name: "General Liability, Professional E&O & Cyber Insurance",
    irsLine: "Line 15 (Insurance - other than health)",
    category: "Operations & Office",
    deductiblePct: 100,
    description: "Commercial liability policies, errors & omissions coverage, property protection.",
    receiptRules: "Insurance declaration page and annual policy payment statement.",
  },
  {
    id: "office-supplies",
    name: "Desk Supplies, Notebooks, Printer Ink & Paper",
    irsLine: "Line 18 (Office Expense)",
    category: "Operations & Office",
    deductiblePct: 100,
    description: "Consumable day-to-day office supplies used up within the fiscal tax year.",
    receiptRules: "Store or Amazon receipt with itemized goods listed.",
  },
];

const CATEGORIES = [
  "All Categories",
  "Tech & Software",
  "Marketing",
  "Travel & Vehicles",
  "Operations & Office",
  "Professional Fees",
  "Facilities",
] as const;

export function ScheduleCDeductionsFinder({ className = "" }: { className?: string }) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [simulatedItems, setSimulatedItems] = useState<{ item: ScheduleCItem; amount: number }[]>([]);

  const filteredItems = useMemo(() => {
    return DEDUCTIONS_DATABASE.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.irsLine.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory =
        selectedCategory === "All Categories" || item.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchTerm, selectedCategory]);

  const addSimulatedItem = (item: ScheduleCItem) => {
    const existing = simulatedItems.find((s) => s.item.id === item.id);
    if (!existing) {
      setSimulatedItems([...simulatedItems, { item, amount: 500 }]);
    }
  };

  const removeSimulatedItem = (id: string) => {
    setSimulatedItems(simulatedItems.filter((s) => s.item.id !== id));
  };

  const updateSimulatedAmount = (id: string, amount: number) => {
    setSimulatedItems(
      simulatedItems.map((s) => (s.item.id === id ? { ...s, amount: Math.max(0, amount) } : s))
    );
  };

  const totalDeductibleWriteOff = simulatedItems.reduce((acc, curr) => {
    return acc + (curr.amount * curr.item.deductiblePct) / 100;
  }, 0);

  const estimatedTaxSaved = totalDeductibleWriteOff * 0.30; // ~30% combined tax rate

  return (
    <div className={`w-full rounded-2xl bg-surface border border-hairline shadow-sm overflow-hidden ${className}`}>
      {/* Header */}
      <div className="p-6 md:p-8 bg-gradient-to-r from-income-bg/30 via-surface to-surface border-b border-hairline">
        <div className="flex items-center gap-2 mb-2">
          <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-income-bg text-income border border-income-border">
            IRS Form 1040 Schedule C Guide
          </span>
          <span className="inline-flex items-center text-xs text-ink-muted">
            <ShieldCheck className="w-3.5 h-3.5 mr-1 text-income" /> 100% IRS Compliant
          </span>
        </div>
        <h2 className="text-2xl font-bold text-ink tracking-tight">
          Schedule C Business Expense Categorizer & Deduction Lookup
        </h2>
        <p className="text-sm text-ink-muted mt-1">
          Search IRS write-off lines, check deductibility percentages, and calculate your total potential tax deductions.
        </p>

        {/* Search & Category Filter */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search expenses (e.g. software, flight, client dinner, laptop)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl bg-surface-raised border border-hairline text-ink text-sm focus:outline-none focus:ring-2 focus:ring-income"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-3.5 py-2.5 rounded-xl bg-surface-raised border border-hairline text-ink text-sm font-medium focus:outline-none focus:ring-2 focus:ring-income"
          >
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Main Layout */}
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left: Search Results List */}
        <div className="lg:col-span-7 space-y-4">
          <div className="flex items-center justify-between text-xs text-ink-muted font-medium">
            <span>Showing {filteredItems.length} deductible expense categories</span>
            <span>Click "+ Add to Calc" to estimate savings</span>
          </div>

          <div className="space-y-3 max-h-[640px] overflow-y-auto pr-1">
            {filteredItems.length === 0 ? (
              <div className="p-8 text-center text-ink-muted text-sm rounded-xl border border-hairline bg-surface-raised">
                No matching deductions found. Try searching for "software", "meals", or "mileage".
              </div>
            ) : (
              filteredItems.map((item) => {
                const isAdded = simulatedItems.some((s) => s.item.id === item.id);
                return (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-surface-raised border border-hairline hover:border-income/50 transition-all space-y-2.5"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div>
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="text-xs font-bold px-2 py-0.5 rounded-md bg-income-bg text-income border border-income-border">
                            {item.deductiblePct}% Deductible
                          </span>
                          <span className="text-[11px] font-medium text-ink-muted">
                            {item.irsLine}
                          </span>
                        </div>
                        <h4 className="text-sm font-bold text-ink mt-1.5">{item.name}</h4>
                      </div>

                      <button
                        onClick={() => addSimulatedItem(item)}
                        disabled={isAdded}
                        className={`px-2.5 py-1.5 rounded-lg text-xs font-semibold flex items-center gap-1 transition-all ${
                          isAdded
                            ? "bg-surface text-ink-muted border border-hairline cursor-default"
                            : "bg-income text-white hover:bg-income/90 cursor-pointer"
                        }`}
                      >
                        {isAdded ? <CheckCircle2 className="w-3.5 h-3.5 text-income" /> : <Plus className="w-3.5 h-3.5" />}
                        {isAdded ? "Added" : "Add"}
                      </button>
                    </div>

                    <p className="text-xs text-ink-secondary leading-relaxed">{item.description}</p>

                    <div className="pt-2 border-t border-hairline text-[11px] text-ink-muted flex items-center gap-1.5">
                      <FileText className="w-3.5 h-3.5 text-income shrink-0" />
                      <span><strong>Receipt Requirement:</strong> {item.receiptRules}</span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right: Interactive Write-Off Calculator */}
        <div className="lg:col-span-5 space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-surface-raised to-surface border border-hairline-strong shadow-md space-y-5">
            <div>
              <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider">
                Total Deductible Write-Off
              </span>
              <div className="text-3xl font-black text-income mt-1">
                ${Math.round(totalDeductibleWriteOff).toLocaleString()}
              </div>
              <p className="text-xs text-ink-muted mt-1">
                Estimated cash tax saved (~30% bracket):{" "}
                <strong className="text-income">${Math.round(estimatedTaxSaved).toLocaleString()}</strong>
              </p>
            </div>

            <div className="pt-3 border-t border-hairline space-y-3">
              <div className="flex justify-between items-center text-xs font-semibold text-ink">
                <span>Selected Write-Off Items ({simulatedItems.length})</span>
                {simulatedItems.length > 0 && (
                  <button
                    onClick={() => setSimulatedItems([])}
                    className="text-expense hover:underline cursor-pointer"
                  >
                    Clear all
                  </button>
                )}
              </div>

              {simulatedItems.length === 0 ? (
                <div className="p-6 text-center text-xs text-ink-muted rounded-xl bg-surface border border-dashed border-hairline">
                  Click <strong>+ Add</strong> on any deduction on the left to calculate your annual savings.
                </div>
              ) : (
                <div className="space-y-2.5 max-h-[360px] overflow-y-auto pr-1">
                  {simulatedItems.map(({ item, amount }) => (
                    <div
                      key={item.id}
                      className="p-3 rounded-xl bg-surface border border-hairline flex items-center justify-between gap-3 text-xs"
                    >
                      <div className="min-w-0 flex-1">
                        <p className="font-semibold text-ink truncate">{item.name}</p>
                        <span className="text-[11px] text-ink-muted">{item.deductiblePct}% deductible</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <div className="relative w-24">
                          <span className="absolute left-2 top-1/2 -translate-y-1/2 text-ink-muted">$</span>
                          <input
                            type="number"
                            min="0"
                            step="100"
                            value={amount || ""}
                            onChange={(e) => updateSimulatedAmount(item.id, Number(e.target.value))}
                            className="w-full pl-5 pr-2 py-1 rounded-lg bg-surface-raised border border-hairline text-ink font-semibold text-xs"
                          />
                        </div>

                        <button
                          onClick={() => removeSimulatedItem(item.id)}
                          className="p-1 text-ink-muted hover:text-expense transition-colors cursor-pointer"
                          title="Remove item"
                        >
                          <Trash2 className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-raised border border-hairline flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-income shrink-0 mt-0.5" />
            <div className="text-xs text-ink-muted space-y-1">
              <p className="font-semibold text-ink">Expenseliy Receipt Scanner</p>
              <p>
                Snap photos of paper receipts or upload PDFs in Expenseliy to automatically categorize and archive them for Schedule C tax filings.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
