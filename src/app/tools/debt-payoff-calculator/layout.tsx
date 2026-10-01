import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Debt Snowball vs. Avalanche Payoff Calculator – Get Debt Free",
  description:
    "Free Debt Payoff Calculator. Compare Debt Avalanche (lowest interest cost) vs. Debt Snowball (fastest psychological wins) to calculate your exact debt-free date.",
  path: "/tools/debt-payoff-calculator",
  keywords: [
    "debt payoff calculator",
    "debt snowball vs avalanche calculator",
    "credit card payoff calculator",
    "debt free date estimator",
    "debt reduction calculator free",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
