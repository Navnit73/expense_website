"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { Button } from "@/components/marketing/Button";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import {
  getWebApplicationSchema,
  getBreadcrumbSchema,
  getFAQSchema,
} from "@/lib/seo";
import {
  RefreshCw,
  Plus,
  Trash2,
  TrendingDown,
  Sparkles,
  ArrowRight,
  RotateCcw,
  CheckCircle2,
  DollarSign,
  AlertTriangle,
} from "lucide-react";

interface SubscriptionItem {
  id: string;
  name: string;
  category: "Streaming" | "Software & AI" | "Fitness" | "Utilities" | "Other";
  amount: number;
  period: "monthly" | "annual";
}

const DEFAULT_SUBSCRIPTIONS: SubscriptionItem[] = [
  { id: "1", name: "Netflix Premium", category: "Streaming", amount: 22.99, period: "monthly" },
  { id: "2", name: "Spotify Family", category: "Streaming", amount: 16.99, period: "monthly" },
  { id: "3", name: "ChatGPT Plus", category: "Software & AI", amount: 20.00, period: "monthly" },
  { id: "4", name: "Gym Membership", category: "Fitness", amount: 65.00, period: "monthly" },
  { id: "5", name: "Amazon Prime", category: "Streaming", amount: 139.00, period: "annual" },
  { id: "6", name: "iCloud+ Storage", category: "Software & AI", amount: 2.99, period: "monthly" },
];

const PRESETS = [
  { name: "Disney+", category: "Streaming" as const, amount: 13.99, period: "monthly" as const },
  { name: "YouTube Premium", category: "Streaming" as const, amount: 13.99, period: "monthly" as const },
  { name: "GitHub Copilot", category: "Software & AI" as const, amount: 10.00, period: "monthly" as const },
  { name: "Peloton App", category: "Fitness" as const, amount: 24.00, period: "monthly" as const },
  { name: "DoorDash DashPass", category: "Other" as const, amount: 9.99, period: "monthly" as const },
];

const SUBSCRIPTION_FAQS: FAQItem[] = [
  {
    question: "How much does the average person spend on subscriptions?",
    answer:
      "Studies show the average consumer spends between $219 and $273 per month on recurring subscriptions, often underestimating their actual spend by more than 2.5x due to automatic renewals and forgotten trials.",
  },
  {
    question: "What is the 5-Year Compound Opportunity Cost?",
    answer:
      "Every dollar spent on recurring overhead is a dollar not compounding in investments. At a historical 8% average return (like the S&P 500), canceling $100/month in unused subscriptions yields over $7,300 in wealth over 5 years and $18,000+ over 10 years.",
  },
  {
    question: "How can I find hidden or forgotten recurring charges?",
    answer:
      "1. Export last 90 days of bank & credit card statements to CSV. 2. Filter by recurring merchant names. 3. Check Apple App Store & Google Play subscriptions. 4. Use Expenseliy's automated recurring charge detection.",
  },
  {
    question: "How does Expenseliy help detect recurring expenses?",
    answer:
      "Expenseliy includes an algorithmic Recurring Expense Detector that analyzes payment frequency and merchant history to automatically group recurring memberships, alerting you to price increases and duplicate licenses.",
  },
];

export default function SubscriptionCalculatorPage() {
  const [currency, setCurrency] = useState<string>("$");
  const [subscriptions, setSubscriptions] = useState<SubscriptionItem[]>(DEFAULT_SUBSCRIPTIONS);
  const [newName, setNewName] = useState<string>("");
  const [newAmount, setNewAmount] = useState<string>("");
  const [newCategory, setNewCategory] = useState<SubscriptionItem["category"]>("Streaming");
  const [newPeriod, setNewPeriod] = useState<"monthly" | "annual">("monthly");

  // Calculations
  const calculateItemMonthly = (item: SubscriptionItem) =>
    item.period === "annual" ? item.amount / 12 : item.amount;

  const totalMonthlyDrain = subscriptions.reduce(
    (acc, item) => acc + calculateItemMonthly(item),
    0
  );
  const totalAnnualDrain = totalMonthlyDrain * 12;
  const direct5YearCost = totalAnnualDrain * 5;

  // 5-Year Opportunity Cost (Monthly compounding at 8% CAGR)
  const monthlyRate = 0.08 / 12;
  const months = 60;
  const fiveYearOpportunityCost =
    totalMonthlyDrain * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);

  const handleAddSubscription = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newAmount || Number(newAmount) <= 0) return;

    const newItem: SubscriptionItem = {
      id: Date.now().toString(),
      name: newName.trim(),
      category: newCategory,
      amount: Number(newAmount),
      period: newPeriod,
    };

    setSubscriptions([...subscriptions, newItem]);
    setNewName("");
    setNewAmount("");
  };

  const handleAddPreset = (preset: (typeof PRESETS)[0]) => {
    const newItem: SubscriptionItem = {
      id: Date.now().toString(),
      name: preset.name,
      category: preset.category,
      amount: preset.amount,
      period: preset.period,
    };
    setSubscriptions([...subscriptions, newItem]);
  };

  const handleRemove = (id: string) => {
    setSubscriptions(subscriptions.filter((s) => s.id !== id));
  };

  const handleReset = () => {
    setSubscriptions(DEFAULT_SUBSCRIPTIONS);
  };

  const webAppSchema = getWebApplicationSchema({
    name: "Subscription Cost & Recurring Leak Calculator",
    description:
      "Audit your recurring monthly and annual subscriptions. Calculate total drain, yearly expense, and 5-year investment opportunity cost.",
    url: "/tools/subscription-cost-calculator",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Subscription Auditor", url: "/tools/subscription-cost-calculator" },
  ]);

  const faqSchema = getFAQSchema(SUBSCRIPTION_FAQS);

  return (
    <div className="flex flex-col flex-1">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <header className="bg-surface border-b border-hairline py-10 sm:py-14">
        <Container size="default">
          <Breadcrumbs
            items={[
              { name: "Tools", url: "/tools" },
              { name: "Subscription Auditor", url: "/tools/subscription-cost-calculator" },
            ]}
            className="mb-6"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-warning/10 text-warning border border-warning/30 text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <RefreshCw className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Subscription Leak Auditor</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4 leading-tight">
              Subscription Cost & Leak Calculator
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-4">
              Itemize all your monthly streaming, AI tools, memberships, and recurring services to
              reveal your true annual financial drain and investment opportunity cost.
            </p>
          </div>
        </Container>
      </header>

      {/* Calculator Section */}
      <section className="py-10 sm:py-14 bg-canvas flex-1">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Management Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Add New Subscription Form */}
              <div className="bg-surface border border-hairline rounded-md p-6">
                <h2 className="text-sm font-bold text-ink mb-4 flex items-center justify-between">
                  <span>Add Subscription or Service</span>
                  <button
                    type="button"
                    onClick={handleReset}
                    className="text-xs text-ink-muted hover:text-ink flex items-center gap-1 font-normal"
                  >
                    <RotateCcw className="w-3 h-3" />
                    <span>Reset Sample Items</span>
                  </button>
                </h2>

                <form onSubmit={handleAddSubscription} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
                    <div className="sm:col-span-6">
                      <label
                        htmlFor="service-name-input"
                        className="block text-[11px] font-mono text-ink-muted uppercase mb-1"
                      >
                        Service Name
                      </label>
                      <input
                        id="service-name-input"
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        placeholder="e.g. Disney+, Gym, Adobe"
                        className="w-full px-3 py-2 bg-canvas border border-hairline rounded-md text-xs text-ink focus:border-primary focus:outline-none font-medium"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="service-cost-input"
                        className="block text-[11px] font-mono text-ink-muted uppercase mb-1"
                      >
                        Cost ({currency})
                      </label>
                      <input
                        id="service-cost-input"
                        type="number"
                        step="0.01"
                        min="0.1"
                        value={newAmount}
                        onChange={(e) => setNewAmount(e.target.value)}
                        placeholder="14.99"
                        className="w-full px-3 py-2 bg-canvas border border-hairline rounded-md text-xs text-ink focus:border-primary focus:outline-none font-bold font-mono"
                      />
                    </div>
                    <div className="sm:col-span-3">
                      <label
                        htmlFor="service-billing-cycle"
                        className="block text-[11px] font-mono text-ink-muted uppercase mb-1"
                      >
                        Billing Cycle
                      </label>
                      <select
                        id="service-billing-cycle"
                        value={newPeriod}
                        onChange={(e) => setNewPeriod(e.target.value as any)}
                        className="w-full px-3 py-2 bg-canvas border border-hairline rounded-md text-xs text-ink focus:border-primary focus:outline-none font-medium"
                      >
                        <option value="monthly">Monthly</option>
                        <option value="annual">Annual</option>
                      </select>
                    </div>
                  </div>

                  <div className="flex items-center justify-between gap-4 pt-1">
                    <div className="flex items-center gap-2">
                      <label
                        htmlFor="service-category-select"
                        className="text-[11px] font-mono text-ink-muted uppercase"
                      >
                        Category:
                      </label>
                      <select
                        id="service-category-select"
                        value={newCategory}
                        onChange={(e) => setNewCategory(e.target.value as any)}
                        className="px-2.5 py-1 bg-canvas border border-hairline rounded-md text-xs text-ink focus:outline-none"
                      >
                        <option value="Streaming">Streaming</option>
                        <option value="Software & AI">Software & AI</option>
                        <option value="Fitness">Fitness</option>
                        <option value="Utilities">Utilities</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>

                    <Button type="submit" variant="primary" size="sm">
                      <Plus className="w-3.5 h-3.5" />
                      <span>Add Item</span>
                    </Button>
                  </div>
                </form>

                {/* Quick Presets */}
                <div className="mt-4 pt-4 border-t border-hairline flex flex-wrap items-center gap-1.5">
                  <span className="text-[11px] font-mono text-ink-muted uppercase mr-1">
                    Quick Add:
                  </span>
                  {PRESETS.map((preset) => (
                    <button
                      key={preset.name}
                      type="button"
                      onClick={() => handleAddPreset(preset)}
                      className="px-2 py-1 rounded bg-canvas border border-hairline hover:border-hairline-strong text-[11px] text-ink-secondary flex items-center gap-1 transition-colors"
                    >
                      <span>+ {preset.name}</span>
                      <span className="font-mono text-ink-muted">({currency}{preset.amount})</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Subscriptions List */}
              <div className="bg-surface border border-hairline rounded-md overflow-hidden">
                <div className="px-6 py-4 border-b border-hairline flex items-center justify-between">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-ink font-mono">
                    Current Active Subscriptions ({subscriptions.length})
                  </h3>
                  <span className="text-xs text-ink-muted font-mono">
                    {currency}{totalMonthlyDrain.toFixed(2)}/mo
                  </span>
                </div>

                {subscriptions.length === 0 ? (
                  <div className="p-8 text-center text-xs text-ink-muted">
                    No subscriptions added yet. Add an item above to audit your costs.
                  </div>
                ) : (
                  <div className="divide-y divide-hairline">
                    {subscriptions.map((item) => {
                      const monthlyCost = calculateItemMonthly(item);
                      return (
                        <div
                          key={item.id}
                          className="px-6 py-3.5 flex items-center justify-between gap-4 hover:bg-canvas transition-colors"
                        >
                          <div className="flex items-center gap-3">
                            <div>
                              <div className="text-xs font-bold text-ink">{item.name}</div>
                              <div className="text-[11px] text-ink-muted flex items-center gap-2">
                                <span className="px-1.5 py-0.5 rounded bg-canvas border border-hairline text-[10px]">
                                  {item.category}
                                </span>
                                <span>
                                  {currency}{item.amount.toFixed(2)} / {item.period}
                                </span>
                              </div>
                            </div>
                          </div>

                          <div className="flex items-center gap-4">
                            <div className="text-right">
                              <div className="text-xs font-bold font-mono text-ink">
                                {currency}{monthlyCost.toFixed(2)}
                                <span className="text-[10px] font-normal text-ink-muted">/mo</span>
                              </div>
                              <div className="text-[10px] font-mono text-ink-muted">
                                {currency}{(monthlyCost * 12).toFixed(2)}/yr
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => handleRemove(item.id)}
                              className="p-1.5 text-ink-muted hover:text-expense hover:bg-expense/10 rounded transition-colors"
                              title="Delete subscription"
                              aria-label={`Delete ${item.name}`}
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Right Summary & Opportunity Cost Column */}
            <div className="lg:col-span-5 space-y-6">
              {/* Grand Total Drain Card */}
              <div className="bg-surface border border-hairline-strong rounded-md p-6 sm:p-8">
                <div className="border-b border-hairline pb-4 mb-6">
                  <span className="text-xs font-mono text-ink-muted uppercase">
                    Total Recurring Overhead
                  </span>
                  <div className="text-3xl sm:text-4xl font-extrabold text-expense tracking-tight mt-1">
                    {currency}{totalMonthlyDrain.toFixed(2)}
                    <span className="text-sm font-normal text-ink-muted"> / month</span>
                  </div>
                </div>

                <div className="space-y-4 mb-6 text-xs">
                  <div className="flex justify-between items-center py-1.5 border-b border-hairline">
                    <span className="text-ink-secondary">Annual Direct Drain:</span>
                    <span className="font-mono font-bold text-ink text-sm">
                      {currency}{Math.round(totalAnnualDrain).toLocaleString("en-US")} / year
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-1.5 border-b border-hairline">
                    <span className="text-ink-secondary">5-Year Cumulative Spend:</span>
                    <span className="font-mono font-bold text-ink text-sm">
                      {currency}{Math.round(direct5YearCost).toLocaleString("en-US")}
                    </span>
                  </div>
                </div>

                {/* 5-Year Opportunity Cost Callout */}
                <div className="bg-expense/10 border border-expense/30 rounded-md p-5 mb-6">
                  <div className="flex items-center gap-2 text-xs font-bold text-expense mb-1">
                    <AlertTriangle className="w-4 h-4 shrink-0" />
                    <span>5-Year Investment Opportunity Cost</span>
                  </div>
                  <div className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mt-1 mb-2">
                    {currency}{Math.round(fiveYearOpportunityCost).toLocaleString("en-US")}
                  </div>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    If this <strong>{currency}{totalMonthlyDrain.toFixed(0)}/month</strong> were redirected into an index fund compounding at 8% CAGR, it would grow to <strong>{currency}{Math.round(fiveYearOpportunityCost).toLocaleString("en-US")}</strong> in 5 years.
                  </p>
                </div>

                {/* Expenseliy Integration Callout */}
                <div className="bg-surface-raised border border-hairline-strong rounded-md p-4 flex flex-col gap-3">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-ink">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>Automate Subscription Auditing</span>
                  </div>
                  <p className="text-xs text-ink-muted">
                    Expenseliy automatically flags repeating billing patterns and sudden subscription
                    price hikes.
                  </p>
                  <Button
                    href="https://app.expenseliy.com/auth/signin"
                    variant="primary"
                    size="sm"
                    className="w-full justify-center"
                    id="sub-auditor-cta"
                  >
                    <span>Start Tracking Free (40 Tx)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>

              {/* Related Guide Link */}
              <div className="bg-surface border border-hairline rounded-md p-6">
                <h3 className="text-sm font-bold text-ink mb-2">
                  Featured Pillar Guide
                </h3>
                <p className="text-xs text-ink-secondary leading-relaxed mb-4">
                  Step-by-step checklist to identify zombie subscriptions, negotiate lower bills, and
                  eliminate duplicate software licenses.
                </p>
                <Link
                  href="/guide/recurring-subscription-audit"
                  className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                >
                  <span>Read: How to Audit & Cancel Subscriptions</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>
          </div>
        </Container>
      </section>

      {/* Cross-Link Hub: Related Tools & Recommended Guides */}
      <section className="py-14 bg-canvas border-t border-hairline">
        <Container size="default">
          <div className="max-w-3xl mb-8">
            <Badge variant="warning" size="sm" className="mb-2">
              Connected Toolkit
            </Badge>
            <h2 className="text-xl sm:text-2xl font-extrabold text-ink tracking-tight">
              Explore More Free Financial Tools & Guides
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary mt-1">
              Plug recurring leaks into your overall 50/30/20 budget and calculate the impact on your savings runway.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
            {/* 50/30/20 Budget Calculator Card */}
            <div className="bg-surface border border-hairline hover:border-hairline-strong rounded-md p-5 flex flex-col justify-between transition-colors">
              <div>
                <Badge variant="sky" size="sm" className="mb-2">
                  Percentage Allocator
                </Badge>
                <h3 className="text-sm font-bold text-ink mb-1">
                  <Link href="/tools/50-30-20-budget-calculator" className="hover:text-primary transition-colors">
                    50/30/20 Budget Calculator
                  </Link>
                </h3>
                <p className="text-xs text-ink-secondary leading-relaxed mb-3">
                  Distribute your net income across Needs, Wants, and Savings buckets with dynamic percentage sliders.
                </p>
              </div>
              <Link
                href="/tools/50-30-20-budget-calculator"
                className="text-xs font-semibold text-primary inline-flex items-center gap-1 hover:underline"
              >
                <span>Open Budget Calculator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            {/* Savings Rate Calculator Card */}
            <div className="bg-surface border border-hairline hover:border-hairline-strong rounded-md p-5 flex flex-col justify-between transition-colors">
              <div>
                <Badge variant="income" size="sm" className="mb-2">
                  Emergency Runway
                </Badge>
                <h3 className="text-sm font-bold text-ink mb-1">
                  <Link href="/tools/savings-rate-calculator" className="hover:text-primary transition-colors">
                    Savings Rate & Runway Calculator
                  </Link>
                </h3>
                <p className="text-xs text-ink-secondary leading-relaxed mb-3">
                  Measure your net savings rate, evaluate months of emergency cash buffer, and model compound growth.
                </p>
              </div>
              <Link
                href="/tools/savings-rate-calculator"
                className="text-xs font-semibold text-primary inline-flex items-center gap-1 hover:underline"
              >
                <span>Open Savings Calculator</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Connected Pillar Guides */}
          <div className="bg-surface border border-hairline rounded-md p-6">
            <h3 className="text-sm font-bold text-ink mb-3">
              Essential Cost Optimization & Tracking Guides
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/guide/household-bill-tracker"
                className="p-3 rounded-md bg-canvas border border-hairline hover:border-hairline-strong transition-colors block group"
              >
                <span className="text-[11px] font-semibold text-primary block mb-1">Household</span>
                <span className="text-xs font-bold text-ink group-hover:text-primary transition-colors block">
                  Couple & Household Bill Splitting →
                </span>
              </Link>
              <Link
                href="/guide/expense-categories"
                className="p-3 rounded-md bg-canvas border border-hairline hover:border-hairline-strong transition-colors block group"
              >
                <span className="text-[11px] font-semibold text-primary block mb-1">Taxonomy</span>
                <span className="text-xs font-bold text-ink group-hover:text-primary transition-colors block">
                  Standard Expense Categories Chart →
                </span>
              </Link>
              <Link
                href="/guide/cash-flow-management-guide"
                className="p-3 rounded-md bg-canvas border border-hairline hover:border-hairline-strong transition-colors block group"
              >
                <span className="text-[11px] font-semibold text-primary block mb-1">Cash Flow</span>
                <span className="text-xs font-bold text-ink group-hover:text-primary transition-colors block">
                  Personal Cash Flow & Runway Guide →
                </span>
              </Link>
              <Link
                href="/guide/spreadsheet-vs-app"
                className="p-3 rounded-md bg-canvas border border-hairline hover:border-hairline-strong transition-colors block group"
              >
                <span className="text-[11px] font-semibold text-primary block mb-1">Comparison</span>
                <span className="text-xs font-bold text-ink group-hover:text-primary transition-colors block">
                  Excel vs Dedicated Expense Apps →
                </span>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-14 sm:py-20 bg-surface border-t border-hairline">
        <Container size="narrow">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Badge variant="neutral" size="sm" className="mb-3">
              FAQ
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-2">
              Subscription Audit FAQ
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary">
              Learn how to eliminate recurring waste and optimize monthly expenses.
            </p>
          </div>

          <FAQAccordion items={SUBSCRIPTION_FAQS} />
        </Container>
      </section>

      {/* Bottom CTA */}
      <CTASection
        title="Stop Silent Subscription Leaks with Expenseliy"
        description="Detect recurring charges, analyze cash flow trends, and export clean financial records effortlessly."
        badgeText="Get Started Free"
      />
    </div>
  );
}
