import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "IRS Mileage Deduction & Trip Cost Calculator (2026)",
  description:
    "Calculate your standard IRS mileage tax deduction ($0.67/mi) vs actual vehicle expenses. Free calculator for rideshare drivers, 1099 contractors, and business travel.",
  path: "/tools/mileage-deduction-calculator",
  keywords: [
    "mileage deduction calculator",
    "irs mileage rate 2026",
    "business mileage tax write off",
    "standard vs actual mileage calculator",
    "rideshare driver mileage calculator",
    "schedule c car and truck expense calculator",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
