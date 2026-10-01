"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { EstimateMaker } from "@/components/tools/EstimateMaker";
import { getWebApplicationSchema, getFAQSchema } from "@/lib/seo";

const ESTIMATE_FAQS: FAQItem[] = [
  {
    question: "What is the difference between an estimate and an invoice?",
    answer:
      "An estimate (or quotation) is an initial non-binding price proposal sent to a prospective client before work begins. An invoice is an official request for payment issued after delivery.",
  },
  {
    question: "How long should a price estimate remain valid?",
    answer:
      "Most service providers and contractors set an expiration date of 14 to 30 days to protect against fluctuating material costs and project scope changes.",
  },
];

export default function EstimateMakerPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Free Price Estimate & Quotation Maker",
    description: "Generate and export professional PDF price estimates and quotes for clients.",
    url: "/tools/estimate-maker",
  });
  const faqSchema = getFAQSchema(ESTIMATE_FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="py-8 md:py-12 bg-canvas">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Financial Tools", url: "/tools" },
              { name: "Price Estimate Maker", url: "/tools/estimate-maker" },
            ]}
          />

          <div className="mt-6 mb-8 text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="income">Client Proposal Tool</Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink tracking-tight">
              Free Price Estimate & Quotation Maker
            </h1>
            <p className="text-base sm:text-lg text-ink-muted">
              Create clean client price quotes, set validity terms, and download instant PDFs with zero account needed.
            </p>
          </div>

          <EstimateMaker />

          <div className="mt-16 max-w-4xl mx-auto space-y-10 text-ink leading-relaxed">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-ink">Frequently Asked Questions</h2>
              <FAQAccordion items={ESTIMATE_FAQS} />
            </div>
          </div>

          <div className="mt-16">
            <CTASection
              title="Ready to Bill Your Client?"
              description="Switch to Expenseliy's Free Invoice Maker when your estimate gets approved."
              primaryCtaText="Go to Invoice Generator"
              primaryCtaHref="/invoice-generator"
            />
          </div>
        </Container>
      </div>
    </>
  );
}
