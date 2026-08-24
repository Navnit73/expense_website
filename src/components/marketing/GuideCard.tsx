import React from "react";
import Link from "next/link";
import { Clock, Calendar, ArrowRight } from "lucide-react";
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
}

export function GuideCard({ guide, className = "" }: GuideCardProps) {
  return (
    <article
      className={`bg-surface border border-hairline hover:border-hairline-strong rounded-md p-6 flex flex-col justify-between transition-colors group ${className}`}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <Badge variant="sky" size="sm">
            {guide.category}
          </Badge>
          {guide.readingTime && (
            <div className="flex items-center gap-1 text-xs text-ink-muted">
              <Clock className="w-3 h-3 text-ink-faint" aria-hidden="true" />
              <span>{guide.readingTime}</span>
            </div>
          )}
        </div>

        <h3 className="text-lg font-bold text-ink tracking-tight mb-2 group-hover:text-primary transition-colors">
          <Link href={`/guide/${guide.slug}`} className="focus-visible:outline-2 focus-visible:outline-primary rounded">
            {guide.title}
          </Link>
        </h3>

        <p className="text-sm text-ink-secondary leading-relaxed mb-6 line-clamp-3">
          {guide.description}
        </p>
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
          className="inline-flex items-center gap-1 font-medium text-primary hover:text-primary-active transition-colors"
          aria-label={`Read article: ${guide.title}`}
        >
          <span>Read Guide</span>
          <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
