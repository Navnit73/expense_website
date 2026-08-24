import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { createPageMetadata, SITE_CONFIG } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Refund & Cancellation Policy",
  description:
    "Review our transparent refund policy and subscription cancellation terms for Expenseliy Pro tiers.",
  path: "/refund-policy",
});

export default function RefundPolicyPage() {
  return (
    <div className="flex flex-col flex-1">
      <header className="bg-surface border-b border-hairline py-12 sm:py-16">
        <Container size="narrow">
          <Breadcrumbs items={[{ name: "Refund Policy", url: "/refund-policy" }]} className="mb-6" />
          <Badge variant="neutral" size="sm" className="mb-4">
            Legal & Compliance
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-4">
            Refund & Cancellation Policy
          </h1>
          <p className="text-xs sm:text-sm text-ink-muted">
            Last Updated: August 24, 2026 • Effective Date: August 24, 2026
          </p>
        </Container>
      </header>

      <section className="py-12 sm:py-16 bg-canvas flex-1">
        <Container size="narrow">
          <div className="bg-surface border border-hairline rounded-md p-6 sm:p-10 space-y-8 text-sm sm:text-base text-ink-secondary leading-relaxed">
            <div>
              <h2 className="text-xl font-bold text-ink tracking-tight mb-3">1. Overview</h2>
              <p>
                At Expenseliy ({SITE_CONFIG.url}), operated by <strong>{SITE_CONFIG.legalEntity}</strong>, we strive to maintain transparent and straightforward billing. Because our Free tier includes 40 lifetime transactions with complete dashboard and analytics access, users are encouraged to test our platform thoroughly before upgrading to a paid tier.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-ink tracking-tight mb-3">2. 14-Day Refund Window for Annual Subscriptions</h2>
              <p>
                If you purchase the <strong>Pro Annual ($99/year)</strong> plan and find that Expenseliy does not meet your needs, you may request a full refund within <strong>14 calendar days</strong> of your initial annual charge. Contact our support team at <span className="font-mono text-primary">{SITE_CONFIG.contactEmail}</span> with your account email and transaction ID.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-ink tracking-tight mb-3">3. Monthly Subscriptions</h2>
              <p>
                <strong>Pro Monthly ($15/month)</strong> subscriptions are billed in advance on a recurring monthly cycle. Monthly charges are generally non-refundable once the billing cycle begins. However, you can cancel your subscription at any time to prevent all future monthly charges.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-ink tracking-tight mb-3">4. How to Cancel Your Subscription</h2>
              <p className="mb-3">
                You can cancel your subscription anytime with no cancellation fees:
              </p>
              <ol className="list-decimal pl-5 space-y-1 text-xs sm:text-sm">
                <li>Log in to your Expenseliy account dashboard.</li>
                <li>Navigate to <strong>Settings → Billing & Plans</strong>.</li>
                <li>Click <strong>Cancel Subscription</strong>.</li>
              </ol>
              <p className="mt-3 text-xs text-ink-muted">
                Upon cancellation, you will retain full Pro benefits through the remainder of your paid billing term.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-ink tracking-tight mb-3">5. Data Retention Post-Cancellation</h2>
              <p>
                Canceling a paid subscription does not delete your financial transaction data. Your account seamlessly reverts to Free mode, preserving your existing transactions and CSV export capabilities.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-ink tracking-tight mb-3">6. Contact Support</h2>
              <div className="mt-3 p-4 rounded-md bg-canvas border border-hairline font-mono text-xs text-ink">
                <p>Email: {SITE_CONFIG.contactEmail}</p>
                <p>Entity: {SITE_CONFIG.legalEntity}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
