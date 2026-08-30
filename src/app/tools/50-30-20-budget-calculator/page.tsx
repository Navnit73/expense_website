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
  PieChart,
  DollarSign,
  ArrowRight,
  Sparkles,
  CheckCircle2,
  HelpCircle,
  Copy,
  Check,
  RotateCcw,
} from "lucide-react";

const CALCULATOR_FAQS: FAQItem[] = [
  {
    question: "What is the 50/30/20 budget rule?",
    answer:
      "The 50/30/20 rule is an intuitive budgeting framework popularized by Senator Elizabeth Warren. It recommends allocating 50% of your after-tax income to Essential Needs (rent, utilities, groceries), 30% to Discretionary Wants (dining, hobbies, subscriptions), and 20% to Savings, Debt Payoff, and Investments.",
  },
  {
    question: "Should I calculate the 50/30/20 budget on gross or net income?",
    answer:
      "Always calculate on your net (after-tax) take-home pay. This represents the actual cash deposited into your bank account after federal/state income taxes, Medicare, and Social Security deductions.",
  },
  {
    question: "What if my essential needs exceed 50% of my income?",
    answer:
      "In high-cost-of-living areas, essential needs often take up 60% or 70% of income. In that case, adjust to a 60/20/20 or 70/20/10 split temporarily while working to lower fixed housing/utility costs or increase income.",
  },
  {
    question: "What categories belong in 'Needs' vs 'Wants'?",
    answer:
      "Needs include non-negotiable survival expenses: rent/mortgage, minimum debt payments, electricity, basic groceries, healthcare, and essential commuting. Wants include dining out, streaming subscriptions, vacations, designer apparel, and entertainment.",
  },
  {
    question: "How do I track my actual spending against this 50/30/20 budget?",
    answer:
      "Expenseliy lets you log transactions in under 5 seconds with custom tags and automated category distributions, letting you see in real-time whether your monthly spending adheres to your 50/30/20 target.",
  },
];

export default function BudgetCalculatorPage() {
  const [income, setIncome] = useState<number>(5000);
  const [frequency, setFrequency] = useState<"monthly" | "annual" | "biweekly">("monthly");
  const [currency, setCurrency] = useState<string>("$");
  const [needsPct, setNeedsPct] = useState<number>(50);
  const [wantsPct, setWantsPct] = useState<number>(30);
  const [savingsPct, setSavingsPct] = useState<number>(20);
  const [copied, setCopied] = useState<boolean>(false);

  // Normalize to monthly for base calculation
  const monthlyIncome =
    frequency === "annual"
      ? income / 12
      : frequency === "biweekly"
      ? (income * 26) / 12
      : income;

  const needsAmount = (monthlyIncome * needsPct) / 100;
  const wantsAmount = (monthlyIncome * wantsPct) / 100;
  const savingsAmount = (monthlyIncome * savingsPct) / 100;

  const handleReset = () => {
    setNeedsPct(50);
    setWantsPct(30);
    setSavingsPct(20);
    setIncome(5000);
    setFrequency("monthly");
  };

  const handleCopyBreakdown = () => {
    const text = `50/30/20 Budget Plan (${currency}${monthlyIncome.toLocaleString("en-US", { maximumFractionDigits: 0 })}/mo):
- Needs (${needsPct}%): ${currency}${needsAmount.toLocaleString("en-US", { maximumFractionDigits: 0 })}/mo
- Wants (${wantsPct}%): ${currency}${wantsAmount.toLocaleString("en-US", { maximumFractionDigits: 0 })}/mo
- Savings & Debt (${savingsPct}%): ${currency}${savingsAmount.toLocaleString("en-US", { maximumFractionDigits: 0 })}/mo
Calculated on Expenseliy (https://www.expenseliy.com/tools/50-30-20-budget-calculator)`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const webAppSchema = getWebApplicationSchema({
    name: "50/30/20 Budget Calculator Online Free",
    description:
      "Calculate your 50/30/20 budget breakdown instantly. Allocate take-home income into Needs, Wants, and Savings with custom sliders.",
    url: "/tools/50-30-20-budget-calculator",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "50/30/20 Budget Calculator", url: "/tools/50-30-20-budget-calculator" },
  ]);

  const faqSchema = getFAQSchema(CALCULATOR_FAQS);

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
              { name: "50/30/20 Budget Calculator", url: "/tools/50-30-20-budget-calculator" },
            ]}
            className="mb-6"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-income-bg text-income border border-income-border text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <PieChart className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Interactive Budget Planner</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4 leading-tight">
              50/30/20 Budget Calculator
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-4">
              Allocate your monthly take-home income across Essential Needs, Discretionary Wants,
              and Savings/Investments. Adjust ratios to match your lifestyle and cost of living.
            </p>
          </div>
        </Container>
      </header>

      {/* Interactive Tool Section */}
      <section className="py-10 sm:py-14 bg-canvas flex-1">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Inputs Column */}
            <div className="lg:col-span-5 bg-surface border border-hairline rounded-md p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-hairline pb-4">
                <h2 className="text-base font-bold text-ink">Income & Parameters</h2>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-ink-muted hover:text-ink flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Defaults</span>
                </button>
              </div>

              {/* Take-Home Pay Input */}
              <div>
                <label
                  htmlFor="income-input"
                  className="block text-xs font-semibold uppercase tracking-wider text-ink font-mono mb-2"
                >
                  Net Take-Home Income
                </label>
                <div className="flex rounded-md border border-hairline bg-canvas focus-within:border-primary">
                  <select
                    value={currency}
                    aria-label="Select Currency"
                    onChange={(e) => setCurrency(e.target.value)}
                    className="px-3 py-2.5 bg-surface border-r border-hairline text-ink text-sm font-semibold rounded-l-md focus:outline-none"
                  >
                    <option value="$">$ (USD)</option>
                    <option value="€">€ (EUR)</option>
                    <option value="£">£ (GBP)</option>
                    <option value="C$">C$ (CAD)</option>
                    <option value="A$">A$ (AUD)</option>
                    <option value="₹">₹ (INR)</option>
                  </select>
                  <input
                    id="income-input"
                    type="number"
                    min="100"
                    max="1000000"
                    step="100"
                    value={income || ""}
                    onChange={(e) => setIncome(Number(e.target.value))}
                    className="w-full px-3 py-2.5 bg-transparent text-ink text-base font-bold focus:outline-none"
                    placeholder="5000"
                  />
                </div>
              </div>

              {/* Pay Frequency */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink font-mono mb-2">
                  Payment Frequency
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: "monthly", label: "Monthly" },
                    { id: "biweekly", label: "Bi-Weekly" },
                    { id: "annual", label: "Annual" },
                  ].map((freq) => (
                    <button
                      key={freq.id}
                      type="button"
                      onClick={() => setFrequency(freq.id as any)}
                      className={`py-2 px-3 text-xs font-semibold rounded-md border transition-colors ${
                        frequency === freq.id
                          ? "bg-primary text-white border-primary"
                          : "bg-canvas border-hairline text-ink-secondary hover:bg-surface-raised"
                      }`}
                    >
                      {freq.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Custom Allocation Sliders */}
              <div className="space-y-4 pt-4 border-t border-hairline">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold uppercase tracking-wider text-ink font-mono">
                    Budget Ratios
                  </span>
                  <span className="text-xs text-ink-muted">
                    Total: {needsPct + wantsPct + savingsPct}%
                  </span>
                </div>

                {/* Needs */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-expense">Needs ({needsPct}%)</span>
                    <span className="font-mono text-ink-secondary">
                      {currency}
                      {Math.round(needsAmount).toLocaleString()} /mo
                    </span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max="80"
                    value={needsPct}
                    onChange={(e) => setNeedsPct(Number(e.target.value))}
                    className="w-full accent-expense cursor-pointer"
                  />
                </div>

                {/* Wants */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-warning">Wants ({wantsPct}%)</span>
                    <span className="font-mono text-ink-secondary">
                      {currency}
                      {Math.round(wantsAmount).toLocaleString()} /mo
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    value={wantsPct}
                    onChange={(e) => setWantsPct(Number(e.target.value))}
                    className="w-full accent-warning cursor-pointer"
                  />
                </div>

                {/* Savings */}
                <div>
                  <div className="flex justify-between text-xs mb-1">
                    <span className="font-semibold text-income">Savings & Debt ({savingsPct}%)</span>
                    <span className="font-mono text-ink-secondary">
                      {currency}
                      {Math.round(savingsAmount).toLocaleString()} /mo
                    </span>
                  </div>
                  <input
                    type="range"
                    min="5"
                    max="60"
                    value={savingsPct}
                    onChange={(e) => setSavingsPct(Number(e.target.value))}
                    className="w-full accent-income cursor-pointer"
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2 flex flex-col gap-2">
                <button
                  type="button"
                  onClick={handleCopyBreakdown}
                  className="w-full py-2.5 px-4 bg-canvas border border-hairline hover:border-hairline-strong rounded-md text-xs font-semibold text-ink flex items-center justify-center gap-2 transition-colors"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-income" />
                      <span>Copied Breakdown to Clipboard!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy My Budget Breakdown</span>
                    </>
                  )}
                </button>
              </div>
            </div>

            {/* Right Output & Breakdown Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Monthly Overview Card */}
              <div className="bg-surface border border-hairline-strong rounded-md p-6 sm:p-8">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-hairline pb-4 mb-6">
                  <div>
                    <span className="text-xs font-mono text-ink-muted uppercase">
                      Monthly Budget Baseline
                    </span>
                    <div className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mt-0.5">
                      {currency}
                      {Math.round(monthlyIncome).toLocaleString("en-US")}
                      <span className="text-sm font-normal text-ink-muted"> / month</span>
                    </div>
                  </div>
                  <div className="text-right hidden sm:block">
                    <span className="text-xs font-mono text-ink-muted uppercase">Annual Net</span>
                    <div className="text-lg font-bold text-ink-secondary">
                      {currency}
                      {Math.round(monthlyIncome * 12).toLocaleString("en-US")} / yr
                    </div>
                  </div>
                </div>

                {/* Visual Distribution Bar */}
                <div className="space-y-2 mb-8">
                  <div className="h-4 w-full rounded-full bg-canvas border border-hairline overflow-hidden flex">
                    <div
                      style={{ width: `${needsPct}%` }}
                      className="bg-expense transition-all duration-300"
                      title={`Needs: ${needsPct}%`}
                    />
                    <div
                      style={{ width: `${wantsPct}%` }}
                      className="bg-warning transition-all duration-300"
                      title={`Wants: ${wantsPct}%`}
                    />
                    <div
                      style={{ width: `${savingsPct}%` }}
                      className="bg-income transition-all duration-300"
                      title={`Savings: ${savingsPct}%`}
                    />
                  </div>
                  <div className="flex items-center justify-between text-xs font-mono text-ink-muted">
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-expense" /> Needs ({needsPct}%)
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-warning" /> Wants ({wantsPct}%)
                    </span>
                    <span className="flex items-center gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-income" /> Savings ({savingsPct}%)
                    </span>
                  </div>
                </div>

                {/* 3 Pillar Summary Cards */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  {/* Needs */}
                  <div className="bg-canvas border border-hairline rounded-md p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-expense block mb-1">
                        1. Needs ({needsPct}%)
                      </span>
                      <div className="text-xl sm:text-2xl font-extrabold text-ink">
                        {currency}
                        {Math.round(needsAmount).toLocaleString()}
                      </div>
                      <span className="text-[11px] text-ink-muted">
                        {currency}
                        {Math.round(needsAmount * 12).toLocaleString()} / year
                      </span>
                    </div>
                    <ul className="text-[11px] text-ink-secondary space-y-1 mt-3 pt-3 border-t border-hairline">
                      <li>• Rent / Mortgage & HOA</li>
                      <li>• Utilities & Home Internet</li>
                      <li>• Groceries & Health</li>
                      <li>• Minimum Debt Payments</li>
                    </ul>
                  </div>

                  {/* Wants */}
                  <div className="bg-canvas border border-hairline rounded-md p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-warning block mb-1">
                        2. Wants ({wantsPct}%)
                      </span>
                      <div className="text-xl sm:text-2xl font-extrabold text-ink">
                        {currency}
                        {Math.round(wantsAmount).toLocaleString()}
                      </div>
                      <span className="text-[11px] text-ink-muted">
                        {currency}
                        {Math.round(wantsAmount * 12).toLocaleString()} / year
                      </span>
                    </div>
                    <ul className="text-[11px] text-ink-secondary space-y-1 mt-3 pt-3 border-t border-hairline">
                      <li>• Dining Out & Takeout</li>
                      <li>• Streaming & Subscriptions</li>
                      <li>• Hobbies & Concerts</li>
                      <li>• Travel & Vacations</li>
                    </ul>
                  </div>

                  {/* Savings */}
                  <div className="bg-canvas border border-hairline rounded-md p-4 flex flex-col justify-between">
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-income block mb-1">
                        3. Savings ({savingsPct}%)
                      </span>
                      <div className="text-xl sm:text-2xl font-extrabold text-ink">
                        {currency}
                        {Math.round(savingsAmount).toLocaleString()}
                      </div>
                      <span className="text-[11px] text-income font-semibold">
                        +{currency}
                        {Math.round(savingsAmount * 12).toLocaleString()} / year
                      </span>
                    </div>
                    <ul className="text-[11px] text-ink-secondary space-y-1 mt-3 pt-3 border-t border-hairline">
                      <li>• Emergency Fund</li>
                      <li>• Stocks & Index Funds</li>
                      <li>• Retirement (401k/IRA)</li>
                      <li>• Extra Debt Principal</li>
                    </ul>
                  </div>
                </div>

                {/* Expenseliy Integration Callout */}
                <div className="bg-surface-raised border border-hairline-strong rounded-md p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-ink">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span>Ready to track this budget in real-time?</span>
                    </div>
                    <p className="text-xs text-ink-muted mt-0.5">
                      Log daily expenses in 5 seconds with automatic category charts and 40 free
                      transactions.
                    </p>
                  </div>
                  <Button
                    href="https://app.expenseliy.com/auth/signin"
                    variant="primary"
                    size="sm"
                    className="shrink-0 w-full sm:w-auto"
                    id="calc-start-tracking-cta"
                  >
                    <span>Track in Expenseliy</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>

              {/* Related Guide Links */}
              <div className="bg-surface border border-hairline rounded-md p-6">
                <h3 className="text-sm font-bold text-ink mb-2">
                  Featured Pillar Guide
                </h3>
                <p className="text-xs text-ink-secondary leading-relaxed mb-4">
                  Read our in-depth editorial guide to discover how to handle irregular income,
                  high-cost-of-living adjustments, and debt payoff hierarchies.
                </p>
                <Link
                  href="/guide/50-30-20-budget-rule"
                  className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                >
                  <span>Read: The Complete 50/30/20 Budget Framework Guide</span>
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
            <Badge variant="sky" size="sm" className="mb-2">
              Connected Toolkit
            </Badge>
            <h2 className="text-xl sm:text-2xl font-extrabold text-ink tracking-tight">
              Explore More Free Financial Tools & Guides
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary mt-1">
              Complement your 50/30/20 budget with our leak auditor, savings projection tools, and operational frameworks.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
                  Calculate your true savings percentage, liquid emergency runway months, and 5-year compound investment growth.
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

            {/* Subscription Cost Calculator Card */}
            <div className="bg-surface border border-hairline hover:border-hairline-strong rounded-md p-5 flex flex-col justify-between transition-colors">
              <div>
                <Badge variant="warning" size="sm" className="mb-2">
                  Leak Detector
                </Badge>
                <h3 className="text-sm font-bold text-ink mb-1">
                  <Link href="/tools/subscription-cost-calculator" className="hover:text-primary transition-colors">
                    Recurring Subscription Cost Calculator
                  </Link>
                </h3>
                <p className="text-xs text-ink-secondary leading-relaxed mb-3">
                  Itemize recurring software, streaming, and membership charges to uncover hidden annual cash leaks and opportunity costs.
                </p>
              </div>
              <Link
                href="/tools/subscription-cost-calculator"
                className="text-xs font-semibold text-primary inline-flex items-center gap-1 hover:underline"
              >
                <span>Open Subscription Auditor</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </div>

          {/* Connected Pillar Guides */}
          <div className="bg-surface border border-hairline rounded-md p-6">
            <h3 className="text-sm font-bold text-ink mb-3">
              Essential Budgeting & Cash Flow Guides
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
                href="/guide/expense-categories"
                className="p-3 rounded-md bg-canvas border border-hairline hover:border-hairline-strong transition-colors block group"
              >
                <span className="text-[11px] font-semibold text-primary block mb-1">Taxonomy</span>
                <span className="text-xs font-bold text-ink group-hover:text-primary transition-colors block">
                  Standard Expense Categories Chart →
                </span>
              </Link>
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
              50/30/20 Budgeting FAQ
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary">
              Common questions on categorizing expenses and sticking to your budget.
            </p>
          </div>

          <FAQAccordion items={CALCULATOR_FAQS} />
        </Container>
      </section>

      {/* Bottom CTA */}
      <CTASection
        title="Stop Guessing Your Spending — Track It with Expenseliy"
        description="Experience frictionless expense and investment tracking with real-time variance diagnostics."
        badgeText="Start Tracking Free"
      />
    </div>
  );
}
