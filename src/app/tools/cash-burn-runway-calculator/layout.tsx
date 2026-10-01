import type { Metadata } from "next";
import { createPageMetadata } from "@/lib/seo";

export const metadata: Metadata = createPageMetadata({
  title: "Startup Runway & Cash Burn Rate Calculator (2026)",
  description:
    "Free Startup Runway Calculator. Calculate monthly gross burn, net cash drain, and months until Zero Cash Date (ZCD) to forecast capital requirements.",
  path: "/tools/cash-burn-runway-calculator",
  keywords: [
    "cash burn rate calculator",
    "startup runway calculator",
    "zero cash date calculator",
    "net burn rate formula",
    "business cash runway forecast",
  ],
});

export default function Layout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
