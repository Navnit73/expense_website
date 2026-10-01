import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Free Packing Slip & Delivery Receipt Generator – Download PDF",
  description:
    "Generate printable shipping packing slips, delivery notes, and parcel package manifests online for free. Add SKUs, shipped quantities, and tracking info.",
  path: "/tools/packing-slip-generator",
  keywords: [
    "packing slip generator",
    "free packing slip template pdf",
    "delivery note creator online",
    "shipping slip maker",
    "ecommerce packing slip printable",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
