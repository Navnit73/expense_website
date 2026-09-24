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
  Clock,
  Sparkles,
  ShieldCheck,
  Zap,
  Printer,
  FileSpreadsheet,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Free Invoice Creator – Create Invoices in Under 60 Seconds",
  description:
    "Create an invoice in under 60 seconds with Expenseliy's fast online invoice creator form. Free, simple, automated math, and instant PDF download.",
  path: "/invoice-creator",
  keywords: [
    "invoice creator free online",
    "create invoice form",
    "invoice creator",
    "create invoice online",
    "fast invoice maker",
    "instant invoice creator",
  ],
});

const FAQS: FAQItem[] = [
  {
    question: "How fast can I create an invoice with this creator?",
    answer:
      "Most users complete and download their first invoice in under 60 seconds. Our intuitive form auto-calculates line item amounts and provides instant live previews.",
  },
  {
    question: "Can I use the invoice creator on my phone or tablet?",
    answer:
      "Yes! Expenseliy is fully responsive and mobile-optimized, allowing you to create and email invoices directly from your smartphone.",
  },
  {
    question: "Can I add multiple line items and services?",
    answer:
      "Yes. Tap '+ Add Line Item' to create as many products or consulting services as you need with individual quantities and rates.",
  },
];

export default function InvoiceCreatorPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Free Invoice Creator – Create Invoices in Under 60 Seconds",
    description:
      "Create an invoice in under 60 seconds with Expenseliy's fast online invoice creator form.",
    url: "/invoice-creator",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Invoice Creator", url: "/invoice-creator" },
  ]);

  const faqSchema = getFAQSchema(FAQS);

  const howToSchema = getHowToSchema({
    name: "How to Create an Invoice in Under 60 Seconds",
    description: "Rapid guide to creating a quick client invoice.",
    steps: [
      { name: "Input Details", text: "Enter your business name and client name." },
      { name: "Type Line Items", text: "Add service description, quantity, and unit rate." },
      { name: "Click Print / PDF", text: "Download the formatted invoice PDF immediately." },
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
              { name: "Invoice Creator", url: "/invoice-creator" },
            ]}
            className="mb-6"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-income-bg text-income border border-income-border text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <Clock className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Under 60 Seconds</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4 leading-tight">
              Free Invoice Creator – Create Invoices in Under 60 Seconds
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-6">
              Create an invoice in under 60 seconds. Fast, frictionless, and completely free with
              automatic tax balancing and instant PDF export.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-primary" />
                <span>Instant Auto-Calculation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>No Registration Needed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Printer className="w-4 h-4 text-primary" />
                <span>One-Click Print / PDF</span>
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* Interactive Tool Section */}
      <section className="py-10 sm:py-14 bg-canvas flex-1 border-b border-hairline">
        <Container size="default">
          <UnifiedInvoiceEngine
            mode="invoice"
            initialType="invoice"
            customHeadline="Quick Invoice Creator Form"
            customSubheadline="Enter your invoice details below to generate an instant printable invoice."
          />
        </Container>
      </section>

      {/* Internal Linking Hub */}
      <section className="py-12 bg-canvas border-t border-hairline">
        <Container size="default">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-ink">
              Related Invoicing Utilities
            </h3>
            <p className="text-xs sm:text-sm text-ink-secondary mt-1">
              Explore specialized tools in the Expenseliy suite.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/invoice-generator"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Invoice Generator →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Full-featured online invoice creator.
              </p>
            </Link>

            <Link
              href="/invoice-maker"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Invoice Maker →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Custom invoice maker for small businesses.
              </p>
            </Link>

            <Link
              href="/invoice-pdf-generator"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                PDF Invoice Generator →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Download PDF invoices directly.
              </p>
            </Link>

            <Link
              href="/invoice-number-generator"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Number Generator →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Generate sequential invoice numbers.
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
              Learn how to create an invoice in under 60 seconds.
            </p>
          </div>

          <FAQAccordion items={FAQS} />
        </Container>
      </section>

      {/* CTA */}
      <CTASection
        title="Create Invoices in Under a Minute"
        description="Experience frictionless online invoicing with Expenseliy."
        badgeText="Create Invoice Now"
      />
    </div>
  );
}
