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
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Zap,
  Printer,
  FileSpreadsheet,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Free Bill Maker – Create & Print Bills Online",
  description:
    "Create and print custom bills online for retail, wholesale, and service shops with Expenseliy's free bill maker. Fast, simple, automatic totals, and instant PDF download.",
  path: "/bill-maker",
  keywords: [
    "bill maker",
    "bill creator app",
    "bill maker online",
    "create bill",
    "retail bill maker",
    "free online billing tool",
  ],
});

const FAQS: FAQItem[] = [
  {
    question: "What is the difference between a bill and an invoice?",
    answer:
      "An invoice is typically a formal request for payment sent to a client for services rendered on credit (e.g. Net 30). A bill usually represents an itemized statement of goods or services purchased at the point of sale, often paid immediately.",
  },
  {
    question: "Can I use the bill maker for retail shop sales?",
    answer:
      "Yes. You can add your shop name, list products with quantities and prices, apply instant discounts, calculate sales tax, and print a clean bill for the customer.",
  },
  {
    question: "Can I track payment statuses like Paid or Pending?",
    answer:
      "Yes. You can mark bills as Paid in Full, Pending, or Overdue to maintain clear transaction records.",
  },
];

export default function BillMakerPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Free Bill Maker – Create & Print Bills Online",
    description:
      "Create and print custom bills online for retail, wholesale, and service shops with Expenseliy's free bill maker.",
    url: "/bill-maker",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Bill Maker", url: "/bill-maker" },
  ]);

  const faqSchema = getFAQSchema(FAQS);

  const howToSchema = getHowToSchema({
    name: "How to Create a Bill Online",
    description: "Step-by-step instructions to generate and print a customer bill.",
    steps: [
      { name: "Enter Shop & Customer Information", text: "Add store name, contact info, and customer name." },
      { name: "Add Products or Services", text: "List item descriptions, quantities, unit prices, and discounts." },
      { name: "Print or Download PDF", text: "Generate the itemized bill and print or save as PDF." },
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
              { name: "Bill Maker", url: "/bill-maker" },
            ]}
            className="mb-6"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-income-bg text-income border border-income-border text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <ShoppingBag className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Bill & POS Utility</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4 leading-tight">
              Free Bill Maker – Create & Print Bills Online
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-6">
              Create and print itemized bills for retail shops, product orders, and freelance
              services. Add products, quantities, prices, discounts, and taxes with zero signup.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>100% Free Web Utility</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Printer className="w-4 h-4 text-primary" />
                <span>Printable Receipt Format</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-primary" />
                <span>Automatic Totaling</span>
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* Interactive Tool Section */}
      <section className="py-10 sm:py-14 bg-canvas flex-1 border-b border-hairline">
        <Container size="default">
          <UnifiedInvoiceEngine
            mode="bill"
            initialType="bill"
            customHeadline="Online Bill Creator"
            customSubheadline="Enter shop details, add purchased items, and print a clean customer bill."
          />
        </Container>
      </section>

      {/* Internal Linking Hub */}
      <section className="py-12 bg-canvas border-t border-hairline">
        <Container size="default">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-ink">
              Related Billing & Receipt Tools
            </h3>
            <p className="text-xs sm:text-sm text-ink-secondary mt-1">
              Explore specialized tools in the Expenseliy suite.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/online-bill-maker"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Online Bill Maker →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Create bills online free without software.
              </p>
            </Link>

            <Link
              href="/receipt-maker"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Receipt Maker →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Generate payment receipts and proof of purchase.
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
                Create commercial invoices for clients.
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
                Scan and digitize incoming paper receipts with OCR.
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
              Learn how to make and print bills online.
            </p>
          </div>

          <FAQAccordion items={FAQS} />
        </Container>
      </section>

      {/* CTA */}
      <CTASection
        title="Create Professional Customer Bills Today"
        description="Experience the easiest way to generate retail and service bills with Expenseliy."
        badgeText="Make a Bill Now"
      />
    </div>
  );
}
