import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Days Sales Outstanding (DSO) & Accounts Receivable Calculator",
  description:
    "Free Days Sales Outstanding (DSO) Calculator. Measure how fast your business collects invoice payments, calculate AR turnover, and benchmark collection speed.",
  path: "/tools/dso-calculator",
  keywords: [
    "days sales outstanding calculator",
    "dso calculator online",
    "accounts receivable turnover ratio",
    "average collection period calculator",
    "working capital dso formula",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
