import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { Button } from "@/components/marketing/Button";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { createPageMetadata, getBreadcrumbSchema, getFAQSchema } from "@/lib/seo";
import {
  Calculator,
  PieChart,
  PiggyBank,
  RefreshCw,
  ArrowRight,
  Sparkles,
  ShieldCheck,
  Zap,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Free Online Financial Calculators & Budgeting Tools (2026)",
  description:
    "Free, instant personal finance calculators with zero registration. Use our 50/30/20 budget planner, savings rate calculator, and subscription audit tool.",
  path: "/tools",
  keywords: [
    "free budget calculator",
    "50 30 20 calculator online",
    "savings rate calculator",
    "subscription audit tool",
    "personal finance calculators",
    "household budget tools",
  ],
});

const TOOLS_LIST = [
  {
    id: "50-30-20-budget-calculator",
    title: "50/30/20 Budget Calculator",
    badge: "Most Popular",
    badgeVariant: "income" as const,
    description:
      "Split your take-home income into Needs (50%), Wants (30%), and Savings/Investments (20%). Includes custom percentage sliders and category allocations.",
    href: "/tools/50-30-20-budget-calculator",
    icon: PieChart,
    features: [
      "Monthly, annual & bi-weekly inputs",
      "Customizable percentage split",
      "Itemized category breakdown",
      "Zero registration required",
    ],
  },
  {
    id: "savings-rate-calculator",
    title: "Savings Rate & Financial Runway Calculator",
    badge: "Wealth Benchmark",
    badgeVariant: "sky" as const,
    description:
      "Calculate your exact monthly savings percentage, annual cash surplus, and months of emergency runway based on your fixed living expenses.",
    href: "/tools/savings-rate-calculator",
    icon: PiggyBank,
    features: [
      "Savings rate benchmark health score",
      "Emergency runway duration calculation",
      "5-Year compound savings forecast",
      "Actionable recommendations",
    ],
  },
  {
    id: "subscription-cost-calculator",
    title: "Subscription Cost & Recurring Leak Auditor",
    badge: "Cost Optimization",
    badgeVariant: "warning" as const,
    description:
      "Audit your streaming services, software subscriptions, gym dues, and recurring memberships. Calculate annual drain and compound opportunity cost.",
    href: "/tools/subscription-cost-calculator",
    icon: RefreshCw,
    features: [
      "Multi-subscription aggregator",
      "Annual & 5-year total drain calculation",
      "Investment opportunity cost at 8% S&P 500",
      "Subscription audit checklist",
    ],
  },
];

const TOOLS_FAQS: FAQItem[] = [
  {
    question: "Are these financial calculators completely free to use?",
    answer:
      "Yes, 100% free with no account creation, email capture, or payment required. All calculations run client-side in your web browser for complete privacy.",
  },
  {
    question: "How does the 50/30/20 budget calculator work?",
    answer:
      "Enter your net (after-tax) take-home pay. The tool automatically allocates 50% toward essential needs (housing, utilities, groceries), 30% toward discretionary wants (dining out, entertainment), and 20% toward savings and debt reduction.",
  },
  {
    question: "What is a healthy savings rate to aim for?",
    answer:
      "A standard baseline is 20% of net income. High-savings rate benchmarks (e.g., for early retirement or rapid debt payoff) aim for 30% to 50%+. Use our Savings Rate Calculator to assess your current benchmark score.",
  },
  {
    question: "Can I track these budgets automatically in Expenseliy?",
    answer:
      "Yes. Once you calculate your target budgets and category distributions, you can log in to Expenseliy and track your real-time expenses against these targets with 40 free lifetime transactions.",
  },
];

export default function ToolsIndexPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
  ]);
  const faqSchema = getFAQSchema(TOOLS_FAQS);

  return (
    <div className="flex flex-col flex-1">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <header className="bg-surface border-b border-hairline py-12 sm:py-16">
        <Container size="default">
          <Breadcrumbs items={[{ name: "Tools", url: "/tools" }]} className="mb-6" />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-income-bg text-income border border-income-border text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <Calculator className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Free Financial Web Tools</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4 leading-tight">
              Instant, Client-Side Financial Calculators
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-6">
              Empower your budgeting, cash flow planning, and cost reduction with our free online
              calculators. Zero signup required, completely private.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>100% Private (Runs In Browser)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-primary" />
                <span>Instant Calculations</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Always Free</span>
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* Tools Grid */}
      <section className="py-12 sm:py-16 bg-canvas flex-1">
        <Container size="default">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TOOLS_LIST.map((tool) => {
              const Icon = tool.icon;
              return (
                <div
                  key={tool.id}
                  className="bg-surface border border-hairline hover:border-hairline-strong rounded-md p-6 sm:p-8 flex flex-col justify-between transition-colors group"
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 mb-4">
                      <div className="w-12 h-12 rounded-md bg-homepage-mintcream dark:bg-surface-raised border border-hairline flex items-center justify-center text-primary shrink-0">
                        <Icon className="w-6 h-6" aria-hidden="true" />
                      </div>
                      <Badge variant={tool.badgeVariant} size="sm">
                        {tool.badge}
                      </Badge>
                    </div>

                    <h2 className="text-xl font-bold text-ink group-hover:text-primary transition-colors mb-3">
                      {tool.title}
                    </h2>

                    <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed mb-6">
                      {tool.description}
                    </p>

                    <ul className="space-y-2 border-t border-hairline pt-4 mb-6">
                      {tool.features.map((feat, fIdx) => (
                        <li key={fIdx} className="text-xs text-ink-muted flex items-center gap-2">
                          <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0" />
                          <span>{feat}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Button href={tool.href} variant="primary" size="md" className="w-full justify-center">
                    <span>Open Calculator</span>
                    <ArrowRight className="w-4 h-4" aria-hidden="true" />
                  </Button>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Popular Guides & Frameworks */}
      <section className="py-14 bg-surface border-t border-hairline">
        <Container size="default">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <Badge variant="sky" size="sm" className="mb-2">
                Knowledge Base
              </Badge>
              <h2 className="text-xl sm:text-2xl font-extrabold text-ink tracking-tight">
                Recommended Financial Guides & Frameworks
              </h2>
              <p className="text-xs sm:text-sm text-ink-secondary mt-1">
                Explore in-depth editorial breakdowns to implement what you calculate.
              </p>
            </div>
            <Link
              href="/guide"
              className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1 shrink-0"
            >
              <span>View All 11 Guides</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Link
              href="/guide/50-30-20-budget-rule"
              className="p-5 rounded-md bg-canvas border border-hairline hover:border-hairline-strong transition-colors block group"
            >
              <span className="text-[10px] font-mono font-bold uppercase text-income block mb-1">
                Budgeting
              </span>
              <h3 className="text-sm font-bold text-ink group-hover:text-primary transition-colors mb-2">
                The 50/30/20 Budget Rule: The Complete Guide
              </h3>
              <p className="text-xs text-ink-secondary leading-relaxed line-clamp-2">
                Learn how to apply percentage budgeting in high-cost cities and buffer irregular income.
              </p>
            </Link>

            <Link
              href="/guide/cash-flow-management-guide"
              className="p-5 rounded-md bg-canvas border border-hairline hover:border-hairline-strong transition-colors block group"
            >
              <span className="text-[10px] font-mono font-bold uppercase text-sky block mb-1">
                Analytics
              </span>
              <h3 className="text-sm font-bold text-ink group-hover:text-primary transition-colors mb-2">
                Personal Cash Flow Management & Runway
              </h3>
              <p className="text-xs text-ink-secondary leading-relaxed line-clamp-2">
                Calculate net monthly surplus, determine your burn rate, and build emergency cash reserves.
              </p>
            </Link>

            <Link
              href="/guide/recurring-subscription-audit"
              className="p-5 rounded-md bg-canvas border border-hairline hover:border-hairline-strong transition-colors block group"
            >
              <span className="text-[10px] font-mono font-bold uppercase text-warning block mb-1">
                Cost Control
              </span>
              <h3 className="text-sm font-bold text-ink group-hover:text-primary transition-colors mb-2">
                30-Minute Subscription Audit Checklist
              </h3>
              <p className="text-xs text-ink-secondary leading-relaxed line-clamp-2">
                Identify forgotten trials, negotiate recurring bills, and calculate 5-year opportunity costs.
              </p>
            </Link>

            <Link
              href="/guide/expense-categories"
              className="p-5 rounded-md bg-canvas border border-hairline hover:border-hairline-strong transition-colors block group"
            >
              <span className="text-[10px] font-mono font-bold uppercase text-primary block mb-1">
                Taxonomy
              </span>
              <h3 className="text-sm font-bold text-ink group-hover:text-primary transition-colors mb-2">
                Standard Expense Categories Chart of Accounts
              </h3>
              <p className="text-xs text-ink-secondary leading-relaxed line-clamp-2">
                Organize personal living costs and business overhead with standardized groupings.
              </p>
            </Link>

            <Link
              href="/guide/household-bill-tracker"
              className="p-5 rounded-md bg-canvas border border-hairline hover:border-hairline-strong transition-colors block group"
            >
              <span className="text-[10px] font-mono font-bold uppercase text-income block mb-1">
                Household
              </span>
              <h3 className="text-sm font-bold text-ink group-hover:text-primary transition-colors mb-2">
                Household Bill Tracker System for Couples
              </h3>
              <p className="text-xs text-ink-secondary leading-relaxed line-clamp-2">
                Choose between proportional, 50/50, and pooled frameworks to manage shared bills.
              </p>
            </Link>

            <Link
              href="/guide/freelancer-expense-tracking"
              className="p-5 rounded-md bg-canvas border border-hairline hover:border-hairline-strong transition-colors block group"
            >
              <span className="text-[10px] font-mono font-bold uppercase text-primary block mb-1">
                Tax Strategy
              </span>
              <h3 className="text-sm font-bold text-ink group-hover:text-primary transition-colors mb-2">
                Freelance Expense Tracking & 1099 Deductions
              </h3>
              <p className="text-xs text-ink-secondary leading-relaxed line-clamp-2">
                Never miss legitimate write-offs, track client reimbursables, and reserve quarterly taxes.
              </p>
            </Link>
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <section className="py-14 sm:py-20 bg-canvas border-t border-hairline">
        <Container size="narrow">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Badge variant="neutral" size="sm" className="mb-3">
              FAQ
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary">
              Common questions regarding our free financial calculators and methodologies.
            </p>
          </div>

          <FAQAccordion items={TOOLS_FAQS} />
        </Container>
      </section>

      {/* Bottom CTA */}
      <CTASection
        title="Track Your Budget with Real-Time Accuracy in Expenseliy"
        description="Take your budget numbers and track them seamlessly with automated category charts and 40 free lifetime transactions."
        badgeText="Start Tracking Free"
      />
    </div>
  );
}
