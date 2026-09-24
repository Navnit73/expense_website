export type DocumentType = "invoice" | "bill" | "receipt";

export type InvoiceTemplateTheme =
  | "modern"
  | "corporate"
  | "classic"
  | "creative"
  | "sunset"
  | "freelance"
  | "thermal";

export interface InvoiceItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
  taxRate?: number;
  amount: number;
}

export interface BusinessEntity {
  name: string;
  email: string;
  phone: string;
  address: string;
  cityStateZip: string;
  taxId?: string; // e.g. VAT / EIN / GST
  logoUrl?: string;
}

export interface ClientEntity {
  name: string;
  email: string;
  phone: string;
  address: string;
  cityStateZip: string;
  taxId?: string;
}

export interface InvoiceData {
  id: string;
  type: DocumentType;
  template: InvoiceTemplateTheme;
  invoiceNumber: string;
  referenceNumber?: string;
  issueDate: string; // YYYY-MM-DD
  dueDate: string; // YYYY-MM-DD
  status: "draft" | "sent" | "paid" | "pending" | "overdue";
  currency: string;
  currencySymbol: string;
  sender: BusinessEntity;
  client: ClientEntity;
  items: InvoiceItem[];
  subtotal: number;
  discountType: "percentage" | "fixed";
  discountValue: number;
  discountAmount: number;
  taxRate: number;
  taxAmount: number;
  shipping: number;
  total: number;
  amountPaid: number;
  balanceDue: number;
  notes: string;
  terms: string;
  paymentMethod?: string;
  paymentInstructions?: string;
  createdAt: string;
}

export const CURRENCY_OPTIONS = [
  { code: "USD", symbol: "$", name: "USD ($) - US Dollar" },
  { code: "EUR", symbol: "€", name: "EUR (€) - Euro" },
  { code: "GBP", symbol: "£", name: "GBP (£) - British Pound" },
  { code: "CAD", symbol: "CA$", name: "CAD ($) - Canadian Dollar" },
  { code: "AUD", symbol: "A$", name: "AUD ($) - Australian Dollar" },
  { code: "INR", symbol: "₹", name: "INR (₹) - Indian Rupee" },
  { code: "JPY", symbol: "¥", name: "JPY (¥) - Japanese Yen" },
  { code: "SGD", symbol: "S$", name: "SGD ($) - Singapore Dollar" },
  { code: "CHF", symbol: "CHF", name: "CHF - Swiss Franc" },
];

export const DEFAULT_INVOICE_DATA: InvoiceData = {
  id: "inv-demo-001",
  type: "invoice",
  template: "modern",
  invoiceNumber: "INV-2026-1001",
  referenceNumber: "PO-94021",
  issueDate: "2026-09-24",
  dueDate: "2026-10-24",
  status: "sent",
  currency: "USD",
  currencySymbol: "$",
  sender: {
    name: "Acme Creative Studio LLC",
    email: "billing@acmecreative.com",
    phone: "+1 (555) 234-5678",
    address: "742 Evergreen Terrace, Suite 400",
    cityStateZip: "San Francisco, CA 94107",
    taxId: "EIN: 12-3456789",
  },
  client: {
    name: "Apex Global Solutions Inc.",
    email: "accounts@apexsolutions.com",
    phone: "+1 (555) 987-6543",
    address: "100 Market Street, 12th Floor",
    cityStateZip: "New York, NY 10005",
    taxId: "VAT: US987654321",
  },
  items: [
    {
      id: "item-1",
      description: "Brand Identity Design & Design System",
      quantity: 1,
      rate: 3200,
      amount: 3200,
    },
    {
      id: "item-2",
      description: "Frontend Web Application UI/UX Prototyping (Hours)",
      quantity: 24,
      rate: 125,
      amount: 3000,
    },
    {
      id: "item-3",
      description: "Responsive Next.js Component Library Implementation",
      quantity: 1,
      rate: 1800,
      amount: 1800,
    },
  ],
  subtotal: 8000,
  discountType: "percentage",
  discountValue: 5,
  discountAmount: 400,
  taxRate: 8.5,
  taxAmount: 646,
  shipping: 0,
  total: 8246,
  amountPaid: 0,
  balanceDue: 8246,
  notes: "Thank you for your business! Please remit payment within 30 days of invoice receipt.",
  terms: "Payment via Bank ACH Transfer or Wire. Late payments subject to 1.5% monthly finance charge.",
  paymentInstructions: "Bank: Silicon Valley Bank | Routing: 121000358 | Account: 9827401923",
  createdAt: "2026-09-24T10:00:00.000Z",
};

export const DEFAULT_BILL_DATA: InvoiceData = {
  ...DEFAULT_INVOICE_DATA,
  id: "bill-demo-001",
  type: "bill",
  template: "classic",
  invoiceNumber: "BILL-84920",
  sender: {
    name: "Metro Office & Tech Supplies",
    email: "orders@metroofficesupply.com",
    phone: "+1 (555) 444-1234",
    address: "500 Industrial Parkway",
    cityStateZip: "Austin, TX 78701",
    taxId: "Sales Tax ID: TX-849102",
  },
  client: {
    name: "Horizon Design Agency",
    email: "finance@horizondesign.io",
    phone: "+1 (555) 777-8899",
    address: "240 Congress Ave, Suite 300",
    cityStateZip: "Austin, TX 78701",
  },
  items: [
    {
      id: "b-1",
      description: "Ergonomic Mesh Task Chairs (Steelcase Series)",
      quantity: 4,
      rate: 349.99,
      amount: 1399.96,
    },
    {
      id: "b-2",
      description: "Dell 27-inch 4K USB-C Monitors",
      quantity: 4,
      rate: 429.00,
      amount: 1716.00,
    },
    {
      id: "b-3",
      description: "USB-C Dual 4K Universal Docking Stations",
      quantity: 4,
      rate: 149.50,
      amount: 598.00,
    },
  ],
  subtotal: 3713.96,
  discountType: "fixed",
  discountValue: 150,
  discountAmount: 150,
  taxRate: 8.25,
  taxAmount: 294.03,
  shipping: 45.00,
  total: 3902.99,
  amountPaid: 3902.99,
  balanceDue: 0.00,
  status: "paid",
  paymentMethod: "Corporate Visa *8812",
  notes: "Office equipment order billed and delivered. Warranty valid for 3 years.",
  terms: "All hardware items inspected upon delivery. Return window: 30 days.",
};

export const DEFAULT_RECEIPT_DATA: InvoiceData = {
  ...DEFAULT_INVOICE_DATA,
  id: "rec-demo-001",
  type: "receipt",
  template: "thermal",
  invoiceNumber: "REC-2026-904",
  sender: {
    name: "Summit Specialty Coffee & Bakery",
    email: "hello@summitcoffee.co",
    phone: "+1 (415) 555-0199",
    address: "1450 Market Street",
    cityStateZip: "San Francisco, CA 94102",
    taxId: "CA Merchant ID #48201",
  },
  client: {
    name: "Walk-in Customer",
    email: "customer@gmail.com",
    phone: "",
    address: "",
    cityStateZip: "",
  },
  items: [
    {
      id: "r-1",
      description: "Pour Over Single Origin Ethiopian Coffee",
      quantity: 2,
      rate: 6.50,
      amount: 13.00,
    },
    {
      id: "r-2",
      description: "Artisan Almond Butter Croissant",
      quantity: 2,
      rate: 4.75,
      amount: 9.50,
    },
    {
      id: "r-3",
      description: "Organic Roasted Whole Bean Coffee Bag (12oz)",
      quantity: 1,
      rate: 19.50,
      amount: 19.50,
    },
  ],
  subtotal: 42.00,
  discountType: "fixed",
  discountValue: 0,
  discountAmount: 0,
  taxRate: 8.5,
  taxAmount: 3.57,
  shipping: 0,
  total: 45.57,
  amountPaid: 45.57,
  balanceDue: 0.00,
  status: "paid",
  paymentMethod: "Apple Pay (Visa *4921)",
  notes: "Paid in full. Thank you for visiting Summit Coffee!",
  terms: "Receipt required for all retail merchandise returns within 14 days.",
};
