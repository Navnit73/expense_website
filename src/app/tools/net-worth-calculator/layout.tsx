import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Net Worth & Personal Balance Sheet Calculator (2026)",
  description:
    "Free Net Worth Calculator and personal balance sheet. Track cash, retirement accounts, real estate, and liabilities to measure your true financial net worth.",
  path: "/tools/net-worth-calculator",
  keywords: [
    "net worth calculator",
    "personal balance sheet calculator",
    "calculate my net worth online",
    "assets vs liabilities calculator",
    "wealth tracker calculator",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
