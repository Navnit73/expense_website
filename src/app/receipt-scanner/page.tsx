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
  Scan,
  Sparkles,
  ShieldCheck,
  Zap,
  FileSpreadsheet,
  CheckCircle2,
  ArrowRight,
  Cpu,
  Layers,
  Search,
  Eye,
  Lock,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Free Receipt Scanner – Extract Receipt Data Automatically",
  description:
    "Scan receipts online with free client-side OCR. Extract merchant name, date, subtotal, tax, and total automatically, then save or export to CSV with Expenseliy.",
  path: "/receipt-scanner",
  keywords: [
    "free receipt scanner",
    "receipt ocr online",
    "extract receipt data automatically",
    "scan receipt to csv",
    "receipt scanner free online",
    "receipt text extractor",
    "scan paper receipts",
  ],
});

const FAQS: FAQItem[] = [
  {
    question: "How does the free online receipt scanner work?",
    answer:
      "Expenseliy uses browser-based Optical Character Recognition (OCR) to analyze the image of your paper or digital receipt. It scans lines of text, identifies vendor names, transaction dates, subtotals, sales tax, tips, and totals, and structures them into editable data fields automatically.",
  },
  {
    question: "Is my receipt data private and secure?",
    answer:
      "Yes, 100%. Our receipt engine runs client-side inside your browser. Your receipt images and extracted financial data are not uploaded to public cloud servers or sold to third parties.",
  },
  {
    question: "Can I scan receipts using my mobile camera?",
    answer:
      "Yes! Click the 'Use Phone / Web Camera' button to open your device camera, align your receipt within the viewfinder, and capture it. The engine will automatically enhance contrast and extract data instantly.",
  },
  {
    question: "What file formats are supported?",
    answer:
      "You can upload JPG, PNG, WebP, and scanned digital documents. You can also test drive the tool with our 1-click preloaded sample receipts (Starbucks, Office Depot, Delta, AWS, and more).",
  },
  {
    question: "Can I export extracted receipts to Excel or CSV?",
    answer:
      "Yes. Once your receipts are scanned and verified, you can download a complete CSV spreadsheet formatted for accounting software like QuickBooks, Xero, or Excel, or generate a printable expense sheet.",
  },
];

export default function ReceiptScannerPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Free Receipt Scanner – Extract Receipt Data Automatically",
    description:
      "Scan receipts online with OCR. Extract merchant name, date, subtotal, tax and total automatically, then save or export with Expenseliy.",
    url: "/receipt-scanner",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Receipt Scanner", url: "/receipt-scanner" },
  ]);

  const faqSchema = getFAQSchema(FAQS);

  const howToSchema = getHowToSchema({
    name: "How to Scan and Extract Data From Paper Receipts Online",
    description:
      "A 4-step tutorial to scan paper receipts, extract financial numbers with OCR, and export to CSV.",
    steps: [
      {
        name: "Upload or Capture Receipt",
        text: "Drag and drop your receipt image (JPG, PNG) or use your phone camera to capture a clear photo.",
      },
      {
        name: "Automatic OCR Extraction",
        text: "The engine runs optical character recognition to extract vendor, date, subtotal, sales tax, and total amount.",
      },
      {
        name: "Review & Refine Fields",
        text: "Inspect confidence ratings and edit any line item or add expense tags (#client, #travel).",
      },
      {
        name: "Save or Download CSV",
        text: "Save to your local Expenseliy ledger or export an instant CSV/PDF report.",
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

      {/* Hero Section */}
      <header className="bg-surface border-b border-hairline py-12 sm:py-16">
        <Container size="default">
          <Breadcrumbs
            items={[
              { name: "Tools", url: "/tools" },
              { name: "Receipt Scanner", url: "/receipt-scanner" },
            ]}
            className="mb-6"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-income-bg text-income border border-income-border text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <Scan className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Free OCR Web Utility</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4 leading-tight">
              Free Receipt Scanner – Extract Receipt Data Automatically
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-6">
              Scan paper receipts online with instant browser OCR. Extract merchant name, date,
              subtotal, tax, tip, and total automatically, then save your receipt and expense
              details in Expenseliy with zero latency.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>100% Client-Side Privacy</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-primary" />
                <span>Sub-Second OCR Parsing</span>
              </div>
              <div className="flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-primary" />
                <span>Instant CSV / PDF Download</span>
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* Interactive Tool Section */}
      <section className="py-10 sm:py-14 bg-canvas flex-1 border-b border-hairline">
        <Container size="default">
          <UnifiedReceiptEngine
            variant="scanner"
            initialTab="scan"
            customHeadline="Free Receipt OCR Scanner & Parser"
            customSubheadline="Drop a receipt image or take a photo with your camera to extract vendor, date, taxes, and totals instantly."
            highlightFeatures={[
              "Upload JPG / PNG / PDF",
              "Live Camera capture",
              "Automatic merchant & date detection",
              "Subtotal, tax, & total math balancing",
              "Confidence indicator & field editor",
              "Download CSV / Print PDF",
            ]}
          />
        </Container>
      </section>

      {/* Long-form SEO Content Section */}
      <section className="py-14 sm:py-20 bg-surface">
        <Container size="narrow">
          <article className="prose prose-sm sm:prose-base dark:prose-invert max-w-none space-y-8 text-ink-secondary">
            <div>
              <Badge variant="sky" size="sm" className="mb-3">
                In-Depth Technical Guide
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-4">
                How Receipt OCR Works: Extracting Expenses From Paper Receipts
              </h2>
              <p className="leading-relaxed">
                Paper receipts have historically been the single biggest bottleneck in personal
                budgeting and small business accounting. Faded thermal ink, crumpled pockets, and
                inconsistent vendor formatting create hours of tedious manual data entry.
                <strong> Optical Character Recognition (OCR)</strong> paired with heuristic natural
                language extraction transforms this process into a seamless 2-second workflow.
              </p>
            </div>

            {/* Architecture Steps Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 not-prose my-8">
              <div className="p-5 rounded-2xl bg-canvas border border-hairline flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-income-bg text-primary flex items-center justify-center font-bold mb-3 font-mono">
                    01
                  </div>
                  <h3 className="text-sm font-bold text-ink mb-1.5">Canvas Preprocessing</h3>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    Image filters normalize brightness, binarize high-contrast pixels, and correct
                    rotations so degraded thermal receipts become legible.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-canvas border border-hairline flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-sky-bg text-sky flex items-center justify-center font-bold mb-3 font-mono">
                    02
                  </div>
                  <h3 className="text-sm font-bold text-ink mb-1.5">OCR Text Bounding</h3>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    Tesseract neural workers recognize character glyphs and map them to spatial
                    lines, preserving horizontal alignment of items and prices.
                  </p>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-canvas border border-hairline flex flex-col justify-between">
                <div>
                  <div className="w-10 h-10 rounded-xl bg-warning-bg text-warning flex items-center justify-center font-bold mb-3 font-mono">
                    03
                  </div>
                  <h3 className="text-sm font-bold text-ink mb-1.5">Heuristic Entity Parser</h3>
                  <p className="text-xs text-ink-secondary leading-relaxed">
                    Regex rule engines isolate vendor names, format standard ISO dates, and verify
                    mathematical balance between Subtotal + Tax = Total.
                  </p>
                </div>
              </div>
            </div>

            <h3 className="text-xl font-bold text-ink mt-8 mb-3">
              Key Receipt Fields Extracted by Expenseliy
            </h3>
            <p>
              When a receipt is processed, the OCR engine looks for several distinct structural
              anchors to build a complete expense record:
            </p>

            <ul className="space-y-2.5 my-4">
              <li>
                <strong>Merchant Detection:</strong> Matches top-header lines against known retailer
                dictionaries (e.g. Starbucks, Office Depot, Shell, Delta, Amazon) or cleans header
                alphanumerics.
              </li>
              <li>
                <strong>Date Normalization:</strong> Identifies diverse date formats including{" "}
                <code>YYYY-MM-DD</code>, <code>MM/DD/YYYY</code>, <code>DD-MM-YYYY</code>, and
                alphabetic representations like <code>Sept 24, 2026</code>.
              </li>
              <li>
                <strong>Amount Breakdown:</strong> Extracts the highest terminal price as the Grand
                Total while independently isolating Sales Tax / VAT and Subtotal.
              </li>
              <li>
                <strong>Expense Categorization:</strong> Automatically infers whether the purchase
                is Food & Dining, Office Supplies, Travel, Software, or Gas.
              </li>
              <li>
                <strong>Confidence Scoring:</strong> Computes a mathematical confidence rating based
                on line quality and verifies whether <code>Subtotal + Tax == Total</code>.
              </li>
            </ul>

            {/* Example JSON output callout */}
            <div className="p-5 rounded-2xl bg-canvas border border-hairline not-prose my-6">
              <div className="flex items-center justify-between text-xs font-mono text-ink-muted mb-2">
                <span>Extracted Receipt Schema (JSON)</span>
                <span className="text-primary font-bold">98% Confidence</span>
              </div>
              <pre className="p-4 rounded-xl bg-surface border border-hairline font-mono text-xs text-ink overflow-x-auto leading-relaxed">
{`{
  "merchant": "Starbucks Coffee",
  "date": "2026-09-24",
  "subtotal": 8.50,
  "tax": 0.85,
  "total": 9.35,
  "currency": "USD",
  "category": "Food & Dining",
  "taxCategory": "Schedule C: Meals (50%)",
  "paymentMethod": "Apple Pay (Visa *4921)"
}`}
              </pre>
            </div>

            <h3 className="text-xl font-bold text-ink mt-8 mb-3">
              Why Browser-First Privacy Matters for Financial Receipts
            </h3>
            <p>
              Receipts contain sensitive personal data: credit card last 4 digits, home addresses,
              medical prescription details, and purchase timestamps. Unlike traditional legacy
              scanner apps that pipe your receipts to third-party databases, Expenseliy processes
              the OCR computation directly in your web browser. Your data remains strictly on your
              local device until you choose to export it.
            </p>
          </article>
        </Container>
      </section>

      {/* Internal Linking Hub */}
      <section className="py-12 bg-canvas border-t border-hairline">
        <Container size="default">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-ink">
              Explore Related Receipt & Expense Tools
            </h3>
            <p className="text-xs sm:text-sm text-ink-secondary mt-1">
              Streamline your complete bookkeeping workflow with specialized utilities.
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
                Organize purchase history and track monthly spending trends.
              </p>
            </Link>

            <Link
              href="/receipt-scanner-for-taxes"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Receipt Scanner for Taxes →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Isolate Schedule C write-offs and generate tax packages.
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
                Intelligent vendor mapping and custom category rules.
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
                Track vendor expenses and export team reimbursement sheets.
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
              Learn how our free receipt OCR scanner and export system works.
            </p>
          </div>

          <FAQAccordion items={FAQS} />
        </Container>
      </section>

      {/* CTA */}
      <CTASection
        title="Digitize All Your Paper Receipts with Expenseliy"
        description="Experience the speed of automated receipt extraction and intuitive ledger tracking. Zero signup required to test."
        badgeText="Start Scanning Free"
      />
    </div>
  );
}
