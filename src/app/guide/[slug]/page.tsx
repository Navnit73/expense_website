import React from "react";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import Link from "next/link";
import {
  getAllGuides,
  getGuideBySlug,
  getRelatedGuides,
} from "@/lib/guide";
import { extractHeadings, markdownToHtml } from "@/lib/markdown";
import { createPageMetadata, getArticleSchema } from "@/lib/seo";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { GuideCard } from "@/components/marketing/GuideCard";
import { Button } from "@/components/marketing/Button";
import {
  Calendar,
  Clock,
  User,
  ArrowRight,
  ListOrdered,
  Sparkles,
  TrendingUp,
} from "lucide-react";

interface GuidePageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const guides = getAllGuides();
  return guides.map((guide) => ({
    slug: guide.slug,
  }));
}

export async function generateMetadata({ params }: GuidePageProps): Promise<Metadata> {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    return createPageMetadata({
      title: "Article Not Found",
      description: "The requested financial guide could not be found.",
      path: `/guide/${slug}`,
      noIndex: true,
    });
  }

  return createPageMetadata({
    title: guide.title,
    description: guide.description,
    path: `/guide/${guide.slug}`,
    type: "article",
    publishedTime: guide.publishedAt,
    modifiedTime: guide.updatedAt,
    keywords: guide.keywords,
    authors: [guide.author],
  });
}

export default async function GuideArticlePage({ params }: GuidePageProps) {
  const { slug } = await params;
  const guide = getGuideBySlug(slug);

  if (!guide) {
    notFound();
  }

  const headings = extractHeadings(guide.content);
  const htmlContent = markdownToHtml(guide.content);
  const relatedGuides = getRelatedGuides(guide.slug, guide.category, 3);
  const articleSchema = getArticleSchema({
    title: guide.title,
    description: guide.description,
    url: `/guide/${guide.slug}`,
    publishedAt: guide.publishedAt,
    updatedAt: guide.updatedAt,
    author: guide.author,
  });

  return (
    <div className="flex flex-col flex-1">
      {/* Inject Article JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      {/* Header / Meta Section */}
      <header className="bg-surface border-b border-hairline py-10 sm:py-14">
        <Container size="narrow">
          <Breadcrumbs
            items={[
              { name: "Guide", url: "/guide" },
              { name: guide.title, url: `/guide/${guide.slug}` },
            ]}
            className="mb-6"
          />

          <div className="flex flex-wrap items-center gap-2 mb-4">
            <Badge variant="sky" size="sm">
              {guide.category}
            </Badge>
            <div className="flex items-center gap-1 text-xs text-ink-muted">
              <Clock className="w-3.5 h-3.5 text-ink-faint" aria-hidden="true" />
              <span>{guide.readingTime}</span>
            </div>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight leading-tight mb-4">
            {guide.title}
          </h1>

          <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-6">
            {guide.description}
          </p>

          <div className="pt-4 border-t border-hairline flex flex-wrap items-center justify-between gap-4 text-xs text-ink-muted">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded-md bg-income-bg text-income border border-income-border flex items-center justify-center font-bold text-[10px]">
                <User className="w-3.5 h-3.5" aria-hidden="true" />
              </div>
              <span className="font-medium text-ink">{guide.author}</span>
            </div>

            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-ink-faint" aria-hidden="true" />
                <span>
                  Published:{" "}
                  <time dateTime={guide.publishedAt}>
                    {new Date(guide.publishedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </span>
              </div>
              {guide.updatedAt !== guide.publishedAt && (
                <span>
                  Updated:{" "}
                  <time dateTime={guide.updatedAt}>
                    {new Date(guide.updatedAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </time>
                </span>
              )}
            </div>
          </div>
        </Container>
      </header>

      {/* Main Content Layout */}
      <section className="py-12 sm:py-16 bg-canvas flex-1">
        <Container size="default">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
            {/* Main Article Body */}
            <article className="lg:col-span-8 flex flex-col">
              {/* Table of Contents (Mobile & Tablet) */}
              {headings.length > 0 && (
                <div className="lg:hidden bg-surface border border-hairline rounded-md p-5 mb-8">
                  <div className="flex items-center gap-2 font-semibold text-ink text-sm uppercase tracking-wider mb-3 font-mono">
                    <ListOrdered className="w-4 h-4 text-primary" aria-hidden="true" />
                    <span>Table of Contents</span>
                  </div>
                  <nav aria-label="Table of Contents">
                    <ul className="flex flex-col gap-2 text-sm">
                      {headings.map((h) => (
                        <li
                          key={h.id}
                          className={h.level === 3 ? "pl-4 text-xs" : "font-medium"}
                        >
                          <a
                            href={`#${h.id}`}
                            className="text-ink-secondary hover:text-primary transition-colors"
                          >
                            {h.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>
                </div>
              )}

              {/* Rendered HTML */}
              <div
                className="prose max-w-none text-ink bg-surface border border-hairline rounded-md p-6 sm:p-10"
                dangerouslySetInnerHTML={{ __html: htmlContent }}
              />

              {/* Mid/Post-Article Product Callout Banner */}
              <div className="bg-surface-raised border border-hairline-strong rounded-md p-6 sm:p-8 mt-8 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
                <div className="flex flex-col gap-1.5">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-md bg-primary text-white flex items-center justify-center">
                      <TrendingUp className="w-3.5 h-3.5" aria-hidden="true" />
                    </div>
                    <span className="font-bold text-ink text-base">
                      Ready to apply this with Expenseliy?
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-ink-secondary max-w-md">
                    Track expenses, income, and investments in a fast, clean interface with 40
                    free lifetime transactions.
                  </p>
                </div>
                <Button
                  href="https://app.expenseliy.com/signup"
                  variant="primary"
                  size="md"
                  className="shrink-0 w-full sm:w-auto"
                  id="guide-post-cta-btn"
                >
                  <span>Start Tracking Free</span>
                  <ArrowRight className="w-4 h-4" aria-hidden="true" />
                </Button>
              </div>
            </article>

            {/* Sidebar (Desktop) */}
            <aside className="hidden lg:block lg:col-span-4 space-y-6">
              {/* Sticky Table of Contents */}
              {headings.length > 0 && (
                <div className="sticky top-24 bg-surface border border-hairline rounded-md p-5">
                  <div className="flex items-center gap-2 font-semibold text-ink text-xs uppercase tracking-wider mb-4 font-mono">
                    <ListOrdered className="w-4 h-4 text-primary" aria-hidden="true" />
                    <span>In this Article</span>
                  </div>
                  <nav aria-label="Desktop Table of Contents">
                    <ul className="flex flex-col gap-2.5 text-xs text-ink-secondary">
                      {headings.map((h) => (
                        <li
                          key={h.id}
                          className={h.level === 3 ? "pl-3 text-[11px]" : "font-medium"}
                        >
                          <a
                            href={`#${h.id}`}
                            className="hover:text-primary transition-colors block py-0.5"
                          >
                            {h.text}
                          </a>
                        </li>
                      ))}
                    </ul>
                  </nav>

                  {/* Mini Product Card in Sidebar */}
                  <div className="mt-6 pt-6 border-t border-hairline">
                    <div className="flex items-center gap-2 mb-2">
                      <Sparkles className="w-4 h-4 text-primary" aria-hidden="true" />
                      <span className="font-bold text-xs text-ink">Expenseliy SaaS</span>
                    </div>
                    <p className="text-[11px] text-ink-muted leading-relaxed mb-3">
                      Simple expense tracking & cash flow analysis for individuals and small
                      businesses.
                    </p>
                    <Button
                      href="https://app.expenseliy.com/signup"
                      variant="primary"
                      size="sm"
                      className="w-full justify-center text-xs"
                      id="sidebar-cta-btn"
                    >
                      <span>Create Free Account</span>
                    </Button>
                  </div>
                </div>
              )}
            </aside>
          </div>
        </Container>
      </section>

      {/* Related Articles */}
      {relatedGuides.length > 0 && (
        <section className="py-12 sm:py-16 bg-surface border-t border-hairline">
          <Container size="default">
            <div className="flex items-center justify-between gap-4 mb-8">
              <div>
                <h2 className="text-xl sm:text-2xl font-bold text-ink tracking-tight">
                  Related Financial Guides
                </h2>
                <p className="text-xs sm:text-sm text-ink-muted mt-1">
                  Continue exploring frameworks to strengthen your financial operations.
                </p>
              </div>
              <Link
                href="/guide"
                className="text-xs font-semibold text-primary hover:underline hidden sm:inline-flex items-center gap-1"
              >
                <span>View all guides</span>
                <ArrowRight className="w-3.5 h-3.5" aria-hidden="true" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedGuides.map((rel) => (
                <GuideCard key={rel.slug} guide={rel} />
              ))}
            </div>
          </Container>
        </section>
      )}
    </div>
  );
}
