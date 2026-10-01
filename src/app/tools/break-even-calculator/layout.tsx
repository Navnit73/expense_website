import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Break-Even Point & Unit Volume Calculator – Feasibility Analysis",
  description:
    "Free Break-Even Point Calculator. Calculate fixed costs, contribution margin, and exact sales volume needed to cover overhead and hit target net profits.",
  path: "/tools/break-even-calculator",
  keywords: [
    "break even point calculator",
    "break even analysis formula",
    "calculate break even units",
    "fixed cost variable cost calculator",
    "contribution margin calculator",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
