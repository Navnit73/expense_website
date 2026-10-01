"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { EmergencyFundCalculator } from "@/components/tools/EmergencyFundCalculator";
import { getWebApplicationSchema, getFAQSchema } from "@/lib/seo";

const EMERGENCY_FAQS: FAQItem[] = [
  {
    question: "Should I aim for a 3-month or 6-month emergency fund?",
    answer:
      "A 3-month fund is suitable for dual-income households with stable salaried jobs. A 6 to 12-month fund is strongly recommended for single earners, freelancers, and entrepreneurs with fluctuating incomes.",
  },
  {
    question: "Where should I keep my emergency fund?",
    answer:
      "Emergency savings should be kept in a liquid, FDIC-insured High-Yield Savings Account (HYSA) or money market fund.",
  },
];

export default function EmergencyFundPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Emergency Fund & Safety Net Calculator",
    description: "Calculate your 3, 6, and 12-month emergency cash runway targets.",
    url: "/tools/emergency-fund-calculator",
  });
  const faqSchema = getFAQSchema(EMERGENCY_FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="py-8 md:py-12 bg-canvas">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Financial Tools", url: "/tools" },
              { name: "Emergency Fund Calculator", url: "/tools/emergency-fund-calculator" },
            ]}
          />

          <div className="mt-6 mb-8 text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="income">Safety Net Planner</Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink tracking-tight">
              Emergency Fund & Cash Runway Calculator
            </h1>
            <p className="text-base sm:text-lg text-ink-muted">
              Calculate your exact monthly survival baseline and see how many months you need to save for complete financial peace of mind.
            </p>
          </div>

          <EmergencyFundCalculator />

          <div className="mt-16 max-w-4xl mx-auto space-y-10 text-ink leading-relaxed">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-ink">Frequently Asked Questions</h2>
              <FAQAccordion items={EMERGENCY_FAQS} />
            </div>
          </div>

          <div className="mt-16">
            <CTASection
              title="Track Your Monthly Budget with Expenseliy"
              description="Calculate savings rates and stay on track toward your emergency fund goals with Expenseliy."
              primaryCtaText="Start Free Today"
              primaryCtaHref="/pricing"
            />
          </div>
        </Container>
      </div>
    </>
  );
}
