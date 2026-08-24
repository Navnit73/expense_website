import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, Lock } from "lucide-react";
import { Container } from "./Container";

const FOOTER_COLUMNS = [
  {
    title: "Product",
    links: [
      { name: "Features", href: "/features" },
      { name: "Pricing", href: "/pricing" },
      { name: "How It Works", href: "/how-it-works" },
      { name: "Sign In", href: "https://app.expenseliy.com/login" },
      { name: "Get Started Free", href: "https://app.expenseliy.com/auth/signin" },
    ],
  },
  {
    title: "Resources",
    links: [
      { name: "Financial Guide Hub", href: "/guide" },

    ],
  },
  {
    title: "Company",
    links: [
      { name: "About Expenseliy", href: "/about" },
      { name: "Contact & Support", href: "/contact" },
      { name: "System Status", href: "/contact" },
    ],
  },
  {
    title: "Legal & Privacy",
    links: [
      { name: "Privacy Policy", href: "/privacy" },
      { name: "Terms of Service", href: "/terms" },
      { name: "Cookie Policy", href: "/cookies" },
      { name: "Refund Policy", href: "/refund-policy" },
    ],
  },
];

export function Footer() {
  return (
    <footer className="w-full bg-surface border-t border-hairline text-ink mt-auto">
      <Container size="default">
        {/* Top Footer Section */}
        <div className="py-12 lg:py-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-8 lg:gap-12">
          {/* Brand Info */}
          <div className="lg:col-span-2 flex flex-col gap-4">
            <Link
              href="/"
              className="flex items-center gap-2.5 font-bold text-lg text-ink hover:text-primary transition-colors w-fit"
              id="footer-brand-logo"
            >
              <Image
                src="/logo.svg"
                alt="Expenseliy Logo"
                width={28}
                height={28}
                className="rounded-md border border-hairline shrink-0"
              />
              <span className="tracking-tight text-xl font-bold">
                Expense<span className="text-primary">liy</span>
              </span>
            </Link>

            <p className="text-sm text-ink-muted leading-relaxed max-w-sm">
              Personal expense tracking and household financial management for individuals,
              working professionals, and the self-employed. Track income, expenses, investments,
              and bills with zero complexity.
            </p>

            <div className="flex items-center gap-4 text-xs text-ink-muted pt-2">
              <div className="flex items-center gap-1.5">
                <Lock className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                <span>Isolated User Data</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
                <span>GDPR-Ready Deletion</span>
              </div>
            </div>
          </div>

          {/* Nav Columns */}
          {FOOTER_COLUMNS.map((column) => (
            <div key={column.title} className="flex flex-col gap-3">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-ink font-mono">
                {column.title}
              </h3>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-secondary hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary rounded"
                      id={`footer-link-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Informational Disclaimer */}
        <div className="border-t border-hairline py-6 text-xs text-ink-muted leading-relaxed">
          <p>
            <strong>Disclaimer:</strong> Expenseliy provides financial record-keeping, analytics,
            and algorithmic summaries for informational purposes only. AI-generated insights and
            automated projections are informational tools and must not be construed as certified
            financial, investment, tax, or legal advice.
          </p>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-hairline py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-ink-muted">
          <p>© {new Date().getFullYear()} Expenseliy. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-ink transition-colors">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-ink transition-colors">
              Terms
            </Link>
            <Link href="/cookies" className="hover:text-ink transition-colors">
              Cookies
            </Link>
            <Link href="/refund-policy" className="hover:text-ink transition-colors">
              Refunds
            </Link>
            <Link href="/contact" className="hover:text-ink transition-colors">
              Contact
            </Link>
          </div>
        </div>
      </Container>
    </footer>
  );
}
