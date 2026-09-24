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
  Briefcase,
  Sparkles,
  ShieldCheck,
  Zap,
  Printer,
  FileSpreadsheet,
  ArrowRight,
  Users,
  Building2,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Invoice Generator for Small Business – Easy Invoicing & Billing",
  description:
    "Free invoice generator for small businesses, freelancers, contractors, and agencies by Expenseliy. Custom branding, automatic tax calculations, payment terms, and instant PDF export.",
  path: "/invoice-generator-for-small-business",
  keywords: [
    "easy invoice maker",
    "invoice generator for small business",
    "small business invoice",
    "simple invoice generator",
    "freelance invoice generator",
    "contractor invoicing software",
  ],
});

const FAQS: FAQItem[] = [
  {
    question: "Why is this invoice generator ideal for small businesses?",
    answer:
      "Small businesses need clean, professional invoices without paying $30/month for complex ERP software. Expenseliy provides commercial invoice layouts, automated sales tax calculations, company logo branding, and instant PDF/CSV exports for free.",
  },
  {
    question: "Can I include my business Tax ID / EIN on the invoice?",
    answer:
      "Yes. The form includes dedicated fields for Employer Identification Numbers (EIN), VAT IDs, state contractor licenses, and business registration numbers.",
  },
  {
    question: "How can I track paid vs unpaid client invoices?",
    answer:
      "You can toggle the payment status between Draft, Sent, Paid, and Overdue, or connect your billing to Expenseliy's central ledger for complete cash flow analytics.",
  },
];

export default function InvoiceGeneratorForSmallBusinessPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Invoice Generator for Small Business – Easy Invoicing & Billing",
    description:
      "Free invoice generator for small businesses, freelancers, contractors, and agencies by Expenseliy.",
    url: "/invoice-generator-for-small-business",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Small Business Invoice Generator", url: "/invoice-generator-for-small-business" },
  ]);

  const faqSchema = getFAQSchema(FAQS);

  const howToSchema = getHowToSchema({
    name: "How Small Businesses Create Professional Invoices",
    description: "A 4-step invoicing framework for small business owners and freelancers.",
    steps: [
      { name: "Brand Your Invoice", text: "Upload your business logo and enter company tax ID." },
      { name: "Itemize Deliverables", text: "Add services, labor hours, product materials, and rates." },
      { name: "Configure Payment Terms", text: "Set Net 15/30 terms and bank deposit instructions." },
      { name: "Export & Send to Client", text: "Download the formatted PDF invoice and email to client." },
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
              { name: "Small Business Invoicing", url: "/invoice-generator-for-small-business" },
            ]}
            className="mb-6"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-income-bg text-income border border-income-border text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <Briefcase className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Small Business & Freelancer Tool</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4 leading-tight">
              Invoice Generator for Small Business – Easy Billing
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-6">
              Create professional, commercial invoices for your small business, agency, or
              freelance practice. Add custom branding, calculate sales taxes, set payment terms, and
              download PDF invoices instantly.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
              <div className="flex items-center gap-1.5">
                <Building2 className="w-4 h-4 text-primary" />
                <span>Custom Logo & Tax ID</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Printer className="w-4 h-4 text-primary" />
                <span>Print & PDF Ready</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>100% Free • No Subscription</span>
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
            customHeadline="Small Business Invoice Workspace"
            customSubheadline="Enter company and client billing information to generate a professional PDF invoice."
          />
        </Container>
      </section>

      {/* Long-form SEO Content */}
      <section className="py-14 sm:py-20 bg-surface">
        <Container size="narrow">
          <article className="prose prose-sm sm:prose-base dark:prose-invert max-w-none space-y-8 text-ink-secondary">
            <div>
              <Badge variant="sky" size="sm" className="mb-3">
                Small Business Playbook
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-4">
                How Small Businesses Speed Up Client Invoice Payments
              </h2>
              <p className="leading-relaxed">
                For small businesses, cash flow is lifeblood. Late-paying clients and confusing
                invoice layouts cause severe working capital bottlenecks. Professional invoices with
                transparent payment instructions and clear due dates get paid up to 40% faster.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6">
              <div className="p-4 rounded-xl bg-canvas border border-hairline">
                <h4 className="text-sm font-bold text-ink mb-1">1. Specify Explicit Due Dates</h4>
                <p className="text-xs text-ink-secondary">
                  Avoid vague phrases like 'Due on receipt.' Use concrete calendar dates (e.g. 'Due:
                  October 24, 2026') or standard Net 15/30 terms.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-canvas border border-hairline">
                <h4 className="text-sm font-bold text-ink mb-1">2. Provide Multiple Payment Rails</h4>
                <p className="text-xs text-ink-secondary">
                  Include ACH routing and account numbers, wire instructions, or credit card payment
                  links directly in the payment notes box.
                </p>
              </div>
            </div>
          </article>
        </Container>
      </section>

      {/* Internal Linking Hub */}
      <section className="py-12 bg-canvas border-t border-hairline">
        <Container size="default">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-ink">
              Related Small Business & Receipt Tools
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
              href="/invoice-template"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Invoice Templates →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                7 customizable industry templates.
              </p>
            </Link>

            <Link
              href="/receipt-scanner-for-small-business"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Small Business Receipt Scanner →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Scan vendor receipts and track business deductions.
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
              Learn how small businesses manage invoicing with Expenseliy.
            </p>
          </div>

          <FAQAccordion items={FAQS} />
        </Container>
      </section>

      {/* CTA */}
      <CTASection
        title="Upgrade Your Small Business Invoicing Today"
        description="Create polished, branded invoices and track customer payments effortlessly with Expenseliy."
        badgeText="Start Invoicing Free"
      />
    </div>
  );
}
