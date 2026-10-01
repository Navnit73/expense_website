import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Invoice Late Fee & Overdue Payment Interest Calculator",
  description:
    "Free Invoice Late Fee Calculator. Calculate statutory overdue interest (1.5%/mo or APR%), grace periods, and copy ready-to-send payment demand email notices.",
  path: "/tools/invoice-late-fee-calculator",
  keywords: [
    "invoice late fee calculator",
    "overdue payment interest calculator",
    "late payment fee formula",
    "statutory interest on unpaid invoices",
    "past due invoice demand notice template",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
