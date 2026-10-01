import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Free Purchase Order (PO) Generator – Create & Download PDF POs",
  description:
    "Generate standardized B2B purchase orders online for free. Add vendor details, shipping terms, line items, and export professional PDF PO documents.",
  path: "/tools/purchase-order-generator",
  keywords: [
    "purchase order generator",
    "create purchase order online free",
    "po generator pdf",
    "b2b purchase order maker",
    "free purchase order template",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
