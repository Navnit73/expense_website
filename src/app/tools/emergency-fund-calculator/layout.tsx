import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Emergency Fund Calculator – Calculate 3, 6, & 12 Month Safety Nets",
  description:
    "Free Emergency Fund Calculator. Calculate your essential monthly baseline expenses and discover exactly how much emergency savings you need for 3, 6, and 12-month safety nets.",
  path: "/tools/emergency-fund-calculator",
  keywords: [
    "emergency fund calculator",
    "how much emergency fund do i need",
    "3 to 6 months expenses calculator",
    "personal finance safety net calculator",
    "emergency savings goal calculator",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
