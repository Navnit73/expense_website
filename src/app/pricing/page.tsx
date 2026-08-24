import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/marketing/Container";
import { Section } from "@/components/marketing/Section";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { PricingCard, PricingPlan } from "@/components/marketing/PricingCard";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { CTASection } from "@/components/marketing/CTASection";
import { createPageMetadata, getSoftwareAppSchema, getFAQSchema } from "@/lib/seo";
import { Check, Minus } from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Simple, Transparent Pricing Plans",
  description:
    "Start free with 40 lifetime transactions, or upgrade to Pro for unlimited transactions, higher AI insights limits, and priority support.",
  path: "/pricing",
  keywords: [
    "expense tracker pricing",
    "free expense tracker",
    "pro expense tracker",
    "affordable personal finance software",
    "household bill tracker cost",
  ],
});

const PRICING_PLANS: PricingPlan[] = [
  {
    id: "free",
    name: "Free",
    price: "$0",
    period: "forever",
    description:
      "Essential expense and income tracking for individuals starting their financial journey.",
    features: [
      "40 lifetime transactions",
      "Unified financial dashboard",
      "Basic expense & income analytics",
      "Custom category management",
      "Basic financial health score",
      "CSV data export",
      "Community support",
    ],
    ctaText: "Start Free",
    ctaHref: "https://app.expenseliy.com/signup",
    ctaVariant: "secondary",
  },
  {
    id: "pro-monthly",
    name: "Pro Monthly",
    price: "$15",
    period: "/ month",
    description:
      "Full financial capabilities for active individuals, working professionals, and the self-employed.",
    features: [
      "Unlimited transactions",
      "Advanced multi-asset tracking (Investments)",
      "Higher AI insights & forecasting quota",
      "Automated recurring expense detection",
      "Month-over-month variance analysis",
      "Printable executive reports",
      "One-click CSV exports",
      "Priority customer support",
    ],
    ctaText: "Upgrade to Pro",
    ctaHref: "https://app.expenseliy.com/signup?plan=pro-monthly",
    ctaVariant: "secondary",
  },
  {
    id: "pro-annual",
    name: "Pro Annual",
    badge: "Best Value",
    popular: true,
    price: "$99",
    period: "/ year",
    subtext: "Effective $8.25 / month (Save 45% vs monthly)",
    description:
      "Our most popular option for continuous long-term financial management and disciplined tracking.",
    features: [
      "Unlimited transactions",
      "All Pro Monthly features included",
      "Highest AI insight & anomaly limits",
      "Multi-currency support",
      "Dedicated priority queue support",
      "Early access to new financial engines",
      "Billed once annually at $99",
    ],
    ctaText: "Get Pro Annual",
    ctaHref: "https://app.expenseliy.com/signup?plan=pro-annual",
    ctaVariant: "primary",
  },
];

const PRICING_FAQS: FAQItem[] = [
  {
    question: "What happens when I reach the 40 transaction limit on the Free plan?",
    answer:
      "You retain full access to view, search, analyze, and export all 40 existing transactions. To log additional transactions and unlock continuous tracking, you can upgrade to Pro Monthly or Pro Annual at any time.",
  },
  {
    question: "How does the Pro Annual billing work?",
    answer:
      "Pro Annual is billed as a single upfront payment of $99 once per year, which equates to an effective rate of $8.25 per month. You can cancel auto-renewal at any time in account settings.",
  },
  {
    question: "Do I need to enter a credit card to start the Free plan?",
    answer:
      "No. You can create your account and use the Free tier (including all 40 transactions) without entering any payment or credit card details.",
  },
  {
    question: "Can I export my data if I decide to cancel?",
    answer:
      "Yes. You can export your full transaction history to a standard CSV file at any time, even after canceling a paid subscription.",
  },
  {
    question: "What payment methods are supported?",
    answer:
      "Depending on your region, we support major credit and debit cards (Visa, Mastercard, American Express) through secure, PCI-compliant payment gateways.",
  },
];

const COMPARISON_TABLE = [
  { feature: "Lifetime Transactions", free: "40 total", proMonthly: "Unlimited", proAnnual: "Unlimited" },
  { feature: "Expense & Income Tracking", free: true, proMonthly: true, proAnnual: true },
  { feature: "Investment Portfolio Tracking", free: false, proMonthly: true, proAnnual: true },
  { feature: "Custom Categories", free: true, proMonthly: true, proAnnual: true },
  { feature: "Financial Health Score", free: "Basic", proMonthly: "Advanced", proAnnual: "Advanced" },
  { feature: "Recurring Expense Detection", free: false, proMonthly: true, proAnnual: true },
  { feature: "AI Financial Insights Quota", free: "Basic (5/mo)", proMonthly: "Standard (50/mo)", proAnnual: "High Quota (100/mo)" },
  { feature: "CSV Ledger Export", free: true, proMonthly: true, proAnnual: true },
  { feature: "Printable Reports", free: false, proMonthly: true, proAnnual: true },
  { feature: "Support Tier", free: "Standard", proMonthly: "Priority", proAnnual: "Dedicated Priority" },
];

export default function PricingPage() {
  const schema = getSoftwareAppSchema();
  const faqSchema = getFAQSchema(PRICING_FAQS);

  return (
    <div className="flex flex-col flex-1">
      {/* Schema Injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      {/* Header */}
      <header className="bg-surface border-b border-hairline py-12 sm:py-16">
        <Container size="default">
          <Breadcrumbs items={[{ name: "Pricing", url: "/pricing" }]} className="mb-6" />

          <div className="max-w-3xl">
            <Badge variant="income" size="sm" className="mb-4">
              Simple & Transparent
            </Badge>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4">
              Straightforward Plans with No Hidden Fees
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed">
              Start with 40 free lifetime transactions to test the workflow. Upgrade to Pro whenever
              you need unlimited volume, higher AI quotas, and priority support.
            </p>
          </div>
        </Container>
      </header>

      {/* Pricing Cards Grid */}
      <Section variant="default" className="py-12 sm:py-16">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {PRICING_PLANS.map((plan) => (
              <PricingCard key={plan.id} plan={plan} />
            ))}
          </div>

          {/* Billing Terms Notice */}
          <div className="mt-8 text-center text-xs text-ink-muted max-w-xl mx-auto">
            <p>
              * Billing terms, taxes, and payment gateway availability may depend on your regional
              configuration. All plans include full data export and self-serve cancellation.
            </p>
          </div>
        </Container>
      </Section>

      {/* Feature Comparison Matrix */}
      <Section variant="surface">
        <Container size="default">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-2">
              Detailed Plan Comparison
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary">
              Review exact capabilities across our Free and Pro subscription tiers.
            </p>
          </div>

          <div className="overflow-x-auto bg-surface border border-hairline rounded-md">
            <table className="w-full text-left text-xs sm:text-sm border-collapse">
              <thead>
                <tr className="border-b border-hairline bg-canvas text-ink">
                  <th className="py-3.5 px-4 sm:px-6 font-semibold">Features & Limits</th>
                  <th className="py-3.5 px-4 font-semibold text-center w-28 sm:w-36">Free</th>
                  <th className="py-3.5 px-4 font-semibold text-center w-28 sm:w-36">Pro Monthly</th>
                  <th className="py-3.5 px-4 font-semibold text-center w-28 sm:w-36 bg-income-bg text-income border-x border-income-border">
                    Pro Annual
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {COMPARISON_TABLE.map((row, idx) => (
                  <tr key={idx} className="hover:bg-canvas transition-colors">
                    <td className="py-3.5 px-4 sm:px-6 font-medium text-ink">
                      {row.feature}
                    </td>
                    <td className="py-3.5 px-4 text-center text-ink-secondary">
                      {typeof row.free === "boolean" ? (
                        row.free ? (
                          <Check className="w-4 h-4 text-income mx-auto stroke-[3]" />
                        ) : (
                          <Minus className="w-4 h-4 text-ink-faint mx-auto" />
                        )
                      ) : (
                        row.free
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center text-ink-secondary">
                      {typeof row.proMonthly === "boolean" ? (
                        row.proMonthly ? (
                          <Check className="w-4 h-4 text-income mx-auto stroke-[3]" />
                        ) : (
                          <Minus className="w-4 h-4 text-ink-faint mx-auto" />
                        )
                      ) : (
                        row.proMonthly
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-center font-medium text-ink bg-income-bg/40 border-x border-income-border/50">
                      {typeof row.proAnnual === "boolean" ? (
                        row.proAnnual ? (
                          <Check className="w-4 h-4 text-income mx-auto stroke-[3]" />
                        ) : (
                          <Minus className="w-4 h-4 text-ink-faint mx-auto" />
                        )
                      ) : (
                        row.proAnnual
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Container>
      </Section>

      {/* Pricing FAQs */}
      <Section variant="default">
        <Container size="narrow">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Badge variant="neutral" size="sm" className="mb-3">
              Pricing Details
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-2">
              Frequently Asked Pricing Questions
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary">
              Everything you need to know about billing, renewals, and data access.
            </p>
          </div>

          <FAQAccordion items={PRICING_FAQS} />
        </Container>
      </Section>

      {/* Bottom CTA */}
      <CTASection
        title="Ready to Transform Your Financial Tracking?"
        description="Create your free account today and start tracking in under 60 seconds."
        badgeText="Get Started"
      />
    </div>
  );
}
