"use client";

import React, { useState } from "react";
import { Copy, Check, Share2, Printer } from "lucide-react";

interface GuideShareProps {
  title: string;
  url: string;
}

export function GuideShare({ title, url }: GuideShareProps) {
  const [copied, setCopied] = useState(false);

  const fullUrl = typeof window !== "undefined" ? window.location.href : url;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(fullUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  const handlePrint = () => {
    if (typeof window !== "undefined") {
      window.print();
    }
  };

  const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(
    title
  )}&url=${encodeURIComponent(fullUrl)}`;

  const linkedInUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
    fullUrl
  )}`;

  return (
    <div className="flex flex-wrap items-center gap-2 text-xs">
      <span className="font-mono text-ink-muted uppercase tracking-wider text-[11px] mr-1 flex items-center gap-1">
        <Share2 className="w-3 h-3" aria-hidden="true" />
        <span>Share:</span>
      </span>

      <button
        type="button"
        onClick={handleCopy}
        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md border border-hairline bg-surface hover:bg-canvas text-ink transition-colors"
        title="Copy article link"
      >
        {copied ? (
          <>
            <Check className="w-3 h-3 text-income" aria-hidden="true" />
            <span className="text-income font-medium">Copied!</span>
          </>
        ) : (
          <>
            <Copy className="w-3 h-3 text-ink-muted" aria-hidden="true" />
            <span>Copy Link</span>
          </>
        )}
      </button>

      <a
        href={twitterUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-hairline bg-surface hover:bg-canvas text-ink transition-colors"
        title="Share on X / Twitter"
      >
        <span>X / Twitter</span>
      </a>

      <a
        href={linkedInUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-hairline bg-surface hover:bg-canvas text-ink transition-colors"
        title="Share on LinkedIn"
      >
        <span>LinkedIn</span>
      </a>

      <button
        type="button"
        onClick={handlePrint}
        className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md border border-hairline bg-surface hover:bg-canvas text-ink transition-colors hidden sm:inline-flex"
        title="Print article"
      >
        <Printer className="w-3 h-3 text-ink-muted" aria-hidden="true" />
        <span>Print</span>
      </button>
    </div>
  );
}
