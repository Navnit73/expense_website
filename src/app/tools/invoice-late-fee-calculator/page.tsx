"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { InvoiceLateFeeCalculator } from "@/components/tools/InvoiceLateFeeCalculator";
import { getWebApplicationSchema, getFAQSchema } from "@/lib/seo";

const LATE_FEE_FAQS: FAQItem[] = [
  {
    question: "What is the standard late fee percentage for invoices?",
    answer:
      "The standard commercial late fee is 1.5% per month (which equals 18% annual APR).",
  },
  {
    question: "Can I charge a late fee if it wasn't in my contract?",
    answer:
      "In the US, you generally cannot enforce late fees unless they were agreed upon in your signed contract or explicitly stated on the original invoice payment terms.",
  },
];

export default function InvoiceLateFeePage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Invoice Late Fee & Interest Calculator",
    description: "Calculate late fees, accrued interest, and generate overdue payment demand notices.",
    url: "/tools/invoice-late-fee-calculator",
  });
  const faqSchema = getFAQSchema(LATE_FEE_FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="py-8 md:py-12 bg-canvas">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Financial Tools", url: "/tools" },
              { name: "Invoice Late Fee Calculator", url: "/tools/invoice-late-fee-calculator" },
            ]}
          />

          <div className="mt-6 mb-8 text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="warning">Invoicing & Collections</Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink tracking-tight">
              Invoice Late Fee & Overdue Interest Calculator
            </h1>
            <p className="text-base sm:text-lg text-ink-muted">
              Calculate late interest on overdue invoices and generate a clean, professional payment demand letter.
            </p>
          </div>

          <InvoiceLateFeeCalculator />

          <div className="mt-16 max-w-4xl mx-auto space-y-10 text-ink leading-relaxed">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-ink">Frequently Asked Questions</h2>
              <FAQAccordion items={LATE_FEE_FAQS} />
            </div>
          </div>

          <div className="mt-16">
            <CTASection
              title="Issue Clean Invoices with Expenseliy"
              description="Create PDF invoices with clear Net 30 terms and late fee clauses to get paid on time."
              primaryCtaText="Generate Invoice Free"
              primaryCtaHref="/invoice-generator"
            />
          </div>
        </Container>
      </div>
    </>
  );
}
