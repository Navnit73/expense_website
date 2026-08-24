import type { Metadata } from "next";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { Button } from "@/components/marketing/Button";
import { CTASection } from "@/components/marketing/CTASection";
import { createPageMetadata } from "@/lib/seo";
import {
  Receipt,
  TrendingUp,
  Layers,
  LayoutDashboard,
  PieChart,
  BarChart3,
  LineChart,
  FolderPlus,
  HeartPulse,
  RefreshCw,
  CalendarRange,
  BrainCircuit,
  Sparkles,
  AlertTriangle,
  TrendingDown,
  Download,
  Printer,
  Globe2,
  Moon,
  Trash2,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Complete Features & Capabilities",
  description:
    "Explore Expenseliy's full feature suite: multi-asset tracking (expenses, income, investments), AI financial insights, recurring expense detection, CSV exports, and privacy-first data isolation.",
  path: "/features",
  keywords: [
    "expense tracking features",
    "income tracker software",
    "investment portfolio tracking",
    "financial health score",
    "recurring expense detector",
    "ai financial insights",
    "csv expense export",
    "multi-currency expense tracker",
  ],
});

const FEATURE_GROUPS = [
  {
    category: "Multi-Asset Transaction Management",
    description: "Record, filter, and organize every financial event with speed and granular detail.",
    items: [
      {
        icon: Receipt,
        title: "Expense Tracking",
        description:
          "Log expenses in under 5 seconds. Capture transaction amount, category, merchant or payee, payment method, exact date, custom tags, and notes.",
      },
      {
        icon: TrendingUp,
        title: "Income Tracking",
        description:
          "Track recurring payroll salaries, variable freelance invoices, client retainers, dividends, rental cash flow, and side-hustle revenue in a unified inflow ledger.",
      },
      {
        icon: Layers,
        title: "Investment Tracking",
        description:
          "Monitor capital allocation across stocks, ETFs, mutual funds, cryptocurrency, gold/precious metals, and real estate alongside your operational cash flow.",
      },
      {
        icon: FolderPlus,
        title: "Custom Category Management",
        description:
          "Create, rename, and organize custom categories with tailored color badges to match your personal budgeting framework or business chart of accounts.",
      },
    ],
  },
  {
    category: "Analytics & Financial Intelligence",
    description: "Transform raw transactions into visual trends, benchmark ratios, and cash flow clarity.",
    items: [
      {
        icon: LayoutDashboard,
        title: "Unified Financial Dashboard",
        description:
          "High-level executive summary displaying net cash balance, total monthly income, total expenses, savings rate, and recent activity at a single glance.",
      },
      {
        icon: PieChart,
        title: "Expense Analytics & Distribution",
        description:
          "Visual breakdown of spending across categories, highlighting your largest cost drivers and budget concentrations.",
      },
      {
        icon: BarChart3,
        title: "Income Analytics & Sources",
        description:
          "Analyze revenue composition over time to identify seasonal fluctuations, client concentration, and growth trajectory.",
      },
      {
        icon: LineChart,
        title: "Investment Growth & Allocation",
        description:
          "Monitor how much monthly cash surplus is successfully converted into wealth-building asset classes.",
      },
      {
        icon: HeartPulse,
        title: "Financial Health Score",
        description:
          "Algorithmic score benchmarking your cash reserve buffer, savings rate percentage, and fixed-to-variable spending ratio.",
      },
      {
        icon: RefreshCw,
        title: "Recurring Expense Detection",
        description:
          "Automated pattern engine detects 30-day and annual subscription charges to highlight duplicate services or silent price creeps.",
      },
      {
        icon: CalendarRange,
        title: "Month-over-Month Analysis",
        description:
          "Compare current spend against historical 3-month, 6-month, and 12-month rolling baselines to detect anomalous spikes.",
      },
    ],
  },
  {
    category: "AI Financial Insights & Forecasting",
    description: "Smart algorithmic summaries and anomaly warnings without invasive data sharing.",
    items: [
      {
        icon: BrainCircuit,
        title: "AI Financial Overview",
        description:
          "Synthesizes complex monthly transaction trends into clear, plain-English executive summaries.",
      },
      {
        icon: Sparkles,
        title: "AI Budget Recommendations",
        description:
          "Identifies discretionary cost-saving opportunities based on your category spending distributions.",
      },
      {
        icon: AlertTriangle,
        title: "AI Anomaly Detection",
        description:
          "Alerts you immediately when a category spend deviates significantly from your typical historical baseline.",
      },
      {
        icon: TrendingDown,
        title: "Financial Forecasting",
        description:
          "Projects estimated month-end cash flow and savings surplus based on current burn rate and recurring schedules.",
      },
    ],
  },
  {
    category: "Exports, Privacy & Platform",
    description: "Full data portability, international support, and total privacy control.",
    items: [
      {
        icon: Download,
        title: "One-Click CSV Export",
        description:
          "Export your full itemized transaction ledger anytime for spreadsheets, CPA tax filing, or backup archives.",
      },
      {
        icon: Printer,
        title: "Printable Financial Reports",
        description:
          "Generate clean, formatted, print-ready expense reports ideal for client billing and business reimbursement.",
      },
      {
        icon: Globe2,
        title: "Multi-Currency Management",
        description:
          "Tag domestic and international transactions across global currencies (USD, GBP, EUR, AUD, CAD, etc.).",
      },
      {
        icon: Moon,
        title: "Built-In Dark Mode",
        description:
          "Carefully calibrated high-contrast dark theme engineered for comfortable low-light financial tracking.",
      },
      {
        icon: Trash2,
        title: "Permanent Account Deletion",
        description:
          "Complete self-serve GDPR-oriented deletion option in user settings to instantly wipe all records upon request.",
      },
    ],
  },
];

export default function FeaturesPage() {
  return (
    <div className="flex flex-col flex-1">
      {/* Header */}
      <header className="bg-surface border-b border-hairline py-12 sm:py-16">
        <Container size="default">
          <Breadcrumbs items={[{ name: "Features", url: "/features" }]} className="mb-6" />

          <div className="max-w-3xl">
            <Badge variant="income" size="sm" className="mb-4">
              Platform Overview
            </Badge>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4">
              Comprehensive Financial Features Built for Speed and Control
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-6">
              Expenseliy gives you an integrated ledger for expenses, income, and investments,
              backed by automated anomaly detection, recurring charge audits, and instant data
              exports.
            </p>

            <div className="flex flex-wrap items-center gap-3">
              <Button href="https://app.expenseliy.com/signup" variant="primary" size="md">
                <span>Start Free (40 Transactions)</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Button>
              <Button href="/pricing" variant="secondary" size="md">
                View Pricing Plans
              </Button>
            </div>
          </div>
        </Container>
      </header>

      {/* Feature Groups */}
      <div className="py-12 sm:py-16 bg-canvas flex flex-col gap-16">
        {FEATURE_GROUPS.map((group, groupIdx) => (
          <Container key={groupIdx} size="default">
            <div className="border-b border-hairline pb-4 mb-8">
              <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight mb-1">
                {group.category}
              </h2>
              <p className="text-xs sm:text-sm text-ink-muted">{group.description}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {group.items.map((item, itemIdx) => {
                const Icon = item.icon;
                return (
                  <div
                    key={itemIdx}
                    className="bg-surface border border-hairline hover:border-hairline-strong rounded-md p-6 flex flex-col justify-between transition-colors"
                  >
                    <div>
                      <div className="w-10 h-10 rounded-md bg-homepage-mintcream dark:bg-surface-raised border border-hairline flex items-center justify-center text-primary mb-4 shrink-0">
                        <Icon className="w-5 h-5" aria-hidden="true" />
                      </div>

                      <h3 className="text-base font-bold text-ink mb-2">{item.title}</h3>
                      <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </Container>
        ))}
      </div>

      {/* Disclaimer */}
      <div className="bg-surface border-y border-hairline py-6 text-center text-xs text-ink-muted">
        <Container size="narrow">
          <p>
            <strong>Note on AI & Algorithmic Features:</strong> Expenseliy AI analysis, health
            scores, and anomaly warnings are informational tools designed for record-keeping and
            organization. They do not constitute certified financial, tax, or investment advice.
          </p>
        </Container>
      </div>

      {/* Bottom CTA */}
      <CTASection
        title="Experience All Expenseliy Features Today"
        description="Get started with 40 free lifetime transactions. No credit card required."
        badgeText="Explore Now"
      />
    </div>
  );
}
