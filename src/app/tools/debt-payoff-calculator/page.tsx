"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { DebtPayoffCalculator } from "@/components/tools/DebtPayoffCalculator";
import { getWebApplicationSchema, getFAQSchema } from "@/lib/seo";

const DEBT_FAQS: FAQItem[] = [
  {
    question: "What is the difference between Debt Avalanche and Debt Snowball?",
    answer:
      "The Debt Avalanche strategy pays off debts with the highest interest rate (APR%) first, minimizing total interest paid mathematically. The Debt Snowball strategy pays off the smallest balance first regardless of interest rate, creating fast psychological wins.",
  },
  {
    question: "How does adding an extra payment accelerate debt freedom?",
    answer:
      "Every dollar of extra payment goes 100% toward the principal balance rather than interest, drastically cutting the compounding cycle and shaving years off loan repayment timelines.",
  },
];

export default function DebtPayoffPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Debt Snowball vs Avalanche Payoff Calculator",
    description: "Compare debt payoff strategies and calculate your exact debt-free date.",
    url: "/tools/debt-payoff-calculator",
  });
  const faqSchema = getFAQSchema(DEBT_FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="py-8 md:py-12 bg-canvas">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Financial Tools", url: "/tools" },
              { name: "Debt Payoff Calculator", url: "/tools/debt-payoff-calculator" },
            ]}
          />

          <div className="mt-6 mb-8 text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="income">Debt Reduction Model</Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink tracking-tight">
              Debt Snowball vs. Avalanche Payoff Calculator
            </h1>
            <p className="text-base sm:text-lg text-ink-muted">
              Compare mathematical interest savings vs psychological momentum to reach complete debt freedom fastest.
            </p>
          </div>

          <DebtPayoffCalculator />

          <div className="mt-16 max-w-4xl mx-auto space-y-10 text-ink leading-relaxed">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-ink">Frequently Asked Questions</h2>
              <FAQAccordion items={DEBT_FAQS} />
            </div>
          </div>

          <div className="mt-16">
            <CTASection
              title="Track Your Net Surplus with Expenseliy"
              description="Cut unnecessary spending and direct your savings surplus into eliminating debt faster."
              primaryCtaText="Start Free Today"
              primaryCtaHref="/pricing"
            />
          </div>
        </Container>
      </div>
    </>
  );
}
