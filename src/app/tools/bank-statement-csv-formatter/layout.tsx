import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Bank Statement & PDF Transaction CSV Formatter – Free Online Parser",
  description:
    "Free, 100% private in-browser bank statement text to CSV converter. Clean, standardize dates and amounts, and export CSV files ready for QuickBooks, Xero, or Expenseliy.",
  path: "/tools/bank-statement-csv-formatter",
  keywords: [
    "bank statement to csv converter",
    "convert bank statement transactions",
    "free bank csv formatter online",
    "clean bank statement export",
    "pdf transaction text to csv",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
