import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { GuideCard } from "@/components/marketing/GuideCard";
import { GuideCatalog } from "@/components/marketing/GuideCatalog";
import { CTASection } from "@/components/marketing/CTASection";
import { getAllGuides, getAllCategories } from "@/lib/guide";
import { createPageMetadata, getBreadcrumbSchema } from "@/lib/seo";
import {
  BookOpen,
  Receipt,
  Briefcase,
  Layers,
  LineChart,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Financial Guides & Expense Tracking Knowledge Hub",
  description:
    "Explore comprehensive, step-by-step guides on personal expense tracking, household budgeting, self-employed tax deductions, and investment tracking.",
  path: "/guide",
  keywords: [
    
  ],
});

export default function GuideIndexPage() {
  const guides = getAllGuides();
  const categories = getAllCategories();

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Guide", url: "/guide" },
  ]);

  // Pick the premier featured guide (e.g. 'expense-tracking')
  const featuredGuide =
    guides.find((g) => g.slug === "expense-tracking") || guides[0];
  const remainingGuides = guides.filter((g) => g.slug !== featuredGuide?.slug);

  const TOPIC_PILLARS = [
    {
      icon: Receipt,
      name: "Expense Tracking",
      desc: "Daily logging, categories & receipt audit frameworks.",
      count: guides.filter((g) => g.category === "Expense Tracking").length,
    },
    {
      icon: Briefcase,
      name: "Self-Employed & Tax",
      desc: "Tax write-offs, contractor costs & deductible receipts.",
      count: guides.filter((g) => g.category.includes("Business") || g.category.includes("Tax") || g.category.includes("Self-Employed")).length,
    },
    {
      icon: Layers,
      name: "Investment Tracking",
      desc: "Managing stocks, ETFs, crypto & real estate alongside cash flow.",
      count: guides.filter((g) => g.category === "Investment Tracking").length,
    },
    {
      icon: LineChart,
      name: "Cash Flow & Analytics",
      desc: "Savings rate optimization, MoM trends & health scoring.",
      count:
        guides.filter((g) => g.category === "Cash Flow & Analytics" || g.category === "Savings & Wealth")
          .length || 2,
    },
  ];

  return (
    <div className="flex flex-col flex-1">
      {/* Inject Breadcrumb JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />

      {/* Editorial Header */}
      <header className="bg-surface border-b border-hairline py-12 sm:py-16">
        <Container size="default">
          <Breadcrumbs items={[{ name: "Guide", url: "/guide" }]} className="mb-6" />

          <div className="max-w-3xl mb-10">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-income-bg text-income border border-income-border text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Expenseliy Knowledge Hub</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4 leading-tight">
              Master Your Money with Proven Frameworks & Practical Guides
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed">
              Explore in-depth, actionable guides written by financial analysts and product
              engineers to help you optimize cash flow, track business costs, and monitor
              investments.
            </p>
          </div>

          {/* Featured Article Card */}
          {featuredGuide && (
            <div className="mt-8">
              <GuideCard guide={featuredGuide} featured={true} />
            </div>
          )}
        </Container>
      </header>

      {/* Topic Pillars Quick Navigation */}
      <section className="py-10 bg-canvas border-b border-hairline">
        <Container size="default">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {TOPIC_PILLARS.map((pillar, idx) => {
              const Icon = pillar.icon;
              return (
                <div
                  key={idx}
                  className="bg-surface border border-hairline rounded-md p-4 flex items-start gap-3 hover:border-hairline-strong transition-colors"
                >
                  <div className="w-9 h-9 rounded-md bg-homepage-mintcream dark:bg-surface-raised border border-hairline flex items-center justify-center text-primary shrink-0">
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <div>
                    <h3 className="font-bold text-xs sm:text-sm text-ink">{pillar.name}</h3>
                    <p className="text-[11px] text-ink-muted leading-snug mt-0.5 mb-1.5">
                      {pillar.desc}
                    </p>
                    <span className="text-[10px] font-mono font-semibold text-primary">
                      {pillar.count} {pillar.count === 1 ? "Guide" : "Guides"}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Interactive Guides Catalog (Search + Category Filter + Grid) */}
      <section className="py-12 sm:py-16 bg-canvas flex-1">
        <Container size="default">
          <div className="mb-6">
            <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight mb-1">
              Browse All Financial Guides
            </h2>
            <p className="text-xs sm:text-sm text-ink-muted">
              Filter by topic or search for specific concepts, tax guidelines, and tracking strategies.
            </p>
          </div>

          <GuideCatalog
            guides={[featuredGuide, ...remainingGuides].filter(Boolean)}
            categories={categories}
          />
        </Container>
      </section>

      {/* Bottom CTA */}
      <CTASection
        title="Apply These Frameworks Inside Expenseliy"
        description="Expenseliy gives you a unified dashboard for expenses, income, and investments with 40 free lifetime transactions."
        badgeText="Get Started"
      />
    </div>
  );
}
