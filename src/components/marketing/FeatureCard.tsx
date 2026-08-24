import React from "react";
import { Badge } from "./Badge";

interface FeatureCardProps {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  badge?: string;
  badgeVariant?: "default" | "income" | "expense" | "investment" | "sky" | "warning" | "neutral";
  details?: string[];
  className?: string;
}

export function FeatureCard({
  icon: Icon,
  title,
  description,
  badge,
  badgeVariant = "default",
  details,
  className = "",
}: FeatureCardProps) {
  return (
    <div
      className={`bg-surface border border-hairline hover:border-hairline-strong rounded-md p-6 flex flex-col justify-between transition-colors ${className}`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-4">
          <div className="w-10 h-10 rounded-md bg-homepage-mintcream dark:bg-surface-raised border border-hairline flex items-center justify-center text-primary shrink-0">
            <Icon className="w-5 h-5" aria-hidden="true" />
          </div>
          {badge && (
            <Badge variant={badgeVariant} size="sm">
              {badge}
            </Badge>
          )}
        </div>

        <h3 className="text-lg font-semibold text-ink tracking-tight mb-2">
          {title}
        </h3>

        <p className="text-sm text-ink-secondary leading-relaxed mb-4">
          {description}
        </p>
      </div>

      {details && details.length > 0 && (
        <ul className="border-t border-hairline pt-4 mt-2 flex flex-col gap-1.5 text-xs text-ink-muted">
          {details.map((detail, idx) => (
            <li key={idx} className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-sm bg-primary shrink-0" />
              <span>{detail}</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
