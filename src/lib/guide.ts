import fs from "fs";
import path from "path";
import matter from "gray-matter";

export interface GuideArticle {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  author: string;
  category: string;
  keywords: string[];
  image?: string;
  readingTime: string;
  content: string;
}

const GUIDES_DIRECTORY = path.join(process.cwd(), "content/guide");

export function calculateReadingTime(content: string): string {
  const wordsPerMinute = 200;
  const wordCount = content.trim().split(/\s+/).length;
  const minutes = Math.ceil(wordCount / wordsPerMinute);
  return `${minutes} min read`;
}

export function getAllGuides(): GuideArticle[] {
  if (!fs.existsSync(GUIDES_DIRECTORY)) {
    return [];
  }

  const fileNames = fs.readdirSync(GUIDES_DIRECTORY);
  const allGuides = fileNames
    .filter((fileName) => fileName.endsWith(".md"))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, "");
      const fullPath = path.join(GUIDES_DIRECTORY, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        slug: data.slug || slug,
        title: data.title || slug,
        description: data.description || "",
        publishedAt: data.publishedAt || "2026-08-24",
        updatedAt: data.updatedAt || data.publishedAt || "2026-08-24",
        author: data.author || "Expenseliy Financial Editorial Team",
        category: data.category || "General Finance",
        keywords: Array.isArray(data.keywords) ? data.keywords : [],
        image: data.image || "/og-image.png",
        readingTime: calculateReadingTime(content),
        content,
      };
    })
    .sort((a, b) => (new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()));

  return allGuides;
}

export function getGuideBySlug(slug: string): GuideArticle | null {
  try {
    const fullPath = path.join(GUIDES_DIRECTORY, `${slug}.md`);
    if (!fs.existsSync(fullPath)) {
      return null;
    }

    const fileContents = fs.readFileSync(fullPath, "utf8");
    const { data, content } = matter(fileContents);

    return {
      slug: data.slug || slug,
      title: data.title || slug,
      description: data.description || "",
      publishedAt: data.publishedAt || "2026-08-24",
      updatedAt: data.updatedAt || data.publishedAt || "2026-08-24",
      author: data.author || "Expenseliy Financial Editorial Team",
      category: data.category || "General Finance",
      keywords: Array.isArray(data.keywords) ? data.keywords : [],
      image: data.image || "/og-image.png",
      readingTime: calculateReadingTime(content),
      content,
    };
  } catch {
    return null;
  }
}

export function getRelatedGuides(currentSlug: string, category: string, limit = 3): GuideArticle[] {
  const allGuides = getAllGuides();
  const sameCategory = allGuides.filter(
    (guide) => guide.slug !== currentSlug && guide.category === category
  );

  if (sameCategory.length >= limit) {
    return sameCategory.slice(0, limit);
  }

  const otherGuides = allGuides.filter(
    (guide) => guide.slug !== currentSlug && guide.category !== category
  );

  return [...sameCategory, ...otherGuides].slice(0, limit);
}

export function getAllCategories(): string[] {
  const allGuides = getAllGuides();
  const categories = Array.from(new Set(allGuides.map((g) => g.category)));
  return categories;
}
