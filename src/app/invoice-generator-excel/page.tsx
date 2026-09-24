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
  FileSpreadsheet,
  Sparkles,
  ShieldCheck,
  Zap,
  Printer,
  Download,
  ArrowRight,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Free Invoice Generator Excel – Download Spreadsheet Templates",
  description:
    "Create invoices online or download pre-formatted Excel (.xlsx) and CSV invoice templates for Microsoft Excel and Google Sheets with Expenseliy.",
  path: "/invoice-generator-excel",
  keywords: [
    "invoice generator excel",
    "invoice template excel",
    "invoice maker excel",
    "excel invoice spreadsheet",
    "google sheets invoice template",
    "free excel invoice download",
  ],
});

const FAQS: FAQItem[] = [
  {
    question: "Can I download an Excel-compatible invoice file?",
    answer:
      "Yes. You can create your invoice online using our calculator and click 'CSV' to download a clean, formatted spreadsheet file ready to open in Microsoft Excel, Google Sheets, or Apple Numbers.",
  },
  {
    question: "Does the downloaded spreadsheet include automatic formulas?",
    answer:
      "The exported CSV spreadsheet includes all calculated subtotals, item line extensions, tax deductions, discounts, and final balance due figures.",
  },
];

export default function InvoiceGeneratorExcelPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Free Invoice Generator Excel – Download Spreadsheet Templates",
    description:
      "Create invoices online or download pre-formatted Excel (.xlsx) and CSV invoice templates with Expenseliy.",
    url: "/invoice-generator-excel",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Invoice Generator Excel", url: "/invoice-generator-excel" },
  ]);

  const faqSchema = getFAQSchema(FAQS);

  const howToSchema = getHowToSchema({
    name: "How to Generate an Excel Invoice Online",
    description: "Instructions to create and export an Excel invoice spreadsheet.",
    steps: [
      { name: "Enter Line Items & Quantities", text: "Input products, hourly services, and unit prices." },
      { name: "Apply Taxes & Discounts", text: "Set percentage discounts and sales tax rates." },
      { name: "Download CSV / Excel File", text: "Click the CSV button to download your spreadsheet." },
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
              { name: "Excel Invoice Generator", url: "/invoice-generator-excel" },
            ]}
            className="mb-6"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-income-bg text-income border border-income-border text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <FileSpreadsheet className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Excel & Spreadsheet Integration</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4 leading-tight">
              Free Invoice Generator Excel – Download Spreadsheet Templates
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-6">
              Create invoices online or export standardized spreadsheet files for Microsoft Excel
              and Google Sheets. Automatic totals, tax calculations, and zero account required.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
              <div className="flex items-center gap-1.5">
                <FileSpreadsheet className="w-4 h-4 text-primary" />
                <span>Excel & Google Sheets Compatible</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Printer className="w-4 h-4 text-primary" />
                <span>Printable PDF Backup</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>100% Free Web Utility</span>
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
            customHeadline="Excel Invoice Generator & Exporter"
            customSubheadline="Enter invoice details and click 'CSV' to download a spreadsheet file for Excel or Google Sheets."
          />
        </Container>
      </section>

      {/* Internal Linking Hub */}
      <section className="py-12 bg-canvas border-t border-hairline">
        <Container size="default">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-ink">
              Related Invoicing & Spreadsheet Tools
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
              href="/invoice-pdf-generator"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                PDF Invoice Generator →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Export clean, print-ready PDF invoices.
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
                Pre-built templates for all industries.
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
              Learn how to generate Excel invoices online.
            </p>
          </div>

          <FAQAccordion items={FAQS} />
        </Container>
      </section>

      {/* CTA */}
      <CTASection
        title="Generate Excel Invoices Without Formula Errors"
        description="Experience automated online invoicing and export clean spreadsheet files in seconds."
        badgeText="Create Excel Invoice"
      />
    </div>
  );
}
