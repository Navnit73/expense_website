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
  Sparkles,
  ShieldCheck,
  Zap,
  Printer,
  FileSpreadsheet,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Online Invoice Maker – Make Invoices in Your Web Browser",
  description:
    "No software installation required. Make invoices online free in your web browser. Create, customize, download, and print professional invoices with Expenseliy.",
  path: "/online-invoice-maker",
  keywords: [
    "make invoice online",
    "make an invoice online free",
    "create invoice online",
    "online invoice maker",
    "browser invoice creator",
    "web invoice generator",
  ],
});

const FAQS: FAQItem[] = [
  {
    question: "Do I need to install any software or browser extensions?",
    answer:
      "No! Expenseliy works directly in modern web browsers (Chrome, Safari, Firefox, Edge). There is zero software to download or install.",
  },
  {
    question: "Will my invoice work on international currencies?",
    answer:
      "Yes. The online invoice maker supports USD ($), EUR (€), GBP (£), CAD (CA$), AUD (A$), INR (₹), JPY (¥), and CHF with real-time formatting.",
  },
  {
    question: "Can I save my invoice as a PDF file?",
    answer:
      "Yes. Click 'Print / PDF' to instantly generate and save a high-resolution PDF document for your client.",
  },
];

export default function OnlineInvoiceMakerPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Online Invoice Maker – Make Invoices in Your Web Browser",
    description:
      "No software installation required. Make invoices online free in your web browser with Expenseliy.",
    url: "/online-invoice-maker",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Online Invoice Maker", url: "/online-invoice-maker" },
  ]);

  const faqSchema = getFAQSchema(FAQS);

  const howToSchema = getHowToSchema({
    name: "How to Make an Invoice Online in Your Browser",
    description: "Create and export an invoice online with zero software installation.",
    steps: [
      { name: "Open the Web Tool", text: "Launch the online invoice maker on any browser." },
      { name: "Enter Billable Items", text: "Add product descriptions, quantities, and prices." },
      { name: "Export Clean PDF", text: "Download your PDF invoice with a single click." },
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
              { name: "Online Invoice Maker", url: "/online-invoice-maker" },
            ]}
            className="mb-6"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-income-bg text-income border border-income-border text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <Globe className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Browser-First • No Install</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4 leading-tight">
              Online Invoice Maker – Make Invoices in Your Web Browser
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-6">
              No software installation required. Create, download, and print your invoice directly
              from your web browser with zero signup and complete data privacy.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>Runs Client-Side</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Printer className="w-4 h-4 text-primary" />
                <span>Printable Letter / A4</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-primary" />
                <span>Instant PDF Generator</span>
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
            customHeadline="Browser-Based Invoice Maker"
            customSubheadline="Fill out the form below to create, print, and download professional client invoices online."
          />
        </Container>
      </section>

      {/* Internal Linking Hub */}
      <section className="py-12 bg-canvas border-t border-hairline">
        <Container size="default">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-ink">
              Explore Related Invoicing Tools
            </h3>
            <p className="text-xs sm:text-sm text-ink-secondary mt-1">
              Find specialized billing tools in the Expenseliy suite.
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
                Main online invoice generator tool.
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
                Generate and print PDF invoices directly.
              </p>
            </Link>

            <Link
              href="/free-invoice-generator"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Free Invoice Generator →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Free invoice tool without watermarks.
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
                Pre-built invoice templates for every industry.
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
              Learn how to make invoices online in your browser.
            </p>
          </div>

          <FAQAccordion items={FAQS} />
        </Container>
      </section>

      {/* CTA */}
      <CTASection
        title="Make and Download Your Invoice in Seconds"
        description="Try the online invoice maker with zero software installation or signup required."
        badgeText="Make Invoice Online"
      />
    </div>
  );
}
