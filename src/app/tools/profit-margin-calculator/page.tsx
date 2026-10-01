"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { ProfitMarginCalculator } from "@/components/tools/ProfitMarginCalculator";
import { getWebApplicationSchema, getFAQSchema } from "@/lib/seo";

const MARGIN_FAQS: FAQItem[] = [
  {
    question: "What is the formula for Gross Profit Margin?",
    answer:
      "Gross Profit Margin = ((Revenue - Cost of Goods Sold) / Revenue) * 100. For example, if you sell an item for $100 that cost $40 to make, your gross profit is $60 and your gross profit margin is 60%.",
  },
  {
    question: "What is the difference between Margin and Markup?",
    answer:
      "Margin is profit as a percentage of the selling price. Markup is profit as a percentage of the cost price.",
  },
];

export default function ProfitMarginPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Profit Margin & Markup Calculator",
    description: "Calculate gross profit margins, cost markups, and optimal selling prices.",
    url: "/tools/profit-margin-calculator",
  });
  const faqSchema = getFAQSchema(MARGIN_FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="py-8 md:py-12 bg-canvas">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Financial Tools", url: "/tools" },
              { name: "Profit Margin Calculator", url: "/tools/profit-margin-calculator" },
            ]}
          />

          <div className="mt-6 mb-8 text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="income">Pricing & Profitability</Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink tracking-tight">
              Profit Margin & Markup Calculator
            </h1>
            <p className="text-base sm:text-lg text-ink-muted">
              Instantly calculate gross profit margin percentage, markup on cost, and selling price targets.
            </p>
          </div>

          <ProfitMarginCalculator />

          <div className="mt-16 max-w-4xl mx-auto space-y-10 text-ink leading-relaxed">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-ink">Frequently Asked Questions</h2>
              <FAQAccordion items={MARGIN_FAQS} />
            </div>
          </div>

          <div className="mt-16">
            <CTASection
              title="Track Product COGS & Operational Costs"
              description="Keep your inventory costs and business expenses accurate in Expenseliy to preserve strong profit margins."
              primaryCtaText="Start Free Today"
              primaryCtaHref="/pricing"
            />
          </div>
        </Container>
      </div>
    </>
  );
}
