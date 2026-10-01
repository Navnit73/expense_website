import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Sales Tax & Reverse VAT / GST Calculator (2026)",
  description:
    "Free Sales Tax and Reverse VAT Calculator. Add tax to net base prices or extract included VAT/GST from gross invoice totals with global tax presets.",
  path: "/tools/sales-tax-vat-calculator",
  keywords: [
    "sales tax calculator",
    "reverse vat calculator",
    "calculate vat backwards from total",
    "extract gst calculator",
    "add sales tax calculator online",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
