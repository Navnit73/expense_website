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
 * Handles headings, paragraphs, lists, bold, italics, inline code, code blocks, blockquotes, horizontal rules, and tables.
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
      ${lang ? `<div class="px-4 py-1.5 border-b border-hairline text-xs font-mono text-ink-muted bg-canvas uppercase tracking-wider">${lang}</div>` : ""}
      <pre class="p-4 text-xs font-mono text-ink overflow-x-auto"><code>${code.trim()}</code></pre>
    </div>`;
  });

  // Blockquotes > text
  html = html.replace(/^\s*&gt;\s+(.+)$/gm, (_, content) => {
    return `<blockquote class="my-6 pl-4 py-1 border-l-2 border-primary bg-homepage-mintcream dark:bg-surface-raised rounded-r-md text-ink-secondary italic text-sm sm:text-base leading-relaxed">${content}</blockquote>`;
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
        .map((col) => `<th class="py-3 px-4 text-left font-semibold text-ink bg-surface border-b border-hairline text-xs font-mono uppercase">${col.trim()}</th>`)
        .join("");

      const bodyRows = rows
        .slice(2)
        .map((row) => {
          const cols = row
            .split("|")
            .slice(1, -1)
            .map((col) => `<td class="py-3 px-4 text-ink-secondary border-b border-hairline text-sm">${col.trim()}</td>`)
            .join("");
          return `<tr class="hover:bg-canvas transition-colors">${cols}</tr>`;
        })
        .join("");

      return `<div class="my-6 overflow-x-auto rounded-md border border-hairline bg-surface">
        <table class="w-full text-left border-collapse">
          <thead><tr>${headerCols}</tr></thead>
          <tbody>${bodyRows}</tbody>
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
    return `<h3 id="${id}" class="text-xl font-bold text-ink tracking-tight mt-8 mb-3 scroll-mt-24">${text}</h3>`;
  });

  html = html.replace(/^##\s+(.+)$/gm, (_, text) => {
    const rawText = text.replace(/[*_`]/g, "");
    const id = rawText
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, "")
      .replace(/\s+/g, "-");
    return `<h2 id="${id}" class="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mt-12 mb-4 pb-2 border-b border-hairline scroll-mt-24">${text}</h2>`;
  });

  html = html.replace(/^#\s+(.+)$/gm, (_, text) => {
    return `<h1 class="text-3xl sm:text-4xl font-extrabold text-ink tracking-tight mb-6">${text}</h1>`;
  });

  // Horizontal Rules
  html = html.replace(/^---$/gm, '<hr class="my-8 border-hairline" />');

  // Unordered list items -
  html = html.replace(/^\s*-\s+(.+)$/gm, (_, item) => {
    return `<li class="flex items-start gap-2.5 my-1.5"><span class="w-1.5 h-1.5 rounded-sm bg-primary shrink-0 mt-2"></span><span class="text-ink-secondary text-base leading-relaxed">${item}</span></li>`;
  });

  // Numbered list items 1.
  html = html.replace(/^\s*(\d+)\.\s+(.+)$/gm, (_, num, item) => {
    return `<li class="flex items-start gap-2.5 my-1.5"><span class="text-xs font-mono font-bold text-primary shrink-0 mt-1">${num}.</span><span class="text-ink-secondary text-base leading-relaxed">${item}</span></li>`;
  });

  // Bold & Italic
  html = html.replace(/\*\*\*(.*?)\*\*\*/g, '<strong class="font-bold text-ink"><em>$1</em></strong>');
  html = html.replace(/\*\*(.*?)\*\*/g, '<strong class="font-bold text-ink">$1</strong>');
  html = html.replace(/\*(.*?)\*/g, '<em class="italic">$1</em>');

  // Inline code
  html = html.replace(/`([^`]+)`/g, '<code class="px-1.5 py-0.5 rounded bg-surface-raised border border-hairline font-mono text-xs text-ink">$1</code>');

  // Links [text](url)
  html = html.replace(
    /\[(.*?)\]\((.*?)\)/g,
    '<a href="$2" class="text-primary hover:text-primary-active underline font-medium decoration-primary/40 underline-offset-2 transition-colors">$1</a>'
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
      return `<ul class="my-4 flex flex-col gap-1 pl-1">${trimmed}</ul>`;
    }
    return `<p class="text-ink-secondary text-base sm:text-lg leading-relaxed my-4">${trimmed.replace(/\n/g, "<br />")}</p>`;
  });

  return formattedBlocks.join("\n");
}
