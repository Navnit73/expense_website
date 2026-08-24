import React from "react";
import { Check, ArrowRight } from "lucide-react";
import { Button } from "./Button";
import { Badge } from "./Badge";

export interface PricingPlan {
  id: string;
  name: string;
  badge?: string;
  popular?: boolean;
  price: string;
  period: string;
  description: string;
  subtext?: string;
  features: string[];
  ctaText: string;
  ctaHref: string;
  ctaVariant?: "primary" | "secondary" | "outline";
}

interface PricingCardProps {
  plan: PricingPlan;
  className?: string;
}

export function PricingCard({ plan, className = "" }: PricingCardProps) {
  return (
    <div
      className={`bg-surface rounded-md p-6 sm:p-8 flex flex-col justify-between transition-colors relative border ${
        plan.popular
          ? "border-primary ring-1 ring-primary"
          : "border-hairline hover:border-hairline-strong"
      } ${className}`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <h3 className="text-xl font-bold text-ink tracking-tight">{plan.name}</h3>
          {plan.badge && (
            <Badge variant={plan.popular ? "income" : "neutral"} size="sm">
              {plan.badge}
            </Badge>
          )}
        </div>

        <p className="text-sm text-ink-muted mb-6 min-h-[40px] leading-relaxed">
          {plan.description}
        </p>

        <div className="mb-6 pb-6 border-b border-hairline">
          <div className="flex items-baseline gap-1.5">
            <span className="text-4xl font-extrabold text-ink tracking-tight">
              {plan.price}
            </span>
            <span className="text-sm text-ink-muted font-medium">{plan.period}</span>
          </div>
          {plan.subtext && (
            <p className="text-xs text-primary font-medium mt-1.5">{plan.subtext}</p>
          )}
        </div>

        <div className="mb-8">
          <p className="text-xs font-semibold uppercase tracking-wider text-ink-muted mb-4 font-mono">
            Included Capabilities
          </p>
          <ul className="flex flex-col gap-3 text-sm text-ink-secondary">
            {plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2.5">
                <div className="w-4 h-4 rounded-sm bg-income-bg text-income border border-income-border flex items-center justify-center shrink-0 mt-0.5">
                  <Check className="w-3 h-3 stroke-[3]" aria-hidden="true" />
                </div>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div>
        <Button
          href={plan.ctaHref}
          variant={plan.ctaVariant || (plan.popular ? "primary" : "secondary")}
          size="lg"
          className="w-full justify-center"
          id={`pricing-plan-cta-${plan.id}`}
        >
          <span>{plan.ctaText}</span>
          <ArrowRight className="w-4 h-4" aria-hidden="true" />
        </Button>
      </div>
    </div>
  );
}
