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
  PenTool,
  Sparkles,
  ShieldCheck,
  Zap,
  Printer,
  FileCheck2,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Free Invoice Maker – Create Professional Invoices Online",
  description:
    "Make your own professional invoice online for free with Expenseliy. Simple, fast, and easy invoice maker with instant PDF download and zero account required.",
  path: "/invoice-maker",
  keywords: [
    "invoice maker",
    "easy invoice maker",
    "make your own invoice",
    "create your own invoice",
    "make the invoice",
    "free invoice maker online",
  ],
});

const FAQS: FAQItem[] = [
  {
    question: "How easy is it to make an invoice with this tool?",
    answer:
      "It takes less than a minute! Simply enter your business name, client name, line items, and rates. The invoice maker handles the math, calculates taxes, and generates a formatted invoice instantly.",
  },
  {
    question: "Do I have to create an account or provide an email?",
    answer:
      "No. You can make and download invoices immediately with zero registration or email capture.",
  },
  {
    question: "Can I customize the colors and layout?",
    answer:
      "Yes. You can choose between Modern Emerald, Classic Minimal, Executive Corporate, and Freelance Clean themes.",
  },
];

export default function InvoiceMakerPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Free Invoice Maker – Create Professional Invoices Online",
    description:
      "Make your own professional invoice online for free. Custom templates, automatic totals, and instant PDF download.",
    url: "/invoice-maker",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Invoice Maker", url: "/invoice-maker" },
  ]);

  const faqSchema = getFAQSchema(FAQS);

  const howToSchema = getHowToSchema({
    name: "How to Make Your Own Invoice Online",
    description:
      "A quick guide to creating a custom business invoice from your browser.",
    steps: [
      {
        name: "Fill In Company & Client Details",
        text: "Input sender and recipient contact information.",
      },
      {
        name: "List Services & Products",
        text: "Add descriptions, quantities, and unit pricing.",
      },
      {
        name: "Review Live Preview",
        text: "Verify totals, discount deductions, and sales tax amounts.",
      },
      {
        name: "Download PDF or Print",
        text: "Export the clean invoice and send it to your client.",
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
              { name: "Invoice Maker", url: "/invoice-maker" },
            ]}
            className="mb-6"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-income-bg text-income border border-income-border text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <PenTool className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Easy Invoice Maker</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4 leading-tight">
              Free Invoice Maker – Create Professional Invoices Online
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-6">
              Make your own customized, professional invoice in your browser. Simple, intuitive,
              and completely free with instant PDF download.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>Zero Account Needed</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Printer className="w-4 h-4 text-primary" />
                <span>Printable Letter / A4 Format</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-primary" />
                <span>Create in Under 60 Seconds</span>
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
            customHeadline="Easy Invoice Maker"
            customSubheadline="Customize your invoice details and download a clean PDF ready for client billing."
          />
        </Container>
      </section>

      {/* Long-form SEO Content */}
      <section className="py-14 sm:py-20 bg-surface">
        <Container size="narrow">
          <article className="prose prose-sm sm:prose-base dark:prose-invert max-w-none space-y-8 text-ink-secondary">
            <div>
              <Badge variant="sky" size="sm" className="mb-3">
                Invoicing Essentials
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-4">
                Why Using an Online Invoice Maker Beats Manual Word & Google Docs
              </h2>
              <p className="leading-relaxed">
                Many freelancers and small business owners start out by creating invoices in Microsoft
                Word or Google Docs. However, manual word processor documents require calculating
                subtotals and taxes with a handheld calculator, and simple formatting mistakes often
                ruin the PDF layout.
              </p>
            </div>

            <div className="space-y-4 my-6 not-prose">
              <div className="p-4 rounded-xl bg-canvas border border-hairline flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-income-bg text-income flex items-center justify-center font-bold text-xs font-mono shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ink mb-1">Automated Math Engine</h4>
                  <p className="text-xs text-ink-secondary">
                    Quantity × Rate calculations, tax additions, and discounts are computed
                    instantly with zero math errors.
                  </p>
                </div>
              </div>

              <div className="p-4 rounded-xl bg-canvas border border-hairline flex items-start gap-3">
                <div className="w-7 h-7 rounded-lg bg-sky-bg text-sky flex items-center justify-center font-bold text-xs font-mono shrink-0 mt-0.5">
                  ✓
                </div>
                <div>
                  <h4 className="text-sm font-bold text-ink mb-1">Standardized Layouts</h4>
                  <p className="text-xs text-ink-secondary">
                    Columns, headers, and payment terms stay perfectly aligned regardless of item
                    length or screen size.
                  </p>
                </div>
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
              Related Invoicing Tools
            </h3>
            <p className="text-xs sm:text-sm text-ink-secondary mt-1">
              Explore specialized tools in the Expenseliy billing suite.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/free-invoice-generator"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Free Invoice Generator →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                100% free tool with multi-currency support.
              </p>
            </Link>

            <Link
              href="/invoice-creator"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Invoice Creator →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Create an invoice in under 60 seconds.
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
              href="/invoice-template"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Invoice Templates →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Pre-made templates for freelancers and contractors.
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
              Learn how to make professional invoices online for free.
            </p>
          </div>

          <FAQAccordion items={FAQS} />
        </Container>
      </section>

      {/* CTA */}
      <CTASection
        title="Make Your Next Invoice in Seconds"
        description="Join thousands of freelancers and small businesses who create invoices with Expenseliy."
        badgeText="Create Your Invoice →"
      />
    </div>
  );
}
