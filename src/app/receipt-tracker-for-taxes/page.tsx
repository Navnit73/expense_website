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
  FolderArchive,
  Receipt,
  FileCheck2,
  Calendar,
  ShieldCheck,
  Zap,
  ArrowRight,
  Download,
  Scale,
  DollarSign,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Free Receipt Tracker for Taxes – Organize Receipts Online",
  description:
    "Keep your tax-related receipts organized by year, category, merchant, and expense amount. Scan receipts and export your records when you need them with Expenseliy.",
  path: "/receipt-tracker-for-taxes",
  keywords: [
    "receipt tracker for taxes",
    "free receipt tracker for taxes",
    "organize tax receipts online",
    "tax receipt storage free",
    "tax year receipt organizer",
    "irs tax receipt tracking",
    "small business tax receipt tracker",
  ],
});

const FAQS: FAQItem[] = [
  {
    question: "How long must I store tax receipts for IRS compliance?",
    answer:
      "The IRS generally requires retaining receipts and documentation for at least 3 years from the date you filed your tax return. However, if you claim a loss from worthless securities or bad debt, retain records for 7 years. Expenseliy lets you organize receipts by tax year folders for permanent archiving.",
  },
  {
    question: "What makes a digital receipt valid for tax deductions?",
    answer:
      "According to IRS Rev. Proc. 97-22, digital records are valid if they clearly show the vendor, transaction date, items purchased, and amount paid, and can be retrieved easily in the event of an audit.",
  },
  {
    question: "Can I export all receipts for a specific tax year to CSV?",
    answer:
      "Yes. You can select any tax year (2026, 2025, 2024) and download a comprehensive tax deduction package including itemized CSVs and aggregated Schedule C summary breakdowns.",
  },
];

export default function ReceiptTrackerForTaxesPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Free Receipt Tracker for Taxes – Organize Receipts Online",
    description:
      "Keep your tax-related receipts organized by year, category, merchant and expense amount. Scan receipts and export your records when you need them.",
    url: "/receipt-tracker-for-taxes",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Tax Receipt Tracker", url: "/receipt-tracker-for-taxes" },
  ]);

  const faqSchema = getFAQSchema(FAQS);

  const howToSchema = getHowToSchema({
    name: "How to Build a Multi-Year Tax Receipt Archive",
    description:
      "A step-by-step guide to archiving tax-deductible receipts and generating audit-ready records.",
    steps: [
      {
        name: "Create Tax Year Folders",
        text: "Segment incoming receipts by tax filing year (2026, 2025, 2024).",
      },
      {
        name: "Verify Schedule C Deductions",
        text: "Ensure all business purchases are assigned legitimate tax deduction categories.",
      },
      {
        name: "Calculate Annual Deductible Totals",
        text: "Track gross business expenses and adjusted deductible totals (applying 50% meal limits).",
      },
      {
        name: "Download Annual Tax Package",
        text: "Export the full tax summary CSV and receipt statement for your CPA.",
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
              { name: "Tax Receipt Tracker", url: "/receipt-tracker-for-taxes" },
            ]}
            className="mb-6"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-sky-bg text-sky border border-sky-border text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <FolderArchive className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Tax Archive & Ledger</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4 leading-tight">
              Free Receipt Tracker for Taxes – Organize Receipts Online
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-6">
              Keep your tax-related receipts organized by tax year, category, vendor, and expense
              amount. Scan receipts with OCR and export CPA-ready tax records whenever you need
              them.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-sky" />
                <span>Multi-Year Tax Archives</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-sky" />
                <span>Audit-Ready Schedule C Export</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>100% Free & Private</span>
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* Interactive Tool Section */}
      <section className="py-10 sm:py-14 bg-canvas flex-1 border-b border-hairline">
        <Container size="default">
          <UnifiedReceiptEngine
            variant="taxes-tracker"
            initialTab="tax"
            customHeadline="Tax Receipt Ledger & Archival Hub"
            customSubheadline="Explore tax year archives, review Schedule C deduction calculations, and export comprehensive tax packages."
            highlightFeatures={[
              "Tax-year folder archives (2026, 2025, 2024)",
              "Automated Schedule C deduction breakdown",
              "Multi-criteria merchant & category filters",
              "Total deductible expense calculations",
              "IRS Rev. Proc. 97-22 compliant records",
              "Export Tax Summary CSV & PDF packages",
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
                Tax Recordkeeping Guide
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-4">
                Receipt Tracking for Taxes: What Records Should You Keep?
              </h2>
              <p className="leading-relaxed">
                When filing personal or small business tax returns, maintaining clear proof of every
                deduction claimed protects your business from costly penalties. Understanding what
                the IRS requires for documentation ensures you never lose a deduction.
              </p>
            </div>

            <h3 className="text-xl font-bold text-ink mt-8 mb-3">
              The 4 Key Elements of Tax Receipt Proof
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6">
              <div className="p-4 rounded-xl bg-canvas border border-hairline">
                <h4 className="text-sm font-bold text-ink mb-1">1. Proof of Payee</h4>
                <p className="text-xs text-ink-secondary leading-relaxed">
                  The merchant or supplier name who received payment.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-canvas border border-hairline">
                <h4 className="text-sm font-bold text-ink mb-1">2. Transaction Date</h4>
                <p className="text-xs text-ink-secondary leading-relaxed">
                  Date must fall within the taxable year (e.g., Jan 1 - Dec 31, 2026).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-canvas border border-hairline">
                <h4 className="text-sm font-bold text-ink mb-1">3. Itemized Character of Expense</h4>
                <p className="text-xs text-ink-secondary leading-relaxed">
                  Clear description showing the expense was ordinary and necessary for business.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-canvas border border-hairline">
                <h4 className="text-sm font-bold text-ink mb-1">4. Proof of Payment</h4>
                <p className="text-xs text-ink-secondary leading-relaxed">
                  Credit card last 4 digits, electronic transfer record, or receipt stamp.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-canvas border border-hairline text-xs leading-relaxed text-ink-muted not-prose my-6">
              <strong>Disclaimer:</strong> Expenseliy provides recordkeeping and aggregation
              assistance. It does not provide certified legal, tax, or financial advice. Consult
              your certified CPA or tax advisor for specific deduction rules.
            </div>
          </article>
        </Container>
      </section>

      {/* Internal Linking Hub */}
      <section className="py-12 bg-canvas border-t border-hairline">
        <Container size="default">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-ink">
              Related Tax & Expense Tools
            </h3>
            <p className="text-xs sm:text-sm text-ink-secondary mt-1">
              Explore complementary tools in the Expenseliy suite.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/receipt-scanner-for-taxes"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Tax Receipt Scanner →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Scan receipts and isolate Schedule C write-offs.
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
              href="/receipt-scanner-for-small-business"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Small Business Scanner →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Scan vendor receipts and export monthly books.
              </p>
            </Link>

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
              Learn how to track tax receipts and generate audit-ready packages.
            </p>
          </div>

          <FAQAccordion items={FAQS} />
        </Container>
      </section>

      {/* CTA */}
      <CTASection
        title="Archive Your Tax Receipts with Expenseliy"
        description="Never stress about tax season again. Organize receipts by tax year and export CPA-ready packages."
        badgeText="Start Tax Tracker"
      />
    </div>
  );
}
