import React from "react";
import type { Metadata } from "next";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { createPageMetadata, SITE_CONFIG } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Cookie Policy",
  description:
    "Information on how Expenseliy uses essential cookies and local storage for authentication and theme preferences.",
  path: "/cookies",
});

export default function CookiePolicyPage() {
  return (
    <div className="flex flex-col flex-1">
      <header className="bg-surface border-b border-hairline py-12 sm:py-16">
        <Container size="narrow">
          <Breadcrumbs items={[{ name: "Cookie Policy", url: "/cookies" }]} className="mb-6" />
          <Badge variant="neutral" size="sm" className="mb-4">
            Legal & Compliance
          </Badge>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-4">
            Cookie Policy
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
              <h2 className="text-xl font-bold text-ink tracking-tight mb-3">1. What Are Cookies?</h2>
              <p>
                Cookies and browser local storage are small data files placed on your device to enable core website functionality, secure login sessions, and remember user interface preferences.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-ink tracking-tight mb-3">2. How Expenseliy Uses Cookies</h2>
              <p className="mb-4">We maintain a minimal, privacy-first cookie policy. We categorize cookies into two main types:</p>
              
              <div className="space-y-4 text-xs sm:text-sm">
                <div className="p-4 rounded-md bg-canvas border border-hairline">
                  <h3 className="font-bold text-ink mb-1">Strictly Essential Authentication Cookies</h3>
                  <p className="text-ink-secondary">
                    Required to authenticate your identity, keep your dashboard session securely logged in, and protect against Cross-Site Request Forgery (CSRF) attacks. These cannot be turned off.
                  </p>
                </div>

                <div className="p-4 rounded-md bg-canvas border border-hairline">
                  <h3 className="font-bold text-ink mb-1">Functional Preference Cookies (Local Storage)</h3>
                  <p className="text-ink-secondary">
                    Used to remember your UI theme preferences (Light Mode vs Dark Mode) and UI collapsed state across page navigations.
                  </p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="text-xl font-bold text-ink tracking-tight mb-3">3. No Invasive Third-Party Tracking</h2>
              <p>
                Expenseliy does not deploy third-party advertising trackers or invasive behavioral data cookies that follow your browsing across external websites.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-ink tracking-tight mb-3">4. Managing Cookies in Your Browser</h2>
              <p>
                You can control, block, or delete cookies via your browser settings. Note that disabling strictly essential authentication cookies will prevent you from logging into your Expenseliy dashboard.
              </p>
            </div>

            <div>
              <h2 className="text-xl font-bold text-ink tracking-tight mb-3">5. Contact Us</h2>
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
