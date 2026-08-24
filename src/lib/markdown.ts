export interface HeadingItem {
  id: string;
  text: string;
  level: number;
}

export function extractHeadings(markdown: string): HeadingItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const headings: HeadingItem[] = [];
  let match;

  while ((match = headingRegex.exec(markdown)) !== null) {
    const level = match[1].length;
    const text = match[2].trim().replace(/[*_`]/g, "");
    const id = text
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");

    headings.push({ id, text, level });
  }

  return headings;
}

/**
 * Server-side markdown to semantic HTML converter
 * Produces clean editorial typography with zero box shadows, crisp borders, callouts, and structured tables.
 */
export function markdownToHtml(markdown: string): string {
  let html = markdown;

  // Escape basic HTML tags to prevent XSS
  html = html
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // Code blocks ```lang ... ```
  html = html.replace(/```([a-z0-9]*)\n([\s\S]*?)```/g, (_, lang, code) => {
    return `<div class="my-6 rounded-md border border-hairline bg-surface-raised overflow-hidden">
      <div class="px-4 py-2 border-b border-hairline text-xs font-mono font-medium text-ink-muted bg-canvas flex items-center justify-between">
        <span>${lang ? lang.toUpperCase() : "CODE"}</span>
        <span class="text-[10px] text-ink-faint">Expenseliy Snippet</span>
      </div>
      <pre class="p-4 text-xs sm:text-sm font-mono text-ink overflow-x-auto leading-relaxed"><code>${code.trim()}</code></pre>
    </div>`;
  });

  // Callout Boxes: > [!TIP] or > [!NOTE] or > [!WARNING] or standard > Blockquote
  html = html.replace(/^\s*&gt;\s+\[!TIP\]\s*\n?([\s\S]*?)(?=\n\n|\n(?!&gt;)|$)/gim, (_, content) => {
    const cleanContent = content.replace(/^&gt;\s?/gm, "").trim();
    return `<div class="my-6 p-4 rounded-md border border-income-border bg-income-bg/60 text-ink">
      <div class="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-income mb-1 font-mono">
        <span>PRO TIP</span>
      </div>
      <p class="text-xs sm:text-sm text-ink-secondary leading-relaxed">${cleanContent}</p>
    </div>`;
  });

  html = html.replace(/^\s*&gt;\s+\[!WARNING\]\s*\n?([\s\S]*?)(?=\n\n|\n(?!&gt;)|$)/gim, (_, content) => {
    const cleanContent = content.replace(/^&gt;\s?/gm, "").trim();
    return `<div class="my-6 p-4 rounded-md border border-warning-border bg-warning-bg/60 text-ink">
      <div class="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-warning mb-1 font-mono">
        <span>IMPORTANT NOTICE</span>
      </div>
      <p class="text-xs sm:text-sm text-ink-secondary leading-relaxed">${cleanContent}</p>
    </div>`;
  });

  // Standard Blockquotes > text
  html = html.replace(/^\s*&gt;\s+(.+)$/gm, (_, content) => {
    return `<blockquote class="my-6 pl-4 py-2 border-l-3 border-primary bg-homepage-mintcream dark:bg-surface-raised rounded-r-md text-ink-secondary italic text-sm sm:text-base leading-relaxed">${content}</blockquote>`;
  });

  // Tables
  html = html.replace(
    /\|(.+)\|\n\|(?:\s*[-:]+[-|\s:]*)\|(?:\n\|.+)+/g,
    (tableMatch) => {
      const rows = tableMatch.trim().split("\n");
      if (rows.length < 3) return tableMatch;

      const headerCols = rows[0]
        .split("|")
        .slice(1, -1)
        .map((col) => `<th class="py-3 px-4 text-left font-semibold text-ink bg-canvas border-b border-hairline text-xs font-mono uppercase tracking-wider">${col.trim()}</th>`)
        .join("");

      const bodyRows = rows
        .slice(2)
        .map((row) => {
          const cols = row
            .split("|")
            .slice(1, -1)
            .map((col) => `<td class="py-3.5 px-4 text-ink-secondary border-b border-hairline text-xs sm:text-sm">${col.trim()}</td>`)
            .join("");
          return `<tr class="hover:bg-canvas/60 transition-colors">${cols}</tr>`;
        })
        .join("");

      return `<div class="my-6 overflow-x-auto rounded-md border border-hairline bg-surface">
        <table class="w-full text-left border-collapse">
          <thead><tr>${headerCols}</tr></thead>
          <tbody class="divide-y divide-hairline">${bodyRows}</tbody>
        </table>
      </div>`;
    }
  );

  // Headings
  html = html.replace(/^###\s+(.+)$/gm, (_, text) => {
    const rawText = text.replace(/[*_`]/g, "");
    const id = rawText
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    return `<h3 id="${id}" class="text-lg sm:text-xl font-bold text-ink tracking-tight mt-8 mb-3 scroll-mt-24 flex items-center gap-2"><span class="w-2 h-2 rounded-sm bg-primary/80"></span><span>${text}</span></h3>`;
  });

  html = html.replace(/^##\s+(.+)$/gm, (_, text) => {
    const rawText = text.replace(/[*_`]/g, "");
    const id = rawText
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    return `<h2 id="${id}" class="text-xl sm:text-2xl font-extrabold text-ink tracking-tight mt-12 mb-4 pb-2 border-b border-hairline scroll-mt-24">${text}</h2>`;
  });

  html = html.replace(/^#\s+(.+)$/gm, (_, text) => {
    return `<h1 class="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-6">${text}</h1>`;
  });

  // Horizontal Rules
  html = html.replace(/^---$/gm, '<hr class="my-8 border-hairline" />');

  // Unordered list items -
  html = html.replace(/^\s*-\s+(.+)$/gm, (_, item) => {
    return `<li class="flex items-start gap-2.5 my-2"><span class="w-1.5 h-1.5 rounded-sm bg-primary shrink-0 mt-2.5"></span><span class="text-ink-secondary text-sm sm:text-base leading-relaxed">${item}</span></li>`;
  });

  // Numbered list items 1.
  html = html.replace(/^\s*(\d+)\.\s+(.+)$/gm, (_, num, item) => {
    return `<li class="flex items-start gap-2.5 my-2"><span class="w-5 h-5 rounded-md bg-homepage-mintcream dark:bg-surface-raised border border-hairline text-xs font-mono font-bold text-primary flex items-center justify-center shrink-0 mt-0.5">${num}</span><span class="text-ink-secondary text-sm sm:text-base leading-relaxed">${item}</span></li>`;
  });

  // Bold & Italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong class="font-bold text-ink"><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-ink">$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em class="italic text-ink-secondary">$1</em>');

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-surface-raised border border-hairline font-mono text-xs text-ink font-semibold">$1</code>');

  // Links [text](url)
  html = html.replace(
    /\[(.*?)\]\((.*?)\)/g,
    '<a href="$2" class="text-primary hover:text-primary-active underline font-semibold decoration-primary/40 underline-offset-2 transition-colors">$1</a>'
  );

  // Paragraphs (split by double newlines)
  const blocks = html.split(/\n\n+/);
  const formattedBlocks = blocks.map((block) => {
    const trimmed = block.trim();
    if (
      trimmed.startsWith("<h") ||
      trimmed.startsWith("<div") ||
      trimmed.startsWith("<blockquote") ||
      trimmed.startsWith("<hr") ||
      trimmed.startsWith("<table")
    ) {
      return trimmed;
    }
    if (trimmed.startsWith("<li")) {
      return `<ul class="my-4 flex flex-col gap-0.5 pl-1">${trimmed}</ul>`;
    }
    return `<p class="text-ink-secondary text-sm sm:text-base leading-relaxed my-4">${trimmed.replace(/\n/g, "<br />")}</p>`;
  });

  return formattedBlocks.join("\n");
}
