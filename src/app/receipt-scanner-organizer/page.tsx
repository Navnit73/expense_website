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
  FolderTree,
  Scan,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Layers,
  CopyX,
  Filter,
  ArrowUpDown,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Receipt Scanner & Organizer – Scan, Sort & Store Receipts",
  description:
    "Scan receipts and automatically sort and organize them by merchant, date, category, and expense amount with duplicate detection in Expenseliy.",
  path: "/receipt-scanner-organizer",
  keywords: [
    "receipt scanner and organizer",
    "scan sort store receipts",
    "receipt organizing software",
    "auto categorize receipts",
    "receipt filing system",
    "digital receipt storage",
  ],
});

const FAQS: FAQItem[] = [
  {
    question: "What is the difference between a receipt scanner and a receipt organizer?",
    answer:
      "A simple receipt scanner merely converts a photo of a receipt into text or an image file. A receipt organizer (like Expenseliy) goes much further: it extracts structured financial data, identifies vendor relationships, flags potential duplicate charges, assigns tax categories, and generates monthly aggregate reports.",
  },
  {
    question: "How does automatic duplicate detection work?",
    answer:
      "When a receipt is scanned, Expenseliy checks your existing ledger for transactions with matching merchant names, identical dates, and totals within $0.05. If a match is found, an alert is triggered to prevent duplicate accounting entries.",
  },
  {
    question: "Can I organize receipts by vendor or client project?",
    answer:
      "Yes. You can filter and group your ledger by merchant name or assign custom project tags (e.g., #client-apex, #office-remodel) to easily separate and organize specific groups of expenses.",
  },
  {
    question: "Can I export organized receipt folders to CSV?",
    answer:
      "Yes. You can export filtered subsets or your entire organized ledger to clean CSV spreadsheets with full itemized headers for tax preparation and bookkeeping.",
  },
];

export default function ReceiptScannerOrganizerPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Receipt Scanner & Organizer – Scan, Sort & Store Receipts",
    description:
      "Scan receipts and automatically organize them by merchant, date, category and expense amount.",
    url: "/receipt-scanner-organizer",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Receipt Scanner & Organizer", url: "/receipt-scanner-organizer" },
  ]);

  const faqSchema = getFAQSchema(FAQS);

  const howToSchema = getHowToSchema({
    name: "How to Scan, Sort, and Store Receipts Digitally",
    description:
      "A streamlined 4-step workflow to organize your financial receipts without paper clutter.",
    steps: [
      {
        name: "Scan & OCR Ingestion",
        text: "Upload receipt image or capture directly with your camera for instant data extraction.",
      },
      {
        name: "Automatic Categorization & Grouping",
        text: "The organizer automatically sorts by category (Meals, Supplies, Travel) and identifies the vendor.",
      },
      {
        name: "Check Duplicate Alerts",
        text: "Review automated duplicate warnings to ensure no double-billed expenses enter your records.",
      },
      {
        name: "Store in Structured Ledger",
        text: "Save to your local organized database and export filtered reports whenever needed.",
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
              { name: "Receipt Scanner & Organizer", url: "/receipt-scanner-organizer" },
            ]}
            className="mb-6"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-income-bg text-income border border-income-border text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <FolderTree className="w-3.5 h-3.5" aria-hidden="true" />
              <span>All-In-One Scanner & Organizer</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4 leading-tight">
              Receipt Scanner & Organizer – Scan, Sort & Store Receipts
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-6">
              Scan receipts and automatically organize them by merchant, transaction date, expense
              category, and amount. Built-in duplicate detection and folder filtering keep your
              financial records immaculate.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
              <div className="flex items-center gap-1.5">
                <CopyX className="w-4 h-4 text-primary" />
                <span>Duplicate Detection Engine</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-primary" />
                <span>Multi-Category Sorting</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>Encrypted Local Storage</span>
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* Interactive Tool Section */}
      <section className="py-10 sm:py-14 bg-canvas flex-1 border-b border-hairline">
        <Container size="default">
          <UnifiedReceiptEngine
            variant="organizer"
            initialTab="tracker"
            customHeadline="Receipt Scanner & Organizer Workspace"
            customSubheadline="Scan new receipts or manage your organized ledger with category grouping and duplicate detection."
            highlightFeatures={[
              "OCR extraction with confidence scoring",
              "Automatic category classification",
              "Merchant and date grouping",
              "Duplicate receipt detection alerts",
              "Custom project tags (#client, #equipment)",
              "Export to CSV & PDF reports",
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
                Comparison Guide
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-4">
                Receipt Scanner vs Receipt Organizer: What Do You Actually Need?
              </h2>
              <p className="leading-relaxed">
                Many users search for a "receipt scanner" when what they truly need is a "receipt
                organizer." Understanding the distinction between raw image scanning and structured
                organization can save you countless hours of bookkeeping headache.
              </p>
            </div>

            {/* Comparison Table */}
            <div className="overflow-x-auto not-prose my-6 rounded-2xl border border-hairline">
              <table className="w-full text-xs text-left">
                <thead className="bg-canvas border-b border-hairline text-ink font-bold font-mono">
                  <tr>
                    <th className="p-3.5">Feature / Capability</th>
                    <th className="p-3.5 text-ink-muted">Basic Receipt Scanner</th>
                    <th className="p-3.5 text-primary">Expenseliy Scanner & Organizer</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-hairline">
                  <tr>
                    <td className="p-3.5 font-semibold text-ink">Image Capture</td>
                    <td className="p-3.5 text-ink-muted">Saves as loose PDF/JPG</td>
                    <td className="p-3.5 text-ink font-medium">Binarized OCR + local thumbnail cache</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-ink">Data Extraction</td>
                    <td className="p-3.5 text-ink-muted">Raw unstructured text</td>
                    <td className="p-3.5 text-ink font-medium">Auto-parsed Vendor, Date, Tax, Total</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-ink">Categorization</td>
                    <td className="p-3.5 text-ink-muted">None (Manual folder naming)</td>
                    <td className="p-3.5 text-ink font-medium">Automated IRS Schedule C Taxonomy</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-ink">Duplicate Detection</td>
                    <td className="p-3.5 text-ink-muted">Not supported</td>
                    <td className="p-3.5 text-income font-bold">Real-time matching & warning alert</td>
                  </tr>
                  <tr>
                    <td className="p-3.5 font-semibold text-ink">Analytics & Reporting</td>
                    <td className="p-3.5 text-ink-muted">None</td>
                    <td className="p-3.5 text-ink font-medium">Monthly variance & category progress</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-xl font-bold text-ink mt-8 mb-3">
              Why Duplicate Detection is Critical
            </h3>
            <p>
              When handling multiple receipts—especially for business travel where an employee might
              snap a paper receipt and also receive an automated email confirmation from the
              hotel—duplicate entries are the #1 cause of overreported expenses and messy bank
              reconciliations. Expenseliy's organizer automatically scans for matching dates,
              vendors, and dollar amounts, preventing duplicate records before they hit your ledger.
            </p>
          </article>
        </Container>
      </section>

      {/* Internal Linking Hub */}
      <section className="py-12 bg-canvas border-t border-hairline">
        <Container size="default">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-ink">
              Related Receipt & Organization Tools
            </h3>
            <p className="text-xs sm:text-sm text-ink-secondary mt-1">
              Explore complementary tools in the Expenseliy suite.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/receipt-tracker"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Receipt Tracker →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Track and monitor your receipt timeline over time.
              </p>
            </Link>

            <Link
              href="/receipt-scanner-that-categorizes"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Receipt Categorizer →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Intelligent automatic categorization for receipts.
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
                Group receipts by tax year and deduction rules.
              </p>
            </Link>

            <Link
              href="/receipt-scanner-app"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Receipt Scanner App →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Scan receipts with your mobile camera on the go.
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
              Everything you need to know about scanning and organizing receipts.
            </p>
          </div>

          <FAQAccordion items={FAQS} />
        </Container>
      </section>

      {/* CTA */}
      <CTASection
        title="Organize Your Receipts Effortlessly"
        description="Transform messy receipt stacks into a structured, searchable financial archive in seconds."
        badgeText="Try Scanner & Organizer"
      />
    </div>
  );
}
