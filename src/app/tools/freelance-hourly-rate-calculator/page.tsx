"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { FreelanceRateCalculator } from "@/components/tools/FreelanceRateCalculator";
import { getWebApplicationSchema, getFAQSchema } from "@/lib/seo";

const FREELANCE_FAQS: FAQItem[] = [
  {
    question: "Why can't I just divide my annual salary target by 2,000 hours?",
    answer:
      "A typical full-time job has ~2,000 working hours, but freelancers only spend 50%–65% of their time on billable client work (approx 1,000–1,200 billable hours).",
  },
  {
    question: "How much buffer should freelancers add for taxes and healthcare?",
    answer:
      "Freelancers must pay the 15.3% self-employment tax, federal/state income taxes, and full private health premiums (typically requiring a 25%–35% gross-up).",
  },
];

export default function FreelanceRatePage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Freelance Hourly Rate Calculator",
    description: "Calculate your target billable hourly and day rate based on income goals and expenses.",
    url: "/tools/freelance-hourly-rate-calculator",
  });
  const faqSchema = getFAQSchema(FREELANCE_FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="py-8 md:py-12 bg-canvas">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Financial Tools", url: "/tools" },
              { name: "Freelance Rate Calculator", url: "/tools/freelance-hourly-rate-calculator" },
            ]}
          />

          <div className="mt-6 mb-8 text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="income">Pricing & Retainer Engine</Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink tracking-tight">
              Freelance Hourly Rate & Target Salary Calculator
            </h1>
            <p className="text-base sm:text-lg text-ink-muted">
              Calculate the exact hourly, day, and monthly retainer rates you should charge to hit your take-home goals.
            </p>
          </div>

          <FreelanceRateCalculator />

          <div className="mt-16 max-w-4xl mx-auto space-y-10 text-ink leading-relaxed">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-ink">Frequently Asked Questions</h2>
              <FAQAccordion items={FREELANCE_FAQS} />
            </div>
          </div>

          <div className="mt-16">
            <CTASection
              title="Create Professional Client Invoices in Seconds"
              description="Now that you know your rate, use Expenseliy's Free Invoice Generator to bill clients with zero fees."
              primaryCtaText="Make an Invoice"
              primaryCtaHref="/invoice-generator"
            />
          </div>
        </Container>
      </div>
    </>
  );
}
