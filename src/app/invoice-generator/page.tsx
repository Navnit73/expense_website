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
  FileText,
  Sparkles,
  ShieldCheck,
  Zap,
  Printer,
  Download,
  CheckCircle2,
  ArrowRight,
  Calculator,
  Layers,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Free Invoice Generator – Create & Download Invoices Online",
  description:
    "Create professional invoices in seconds with Expenseliy's free online invoice generator. Add custom logos, calculate taxes, customize terms, and download PDF or print with zero signup.",
  path: "/invoice-generator",
  keywords: [
    "invoice generator",
    "invoice generator online",
    "invoice generator software",
    "automatic invoice generator",
    "quick invoice generator",
    "free invoice maker",
    "create invoice pdf",
  ],
});

const FAQS: FAQItem[] = [
  {
    question: "Is this invoice generator really 100% free?",
    answer:
      "Yes. You can generate, customize, download, and print unlimited commercial invoices with custom logos and tax calculations. No credit card, trial, or signup is required.",
  },
  {
    question: "Can I download my invoice as a PDF or print it directly?",
    answer:
      "Yes. Click the 'Print / PDF' button to open your browser's native print dialog formatted with clean CSS for standard letter/A4 paper, or download an instant CSV spreadsheet.",
  },
  {
    question: "Are my company details and client invoices saved securely?",
    answer:
      "All your inputs are saved locally in your browser's private localStorage. Expenseliy does not store your client invoices on public cloud databases without your permission.",
  },
  {
    question: "Can I add sales tax, discounts, and shipping fees?",
    answer:
      "Yes. The invoice generator automatically calculates line item totals, percentage/fixed discounts, sales tax rates, shipping fees, and net balance due in real time.",
  },
];

export default function InvoiceGeneratorPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Free Invoice Generator – Create & Download Invoices Online",
    description:
      "Create professional invoices in seconds with Expenseliy. Add custom logos, calculate taxes, and download PDF with zero signup.",
    url: "/invoice-generator",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Invoice Generator", url: "/invoice-generator" },
  ]);

  const faqSchema = getFAQSchema(FAQS);

  const howToSchema = getHowToSchema({
    name: "How to Create and Download an Invoice Online",
    description:
      "A 4-step guide to generating professional client invoices in under 60 seconds.",
    steps: [
      {
        name: "Enter Business & Client Details",
        text: "Add your company name, contact information, logo, and client billing address.",
      },
      {
        name: "Add Itemized Products or Services",
        text: "Input item descriptions, hourly rates or unit prices, and quantities.",
      },
      {
        name: "Set Tax, Discounts & Payment Terms",
        text: "Apply applicable tax rates, client discounts, payment due dates, and bank deposit instructions.",
      },
      {
        name: "Download PDF or Print",
        text: "Preview the pixel-perfect invoice and download as PDF or export CSV.",
      },
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
              { name: "Invoice Generator", url: "/invoice-generator" },
            ]}
            className="mb-6"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-income-bg text-income border border-income-border text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <FileText className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Core Billing Utility</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4 leading-tight">
              Free Invoice Generator – Create & Download Invoices Online
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-6">
              Create and download professional invoices in seconds. Add custom logos, itemized
              services, automated tax calculations, discounts, and payment terms with zero signup.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>100% Free (No Account Needed)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Printer className="w-4 h-4 text-primary" />
                <span>Instant PDF & Print</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-primary" />
                <span>Live Math Balancing</span>
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
            customHeadline="Interactive Online Invoice Generator"
            customSubheadline="Fill in your company details and line items below to generate an instant printable PDF invoice."
            highlightFeatures={[
              "Add company logo & custom branding",
              "Client & vendor address management",
              "Automated line item math & tax calculations",
              "Discounts, shipping fees & balance due",
              "Print to PDF or download spreadsheet",
              "Autosaved in your browser draft",
            ]}
          />
        </Container>
      </section>

      {/* Long-form SEO Content */}
      <section className="py-14 sm:py-20 bg-surface">
        <Container size="narrow">
          <article className="prose prose-sm sm:prose-base dark:prose-invert max-w-none space-y-8 text-ink-secondary">
            <div>
              <Badge variant="sky" size="sm" className="mb-3">
                Complete Invoicing Guide
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-4">
                What Makes a Professional, Legally Compliant Invoice?
              </h2>
              <p className="leading-relaxed">
                Whether you are invoicing corporate clients, small business customers, or individual
                consumers, a professional invoice serves as both a legal payment demand and an
                official accounting record. Ensuring that all required tax and payment fields are
                present prevents delayed payments and disputed charges.
              </p>
            </div>

            <h3 className="text-xl font-bold text-ink mt-8 mb-3">
              Essential Fields Checklist for Commercial Invoices
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6">
              <div className="p-4 rounded-xl bg-canvas border border-hairline">
                <h4 className="text-sm font-bold text-ink mb-1">1. Unique Invoice Number</h4>
                <p className="text-xs text-ink-secondary">
                  A sequential alphanumeric code (e.g. <code>INV-2026-1001</code>) for audit tracking
                  and duplicate prevention.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-canvas border border-hairline">
                <h4 className="text-sm font-bold text-ink mb-1">2. Clear Dates & Due Period</h4>
                <p className="text-xs text-ink-secondary">
                  State the issue date and explicit payment due date (e.g. Net 30) to establish payment
                  timelines.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-canvas border border-hairline">
                <h4 className="text-sm font-bold text-ink mb-1">3. Itemized Breakdown</h4>
                <p className="text-xs text-ink-secondary">
                  Detailed descriptions, hourly rates or unit prices, and quantities for all deliverables.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-canvas border border-hairline">
                <h4 className="text-sm font-bold text-ink mb-1">4. Payment Remittance Details</h4>
                <p className="text-xs text-ink-secondary">
                  Explicit bank routing/account numbers, wire instructions, or digital payment links.
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
              Explore Related Invoicing & Billing Utilities
            </h3>
            <p className="text-xs sm:text-sm text-ink-secondary mt-1">
              Connect your billing workflow across specialized tools in the Expenseliy suite.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/invoice-maker"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Invoice Maker →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Fast browser-based invoice creation in 60 seconds.
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
                Generate clean, printable PDF invoices instantly.
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
                7 customizable industry templates for freelancers & SMBs.
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
                Create retail product bills and purchase invoices.
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
              Everything you need to know about generating free online invoices.
            </p>
          </div>

          <FAQAccordion items={FAQS} />
        </Container>
      </section>

      {/* CTA */}
      <CTASection
        title="Track Your Income & Business Expenses in Expenseliy"
        description="After sending your invoice, manage client cash flow, track receipts, and calculate tax write-offs in one place."
        badgeText="Start Invoicing Free"
      />
    </div>
  );
}
