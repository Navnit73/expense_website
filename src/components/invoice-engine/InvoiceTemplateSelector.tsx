"use client";

import React from "react";
import {
  FileText,
  Briefcase,
  Wrench,
  Sparkles,
  ShoppingBag,
  Receipt,
  CheckCircle2,
  ArrowRight,
  Palette,
  Laptop,
  Building,
  Coffee,
} from "lucide-react";
import { InvoiceData, InvoiceTemplateTheme } from "@/lib/invoice-engine/types";

export interface InvoiceTemplatePreset {
  id: string;
  name: string;
  category: string;
  description: string;
  icon: any;
  theme: InvoiceTemplateTheme;
  accentBadge: string;
  sampleData: Partial<InvoiceData>;
}

export const INVOICE_TEMPLATES: InvoiceTemplatePreset[] = [
  {
    id: "modern-business",
    name: "Modern Emerald",
    category: "Small Business & Agencies",
    description: "Clean modern design with emerald accents, tax breakdown, and company branding.",
    icon: Briefcase,
    theme: "modern",
    accentBadge: "bg-emerald-50 text-emerald-800 border-emerald-300",
    sampleData: {
      type: "invoice",
      template: "modern",
      invoiceNumber: "INV-2026-EM101",
      sender: {
        name: "Elevate Digital Agency LLC",
        email: "billing@elevatedigital.com",
        phone: "+1 (555) 432-9081",
        address: "100 Innovation Blvd, Suite 300",
        cityStateZip: "Austin, TX 78701",
        taxId: "EIN: 74-9821402",
      },
      client: {
        name: "Summit Outdoor Retail Corp",
        email: "invoices@summitretail.com",
        phone: "+1 (555) 601-9988",
        address: "300 Mountain Way",
        cityStateZip: "Boulder, CO 80302",
      },
      items: [
        { id: "sb-1", description: "Monthly SEO & Content Retainer (October 2026)", quantity: 1, rate: 2500, amount: 2500 },
        { id: "sb-2", description: "Paid Search & Meta Ads Management", quantity: 1, rate: 1500, amount: 1500 },
      ],
      notes: "Invoice for digital marketing retainer services rendered.",
      terms: "Net 30. Direct bank transfer instructions listed above.",
    },
  },
  {
    id: "executive-corporate",
    name: "Executive Corporate Navy",
    category: "Corporate & Consulting",
    description: "Structured authoritative layout with navy blue headers, PO tracking, and formal terms.",
    icon: Building,
    theme: "corporate",
    accentBadge: "bg-blue-50 text-blue-800 border-blue-300",
    sampleData: {
      type: "invoice",
      template: "corporate",
      invoiceNumber: "INV-2026-CS900",
      referenceNumber: "PO-77402",
      sender: {
        name: "Vanguard Strategic Advisors LLP",
        email: "advisory@vanguardgroup.io",
        phone: "+1 (212) 555-0188",
        address: "200 Park Avenue, 35th Floor",
        cityStateZip: "New York, NY 10166",
        taxId: "EIN: 13-9847102",
      },
      client: {
        name: "Horizon Venture Partners",
        email: "finance@horizonvp.com",
        phone: "+1 (650) 555-4422",
        address: "3000 Sand Hill Road, Suite 100",
        cityStateZip: "Menlo Park, CA 94025",
      },
      items: [
        { id: "cs-1", description: "Q3 Strategic Go-to-Market Advisory & Board Prep", quantity: 1, rate: 6500, amount: 6500 },
        { id: "cs-2", description: "Due Diligence Technical Architecture Audit", quantity: 1, rate: 3500, amount: 3500 },
      ],
      notes: "Quarterly advisory engagement fee.",
      terms: "Net 15 days via ACH or Bank Wire.",
    },
  },
  {
    id: "clean-slate",
    name: "Clean Slate Minimal",
    category: "Contractors & Trades",
    description: "Monochrome elegance with understated borders, itemized labor & materials breakdown.",
    icon: Wrench,
    theme: "classic",
    accentBadge: "bg-zinc-100 text-zinc-800 border-zinc-300",
    sampleData: {
      type: "invoice",
      template: "classic",
      invoiceNumber: "INV-2026-CT881",
      sender: {
        name: "Apex Remodeling & Design",
        email: "service@apexremodel.com",
        phone: "+1 (555) 888-2940",
        address: "880 Builders Way",
        cityStateZip: "Seattle, WA 98101",
        taxId: "WA Contractor Lic #APEX8412",
      },
      client: {
        name: "Cascadia Commercial Properties",
        email: "pm@cascadiaprop.com",
        phone: "+1 (555) 333-1100",
        address: "1200 Pine St, Suite 500",
        cityStateZip: "Seattle, WA 98101",
      },
      items: [
        { id: "c-1", description: "Commercial LED Retrofit Lighting Installation (Labor)", quantity: 16, rate: 95, amount: 1520 },
        { id: "c-2", description: "UL-Certified LED Panels & Junction Boxes (Materials)", quantity: 12, rate: 145, amount: 1740 },
        { id: "c-3", description: "Municipal Electrical Permit & Inspection Filing", quantity: 1, rate: 350, amount: 350 },
      ],
      notes: "All electrical work completed according to NEC 2026 standards.",
      terms: "Balance due upon receipt of municipal inspection sign-off.",
    },
  },
  {
    id: "creative-violet",
    name: "Creative Studio Violet",
    category: "Designers & Photographers",
    description: "Vibrant creative agency template with stylish typography and project deliverable tags.",
    icon: Palette,
    theme: "creative",
    accentBadge: "bg-purple-50 text-purple-800 border-purple-300",
    sampleData: {
      type: "invoice",
      template: "creative",
      invoiceNumber: "INV-2026-CR501",
      sender: {
        name: "Studio Aura Visual Design",
        email: "hello@studioaura.design",
        phone: "+1 (415) 555-8392",
        address: "550 Battery Street, Suite 400",
        cityStateZip: "San Francisco, CA 94111",
      },
      client: {
        name: "Lumina Health & Wellness",
        email: "accounts@luminahealth.io",
        phone: "+1 (555) 777-2299",
        address: "1800 Century Park East",
        cityStateZip: "Los Angeles, CA 90067",
      },
      items: [
        { id: "cr-1", description: "Comprehensive Brand Identity & Visual Assets", quantity: 1, rate: 4200, amount: 4200 },
        { id: "cr-2", description: "Product Packaging Design & Print-Ready Files", quantity: 3, rate: 850, amount: 2550 },
      ],
      notes: "High-resolution vector files delivered via Figma & Dropbox.",
      terms: "Net 14 days. 50% deposit received, remaining balance reflected.",
    },
  },
  {
    id: "sunset-coral",
    name: "Sunset Coral Studio",
    category: "Consultants & Creators",
    description: "Warm coral tones with modern badges, ideal for content creators and freelance marketers.",
    icon: Sparkles,
    theme: "sunset",
    accentBadge: "bg-orange-50 text-orange-800 border-orange-300",
    sampleData: {
      type: "invoice",
      template: "sunset",
      invoiceNumber: "INV-2026-SN204",
      sender: {
        name: "Kinetic Media & Production",
        email: "payments@kineticmedia.co",
        phone: "+1 (555) 910-3344",
        address: "420 Sunset Blvd, Studio 12",
        cityStateZip: "Los Angeles, CA 90028",
      },
      client: {
        name: "NextWave Beverage Co.",
        email: "marketing@nextwavebev.com",
        phone: "+1 (555) 880-1122",
        address: "100 Broadway",
        cityStateZip: "New York, NY 10006",
      },
      items: [
        { id: "sn-1", description: "Commercial Brand Video Production & Color Grading", quantity: 1, rate: 3800, amount: 3800 },
        { id: "sn-2", description: "Short-Form Social Media Cutdowns (15s/30s)", quantity: 5, rate: 400, amount: 2000 },
      ],
      notes: "Includes master 4K video ProRes deliverables.",
      terms: "Full payment due within 15 calendar days.",
    },
  },
  {
    id: "freelance-hourly",
    name: "Freelance Developer Cyan",
    category: "Developers & Tech",
    description: "Hourly and sprint-based billing layout with rate/hour columns and GitHub project references.",
    icon: Laptop,
    theme: "freelance",
    accentBadge: "bg-cyan-50 text-cyan-800 border-cyan-300",
    sampleData: {
      type: "invoice",
      template: "freelance",
      invoiceNumber: "INV-2026-DEV80",
      referenceNumber: "SPRINT-14",
      sender: {
        name: "DevSprint Software Engineering",
        email: "alex@devsprint.io",
        phone: "+1 (555) 302-8812",
        address: "520 Mission St, Suite 200",
        cityStateZip: "San Francisco, CA 94105",
      },
      client: {
        name: "Northstar Cloud Systems Inc.",
        email: "ap@northstarcloud.com",
        phone: "+1 (555) 901-4433",
        address: "700 Broadway, 4th Floor",
        cityStateZip: "New York, NY 10003",
      },
      items: [
        { id: "f-1", description: "Next.js Full-Stack Application Feature Development (Hours)", quantity: 45, rate: 120, amount: 5400 },
        { id: "f-2", description: "PostgreSQL Database Migration & Index Optimization", quantity: 10, rate: 140, amount: 1400 },
      ],
      notes: "All commits merged into production repository `main` branch.",
      terms: "Payment due within 14 days of invoice issue date.",
    },
  },
  {
    id: "pos-thermal-receipt",
    name: "POS Thermal Receipt",
    category: "Retail, Food & Store Bills",
    description: "Compact sales receipt and purchase slip layout with itemized tax and payment method tags.",
    icon: Coffee,
    theme: "thermal",
    accentBadge: "bg-gray-100 text-gray-800 border-gray-300",
    sampleData: {
      type: "receipt",
      template: "thermal",
      invoiceNumber: "REC-2026-0842",
      sender: {
        name: "Summit Specialty Coffee & Bakery",
        email: "hello@summitcoffee.co",
        phone: "+1 (415) 555-0199",
        address: "1450 Market Street",
        cityStateZip: "San Francisco, CA 94102",
        taxId: "Merchant ID: #48201-CA",
      },
      client: {
        name: "Walk-in Guest",
        email: "guest@gmail.com",
        phone: "",
        address: "",
        cityStateZip: "",
      },
      items: [
        { id: "tr-1", description: "Pour Over Ethiopian Coffee (12oz)", quantity: 2, rate: 6.25, amount: 12.50 },
        { id: "tr-2", description: "Artisan Almond Butter Croissant", quantity: 2, rate: 4.50, amount: 9.00 },
        { id: "tr-3", description: "Whole Bean Dark Roast Blend (Bag)", quantity: 1, rate: 18.50, amount: 18.50 },
      ],
      status: "paid",
      paymentMethod: "Apple Pay (Visa *4921)",
      notes: "Paid in full. Thank you for supporting local craft coffee!",
      terms: "Return policy: 14 days with original receipt.",
    },
  },
];

interface InvoiceTemplateSelectorProps {
  onSelectTemplate: (preset: InvoiceTemplatePreset) => void;
}

export function InvoiceTemplateSelector({ onSelectTemplate }: InvoiceTemplateSelectorProps) {
  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
        <div>
          <h3 className="text-lg sm:text-xl font-bold text-ink">
            Choose an Industry-Specific Invoice Template
          </h3>
          <p className="text-xs sm:text-sm text-ink-secondary">
            Select any pre-configured template to load high-resolution layouts, matching color palettes, and realistic line items.
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {INVOICE_TEMPLATES.map((tpl) => {
          const Icon = tpl.icon;
          return (
            <div
              key={tpl.id}
              onClick={() => onSelectTemplate(tpl)}
              className="p-5 rounded-2xl bg-canvas border border-hairline hover:border-primary/80 hover:shadow-md cursor-pointer transition-all flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <div className="w-10 h-10 rounded-xl bg-surface border border-hairline flex items-center justify-center text-primary group-hover:scale-105 transition-transform shadow-2xs">
                    <Icon className="w-5 h-5" />
                  </div>
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono font-bold border uppercase ${tpl.accentBadge}`}
                  >
                    {tpl.category}
                  </span>
                </div>

                <h4 className="text-sm font-bold text-ink group-hover:text-primary transition-colors mb-1.5">
                  {tpl.name}
                </h4>

                <p className="text-xs text-ink-secondary leading-relaxed mb-4">
                  {tpl.description}
                </p>
              </div>

              <div className="pt-3 border-t border-hairline flex items-center justify-between text-xs font-semibold text-primary group-hover:underline">
                <span>Load Template & Data</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
