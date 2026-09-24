import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { InvoiceNumberGeneratorWidget } from "@/components/invoice-engine/InvoiceNumberGeneratorWidget";
import {
  createPageMetadata,
  getWebApplicationSchema,
  getBreadcrumbSchema,
  getFAQSchema,
  getHowToSchema,
} from "@/lib/seo";
import {
  Hash,
  Sparkles,
  ShieldCheck,
  Zap,
  Copy,
  ArrowRight,
  FileCheck2,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Free Invoice Number Generator – Sequential Numbering Tool",
  description:
    "Generate standardized sequential invoice numbers for your business. Customize prefixes, date stamps, padding digits, and export batch numbers with Expenseliy.",
  path: "/invoice-number-generator",
  keywords: [
    "invoice number generator",
    "generate invoice number",
    "invoice numbering system",
    "sequential invoice numbers",
    "invoice numbering format",
    "free invoice number generator",
  ],
});

const FAQS: FAQItem[] = [
  {
    question: "What is the best format for invoice numbers?",
    answer:
      "A best-practice invoice numbering format combines a clear prefix, the current year, and a padded sequential number (e.g., 'INV-2026-0001'). This ensures chronological sorting and prevents duplicate numbers across years.",
  },
  {
    question: "Why should I avoid starting at invoice #1?",
    answer:
      "Starting at #1 can make a new business or freelancer appear inexperienced to corporate clients. Starting at #1001 or #2026-0101 provides a polished, professional impression.",
  },
  {
    question: "Are sequential invoice numbers required by tax authorities?",
    answer:
      "Yes. Most tax authorities (including the IRS, HMRC, and EU VAT agencies) require invoices to follow a sequential, non-repeating numbering system to prevent undeclared income during audits.",
  },
];

export default function InvoiceNumberGeneratorPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Free Invoice Number Generator – Sequential Numbering Tool",
    description:
      "Generate standardized sequential invoice numbers for your business with Expenseliy.",
    url: "/invoice-number-generator",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Invoice Number Generator", url: "/invoice-number-generator" },
  ]);

  const faqSchema = getFAQSchema(FAQS);

  const howToSchema = getHowToSchema({
    name: "How to Generate Sequential Invoice Numbers",
    description: "Create an audit-compliant numbering scheme for your invoices.",
    steps: [
      { name: "Select Prefix & Year Format", text: "Choose a prefix (INV, BILL, REC) and year tag (YYYY)." },
      { name: "Set Starting Number & Padding", text: "Choose starting integer (e.g. 1001) and zero padding (0001)." },
      { name: "Copy Generated Batch", text: "Copy the sequential list to clipboard or start an invoice directly." },
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
              { name: "Invoice Number Generator", url: "/invoice-number-generator" },
            ]}
            className="mb-6"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-income-bg text-income border border-income-border text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <Hash className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Numbering Utility</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4 leading-tight">
              Free Invoice Number Generator – Sequential Tool
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-6">
              Generate standardized, sequential, audit-compliant invoice numbers for your business.
              Customize prefixes, year formatting, padding digits, and batch numbers.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>IRS & VAT Audit Compliant</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Copy className="w-4 h-4 text-primary" />
                <span>One-Click Batch Copy</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-primary" />
                <span>100% Free Web Utility</span>
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* Interactive Tool Section */}
      <section className="py-10 sm:py-14 bg-canvas flex-1 border-b border-hairline">
        <Container size="default">
          <InvoiceNumberGeneratorWidget />
        </Container>
      </section>

      {/* Internal Linking Hub */}
      <section className="py-12 bg-canvas border-t border-hairline">
        <Container size="default">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-ink">
              Create Complete Invoices With Your Generated Numbers
            </h3>
            <p className="text-xs sm:text-sm text-ink-secondary mt-1">
              Move directly from number generation into professional invoice creation.
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
                Create full PDF invoices with logos & taxes.
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
                Fast invoice maker for freelancers.
              </p>
            </Link>

            <Link
              href="/invoice-template"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Invoice Templates →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Customizable industry templates.
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
              Learn how to design standard invoice numbering systems.
            </p>
          </div>

          <FAQAccordion items={FAQS} />
        </Container>
      </section>

      {/* CTA */}
      <CTASection
        title="Create a Complete Invoice With Your Number"
        description="Jump straight into our free invoice generator to send polished invoices to clients."
        badgeText="Create Invoice Free"
      />
    </div>
  );
}
