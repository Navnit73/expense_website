import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { UnifiedInvoiceEngine } from "@/components/invoice-engine/UnifiedInvoiceEngine";
import {
  createPageMetadata,
  getWebApplicationSchema,
  getBreadcrumbSchema,
  getFAQSchema,
  getHowToSchema,
} from "@/lib/seo";
import {
  Receipt,
  Sparkles,
  ShieldCheck,
  Zap,
  Printer,
  FileSpreadsheet,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Free Receipt Generator – Create Receipts Online",
  description:
    "Create and download printable receipts online with Expenseliy. Professional receipt creator with thermal receipt format, itemized totals, taxes, and instant PDF export.",
  path: "/receipt-generator",
  keywords: [
    "create receipt online",
    "receipt generator",
    "receipt creator",
    "receipt maker",
    "printable receipt generator",
    "free receipt maker online",
  ],
});

const FAQS: FAQItem[] = [
  {
    question: "Can I print thermal receipts with this generator?",
    answer:
      "Yes. Select the 'Thermal POS Receipt' template for a classic 80mm register receipt layout, perfect for retail, dining, and small shop point-of-sale transactions.",
  },
  {
    question: "Can I record sales tax and tips?",
    answer:
      "Yes. The receipt generator includes dedicated fields for sales tax percentages and gratuity/tips, calculating grand totals automatically.",
  },
];

export default function ReceiptGeneratorPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Free Receipt Generator – Create Receipts Online",
    description:
      "Create and download printable receipts online with Expenseliy. Professional receipt creator with thermal receipt format.",
    url: "/receipt-generator",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Receipt Generator", url: "/receipt-generator" },
  ]);

  const faqSchema = getFAQSchema(FAQS);

  const howToSchema = getHowToSchema({
    name: "How to Create a Receipt Online",
    description: "Step-by-step instructions to create and download custom receipts.",
    steps: [
      { name: "Add Store & Transaction Details", text: "Enter store name, date, and receipt number." },
      { name: "List Purchases", text: "Add items, quantities, and prices." },
      { name: "Download PDF Receipt", text: "Export the clean receipt for your customer." },
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
              { name: "Receipt Generator", url: "/receipt-generator" },
            ]}
            className="mb-6"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-income-bg text-income border border-income-border text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <Receipt className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Printable Receipt Creator</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4 leading-tight">
              Free Receipt Generator – Create Receipts Online
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-6">
              Create, customize, and print receipts online with zero signup. Professional receipt
              generator with thermal POS and full-page styles, itemized totals, and instant PDF
              export.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
              <div className="flex items-center gap-1.5">
                <Printer className="w-4 h-4 text-primary" />
                <span>Thermal & PDF Formats</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>100% Free & Private</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-primary" />
                <span>Instant Download</span>
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* Interactive Tool Section */}
      <section className="py-10 sm:py-14 bg-canvas flex-1 border-b border-hairline">
        <Container size="default">
          <UnifiedInvoiceEngine
            mode="receipt"
            initialType="receipt"
            customHeadline="Printable Receipt Generator"
            customSubheadline="Enter payment details and download a clean PDF receipt."
          />
        </Container>
      </section>

      {/* Internal Linking Hub */}
      <section className="py-12 bg-canvas border-t border-hairline">
        <Container size="default">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-ink">
              Related Receipt & Invoicing Tools
            </h3>
            <p className="text-xs sm:text-sm text-ink-secondary mt-1">
              Explore specialized tools in the Expenseliy suite.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/receipt-maker"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Receipt Maker →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Make custom payment receipts.
              </p>
            </Link>

            <Link
              href="/online-receipt-generator"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Online Receipt Generator →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Dedicated online receipt creator.
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
                Scan paper receipts with OCR.
              </p>
            </Link>

            <Link
              href="/invoice-generator"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Invoice Generator →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Create commercial client invoices.
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
              Learn how to create and download receipts online.
            </p>
          </div>

          <FAQAccordion items={FAQS} />
        </Container>
      </section>

      {/* CTA */}
      <CTASection
        title="Create and Print Receipts Effortlessly"
        description="Experience the fastest way to generate custom customer receipts with Expenseliy."
        badgeText="Create Receipt Now"
      />
    </div>
  );
}
