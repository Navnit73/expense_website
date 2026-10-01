"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { PerDiemCalculator } from "@/components/tools/PerDiemCalculator";
import { getWebApplicationSchema, getFAQSchema } from "@/lib/seo";

const PER_DIEM_FAQS: FAQItem[] = [
  {
    question: "What is the 75% rule for first and last travel days?",
    answer:
      "Under IRS and GSA rules, travelers are entitled to 75% of the standard daily Meals & Incidental Expenses (M&IE) allowance on their initial departure day and their final return day.",
  },
  {
    question: "Can self-employed freelancers use federal per diem rates?",
    answer:
      "Self-employed individuals can use standard federal M&IE rates for daily meals while traveling away from their tax home on business, but must track actual lodging receipts.",
  },
];

export default function PerDiemPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Business Travel Per Diem Calculator",
    description: "Calculate daily meal allowances, lodging rates, and 50% IRS meal deductions.",
    url: "/tools/per-diem-calculator",
  });
  const faqSchema = getFAQSchema(PER_DIEM_FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="py-8 md:py-12 bg-canvas">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Financial Tools", url: "/tools" },
              { name: "Per Diem Calculator", url: "/tools/per-diem-calculator" },
            ]}
          />

          <div className="mt-6 mb-8 text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="income">GSA Rates & Travel Rules</Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink tracking-tight">
              Business Travel Per Diem & Meal Deduction Calculator
            </h1>
            <p className="text-base sm:text-lg text-ink-muted">
              Calculate daily meal allowances (M&IE), lodging limits, and IRS 50% business meal write-offs for travel.
            </p>
          </div>

          <PerDiemCalculator />

          <div className="mt-16 max-w-4xl mx-auto space-y-10 text-ink leading-relaxed">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-ink">Frequently Asked Questions</h2>
              <FAQAccordion items={PER_DIEM_FAQS} />
            </div>
          </div>

          <div className="mt-16">
            <CTASection
              title="Snap Travel Receipts on the Go with Expenseliy"
              description="Capture flight, hotel, and restaurant receipts directly from your phone with instant OCR."
              primaryCtaText="Start Free Today"
              primaryCtaHref="/pricing"
            />
          </div>
        </Container>
      </div>
    </>
  );
}
