"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { PackingSlipGenerator } from "@/components/tools/PackingSlipGenerator";
import { getWebApplicationSchema, getFAQSchema } from "@/lib/seo";

const SLIP_FAQS: FAQItem[] = [
  {
    question: "What is the purpose of a packing slip?",
    answer:
      "A packing slip is a shipping document enclosed inside a parcel package that lists item descriptions, SKUs, and exact quantities included in the shipment.",
  },
  {
    question: "Does a packing slip show product prices?",
    answer:
      "Unlike an invoice, standard packing slips typically omit prices, discounts, and payment terms, focusing solely on product counts and shipment notes.",
  },
];

export default function PackingSlipPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Packing Slip & Delivery Note Maker",
    description: "Generate and download professional shipping packing slips and delivery notes.",
    url: "/tools/packing-slip-generator",
  });
  const faqSchema = getFAQSchema(SLIP_FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="py-8 md:py-12 bg-canvas">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Financial Tools", url: "/tools" },
              { name: "Packing Slip Generator", url: "/tools/packing-slip-generator" },
            ]}
          />

          <div className="mt-6 mb-8 text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="income">Fulfillment & Shipping</Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink tracking-tight">
              Packing Slip & Delivery Note Maker
            </h1>
            <p className="text-base sm:text-lg text-ink-muted">
              Generate warehouse packing slips, delivery manifests, and itemized shipment receipts with tracking details.
            </p>
          </div>

          <PackingSlipGenerator />

          <div className="mt-16 max-w-4xl mx-auto space-y-10 text-ink leading-relaxed">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-ink">Frequently Asked Questions</h2>
              <FAQAccordion items={SLIP_FAQS} />
            </div>
          </div>

          <div className="mt-16">
            <CTASection
              title="Simplify Shipping & Retail Invoicing"
              description="Use Expenseliy's suite of free business tools to create invoices, bills, and track packaging expenses."
              primaryCtaText="Explore All Tools"
              primaryCtaHref="/tools"
            />
          </div>
        </Container>
      </div>
    </>
  );
}
