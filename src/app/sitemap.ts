import type { MetadataRoute } from "next";
import { getAllGuides } from "@/lib/guide";
import { SITE_CONFIG } from "@/lib/seo";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;
  const lastModified = new Date();

  // Static marketing routes
  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}`,
      lastModified,
      changeFrequency: "weekly",
      priority: 1.0,
    },
    {
      url: `${baseUrl}/features`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/pricing`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.9,
    },
    {
      url: `${baseUrl}/how-it-works`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${baseUrl}/guide`,
      lastModified,
      changeFrequency: "daily",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    // Tools Hub & Calculators
    {
      url: `${baseUrl}/tools/self-employment-tax-calculator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/mileage-deduction-calculator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/home-office-deduction-calculator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/schedule-c-expense-deductions-finder`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/freelance-hourly-rate-calculator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/invoice-late-fee-calculator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.90,
    },
    {
      url: `${baseUrl}/tools/estimate-maker`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/purchase-order-generator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.90,
    },
    {
      url: `${baseUrl}/tools/packing-slip-generator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.90,
    },
    {
      url: `${baseUrl}/tools/profit-margin-calculator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/break-even-calculator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/cash-burn-runway-calculator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.90,
    },
    {
      url: `${baseUrl}/tools/dso-calculator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.90,
    },
    {
      url: `${baseUrl}/tools/per-diem-calculator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.90,
    },
    {
      url: `${baseUrl}/tools/bank-statement-csv-formatter`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.90,
    },
    {
      url: `${baseUrl}/tools/sales-tax-vat-calculator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/business-tip-calculator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.90,
    },
    {
      url: `${baseUrl}/tools/50-30-20-budget-calculator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/tools/emergency-fund-calculator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.90,
    },
    {
      url: `${baseUrl}/tools/debt-payoff-calculator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.90,
    },
    {
      url: `${baseUrl}/tools/net-worth-calculator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.90,
    },
    {
      url: `${baseUrl}/tools/savings-rate-calculator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.90,
    },
    {
      url: `${baseUrl}/tools/subscription-cost-calculator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.90,
    },
    // Receipt Suite
    {
      url: `${baseUrl}/receipt-scanner`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/receipt-tracker`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/receipt-scanner-app`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.90,
    },
    {
      url: `${baseUrl}/receipt-scanner-organizer`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.90,
    },
    {
      url: `${baseUrl}/receipt-tracking-app`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.90,
    },
    {
      url: `${baseUrl}/expense-receipt-app`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.90,
    },
    {
      url: `${baseUrl}/receipt-scanner-for-taxes`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/receipt-scanner-for-small-business`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/receipt-scanner-that-categorizes`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.90,
    },
    {
      url: `${baseUrl}/receipt-tracker-for-taxes`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.90,
    },
    // Invoicing Suite
    {
      url: `${baseUrl}/invoice-generator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/invoice-maker`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/free-invoice-generator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.95,
    },
    {
      url: `${baseUrl}/invoice-creator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.90,
    },
    {
      url: `${baseUrl}/online-invoice-maker`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.90,
    },
    {
      url: `${baseUrl}/invoice-pdf-generator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.90,
    },
    {
      url: `${baseUrl}/invoice-template`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.90,
    },
    {
      url: `${baseUrl}/bill-maker`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.90,
    },
    {
      url: `${baseUrl}/online-bill-maker`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.90,
    },
    {
      url: `${baseUrl}/receipt-maker`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.90,
    },
    {
      url: `${baseUrl}/online-receipt-generator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.90,
    },
    {
      url: `${baseUrl}/receipt-generator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.90,
    },
    {
      url: `${baseUrl}/invoice-number-generator`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/invoice-generator-excel`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.85,
    },
    {
      url: `${baseUrl}/invoice-generator-for-small-business`,
      lastModified,
      changeFrequency: "weekly",
      priority: 0.90,
    },
    {
      url: `${baseUrl}/about`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified,
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.4,
    },
    {
      url: `${baseUrl}/cookies`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified,
      changeFrequency: "yearly",
      priority: 0.3,
    },
  ];

  // Dynamic guide routes from Markdown files
  const guides = getAllGuides();
  const guideRoutes: MetadataRoute.Sitemap = guides.map((guide) => ({
    url: `${baseUrl}/guide/${guide.slug}`,
    lastModified: new Date(guide.updatedAt || guide.publishedAt),
    changeFrequency: "monthly",
    priority: 0.75,
  }));

  return [...staticRoutes, ...guideRoutes];
}
