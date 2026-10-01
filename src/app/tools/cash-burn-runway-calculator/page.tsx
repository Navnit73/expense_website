"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { CashBurnRunwayCalculator } from "@/components/tools/CashBurnRunwayCalculator";
import { getWebApplicationSchema, getFAQSchema } from "@/lib/seo";

const RUNWAY_FAQS: FAQItem[] = [
  {
    question: "What is Gross Burn vs. Net Burn Rate?",
    answer:
      "Gross burn is the total cash spent on operating expenses each month (salaries, marketing, rent, servers). Net burn is the actual cash loss: Gross Burn minus Total Monthly Cash Collections (Revenue).",
  },
  {
    question: "How many months of runway should a startup maintain?",
    answer:
      "Most venture investors and startup advisors recommend maintaining at least 12 to 18 months of runway.",
  },
];

export default function CashBurnRunwayPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Startup Cash Burn Rate & Runway Calculator",
    description: "Forecast startup runway in months and calculate your Zero Cash Date (ZCD).",
    url: "/tools/cash-burn-runway-calculator",
  });
  const faqSchema = getFAQSchema(RUNWAY_FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="py-8 md:py-12 bg-canvas">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Financial Tools", url: "/tools" },
              { name: "Runway Calculator", url: "/tools/cash-burn-runway-calculator" },
            ]}
          />

          <div className="mt-6 mb-8 text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="expense">Startup Treasury Tool</Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink tracking-tight">
              Startup Cash Burn Rate & Runway Calculator
            </h1>
            <p className="text-base sm:text-lg text-ink-muted">
              Calculate your monthly gross burn, net cash drain, and exact months of financial runway until Zero Cash Date.
            </p>
          </div>

          <CashBurnRunwayCalculator />

          <div className="mt-16 max-w-4xl mx-auto space-y-10 text-ink leading-relaxed">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-ink">Frequently Asked Questions</h2>
              <FAQAccordion items={RUNWAY_FAQS} />
            </div>
          </div>

          <div className="mt-16">
            <CTASection
              title="Cut Recurring SaaS Leaks with Expenseliy"
              description="Identify forgotten software subscriptions and optimize operational costs to extend your runway."
              primaryCtaText="Start Free Today"
              primaryCtaHref="/pricing"
            />
          </div>
        </Container>
      </div>
    </>
  );
}
