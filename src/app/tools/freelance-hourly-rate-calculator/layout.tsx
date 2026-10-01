import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Freelance Hourly Rate & Target Salary Calculator (2026)",
  description:
    "Free Freelance Rate Calculator. Calculate how much to charge per hour, day, and month based on your target salary, taxes, billable hours, and overhead expenses.",
  path: "/tools/freelance-hourly-rate-calculator",
  keywords: [
    "freelance rate calculator",
    "hourly to salary freelance calculator",
    "how much to charge per hour freelance",
    "consultant billable rate calculator",
    "1099 contractor rate formula",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
