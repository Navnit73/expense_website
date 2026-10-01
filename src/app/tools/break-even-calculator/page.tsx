"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { BreakEvenCalculator } from "@/components/tools/BreakEvenCalculator";
import { getWebApplicationSchema, getFAQSchema } from "@/lib/seo";

const BREAK_EVEN_FAQS: FAQItem[] = [
  {
    question: "What is the break-even formula in units?",
    answer:
      "Break-Even Units = Total Fixed Costs / (Unit Selling Price - Unit Variable Cost). The denominator (Selling Price - Variable Cost) is also called the Unit Contribution Margin.",
  },
  {
    question: "What are examples of fixed vs. variable costs?",
    answer:
      "Fixed costs do not change with production volume (rent, software subscriptions, full-time salaries, insurance). Variable costs increase with every unit sold (materials, direct packaging, shipping, payment fees).",
  },
];

export default function BreakEvenPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Break-Even Point Calculator",
    description: "Calculate break-even units and revenue to evaluate business feasibility.",
    url: "/tools/break-even-calculator",
  });
  const faqSchema = getFAQSchema(BREAK_EVEN_FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="py-8 md:py-12 bg-canvas">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Financial Tools", url: "/tools" },
              { name: "Break-Even Calculator", url: "/tools/break-even-calculator" },
            ]}
          />

          <div className="mt-6 mb-8 text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="income">Financial Planning</Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink tracking-tight">
              Break-Even Point & Unit Volume Calculator
            </h1>
            <p className="text-base sm:text-lg text-ink-muted">
              Find out exactly how many units you must sell each month to cover overhead costs and reach target profits.
            </p>
          </div>

          <BreakEvenCalculator />

          <div className="mt-16 max-w-4xl mx-auto space-y-10 text-ink leading-relaxed">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-ink">Frequently Asked Questions</h2>
              <FAQAccordion items={BREAK_EVEN_FAQS} />
            </div>
          </div>

          <div className="mt-16">
            <CTASection
              title="Audit Fixed Overhead with Expenseliy"
              description="Identify recurring subscriptions, unnecessary software, and hidden expenses to lower your break-even point."
              primaryCtaText="Start Free Today"
              primaryCtaHref="/pricing"
            />
          </div>
        </Container>
      </div>
    </>
  );
}
