import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Savings Rate Calculator – Measure Your Net Savings & FIRE Path",
  description:
    "Calculate your personal savings rate percentage based on monthly take-home income and expenses. Track progress toward financial freedom and emergency savings.",
  path: "/tools/savings-rate-calculator",
  keywords: [
    "savings rate calculator",
    "personal savings rate formula",
    "net savings calculator",
    "calculate monthly savings rate",
    "fire savings rate calculator",
    "emergency fund savings tracker",
  ],
});

export default function SavingsRateCalculatorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
