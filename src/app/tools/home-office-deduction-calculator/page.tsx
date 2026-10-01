"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { HomeOfficeCalculator } from "@/components/tools/HomeOfficeCalculator";
import { getWebApplicationSchema, getFAQSchema } from "@/lib/seo";

const HOME_OFFICE_FAQS: FAQItem[] = [
  {
    question: "What is the Simplified Home Office Method?",
    answer:
      "The Simplified Method allows a standard deduction of $5 per square foot of dedicated workspace, up to a maximum of 300 square feet ($1,500 maximum annual deduction).",
  },
  {
    question: "What expenses can I include in the Actual Expense Method?",
    answer:
      "Under the Actual Expense Method (Form 8829), you calculate the percentage of your home used for business and deduct that proportion of your rent/mortgage interest, electricity, heating, water, trash, home insurance, and internet.",
  },
];

export default function HomeOfficePage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Home Office Tax Deduction Calculator",
    description: "Compare Simplified ($5/sq ft) vs Actual Expenses to maximize your home office deduction.",
    url: "/tools/home-office-deduction-calculator",
  });
  const faqSchema = getFAQSchema(HOME_OFFICE_FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="py-8 md:py-12 bg-canvas">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Financial Tools", url: "/tools" },
              { name: "Home Office Calculator", url: "/tools/home-office-deduction-calculator" },
            ]}
          />

          <div className="mt-6 mb-8 text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="income">IRS Form 8829 Engine</Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink tracking-tight">
              Home Office Tax Deduction Calculator
            </h1>
            <p className="text-base sm:text-lg text-ink-muted">
              Compare the simplified $5/sq ft deduction vs tracking actual home bills to maximize your tax savings.
            </p>
          </div>

          <HomeOfficeCalculator />

          <div className="mt-16 max-w-4xl mx-auto space-y-10 text-ink leading-relaxed">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-ink">Frequently Asked Questions</h2>
              <FAQAccordion items={HOME_OFFICE_FAQS} />
            </div>
          </div>

          <div className="mt-16">
            <CTASection
              title="Organize Monthly Household Bills & Receipts"
              description="Keep your utility bills, rent receipts, and tech expenses organized in one place with Expenseliy."
              primaryCtaText="Start Free Today"
              primaryCtaHref="/pricing"
            />
          </div>
        </Container>
      </div>
    </>
  );
}
