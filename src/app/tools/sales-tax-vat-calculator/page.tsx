"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { SalesTaxVatCalculator } from "@/components/tools/SalesTaxVatCalculator";
import { getWebApplicationSchema, getFAQSchema } from "@/lib/seo";

const TAX_FAQS: FAQItem[] = [
  {
    question: "How do you calculate Reverse VAT (extracting tax from a total)?",
    answer:
      "To extract VAT from a gross total, use the formula: Net Amount = Gross Total / (1 + (VAT Rate / 100)). The VAT amount is simply Gross Total minus Net Amount.",
  },
  {
    question: "What is the difference between Sales Tax and VAT/GST?",
    answer:
      "Sales tax is a single-stage tax levied only at the final point of sale to the consumer. VAT and GST are multi-stage taxes collected at each stage of the supply chain with input tax credits.",
  },
];

export default function SalesTaxVatPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Sales Tax & Reverse VAT Calculator",
    description: "Calculate sales tax or reverse extract VAT and GST from receipts.",
    url: "/tools/sales-tax-vat-calculator",
  });
  const faqSchema = getFAQSchema(TAX_FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="py-8 md:py-12 bg-canvas">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Financial Tools", url: "/tools" },
              { name: "Sales Tax & VAT Calculator", url: "/tools/sales-tax-vat-calculator" },
            ]}
          />

          <div className="mt-6 mb-8 text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="income">Global Tax Converter</Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink tracking-tight">
              Sales Tax & Reverse VAT / GST Calculator
            </h1>
            <p className="text-base sm:text-lg text-ink-muted">
              Add sales tax to base prices or reverse-calculate the net amount and VAT included in total receipts.
            </p>
          </div>

          <SalesTaxVatCalculator />

          <div className="mt-16 max-w-4xl mx-auto space-y-10 text-ink leading-relaxed">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-ink">Frequently Asked Questions</h2>
              <FAQAccordion items={TAX_FAQS} />
            </div>
          </div>

          <div className="mt-16">
            <CTASection
              title="Generate Invoices with Automatic Tax Calculation"
              description="Expenseliy's Free Invoice Maker calculates multi-state sales tax and global VAT automatically."
              primaryCtaText="Create Invoice Free"
              primaryCtaHref="/invoice-generator"
            />
          </div>
        </Container>
      </div>
    </>
  );
}
