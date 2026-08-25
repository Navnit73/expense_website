import type { Metadata } from "next";
import Image from "next/image";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { Button } from "@/components/marketing/Button";
import { CTASection } from "@/components/marketing/CTASection";
import { createPageMetadata } from "@/lib/seo";
import {
  ShieldCheck,
  Zap,
  Lock,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "About Expenseliy — Mission & Product Philosophy",
  description:
    "Learn about Expenseliy's mission to provide fast, privacy-conscious expense and financial tracking for individuals and households without accounting complexity.",
  path: "/about",
  keywords: [],
});

export default function AboutPage() {
  return (
    <div className="flex flex-col flex-1">
      {/* Header */}
      <header className="bg-surface border-b border-hairline py-12 sm:py-16">
        <Container size="default">
          <Breadcrumbs items={[{ name: "About", url: "/about" }]} className="mb-6" />

          <div className="max-w-3xl">
            <Badge variant="income" size="sm" className="mb-4">
              Our Mission & Philosophy
            </Badge>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4">
              Empowering Better Financial Decisions Through Clarity
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed">
              Expenseliy was created to bridge the gap between fragile, manual spreadsheets and
              overly complex, enterprise accounting software.
            </p>
          </div>
        </Container>
      </header>

      {/* Main Philosophy Content */}
      <div className="py-12 sm:py-16 bg-canvas">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Left Narrative Column */}
            <div className="lg:col-span-8 space-y-8 text-ink">
              <section className="bg-surface border border-hairline rounded-md p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight mb-4">
                  The Problem We Solve
                </h2>
                <p className="text-sm sm:text-base text-ink-secondary leading-relaxed mb-4">
                  For most individuals, working professionals, and the self-employed, existing
                  financial management tools fall into two frustrating extremes:
                </p>
                <ul className="space-y-3 text-sm sm:text-base text-ink-secondary mb-4">
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-sm bg-expense shrink-0 mt-2" />
                    <span>
                      <strong>Manual Spreadsheets:</strong> Flexible, but tedious on mobile, error-prone,
                      and lacking automated trend calculations or anomaly detection.
                    </span>
                  </li>
                  <li className="flex items-start gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-sm bg-expense shrink-0 mt-2" />
                    <span>
                      <strong>Enterprise Accounting Suites:</strong> Overwhelming charts of accounts,
                      constant bank-sync errors, high monthly subscription costs, and excessive clutter.
                    </span>
                  </li>
                </ul>
                <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
                  Expenseliy provides a focused, high-speed alternative: an instant ledger for
                  expenses, income, and investments with automated visual analytics and actionable
                  health scoring.
                </p>
              </section>

              <section className="bg-surface border border-hairline rounded-md p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight mb-4">
                  Who Expenseliy is Built For
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-canvas border border-hairline rounded-md p-4">
                    <h3 className="font-bold text-sm text-ink mb-1">Working Professionals</h3>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      Track everyday spending, optimize monthly savings rates, and eliminate zombie
                      subscriptions.
                    </p>
                  </div>
                  <div className="bg-canvas border border-hairline rounded-md p-4">
                    <h3 className="font-bold text-sm text-ink mb-1">Self-Employed & Freelancers</h3>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      Track variable client income, categorize tax-deductible expenses,
                      and export clean CSVs for accountant filing.
                    </p>
                  </div>
                  <div className="bg-canvas border border-hairline rounded-md p-4">
                    <h3 className="font-bold text-sm text-ink mb-1">Household Bill Trackers</h3>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      Audit recurring utilities, subscriptions, rent/mortgage, and shared family living
                      costs with automated recurring detection.
                    </p>
                  </div>
                  <div className="bg-canvas border border-hairline rounded-md p-4">
                    <h3 className="font-bold text-sm text-ink mb-1">Disciplined Investors</h3>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      Monitor capital allocation across stocks, ETFs, crypto, and real estate alongside
                      routine cash flow.
                    </p>
                  </div>
                </div>
              </section>

              <section className="bg-surface border border-hairline rounded-md p-6 sm:p-8">
                <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight mb-4">
                  Our Privacy & Security Commitment
                </h2>
                <p className="text-sm sm:text-base text-ink-secondary leading-relaxed mb-4">
                  Financial data is deeply personal. Our platform is built upon strict foundational
                  tenets:
                </p>
                <div className="space-y-3 text-xs sm:text-sm text-ink-secondary">
                  <div className="flex items-start gap-2.5">
                    <Lock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong>Strict Data Isolation:</strong> Every record query is cryptographically
                      bound to your authenticated session ID.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <ShieldCheck className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong>Zero Data Resale:</strong> We never monetize, sell, or license user
                      transaction records or financial profiles to third-party ad networks.
                    </span>
                  </div>
                  <div className="flex items-start gap-2.5">
                    <Zap className="w-4 h-4 text-primary shrink-0 mt-0.5" />
                    <span>
                      <strong>Total Data Portability:</strong> Export your full dataset as a clean CSV at
                      any time, or permanently delete your account with one click.
                    </span>
                  </div>
                </div>
              </section>
            </div>

            {/* Right Pillars Sidebar */}
            <div className="lg:col-span-4 space-y-6">
              <div className="bg-surface border border-hairline rounded-md p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-ink font-mono mb-4">
                  Product Principles
                </h3>
                <div className="flex flex-col gap-4">
                  <div>
                    <h4 className="text-sm font-bold text-ink mb-1">1. Speed First</h4>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      Logging a purchase should take 5 seconds. Friction kills habits.
                    </p>
                  </div>
                  <div className="border-t border-hairline pt-3">
                    <h4 className="text-sm font-bold text-ink mb-1">2. Structured Simplicity</h4>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      Clean borders, readable typography, zero box shadows, and no decorative bloat.
                    </p>
                  </div>
                  <div className="border-t border-hairline pt-3">
                    <h4 className="text-sm font-bold text-ink mb-1">3. Objective Insights</h4>
                    <p className="text-xs text-ink-muted leading-relaxed">
                      Transparent algorithmic health scoring and anomaly alerts without misleading
                      financial promises.
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-surface-raised border border-hairline-strong rounded-md p-6">
                <div className="flex items-center gap-2 mb-2">
                  <Image
                    src="/favicon.ico"
                    alt="Expenseliy Logo"
                    width={18}
                    height={18}
                    className="rounded shrink-0"
                  />
                  <span className="font-bold text-sm text-ink">Get Started Today</span>
                </div>
                <p className="text-xs text-ink-muted mb-4 leading-relaxed">
                  Join users taking control of their cash flow with Expenseliy.
                </p>
                <Button
                  href="https://app.expenseliy.com/auth/signin"
                  variant="primary"
                  size="sm"
                  className="w-full justify-center"
                >
                  Create Free Account
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </div>

      {/* Bottom CTA */}
      <CTASection
        title="Experience Clean, Modern Financial Management"
        description="Start tracking your expenses, income, and investments with complete clarity today."
        badgeText="Try Expenseliy"
      />
    </div>
  );
}
