import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Profit Margin & Markup Calculator – Calculate Gross Margin & Cost",
  description:
    "Free Profit Margin and Markup Calculator. Calculate gross profit, profit margin percentage, and cost markup instantly. Perfect for e-commerce, retail, and consulting.",
  path: "/tools/profit-margin-calculator",
  keywords: [
    "profit margin calculator",
    "markup to margin calculator",
    "gross margin calculator",
    "calculate profit margin percentage",
    "retail markup formula",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
