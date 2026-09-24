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
  Wand2,
  AlertTriangle,
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
  {
    question: "What should I do if I have credit card or student loan debt?",
    answer:
      "Minimum required payments on any debt count as a Need, since missing them damages your credit and can trigger fees. Extra, above-minimum payments toward paying off debt faster belong in the 20% Savings & Debt category alongside investing.",
  },
  {
    question: "Is the 50/30/20 rule good for irregular or freelance income?",
    answer:
      "Yes, with one adjustment: calculate your percentages against your lowest-earning month or a 3-month rolling average rather than your best month, then treat surplus income in higher-earning months as extra Savings & Debt payoff.",
  },
];

const PRESETS = [
  { id: "standard", label: "Standard", needs: 50, wants: 30, savings: 20 },
  { id: "hcol", label: "High Cost of Living", needs: 60, wants: 20, savings: 20 },
  { id: "aggressive", label: "Aggressive Saver", needs: 50, wants: 20, savings: 30 },
  { id: "debtfocus", label: "Debt Payoff Focus", needs: 55, wants: 15, savings: 30 },
];

export default function BudgetCalculatorPage() {
  const [income, setIncome] = useState<number>(5000);
  const [frequency, setFrequency] = useState<"monthly" | "annual" | "biweekly">("monthly");
  const [currency, setCurrency] = useState<string>("$");
  const [needsPct, setNeedsPct] = useState<number>(50);
  const [wantsPct, setWantsPct] = useState<number>(30);
  const [savingsPct, setSavingsPct] = useState<number>(20);
  const [copied, setCopied] = useState<boolean>(false);
  const [activePreset, setActivePreset] = useState<string>("standard");

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

  const total = needsPct + wantsPct + savingsPct;
  const isBalanced = total === 100;

  const applyPreset = (preset: (typeof PRESETS)[number]) => {
    setNeedsPct(preset.needs);
    setWantsPct(preset.wants);
    setSavingsPct(preset.savings);
    setActivePreset(preset.id);
  };

  const handleReset = () => {
    applyPreset(PRESETS[0]);
    setIncome(5000);
    setFrequency("monthly");
  };

  // Rescale all three sliders proportionally so they always sum to exactly 100%
  const handleAutoBalance = () => {
    if (total === 0) {
      applyPreset(PRESETS[0]);
      return;
    }
    const scale = 100 / total;
    const n = Math.round(needsPct * scale);
    const w = Math.round(wantsPct * scale);
    const s = 100 - n - w; // absorb rounding drift in the last category
    setNeedsPct(n);
    setWantsPct(w);
    setSavingsPct(s);
    setActivePreset("custom");
  };

  const updateSlider = (
    setter: React.Dispatch<React.SetStateAction<number>>,
    value: number
  ) => {
    setter(value);
    setActivePreset("custom");
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
              Enter your take-home pay, pick a starting split (or build your own), and see
              exactly how much to put toward Needs, Wants, and Savings every month — no
              spreadsheet required.
            </p>

            <ul className="flex flex-wrap gap-x-6 gap-y-2 text-xs text-ink-muted">
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-income" /> Free, no sign-up
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-income" /> Works with any currency
              </li>
              <li className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-income" /> Monthly, bi-weekly & annual pay
              </li>
            </ul>
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
                  <span>Reset</span>
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
                <p className="text-[11px] text-ink-muted mt-1.5">
                  Use your after-tax pay — the amount actually deposited to your bank account.
                </p>
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

              {/* Quick Presets */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink font-mono mb-2">
                  Quick Presets
                </label>
                <div className="flex flex-wrap gap-2">
                  {PRESETS.map((preset) => (
                    <button
                      key={preset.id}
                      type="button"
                      onClick={() => applyPreset(preset)}
                      className={`py-1.5 px-3 text-[11px] font-semibold rounded-full border transition-colors ${
                        activePreset === preset.id
                          ? "bg-ink text-white border-ink"
                          : "bg-canvas border-hairline text-ink-secondary hover:border-hairline-strong"
                      }`}
                    >
                      {preset.label} ({preset.needs}/{preset.wants}/{preset.savings})
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
                  <span
                    className={`text-xs font-semibold ${
                      isBalanced ? "text-ink-muted" : "text-warning"
                    }`}
                  >
                    Total: {total}%
                  </span>
                </div>

                {!isBalanced && (
                  <div className="flex items-center justify-between gap-3 bg-warning/10 border border-warning/30 rounded-md px-3 py-2">
                    <span className="text-[11px] text-ink-secondary flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5 text-warning shrink-0" />
                      Your ratios don't add up to 100%.
                    </span>
                    <button
                      type="button"
                      onClick={handleAutoBalance}
                      className="text-[11px] font-semibold text-primary hover:underline flex items-center gap-1 shrink-0"
                    >
                      <Wand2 className="w-3 h-3" /> Auto-balance
                    </button>
                  </div>
                )}

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
                    onChange={(e) => updateSlider(setNeedsPct, Number(e.target.value))}
                    aria-label="Needs percentage"
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
                    onChange={(e) => updateSlider(setWantsPct, Number(e.target.value))}
                    aria-label="Wants percentage"
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
                    onChange={(e) => updateSlider(setSavingsPct, Number(e.target.value))}
                    aria-label="Savings and debt percentage"
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
                      style={{ width: `${Math.min(needsPct, 100)}%` }}
                      className="bg-expense transition-all duration-300"
                      title={`Needs: ${needsPct}%`}
                    />
                    <div
                      style={{ width: `${Math.min(wantsPct, 100 - needsPct)}%` }}
                      className="bg-warning transition-all duration-300"
                      title={`Wants: ${wantsPct}%`}
                    />
                    <div
                      style={{
                        width: `${Math.max(0, Math.min(savingsPct, 100 - needsPct - wantsPct))}%`,
                      }}
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

      {/* Long-Form SEO Content */}
      <section className="py-14 sm:py-20 bg-surface border-t border-hairline">
        <Container size="narrow">
          <div className="max-w-3xl mx-auto">
            <Badge variant="neutral" size="sm" className="mb-3">
              Guide
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-6">
              Understanding the 50/30/20 Budget Rule: A Complete Guide
            </h2>

            <div className="space-y-5 text-sm sm:text-base text-ink-secondary leading-relaxed">
              <p>
                Managing money well doesn't require a finance degree or a complicated
                spreadsheet — it requires a framework simple enough to actually follow. That's
                exactly what the 50/30/20 rule offers. Instead of tracking every category down to
                the last dollar, it groups your entire financial life into three buckets: Needs,
                Wants, and Savings. Once you know your after-tax income, the calculator above does
                the arithmetic instantly, but understanding the reasoning behind each number helps
                you apply the rule intelligently rather than mechanically.
              </p>

              <h3 className="text-lg font-bold text-ink pt-2">
                Where the 50/30/20 Rule Came From
              </h3>
              <p>
                The framework was popularized by Senator Elizabeth Warren and her daughter Amelia
                Warren Tyagi in their book "All Your Worth: The Ultimate Lifetime Money Plan."
                Their goal wasn't to create another restrictive budgeting system — it was the
                opposite. They wanted a rule flexible enough that people wouldn't abandon it after
                a few weeks, while still building in enough structure to prevent overspending and
                under-saving. Two decades later, it remains one of the most recommended
                starting points for anyone building their first real budget.
              </p>

              <h3 className="text-lg font-bold text-ink pt-2">How the Calculation Works</h3>
              <p>
                The math itself is straightforward. Take your net income — what actually lands in
                your bank account after taxes, health insurance premiums, and retirement
                contributions taken out of your paycheck — and split it three ways: 50% toward
                Needs, 30% toward Wants, and 20% toward Savings and debt payoff. The calculator
                above automatically converts bi-weekly or annual pay into a monthly baseline, since
                thinking in monthly terms makes it far easier to compare against monthly bills like
                rent and utilities.
              </p>

              <h3 className="text-lg font-bold text-ink pt-2">
                Needs: The Non-Negotiable 50%
              </h3>
              <p>
                Needs are the expenses you can't skip without real consequences: housing payments,
                utilities, groceries, insurance, minimum debt payments, and basic transportation.
                A helpful test is to ask, "Would I face a serious problem — eviction, a lapsed
                policy, a damaged credit score — if I stopped paying this?" If the answer is yes,
                it's a Need. If you could downgrade or cancel it without real harm, it belongs in
                Wants instead, even if it feels essential day to day.
              </p>

              <h3 className="text-lg font-bold text-ink pt-2">
                Wants: The Flexible 30%
              </h3>
              <p>
                Wants cover everything that improves your quality of life but isn't strictly
                required: dining out, streaming subscriptions, travel, hobbies, and upgraded
                versions of things you could buy cheaper. This category is intentionally generous
                — 30% is meant to prevent the burnout that comes from an overly austere budget.
                Cutting Wants to zero rarely lasts; giving yourself permission to spend on things
                you enjoy, within a defined limit, is what makes the rule sustainable long-term.
              </p>

              <h3 className="text-lg font-bold text-ink pt-2">
                Savings & Debt: The Future-Focused 20%
              </h3>
              <p>
                The final 20% is where your financial security is built: an emergency fund,
                retirement contributions, index fund investing, and any extra payments beyond the
                minimum on credit cards, student loans, or other debt. If you're currently carrying
                high-interest debt, prioritize paying that down aggressively within this bucket
                before building a large investment portfolio — the guaranteed "return" of avoiding
                18%+ interest usually beats market returns.
              </p>

              <h3 className="text-lg font-bold text-ink pt-2">
                Adjusting the Ratios for Your Situation
              </h3>
              <p>
                The 50/30/20 split is a starting point, not a law of physics. If you live in a
                high-cost city, housing alone might consume 45% of your income before you've paid
                for anything else — in that case, a temporary 60/20/20 or even 65/15/20 split is
                more realistic than forcing an unworkable target. Conversely, high earners or
                people with unusually low fixed costs often push savings up to 30% or 40%, since
                the goal of the framework is long-term financial health, not rigid adherence to
                specific numbers. Use the presets in the calculator above as a faster way to try
                these common variations before fine-tuning with the sliders.
              </p>

              <h3 className="text-lg font-bold text-ink pt-2">
                Applying the Rule Step by Step
              </h3>
              <p>
                Start by calculating your true net monthly income, including any side income you
                receive regularly. Next, list your actual fixed Needs and compare that total
                against your 50% target — this single comparison often reveals whether housing or
                transportation costs are quietly eating into money that should be going toward
                savings. Then set a realistic Wants budget you can stick to, ideally by moving that
                amount into a separate account or card at the start of each month. Finally,
                automate your Savings & Debt category so it's transferred out before you have the
                chance to spend it — automation is consistently the difference between people who
                save consistently and people who intend to.
              </p>

              <h3 className="text-lg font-bold text-ink pt-2">
                Common Mistakes to Avoid
              </h3>
              <p>
                The most frequent error is budgeting against gross income instead of net, which
                inflates every category and sets unrealistic expectations. A close second is
                miscategorizing Wants as Needs — a premium phone plan or a car payment on a vehicle
                nicer than necessary often masquerades as essential spending when it's really a
                lifestyle choice. Finally, many people set their percentages once and never revisit
                them; a raise, a move, or a new dependent should always trigger a quick
                recalculation.
              </p>

              <h3 className="text-lg font-bold text-ink pt-2">
                How It Compares to Other Budgeting Methods
              </h3>
              <p>
                Zero-based budgeting assigns every single dollar a specific job and demands
                monthly line-item tracking — more precise, but far more time-consuming. The
                envelope system physically or virtually separates cash into spending categories,
                which works well for people prone to overspending but can feel restrictive.
                Pay-yourself-first budgeting focuses purely on automating savings before anything
                else, without prescribing how the remainder is spent. The 50/30/20 rule sits in the
                middle: structured enough to build good habits, simple enough that most people
                actually keep using it after the first month.
              </p>

              <h3 className="text-lg font-bold text-ink pt-2">Making the Budget Stick</h3>
              <p>
                A budget only works if you can see how you're actually doing against it. Once
                you've settled on your target percentages using the calculator above, the next
                step is tracking real transactions against those categories throughout the month.
                Tools like Expenseliy let you log expenses in seconds and automatically tag them
                as Needs, Wants, or Savings, so you can spot in real time whether you're on pace —
                rather than discovering a problem when your bank balance runs low at the end of the
                month.
              </p>
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