"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react";
import { getFAQSchema } from "@/lib/seo";

export interface FAQItem {
  question: string;
  answer: string;
  category?: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  includeSchema?: boolean;
  className?: string;
}

export function FAQAccordion({
  items,
  includeSchema = true,
  className = "",
}: FAQAccordionProps) {
  const [openIndices, setOpenIndices] = useState<number[]>([0]);

  const toggleIndex = (index: number) => {
    setOpenIndices((prev) =>
      prev.includes(index) ? prev.filter((i) => i !== index) : [...prev, index]
    );
  };

  const schema = includeSchema ? getFAQSchema(items) : null;

  return (
    <div className={`flex flex-col gap-3 w-full ${className}`}>
      {schema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      )}
      {items.map((item, index) => {
        const isOpen = openIndices.includes(index);
        const buttonId = `faq-question-${index}`;
        const panelId = `faq-answer-${index}`;

        return (
          <div
            key={item.question}
            className={`border rounded-md transition-colors ${
              isOpen
                ? "border-hairline-strong bg-surface"
                : "border-hairline bg-surface hover:border-hairline-strong"
            }`}
          >
            <button
              type="button"
              id={buttonId}
              aria-expanded={isOpen}
              aria-controls={panelId}
              onClick={() => toggleIndex(index)}
              className="w-full py-4 px-5 text-left flex items-center justify-between gap-4 font-semibold text-ink text-base sm:text-lg focus-visible:outline-2 focus-visible:outline-primary rounded-md"
            >
              <span>{item.question}</span>
              <ChevronDown
                className={`w-5 h-5 text-ink-muted transition-transform duration-200 shrink-0 ${
                  isOpen ? "rotate-180 text-primary" : ""
                }`}
                aria-hidden="true"
              />
            </button>
            {isOpen && (
              <div
                id={panelId}
                role="region"
                aria-labelledby={buttonId}
                className="px-5 pb-5 pt-1 text-sm sm:text-base text-ink-secondary leading-relaxed border-t border-hairline"
              >
                <p>{item.answer}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
