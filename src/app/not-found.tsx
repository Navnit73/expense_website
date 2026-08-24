import React from "react";
import Link from "next/link";
import Image from "next/image";
import type { Metadata } from "next";
import { Container } from "@/components/marketing/Container";
import { Button } from "@/components/marketing/Button";
import { Badge } from "@/components/marketing/Badge";
import { createPageMetadata } from "@/lib/seo";
import {
  Home,
  BookOpen,
  ArrowRight,
  HelpCircle,
  Sparkles,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "404 — Page Not Found",
  description: "The page you are looking for does not exist or has been moved.",
  path: "/404",
  noIndex: true,
});

export default function NotFound() {
  return (
    <div className="flex flex-col flex-1 items-center justify-center py-16 sm:py-24 bg-canvas">
      <Container size="narrow">
        <div className="bg-surface border border-hairline-strong rounded-md p-8 sm:p-12 text-center flex flex-col items-center max-w-2xl mx-auto">
          {/* Brand Logo & Error Badge */}
          <div className="flex items-center gap-3 mb-6">
            <Image
              src="/logo.svg"
              alt="Expenseliy Logo"
              width={36}
              height={36}
              className="rounded-md shrink-0"
              priority
            />
            <Badge variant="expense" size="sm">
              Error 404
            </Badge>
          </div>

          <h1 className="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-3">
            Page Not Found
          </h1>

          <p className="text-sm sm:text-base text-ink-secondary leading-relaxed max-w-md mb-8">
            The page you requested could not be located. It might have been moved, renamed, or is
            temporarily unavailable.
          </p>

          {/* Primary Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto mb-10">
            <Button href="/" variant="primary" size="md" className="w-full sm:w-auto">
              <Home className="w-4 h-4" aria-hidden="true" />
              <span>Return to Homepage</span>
            </Button>
            <Button href="/guide" variant="secondary" size="md" className="w-full sm:w-auto">
              <BookOpen className="w-4 h-4" aria-hidden="true" />
              <span>Browse Guides</span>
            </Button>
          </div>

          {/* Helpful Navigation Links Grid */}
          <div className="border-t border-hairline pt-6 w-full text-left">
            <div className="text-xs font-mono font-semibold text-ink-muted uppercase tracking-wider mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-primary" />
              <span>Popular Destinations:</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <Link
                href="/features"
                className="flex items-center justify-between p-2.5 rounded-md bg-canvas hover:bg-surface-raised border border-hairline transition-colors text-ink-secondary hover:text-ink"
              >
                <span>Platform Features</span>
                <ArrowRight className="w-3.5 h-3.5 text-ink-faint" />
              </Link>
              <Link
                href="/pricing"
                className="flex items-center justify-between p-2.5 rounded-md bg-canvas hover:bg-surface-raised border border-hairline transition-colors text-ink-secondary hover:text-ink"
              >
                <span>Pricing Plans</span>
                <ArrowRight className="w-3.5 h-3.5 text-ink-faint" />
              </Link>
              <Link
                href="/how-it-works"
                className="flex items-center justify-between p-2.5 rounded-md bg-canvas hover:bg-surface-raised border border-hairline transition-colors text-ink-secondary hover:text-ink"
              >
                <span>How Expenseliy Works</span>
                <ArrowRight className="w-3.5 h-3.5 text-ink-faint" />
              </Link>
              <Link
                href="/contact"
                className="flex items-center justify-between p-2.5 rounded-md bg-canvas hover:bg-surface-raised border border-hairline transition-colors text-ink-secondary hover:text-ink"
              >
                <span>Contact Support</span>
                <HelpCircle className="w-3.5 h-3.5 text-ink-faint" />
              </Link>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
}
