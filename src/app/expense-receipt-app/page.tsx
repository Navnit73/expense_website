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
  FileText,
  Scan,
  Sparkles,
  ShieldCheck,
  Receipt,
  CreditCard,
  Printer,
  ArrowRight,
  FileCheck,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Expense Receipt App – Scan Receipts & Track Expenses",
  description:
    "Convert paper and digital receipts into itemized expenses. Scan receipts with OCR, capture payment methods, and generate instant expense reports with Expenseliy.",
  path: "/expense-receipt-app",
  keywords: [
    "expense receipt app",
    "scan receipts and track expenses",
    "receipt to expense report",
    "expense claims receipt scanner",
    "itemized receipt expense tracker",
    "employee reimbursement receipt app",
  ],
});

const FAQS: FAQItem[] = [
  {
    question: "How does the app turn receipts into expense reports?",
    answer:
      "When you scan a receipt, the OCR engine extracts the vendor, date, payment method, and amount. Expenseliy automatically formats this data into a standardized expense record that can be aggregated into printable PDF expense sheets or CSV claims.",
  },
  {
    question: "Can I record payment methods (Visa, Amex, Apple Pay, Cash)?",
    answer:
      "Yes. The OCR scanner automatically recognizes card types and last 4 digits (e.g., 'Visa *4921', 'Amex *1004') from the payment line at the bottom of the receipt.",
  },
  {
    question: "Can I use this for client reimbursable expenses?",
    answer:
      "Yes. Add project tags like #client-acme or #reimbursable. You can then filter by that tag and download a dedicated expense statement for invoicing.",
  },
];

export default function ExpenseReceiptAppPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Expense Receipt App – Scan Receipts & Track Expenses",
    description:
      "Convert receipts into organized expenses. Scan a receipt, automatically extract the details and add it to your expense tracker.",
    url: "/expense-receipt-app",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Expense Receipt App", url: "/expense-receipt-app" },
  ]);

  const faqSchema = getFAQSchema(FAQS);

  const howToSchema = getHowToSchema({
    name: "How to Turn Receipts Into Expense Reports Automatically",
    description:
      "A 4-step workflow to digitize receipts and generate professional expense reimbursement reports.",
    steps: [
      {
        name: "Scan Receipt Image",
        text: "Upload receipt image or capture photo using the mobile camera tool.",
      },
      {
        name: "Auto-Extract Expense Details",
        text: "Extract merchant, transaction date, subtotal, tax amount, and payment method.",
      },
      {
        name: "Assign Category & Client Tag",
        text: "Select category (Meals, Travel, Software) and attach client project tags (#reimbursable).",
      },
      {
        name: "Generate & Export Report",
        text: "Download formatted CSV or print clean PDF expense reports for submission.",
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
              { name: "Expense Receipt App", url: "/expense-receipt-app" },
            ]}
            className="mb-6"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-income-bg text-income border border-income-border text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <FileText className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Expense & Reimbursement Tool</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4 leading-tight">
              Expense Receipt App – Scan Receipts & Track Expenses
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-6">
              Convert raw receipts into organized business expenses. Scan receipts with OCR, capture
              payment methods, attach reimbursable client tags, and generate clean expense reports.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
              <div className="flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-primary" />
                <span>Payment Method Detection</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Printer className="w-4 h-4 text-primary" />
                <span>Printable Expense Sheets</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>100% Client-Side Privacy</span>
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* Interactive Tool Section */}
      <section className="py-10 sm:py-14 bg-canvas flex-1 border-b border-hairline">
        <Container size="default">
          <UnifiedReceiptEngine
            variant="expense-app"
            initialTab="scan"
            customHeadline="Expense Receipt Scanning & Reporting Tool"
            customSubheadline="Scan receipts, review payment details, and compile professional expense reports in seconds."
            highlightFeatures={[
              "Instant OCR receipt scanning",
              "Payment method detection (Visa, Amex, Apple Pay)",
              "Reimbursable project tags (#client-travel)",
              "Itemized financial balancing",
              "Printable PDF expense statements",
              "Download CSV reimbursement claims",
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
                Workflow Guide
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-4">
                How to Turn Receipts Into Expense Reports Automatically
              </h2>
              <p className="leading-relaxed">
                Whether you are a freelance consultant submitting reimbursable bills to clients or an
                employee submitting monthly expense claims to finance, turning a stack of receipts
                into a verified expense report is traditionally painful. Automating this conversion
                eliminates math errors and speeds up approval times.
              </p>
            </div>

            <h3 className="text-xl font-bold text-ink mt-8 mb-3">
              Essential Fields for Audit-Ready Expense Reports
            </h3>
            <p>
              Corporate finance teams and tax authorities require specific information on every
              expense claim:
            </p>

            <ul className="space-y-2.5 my-4">
              <li>
                <strong>Merchant Name & Location:</strong> Establishes who received the funds.
              </li>
              <li>
                <strong>Transaction Date:</strong> Validates that the expense occurred within the
                active billing or project cycle.
              </li>
              <li>
                <strong>Itemized Breakdown:</strong> Shows specific goods/services purchased
                (distinguishing lodging vs meals).
              </li>
              <li>
                <strong>Sales Tax / VAT:</strong> Necessary for calculating deductible tax write-offs
                or VAT reclamation.
              </li>
              <li>
                <strong>Payment Method & Card Last 4:</strong> Proves personal outlay vs company
                credit card usage.
              </li>
            </ul>
          </article>
        </Container>
      </section>

      {/* Internal Linking Hub */}
      <section className="py-12 bg-canvas border-t border-hairline">
        <Container size="default">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-ink">
              Related Receipt & Expense Tools
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
                Track vendor purchases and team expenses.
              </p>
            </Link>

            <Link
              href="/receipt-scanner-for-taxes"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Tax Receipt Scanner →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Organize tax receipts for Schedule C write-offs.
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
              Everything you need to know about generating expense reports from receipts.
            </p>
          </div>

          <FAQAccordion items={FAQS} />
        </Container>
      </section>

      {/* CTA */}
      <CTASection
        title="Automate Your Expense Reports with Expenseliy"
        description="Scan paper receipts, extract payment data, and export clean PDF reports with zero hassle."
        badgeText="Try Expense Receipt App"
      />
    </div>
  );
}
