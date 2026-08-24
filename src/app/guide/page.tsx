import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { GuideCard } from "@/components/marketing/GuideCard";
import { CTASection } from "@/components/marketing/CTASection";
import { getAllGuides, getAllCategories } from "@/lib/guide";
import { createPageMetadata } from "@/lib/seo";
import { BookOpen } from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Financial Guides & Expense Tracking Knowledge Hub",
  description:
    "Comprehensive guides on expense tracking, personal finance, small business cash flow management, budgeting strategies, and investment tracking.",
  path: "/guide",
  keywords: [
    "expense tracking guide",
    "personal finance guide",
    "small business expense guide",
    "budgeting best practices",
    "financial management tutorials",
    "track business expenses",
  ],
});

export default function GuideIndexPage() {
  const guides = getAllGuides();
  const categories = getAllCategories();

  return (
    <div className="flex flex-col flex-1">
      {/* Hero Section */}
      <section className="bg-surface border-b border-hairline py-12 sm:py-16">
        <Container size="default">
          <Breadcrumbs items={[{ name: "Guide", url: "/guide" }]} className="mb-6" />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-income-bg text-income border border-income-border text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Knowledge Center</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4">
              Financial Guides & Expense Management
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed">
              Explore practical, in-depth frameworks to master your money. From tracking personal
              daily cash flow to managing tax-deductible business expenses and portfolio assets.
            </p>
          </div>
        </Container>
      </section>

      {/* Main Guides Catalog */}
      <section className="py-12 sm:py-16 bg-canvas flex-1">
        <Container size="default">
          {/* Categories Pill Bar */}
          <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-8">
            <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider font-mono shrink-0 mr-2">
              Topics:
            </span>
            <span className="px-3 py-1.5 rounded-md bg-surface text-ink font-semibold text-xs border border-hairline-strong shrink-0">
              All Articles ({guides.length})
            </span>
            {categories.map((cat) => (
              <span
                key={cat}
                className="px-3 py-1.5 rounded-md bg-surface text-ink-secondary text-xs border border-hairline shrink-0"
              >
                {cat}
              </span>
            ))}
          </div>

          {/* Grid of Articles */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {guides.map((guide) => (
              <GuideCard key={guide.slug} guide={guide} />
            ))}
          </div>
        </Container>
      </section>

      {/* Bottom CTA */}
      <CTASection
        title="Put These Financial Best Practices into Action"
        description="Expenseliy gives you the tools to track income, categorize expenses, and monitor investments in a clean, distraction-free environment."
        badgeText="Start Today"
      />
    </div>
  );
}
