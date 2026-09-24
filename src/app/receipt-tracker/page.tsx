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
  FolderKanban,
  Receipt,
  Search,
  Filter,
  BarChart3,
  Calendar,
  ShieldCheck,
  Zap,
  ArrowRight,
  FileCheck2,
  Tags,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Receipt Tracker – Organize and Track Your Receipts",
  description:
    "Keep all your receipts organized in one central timeline. Track purchases, expenses, vendors, categories, and tax records with Expenseliy.",
  path: "/receipt-tracker",
  keywords: [
    "receipt tracker",
    "track receipts online",
    "organize receipts digitally",
    "receipt organizer tool",
    "expense and receipt tracker",
    "receipt timeline app",
    "receipt manager free",
  ],
});

const FAQS: FAQItem[] = [
  {
    question: "How does the receipt tracker organize my transactions?",
    answer:
      "Expenseliy creates a unified timeline ledger where every scanned or manually uploaded receipt is automatically tagged by merchant, date, expense category, and tax classification. You can filter by date ranges, search notes, or view monthly spending totals instantly.",
  },
  {
    question: "Can I search for specific receipts by vendor or amount?",
    answer:
      "Yes. The real-time search bar allows instant filtering across merchant names, notes, custom tags (e.g., #client-dinner, #q3-hardware), and dollar amounts.",
  },
  {
    question: "How long should I keep receipts for tax audits?",
    answer:
      "The IRS generally recommends retaining tax-related receipts and proof of purchases for at least 3 to 7 years depending on deduction types. Expenseliy lets you archive receipts by tax year and download permanent CSV/PDF audit packages.",
  },
  {
    question: "Can I separate personal receipts from business expenses?",
    answer:
      "Yes. Every receipt can be tagged as Business (1099/Schedule C) or Personal. The tracker dashboard provides a real-time ratio bar showing your exact business vs personal cash distribution.",
  },
];

export default function ReceiptTrackerPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Receipt Tracker – Organize and Track Your Receipts",
    description:
      "Keep all your receipts organized in one place. Track purchases, expenses, vendors and tax-related receipts with Expenseliy.",
    url: "/receipt-tracker",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Receipt Tracker", url: "/receipt-tracker" },
  ]);

  const faqSchema = getFAQSchema(FAQS);

  const howToSchema = getHowToSchema({
    name: "How to Build a Digital Receipt Tracking System",
    description:
      "A step-by-step framework to eliminate paper clutter and track all receipts digitally.",
    steps: [
      {
        name: "Capture & Ingest Receipts",
        text: "Digitize receipts immediately upon purchase using camera scanning or drag-and-drop file ingestion.",
      },
      {
        name: "Standardize Categorization",
        text: "Assign consistent category labels (Meals, Office, Travel, Software) and tax designations.",
      },
      {
        name: "Apply Contextual Tags & Notes",
        text: "Attach client names, project IDs, or purpose descriptions (#q3-travel, #equipment).",
      },
      {
        name: "Audit Monthly Variance & Export",
        text: "Review monthly totals, catch duplicate charges, and export clean CSV reports.",
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
              { name: "Receipt Tracker", url: "/receipt-tracker" },
            ]}
            className="mb-6"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-sky-bg text-sky border border-sky-border text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <FolderKanban className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Receipt Management Hub</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4 leading-tight">
              Receipt Tracker – Organize and Track Your Receipts
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-6">
              Keep all your receipts organized in one place. Track purchases, expenses, vendors,
              and tax-related receipts with Expenseliy. Filter by date, search custom tags, and
              monitor monthly spending.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
              <div className="flex items-center gap-1.5">
                <Search className="w-4 h-4 text-primary" />
                <span>Instant Multi-Filter Search</span>
              </div>
              <div className="flex items-center gap-1.5">
                <BarChart3 className="w-4 h-4 text-primary" />
                <span>Monthly Spending Breakdown</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>Zero Cloud Ingestion Risk</span>
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* Interactive Tool Section */}
      <section className="py-10 sm:py-14 bg-canvas flex-1 border-b border-hairline">
        <Container size="default">
          <UnifiedReceiptEngine
            variant="tracker"
            initialTab="tracker"
            customHeadline="Interactive Receipt Tracker & Ledger"
            customSubheadline="Explore your receipt timeline, filter by vendor or tax year, and review itemized totals."
            highlightFeatures={[
              "Receipt timeline, grid & table views",
              "Multi-select category & date filtering",
              "Search by vendor, amount, tags, or notes",
              "Duplicate receipt detection alerts",
              "Monthly spending aggregation charts",
              "Export to CSV and PDF statements",
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
                Organization Framework
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-4">
                How to Organize Receipts: A Simple System for Individuals and Businesses
              </h2>
              <p className="leading-relaxed">
                Most people handle receipts in one of two extremes: either cramming crumpled paper
                receipts into a physical shoebox until tax season arrives, or losing track of
                digital email invoices scattered across five different inboxes. Neither approach
                scales. A robust receipt tracking system must be fast to capture, effortless to
                categorize, and bulletproof during an audit.
              </p>
            </div>

            <h3 className="text-xl font-bold text-ink mt-8 mb-3">
              The 4-Pillar Digital Receipt Filing Framework
            </h3>

            <div className="space-y-4 my-6 not-prose">
              <div className="p-4 rounded-xl bg-canvas border border-hairline flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-income-bg text-income flex items-center justify-center font-bold text-xs font-mono shrink-0 mt-0.5">
                  1
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ink mb-1">Instant Ingestion at Point of Sale</h4>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    Never postpone scanning. Snap a photo with your mobile camera or drop digital PDFs
                    into the tracker the moment an invoice arrives.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-canvas border border-hairline flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-sky-bg text-sky flex items-center justify-center font-bold text-xs font-mono shrink-0 mt-0.5">
                  2
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ink mb-1">Consistent Categorization Taxonomy</h4>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    Avoid creating 50 different micro-categories. Stick to standard IRS-aligned
                    categories like Meals & Entertainment, Office Supplies, Travel, and Software.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-canvas border border-hairline flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-warning-bg text-warning flex items-center justify-center font-bold text-xs font-mono shrink-0 mt-0.5">
                  3
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ink mb-1">Tagging for Context & Reimbursement</h4>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    Use tags (<code>#client-acme</code>, <code>#q3-hardware</code>, <code>#reimbursable</code>)
                    to cross-reference expenses across multiple projects without complicating the primary ledger.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-canvas border border-hairline flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-purple-500/10 text-purple-600 flex items-center justify-center font-bold text-xs font-mono shrink-0 mt-0.5">
                  4
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ink mb-1">Monthly Reconciliation & Archive</h4>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    Review your monthly spending charts at the end of each billing cycle to spot
                    duplicate charges and verify all deductible expenses are logged.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-ink mt-8 mb-3">
              Paper vs Digital Receipt Retention Requirements
            </h3>
            <p>
              Under IRS Revenue Procedure 97-22, electronic receipts are legally acceptable
              substitutes for original paper documents provided the digital copies are legible,
              accurately reproduce the original information, and are easily retrievable during an
              examination. By transitioning to a digital receipt tracker, you can eliminate bulky
              physical storage while retaining searchable records.
            </p>
          </article>
        </Container>
      </section>

      {/* Internal Linking Hub */}
      <section className="py-12 bg-canvas border-t border-hairline">
        <Container size="default">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-ink">
              Related Receipt & Financial Tools
            </h3>
            <p className="text-xs sm:text-sm text-ink-secondary mt-1">
              Explore specialized tools in the Expenseliy ecosystem.
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
                Free OCR scanner to extract data from paper receipts.
              </p>
            </Link>

            <Link
              href="/receipt-scanner-organizer"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Receipt Organizer →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Sort and group receipts by vendor, category, and date.
              </p>
            </Link>

            <Link
              href="/receipt-tracking-app"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Receipt Tracking App →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Mobile-first dashboard for continuous expense tracking.
              </p>
            </Link>

            <Link
              href="/receipt-tracker-for-taxes"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Tax Receipt Tracker →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Organize tax deduction records by tax year folders.
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
              Everything you need to know about tracking receipts in Expenseliy.
            </p>
          </div>

          <FAQAccordion items={FAQS} />
        </Container>
      </section>

      {/* CTA */}
      <CTASection
        title="Start Organizing Your Receipts Today"
        description="Never lose a receipt or miss a tax deduction again. Try Expenseliy's client-side receipt tracker for free."
        badgeText="Open Tracker Free"
      />
    </div>
  );
}
