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
  Briefcase,
  Scan,
  Sparkles,
  ShieldCheck,
  Building2,
  FileSpreadsheet,
  Users,
  CheckCircle2,
  ArrowRight,
  Receipt,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Receipt Scanner for Small Business – Track Business Expenses",
  description:
    "Scan business receipts and automatically extract expense data. Organize receipts by vendor, category, and date, and export audit-ready records with Expenseliy.",
  path: "/receipt-scanner-for-small-business",
  keywords: [
    "receipt scanner for small business",
    "track business expenses receipts",
    "small business receipt app",
    "vendor receipt tracking",
    "business expense scanner",
    "small business bookkeeping receipts",
  ],
});

const FAQS: FAQItem[] = [
  {
    question: "How does this receipt scanner help small businesses?",
    answer:
      "Expenseliy automates the transition from messy paper receipts to structured accounting records. It extracts vendor names, dates, subtotals, and sales taxes with OCR, groups purchases by category, and generates CSV spreadsheets ready for QuickBooks, Xero, or your external accountant.",
  },
  {
    question: "Can multiple team members or contractors tag expenses?",
    answer:
      "Yes. You can use custom tags such as #contractor-john, #marketing-team, or #project-alpha to track which team member or department incurred the expense.",
  },
  {
    question: "Can I export vendor-specific expense reports?",
    answer:
      "Yes. The tracker allows you to filter transactions by merchant/vendor (e.g., AWS, Office Depot, Delta) and export focused vendor spend reports.",
  },
];

export default function ReceiptScannerForSmallBusinessPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Receipt Scanner for Small Business – Track Business Expenses",
    description:
      "Scan business receipts and automatically extract expense information. Organize receipts by vendor, category and date and export your records.",
    url: "/receipt-scanner-for-small-business",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Receipt Scanner for Small Business", url: "/receipt-scanner-for-small-business" },
  ]);

  const faqSchema = getFAQSchema(FAQS);

  const howToSchema = getHowToSchema({
    name: "How Small Businesses Can Digitize Receipts and Bookkeeping",
    description:
      "A 4-step framework for small business owners to automate receipt capture and expense management.",
    steps: [
      {
        name: "Centralize Ingestion",
        text: "Have team members capture paper receipts immediately via mobile camera or upload digital vendor invoices.",
      },
      {
        name: "Apply Vendor & Category Mapping",
        text: "Automatically extract vendor names and assign standard Chart of Accounts categories.",
      },
      {
        name: "Attach Department & Project Tags",
        text: "Tag records with project names or employee IDs (#marketing, #sales-travel).",
      },
      {
        name: "Generate Monthly Reconciliation Ledgers",
        text: "Export clean CSV and PDF expense reports for month-end bookkeeping close.",
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
              { name: "Small Business Scanner", url: "/receipt-scanner-for-small-business" },
            ]}
            className="mb-6"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-income-bg text-income border border-income-border text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <Briefcase className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Small Business Bookkeeping</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4 leading-tight">
              Receipt Scanner for Small Business – Track Business Expenses
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-6">
              Scan business receipts and automatically extract expense information. Organize receipts
              by vendor, category, and date, and export audit-ready records for accounting and tax
              compliance.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-primary" />
                <span>Vendor Spending Analytics</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-primary" />
                <span>QuickBooks/Xero CSV Ready</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>Zero Corporate Data Leaks</span>
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* Interactive Tool Section */}
      <section className="py-10 sm:py-14 bg-canvas flex-1 border-b border-hairline">
        <Container size="default">
          <UnifiedReceiptEngine
            variant="small-business"
            initialTab="scan"
            customHeadline="Small Business Receipt Management Workspace"
            customSubheadline="Scan vendor invoices, manage team expense tags, and export monthly bookkeeping reports."
            highlightFeatures={[
              "Business receipt OCR with vendor recognition",
              "Tax deduction classification (Schedule C)",
              "Multi-tagging support (#marketing, #contractor)",
              "Duplicate billing detection",
              "Monthly vendor spending analytics",
              "Export to CSV and printable statements",
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
                Operations Guide
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-4">
                How Small Businesses Can Digitize Their Receipts: Scalable Bookkeeping
              </h2>
              <p className="leading-relaxed">
                For small businesses and growing startups, financial clarity starts with receipt
                hygiene. When receipts go missing, businesses lose valuable tax write-offs, suffer
                cash flow blind spots, and risk penalties during tax audits. Modernizing receipt
                digitization creates an automated paper trail.
              </p>
            </div>

            <h3 className="text-xl font-bold text-ink mt-8 mb-3">
              Key Benefits of Automated Receipt Scanning for Small Teams
            </h3>

            <div className="space-y-4 my-6 not-prose">
              <div className="p-4 rounded-xl bg-canvas border border-hairline flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-income-bg text-income flex items-center justify-center font-bold text-xs font-mono shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ink mb-1">Maximized Tax Deductions</h4>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    Capture every $10 parking ticket, client lunch, and office supply purchase that
                    otherwise slips through the cracks, saving thousands annually on Schedule C /
                    Form 1120 taxes.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-canvas border border-hairline flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-sky-bg text-sky flex items-center justify-center font-bold text-xs font-mono shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ink mb-1">Faster Month-End Reconciliation</h4>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    Cut monthly bookkeeping close from 4 days down to 30 minutes by exporting clean,
                    categorized CSVs directly into your accounting software.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-canvas border border-hairline flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-warning-bg text-warning flex items-center justify-center font-bold text-xs font-mono shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ink mb-1">Audit-Proof Digital Records</h4>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    Fulfill IRS Rev. Proc. 97-22 requirements with timestamped OCR records and clear
                    digital proof of payment for every single business transaction.
                  </p>
                </div>
              </div>
            </div>
          </article>
        </Container>
      </section>

      {/* Internal Linking Hub (Exact Sequence) */}
      <section className="py-12 bg-canvas border-t border-hairline">
        <Container size="default">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-ink">
              Recommended Small Business Tool Workflow
            </h3>
            <p className="text-xs sm:text-sm text-ink-secondary mt-1">
              Follow our recommended toolchain for complete financial control.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/receipt-scanner"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <div className="text-[10px] font-mono text-primary font-bold mb-1">Step 1</div>
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Receipt Scanner →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Free OCR scanner to extract data from paper receipts.
              </p>
            </Link>

            <Link
              href="/receipt-tracker"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <div className="text-[10px] font-mono text-primary font-bold mb-1">Step 2</div>
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Receipt Tracker →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Organize purchase history and track monthly spending.
              </p>
            </Link>

            <Link
              href="/tools"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <div className="text-[10px] font-mono text-primary font-bold mb-1">Step 3</div>
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Financial Calculators →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Audit recurring subscriptions and cash flow runway.
              </p>
            </Link>

            <Link
              href="/receipt-scanner-for-small-business"
              className="p-4 rounded-xl bg-surface border-2 border-primary/40 bg-income-bg/10 block group"
            >
              <div className="text-[10px] font-mono text-primary font-bold mb-1">Step 4</div>
              <h4 className="text-xs font-bold text-primary mb-1">
                Small Business Scanner ★
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Export consolidated vendor books and tax packages.
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
              Learn how small businesses manage receipts with Expenseliy.
            </p>
          </div>

          <FAQAccordion items={FAQS} />
        </Container>
      </section>

      {/* CTA */}
      <CTASection
        title="Digitize Your Small Business Receipts Today"
        description="Streamline vendor tracking, eliminate manual data entry, and prepare clean tax ledgers."
        badgeText="Start Business Scanner"
      />
    </div>
  );
}
