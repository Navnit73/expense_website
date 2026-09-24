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
  FileCheck2,
  Scan,
  ShieldAlert,
  ShieldCheck,
  Calendar,
  DollarSign,
  Download,
  ArrowRight,
  Receipt,
  Scale,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Receipt Scanner for Taxes – Organize Tax Receipts",
  description:
    "Scan and organize receipts for tax preparation. Extract amounts, dates, and merchants, classify Schedule C write-offs, and export tax summaries with Expenseliy.",
  path: "/receipt-scanner-for-taxes",
  keywords: [
    "receipt scanner for taxes",
    "organize tax receipts",
    "tax receipt scanner free",
    "schedule c receipt scanner",
    "tax deduction receipt tracker",
    "scan receipts for tax season",
    "irs receipt organizer",
  ],
});

const FAQS: FAQItem[] = [
  {
    question: "How does the tax receipt scanner help prepare for tax season?",
    answer:
      "Expenseliy scans receipts with OCR, identifies tax-deductible categories (Schedule C Meals 50%, Office Expenses, Travel, Software), assigns tax years, and generates an aggregated Tax Deduction Summary CSV for your accountant.",
  },
  {
    question: "Does Expenseliy determine legal tax deductibility?",
    answer:
      "No. Expenseliy provides recordkeeping and optical character recognition assistance. Final determinations regarding tax deductibility under federal or state laws should be verified by you or your certified CPA/tax advisor.",
  },
  {
    question: "What IRS rules apply to digital scanned receipts?",
    answer:
      "Under IRS Revenue Procedure 97-22, electronic receipt records are legally valid provided they are legible, accurately reflect all line items, and can be retrieved during an audit. Expenseliy keeps structured digital records and timestamps for your records.",
  },
  {
    question: "How are 50% business meals handled?",
    answer:
      "Our tax summary engine automatically applies the standard 50% deduction limit to meals & entertainment categories while calculating 100% deductions for office supplies, software, and travel.",
  },
];

export default function ReceiptScannerForTaxesPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Receipt Scanner for Taxes – Organize Tax Receipts",
    description:
      "Scan and organize receipts for tax preparation. Extract amounts, dates and merchants and categorize receipts for easier record keeping.",
    url: "/receipt-scanner-for-taxes",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Receipt Scanner for Taxes", url: "/receipt-scanner-for-taxes" },
  ]);

  const faqSchema = getFAQSchema(FAQS);

  const howToSchema = getHowToSchema({
    name: "How to Organize Receipts for Tax Preparation",
    description:
      "A 4-step framework to digitize and categorize receipts for annual tax filings.",
    steps: [
      {
        name: "Scan Receipts by Tax Year",
        text: "Upload paper receipts and invoices, selecting the appropriate tax year (2026, 2025).",
      },
      {
        name: "Classify Business vs Personal",
        text: "Designate transactions as Schedule C Business or Personal non-deductible.",
      },
      {
        name: "Map to Tax Deduction Categories",
        text: "Assign specific Schedule C categories (Meals 50%, Office, Travel, Software, Healthcare HSA).",
      },
      {
        name: "Export Tax Summary Report",
        text: "Download an aggregated tax summary CSV and receipt ledger to hand to your CPA.",
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
              { name: "Receipt Scanner for Taxes", url: "/receipt-scanner-for-taxes" },
            ]}
            className="mb-6"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-sky-bg text-sky border border-sky-border text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <FileCheck2 className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Tax Recordkeeping Tool</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4 leading-tight">
              Receipt Scanner for Taxes – Organize Tax Receipts
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-6">
              Scan and organize receipts for tax preparation. Extract amounts, dates, and vendors,
              classify Schedule C business write-offs, and export audit-ready tax packages for your
              accountant.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
              <div className="flex items-center gap-1.5">
                <Scale className="w-4 h-4 text-sky" />
                <span>IRS Schedule C Categories</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Calendar className="w-4 h-4 text-sky" />
                <span>Tax Year Folders (2026/2025)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Download className="w-4 h-4 text-sky" />
                <span>Tax Summary CSV Export</span>
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* Interactive Tool Section */}
      <section className="py-10 sm:py-14 bg-canvas flex-1 border-b border-hairline">
        <Container size="default">
          <UnifiedReceiptEngine
            variant="taxes-scanner"
            initialTab="tax"
            customHeadline="Tax Preparation Receipt Workspace"
            customSubheadline="Isolate deductible business expenses, review Schedule C groupings, and export your annual tax ledger."
            highlightFeatures={[
              "OCR receipt extraction with tax amounts",
              "Tax-year selection (2026, 2025, 2024)",
              "Business vs personal classification",
              "IRS Schedule C deduction categories",
              "Meals 50% automated adjustment calculation",
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
                Tax Season Blueprint
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-4">
                How to Organize Receipts for Tax Season: A Complete Deduction Guide
              </h2>
              <p className="leading-relaxed">
                Tax season shouldn't mean drowning in paper clutter. For freelancers, independent
                contractors (1099), and small business owners, tracking receipts methodically
                throughout the year maximizes legitimate deductions and protects against audit
                disallowances.
              </p>
            </div>

            {/* Legal / Non-Advice Callout */}
            <div className="p-4 rounded-xl bg-canvas border border-hairline text-xs leading-relaxed text-ink-muted not-prose my-6">
              <strong>Important Tax Disclaimer:</strong> Expenseliy is a financial record-keeping
              and document digitization utility. Expenseliy does not provide legal, tax, or
              accounting advice. Always consult with a licensed CPA or tax professional to confirm
              deductibility for your specific business entity.
            </div>

            <h3 className="text-xl font-bold text-ink mt-8 mb-3">
              Standard IRS Schedule C Expense Categories
            </h3>
            <p>
              When organizing business receipts, mapping them to standard IRS Schedule C line items
              makes tax filing straightforward:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6">
              <div className="p-4 rounded-xl bg-canvas border border-hairline">
                <h4 className="text-xs font-bold text-ink mb-1">Line 24b: Business Meals (50%)</h4>
                <p className="text-xs text-ink-secondary">
                  Meals with clients or while traveling for business. Subject to the standard 50%
                  IRS limitation.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-canvas border border-hairline">
                <h4 className="text-xs font-bold text-ink mb-1">Line 18: Office Expense</h4>
                <p className="text-xs text-ink-secondary">
                  Stationery, printer supplies, workspace accessories, and standard postage.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-canvas border border-hairline">
                <h4 className="text-xs font-bold text-ink mb-1">Line 24a: Business Travel</h4>
                <p className="text-xs text-ink-secondary">
                  Airfare, train tickets, lodging, and airport transfers for out-of-town business
                  trips.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-canvas border border-hairline">
                <h4 className="text-xs font-bold text-ink mb-1">Line 8: Advertising & Marketing</h4>
                <p className="text-xs text-ink-secondary">
                  Digital ad spend (Google, Meta), domain renewals, email marketing tools, and
                  promotions.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-ink mt-8 mb-3">
              IRS Digital Record Retention: Rev. Proc. 97-22
            </h3>
            <p>
              Under IRS Revenue Procedure 97-22, digital scans are legally equivalent to paper
              originals as long as they reproduce all vital details clearly and can be readily
              indexed. Expenseliy's client-side archive ensures your scanned records meet legibility
              and metadata standards without risking third-party data breaches.
            </p>
          </article>
        </Container>
      </section>

      {/* Internal Linking Hub */}
      <section className="py-12 bg-canvas border-t border-hairline">
        <Container size="default">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-ink">
              Related Receipt & Tax Preparation Tools
            </h3>
            <p className="text-xs sm:text-sm text-ink-secondary mt-1">
              Explore complementary tools in the Expenseliy suite.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/receipt-tracker-for-taxes"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Tax Receipt Tracker →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Free tax receipt storage and multi-year folders.
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

            <Link
              href="/receipt-scanner-that-categorizes"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Auto Categorizer →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Intelligent vendor categorization and custom rules.
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
              Learn how to organize receipts and maximize write-offs for tax season.
            </p>
          </div>

          <FAQAccordion items={FAQS} />
        </Container>
      </section>

      {/* CTA */}
      <CTASection
        title="Get Your Tax Receipts Organized in Minutes"
        description="Extract totals, categorize Schedule C deductions, and export CPA-ready tax packages for free."
        badgeText="Start Tax Preparation"
      />
    </div>
  );
}
