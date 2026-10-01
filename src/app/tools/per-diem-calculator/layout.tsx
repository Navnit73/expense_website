import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Business Travel Per Diem & Meal Deduction Calculator (2026)",
  description:
    "Free GSA Per Diem Calculator. Calculate daily business travel allowances, hotel rates, M&IE meals, and 50% IRS business meal tax deductions with the 75% travel day rule.",
  path: "/tools/per-diem-calculator",
  keywords: [
    "per diem calculator",
    "gsa per diem calculator 2026",
    "business travel meal deduction calculator",
    "meals and incidental expenses calculator",
    "75 percent per diem travel day rule",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
