"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { PurchaseOrderGenerator } from "@/components/tools/PurchaseOrderGenerator";
import { getWebApplicationSchema, getFAQSchema } from "@/lib/seo";

const PO_FAQS: FAQItem[] = [
  {
    question: "What is a Purchase Order (PO)?",
    answer:
      "A Purchase Order (PO) is a legally binding commercial document issued by a buyer to a seller indicating product types, quantities, and agreed prices.",
  },
  {
    question: "Why should small businesses use purchase orders?",
    answer:
      "Purchase orders prevent duplicate purchasing errors, clarify agreed unit pricing in writing, and simplify bookkeeping reconciliations.",
  },
];

export default function PurchaseOrderPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Purchase Order (PO) Generator",
    description: "Generate and download professional B2B purchase orders in PDF format.",
    url: "/tools/purchase-order-generator",
  });
  const faqSchema = getFAQSchema(PO_FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="py-8 md:py-12 bg-canvas">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Financial Tools", url: "/tools" },
              { name: "PO Generator", url: "/tools/purchase-order-generator" },
            ]}
          />

          <div className="mt-6 mb-8 text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="sky">B2B Procurement</Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink tracking-tight">
              Free Purchase Order (PO) Generator & Formatter
            </h1>
            <p className="text-base sm:text-lg text-ink-muted">
              Create standardized B2B purchase orders with line items, SKU tracking, vendor details, and PDF export.
            </p>
          </div>

          <PurchaseOrderGenerator />

          <div className="mt-16 max-w-4xl mx-auto space-y-10 text-ink leading-relaxed">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-ink">Frequently Asked Questions</h2>
              <FAQAccordion items={PO_FAQS} />
            </div>
          </div>

          <div className="mt-16">
            <CTASection
              title="Track Vendor Invoices & Business Expenses"
              description="Match your purchase orders against incoming vendor bills using Expenseliy's expense tracker."
              primaryCtaText="Start Free Today"
              primaryCtaHref="/pricing"
            />
          </div>
        </Container>
      </div>
    </>
  );
}
