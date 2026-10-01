"use client";

import React from "react";
import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { BankStatementCsvFormatter } from "@/components/tools/BankStatementCsvFormatter";
import { getWebApplicationSchema, getFAQSchema } from "@/lib/seo";

const BANK_CSV_FAQS: FAQItem[] = [
  {
    question: "Is my financial data uploaded to any server?",
    answer:
      "No. All parsing and formatting happens 100% locally in your web browser using client-side JavaScript. No transaction lines or account numbers are ever transmitted to any external server.",
  },
  {
    question: "Which accounting software can import this CSV?",
    answer:
      "The exported CSV contains standard Date, Description, Amount, and Type columns compatible with QuickBooks Online, Xero, Wave, FreshBooks, Excel, and Expenseliy.",
  },
];

export default function BankStatementCsvPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Bank Statement & PDF Transaction CSV Formatter",
    description: "Convert raw statement transaction text into clean accounting-ready CSV files.",
    url: "/tools/bank-statement-csv-formatter",
  });
  const faqSchema = getFAQSchema(BANK_CSV_FAQS);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />

      <div className="py-8 md:py-12 bg-canvas">
        <Container>
          <Breadcrumbs
            items={[
              { name: "Financial Tools", url: "/tools" },
              { name: "Bank Statement Formatter", url: "/tools/bank-statement-csv-formatter" },
            ]}
          />

          <div className="mt-6 mb-8 text-center max-w-3xl mx-auto space-y-3">
            <Badge variant="sky">Private Browser Utility</Badge>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-black text-ink tracking-tight">
              Bank Statement & PDF Transaction CSV Formatter
            </h1>
            <p className="text-base sm:text-lg text-ink-muted">
              Paste raw bank text lines to clean, standardize, and export spreadsheet-ready CSV files. Zero tracking.
            </p>
          </div>

          <BankStatementCsvFormatter />

          <div className="mt-16 max-w-4xl mx-auto space-y-10 text-ink leading-relaxed">
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-ink">Frequently Asked Questions</h2>
              <FAQAccordion items={BANK_CSV_FAQS} />
            </div>
          </div>

          <div className="mt-16">
            <CTASection
              title="Track Expenses Automatically with Expenseliy"
              description="Keep your spending organized in a privacy-first multi-asset ledger with zero bank login requirements."
              primaryCtaText="Start Free Today"
              primaryCtaHref="/pricing"
            />
          </div>
        </Container>
      </div>
    </>
  );
}
