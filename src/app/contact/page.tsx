import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { ContactForm } from "@/components/marketing/ContactForm";
import { createPageMetadata, SITE_CONFIG } from "@/lib/seo";
import {
  Mail,
  MessageSquare,
  HelpCircle,
  Clock,
  ShieldCheck,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Contact Support & Feedback",
  description:
    "Get in touch with the Expenseliy team for support inquiries, feature requests, account assistance, or billing questions.",
  path: "/contact",
  keywords: [
   
  ],
});

export default function ContactPage() {
  return (
    <div className="flex flex-col flex-1">
      {/* Header */}
      <header className="bg-surface border-b border-hairline py-12 sm:py-16">
        <Container size="default">
          <Breadcrumbs items={[{ name: "Contact", url: "/contact" }]} className="mb-6" />

          <div className="max-w-3xl">
            <Badge variant="sky" size="sm" className="mb-4">
              Get in Touch
            </Badge>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4">
              Contact Support & Product Team
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed">
              Have questions about your account, subscription tiers, data privacy, or feature
              requests? We are here to help.
            </p>
          </div>
        </Container>
      </header>

      {/* Main Contact Grid */}
      <div className="py-12 sm:py-16 bg-canvas flex-1">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Contact Form Card */}
            <div className="lg:col-span-7 bg-surface border border-hairline rounded-md p-6 sm:p-10">
              <div className="flex items-center gap-2 mb-6">
                <MessageSquare className="w-5 h-5 text-primary" aria-hidden="true" />
                <h2 className="text-xl font-bold text-ink tracking-tight">Send Us a Message</h2>
              </div>

              <ContactForm />
            </div>

            {/* Information & Quick Links Sidebar */}
            <div className="lg:col-span-5 space-y-6">
              {/* Direct Email Card */}
              <div className="bg-surface border border-hairline rounded-md p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-md bg-income-bg text-income border border-income-border flex items-center justify-center">
                    <Mail className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-ink">Direct Support Email</h3>
                </div>
                <p className="text-xs text-ink-secondary leading-relaxed mb-3">
                  You can email our customer and technical support team directly anytime at:
                </p>
                <a
                  href={`mailto:${SITE_CONFIG.contactEmail}`}
                  className="font-mono text-sm font-bold text-primary hover:underline"
                >
                  {SITE_CONFIG.contactEmail}
                </a>
              </div>

              {/* Response Time & Reliability */}
              <div className="bg-surface border border-hairline rounded-md p-6">
                <div className="flex items-center gap-2 mb-3">
                  <div className="w-8 h-8 rounded-md bg-sky-bg text-sky border border-sky-border flex items-center justify-center">
                    <Clock className="w-4 h-4" aria-hidden="true" />
                  </div>
                  <h3 className="text-base font-bold text-ink">Response Expectations</h3>
                </div>
                <ul className="space-y-2 text-xs text-ink-secondary">
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-sm bg-primary shrink-0" />
                    <span>Free Plan queries: Responded within 24-48 business hours</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-sm bg-primary shrink-0" />
                    <span>Pro Subscribers: Expedited priority response queue</span>
                  </li>
                </ul>
              </div>

              {/* Quick Self-Serve Links */}
              <div className="bg-surface-raised border border-hairline-strong rounded-md p-6">
                <h3 className="text-xs font-semibold uppercase tracking-wider text-ink font-mono mb-3">
                  Quick Self-Service
                </h3>
                <div className="flex flex-col gap-2.5 text-xs">
                  <Link
                    href="/pricing"
                    className="flex items-center justify-between text-ink-secondary hover:text-primary transition-colors py-1 border-b border-hairline"
                  >
                    <span>View Pricing & Plan FAQ</span>
                    <HelpCircle className="w-3.5 h-3.5 text-ink-faint" />
                  </Link>
                  <Link
                    href="/features"
                    className="flex items-center justify-between text-ink-secondary hover:text-primary transition-colors py-1 border-b border-hairline"
                  >
                    <span>Explore Platform Features</span>
                    <ShieldCheck className="w-3.5 h-3.5 text-ink-faint" />
                  </Link>
                  <Link
                    href="/guide"
                    className="flex items-center justify-between text-ink-secondary hover:text-primary transition-colors py-1"
                  >
                    <span>Browse Knowledge Guides</span>
                    <MessageSquare className="w-3.5 h-3.5 text-ink-faint" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </div>
    </div>
  );
}
