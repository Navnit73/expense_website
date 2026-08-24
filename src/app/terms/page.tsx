import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { createPageMetadata, SITE_CONFIG } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Terms of Service",
  description:
    "Review the terms and conditions governing the use of the Expenseliy expense tracking platform.",
  path: "/terms",
});

export default function TermsOfServicePage() {
  return (
    <div className="flex flex-col flex-1">
      <header className="bg-surface border-b border-hairline py-12 sm:py-16">
        <Container size="narrow">
          <Breadcrumbs items={[{ name: "Terms of Service", url: "/terms" }]} className="mb-6" />
          <Badge variant="neutral" size="sm" className="mb-4">
            Legal & Compliance
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-4">
            Terms of Service
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
              <h2 className="text-xl font-bold text-ink tracking-tight mb-3">1. Agreement to Terms</h2>
              <p>
                By registering for or using Expenseliy ({SITE_CONFIG.url}), provided by{" "}
                <strong>{SITE_CONFIG.legalEntity}</strong>, you agree to be bound by these Terms of Service. If you do not agree to these terms, you must not access or use the platform.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-ink tracking-tight mb-3">2. Description of Service</h2>
              <p>
                Expenseliy provides a software-as-a-service (SaaS) web application for recording expenses, tracking income streams, monitoring investment holdings, and generating algorithmic financial summaries.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-ink tracking-tight mb-3">3. No Financial, Investment, or Legal Advice</h2>
              <p>
                <strong>Expenseliy is not a registered investment advisor, certified public accountant (CPA), or financial advisory institution.</strong> All algorithmic health scores, AI-generated insights, and spending projections are provided solely for informational and record-keeping purposes. You are solely responsible for evaluating your financial decisions and consulting qualified financial professionals.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-ink tracking-tight mb-3">4. User Accounts & Security</h2>
              <p className="mb-3">When creating an account, you agree to:</p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li>Provide accurate, current contact information.</li>
                <li>Maintain the confidentiality of your password and credentials.</li>
                <li>Promptly notify us of any unauthorized use or security breach of your account.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-ink tracking-tight mb-3">5. Subscriptions, Billing & Cancellations</h2>
              <p className="mb-3">
                Paid subscriptions (Pro Monthly and Pro Annual) are billed in advance on a recurring schedule. You may cancel your subscription at any time via your account billing portal. Upon cancellation, your Pro benefits remain active until the end of the current billing cycle.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-ink tracking-tight mb-3">6. Limitation of Liability</h2>
              <p>
                To the maximum extent permitted by applicable law, Expenseliy and its operators shall not be liable for any indirect, incidental, special, consequential, or punitive damages resulting from your access to or inability to access the service, data loss, or reliance on algorithmic projections.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-ink tracking-tight mb-3">7. Contact Information</h2>
              <div className="mt-3 p-4 rounded-md bg-canvas border border-hairline font-mono text-xs text-ink">
                <p>Email: {SITE_CONFIG.contactEmail}</p>
                <p>Entity: {SITE_CONFIG.legalEntity}</p>
                <p>Address: [Business Address Placeholder]</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
