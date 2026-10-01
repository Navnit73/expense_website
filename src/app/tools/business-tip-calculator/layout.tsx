import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Business Meal Tip & Bill Split Calculator – Calculate Tips & Shares",
  description:
    "Free Tip and Bill Split Calculator. Calculate pre-tax tips (15%, 18%, 20%, 25%), split restaurant checks evenly, and generate itemized expense meal receipts.",
  path: "/tools/business-tip-calculator",
  keywords: [
    "tip calculator",
    "bill split calculator with tip",
    "business meal tip calculator",
    "pre tax tip calculator",
    "restaurant bill splitter online",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
