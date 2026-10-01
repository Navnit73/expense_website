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
  FileText,
  Receipt,
  Hash,
  CreditCard,
  Car,
  Home,
  Target,
  Flame,
  Clock,
  MapPin,
  FileSpreadsheet,
  Percent,
  Utensils,
  ShieldAlert,
  Layers,
  Package,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Free Online Financial Calculators, Invoicing & Tax Tools (2026)",
  description:
    "Free, instant business and personal finance tools with zero registration. Use our 1099 tax calculator, invoice generator, mileage deduction tool, profit margin planner, and 50/30/20 budget planner.",
  path: "/tools",
  keywords: [
    "free financial calculators",
    "1099 tax calculator",
    "free invoice generator",
    "mileage deduction calculator",
    "profit margin calculator",
    "receipt scanner online",
    "50 30 20 budget calculator",
    "break even calculator",
    "reverse vat calculator",
    "emergency fund calculator",
  ],
});

const TAX_TOOLS = [
  {
    id: "self-employment-tax-calculator",
    title: "1099 Self-Employment Tax Calculator",
    badge: "Most Popular",
    badgeVariant: "income" as const,
    description: "Calculate Social Security (12.4%), Medicare (2.9%), income taxes, and IRS quarterly payment estimates.",
    href: "/tools/self-employment-tax-calculator",
    icon: Calculator,
    features: ["IRS Schedule SE & 1040 model", "Quarterly estimated tax schedule", "State tax rate adjustments", "Take-home pay calculation"],
  },
  {
    id: "mileage-deduction-calculator",
    title: "IRS Mileage Deduction Calculator",
    badge: "IRS $0.67/mi",
    badgeVariant: "sky" as const,
    description: "Compare standard IRS mileage rates vs actual vehicle expenses for rideshare, sales, and business trips.",
    href: "/tools/mileage-deduction-calculator",
    icon: Car,
    features: ["Standard $0.67/mi business rate", "Actual gas & repairs comparison", "Medical & charitable mileage", "CSV log template export"],
  },
  {
    id: "home-office-deduction-calculator",
    title: "Home Office Deduction Calculator",
    badge: "Form 8829",
    badgeVariant: "income" as const,
    description: "Compare the IRS simplified $5/sq ft method vs actual housing expenses (rent, utilities, internet).",
    href: "/tools/home-office-deduction-calculator",
    icon: Home,
    features: ["Simplified $5/sq ft vs Actual", "Square footage percentage math", "Utility & rent allocation", "Tax savings estimate"],
  },
  {
    id: "schedule-c-expense-deductions-finder",
    title: "Schedule C Deduction Lookup",
    badge: "Tax Directory",
    badgeVariant: "warning" as const,
    description: "Search 50+ IRS Schedule C business expense categories, deductibility percentages, and receipt rules.",
    href: "/tools/schedule-c-expense-deductions-finder",
    icon: ShieldCheck,
    features: ["50+ searchable write-off lines", "50% vs 100% deduction tags", "IRS receipt compliance notes", "Interactive write-off estimator"],
  },
];

const INVOICE_TOOLS = [
  {
    id: "invoice-generator",
    title: "Free Invoice Generator",
    badge: "Most Popular",
    badgeVariant: "income" as const,
    description: "Create, customize, and download professional PDF invoices in seconds with custom branding.",
    href: "/invoice-generator",
    icon: FileText,
    features: ["Client-side instant PDF export", "7 industry invoice templates", "Automatic tax & discount lines", "Custom business logo upload"],
  },
  {
    id: "estimate-maker",
    title: "Price Estimate & Quote Maker",
    badge: "Client Proposals",
    badgeVariant: "sky" as const,
    description: "Generate clean project estimates and quotations with expiration validity dates and PDF downloads.",
    href: "/tools/estimate-maker",
    icon: FileSpreadsheet,
    features: ["Validity expiration terms", "Itemized service & rate table", "Instant PDF proposal download", "Convert to invoice ready"],
  },
  {
    id: "freelance-hourly-rate-calculator",
    title: "Freelance Hourly Rate Calculator",
    badge: "Pricing Strategy",
    badgeVariant: "income" as const,
    description: "Calculate target hourly, day, and monthly rates based on take-home goals, taxes, and overhead.",
    href: "/tools/freelance-hourly-rate-calculator",
    icon: Clock,
    features: ["Target salary reverse calculation", "Non-billable admin time buffer", "Day rate & retainer pricing", "W-2 salary equivalent score"],
  },
  {
    id: "invoice-late-fee-calculator",
    title: "Invoice Late Fee Calculator",
    badge: "Overdue Notices",
    badgeVariant: "warning" as const,
    description: "Calculate statutory overdue interest (1.5%/mo or APR%) and copy ready-to-send payment demand emails.",
    href: "/tools/invoice-late-fee-calculator",
    icon: Zap,
    features: ["1.5%/mo & APR interest math", "Grace period adjustment", "Daily accrual breakdown", "Ready-to-send email copy"],
  },
  {
    id: "purchase-order-generator",
    title: "Purchase Order (PO) Generator",
    badge: "B2B Procurement",
    badgeVariant: "sky" as const,
    description: "Create standardized B2B purchase orders with SKU numbers, vendor details, and PDF export.",
    href: "/tools/purchase-order-generator",
    icon: FileText,
    features: ["SKU & line item tracking", "Vendor & Ship-To fields", "Payment terms (Net 30/60)", "Instant PO PDF download"],
  },
  {
    id: "packing-slip-generator",
    title: "Packing Slip & Delivery Maker",
    badge: "Fulfillment",
    badgeVariant: "income" as const,
    description: "Generate parcel packing slips, shipping notes, and delivery manifests with tracking numbers.",
    href: "/tools/packing-slip-generator",
    icon: Package,
    features: ["Ordered vs shipped qty", "Carrier tracking details", "Thermal & printable layouts", "Instant client-side PDF"],
  },
  {
    id: "bill-maker",
    title: "Instant Bill Maker",
    badge: "Retail & POS",
    badgeVariant: "sky" as const,
    description: "Quickly generate retail bills, service receipts, and point-of-sale invoices.",
    href: "/bill-maker",
    icon: CreditCard,
    features: ["Itemized retail & POS layout", "Subtotal & payment status", "Print and save to PDF", "Zero signup needed"],
  },
  {
    id: "receipt-maker",
    title: "Online Receipt Maker",
    badge: "Receipts",
    badgeVariant: "warning" as const,
    description: "Generate clean payment receipts, sales slips, and vendor proofs of purchase.",
    href: "/receipt-maker",
    icon: Receipt,
    features: ["Thermal slip & modern designs", "Payment method records", "Instant PDF export", "100% private in browser"],
  },
];

const PROFIT_TOOLS = [
  {
    id: "profit-margin-calculator",
    title: "Profit Margin & Markup Calculator",
    badge: "High Volume",
    badgeVariant: "income" as const,
    description: "Convert cost of goods, selling price, gross margin %, and markup % in real time.",
    href: "/tools/profit-margin-calculator",
    icon: Percent,
    features: ["Gross profit & margin %", "Markup on cost calculation", "Multi-currency support", "Margin vs markup matrix"],
  },
  {
    id: "break-even-calculator",
    title: "Break-Even Point Calculator",
    badge: "Feasibility",
    badgeVariant: "sky" as const,
    description: "Calculate sales units and revenue needed to cover fixed overhead and hit target net profits.",
    href: "/tools/break-even-calculator",
    icon: Target,
    features: ["Unit contribution margin", "Break-even sales volume", "Target profit goal planner", "Fixed vs variable math"],
  },
  {
    id: "cash-burn-runway-calculator",
    title: "Startup Cash Burn & Runway",
    badge: "Treasury",
    badgeVariant: "expense" as const,
    description: "Forecast monthly gross burn, net cash drain, and months until Zero Cash Date (ZCD).",
    href: "/tools/cash-burn-runway-calculator",
    icon: Flame,
    features: ["Gross vs net monthly burn", "Zero cash date forecast", "Runway health status badge", "Scenario extension planning"],
  },
  {
    id: "dso-calculator",
    title: "Days Sales Outstanding (DSO)",
    badge: "Cash Flow",
    badgeVariant: "sky" as const,
    description: "Measure how fast your business collects invoice cash and calculate AR turnover ratios.",
    href: "/tools/dso-calculator",
    icon: Clock,
    features: ["DSO collection speed", "AR turnover multiplier", "Industry benchmark score", "Cash acceleration tips"],
  },
];

const EXPENSE_UTILITIES = [
  {
    id: "receipt-scanner",
    title: "Free Receipt Scanner",
    badge: "OCR Engine",
    badgeVariant: "income" as const,
    description: "Scan receipts online with OCR. Extract merchant name, date, subtotal, tax, and total automatically.",
    href: "/receipt-scanner",
    icon: Sparkles,
    features: ["Client-side OCR text extraction", "Vendor & date detection", "Tax & total math balancing", "CSV export download"],
  },
  {
    id: "bank-statement-csv-formatter",
    title: "Bank Statement CSV Formatter",
    badge: "Private Utility",
    badgeVariant: "sky" as const,
    description: "Paste raw bank transaction text to clean, standardize dates/amounts, and export clean CSVs.",
    href: "/tools/bank-statement-csv-formatter",
    icon: FileSpreadsheet,
    features: ["Client-side local parsing", "Auto date & amount detection", "Accounting ready CSV export", "100% private in browser"],
  },
  {
    id: "sales-tax-vat-calculator",
    title: "Sales Tax & Reverse VAT Calculator",
    badge: "Global Tax",
    badgeVariant: "income" as const,
    description: "Add sales tax or reverse extract VAT/GST from gross total receipts with global presets.",
    href: "/tools/sales-tax-vat-calculator",
    icon: Percent,
    features: ["Add tax forward mode", "Reverse VAT extract mode", "US, UK, EU, CA, AU presets", "Net vs gross breakdown"],
  },
  {
    id: "per-diem-calculator",
    title: "Business Per Diem Calculator",
    badge: "GSA Rates",
    badgeVariant: "warning" as const,
    description: "Calculate daily meal allowances, lodging rates, and 50% IRS business meal write-offs.",
    href: "/tools/per-diem-calculator",
    icon: MapPin,
    features: ["GSA destination rates", "75% travel day rule", "50% IRS meal deduction math", "Expense voucher copy"],
  },
  {
    id: "business-tip-calculator",
    title: "Business Meal Tip Splitter",
    badge: "Dining",
    badgeVariant: "sky" as const,
    description: "Calculate pre-tax tips (15%-25%), split dinner checks among diners, and copy meal receipts.",
    href: "/tools/business-tip-calculator",
    icon: Utensils,
    features: ["Pre-tax tip calculation", "Even split per diner", "Round to nearest dollar", "Copy meal receipt summary"],
  },
  {
    id: "receipt-tracker",
    title: "Receipt Tracker & Ledger",
    badge: "Ledger",
    badgeVariant: "income" as const,
    description: "Keep all your receipts organized in one place. Track purchases, search by vendor, and filter tags.",
    href: "/receipt-tracker",
    icon: Zap,
    features: ["Timeline & list views", "Category filtering", "Duplicate detection alerts", "Private client storage"],
  },
];

const BUDGET_WEALTH_TOOLS = [
  {
    id: "50-30-20-budget-calculator",
    title: "50/30/20 Budget Calculator",
    badge: "Most Popular",
    badgeVariant: "income" as const,
    description: "Split your take-home income into Needs (50%), Wants (30%), and Savings/Investments (20%).",
    href: "/tools/50-30-20-budget-calculator",
    icon: PieChart,
    features: ["Monthly & annual inputs", "Customizable percentage sliders", "Category allocations", "Zero registration required"],
  },
  {
    id: "emergency-fund-calculator",
    title: "Emergency Fund Calculator",
    badge: "Safety Net",
    badgeVariant: "income" as const,
    description: "Calculate your monthly survival baseline and discover your exact 3, 6, and 12-month savings targets.",
    href: "/tools/emergency-fund-calculator",
    icon: ShieldAlert,
    features: ["Essential expense baseline", "3, 6, 12-month runway targets", "Savings gap to goal", "Timeline completion estimate"],
  },
  {
    id: "debt-payoff-calculator",
    title: "Debt Snowball vs Avalanche Calculator",
    badge: "Debt Freedom",
    badgeVariant: "sky" as const,
    description: "Compare Debt Avalanche (highest APR first) vs Debt Snowball (smallest balance first) payoff schedules.",
    href: "/tools/debt-payoff-calculator",
    icon: CreditCard,
    features: ["Avalanche vs Snowball comparison", "Interest savings calculation", "Debt-free date projection", "Extra monthly payment slider"],
  },
  {
    id: "net-worth-calculator",
    title: "Net Worth & Balance Sheet",
    badge: "Balance Sheet",
    badgeVariant: "income" as const,
    description: "Track all your cash, investments, real estate, and liabilities to monitor your true wealth trajectory.",
    href: "/tools/net-worth-calculator",
    icon: Layers,
    features: ["Assets vs liabilities ledger", "Liquid net worth calculation", "Debt-to-asset ratio", "Copy balance sheet summary"],
  },
  {
    id: "savings-rate-calculator",
    title: "Savings Rate & Runway Calculator",
    badge: "Wealth Benchmark",
    badgeVariant: "sky" as const,
    description: "Calculate your monthly savings percentage, annual cash surplus, and months of emergency runway.",
    href: "/tools/savings-rate-calculator",
    icon: PiggyBank,
    features: ["Savings rate health score", "Emergency runway duration", "5-Year compound forecast", "Actionable recommendations"],
  },
  {
    id: "subscription-cost-calculator",
    title: "Subscription Cost & Leak Auditor",
    badge: "Cost Control",
    badgeVariant: "warning" as const,
    description: "Audit streaming services, software subscriptions, and memberships to calculate annual drain.",
    href: "/tools/subscription-cost-calculator",
    icon: RefreshCw,
    features: ["Multi-subscription aggregator", "5-Year opportunity cost", "S&P 500 compound loss math", "Subscription audit checklist"],
  },
];

const TOOLS_FAQS: FAQItem[] = [
  {
    question: "Are these financial tools completely free to use?",
    answer: "Yes, 100% free with no account creation, email capture, or payment required. All calculations run client-side in your web browser for complete privacy.",
  },
  {
    question: "Is my financial data secure when using these tools?",
    answer: "Yes. Every tool operates 100% client-side inside your browser sandbox. None of your entered financial amounts, tax numbers, or transaction data are ever transmitted to any external server.",
  },
  {
    question: "Can I export and print results from these tools?",
    answer: "Yes! Most tools feature 1-Click Copy Breakdown buttons, downloadable CSV logs, and instant printable PDF document generation.",
  },
  {
    question: "Can I track my real-time spending in Expenseliy?",
    answer: "Yes. You can use Expenseliy's receipt scanner and expense manager to log transactions with AI OCR and track your actual spending against your budget targets.",
  },
];

function ToolCard({ tool }: { tool: any }) {
  const Icon = tool.icon;
  return (
    <div className="bg-surface border border-hairline hover:border-hairline-strong rounded-2xl p-6 flex flex-col justify-between transition-all group shadow-sm">
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="w-10 h-10 rounded-xl bg-homepage-mintcream dark:bg-surface-raised border border-hairline flex items-center justify-center text-primary shrink-0">
            <Icon className="w-5 h-5" aria-hidden="true" />
          </div>
          <Badge variant={tool.badgeVariant} size="sm">
            {tool.badge}
          </Badge>
        </div>

        <h3 className="text-lg font-bold text-ink group-hover:text-primary transition-colors mb-2">
          {tool.title}
        </h3>

        <p className="text-xs text-ink-secondary leading-relaxed mb-4">
          {tool.description}
        </p>

        <ul className="space-y-1.5 border-t border-hairline pt-3 mb-6">
          {tool.features.map((feat: string, fIdx: number) => (
            <li key={fIdx} className="text-[11px] text-ink-muted flex items-center gap-1.5">
              <span className="w-1 h-1 rounded-full bg-primary shrink-0" />
              <span>{feat}</span>
            </li>
          ))}
        </ul>
      </div>

      <Button href={tool.href} variant="primary" size="sm" className="w-full justify-center">
        <span>Open Tool</span>
        <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
      </Button>
    </div>
  );
}

export default function ToolsIndexPage() {
  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
  ]);
  const faqSchema = getFAQSchema(TOOLS_FAQS);

  return (
    <div className="flex flex-col flex-1">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      {/* Header */}
      <header className="bg-surface border-b border-hairline py-12 sm:py-16">
        <Container size="default">
          <Breadcrumbs items={[{ name: "Tools", url: "/tools" }]} className="mb-6" />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-income-bg text-income border border-income-border text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <Calculator className="w-3.5 h-3.5" aria-hidden="true" />
              <span>20+ Free Financial Tools (2026)</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4 leading-tight">
              Free Financial Calculators, Invoicing & Tax Tools
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-6">
              Instant, 100% private financial calculators for freelancers, small business owners, and smart budgeters. Zero sign-up required.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>100% Private (Runs In Browser)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-primary" />
                <span>Instant Calculations & PDF Exports</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>Always Free & Open</span>
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* Cluster 1: Freelancer & Tax Tools */}
      <section className="py-12 bg-canvas border-b border-hairline">
        <Container size="default">
          <div className="mb-8">
            <Badge variant="income" size="sm" className="mb-2">Tax Season Ready</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              Freelancer & Small Business Tax Tools
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary mt-1">
              Estimate 1099 quarterly taxes, calculate IRS mileage deductions, and discover Schedule C write-offs.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {TAX_TOOLS.map((t) => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
        </Container>
      </section>

      {/* Cluster 2: Invoicing & Billing Suite */}
      <section className="py-12 bg-surface border-b border-hairline">
        <Container size="default">
          <div className="mb-8">
            <Badge variant="sky" size="sm" className="mb-2">Billing & Sales</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              Invoicing, Price Estimates & Billing Tools
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary mt-1">
              Create client invoices, price quotes, purchase orders, packing slips, and calculate late fees.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {INVOICE_TOOLS.map((t) => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
        </Container>
      </section>

      {/* Cluster 3: Business Profitability & Cash Flow */}
      <section className="py-12 bg-canvas border-b border-hairline">
        <Container size="default">
          <div className="mb-8">
            <Badge variant="income" size="sm" className="mb-2">Profitability & Treasury</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              Business Profitability & Cash Flow Calculators
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary mt-1">
              Calculate profit margins, determine break-even volumes, measure startup runway, and track DSO.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {PROFIT_TOOLS.map((t) => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
        </Container>
      </section>

      {/* Cluster 4: Expense & Receipt Utilities */}
      <section className="py-12 bg-surface border-b border-hairline">
        <Container size="default">
          <div className="mb-8">
            <Badge variant="warning" size="sm" className="mb-2">Receipts & Data</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              Expense, Receipt & Tax Utilities
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary mt-1">
              Scan receipts with AI OCR, clean bank CSV statements, and reverse-calculate VAT & meal tips.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {EXPENSE_UTILITIES.map((t) => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
        </Container>
      </section>

      {/* Cluster 5: Personal Wealth & Budgeting */}
      <section className="py-12 bg-canvas border-b border-hairline">
        <Container size="default">
          <div className="mb-8">
            <Badge variant="income" size="sm" className="mb-2">Personal Wealth</Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
              Personal Wealth & Budgeting Calculators
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary mt-1">
              Plan 50/30/20 budgets, build emergency funds, eliminate debt with snowball/avalanche, and track net worth.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {BUDGET_WEALTH_TOOLS.map((t) => (
              <ToolCard key={t.id} tool={t} />
            ))}
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <section className="py-14 sm:py-20 bg-surface border-t border-hairline">
        <Container size="narrow">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Badge variant="neutral" size="sm" className="mb-3">FAQ</Badge>
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
        title="Automate Your Finances with Expenseliy"
        description="Take the numbers from these calculators and manage your ongoing expenses, invoices, and receipts effortlessly."
        badgeText="Start Tracking Free"
      />
    </div>
  );
}
