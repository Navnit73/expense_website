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
  PiggyBank,
  TrendingUp,
  ArrowRight,
  ShieldCheck,
  Zap,
  Sparkles,
  RotateCcw,
  CheckCircle2,
  Clock,
} from "lucide-react";

const SAVINGS_FAQS: FAQItem[] = [
  {
    question: "How is the personal savings rate calculated?",
    answer:
      "Your savings rate formula is: ((Net Monthly Income - Total Monthly Expenses) / Net Monthly Income) * 100. For example, if you earn $6,000 net and spend $4,200, your monthly savings is $1,800, which equals a 30% savings rate.",
  },
  {
    question: "What is a good personal savings rate?",
    answer:
      "A standard baseline is 15%–20%. A 25%–35% rate provides strong financial security and flexibility, while a 40%+ savings rate allows for accelerated wealth creation and potential early retirement (FIRE).",
  },
  {
    question: "How many months of emergency runway do I need?",
    answer:
      "Financial planners generally recommend 3 to 6 months of essential living expenses in an accessible high-yield savings account. Freelancers, contractors, and single-earner households often target 6 to 12 months.",
  },
  {
    question: "How does Expenseliy calculate my savings rate automatically?",
    answer:
      "Expenseliy calculates your exact net cash surplus and savings rate in real-time as you log income and expenses, tracking month-over-month variances without manual formula maintenance.",
  },
];

export default function SavingsRateCalculatorPage() {
  const [currency, setCurrency] = useState<string>("$");
  const [monthlyIncome, setMonthlyIncome] = useState<number>(6000);
  const [monthlyExpenses, setMonthlyExpenses] = useState<number>(4200);
  const [currentSavings, setCurrentSavings] = useState<number>(15000);
  const [annualReturnPct, setAnnualReturnPct] = useState<number>(7);

  const monthlySurplus = Math.max(0, monthlyIncome - monthlyExpenses);
  const annualSurplus = monthlySurplus * 12;
  const savingsRate = monthlyIncome > 0 ? (monthlySurplus / monthlyIncome) * 100 : 0;
  const emergencyRunwayMonths =
    monthlyExpenses > 0 ? currentSavings / monthlyExpenses : 0;

  // 5-Year Compound Projection with monthly compounding
  const calculate5YearFutureValue = () => {
    const monthlyRate = annualReturnPct / 100 / 12;
    const months = 60; // 5 years
    // FV = PV * (1+r)^n + PMT * [((1+r)^n - 1) / r]
    const futureFromPrincipal = currentSavings * Math.pow(1 + monthlyRate, months);
    const futureFromDeposits =
      monthlyRate > 0
        ? monthlySurplus * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate)
        : monthlySurplus * months;
    return futureFromPrincipal + futureFromDeposits;
  };

  const fiveYearValue = calculate5YearFutureValue();

  const getHealthBenchmark = (rate: number) => {
    if (rate >= 40) {
      return {
        label: "Exceptional (Accelerated Wealth Builder)",
        color: "text-income bg-income-bg border-income-border",
        desc: "You are retaining a massive portion of income, creating powerful compound wealth and rapid financial freedom.",
      };
    }
    if (rate >= 25) {
      return {
        label: "Very Strong (Disciplined Saver)",
        color: "text-primary bg-homepage-mintcream dark:bg-surface-raised border-primary/30",
        desc: "You exceed standard benchmarks and are building substantial long-term wealth and resilience.",
      };
    }
    if (rate >= 15) {
      return {
        label: "Healthy Baseline (Standard Goal)",
        color: "text-sky-600 bg-sky-50 dark:bg-sky-950/40 border-sky-300 dark:border-sky-800",
        desc: "You meet the standard financial benchmark. Look for optimization opportunities to reach 25%+.",
      };
    }
    if (rate > 0) {
      return {
        label: "Caution (Tight Cash Flow)",
        color: "text-warning bg-warning/10 border-warning/30",
        desc: "You have a modest surplus. Consider auditing recurring subscriptions and discretionary spending.",
      };
    }
    return {
      label: "Deficit Warning (Expenses Exceed Income)",
      color: "text-expense bg-expense/10 border-expense/30",
      desc: "Your expenses match or exceed monthly income. Immediate cost reduction is recommended.",
    };
  };

  const health = getHealthBenchmark(savingsRate);

  const handleReset = () => {
    setMonthlyIncome(6000);
    setMonthlyExpenses(4200);
    setCurrentSavings(15000);
    setAnnualReturnPct(7);
  };

  const webAppSchema = getWebApplicationSchema({
    name: "Savings Rate & Financial Runway Calculator",
    description:
      "Calculate your personal savings rate percentage, emergency cash runway, and 5-year compound wealth forecast instantly.",
    url: "/tools/savings-rate-calculator",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Savings Rate Calculator", url: "/tools/savings-rate-calculator" },
  ]);

  const faqSchema = getFAQSchema(SAVINGS_FAQS);

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
              { name: "Savings Rate Calculator", url: "/tools/savings-rate-calculator" },
            ]}
            className="mb-6"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-income-bg text-income border border-income-border text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <PiggyBank className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Wealth & Savings Metric</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4 leading-tight">
              Savings Rate & Financial Runway Calculator
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-4">
              Determine your exact percentage of retained income, months of emergency runway, and
              forecast your 5-year wealth trajectory with compound investment interest.
            </p>
          </div>
        </Container>
      </header>

      {/* Calculator Section */}
      <section className="py-10 sm:py-14 bg-canvas flex-1">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* Left Inputs Column */}
            <div className="lg:col-span-5 bg-surface border border-hairline rounded-md p-6 sm:p-8 space-y-6">
              <div className="flex items-center justify-between border-b border-hairline pb-4">
                <h2 className="text-base font-bold text-ink">Cash Flow Inputs</h2>
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-xs text-ink-muted hover:text-ink flex items-center gap-1 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Reset Defaults</span>
                </button>
              </div>

              {/* Currency Selection */}
              <div>
                <label className="block text-xs font-semibold uppercase tracking-wider text-ink font-mono mb-2">
                  Currency
                </label>
                <select
                  value={currency}
                  aria-label="Currency Selector"
                  onChange={(e) => setCurrency(e.target.value)}
                  className="w-full px-3 py-2 bg-canvas border border-hairline text-ink text-sm font-semibold rounded-md focus:border-primary focus:outline-none"
                >
                  <option value="$">$ USD (United States Dollar)</option>
                  <option value="€">€ EUR (Euro)</option>
                  <option value="£">£ GBP (British Pound)</option>
                  <option value="C$">C$ CAD (Canadian Dollar)</option>
                  <option value="A$">A$ AUD (Australian Dollar)</option>
                  <option value="₹">₹ INR (Indian Rupee)</option>
                </select>
              </div>

              {/* Monthly Income Input */}
              <div>
                <label
                  htmlFor="net-monthly-income"
                  className="block text-xs font-semibold uppercase tracking-wider text-income font-mono mb-1.5"
                >
                  Net Monthly Income (After Tax)
                </label>
                <div className="relative rounded-md border border-hairline bg-canvas focus-within:border-primary">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-ink-muted text-sm font-mono">
                    {currency}
                  </span>
                  <input
                    id="net-monthly-income"
                    type="number"
                    min="0"
                    step="100"
                    value={monthlyIncome || ""}
                    onChange={(e) => setMonthlyIncome(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2.5 bg-transparent text-ink text-base font-bold focus:outline-none"
                    placeholder="6000"
                  />
                </div>
              </div>

              {/* Monthly Expenses Input */}
              <div>
                <label
                  htmlFor="total-monthly-expenses"
                  className="block text-xs font-semibold uppercase tracking-wider text-expense font-mono mb-1.5"
                >
                  Total Monthly Expenses
                </label>
                <div className="relative rounded-md border border-hairline bg-canvas focus-within:border-primary">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-ink-muted text-sm font-mono">
                    {currency}
                  </span>
                  <input
                    id="total-monthly-expenses"
                    type="number"
                    min="0"
                    step="100"
                    value={monthlyExpenses || ""}
                    onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2.5 bg-transparent text-ink text-base font-bold focus:outline-none"
                    placeholder="4200"
                  />
                </div>
              </div>

              {/* Current Savings Balance */}
              <div>
                <label
                  htmlFor="liquid-savings-balance"
                  className="block text-xs font-semibold uppercase tracking-wider text-ink font-mono mb-1.5"
                >
                  Current Liquid Savings / Cash
                </label>
                <div className="relative rounded-md border border-hairline bg-canvas focus-within:border-primary">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-ink-muted text-sm font-mono">
                    {currency}
                  </span>
                  <input
                    id="liquid-savings-balance"
                    type="number"
                    min="0"
                    step="500"
                    value={currentSavings || ""}
                    onChange={(e) => setCurrentSavings(Number(e.target.value))}
                    className="w-full pl-8 pr-3 py-2.5 bg-transparent text-ink text-base font-bold focus:outline-none"
                    placeholder="15000"
                  />
                </div>
              </div>

              {/* Expected Annual Return */}
              <div>
                <div className="flex justify-between text-xs mb-1.5 font-mono">
                  <span className="text-ink-secondary">Expected Investment Return</span>
                  <span className="font-bold text-primary">{annualReturnPct}% / year</span>
                </div>
                <input
                  type="range"
                  min="0"
                  max="15"
                  step="0.5"
                  value={annualReturnPct}
                  onChange={(e) => setAnnualReturnPct(Number(e.target.value))}
                  className="w-full accent-primary cursor-pointer"
                />
              </div>
            </div>

            {/* Right Metrics & Health Rating Column */}
            <div className="lg:col-span-7 space-y-6">
              {/* Primary Savings Rate Score Card */}
              <div className="bg-surface border border-hairline-strong rounded-md p-6 sm:p-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 border-b border-hairline pb-6 mb-6">
                  <div>
                    <span className="text-xs font-mono text-ink-muted uppercase">Savings Rate</span>
                    <div className="text-3xl sm:text-4xl font-extrabold text-primary tracking-tight mt-0.5">
                      {savingsRate.toFixed(1)}%
                    </div>
                  </div>
                  <div>
                    <span className="text-xs font-mono text-ink-muted uppercase">
                      Monthly Surplus
                    </span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mt-0.5">
                      {currency}
                      {Math.round(monthlySurplus).toLocaleString()}
                    </div>
                    <span className="text-[11px] text-ink-muted">
                      {currency}
                      {Math.round(annualSurplus).toLocaleString()} / year
                    </span>
                  </div>
                  <div>
                    <span className="text-xs font-mono text-ink-muted uppercase">
                      Emergency Runway
                    </span>
                    <div className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mt-0.5">
                      {emergencyRunwayMonths.toFixed(1)} mo
                    </div>
                    <span className="text-[11px] text-ink-muted">at current expense rate</span>
                  </div>
                </div>

                {/* Benchmark Rating Callout */}
                <div className={`p-4 rounded-md border text-xs leading-relaxed mb-6 ${health.color}`}>
                  <div className="font-bold text-sm mb-1">{health.label}</div>
                  <p>{health.desc}</p>
                </div>

                {/* 5-Year Future Wealth Projection Box */}
                <div className="bg-canvas border border-hairline rounded-md p-5 mb-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-income" />
                      <span className="text-xs font-bold uppercase tracking-wider text-ink font-mono">
                        5-Year Wealth Forecast
                      </span>
                    </div>
                    <span className="text-xs font-mono text-income font-semibold">
                      @{annualReturnPct}% Ann. Return
                    </span>
                  </div>

                  <div className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-2">
                    {currency}
                    {Math.round(fiveYearValue).toLocaleString("en-US")}
                  </div>

                  <p className="text-xs text-ink-secondary leading-relaxed">
                    By saving <strong>{currency}{Math.round(monthlySurplus).toLocaleString()}/mo</strong> and compounding at {annualReturnPct}%, your portfolio expands from {currency}{currentSavings.toLocaleString()} to {currency}{Math.round(fiveYearValue).toLocaleString()} in 60 months.
                  </p>
                </div>

                {/* Integration CTA */}
                <div className="bg-surface-raised border border-hairline-strong rounded-md p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-1.5 text-xs font-bold text-ink">
                      <Sparkles className="w-4 h-4 text-primary" />
                      <span>Track real savings rate automatically</span>
                    </div>
                    <p className="text-xs text-ink-muted mt-0.5">
                      Expenseliy gives you algorithmic health scoring and multi-currency tracking with
                      zero complexity.
                    </p>
                  </div>
                  <Button
                    href="https://app.expenseliy.com/auth/signin"
                    variant="primary"
                    size="sm"
                    className="shrink-0 w-full sm:w-auto"
                    id="savings-calc-cta"
                  >
                    <span>Start Free (40 Tx)</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>

              {/* Related Guide */}
              <div className="bg-surface border border-hairline rounded-md p-6">
                <h3 className="text-sm font-bold text-ink mb-2">
                  Featured Pillar Guide
                </h3>
                <p className="text-xs text-ink-secondary leading-relaxed mb-4">
                  Discover how to calculate operational burn rate, identify spending volatility, and
                  increase your savings rate without extreme frugality.
                </p>
                <Link
                  href="/guide/cash-flow-management-guide"
                  className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1"
                >
                  <span>Read: Personal Cash Flow Management Guide</span>
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
            <Badge variant="income" size="sm" className="mb-2">
              Connected Toolkit
            </Badge>
            <h2 className="text-xl sm:text-2xl font-extrabold text-ink tracking-tight">
              Explore More Free Financial Tools & Guides
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary mt-1">
              Connect your savings metrics with percentage budget allocators and recurring expense leak detectors.
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
                  Allocate your net income into Needs (50%), Wants (30%), and Savings (20%) with interactive percentage sliders.
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
                  Audit your monthly subscriptions and compute how much more you could save and compound over 5 years.
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
              Essential Savings & Wealth Growth Guides
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              <Link
                href="/guide/50-30-20-budget-rule"
                className="p-3 rounded-md bg-canvas border border-hairline hover:border-hairline-strong transition-colors block group"
              >
                <span className="text-[11px] font-semibold text-primary block mb-1">Framework</span>
                <span className="text-xs font-bold text-ink group-hover:text-primary transition-colors block">
                  The 50/30/20 Budget Rule Guide →
                </span>
              </Link>
              <Link
                href="/guide/personal-expense-tracker-guide"
                className="p-3 rounded-md bg-canvas border border-hairline hover:border-hairline-strong transition-colors block group"
              >
                <span className="text-[11px] font-semibold text-primary block mb-1">Setup</span>
                <span className="text-xs font-bold text-ink group-hover:text-primary transition-colors block">
                  How to Track Personal Expenses Online →
                </span>
              </Link>
              <Link
                href="/guide/recurring-subscription-audit"
                className="p-3 rounded-md bg-canvas border border-hairline hover:border-hairline-strong transition-colors block group"
              >
                <span className="text-[11px] font-semibold text-primary block mb-1">Auditing</span>
                <span className="text-xs font-bold text-ink group-hover:text-primary transition-colors block">
                  How to Audit & Cancel Subscriptions →
                </span>
              </Link>
              <Link
                href="/guide/freelancer-expense-tracking"
                className="p-3 rounded-md bg-canvas border border-hairline hover:border-hairline-strong transition-colors block group"
              >
                <span className="text-[11px] font-semibold text-primary block mb-1">Self-Employed</span>
                <span className="text-xs font-bold text-ink group-hover:text-primary transition-colors block">
                  Freelance Deductions & Cash Flow →
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
              Savings Rate & Runway FAQ
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary">
              Understand benchmarks, compound savings growth, and cash flow optimization.
            </p>
          </div>

          <FAQAccordion items={SAVINGS_FAQS} />
        </Container>
      </section>

      {/* Bottom CTA */}
      <CTASection
        title="Automate Your Savings Rate Diagnostics in Expenseliy"
        description="Monitor income, expenses, and investments in one unified private ledger."
        badgeText="Get Started Free"
      />
    </div>
  );
}
