import React from "react";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Container } from "./Container";
import { Button } from "./Button";
import { Badge } from "./Badge";

interface CTASectionProps {
  title?: string;
  description?: string;
  primaryCtaText?: string;
  primaryCtaHref?: string;
  secondaryCtaText?: string;
  secondaryCtaHref?: string;
  badgeText?: string;
  features?: string[];
  className?: string;
}

export function CTASection({
  title = "Take Control of Your Income, Expenses & Investments",
  description = "Join individuals and households who track cash flow, optimize expenses, and gain actionable financial insights with Expenseliy.",
  primaryCtaText = "Start Tracking Free",
  primaryCtaHref = "https://app.expenseliy.com/auth/signin",
  secondaryCtaText = "Explore Pricing Plans",
  secondaryCtaHref = "/pricing",
  badgeText = "Get Started Today",
  features = [
    "40 free lifetime transactions",
    "No credit card required to start",
    "Full privacy & data isolation",
  ],
  className = "",
}: CTASectionProps) {
  return (
    <section className={`py-16 sm:py-20 lg:py-24 bg-canvas ${className}`}>
      <Container size="default">
        <div className="bg-surface border border-hairline-strong rounded-md p-8 sm:p-12 lg:p-16 text-center max-w-4xl mx-auto flex flex-col items-center">
          {badgeText && (
            <Badge variant="income" size="sm" className="mb-4">
              {badgeText}
            </Badge>
          )}

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight max-w-2xl mb-4">
            {title}
          </h2>

          <p className="text-sm sm:text-base text-ink-secondary leading-relaxed max-w-xl mb-8">
            {description}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto mb-8">
            <Button
              href={primaryCtaHref}
              variant="primary"
              size="lg"
              className="w-full sm:w-auto"
              id="cta-section-primary-btn"
            >
              <span>{primaryCtaText}</span>
              <ArrowRight className="w-4 h-4" aria-hidden="true" />
            </Button>
            <Button
              href={secondaryCtaHref}
              variant="secondary"
              size="lg"
              className="w-full sm:w-auto"
              id="cta-section-secondary-btn"
            >
              <span>{secondaryCtaText}</span>
            </Button>
          </div>

          {features && features.length > 0 && (
            <div className="flex flex-wrap items-center justify-center gap-y-2 gap-x-6 text-xs text-ink-muted border-t border-hairline pt-6 w-full">
              {features.map((feature, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
                  <span>{feature}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      </Container>
    </section>
  );
}
