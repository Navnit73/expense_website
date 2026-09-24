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
  Globe,
  Sparkles,
  ShieldCheck,
  Zap,
  Printer,
  FileSpreadsheet,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Free Online Receipt Generator – Create Receipts in Seconds",
  description:
    "Free online receipt generator by Expenseliy. Create, customize, download, and print professional receipts for business transactions, payments, and cash sales.",
  path: "/online-receipt-generator",
  keywords: [
    "free online receipt generator",
    "online receipt generator",
    "receipt generator",
    "create receipt online",
    "free receipt maker online",
    "instant receipt generator",
  ],
});

const FAQS: FAQItem[] = [
  {
    question: "Can I use this receipt generator to replace lost receipts for accounting?",
    answer:
      "Yes. If you made a legitimate business purchase but misplaced the original paper slip, this generator lets you recreate an accurate, itemized proof of transaction for internal bookkeeping records.",
  },
  {
    question: "Can I choose between full-page and thermal POS receipt designs?",
    answer:
      "Yes. Switch to 'Thermal POS Receipt' under the Design Theme dropdown to create an authentic cash register receipt, or choose modern full-page layouts.",
  },
];

export default function OnlineReceiptGeneratorPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Free Online Receipt Generator – Create Receipts in Seconds",
    description:
      "Free online receipt generator. Create, customize, download, and print professional receipts with Expenseliy.",
    url: "/online-receipt-generator",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Online Receipt Generator", url: "/online-receipt-generator" },
  ]);

  const faqSchema = getFAQSchema(FAQS);

  const howToSchema = getHowToSchema({
    name: "How to Generate a Receipt Online",
    description: "Step-by-step instructions to create an online receipt.",
    steps: [
      { name: "Enter Seller Information", text: "Add your store name, address, and phone number." },
      { name: "Add Line Items & Tax", text: "List items, quantities, prices, and tax rates." },
      { name: "Download PDF", text: "Export the clean receipt with a single click." },
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
              { name: "Online Receipt Generator", url: "/online-receipt-generator" },
            ]}
            className="mb-6"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-income-bg text-income border border-income-border text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <Globe className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Free Online Tool</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4 leading-tight">
              Free Online Receipt Generator – Create Receipts in Seconds
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-6">
              Create, customize, download, and print receipts for business sales, cash payments,
              and reimbursements. Free with zero signup and no watermarks.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>100% Free Forever</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Printer className="w-4 h-4 text-primary" />
                <span>Print & PDF Ready</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-primary" />
                <span>Instant In-Browser Creation</span>
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
            customHeadline="Online Receipt Generator"
            customSubheadline="Enter receipt items below and download a formatted PDF receipt."
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
              Explore complementary tools in the Expenseliy suite.
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
              Learn how to generate receipts online for free.
            </p>
          </div>

          <FAQAccordion items={FAQS} />
        </Container>
      </section>

      {/* CTA */}
      <CTASection
        title="Generate Online Receipts Instantly"
        description="Fast, reliable, and free receipt creation for all your business transactions."
        badgeText="Generate Receipt"
      />
    </div>
  );
}
