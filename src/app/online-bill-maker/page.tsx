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
  Globe,
  ShoppingBag,
  Sparkles,
  ShieldCheck,
  Zap,
  Printer,
  FileSpreadsheet,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Online Bill Maker – Create Bills Online for Free",
  description:
    "Create and print bills online free in your browser with Expenseliy. Instant billing tool for local stores, trades, service shops, and cash sales.",
  path: "/online-bill-maker",
  keywords: [
    "create bill online free",
    "online bill maker",
    "create bill online",
    "online bill generator",
    "free online billing maker",
    "simple bill generator",
  ],
});

const FAQS: FAQItem[] = [
  {
    question: "How do I create a bill online without an account?",
    answer:
      "Open this page, type your store or business name, list the items sold with quantities and prices, and click 'Print / PDF'. Your bill is generated immediately.",
  },
  {
    question: "Can I use this online bill maker on a tablet at a store checkout?",
    answer:
      "Yes! The interface is optimized for touchscreen tablets, POS counters, and desktop browsers, making it easy to create quick customer bills on the spot.",
  },
  {
    question: "Can I download bills as CSV spreadsheets?",
    answer:
      "Yes. You can export any bill as a CSV file to import into your spreadsheet or accounting software.",
  },
];

export default function OnlineBillMakerPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Online Bill Maker – Create Bills Online for Free",
    description:
      "Create and print bills online free in your browser with Expenseliy. Instant billing tool for local stores and trades.",
    url: "/online-bill-maker",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Online Bill Maker", url: "/online-bill-maker" },
  ]);

  const faqSchema = getFAQSchema(FAQS);

  const howToSchema = getHowToSchema({
    name: "How to Create a Bill Online Free",
    description: "Create, calculate, and print a bill in your web browser.",
    steps: [
      { name: "Enter Seller Information", text: "Add your shop or business name." },
      { name: "Add Line Items", text: "Input sold products, quantities, and prices." },
      { name: "Print or Download", text: "Export the clean bill as PDF or print directly." },
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
              { name: "Online Bill Maker", url: "/online-bill-maker" },
            ]}
            className="mb-6"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-income-bg text-income border border-income-border text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <Globe className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Free Online Billing</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4 leading-tight">
              Online Bill Maker – Create Bills Online for Free
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-6">
              Create bills online without software installation or signup. Add products, rates,
              sales tax, and discounts, and print or download your bill instantly.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>Zero Installation</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Printer className="w-4 h-4 text-primary" />
                <span>Instant Print & PDF</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-primary" />
                <span>100% Free Forever</span>
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
            customHeadline="Online Bill Maker"
            customSubheadline="Enter bill items and download a clean PDF bill in seconds."
          />
        </Container>
      </section>

      {/* Internal Linking Hub */}
      <section className="py-12 bg-canvas border-t border-hairline">
        <Container size="default">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-ink">
              Related Billing & Invoice Tools
            </h3>
            <p className="text-xs sm:text-sm text-ink-secondary mt-1">
              Explore complementary tools in the Expenseliy suite.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/bill-maker"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Bill Maker →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Generate retail and service bills.
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
                Create proof of payment receipts.
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

            <Link
              href="/receipt-tracker"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Receipt Tracker →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Track incoming business receipts and expenses.
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
              Learn how to use our free online bill maker.
            </p>
          </div>

          <FAQAccordion items={FAQS} />
        </Container>
      </section>

      {/* CTA */}
      <CTASection
        title="Create Online Bills Effortlessly"
        description="Experience simple, fast billing without installing software or creating an account."
        badgeText="Create Bill Online"
      />
    </div>
  );
}
