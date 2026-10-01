"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { DsoCalculator } from "@/components/tools/DsoCalculator";
import { getWebApplicationSchema, getFAQSchema } from "@/lib/seo";

const DSO_FAQS: FAQItem[] = [
  {
    question: "What does Days Sales Outstanding (DSO) measure?",
    answer:
      "DSO measures the average number of days it takes a company to collect cash from customers after a credit sale has occurred. A lower DSO indicates healthy cash flow and fast collections.",
  },
  {
    question: "What is considered a good DSO number?",
    answer:
      "A DSO of under 45 days is generally considered good for B2B companies operating on standard Net 30 terms.",
  },
];

export default function DsoPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Days Sales Outstanding (DSO) Calculator",
    description: "Measure invoice collection speed and accounts receivable turnover.",
    url: "/tools/dso-calculator",
  });
  const faqSchema = getFAQSchema(DSO_FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="py-8 md:py-12 bg-canvas">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Financial Tools", url: "/tools" },
              { name: "DSO Calculator", url: "/tools/dso-calculator" },
            ]}
          />

          <div className="mt-6 mb-8 text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="sky">Working Capital Analytics</Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink tracking-tight">
              Days Sales Outstanding (DSO) & AR Calculator
            </h1>
            <p className="text-base sm:text-lg text-ink-muted">
              Measure how quickly your business collects cash from unpaid client invoices and optimize working capital.
            </p>
          </div>

          <DsoCalculator />

          <div className="mt-16 max-w-4xl mx-auto space-y-10 text-ink leading-relaxed">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-ink">Frequently Asked Questions</h2>
              <FAQAccordion items={DSO_FAQS} />
            </div>
          </div>

          <div className="mt-16">
            <CTASection
              title="Speed Up Invoice Collections with Expenseliy"
              description="Generate clear, professional invoices with automated payment terms to reduce your DSO."
              primaryCtaText="Create Invoice Free"
              primaryCtaHref="/invoice-generator"
            />
          </div>
        </Container>
      </div>
    </>
  );
}
