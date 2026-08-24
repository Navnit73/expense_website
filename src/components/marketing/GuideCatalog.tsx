"use client";

import React, { useState, useMemo } from "react";
import { Search, X, Layers, BookOpen } from "lucide-react";
import { GuideCard, GuideMeta } from "./GuideCard";

interface GuideCatalogProps {
  guides: GuideMeta[];
  categories: string[];
}

export function GuideCatalog({ guides, categories }: GuideCatalogProps) {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");

  const filteredGuides = useMemo(() => {
    return guides.filter((guide) => {
      const matchesCategory =
        selectedCategory === "all" || guide.category === selectedCategory;

      const query = searchQuery.toLowerCase().trim();
      const matchesSearch =
        !query ||
        guide.title.toLowerCase().includes(query) ||
        guide.description.toLowerCase().includes(query) ||
        (guide.keywords && guide.keywords.some((kw) => kw.toLowerCase().includes(query)));

      return matchesCategory && matchesSearch;
    });
  }, [guides, selectedCategory, searchQuery]);

  return (
    <div className="flex flex-col gap-8">
      {/* Search Bar & Category Controls Bar */}
      <div className="bg-surface border border-hairline rounded-md p-4 sm:p-5 flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
        {/* Search Input */}
        <div className="relative flex-1 max-w-md">
          <Search
            className="w-4 h-4 text-ink-muted absolute left-3.5 top-1/2 -translate-y-1/2"
            aria-hidden="true"
          />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search guides by keyword, topic, or concept..."
            className="w-full pl-10 pr-9 py-2 rounded-md border border-hairline-strong bg-canvas text-ink text-xs sm:text-sm focus:outline-2 focus:outline-primary placeholder:text-ink-muted"
            aria-label="Search guides"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-ink-muted hover:text-ink p-0.5 rounded"
              aria-label="Clear search"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Count Label */}
        <div className="text-xs text-ink-muted flex items-center gap-1.5 shrink-0 self-center md:self-auto">
          <BookOpen className="w-3.5 h-3.5 text-primary" aria-hidden="true" />
          <span>
            Showing <strong>{filteredGuides.length}</strong> of {guides.length} articles
          </span>
        </div>
      </div>

      {/* Category Pills Bar */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
        <span className="text-xs font-mono font-bold text-ink-muted uppercase tracking-wider shrink-0 mr-1 flex items-center gap-1">
          <Layers className="w-3 h-3 text-primary" />
          <span>Category:</span>
        </span>
        <button
          type="button"
          onClick={() => setSelectedCategory("all")}
          className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors shrink-0 cursor-pointer border ${
            selectedCategory === "all"
              ? "bg-primary text-white border-primary font-bold"
              : "bg-surface text-ink-secondary hover:text-ink hover:bg-surface-raised border-hairline"
          }`}
        >
          All Topics ({guides.length})
        </button>
        {categories.map((category) => {
          const count = guides.filter((g) => g.category === category).length;
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors shrink-0 cursor-pointer border ${
                isSelected
                  ? "bg-primary text-white border-primary font-bold"
                  : "bg-surface text-ink-secondary hover:text-ink hover:bg-surface-raised border-hairline"
              }`}
            >
              {category} ({count})
            </button>
          );
        })}
      </div>

      {/* Guides Grid */}
      {filteredGuides.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredGuides.map((guide) => (
            <GuideCard key={guide.slug} guide={guide} />
          ))}
        </div>
      ) : (
        <div className="bg-surface border border-hairline rounded-md p-12 text-center flex flex-col items-center">
          <div className="w-12 h-12 rounded-md bg-homepage-mintcream dark:bg-surface-raised border border-hairline flex items-center justify-center text-primary mb-3">
            <Search className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-ink mb-1">No matching guides found</h3>
          <p className="text-xs sm:text-sm text-ink-muted max-w-sm mb-4">
            We couldn&apos;t find any articles matching &quot;{searchQuery}&quot;. Try adjusting your search
            or selecting a different category.
          </p>
          <button
            type="button"
            onClick={() => {
              setSearchQuery("");
              setSelectedCategory("all");
            }}
            className="px-4 py-2 rounded-md bg-surface text-ink border border-hairline-strong text-xs font-semibold hover:bg-canvas transition-colors"
          >
            Reset Filters
          </button>
        </div>
      )}
    </div>
  );
}
