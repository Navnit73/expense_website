import React from "react";
import Link from "next/link";
import { Clock, Calendar, ArrowRight, BookOpen } from "lucide-react";
import { Badge } from "./Badge";

export interface GuideMeta {
  title: string;
  description: string;
  slug: string;
  publishedAt: string;
  updatedAt?: string;
  author?: string;
  category: string;
  readingTime?: string;
  keywords?: string[];
}

interface GuideCardProps {
  guide: GuideMeta;
  className?: string;
  featured?: boolean;
}

export function GuideCard({ guide, className = "", featured = false }: GuideCardProps) {
  // Category-specific badge variant
  const getCategoryVariant = (category: string) => {
    switch (category.toLowerCase()) {
      case "expense tracking":
        return "income";
      case "business finance":
        return "sky";
      case "investment tracking":
        return "investment";
      case "savings & wealth":
      case "budgeting & planning":
        return "warning";
      default:
        return "neutral";
    }
  };

  const badgeVariant = getCategoryVariant(guide.category);

  if (featured) {
    return (
      <article
        className={`bg-surface border border-hairline-strong hover:border-primary rounded-md p-6 sm:p-8 lg:p-10 transition-colors group relative flex flex-col justify-between ${className}`}
      >
        <div>
          <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded-md bg-primary text-white text-[11px] font-bold uppercase tracking-wider font-mono">
                Editor&apos;s Pick
              </span>
              <Badge variant={badgeVariant} size="sm">
                {guide.category}
              </Badge>
            </div>
            {guide.readingTime && (
              <div className="flex items-center gap-1.5 text-xs text-ink-muted font-mono">
                <Clock className="w-3.5 h-3.5 text-ink-faint" aria-hidden="true" />
                <span>{guide.readingTime}</span>
              </div>
            )}
          </div>

          <h3 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-ink tracking-tight mb-3 group-hover:text-primary transition-colors">
            <Link
              href={`/guide/${guide.slug}`}
              className="focus-visible:outline-2 focus-visible:outline-primary rounded"
            >
              {guide.title}
            </Link>
          </h3>

          <p className="text-sm sm:text-base text-ink-secondary leading-relaxed mb-6 max-w-3xl">
            {guide.description}
          </p>

          {guide.keywords && guide.keywords.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-6">
              {guide.keywords.slice(0, 4).map((kw, i) => (
                <span
                  key={i}
                  className="text-[11px] font-mono text-ink-muted bg-canvas border border-hairline px-2 py-0.5 rounded-md"
                >
                  #{kw.replace(/\s+/g, "-")}
                </span>
              ))}
            </div>
          )}
        </div>

        <div className="pt-6 border-t border-hairline flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 rounded-md bg-income-bg text-income border border-income-border flex items-center justify-center font-bold text-xs">
              <BookOpen className="w-3.5 h-3.5" aria-hidden="true" />
            </div>
            <div className="flex flex-col">
              <span className="text-xs font-semibold text-ink">
                {guide.author || "Expenseliy Team"}
              </span>
              <div className="flex items-center gap-1 text-[11px] text-ink-muted">
                <Calendar className="w-3 h-3 text-ink-faint" aria-hidden="true" />
                <time dateTime={guide.publishedAt}>
                  {new Date(guide.publishedAt).toLocaleDateString("en-US", {
                    month: "short",
                    day: "numeric",
                    year: "numeric",
                  })}
                </time>
              </div>
            </div>
          </div>

          <Link
            href={`/guide/${guide.slug}`}
            className="inline-flex items-center gap-2 font-semibold text-sm text-primary group-hover:text-primary-active transition-colors focus-visible:outline-2 focus-visible:outline-primary rounded px-2 py-1 bg-homepage-mintcream dark:bg-surface-raised border border-hairline"
          >
            <span>Read Featured Guide</span>
            <ArrowRight
              className="w-4 h-4 group-hover:translate-x-1 transition-transform"
              aria-hidden="true"
            />
          </Link>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`bg-surface border border-hairline hover:border-hairline-strong rounded-md p-6 flex flex-col justify-between transition-colors group relative ${className}`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <Badge variant={badgeVariant} size="sm">
            {guide.category}
          </Badge>
          {guide.readingTime && (
            <div className="flex items-center gap-1 text-xs text-ink-muted font-mono">
              <Clock className="w-3 h-3 text-ink-faint" aria-hidden="true" />
              <span>{guide.readingTime}</span>
            </div>
          )}
        </div>

        <h3 className="text-lg font-bold text-ink tracking-tight mb-2 group-hover:text-primary transition-colors line-clamp-2">
          <Link
            href={`/guide/${guide.slug}`}
            className="focus-visible:outline-2 focus-visible:outline-primary rounded"
          >
            {guide.title}
          </Link>
        </h3>

        <p className="text-xs sm:text-sm text-ink-secondary leading-relaxed mb-4 line-clamp-3">
          {guide.description}
        </p>

        {guide.keywords && guide.keywords.length > 0 && (
          <div className="flex flex-wrap gap-1 mb-4">
            {guide.keywords.slice(0, 2).map((kw, i) => (
              <span
                key={i}
                className="text-[10px] font-mono text-ink-muted bg-canvas border border-hairline px-1.5 py-0.5 rounded"
              >
                #{kw.replace(/\s+/g, "")}
              </span>
            ))}
          </div>
        )}
      </div>

      <div className="pt-4 border-t border-hairline flex items-center justify-between text-xs text-ink-muted">
        <div className="flex items-center gap-1.5">
          <Calendar className="w-3.5 h-3.5 text-ink-faint" aria-hidden="true" />
          <time dateTime={guide.publishedAt}>
            {new Date(guide.publishedAt).toLocaleDateString("en-US", {
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </time>
        </div>

        <Link
          href={`/guide/${guide.slug}`}
          className="inline-flex items-center gap-1 font-semibold text-primary hover:text-primary-active transition-colors focus-visible:outline-2 focus-visible:outline-primary rounded"
          aria-label={`Read article: ${guide.title}`}
        >
          <span>Read Guide</span>
          <ArrowRight
            className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform"
            aria-hidden="true"
          />
        </Link>
      </div>
    </article>
  );
}
