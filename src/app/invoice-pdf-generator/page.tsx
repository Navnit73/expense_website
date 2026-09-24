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
  FileDown,
  Printer,
  Sparkles,
  ShieldCheck,
  Zap,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "PDF Invoice Generator – Create & Download PDF Invoices Free",
  description:
    "Generate clean, printable PDF invoices online with Expenseliy. Add company logo, line items, taxes, and download professional PDF invoices instantly without signup.",
  path: "/invoice-pdf-generator",
  keywords: [
    "pdf invoice generator",
    "invoice PDF",
    "create invoice PDF",
    "invoice generator PDF",
    "free pdf invoice maker",
    "printable invoice pdf",
  ],
});

const FAQS: FAQItem[] = [
  {
    question: "How do I save the generated invoice as a PDF?",
    answer:
      "Click the 'Print / PDF' button. In your browser's print dialog, select 'Save as PDF' as the destination to download an exact, high-resolution PDF file.",
  },
  {
    question: "Is the PDF invoice formatted for standard Letter and A4 printing?",
    answer:
      "Yes. The CSS print stylesheets are calibrated to standard 8.5x11 inch (US Letter) and 210x297 mm (A4) dimensions with clean margins and high-contrast typography.",
  },
  {
    question: "Can I include my business logo on the PDF invoice?",
    answer:
      "Yes. Upload your logo (PNG, JPG, SVG) and it will appear at the top of your exported PDF invoice with perfect resolution.",
  },
];

export default function InvoicePdfGeneratorPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "PDF Invoice Generator – Create & Download PDF Invoices Free",
    description:
      "Generate clean, printable PDF invoices online with Expenseliy. Add company logo, line items, taxes, and download PDF instantly.",
    url: "/invoice-pdf-generator",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "PDF Invoice Generator", url: "/invoice-pdf-generator" },
  ]);

  const faqSchema = getFAQSchema(FAQS);

  const howToSchema = getHowToSchema({
    name: "How to Generate a PDF Invoice Online",
    description: "Step-by-step instructions to create and save a PDF invoice.",
    steps: [
      { name: "Add Invoicing Details", text: "Enter your company name, client name, and line items." },
      { name: "Preview PDF Document", text: "Check the live preview to verify layout and totals." },
      { name: "Click Print / PDF", text: "Select 'Save as PDF' to download your completed invoice." },
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
              { name: "PDF Invoice Generator", url: "/invoice-pdf-generator" },
            ]}
            className="mb-6"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-income-bg text-income border border-income-border text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <FileDown className="w-3.5 h-3.5" aria-hidden="true" />
              <span>PDF Output Utility</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4 leading-tight">
              PDF Invoice Generator – Create & Download PDF Invoices Free
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-6">
              Generate clean, professional, print-ready PDF invoices. Customize with your business
              logo, itemized services, automated taxes, and download immediately with zero signup.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
              <div className="flex items-center gap-1.5">
                <Printer className="w-4 h-4 text-primary" />
                <span>Pixel-Perfect PDF Layout</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>Zero Watermarks</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-primary" />
                <span>Instant Browser Download</span>
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
            customHeadline="PDF Invoice Generator"
            customSubheadline="Fill out the invoice form and click 'Print / PDF' to download your formatted PDF document."
          />
        </Container>
      </section>

      {/* Long-form SEO Content */}
      <section className="py-14 sm:py-20 bg-surface">
        <Container size="narrow">
          <article className="prose prose-sm sm:prose-base dark:prose-invert max-w-none space-y-8 text-ink-secondary">
            <div>
              <Badge variant="sky" size="sm" className="mb-3">
                PDF Standards
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-4">
                Why PDF is the Global Gold Standard for Commercial Invoicing
              </h2>
              <p className="leading-relaxed">
                PDF (Portable Document Format) is the universally accepted file standard for
                business invoices. Unlike editable Word or Excel files, a PDF invoice ensures that
                your totals, banking details, and itemized terms cannot be accidentally altered by
                recipients, while rendering identically across all operating systems and mobile
                devices.
              </p>
            </div>
          </article>
        </Container>
      </section>

      {/* Internal Linking Hub */}
      <section className="py-12 bg-canvas border-t border-hairline">
        <Container size="default">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-ink">
              Related Invoicing & PDF Tools
            </h3>
            <p className="text-xs sm:text-sm text-ink-secondary mt-1">
              Connect your billing workflow with other utilities.
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
                Customizable templates for freelancers & SMBs.
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
                Generate retail and product purchase bills.
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
                Create and download custom payment receipts.
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
              Learn how to generate and download PDF invoices.
            </p>
          </div>

          <FAQAccordion items={FAQS} />
        </Container>
      </section>

      {/* CTA */}
      <CTASection
        title="Download Your Free PDF Invoice Now"
        description="Create, customize, and export professional PDF invoices with Expenseliy."
        badgeText="Download PDF Invoice"
      />
    </div>
  );
}
