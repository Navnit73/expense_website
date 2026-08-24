import type { Metadata } from "next";

export const SITE_CONFIG = {
  name: "Expenseliy",
  domain: "expenseliy.com",
  url: "https://expenseliy.com",
  title: "Expenseliy — Simple Expense Tracking & Financial Management",
  description:
    "Expenseliy is a modern expense tracking and financial management platform for individuals and small businesses. Track expenses, income, investments, and algorithmic insights with zero complexity.",
  ogImage: "https://expenseliy.com/og-image.png",
  twitterHandle: "@expenseliy",
  authors: [{ name: "Expenseliy Team", url: "https://expenseliy.com/about" }],
  creator: "Expenseliy",
  publisher: "Expenseliy",
  legalEntity: "[Company Legal Name]",
  contactEmail: "support@expenseliy.com",
  locale: "en_US",
};

interface MetadataProps {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  keywords?: string[];
  authors?: string[];
}

export function createPageMetadata({
  title,
  description = SITE_CONFIG.description,
  path = "",
  image = SITE_CONFIG.ogImage,
  noIndex = false,
  type = "website",
  publishedTime,
  modifiedTime,
  keywords = [
    "expense tracker",
    "expense tracking",
    "personal expense tracker",
    "small business expense tracker",
    "financial management software",
    "income and expense tracker",
    "investment tracker",
    "spending tracker",
    "financial insights",
    "cash flow tracker",
  ],
  authors,
}: MetadataProps): Metadata {
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  const canonicalUrl = `${SITE_CONFIG.url}${cleanPath === "/" ? "" : cleanPath}`;
  const formattedTitle = title
    ? `${title} | ${SITE_CONFIG.name}`
    : `${SITE_CONFIG.name} — Simple Expense Tracking & Financial Management`;

  return {
    title: formattedTitle,
    description,
    keywords,
    metadataBase: new URL(SITE_CONFIG.url),
    alternates: {
      canonical: canonicalUrl,
      languages: {
        en: canonicalUrl,
        "x-default": canonicalUrl,
      },
    },
    authors: authors ? authors.map((a) => ({ name: a })) : SITE_CONFIG.authors,
    creator: SITE_CONFIG.creator,
    publisher: SITE_CONFIG.publisher,
    robots: noIndex
      ? {
          index: false,
          follow: false,
        }
      : {
          index: true,
          follow: true,
          googleBot: {
            index: true,
            follow: true,
            "max-video-preview": -1,
            "max-image-preview": "large",
            "max-snippet": -1,
          },
        },
    openGraph: {
      title: formattedTitle,
      description,
      url: canonicalUrl,
      siteName: SITE_CONFIG.name,
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: `${title || SITE_CONFIG.name} preview`,
        },
      ],
      locale: SITE_CONFIG.locale,
      type,
      ...(publishedTime && { publishedTime }),
      ...(modifiedTime && { modifiedTime }),
    },
    twitter: {
      card: "summary_large_image",
      title: formattedTitle,
      description,
      images: [image],
      creator: SITE_CONFIG.twitterHandle,
    },
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
}

/**
 * Structured Data Schemas (JSON-LD)
 */

export function getOrganizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    logo: `${SITE_CONFIG.url}/logo.png`,
    description: SITE_CONFIG.description,
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      email: SITE_CONFIG.contactEmail,
      contactType: "customer support",
    },
  };
}

export function getWebsiteSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: SITE_CONFIG.name,
    url: SITE_CONFIG.url,
    description: SITE_CONFIG.description,
  };
}

export function getSoftwareAppSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: SITE_CONFIG.name,
    operatingSystem: "Web",
    applicationCategory: "FinanceApplication",
    url: SITE_CONFIG.url,
    description:
      "Expense tracking and financial management web application for individuals and small businesses.",
    offers: [
      {
        "@type": "Offer",
        price: "0",
        priceCurrency: "USD",
        name: "Free Plan",
        description: "40 lifetime transactions, dashboard, analytics, and custom categories.",
      },
      {
        "@type": "Offer",
        price: "15.00",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        name: "Pro Monthly",
        description: "Unlimited transactions, advanced AI insights, priority support.",
      },
      {
        "@type": "Offer",
        price: "99.00",
        priceCurrency: "USD",
        priceValidUntil: "2027-12-31",
        name: "Pro Annual",
        description: "Unlimited transactions, advanced AI insights, billed annually at $8.25/mo.",
      },
    ],
  };
}

export function getBreadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: item.url.startsWith("http") ? item.url : `${SITE_CONFIG.url}${item.url}`,
    })),
  };
}

export function getArticleSchema({
  title,
  description,
  url,
  publishedAt,
  updatedAt,
  author = "Expenseliy",
  image = SITE_CONFIG.ogImage,
}: {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  updatedAt: string;
  author?: string;
  image?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: title,
    description,
    url: url.startsWith("http") ? url : `${SITE_CONFIG.url}${url}`,
    image: image.startsWith("http") ? image : `${SITE_CONFIG.url}${image}`,
    datePublished: publishedAt,
    dateModified: updatedAt,
    author: {
      "@type": "Person",
      name: author,
    },
    publisher: {
      "@type": "Organization",
      name: SITE_CONFIG.name,
      logo: {
        "@type": "ImageObject",
        url: `${SITE_CONFIG.url}/logo.png`,
      },
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url.startsWith("http") ? url : `${SITE_CONFIG.url}${url}`,
    },
  };
}

export function getFAQSchema(faqs: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.answer,
      },
    })),
  };
}
