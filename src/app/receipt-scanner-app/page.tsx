import React from "react";
import type { Metadata } from "next";
import Link from "next/link";
import { Container } from "@/components/marketing/Container";
import { Breadcrumbs } from "@/components/marketing/Breadcrumbs";
import { Badge } from "@/components/marketing/Badge";
import { CTASection } from "@/components/marketing/CTASection";
import { FAQAccordion, FAQItem } from "@/components/marketing/FAQAccordion";
import { UnifiedReceiptEngine } from "@/components/receipt-engine/UnifiedReceiptEngine";
import {
  createPageMetadata,
  getWebApplicationSchema,
  getBreadcrumbSchema,
  getFAQSchema,
  getHowToSchema,
} from "@/lib/seo";
import {
  Smartphone,
  Camera,
  Scan,
  Sparkles,
  ShieldCheck,
  Zap,
  ArrowRight,
  Maximize2,
  CheckCircle2,
  Contrast,
  Sliders,
} from "lucide-react";

export const metadata: Metadata = createPageMetadata({
  title: "Receipt Scanner App – Scan Receipts & Track Expenses",
  description:
    "Turn your phone into a powerful receipt scanner. Capture receipts, extract expense data with camera OCR, and organize spending digitally with Expenseliy.",
  path: "/receipt-scanner-app",
  keywords: [
    "receipt scanner app",
    "scan a receipt app",
    "best app for receipt scanning",
    "scan receipt app free",
    "iphone receipt scanner",
    "android receipt scanner",
    "mobile receipt OCR app",
  ],
});

const FAQS: FAQItem[] = [
  {
    question: "Do I need to download a heavy native app from the App Store?",
    answer:
      "No! Expenseliy functions as an instant Progressive Web Application (PWA). You can open it directly in Safari on iOS or Chrome on Android, use your native camera, and even add it to your Home Screen with zero download or App Store installation required.",
  },
  {
    question: "How does the mobile camera scanner handle low light or faded receipts?",
    answer:
      "Our client-side canvas engine automatically applies high-contrast binarization and grayscale filtering. This separates faded thermal receipt characters from background noise, ensuring accurate OCR character extraction.",
  },
  {
    question: "Can I use the receipt scanner app while offline or on mobile data?",
    answer:
      "Yes. Because our OCR algorithms and local storage execute directly in the browser's JavaScript engine, scanning and ledger management work smoothly on your device without consuming large mobile data bandwidth.",
  },
  {
    question: "Is this receipt scanner app completely free?",
    answer:
      "Yes. You can scan, verify, categorize, and export unlimited receipts directly through our free web utility.",
  },
];

export default function ReceiptScannerAppPage() {
  const webAppSchema = getWebApplicationSchema({
    name: "Receipt Scanner App – Scan Receipts & Track Expenses",
    description:
      "Turn your phone into a receipt scanner. Capture receipts, extract expense information and organize everything digitally.",
    url: "/receipt-scanner-app",
  });

  const breadcrumbSchema = getBreadcrumbSchema([
    { name: "Home", url: "/" },
    { name: "Tools", url: "/tools" },
    { name: "Receipt Scanner App", url: "/receipt-scanner-app" },
  ]);

  const faqSchema = getFAQSchema(FAQS);

  const howToSchema = getHowToSchema({
    name: "How to Scan Receipts With Your Phone",
    description:
      "Step-by-step guide to capturing clean mobile receipt scans with high OCR accuracy.",
    steps: [
      {
        name: "Open Mobile Camera",
        text: "Launch the camera scanner tool and point your device directly above the paper receipt.",
      },
      {
        name: "Ensure Proper Lighting & Flat Placement",
        text: "Place the receipt on a dark, flat surface with even ambient light to minimize glare and shadow.",
      },
      {
        name: "Capture & Auto-Enhance",
        text: "Snap the photo. The app applies auto-rotation and contrast enhancement to sharpen text.",
      },
      {
        name: "Verify & Save to History",
        text: "Confirm detected vendor and amounts, then save the digital expense to your receipt history.",
      },
    ],
  });

  return (
    <div className="flex flex-col flex-1">
      {/* Schema Injections */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webAppSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />

      {/* Header */}
      <header className="bg-surface border-b border-hairline py-12 sm:py-16">
        <Container size="default">
          <Breadcrumbs
            items={[
              { name: "Tools", url: "/tools" },
              { name: "Receipt Scanner App", url: "/receipt-scanner-app" },
            ]}
            className="mb-6"
          />

          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-income-bg text-income border border-income-border text-xs font-semibold uppercase tracking-wider mb-4 font-mono">
              <Smartphone className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Mobile-First Web App</span>
            </div>

            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-ink tracking-tight mb-4 leading-tight">
              Receipt Scanner App – Scan Receipts & Track Expenses
            </h1>

            <p className="text-base sm:text-lg text-ink-secondary leading-relaxed mb-6">
              Turn your iPhone or Android phone into a lightning-fast receipt scanner. Capture
              receipts with your camera, extract expense information instantly with client-side OCR,
              and organize everything digitally.
            </p>

            <div className="flex flex-wrap items-center gap-4 text-xs text-ink-muted">
              <div className="flex items-center gap-1.5">
                <Camera className="w-4 h-4 text-primary" />
                <span>Live Camera Auto-Capture</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Contrast className="w-4 h-4 text-primary" />
                <span>Thermal Contrast Enhancer</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-primary" />
                <span>No Cloud Uploads Required</span>
              </div>
            </div>
          </div>
        </Container>
      </header>

      {/* Interactive Tool Section */}
      <section className="py-10 sm:py-14 bg-canvas flex-1 border-b border-hairline">
        <Container size="default">
          <UnifiedReceiptEngine
            variant="scanner-app"
            initialTab="scan"
            customHeadline="Mobile-Optimized Receipt Scanner App"
            customSubheadline="Use your device camera or upload an image to extract vendor, date, taxes, and totals instantly."
            highlightFeatures={[
              "Mobile-first camera scanner",
              "Perspective & contrast enhancement",
              "Automatic vendor & total detection",
              "Expense categorization",
              "Receipt history & search",
              "Export to CSV & PDF",
            ]}
          />
        </Container>
      </section>

      {/* Long-form SEO Content */}
      <section className="py-14 sm:py-20 bg-surface">
        <Container size="narrow">
          <article className="prose prose-sm sm:prose-base dark:prose-invert max-w-none space-y-8 text-ink-secondary">
            <div>
              <Badge variant="sky" size="sm" className="mb-3">
                Mobile Best Practices
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-4">
                How to Scan Receipts With Your Phone: Pro Tips for 99% OCR Accuracy
              </h2>
              <p className="leading-relaxed">
                Smartphones have made document scanners obsolete. With high-resolution lenses and
                modern web APIs, your phone can digitize paper receipts faster than desktop flatbed
                scanners. However, achieving high OCR accuracy requires following a few fundamental
                photography best practices.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 not-prose my-6">
              <div className="p-4 rounded-xl bg-canvas border border-hairline">
                <h4 className="text-sm font-bold text-ink mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-income" />
                  1. High Contrast Background
                </h4>
                <p className="text-xs text-ink-secondary leading-relaxed">
                  Place white or translucent receipts on a dark table or desk. This allows the edge
                  detection algorithm to cleanly isolate receipt boundaries without cropping total
                  lines.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-canvas border border-hairline">
                <h4 className="text-sm font-bold text-ink mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-income" />
                  2. Avoid Overhead Glare
                </h4>
                <p className="text-xs text-ink-secondary leading-relaxed">
                  Thermal receipt paper is coated with shiny chemicals that reflect direct light,
                  washing out digits. Angle the phone slightly or diffuse harsh overhead bulbs.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-canvas border border-hairline">
                <h4 className="text-sm font-bold text-ink mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-income" />
                  3. Flatten Wrinkles & Folds
                </h4>
                <p className="text-xs text-ink-secondary leading-relaxed">
                  A crease through the decimal point can turn <code>$14.50</code> into{" "}
                  <code>$1450</code>. Smooth out major creases with your fingers before tapping the
                  capture button.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-canvas border border-hairline">
                <h4 className="text-sm font-bold text-ink mb-1 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-income" />
                  4. Frame Full Header & Footer
                </h4>
                <p className="text-xs text-ink-secondary leading-relaxed">
                  The vendor name is usually at the top, while the grand total, payment method, and
                  tax are at the bottom. Make sure both ends are clearly within the viewfinder.
                </p>
              </div>
            </div>

            <h3 className="text-xl font-bold text-ink mt-8 mb-3">
              Why Expenseliy is the Best Free Receipt Scanner App
            </h3>
            <p>
              Most receipt scanning apps in the iOS App Store and Google Play Store force users into
              expensive $9.99/month subscriptions just to export a basic CSV or lock your receipts
              behind proprietary formats. Expenseliy delivers professional OCR, client-side
              confidentiality, and free spreadsheet exports directly in your browser.
            </p>
          </article>
        </Container>
      </section>

      {/* Internal Linking Hub */}
      <section className="py-12 bg-canvas border-t border-hairline">
        <Container size="default">
          <div className="text-center max-w-2xl mx-auto mb-8">
            <h3 className="text-lg sm:text-xl font-bold text-ink">
              Related Receipt & Mobile Apps
            </h3>
            <p className="text-xs sm:text-sm text-ink-secondary mt-1">
              Discover complementary features to manage your money on the go.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <Link
              href="/receipt-scanner"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Receipt Scanner →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Online OCR tool for desktop and laptop file uploads.
              </p>
            </Link>

            <Link
              href="/expense-receipt-app"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Expense Receipt App →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Turn scanned receipts into complete expense claims.
              </p>
            </Link>

            <Link
              href="/receipt-scanner-organizer"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Receipt Organizer →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Auto-sort and categorize receipts into folders.
              </p>
            </Link>

            <Link
              href="/receipt-scanner-for-small-business"
              className="p-4 rounded-xl bg-surface border border-hairline hover:border-primary/60 transition-colors block group"
            >
              <h4 className="text-xs font-bold text-ink group-hover:text-primary transition-colors mb-1">
                Small Business Scanner →
              </h4>
              <p className="text-[11px] text-ink-secondary">
                Manage vendor receipts and team reimbursement records.
              </p>
            </Link>
          </div>
        </Container>
      </section>

      {/* FAQs */}
      <section className="py-14 sm:py-20 bg-surface border-t border-hairline">
        <Container size="narrow">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <Badge variant="neutral" size="sm" className="mb-3">
              FAQ
            </Badge>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-ink tracking-tight mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-xs sm:text-sm text-ink-secondary">
              Common questions about using our mobile receipt scanning app.
            </p>
          </div>

          <FAQAccordion items={FAQS} />
        </Container>
      </section>

      {/* CTA */}
      <CTASection
        title="Start Scanning Receipts With Your Phone Today"
        description="Experience frictionless mobile receipt scanning with zero subscription fees and instant CSV export."
        badgeText="Open Mobile Scanner"
      />
    </div>
  );
}
