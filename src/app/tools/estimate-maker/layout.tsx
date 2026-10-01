import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Free Price Estimate & Quotation Maker – Download PDF Quotes",
  description:
    "Create and download professional PDF price estimates, client proposals, and job quotations online for free. Multi-currency, tax & discount lines with zero signup.",
  path: "/tools/estimate-maker",
  keywords: [
    "free estimate maker",
    "online quotation generator",
    "price quote template pdf",
    "job estimate maker online",
    "contractor quotation creator",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
