import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "1099 Self-Employment & Quarterly Tax Calculator (2026)",
  description:
    "Free 1099 tax calculator for freelancers, contractors, and sole proprietors. Calculate Social Security (12.4%), Medicare (2.9%), income taxes, and IRS quarterly payment estimates.",
  path: "/tools/self-employment-tax-calculator",
  keywords: [
    "1099 tax calculator",
    "self employment tax calculator",
    "freelance tax calculator",
    "estimated quarterly tax calculator 2026",
    "schedule se calculator",
    "contractor tax write offs calculator",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
