"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { ScheduleCDeductionsFinder } from "@/components/tools/ScheduleCDeductionsFinder";
import { getWebApplicationSchema, getFAQSchema } from "@/lib/seo";

const DEDUCTION_FAQS: FAQItem[] = [
  {
    question: "What qualifies as an ordinary and necessary business expense?",
    answer:
      "According to the IRS, an ordinary expense is one that is common and accepted in your industry. A necessary expense is one that is helpful and appropriate for your business or trade.",
  },
  {
    question: "Are business meals 100% or 50% deductible in 2026?",
    answer:
      "Business meals with clients, partners, or employees where business was discussed are 50% deductible under standard IRS rules. Solo meals during ordinary local workdays are not deductible.",
  },
];

export default function ScheduleCDeductionFinderPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Schedule C Expense Deductions Finder",
    description: "Search 50+ IRS Schedule C tax write-offs, deduction rules, and required receipt records.",
    url: "/tools/schedule-c-expense-deductions-finder",
  });
  const faqSchema = getFAQSchema(DEDUCTION_FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="py-8 md:py-12 bg-canvas">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Financial Tools", url: "/tools" },
              { name: "Schedule C Deduction Finder", url: "/tools/schedule-c-expense-deductions-finder" },
            ]}
          />

          <div className="mt-6 mb-8 text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="income">IRS Schedule C Directory</Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink tracking-tight">
              Schedule C Business Expense Categorizer & Deduction Lookup
            </h1>
            <p className="text-base sm:text-lg text-ink-muted">
              Search IRS write-off categories, check deductibility percentages, and estimate your annual tax savings.
            </p>
          </div>

          <ScheduleCDeductionsFinder />

          <div className="mt-16 max-w-4xl mx-auto space-y-10 text-ink leading-relaxed">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-ink">Frequently Asked Questions</h2>
              <FAQAccordion items={DEDUCTION_FAQS} />
            </div>
          </div>

          <div className="mt-16">
            <CTASection
              title="Automate Your Schedule C Tax Categorization"
              description="Expenseliy scans receipts with AI, categorizes write-offs, and exports clean tax packages."
              primaryCtaText="Start Free Today"
              primaryCtaHref="/pricing"
            />
          </div>
        </Container>
      </div>
    </>
  );
}
