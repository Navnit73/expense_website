import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Free 50/30/20 Budget Calculator – Allocate Needs, Wants & Savings",
  description:
    "Calculate your ideal monthly 50/30/20 budget breakdown instantly. Split your take-home pay into 50% essential needs, 30% discretionary wants, and 20% savings.",
  path: "/tools/50-30-20-budget-calculator",
  keywords: [
    "50 30 20 budget calculator",
    "50 30 20 rule calculator",
    "monthly budget calculator",
    "needs wants savings calculator",
    "net income budget calculator",
    "personal finance budget tool",
  ],
});

export default function BudgetCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
