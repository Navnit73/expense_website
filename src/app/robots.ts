import type { MetadataRoute } from "next";
import { SITE_CONFIG } from "@/lib/seo";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: [
          "/",
          "/features",
          "/pricing",
          "/how-it-works",
          "/tools",
          "/tools/*",
          "/guide",
          "/guide/*",
          "/about",
          "/contact",
          "/privacy",
          "/terms",
          "/cookies",
          "/refund-policy",
        ],
        disallow: [
          "/api/",
          "/dashboard/",
          "/settings/",
          "/billing/",
          "/login",
          "/signup",
          "/auth/",
          "/*?*", // Avoid crawling duplicate URLs with tracking parameters
        ],
      },
    ],
    sitemap: `${SITE_CONFIG.url}/sitemap.xml`,
  };
}
