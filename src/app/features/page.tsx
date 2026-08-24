import type { Metadata } from "next";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { Button } from "@/components/marketing/Button";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { createPageMetadata, getSoftwareAppSchema, getFAQSchema } from "@/lib/seo";
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
  AlertTriangle,
  TrendingDown,
  Download,
  Printer,
  Globe2,
  Moon,
  Trash2,
  ArrowRight,
  HelpCircle,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Complete Features & Capabilities",
  description:
    "Explore Expenseliy's full feature suite: multi-asset tracking (expenses, income, investments), AI financial insights, recurring expense detection, CSV exports, and privacy-first data isolation.",
  path: "/features",
  keywords: [
  
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
          "Create, rename, and organize custom categories with tailored color badges to match your personal budgeting framework, household bills, or self-employed categories.",
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
        title: "Month-over-Month Variance",
        description:
          "Track sequential spending and earning trends across historical months to understand seasonality and cash flow drift.",
      },
      {
        icon: HeartPulse,
        title: "Financial Health Score",
        description:
          "An objective algorithmic rating evaluating your cash flow surplus, savings rate consistency, and expense stability.",
      },
      {
        icon: CalendarRange,
        title: "Savings Rate Calculation",
        description:
          "Automatic real-time formula calculating the exact percentage of income retained after all operating and living expenses.",
      },
    ],
  },
  {
    category: "Automation, AI & Smart Detection",
    description: "Algorithmic tools designed to audit subscriptions, detect cost anomalies, and generate insights.",
    items: [
      {
        icon: RefreshCw,
        title: "Recurring Expense Detection",
        description:
          "Identifies repeating subscriptions, memberships, utilities, and software licenses, calculating total annual recurring overhead.",
      },
      {
        icon: BrainCircuit,
        title: "AI Financial Insights",
        description:
          "Context-aware informational analysis highlighting spending velocity, cost anomalies, and discretionary versus essential ratios.",
      },
      {
        icon: AlertTriangle,
        title: "Spending Anomaly Alerts",
        description:
          "Flags transactions that deviate significantly from category rolling averages to prevent unnoticed billing errors.",
      },
      {
        icon: TrendingDown,
        title: "Discretionary Spending Ratio",
        description:
          "Separates essential non-negotiable living costs from discretionary lifestyle spending for structured budgeting.",
      },
    ],
  },
  {
    category: "Data Portability, Security & Experience",
    description: "Complete user ownership of financial records with zero third-party monetization.",
    items: [
      {
        icon: Download,
        title: "Instant CSV Ledger Exports",
        description:
          "Export your un-truncated transaction history to standard CSV at any time for Excel, Google Sheets, or tax filing software.",
      },
      {
        icon: Printer,
        title: "Printable Financial Reports",
        description:
          "Generate clean, formatted printable ledger summaries ready for accountant review, audits, or offline record archives.",
      },
      {
        icon: Globe2,
        title: "Multi-Currency Tagging",
        description:
          "Record transactions in USD, EUR, GBP, CAD, AUD, and other global currencies with clean denomination tags.",
      },
      {
        icon: Moon,
        title: "True Dark Mode",
        description:
          "Engineered with high-contrast, low-glare surface tokens for seamless visibility in low-light environments.",
      },
      {
        icon: Trash2,
        title: "Complete Self-Serve Data Deletion",
        description:
          "Permanent, instant database erasure of your profile, ledger, categories, and analytics on demand with zero lock-in.",
      },
    ],
  },
];

const FEATURES_FAQS: FAQItem[] = [
  {
    question: "What features does Expenseliy offer?",
    answer:
      "Expenseliy provides a complete financial tracking suite for individuals, working professionals, the self-employed, and household bill tracking. Key features include multi-asset transaction tracking (Expenses, Income, Investments), custom category management, automated Month-over-Month analytics, an algorithmic Financial Health Score, recurring subscription detection, AI-assisted financial summaries, one-click CSV ledger exports, printable financial statements, multi-currency support, dark mode, and complete self-serve data deletion.",
  },
  {
    question: "Can I track expenses, income, and investments with Expenseliy?",
    answer:
      "Yes. Expenseliy natively supports three core transaction types in a unified ledger: Expenses (daily purchases, utilities, household bills, self-employed costs), Income (salaries, freelance invoices, dividends, rental cash flow), and Investments (stocks, ETFs, crypto, real estate, precious metals).",
  },
  {
    question: "Can I categorize and organize my personal expenses?",
    answer:
      "Yes. You can assign transactions to default categories or create custom categories with distinct color tags. You can also add custom notes, merchant details, payment methods, and receipt tags to keep your records thoroughly organized.",
  },
  {
    question: "Can I search and filter my transactions?",
    answer:
      "Yes. Expenseliy includes real-time search and multi-parameter filtering. You can instantly filter transactions by date range, asset type (Expense, Income, Investment), category, payment method, or keyword search across notes and payees.",
  },
  {
    question: "Does Expenseliy provide spending and budget analytics?",
    answer:
      "Yes. Expenseliy generates interactive charts that visualize your net cash flow, income vs. expenses, category distribution breakdowns, and Month-over-Month spending variance to identify trends over time.",
  },
  {
    question: "Can Expenseliy identify my biggest spending categories?",
    answer:
      "Yes. The analytics dashboard automatically calculates category distribution percentages and highlights your top cost drivers, allowing you to see exactly where the largest portions of your income are directed.",
  },
  {
    question: "Can I track my savings rate and financial health?",
    answer:
      "Yes. Expenseliy continuously calculates your real monthly savings rate ((Income - Expenses) / Income * 100) and evaluates your financial health based on cash flow stability, savings discipline, and expense consistency.",
  },
  {
    question: "Does Expenseliy detect recurring expenses and subscriptions?",
    answer:
      "Yes. Expenseliy features an algorithmic Recurring Expense Detector that monitors transaction frequency and merchant patterns to identify recurring software subscriptions, memberships, and utility bills, alerting you to price increases.",
  },
  {
    question: "Can Expenseliy analyze my finances with AI?",
    answer:
      "Yes. Expenseliy Pro includes AI-driven financial insights that analyze historical spending patterns to generate concise, objective monthly summaries, flag spending anomalies, and suggest potential cost-reduction opportunities.",
  },
  {
    question: "What can Expenseliy AI financial insights tell me?",
    answer:
      "Expenseliy AI provides structured summaries of your monthly cash flow, highlights unusual category spikes compared to your rolling averages, calculates discretionary vs. essential spending ratios, and provides informational observations to assist your budgeting decisions.",
  },
  {
    question: "Can I export my expenses and financial data?",
    answer:
      "Yes. You can download an un-truncated, clean CSV export of your entire transaction history with a single click at any time for tax filing, accounting software import, or offline backup in Excel or Google Sheets.",
  },
  {
    question: "Does Expenseliy support multiple currencies?",
    answer:
      "Yes. Expenseliy supports major international currencies including USD, GBP, EUR, CAD, AUD, and others, allowing you to record both local and foreign currency transactions with clear currency identifiers.",
  },
  {
    question: "Can I create custom expense and income categories?",
    answer:
      "Yes. You can create an unlimited number of custom categories with tailored names and color badges to match your specific household budget, personal goals, or self-employed categories.",
  },
  {
    question: "Can I generate printable financial reports?",
    answer:
      "Yes. Expenseliy Pro allows you to generate clean, printer-friendly summary reports and transaction ledgers suitable for offline filing, accountant reviews, or loan documentation.",
  },
  {
    question: "Does Expenseliy support dark mode?",
    answer:
      "Yes. Expenseliy features a native, high-contrast dark mode designed to reduce eye strain, complete with automatic system preference detection and an instant manual theme toggle.",
  },
  {
    question: "Can I delete my Expenseliy account and financial data?",
    answer:
      "Yes. We practice strict data privacy and isolation. Expenseliy provides a self-serve account deletion option in your settings that permanently erases your profile, ledger, categories, and analytics from the database.",
  },
];

export default function FeaturesPage() {
  const appSchema = getSoftwareAppSchema();
  const faqSchema = getFAQSchema(FEATURES_FAQS);

  return (
    <div className="flex flex-col flex-1">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

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
              <Button href="https://app.expenseliy.com/auth/signin" variant="primary" size="md">
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

      {/* Frequently Asked Questions Section */}
      <section className="py-16 sm:py-20 lg:py-24 bg-surface border-t border-hairline">
        <Container size="narrow">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="income" size="sm" className="mb-3">
              <HelpCircle className="w-3.5 h-3.5 mr-1" />
              <span>Features FAQ</span>
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-4">
              Frequently Asked Questions About Expenseliy Features
            </h2>
            <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
              Everything you need to know about our multi-asset tracking, AI analytics, export tools,
              and security capabilities.
            </p>
          </div>

          <FAQAccordion items={FEATURES_FAQS} />
        </Container>
      </section>

      {/* Disclaimer */}
      <div className="bg-canvas border-t border-hairline py-6 text-center text-xs text-ink-muted">
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
