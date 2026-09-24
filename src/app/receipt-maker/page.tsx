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
  CreditCard,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Free Receipt Maker – Create & Download Payment Receipts",
  description:
    "Make professional payment receipts online with Expenseliy's free receipt maker. Customize business details, line items, taxes, payment methods, and download PDF instantly.",
  path: "/receipt-maker",
  keywords: [
    "receipt maker app",
    "receipt maker",
    "free receipt maker",
    "make your own receipt",
    "payment receipt generator",
    "create receipt pdf",
  ],
});

const FAQS: FAQItem[] = [
  {
    question: "What is a receipt maker used for?",
    answer:
      "A receipt maker generates official proof-of-payment documents given to customers after they have paid for goods or services. It records transaction dates, items purchased, taxes paid, and payment methods (Cash, Credit Card, Apple Pay).",
  },
  {
    question: "Can I choose thermal receipt or standard letter style?",
    answer:
      "Yes! You can choose the 'Thermal POS Receipt' template for an authentic compact register look, or modern styles for full-page PDF statements.",
  },
  {
    question: "Is this receipt maker completely free to use?",
    answer:
      "Yes, 100% free with no account creation or watermarks required.",
  },
];

export default function ReceiptMakerPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Free Receipt Maker – Create & Download Payment Receipts",
    description:
      "Make professional payment receipts online with Expenseliy. Customize business details, line items, taxes, and download PDF instantly.",
    url: "/receipt-maker",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Receipt Maker", url: "/receipt-maker" },
  ]);

  const faqSchema = getFAQSchema(FAQS);

  const howToSchema = getHowToSchema({
    name: "How to Make a Payment Receipt Online",
    description: "Step-by-step instructions to create and download payment receipts.",
    steps: [
      { name: "Enter Seller Information", text: "Add your store name and address." },
      { name: "Add Purchased Items & Taxes", text: "List items, rates, and sales tax rate." },
      { name: "Select Payment Method", text: "Specify Cash, Credit Card, or Apple Pay." },
      { name: "Download or Print", text: "Export the clean receipt as PDF." },
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
              { name: "Receipt Maker", url: "/receipt-maker" },
            ]}
            className="mb-6"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-income-bg text-income border border-income-border text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <Receipt className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Payment Receipt Maker</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4 leading-tight">
              Free Receipt Maker – Create & Download Payment Receipts
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-6">
              Make your own payment receipts online in seconds. Add business info, customer details,
              receipt numbers, taxes, and payment methods with instant PDF download.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
              <div className="flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-primary" />
                <span>Payment Method Capture</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Printer className="w-4 h-4 text-primary" />
                <span>Thermal & Full-Page Styles</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>No Watermarks</span>
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
            customHeadline="Interactive Receipt Maker"
            customSubheadline="Enter payment details below to generate a customer receipt."
          />
        </Container>
      </section>

      {/* Internal Linking Hub */}
      <section className="py-12 bg-canvas border-t border-hairline">
        <Container size="default">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-ink">
              Related Receipt & Billing Tools
            </h3>
            <p className="text-xs sm:text-sm text-ink-secondary mt-1">
              Explore specialized tools in the Expenseliy suite.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
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
              href="/receipt-generator"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Receipt Generator →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Generate printable receipts.
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
                Scan and extract data from paper receipts.
              </p>
            </Link>

            <Link
              href="/bill-maker"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Bill Maker →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Create customer purchase bills.
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
              Learn how to make payment receipts online.
            </p>
          </div>

          <FAQAccordion items={FAQS} />
        </Container>
      </section>

      {/* CTA */}
      <CTASection
        title="Make Your Payment Receipts in Seconds"
        description="Experience the easiest way to generate proof of payment receipts with Expenseliy."
        badgeText="Create Receipt Now"
      />
    </div>
  );
}
