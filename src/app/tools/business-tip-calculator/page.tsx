"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { BusinessTipCalculator } from "@/components/tools/BusinessTipCalculator";
import { getWebApplicationSchema, getFAQSchema } from "@/lib/seo";

const TIP_FAQS: FAQItem[] = [
  {
    question: "Should you tip on the pre-tax or post-tax amount?",
    answer:
      "Standard dining etiquette recommends calculating tips on the pre-tax food and beverage subtotal.",
  },
  {
    question: "Is the tip part of the 50% IRS business meal deduction?",
    answer:
      "Yes. The tip, tax, and meal subtotal are combined into the qualifying business meal expense under IRS rules.",
  },
];

export default function BusinessTipPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Business Meal Tip & Bill Split Calculator",
    description: "Calculate tips, split checks among diners, and generate receipt breakdowns.",
    url: "/tools/business-tip-calculator",
  });
  const faqSchema = getFAQSchema(TIP_FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="py-8 md:py-12 bg-canvas">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Financial Tools", url: "/tools" },
              { name: "Tip & Bill Splitter", url: "/tools/business-tip-calculator" },
            ]}
          />

          <div className="mt-6 mb-8 text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="income">Dining & Expense Splitter</Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink tracking-tight">
              Business Meal Tip & Bill Split Calculator
            </h1>
            <p className="text-base sm:text-lg text-ink-muted">
              Calculate pre-tax tips, split dinner bills evenly among clients or colleagues, and generate receipt breakdowns.
            </p>
          </div>

          <BusinessTipCalculator />

          <div className="mt-16 max-w-4xl mx-auto space-y-10 text-ink leading-relaxed">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-ink">Frequently Asked Questions</h2>
              <FAQAccordion items={TIP_FAQS} />
            </div>
          </div>

          <div className="mt-16">
            <CTASection
              title="Scan Restaurant Receipts with Expenseliy"
              description="Extract meal subtotals, taxes, and tips in seconds with AI OCR."
              primaryCtaText="Scan a Receipt Free"
              primaryCtaHref="/receipt-scanner"
            />
          </div>
        </Container>
      </div>
    </>
  );
}
