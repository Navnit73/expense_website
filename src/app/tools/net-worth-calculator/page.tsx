"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { NetWorthCalculator } from "@/components/tools/NetWorthCalculator";
import { getWebApplicationSchema, getFAQSchema } from "@/lib/seo";

const NET_WORTH_FAQS: FAQItem[] = [
  {
    question: "What is the formula for Net Worth?",
    answer:
      "Net Worth = Total Assets (what you own: cash, retirement, investments, home equity, vehicles) minus Total Liabilities (what you owe: mortgages, student loans, auto loans, credit card balances).",
  },
  {
    question: "What is Liquid Net Worth?",
    answer:
      "Liquid Net Worth counts only assets that can be converted into cash immediately within days (checking, savings, brokerage stocks, money markets), excluding illiquid assets like primary real estate.",
  },
];

export default function NetWorthPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Net Worth & Personal Balance Sheet Calculator",
    description: "Track your assets and liabilities to calculate your true net worth.",
    url: "/tools/net-worth-calculator",
  });
  const faqSchema = getFAQSchema(NET_WORTH_FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="py-8 md:py-12 bg-canvas">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Financial Tools", url: "/tools" },
              { name: "Net Worth Calculator", url: "/tools/net-worth-calculator" },
            ]}
          />

          <div className="mt-6 mb-8 text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="income">Personal Balance Sheet</Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink tracking-tight">
              Net Worth & Personal Balance Sheet Calculator
            </h1>
            <p className="text-base sm:text-lg text-ink-muted">
              Track your complete assets against debts and liabilities to monitor your true wealth trajectory.
            </p>
          </div>

          <NetWorthCalculator />

          <div className="mt-16 max-w-4xl mx-auto space-y-10 text-ink leading-relaxed">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-ink">Frequently Asked Questions</h2>
              <FAQAccordion items={NET_WORTH_FAQS} />
            </div>
          </div>

          <div className="mt-16">
            <CTASection
              title="Track Assets & Liabilities in Expenseliy"
              description="Keep a private, multi-asset financial ledger with real-time net worth tracking."
              primaryCtaText="Start Free Today"
              primaryCtaHref="/pricing"
            />
          </div>
        </Container>
      </div>
    </>
  );
}
