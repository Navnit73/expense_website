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
  Sparkles,
  Scan,
  Tag,
  ShieldCheck,
  Layers,
  ArrowRight,
  Cpu,
  BrainCircuit,
  CheckCircle2,
  PieChart,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Receipt Scanner That Automatically Categorizes Expenses",
  description:
    "Scan receipts and automatically categorize expenses with intelligent OCR merchant recognition. Group food, travel, software, and supplies automatically in Expenseliy.",
  path: "/receipt-scanner-that-categorizes",
  keywords: [
    "receipt scanner that categorizes",
    "automatic receipt categorization",
    "auto categorize receipts online",
    "intelligent expense classification",
    "merchant recognition receipt ocr",
    "smart receipt categorizer",
  ],
});

const FAQS: FAQItem[] = [
  {
    question: "How does the receipt scanner automatically categorize expenses?",
    answer:
      "Expenseliy uses a hybrid natural language heuristic engine. When a receipt is scanned, it analyzes vendor names (e.g. Starbucks → Food & Dining, AWS → Software, Delta → Travel) and line item keywords (e.g. 'toner', 'unleaded', 'prescription') to match standard Chart of Accounts categories with over 96% accuracy.",
  },
  {
    question: "Can I manually override or change an assigned category?",
    answer:
      "Yes. The inline verification modal lets you adjust any category dropdown in 1 click before saving to your ledger.",
  },
  {
    question: "What standard expense categories are included?",
    answer:
      "Expenseliy includes Food & Dining, Travel & Lodging, Office & Supplies, Software & SaaS, Utilities & Internet, Shopping & Equipment, Healthcare & Medical, Transportation & Gas, Advertising & Marketing, Legal & Professional, Repairs & Maintenance, and Entertainment.",
  },
];

export default function ReceiptScannerThatCategorizesPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Receipt Scanner That Automatically Categorizes Expenses",
    description:
      "Scan a receipt and automatically categorize the expense using receipt OCR and intelligent expense classification.",
    url: "/receipt-scanner-that-categorizes",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Receipt Scanner That Categorizes", url: "/receipt-scanner-that-categorizes" },
  ]);

  const faqSchema = getFAQSchema(FAQS);

  const howToSchema = getHowToSchema({
    name: "How Automatic Expense Categorization Works",
    description:
      "A 4-step breakdown of how OCR character extraction maps receipts to financial categories.",
    steps: [
      {
        name: "Scan & OCR Ingestion",
        text: "Upload receipt image or capture photo to extract raw text lines and headers.",
      },
      {
        name: "Merchant & Keyword Matching",
        text: "The classifier cross-references vendor dictionaries and item keywords.",
      },
      {
        name: "Taxonomy & Tax Category Assignment",
        text: "Assigns both high-level expense category and IRS Schedule C tax line.",
      },
      {
        name: "User Confirmation",
        text: "Review confidence rating and confirm or adjust category with 1 click.",
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
              { name: "Auto Categorizer", url: "/receipt-scanner-that-categorizes" },
            ]}
            className="mb-6"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-income-bg text-income border border-income-border text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <BrainCircuit className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Intelligent Categorization Engine</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4 leading-tight">
              Receipt Scanner That Automatically Categorizes Expenses
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-6">
              Scan receipts and automatically categorize your expenses using intelligent OCR merchant
              recognition. Group Food & Dining, Travel, Software, Office Supplies, and Utilities
              with zero manual sorting.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>96%+ Auto-Classification Rate</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Layers className="w-4 h-4 text-primary" />
                <span>12 Standard Expense Taxonomies</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>Client-Side Machine Heuristics</span>
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* Interactive Tool Section */}
      <section className="py-10 sm:py-14 bg-canvas flex-1 border-b border-hairline">
        <Container size="default">
          <UnifiedReceiptEngine
            variant="categorizer"
            initialTab="scan"
            customHeadline="Auto-Categorizing Receipt Scanner"
            customSubheadline="Upload a receipt to watch the OCR classifier automatically detect the merchant and assign the correct expense category."
            highlightFeatures={[
              "Instant OCR text extraction",
              "Smart merchant recognition dictionary",
              "Auto-assigns Food, Travel, Software, Supplies, Utilities",
              "Schedule C tax deduction mapping",
              "1-Click category adjustment & user correction",
              "Export categorized CSV ledgers",
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
                Classification Mechanics
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-4">
                How Automatic Expense Categorization Works: Machine Learning & Heuristics
              </h2>
              <p className="leading-relaxed">
                Categorizing business expenses by hand is one of the most tedious parts of
                bookkeeping. Automatic expense categorization combines computer vision, optical
                character recognition, and token-based entity matching to map raw receipt text into
                standard accounting categories.
              </p>
            </div>

            <h3 className="text-xl font-bold text-ink mt-8 mb-3">
              The 3 Layers of Expense Classification
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 not-prose my-6">
              <div className="p-4 rounded-xl bg-canvas border border-hairline">
                <div className="text-xs font-mono font-bold text-income mb-1">Layer 1</div>
                <h4 className="text-sm font-bold text-ink mb-1">Merchant Dictionary</h4>
                <p className="text-xs text-ink-secondary leading-relaxed">
                  Identifies known corporate brands (e.g. AWS → Software & SaaS; Delta → Travel;
                  Starbucks → Food & Dining).
                </p>
              </div>

              <div className="p-4 rounded-xl bg-canvas border border-hairline">
                <div className="text-xs font-mono font-bold text-sky mb-1">Layer 2</div>
                <h4 className="text-sm font-bold text-ink mb-1">Line-Item Token NLP</h4>
                <p className="text-xs text-ink-secondary leading-relaxed">
                  Scans itemized descriptions for keywords like 'toner', 'unleaded', 'prescription',
                  or 'hotel night'.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-canvas border border-hairline">
                <div className="text-xs font-mono font-bold text-warning mb-1">Layer 3</div>
                <h4 className="text-sm font-bold text-ink mb-1">Tax Code Mapping</h4>
                <p className="text-xs text-ink-secondary leading-relaxed">
                  Maps the final category to IRS Schedule C lines (e.g. Line 24b Meals 50%, Line 18
                  Office Expense).
                </p>
              </div>
            </div>
          </article>
        </Container>
      </section>

      {/* Internal Linking Hub */}
      <section className="py-12 bg-canvas border-t border-hairline">
        <Container size="default">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-ink">
              Related Categorization & Expense Tools
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
              Learn how automated receipt categorization simplifies bookkeeping.
            </p>
          </div>

          <FAQAccordion items={FAQS} />
        </Container>
      </section>

      {/* CTA */}
      <CTASection
        title="Stop Categorizing Receipts by Hand"
        description="Let Expenseliy's OCR categorization engine automatically classify your expenses in seconds."
        badgeText="Try Auto Categorizer"
      />
    </div>
  );
}
