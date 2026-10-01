"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { MileageDeductionCalculator } from "@/components/tools/MileageDeductionCalculator";
import { getWebApplicationSchema, getFAQSchema } from "@/lib/seo";

const MILEAGE_FAQS: FAQItem[] = [
  {
    question: "What is the 2026 IRS standard mileage rate?",
    answer:
      "The IRS standard mileage rate is 67 cents ($0.67) per mile driven for business purposes, 21 cents ($0.21) per mile for medical or moving purposes, and 14 cents ($0.14) per mile for charitable organizations.",
  },
  {
    question: "What is the difference between Standard Mileage and Actual Expenses?",
    answer:
      "The Standard Mileage Method multiplies your business miles by the IRS rate (e.g. $0.67/mi). The Actual Expense Method tracks gas, repairs, insurance, and depreciation, deducting the business use percentage.",
  },
];

export default function MileageDeductionPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "IRS Mileage Deduction Calculator",
    description: "Calculate your IRS standard mileage rate write-off vs actual vehicle expenses.",
    url: "/tools/mileage-deduction-calculator",
  });
  const faqSchema = getFAQSchema(MILEAGE_FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="py-8 md:py-12 bg-canvas">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Financial Tools", url: "/tools" },
              { name: "Mileage Deduction Calculator", url: "/tools/mileage-deduction-calculator" },
            ]}
          />

          <div className="mt-6 mb-8 text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="sky">IRS Mileage Rates</Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink tracking-tight">
              IRS Mileage Deduction & Actual Expense Calculator
            </h1>
            <p className="text-base sm:text-lg text-ink-muted">
              Compare the standard $0.67/mi IRS mileage rate against actual vehicle operating costs to maximize your write-off.
            </p>
          </div>

          <MileageDeductionCalculator />

          <div className="mt-16 max-w-4xl mx-auto space-y-10 text-ink leading-relaxed">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-ink">Frequently Asked Questions</h2>
              <FAQAccordion items={MILEAGE_FAQS} />
            </div>
          </div>

          <div className="mt-16">
            <CTASection
              title="Track Gas Receipts & Mileage Easily"
              description="Expenseliy gives you OCR receipt scanning and expense tracking to ensure bulletproof tax records."
              primaryCtaText="Start Tracking Free"
              primaryCtaHref="/pricing"
            />
          </div>
        </Container>
      </div>
    </>
  );
}
