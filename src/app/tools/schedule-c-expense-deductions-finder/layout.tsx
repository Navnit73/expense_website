import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Schedule C Tax Deductions & Business Expense Categorizer (2026)",
  description:
    "Free searchable database of 50+ IRS Schedule C business deductions for freelancers, 1099 contractors, and small businesses. Check deductible percentages and receipt rules.",
  path: "/tools/schedule-c-expense-deductions-finder",
  keywords: [
    "schedule c deductions list",
    "business expense categorizer",
    "freelance tax write offs 1099",
    "what can i write off on taxes",
    "irs schedule c line by line expenses",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
