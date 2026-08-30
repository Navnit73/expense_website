import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { Button } from "@/components/marketing/Button";
import { CTASection } from "@/components/marketing/CTASection";
import { createPageMetadata } from "@/lib/seo";
import {
  UserCheck,
  PlusCircle,
  BarChart3,
  BrainCircuit,
  FileSpreadsheet,
  ArrowRight,
  CheckCircle2,
  Calculator,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "How Expenseliy Works — Step-by-Step Guide",
  description:
    "Learn the complete workflow of Expenseliy: from setting up your account and logging multi-asset transactions to automated analytics, AI health insights, and CSV exports.",
  path: "/how-it-works",
  keywords: [
    "how to track expenses",
    "expense tracking workflow",
    "personal finance setup",
    "household bill workflow",
    "financial management steps",
  ],
});

const WORKFLOW_STEPS = [
  {
    step: "01",
    title: "Account Setup & Workspace Provisioning",
    subtitle: "Under 60 seconds • No credit card required",
    description:
      "When you register, Expenseliy automatically initializes a private, securely isolated database tenant for your transactions. Default standard categories (Housing, Food, Software, Transport, Utilities, etc.) are preloaded so you can begin immediately.",
    highlights: [
      "Zero invasive third-party bank linking requirements",
      "Immediate category customization",
      "Default currency selection",
    ],
    icon: UserCheck,
  },
  {
    step: "02",
    title: "Log Multi-Asset Transactions",
    subtitle: "Expenses, Income & Investments in 5-second entries",
    description:
      "Record your daily financial events effortlessly. Whether you paid for a software license, received client consulting funds, or invested in an S&P 500 index fund, each entry records the exact amount, merchant, category, payment method, date, and custom tags.",
    highlights: [
      "Tag transactions by client, project, or `#recurring` status",
      "Support for global currencies",
      "Instant category autocompletion",
    ],
    icon: PlusCircle,
  },
  {
    step: "03",
    title: "Automated Real-Time Analytics",
    subtitle: "Visual charts, distribution bars & trend lines",
    description:
      "As soon as transactions are logged, Expenseliy's analytics engine plots your income vs expense trends, category distribution ratios, top spending merchants, and monthly savings rate. No manual spreadsheet formulas required.",
    highlights: [
      "Month-over-Month variance analysis",
      "Interactive category drilldowns",
      "Savings rate benchmark calculations",
    ],
    icon: BarChart3,
  },
  {
    step: "04",
    title: "Algorithmic Health Score & AI Insights",
    subtitle: "Anomaly detection and pattern recognition",
    description:
      "Expenseliy evaluates your financial consistency and assigns a benchmark Financial Health Score. Our informational AI engine highlights spending anomalies, detects duplicate or zombie subscriptions, and provides plain-English summaries of your monthly progress.",
    highlights: [
      "Recurring charge detection to eliminate silent subscription creeps",
      "Spending spike alerts by category",
      "Privacy-first processing with zero data resale",
    ],
    icon: BrainCircuit,
  },
  {
    step: "05",
    title: "Export Clean CSVs & Printable Reports",
    subtitle: "Audit-ready records for CPAs, taxes & archiving",
    description:
      "When tax season arrives or you need reimbursement from a client, generate clean itemized CSV exports or print-ready reports with a single click. Your records remain structured and portable at all times.",
    highlights: [
      "One-click raw CSV data download",
      "Formatted printable expense statements",
      "Total data portability and self-serve deletion",
    ],
    icon: FileSpreadsheet,
  },
];

export default function HowItWorksPage() {
  return (
    <div className="flex flex-col flex-1">
      {/* Header */}
      <header className="bg-surface border-b border-hairline py-12 sm:py-16">
        <Container size="default">
          <Breadcrumbs items={[{ name: "How It Works", url: "/how-it-works" }]} className="mb-6" />

          <div className="max-w-3xl">
            <Badge variant="sky" size="sm" className="mb-4">
              Architecture & Workflow
            </Badge>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4">
              A Complete Workflow Built for Speed, Insight, and Control
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-6">
              See how Expenseliy takes you from simple daily transaction logging to automated cash
              flow intelligence and audit-ready reporting.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button href="https://app.expenseliy.com/auth/signin" variant="primary" size="md">
                <span>Start Free (40 Transactions)</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Button>
              <Button href="/features" variant="secondary" size="md">
                Explore All Features
              </Button>
            </div>
          </div>
        </Container>
      </header>

      {/* Workflow Steps Section */}
      <div className="py-12 sm:py-16 bg-canvas">
        <Container size="default">
          <div className="flex flex-col gap-12 max-w-4xl mx-auto">
            {WORKFLOW_STEPS.map((step) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.step}
                  className="bg-surface border border-hairline-strong rounded-md p-6 sm:p-10 flex flex-col md:flex-row gap-6 sm:gap-8 items-start relative"
                >
                  <div className="flex flex-col items-center shrink-0">
                    <div className="w-12 h-12 rounded-md bg-homepage-mintcream dark:bg-surface-raised border border-hairline flex items-center justify-center text-primary font-bold text-lg font-mono">
                      {step.step}
                    </div>
                  </div>

                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <Icon className="w-4 h-4 text-primary" aria-hidden="true" />
                      <span className="text-xs font-mono text-ink-muted uppercase tracking-wider">
                        {step.subtitle}
                      </span>
                    </div>

                    <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight mb-3">
                      {step.title}
                    </h2>

                    <p className="text-sm sm:text-base text-ink-secondary leading-relaxed mb-6">
                      {step.description}
                    </p>

                    <div className="border-t border-hairline pt-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
                      {step.highlights.map((highlight, hIdx) => (
                        <div key={hIdx} className="flex items-center gap-2 text-xs text-ink-muted">
                          <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" />
                          <span>{highlight}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </div>

      {/* Free Interactive Tools & Guides Section */}
      <section className="py-14 bg-surface border-t border-hairline">
        <Container size="default">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-8">
            <div>
              <Badge variant="income" size="sm" className="mb-2">
                <Calculator className="w-3.5 h-3.5 mr-1" />
                <span>Interactive Calculators & Resources</span>
              </Badge>
              <h2 className="text-xl sm:text-2xl font-extrabold text-ink tracking-tight">
                Plan Your Budget Before You Sign Up
              </h2>
              <p className="text-xs sm:text-sm text-ink-secondary mt-1">
                Explore our free client-side calculators and in-depth financial strategy guides.
              </p>
            </div>
            <Link
              href="/tools"
              className="text-xs font-semibold text-primary hover:underline inline-flex items-center gap-1 shrink-0"
            >
              <span>Explore All Tools</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <Link
              href="/tools/50-30-20-budget-calculator"
              className="p-5 rounded-md bg-canvas border border-hairline hover:border-hairline-strong transition-colors block group"
            >
              <span className="text-[10px] font-mono font-bold uppercase text-income block mb-1">
                Calculator
              </span>
              <h3 className="text-sm font-bold text-ink group-hover:text-primary transition-colors mb-1">
                50/30/20 Budget Allocator
              </h3>
              <p className="text-xs text-ink-secondary leading-relaxed line-clamp-2 mb-3">
                Split net pay into Needs, Wants, and Savings with custom percentage sliders.
              </p>
              <span className="text-xs font-semibold text-primary inline-flex items-center gap-1">
                <span>Launch Tool</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </Link>

            <Link
              href="/tools/savings-rate-calculator"
              className="p-5 rounded-md bg-canvas border border-hairline hover:border-hairline-strong transition-colors block group"
            >
              <span className="text-[10px] font-mono font-bold uppercase text-sky block mb-1">
                Calculator
              </span>
              <h3 className="text-sm font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Savings Rate & Runway
              </h3>
              <p className="text-xs text-ink-secondary leading-relaxed line-clamp-2 mb-3">
                Calculate emergency fund duration and 5-year compound growth projections.
              </p>
              <span className="text-xs font-semibold text-primary inline-flex items-center gap-1">
                <span>Launch Tool</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </Link>

            <Link
              href="/guide/personal-expense-tracker-guide"
              className="p-5 rounded-md bg-canvas border border-hairline hover:border-hairline-strong transition-colors block group"
            >
              <span className="text-[10px] font-mono font-bold uppercase text-primary block mb-1">
                Pillar Guide
              </span>
              <h3 className="text-sm font-bold text-ink group-hover:text-primary transition-colors mb-1">
                How to Track Expenses Online
              </h3>
              <p className="text-xs text-ink-secondary leading-relaxed line-clamp-2 mb-3">
                The complete step-by-step setup framework for error-free cash flow tracking.
              </p>
              <span className="text-xs font-semibold text-primary inline-flex items-center gap-1">
                <span>Read Guide</span>
                <ArrowRight className="w-3 h-3" />
              </span>
            </Link>
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <CTASection
        title="Ready to Build a Streamlined Financial Routine?"
        description="Create your free Expenseliy account now and experience intuitive cash flow management."
        badgeText="Get Started Free"
      />
    </div>
  );
}
