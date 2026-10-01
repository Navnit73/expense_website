import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Home Office Deduction Calculator – Simplified vs Actual Method",
  description:
    "Free Home Office Tax Deduction Calculator. Compare the IRS Simplified Method ($5/sq ft) vs Actual Expense Method (rent, utilities, internet) to maximize Form 8829 savings.",
  path: "/tools/home-office-deduction-calculator",
  keywords: [
    "home office deduction calculator",
    "simplified vs actual home office method",
    "form 8829 calculator",
    "freelancer home office write off",
    "schedule c home office deduction",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
