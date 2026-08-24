import type { Metadata } from "next";
import {
  ArrowRight,
  TrendingUp,
  Receipt,
  PiggyBank,
  LineChart,
  BrainCircuit,
  Lock,
  Download,
  Globe2,
  Trash2,
  CheckCircle2,
  Sparkles,
  ShieldCheck,
  Zap,
  BarChart3,
  Layers,
} from "lucide-react";
import { Container } from "@/components/marketing/Container";
import { Section } from "@/components/marketing/Section";
import { Button } from "@/components/marketing/Button";
import { Badge } from "@/components/marketing/Badge";
import { ProductPreview } from "@/components/marketing/ProductPreview";
import { FeatureCard } from "@/components/marketing/FeatureCard";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { CTASection } from "@/components/marketing/CTASection";
import {
  createPageMetadata,
  getOrganizationSchema,
  getWebsiteSchema,
  getSoftwareAppSchema,
} from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Simple Expense Tracking & Financial Management",
  description:
    "Expenseliy provides clean, structured expense, income, and investment tracking for individuals and small businesses with algorithmic insights and zero complexity.",
  path: "/",
});

const HOMEPAGE_FAQS: FAQItem[] = [
  {
    question: "What is Expenseliy?",
    answer:
      "Expenseliy is a modern expense tracking and financial management web application built for individuals, freelancers, and small businesses. It enables you to record expenses, track multiple income streams, monitor investment holdings, and receive algorithmic financial health insights without complicated accounting bloat.",
  },
  {
    question: "Is Expenseliy free to use?",
    answer:
      "Yes. Expenseliy offers a 100% Free plan that includes 40 lifetime transactions, complete dashboard analytics, custom category management, basic financial health scoring, and CSV data exports.",
  },
  {
    question: "What does the Pro subscription include?",
    answer:
      "Expenseliy Pro provides unlimited lifetime transactions, higher AI insight quotas for deep anomaly detection and category forecasting, priority customer support, and advanced printable report generators for $15/month or $99/year ($8.25/month effective).",
  },
  {
    question: "Can I track income and investments in addition to expenses?",
    answer:
      "Yes. Expenseliy is built around three core transaction types: Expenses, Income (salary, freelance, dividends, rental cash flow), and Investments (stocks, mutual funds, ETFs, cryptocurrency, gold, and real estate).",
  },
  {
    question: "Can I export my financial data?",
    answer:
      "Yes. You can export your entire transaction ledger to CSV at any time for your accountant, tax filing software, or personal spreadsheets.",
  },
  {
    question: "Does Expenseliy provide financial advice?",
    answer:
      "No. Expenseliy provides record-keeping, algorithmic metrics, and AI-assisted summaries for informational and organizational purposes only. They do not constitute certified financial, tax, or legal advice.",
  },
  {
    question: "Can I delete my account and data?",
    answer:
      "Yes. Expenseliy provides a self-serve account deletion option in user settings that permanently purges your user profile, transactions, categories, and analytics from the database.",
  },
];

export default function HomePage() {
  const orgSchema = getOrganizationSchema();
  const webSiteSchema = getWebsiteSchema();
  const appSchema = getSoftwareAppSchema();

  return (
    <div className="flex flex-col flex-1">
      {/* Structured Data JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appSchema) }}
      />

      {/* Hero Section */}
      <section className="bg-canvas border-b border-hairline pt-14 pb-16 sm:pt-20 sm:pb-24 overflow-hidden">
        <Container size="default">
          <div className="flex flex-col items-center text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-income-bg text-income border border-income-border text-xs font-semibold uppercase tracking-wider mb-6 font-mono">
              <Sparkles className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Modern Financial Management SaaS</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-ink tracking-tight leading-[1.1] mb-6">
              Simple expense tracking for{" "}
              <span className="text-primary underline decoration-primary/30 underline-offset-4">
                better financial decisions
              </span>
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed max-w-2xl mb-8">
              Expenseliy gives individuals and small businesses clear control over income,
              expenses, investments, and spending patterns with instant analytics and algorithmic
              insights.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
              <Button
                href="https://app.expenseliy.com/signup"
                variant="primary"
                size="lg"
                className="w-full sm:w-auto"
                id="hero-primary-cta"
              >
                <span>Start Tracking Free</span>
                <ArrowRight className="w-4 h-4" aria-hidden="true" />
              </Button>
              <Button
                href="/how-it-works"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
                id="hero-secondary-cta"
              >
                <span>See How It Works</span>
              </Button>
            </div>

            <div className="flex items-center gap-6 mt-8 text-xs text-ink-muted">
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                <span>40 free transactions</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                <span>No credit card required</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                <span>Zero box shadows</span>
              </div>
            </div>
          </div>

          {/* Product Preview Mockup */}
          <div className="max-w-5xl mx-auto">
            <ProductPreview />
          </div>
        </Container>
      </section>

      {/* Core Features Grid */}
      <Section id="features" variant="surface">
        <Container size="default">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Badge variant="income" size="sm" className="mb-3">
              Core Capabilities
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-4">
              Everything You Need to Manage Cash Flow
            </h2>
            <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
              Expenseliy combines day-to-day transaction logging with multi-asset tracking and
              automated variance diagnostics.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <FeatureCard
              icon={Receipt}
              title="Expense Tracking"
              badge="Daily Operations"
              badgeVariant="expense"
              description="Record expenses with precision: amount, category, merchant, payment method, date, custom tags, and notes."
              details={[
                "Multi-currency support",
                "Custom tags & project filters",
                "Instant search & category memory",
              ]}
            />

            <FeatureCard
              icon={TrendingUp}
              title="Income Tracking"
              badge="Cash Inflow"
              badgeVariant="income"
              description="Track primary salaries, freelance retainers, consulting payouts, rental income, and dividend yields in one ledger."
              details={[
                "Multiple income stream filters",
                "Net cash flow calculation",
                "Month-over-month inflow trends",
              ]}
            />

            <FeatureCard
              icon={Layers}
              title="Investment Tracking"
              badge="Portfolio"
              badgeVariant="investment"
              description="Monitor capital allocation across stocks, mutual funds, ETFs, cryptocurrency, precious metals, and real estate."
              details={[
                "Asset class breakdown",
                "Net asset snapshot",
                "Monthly capital allocation tracking",
              ]}
            />

            <FeatureCard
              icon={BarChart3}
              title="Financial Analytics"
              badge="Visual Data"
              badgeVariant="sky"
              description="Interactive visual trends for income vs expenses, category distributions, top spending items, and monthly savings rates."
              details={[
                "Interactive spending distribution",
                "Top vendor & merchant rankings",
                "Savings rate percentage monitor",
              ]}
            />

            <FeatureCard
              icon={PiggyBank}
              title="Financial Health Score"
              badge="Algorithmic"
              badgeVariant="warning"
              description="Algorithmic assessment evaluating your savings rate, fixed-to-discretionary ratio, and monthly expense volatility."
              details={[
                "0 to 100 benchmark score",
                "Recurring expense detection",
                "Month-over-month variance alerts",
              ]}
            />

            <FeatureCard
              icon={BrainCircuit}
              title="AI Financial Insights"
              badge="Informational"
              badgeVariant="default"
              description="Automated pattern analysis highlighting spending anomalies, category spikes, and budget forecasts."
              details={[
                "Anomaly & price hike warnings",
                "Category forecast projections",
                "Strict privacy & data isolation",
              ]}
            />
          </div>

          {/* AI Disclaimer Callout */}
          <div className="mt-8 p-4 rounded-md border border-hairline bg-canvas text-xs text-ink-muted text-center max-w-2xl mx-auto">
            <span className="font-semibold text-ink">Informational Notice:</span> AI-generated
            insights and algorithmic metrics are for informational purposes and should not be
            considered professional financial advice.
          </div>
        </Container>
      </Section>

      {/* How It Works Section */}
      <Section id="how-it-works" variant="default">
        <Container size="default">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Badge variant="sky" size="sm" className="mb-3">
              Frictionless Workflow
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-4">
              How Expenseliy Works in 4 Simple Steps
            </h2>
            <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
              No complex setup, no mandatory bank sync credentials, and no steep learning curve.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: "01",
                title: "Create Your Account",
                description:
                  "Sign up in seconds. Your private account workspace is provisioned with default standard categories immediately.",
              },
              {
                step: "02",
                title: "Add Transactions",
                description:
                  "Record income, everyday expenses, and investments with fast 5-second entry forms and currency tagging.",
              },
              {
                step: "03",
                title: "Understand Spending",
                description:
                  "View live segmented distributions, top merchants, savings rates, and month-over-month cash flow trends.",
              },
              {
                step: "04",
                title: "Use Smart Insights",
                description:
                  "Leverage automated anomaly alerts, recurring subscription detection, and export clean CSVs for tax time.",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-surface border border-hairline rounded-md p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="text-xs font-mono font-bold text-primary mb-3">
                    STEP {item.step}
                  </div>
                  <h3 className="text-base font-bold text-ink mb-2">{item.title}</h3>
                  <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>

      {/* Key Benefits Grid */}
      <Section variant="surface">
        <Container size="default">
          <div className="text-center max-w-3xl mx-auto mb-14">
            <Badge variant="income" size="sm" className="mb-3">
              Tangible Benefits
            </Badge>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-4">
              Designed for Clarity, Speed, and Control
            </h2>
            <p className="text-sm sm:text-base text-ink-secondary leading-relaxed">
              Why solopreneurs, freelancers, and financially conscious individuals choose
              Expenseliy.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                icon: Receipt,
                title: "Know Where Money Goes",
                desc: "Eliminate end-of-month surprises with an accurate, categorized transaction ledger.",
              },
              {
                icon: LineChart,
                title: "Understand Spending Patterns",
                desc: "Identify whether housing, dining, or software is expanding faster than income.",
              },
              {
                icon: PiggyBank,
                title: "Track Real Savings Rates",
                desc: "Calculate exact net monthly surplus and monitor savings progress over time.",
              },
              {
                icon: Layers,
                title: "Monitor Investments",
                desc: "Keep equities, index funds, crypto, and real estate visible alongside cash flow.",
              },
              {
                icon: Zap,
                title: "Identify Recurring Expenses",
                desc: "Spot silent subscription price increases and duplicate software licenses.",
              },
              {
                icon: Download,
                title: "Export Clean CSVs",
                desc: "Hand pristine, structured financial data to your CPA or accountant in one click.",
              },
              {
                icon: Globe2,
                title: "Manage Multi-Currencies",
                desc: "Record domestic and international transactions with clear currency tags.",
              },
              {
                icon: Trash2,
                title: "Total Data Control",
                desc: "Full account deletion and GDPR-aligned data erasure at your fingertips anytime.",
              },
            ].map((benefit, idx) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={idx}
                  className="bg-canvas border border-hairline rounded-md p-5 flex flex-col gap-3"
                >
                  <div className="w-8 h-8 rounded-md bg-surface border border-hairline flex items-center justify-center text-primary shrink-0">
                    <Icon className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <h3 className="text-sm font-bold text-ink">{benefit.title}</h3>
                  <p className="text-xs text-ink-secondary leading-relaxed">{benefit.desc}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </Section>

      {/* Security & Privacy Commitment */}
      <Section variant="default">
        <Container size="default">
          <div className="bg-surface border border-hairline-strong rounded-md p-8 sm:p-12">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
              <div className="lg:col-span-5 flex flex-col gap-4">
                <div className="w-10 h-10 rounded-md bg-income-bg border border-income-border flex items-center justify-center text-primary">
                  <ShieldCheck className="w-5 h-5" aria-hidden="true" />
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight">
                  Security & Privacy First
                </h2>
                <p className="text-sm text-ink-secondary leading-relaxed">
                  Your financial records belong to you. Expenseliy is built with rigorous
                  server-side data isolation, safe authentication, and zero third-party data selling.
                </p>
                <div className="pt-2">
                  <Button href="/privacy" variant="outline" size="sm">
                    Read Privacy Policy
                  </Button>
                </div>
              </div>

              <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="bg-canvas border border-hairline rounded-md p-4">
                  <div className="flex items-center gap-2 font-bold text-xs text-ink mb-1.5">
                    <Lock className="w-3.5 h-3.5 text-primary" />
                    <span>User Data Isolation</span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Every transaction query is strictly scoped to your verified account ID on the
                    server.
                  </p>
                </div>

                <div className="bg-canvas border border-hairline rounded-md p-4">
                  <div className="flex items-center gap-2 font-bold text-xs text-ink mb-1.5">
                    <Zap className="w-3.5 h-3.5 text-primary" />
                    <span>Server-Side Validation</span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    All transaction payloads undergo strict type checking and sanitization before
                    saving.
                  </p>
                </div>

                <div className="bg-canvas border border-hairline rounded-md p-4">
                  <div className="flex items-center gap-2 font-bold text-xs text-ink mb-1.5">
                    <BrainCircuit className="w-3.5 h-3.5 text-primary" />
                    <span>Privacy-Conscious AI</span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    AI summaries process only aggregated metrics without storing raw credentials or
                    sharing data.
                  </p>
                </div>

                <div className="bg-canvas border border-hairline rounded-md p-4">
                  <div className="flex items-center gap-2 font-bold text-xs text-ink mb-1.5">
                    <Trash2 className="w-3.5 h-3.5 text-primary" />
                    <span>One-Click Deletion</span>
                  </div>
                  <p className="text-xs text-ink-muted leading-relaxed">
                    Permanently delete your account and all financial records in settings with zero
                    retention.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Frequently Asked Questions */}
      <Section id="faq" variant="surface">
        <Container size="narrow">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <Badge variant="neutral" size="sm" className="mb-3">
              FAQ
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-3">
              Frequently Asked Questions
            </h2>
            <p className="text-sm text-ink-secondary leading-relaxed">
              Clear answers regarding Expenseliy functionality, pricing tiers, and data policies.
            </p>
          </div>

          <FAQAccordion items={HOMEPAGE_FAQS} />
        </Container>
      </Section>

      {/* Bottom CTA */}
      <CTASection
        title="Start Tracking Your Expenses with Complete Clarity"
        description="Join individuals and small businesses making informed financial choices with Expenseliy."
        badgeText="Get Started Free"
      />
    </div>
  );
}
