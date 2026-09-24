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
  Gift,
  Sparkles,
  ShieldCheck,
  Zap,
  Printer,
  FileSpreadsheet,
  ArrowRight,
  CheckCircle2,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Best Free Invoice Generator – Create Invoices Online for Free",
  description:
    "100% free online invoice generator with no watermark, trial, or signup required. Create, customize, and download PDF invoices instantly with Expenseliy.",
  path: "/free-invoice-generator",
  keywords: [
    "free invoice generator",
    "best free invoice generator",
    "best free invoice maker",
    "create invoice for free",
    "make an invoice online free",
    "create online invoice for free",
    "free invoice generator without watermark",
  ],
});

const FAQS: FAQItem[] = [
  {
    question: "Is there any watermark on generated invoices?",
    answer:
      "No! Expenseliy does not put watermarks, promotional stamps, or third-party ads on your client invoices. Your documents look 100% professional.",
  },
  {
    question: "Is there a limit to how many free invoices I can create?",
    answer:
      "No. You can create, edit, download, and print unlimited invoices using our free client-side web utility.",
  },
  {
    question: "How do I save my invoice to edit later?",
    answer:
      "Your invoice draft is automatically saved in your web browser's local cache. As long as you don't clear browser cookies/storage, your latest draft remains ready to edit.",
  },
];

export default function FreeInvoiceGeneratorPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Best Free Invoice Generator – Create Invoices Online for Free",
    description:
      "100% free online invoice generator with no watermark, trial, or signup required.",
    url: "/free-invoice-generator",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Free Invoice Generator", url: "/free-invoice-generator" },
  ]);

  const faqSchema = getFAQSchema(FAQS);

  const howToSchema = getHowToSchema({
    name: "How to Create an Invoice Online for Free",
    description: "Step-by-step instructions to create free client invoices without signup.",
    steps: [
      { name: "Enter Business & Client Info", text: "Add company name, address, and client details." },
      { name: "Add Line Items & Rates", text: "List services, hourly fees, and quantities." },
      { name: "Calculate Taxes & Discounts", text: "Set sales tax rate and discount percentage." },
      { name: "Download Clean PDF", text: "Export the watermark-free PDF invoice instantly." },
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
              { name: "Free Invoice Generator", url: "/free-invoice-generator" },
            ]}
            className="mb-6"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-income-bg text-income border border-income-border text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <Gift className="w-3.5 h-3.5" aria-hidden="true" />
              <span>100% Free • No Signup</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4 leading-tight">
              Best Free Invoice Generator – Create Invoices Online
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-6">
              Create and download beautiful, professional invoices without paying for expensive
              software subscriptions or dealing with watermarks. 100% free and private.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-4 h-4 text-primary" />
                <span>Zero Watermarks</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>No Credit Card Required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Zap className="w-4 h-4 text-primary" />
                <span>Instant PDF Download</span>
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
            customHeadline="Free Online Invoice Generator"
            customSubheadline="Create an invoice for free, calculate taxes automatically, and download a watermark-free PDF."
          />
        </Container>
      </section>

      {/* Long-form SEO Content */}
      <section className="py-14 sm:py-20 bg-surface">
        <Container size="narrow">
          <article className="prose prose-sm sm:prose-base dark:prose-invert max-w-none space-y-8 text-ink-secondary">
            <div>
              <Badge variant="sky" size="sm" className="mb-3">
                Transparency & Value
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-4">
                Why Expenseliy Offers a Truly Free Invoice Generator
              </h2>
              <p className="leading-relaxed">
                Many online tools advertise a "free invoice maker," only to demand an email signup,
                lock PDF downloads behind a paywall, or stamp a giant marketing logo across your
                client invoice. At Expenseliy, our browser-side invoice engine is built to be fast,
                clean, and genuinely free.
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
              Related Free Billing & Receipt Tools
            </h3>
            <p className="text-xs sm:text-sm text-ink-secondary mt-1">
              Connect your billing workflow with other free utilities.
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
              href="/online-invoice-maker"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Online Invoice Maker →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Browser-based creation without downloads.
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
              Learn about our free invoice generator features.
            </p>
          </div>

          <FAQAccordion items={FAQS} />
        </Container>
      </section>

      {/* CTA */}
      <CTASection
        title="Start Generating Free Invoices Now"
        description="Experience the fastest way to invoice clients and keep track of your cash flow."
        badgeText="Create Free Invoice"
      />
    </div>
  );
}
