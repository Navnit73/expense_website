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
  LayoutTemplate,
  Sparkles,
  ShieldCheck,
  Zap,
  Printer,
  FileSpreadsheet,
  ArrowRight,
  Briefcase,
  Wrench,
  FileText,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Free Invoice Templates – Customizable & Printable Templates",
  description:
    "Free customizable invoice templates for freelancers, small businesses, contractors, consultants, and service providers. Edit online and download PDF with Expenseliy.",
  path: "/invoice-template",
  keywords: [
    "free invoice template",
    "create free invoice template",
    "invoice template",
    "online invoice template",
    "freelancer invoice template",
    "contractor invoice template",
    "small business invoice template",
  ],
});

const FAQS: FAQItem[] = [
  {
    question: "What invoice templates are included?",
    answer:
      "Expenseliy includes 7 industry-tailored templates: Freelancer & Creator, Small Business Commercial, Contractor & Trades, Consultant & Advisory, Service Provider, Retail Product Bill, and POS Thermal Receipt.",
  },
  {
    question: "Can I customize the sample data on any template?",
    answer:
      "Yes! Click on any template card to immediately load its pre-configured structure into the live interactive editor, where you can modify all line items, rates, and company info.",
  },
  {
    question: "Can I download templates as PDF or Excel CSV?",
    answer:
      "Yes. Every template can be exported as a print-ready PDF document or a standardized CSV spreadsheet compatible with Microsoft Excel and Google Sheets.",
  },
];

export default function InvoiceTemplatePage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Free Invoice Templates – Customizable & Printable Templates",
    description:
      "Free customizable invoice templates for freelancers, small businesses, contractors, and consultants. Edit online and download PDF with Expenseliy.",
    url: "/invoice-template",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Invoice Template", url: "/invoice-template" },
  ]);

  const faqSchema = getFAQSchema(FAQS);

  const howToSchema = getHowToSchema({
    name: "How to Choose and Customize an Invoice Template",
    description: "Step-by-step instructions to select and adapt an invoice template.",
    steps: [
      { name: "Select an Industry Template", text: "Choose from Freelance, Contractor, Consultant, or SMB presets." },
      { name: "Customize Line Items & Logo", text: "Replace sample placeholder text with your client deliverables." },
      { name: "Export to PDF or Print", text: "Download the completed template as a clean PDF invoice." },
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
              { name: "Invoice Template", url: "/invoice-template" },
            ]}
            className="mb-6"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-income-bg text-income border border-income-border text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <LayoutTemplate className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Industry Invoice Templates</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4 leading-tight">
              Free Invoice Templates – Customizable & Printable
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-6">
              Select from professionally designed, customizable invoice templates. Tailored for
              freelancers, small businesses, contractors, consultants, and trade services. Edit
              directly in your browser and download PDF.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
              <div className="flex items-center gap-1.5">
                <Sparkles className="w-4 h-4 text-primary" />
                <span>7 Industry-Specific Presets</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>100% Free & Customizable</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Printer className="w-4 h-4 text-primary" />
                <span>Print & PDF Ready</span>
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* Interactive Tool Section */}
      <section className="py-10 sm:py-14 bg-canvas flex-1 border-b border-hairline">
        <Container size="default">
          <UnifiedInvoiceEngine
            mode="template-picker"
            initialType="invoice"
            customHeadline="Invoice Template Hub & Editor"
            customSubheadline="Pick an industry template below to populate the interactive editor with relevant line items."
          />
        </Container>
      </section>

      {/* Internal Linking Hub */}
      <section className="py-12 bg-canvas border-t border-hairline">
        <Container size="default">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-ink">
              Related Invoicing & Billing Utilities
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
                Main online invoice generator tool.
              </p>
            </Link>

            <Link
              href="/invoice-generator-excel"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Excel Invoice Generator →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Download spreadsheet invoice templates.
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
                Export and print clean PDF documents.
              </p>
            </Link>

            <Link
              href="/invoice-generator-for-small-business"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Small Business Invoicing →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Invoicing tailored for growing companies.
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
              Learn how to choose and edit invoice templates.
            </p>
          </div>

          <FAQAccordion items={FAQS} />
        </Container>
      </section>

      {/* CTA */}
      <CTASection
        title="Find the Perfect Invoice Template for Your Business"
        description="Select a template, add your logo, and create professional client invoices with Expenseliy."
        badgeText="Explore Templates"
      />
    </div>
  );
}
