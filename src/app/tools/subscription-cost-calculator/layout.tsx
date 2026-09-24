import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Subscription Cost Calculator – Audit & Track Recurring Expenses",
  description:
    "Calculate your total monthly and annual recurring subscription spend. Audit streaming, software, memberships, and utility bills to eliminate waste.",
  path: "/tools/subscription-cost-calculator",
  keywords: [
    "subscription cost calculator",
    "recurring expense calculator",
    "audit monthly subscriptions",
    "subscription tracker calculator",
    "saas cost calculator",
    "track monthly recurring bills",
  ],
});

export default function SubscriptionCostCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
