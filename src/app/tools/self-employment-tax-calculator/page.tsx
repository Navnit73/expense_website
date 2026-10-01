"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { SelfEmploymentTaxCalculator } from "@/components/tools/SelfEmploymentTaxCalculator";
import { getWebApplicationSchema, getFAQSchema } from "@/lib/seo";

const TAX_FAQS: FAQItem[] = [
  {
    question: "What is self-employment (SE) tax?",
    answer:
      "Self-employment tax consists of Social Security (12.4%) and Medicare (2.9%), totaling 15.3%. Unlike W-2 employees where the employer pays half (7.65%), freelancers and 1099 contractors pay the full 15.3% on 92.35% of their net Schedule C business profit.",
  },
  {
    question: "When are IRS quarterly estimated taxes due?",
    answer:
      "For the fiscal tax year, quarterly deadlines are: Q1 (Jan 1 – Mar 31) due April 15; Q2 (Apr 1 – May 31) due June 15; Q3 (Jun 1 – Aug 31) due September 15; and Q4 (Sep 1 – Dec 31) due January 15 of the following year.",
  },
  {
    question: "How do business expenses lower my self-employment tax?",
    answer:
      "Every dollar of legitimate, documented business expense directly reduces your net Schedule C profit. This lowers both your 15.3% SE tax and your regular federal and state income tax brackets.",
  },
  {
    question: "What is the 50% above-the-line deduction?",
    answer:
      "The IRS allows you to deduct exactly half (50%) of your total calculated self-employment tax directly from your Adjusted Gross Income (AGI) on Form 1040.",
  },
];

export default function SelfEmploymentTaxPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "1099 Self-Employment & Quarterly Tax Calculator",
    description: "Calculate your self-employment tax, Medicare, federal income tax, and IRS quarterly payment schedule.",
    url: "/tools/self-employment-tax-calculator",
  });
  const faqSchema = getFAQSchema(TAX_FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="py-8 md:py-12 bg-canvas">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Financial Tools", url: "/tools" },
              { name: "1099 Tax Calculator", url: "/tools/self-employment-tax-calculator" },
            ]}
          />

          <div className="mt-6 mb-8 text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="income">Free 2026 Tax Engine</Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink tracking-tight">
              1099 Self-Employment & Quarterly Tax Calculator
            </h1>
            <p className="text-base sm:text-lg text-ink-muted">
              Estimate your federal SE tax (15.3%), state income taxes, and IRS quarterly payments. Zero sign-up required.
            </p>
          </div>

          <SelfEmploymentTaxCalculator />

          <div className="mt-16 max-w-4xl mx-auto space-y-10 text-ink leading-relaxed">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-ink">Frequently Asked Questions</h2>
              <FAQAccordion items={TAX_FAQS} />
            </div>
          </div>

          <div className="mt-16">
            <CTASection
              title="Never Miss a Tax Deduction Again"
              description="Snap receipts, organize IRS Schedule C expenses, and generate clean tax reports with Expenseliy."
              primaryCtaText="Try Expenseliy Free"
              primaryCtaHref="/pricing"
            />
          </div>
        </Container>
      </div>
    </>
  );
}
