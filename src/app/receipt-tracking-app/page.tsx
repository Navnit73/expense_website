import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { UnifiedReceiptEngine } from "@/components/receipt-engine/UnifiedReceiptEngine";
import {
  createPageMetadata,
  getWebApplicationSchema,
  getBreadcrumbSchema,
  getFAQSchema,
  getHowToSchema,
} from "@/lib/seo";
import {
  LayoutDashboard,
  Receipt,
  BarChart3,
  Search,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  TrendingDown,
  FileSpreadsheet,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Receipt Tracking App – Track Receipts & Expenses",
  description:
    "Track receipts and expenses in one unified dashboard. Store purchase data, categorize spending, and monitor monthly cash outflows with Expenseliy.",
  path: "/receipt-tracking-app",
  keywords: [
    "receipt tracking app",
    "track receipts and expenses",
    "receipt dashboard app",
    "expense and receipt tracker",
    "monthly receipt reports",
    "track spending receipts",
    "business receipt tracking app",
  ],
});

const FAQS: FAQItem[] = [
  {
    question: "Why use a dedicated receipt tracking app instead of Excel or Google Sheets?",
    answer:
      "Spreadsheets require manual typing of dates, numbers, and categories for every paper receipt, leading to frequent typos and lost tax deductions. A dedicated receipt tracking app extracts numbers automatically via OCR, auto-calculates taxes, and updates monthly spending analytics instantly.",
  },
  {
    question: "Can I monitor monthly spending by category?",
    answer:
      "Yes. Expenseliy's dashboard includes dynamic progress bars for every category (Food, Travel, Software, Supplies, Utilities) and a 12-month outflow chart to pinpoint spending spikes.",
  },
  {
    question: "Does the app support filtering by tax year?",
    answer:
      "Yes. You can switch between tax years (2026, 2025, 2024) to isolate historical deduction totals or prepare quarterly estimated tax filings.",
  },
];

export default function ReceiptTrackingAppPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Receipt Tracking App – Track Receipts & Expenses",
    description:
      "Track receipts and expenses in one dashboard. Store purchase information, categorize spending and monitor expenses over time.",
    url: "/receipt-tracking-app",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Receipt Tracking App", url: "/receipt-tracking-app" },
  ]);

  const faqSchema = getFAQSchema(FAQS);

  const howToSchema = getHowToSchema({
    name: "How to Track Business Receipts Without Spreadsheets",
    description:
      "A modern 4-step framework to manage business expenses and receipts without manual spreadsheet entries.",
    steps: [
      {
        name: "Digitize via Browser OCR",
        text: "Scan paper receipts or upload PDF invoices directly to extract merchant and line item data.",
      },
      {
        name: "Assign Business / Personal Classification",
        text: "Toggle business expense status to route purchases into Schedule C write-off categories.",
      },
      {
        name: "Monitor Real-Time Category Outflow",
        text: "Track monthly spending variance across software, travel, dining, and workspace costs.",
      },
      {
        name: "Export Clean Accounting Ledgers",
        text: "Download formatted CSV spreadsheets for your CPA or bookkeeping software with a single click.",
      },
    ],
  });

  return (
    <div className="flex flex-col flex-1">
      {/* Schema Injections */}
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
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* Header */}
      <header className="bg-surface border-b border-hairline py-12 sm:py-16">
        <Container size="default">
          <Breadcrumbs
            items={[
              { name: "Tools", url: "/tools" },
              { name: "Receipt Tracking App", url: "/receipt-tracking-app" },
            ]}
            className="mb-6"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-income-bg text-income border border-income-border text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <LayoutDashboard className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Unified Financial Dashboard</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4 leading-tight">
              Receipt Tracking App – Track Receipts & Expenses
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-6">
              Track receipts and expenses in one unified dashboard. Store purchase information,
              categorize spending, monitor expenses over time, and download CPA-ready accounting
              spreadsheets.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
              <div className="flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span>Real-Time Category Distribution</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-primary" />
                <span>Monthly Cash Outflow Charts</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>Zero Subscription Lock-In</span>
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* Interactive Tool Section */}
      <section className="py-10 sm:py-14 bg-canvas flex-1 border-b border-hairline">
        <Container size="default">
          <UnifiedReceiptEngine
            variant="tracking-app"
            initialTab="reports"
            customHeadline="Receipt & Expense Tracking Dashboard"
            customSubheadline="Review aggregate spending totals, explore category breakdowns, and export verified expense reports."
            highlightFeatures={[
              "All-in-one receipt scanner and tracker",
              "Dynamic category breakdown bars",
              "12-Month cash outflow trend visualization",
              "Tax-year filtering (2026, 2025, 2024)",
              "Multi-criteria search & filtering",
              "Instant CSV ledger download",
            ]}
          />
        </Container>
      </section>

      {/* Long-form SEO Content */}
      <section className="py-14 sm:py-20 bg-surface">
        <Container size="narrow">
          <article className="prose prose-sm sm:prose-base dark:prose-invert max-w-none space-y-8 text-ink-secondary">
            <div>
              <Badge variant="sky" size="sm" className="mb-3">
                Financial Productivity
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-4">
                How to Track Business Receipts Without Spreadsheets
              </h2>
              <p className="leading-relaxed">
                Spreadsheets like Excel and Google Sheets are versatile, but using them for receipt
                tracking creates friction. Typing line-item amounts, calculating sales tax splits,
                and manually hyperlinking image files in columns wastes hours each month. A modern
                receipt tracking app automates data entry while preserving the flexibility of
                spreadsheet exports.
              </p>
            </div>

            <h3 className="text-xl font-bold text-ink mt-8 mb-3">
              The 3 Hidden Pitfalls of Spreadsheet Receipt Tracking
            </h3>

            <div className="space-y-4 my-6 not-prose">
              <div className="p-4 rounded-xl bg-canvas border border-hairline">
                <h4 className="text-sm font-bold text-expense mb-1">1. High Transposition Error Rate</h4>
                <p className="text-xs text-ink-secondary leading-relaxed">
                  Manual typing leads to decimal errors (e.g. typing $58.90 instead of $85.90),
                  throwing off tax reconciliations and bank account audits.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-canvas border border-hairline">
                <h4 className="text-sm font-bold text-expense mb-1">2. Disconnected Image Proof</h4>
                <p className="text-xs text-ink-secondary leading-relaxed">
                  Spreadsheets hold numbers, but during an IRS audit, proof of payment and itemized
                  receipt images are mandatory. Linking Google Drive URLs in cells is cumbersome.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-canvas border border-hairline">
                <h4 className="text-sm font-bold text-expense mb-1">3. Lack of Duplicate Awareness</h4>
                <p className="text-xs text-ink-secondary leading-relaxed">
                  Spreadsheets cannot warn you in real time when you enter the same $42.50 dinner
                  receipt twice from two different statement dates.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-ink mt-8 mb-3">
              Automated Tracking: The Best of Both Worlds
            </h3>
            <p>
              With Expenseliy, you capture the speed of automated OCR scanning and instant
              visualizations, while retaining the ability to export a pristine, standardized CSV file
              whenever you need to share figures with your bookkeeper or load data into Excel.
            </p>
          </article>
        </Container>
      </section>

      {/* Internal Linking Hub */}
      <section className="py-12 bg-canvas border-t border-hairline">
        <Container size="default">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-ink">
              Related Receipt & Expense Utilities
            </h3>
            <p className="text-xs sm:text-sm text-ink-secondary mt-1">
              Connect your tracking workflow across specialized tools.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/receipt-scanner"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Receipt Scanner →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Fast client-side OCR for paper receipts.
              </p>
            </Link>

            <Link
              href="/receipt-tracker"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Receipt Tracker →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Timeline and search views for your receipts.
              </p>
            </Link>

            <Link
              href="/expense-receipt-app"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Expense Receipt App →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Turn receipts into reimbursable expense claims.
              </p>
            </Link>

            <Link
              href="/receipt-scanner-for-small-business"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Small Business Scanner →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Track vendor purchases and team expenses.
              </p>
            </Link>
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <section className="py-14 sm:py-20 bg-surface border-t border-hairline">
        <Container size="narrow">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Badge variant="neutral" size="sm" className="mb-3">
              FAQ
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary">
              Learn how to track receipts and expenses without spreadsheets.
            </p>
          </div>

          <FAQAccordion items={FAQS} />
        </Container>
      </section>

      {/* CTA */}
      <CTASection
        title="Upgrade From Spreadsheets to Expenseliy"
        description="Experience real-time expense charts, OCR receipt capture, and instant CSV exports."
        badgeText="Start Tracking Free"
      />
    </div>
  );
}
