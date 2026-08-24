import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { createPageMetadata, SITE_CONFIG } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Privacy Policy",
  description:
    "Learn how Expenseliy handles, isolates, and protects your financial transaction records and personal data.",
  path: "/privacy",
});

export default function PrivacyPolicyPage() {
  return (
    <div className="flex flex-col flex-1">
      <header className="bg-surface border-b border-hairline py-12 sm:py-16">
        <Container size="narrow">
          <Breadcrumbs items={[{ name: "Privacy Policy", url: "/privacy" }]} className="mb-6" />
          <Badge variant="neutral" size="sm" className="mb-4">
            Legal & Compliance
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-4">
            Privacy Policy
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
              <h2 className="text-xl font-bold text-ink tracking-tight mb-3">1. Introduction</h2>
              <p>
                This Privacy Policy explains how <strong>{SITE_CONFIG.legalEntity}</strong> (&quot;Expenseliy&quot;, &quot;we&quot;, &quot;us&quot;, or &quot;our&quot;) collects, uses, and safeguards information when you access or use the Expenseliy website ({SITE_CONFIG.url}) and related web applications.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-ink tracking-tight mb-3">2. Information We Collect</h2>
              <p className="mb-3">We collect information strictly necessary to provide expense tracking and financial management services:</p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li><strong>Account Information:</strong> Your name, email address, password hash, and subscription tier status.</li>
                <li><strong>Financial Transaction Data:</strong> Amounts, transaction dates, categories, merchant names, payment method tags, notes, and investment classifications that you explicitly enter.</li>
                <li><strong>Technical Log Data:</strong> IP addresses, browser user-agent, operating system, and session timestamps for security, error logging, and performance auditing.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-ink tracking-tight mb-3">3. How We Use Your Information</h2>
              <p className="mb-3">Your data is utilized exclusively for:</p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li>Providing and maintaining your private financial dashboard and ledger.</li>
                <li>Calculating algorithmic spending distributions, savings rates, and health scores.</li>
                <li>Processing payments through secure PCI-DSS certified payment processors.</li>
                <li>Authenticating login sessions and preventing unauthorized access.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-ink tracking-tight mb-3">4. Zero Data Selling & Strict Isolation</h2>
              <p>
                <strong>We do not sell, rent, monetize, or trade your personal financial data to advertisers or third-party data brokers.</strong> All customer transaction data is isolated to verified user accounts and encrypted in transit (TLS 1.3) and at rest.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-ink tracking-tight mb-3">5. Data Retention & Permanent Deletion (GDPR / CCPA)</h2>
              <p className="mb-3">
                You retain complete ownership of your financial records. Under GDPR, CCPA, and global privacy standards, you have the right to:
              </p>
              <ul className="list-disc pl-5 space-y-2 text-xs sm:text-sm">
                <li><strong>Export:</strong> Download a full machine-readable CSV export of your entire transaction history at any time.</li>
                <li><strong>Delete:</strong> Trigger a permanent account deletion in your user profile settings, which immediately purges all associated transactions, categories, and personal profile information from our live databases.</li>
              </ul>
            </div>

            <div>
              <h2 className="text-xl font-bold text-ink tracking-tight mb-3">6. Contact Information</h2>
              <p>
                For any privacy questions or requests regarding your data, please contact our Data Protection representative at:
              </p>
              <div className="mt-3 p-4 rounded-md bg-canvas border border-hairline font-mono text-xs text-ink">
                <p>Email: {SITE_CONFIG.contactEmail}</p>
                <p>Entity: {SITE_CONFIG.legalEntity}</p>
                <p>Location: San Francisco, CA, United States</p>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
