import { ReceiptItem, OCRScanResult } from "./types";

export interface SampleReceipt {
  id: string;
  name: string;
  badge: string;
  description: string;
  thumbnailUrl: string;
  data: OCRScanResult;
  isBusiness: boolean;
  taxYear: string;
  tags: string[];
}

export const SAMPLE_RECEIPTS: SampleReceipt[] = [
  {
    id: "sample-starbucks",
    name: "Starbucks Coffee",
    badge: "Food & Dining",
    description: "Morning team meeting breakfast & coffee receipt",
    thumbnailUrl: "https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop&q=80",
    data: {
      merchant: "Starbucks Coffee",
      date: "2026-09-24",
      subtotal: 8.50,
      tax: 0.85,
      tip: 1.00,
      total: 10.35,
      currency: "USD",
      category: "Food & Dining",
      taxCategory: "Schedule C: Meals (50%)",
      paymentMethod: "Apple Pay (Visa *4921)",
      confidence: 98,
      fieldConfidence: {
        merchant: 99,
        date: 98,
        total: 99,
        tax: 96,
        category: 97,
      },
      rawText: `STARBUCKS STORE #10492
1450 MARKET STREET, SAN FRANCISCO, CA
TEL: (415) 555-0199

DATE: 09/24/2026 08:42 AM
ORDER: #482910 REG: 03 CASHIER: ALEX

1x GRANDE CARAMEL MACCHIATO    $4.95
1x ALMOND CROISSANT            $3.55

SUBTOTAL                       $8.50
SALES TAX (10%)                $0.85
TIP                            $1.00
TOTAL AMOUNT                   $10.35

PAID VIA APPLE PAY (VISA ENDING IN 4921)
AUTH CODE: 938210
THANK YOU FOR VISITING STARBUCKS!`,
      detectedItems: [
        { description: "Grande Caramel Macchiato", amount: 4.95 },
        { description: "Almond Croissant", amount: 3.55 },
      ],
    },
    isBusiness: true,
    taxYear: "2026",
    tags: ["#team-breakfast", "#client-meeting"],
  },
  {
    id: "sample-officedepot",
    name: "Office Depot",
    badge: "Office Supplies",
    description: "Office printer toner & stationery receipt",
    thumbnailUrl: "https://images.unsplash.com/photo-1583847268964-b28dc8f51f92?w=600&auto=format&fit=crop&q=80",
    data: {
      merchant: "Office Depot",
      date: "2026-09-18",
      subtotal: 78.40,
      tax: 6.47,
      tip: 0,
      total: 84.87,
      currency: "USD",
      category: "Office & Supplies",
      taxCategory: "Schedule C: Office Expenses",
      paymentMethod: "Mastercard *8812",
      confidence: 96,
      fieldConfidence: {
        merchant: 98,
        date: 97,
        total: 98,
        tax: 95,
        category: 94,
      },
      rawText: `OFFICE DEPOT #0421
2900 EL CAMINO REAL, SANTA CLARA, CA
(408) 555-0144

TRANS: 840192  DATE: 09/18/2026  14:15

HP LASERJET BLACK TONER 58A    $59.99
LEGAL PADS 6-PACK             $12.49
BALLPOINT PEN 12-PK BLUE       $5.92

SUBTOTAL                      $78.40
SALES TAX 8.25%                $6.47
TOTAL                         $84.87

MC CARD ENDING 8812
APPROVED - CHIP READ`,
      detectedItems: [
        { description: "HP Laserjet Black Toner 58A", amount: 59.99 },
        { description: "Legal Pads 6-Pack", amount: 12.49 },
        { description: "Ballpoint Pen 12-PK Blue", amount: 5.92 },
      ],
    },
    isBusiness: true,
    taxYear: "2026",
    tags: ["#office-setup", "#equipment", "#tax-deductible"],
  },
  {
    id: "sample-delta",
    name: "Delta Air Lines",
    badge: "Travel",
    description: "Client on-site flight e-ticket & receipt",
    thumbnailUrl: "https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=600&auto=format&fit=crop&q=80",
    data: {
      merchant: "Delta Air Lines",
      date: "2026-09-10",
      subtotal: 348.00,
      tax: 36.50,
      tip: 0,
      total: 384.50,
      currency: "USD",
      category: "Travel & Lodging",
      taxCategory: "Schedule C: Travel",
      paymentMethod: "Amex *1004",
      confidence: 99,
      fieldConfidence: {
        merchant: 99,
        date: 99,
        total: 99,
        tax: 98,
        category: 99,
      },
      rawText: `DELTA AIR LINES E-TICKET RECEIPT
TICKET NUMBER: 0062391048201
PASSENGER: SMITH / JOHN MR

FLIGHT: DL 1420  SFO -> JFK
DEPARTURE: 2026-09-10  07:30 AM
CLASS: MAIN CABIN (K)

AIRFARE FARE:                 $348.00
US TRANSPORTATION TAX:         $26.10
PASSENGER FACILITY CHARGE:      $4.50
SEPTEMBER 11 SECURITY FEE:      $5.60
TOTAL PRICE CHARGED:          $384.50

METHOD OF PAYMENT: AMERICAN EXPRESS *1004`,
      detectedItems: [
        { description: "Airfare Flight DL 1420 SFO-JFK", amount: 348.00 },
        { description: "Passenger Taxes & Security Fees", amount: 36.50 },
      ],
    },
    isBusiness: true,
    taxYear: "2026",
    tags: ["#client-travel", "#nyc-conference", "#reimbursable"],
  },
  {
    id: "sample-aws",
    name: "Amazon Web Services",
    badge: "Software & SaaS",
    description: "Monthly cloud compute & database invoice",
    thumbnailUrl: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=600&auto=format&fit=crop&q=80",
    data: {
      merchant: "Amazon Web Services",
      date: "2026-09-01",
      subtotal: 128.40,
      tax: 0.00,
      tip: 0,
      total: 128.40,
      currency: "USD",
      category: "Software & SaaS",
      taxCategory: "Schedule C: Software & Subscriptions",
      paymentMethod: "Visa *4921",
      confidence: 99,
      fieldConfidence: {
        merchant: 99,
        date: 98,
        total: 99,
        tax: 95,
        category: 99,
      },
      rawText: `AMAZON WEB SERVICES, INC.
INVOICE NUMBER: 902847192
INVOICE DATE: SEPTEMBER 01, 2026

SERVICES BREAKDOWN:
- AMAZON ELASTIC COMPUTE CLOUD (EC2):  $74.20
- AMAZON RELATIONAL DATABASE (RDS):    $42.00
- AMAZON SIMPLE STORAGE SERVICE (S3):  $12.20

SUBTOTAL:                             $128.40
ESTIMATED TAX:                          $0.00
TOTAL AMOUNT DUE:                     $128.40

AUTOMATIC PAYMENT CHARGED TO VISA *4921`,
      detectedItems: [
        { description: "AWS EC2 Compute", amount: 74.20 },
        { description: "AWS RDS PostgreSQL", amount: 42.00 },
        { description: "AWS S3 Storage", amount: 12.20 },
      ],
    },
    isBusiness: true,
    taxYear: "2026",
    tags: ["#hosting", "#cloud-infra", "#monthly-recurring"],
  },
  {
    id: "sample-uber",
    name: "Uber",
    badge: "Transportation",
    description: "Airport ground transport to client office",
    thumbnailUrl: "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?w=600&auto=format&fit=crop&q=80",
    data: {
      merchant: "Uber Technologies",
      date: "2026-09-10",
      subtotal: 28.50,
      tax: 1.90,
      tip: 5.00,
      total: 35.40,
      currency: "USD",
      category: "Transportation & Gas",
      taxCategory: "Schedule C: Vehicle & Transportation",
      paymentMethod: "Apple Pay (Visa *4921)",
      confidence: 97,
      fieldConfidence: {
        merchant: 98,
        date: 98,
        total: 99,
        tax: 94,
        category: 97,
      },
      rawText: `UBER TRIP RECEIPT
DATE: SEPT 10, 2026  16:45
PICKUP: JFK AIRPORT TERMINAL 4
DROPOFF: MIDTOWN MANHATTAN

TRIP FARE (UBERX):             $28.50
NYC CONGESTION & TAX:           $1.90
DRIVER TIP:                     $5.00
TOTAL CHARGE:                  $35.40

PAID WITH APPLE PAY VISA *4921`,
      detectedItems: [
        { description: "UberX Airport Transfer", amount: 28.50 },
        { description: "NYC Surcharges & Tax", amount: 1.90 },
      ],
    },
    isBusiness: true,
    taxYear: "2026",
    tags: ["#travel", "#rideshare", "#reimbursable"],
  },
  {
    id: "sample-shell",
    name: "Shell Gas Station",
    badge: "Gas & Vehicle",
    description: "Company vehicle fuel fill-up",
    thumbnailUrl: "https://images.unsplash.com/photo-1527018607636-080259e7aa50?w=600&auto=format&fit=crop&q=80",
    data: {
      merchant: "Shell Oil",
      date: "2026-09-15",
      subtotal: 44.50,
      tax: 3.70,
      tip: 0,
      total: 48.20,
      currency: "USD",
      category: "Transportation & Gas",
      taxCategory: "Schedule C: Vehicle & Transportation",
      paymentMethod: "Debit Card *3391",
      confidence: 95,
      fieldConfidence: {
        merchant: 97,
        date: 96,
        total: 98,
        tax: 92,
        category: 96,
      },
      rawText: `SHELL STATION #94012
4801 MISSION ST, SAN FRANCISCO CA

DATE: 09/15/2026  07:22 AM
PUMP #04  REGULAR UNLEADED
GALLONS: 10.482 @ $4.245/GAL

FUEL TOTAL:                   $44.50
LOCAL EXCISE TAX:              $3.70
TOTAL SALE:                   $48.20

DEBIT CARD PAYMENT APPROVED`,
      detectedItems: [
        { description: "Regular Unleaded Gas (10.48 gal)", amount: 44.50 },
      ],
    },
    isBusiness: true,
    taxYear: "2026",
    tags: ["#vehicle", "#fuel", "#mileage"],
  },
  {
    id: "sample-wholefoods",
    name: "Whole Foods Market",
    badge: "Groceries",
    description: "Weekly household groceries & pantry supplies",
    thumbnailUrl: "https://images.unsplash.com/photo-1542838132-92c53300491e?w=600&auto=format&fit=crop&q=80",
    data: {
      merchant: "Whole Foods Market",
      date: "2026-09-22",
      subtotal: 62.40,
      tax: 2.15,
      tip: 0,
      total: 64.55,
      currency: "USD",
      category: "Shopping & Equipment",
      taxCategory: "Personal (Non-Deductible)",
      paymentMethod: "Visa *4921",
      confidence: 96,
      fieldConfidence: {
        merchant: 98,
        date: 96,
        total: 97,
        tax: 93,
        category: 94,
      },
      rawText: `WHOLE FOODS MARKET
399 4TH STREET, SAN FRANCISCO CA
STORE 10294

DATE: 09/22/2026 18:30

ORGANIC SPINACH               $3.99
ORGANIC FREE RANGE EGGS       $5.49
ALMOND MILK 64OZ              $4.29
WILD SALMON FILLET 1.2LB     $24.50
ORGANIC COFFEE BEANS         $14.99
SOURDOUGH ARTISAN BREAD       $5.14
SALES TAX                     $2.15
BALANCE DUE                  $64.55

VISA PURCHASE 4921`,
      detectedItems: [
        { description: "Organic Groceries & Produce", amount: 62.40 },
      ],
    },
    isBusiness: false,
    taxYear: "2026",
    tags: ["#personal", "#groceries", "#household"],
  },
  {
    id: "sample-urgentcare",
    name: "City Urgent Care",
    badge: "Healthcare",
    description: "Annual health check copay & prescription",
    thumbnailUrl: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?w=600&auto=format&fit=crop&q=80",
    data: {
      merchant: "City Urgent Care Clinic",
      date: "2026-08-28",
      subtotal: 150.00,
      tax: 0.00,
      tip: 0,
      total: 150.00,
      currency: "USD",
      category: "Healthcare & Medical",
      taxCategory: "Medical & Healthcare (HSA/FSA)",
      paymentMethod: "HSA Debit *7710",
      confidence: 98,
      fieldConfidence: {
        merchant: 99,
        date: 98,
        total: 99,
        tax: 95,
        category: 98,
      },
      rawText: `CITY URGENT CARE & MEDICAL
SUITE 400, 100 HEALTH WAY

PATIENT INVOICE & RECEIPT
DATE OF SERVICE: 2026-08-28

OFFICE VISIT COPAY (IN-NETWORK): $50.00
DIAGNOSTIC LAB WORK:            $100.00

TOTAL PATIENT RESPONSIBILITY:   $150.00
PAID IN FULL VIA HSA CARD *7710`,
      detectedItems: [
        { description: "Office Visit Copay", amount: 50.00 },
        { description: "Diagnostic Lab Work", amount: 100.00 },
      ],
    },
    isBusiness: false,
    taxYear: "2026",
    tags: ["#hsa-eligible", "#medical", "#health-receipt"],
  },
];

export const INITIAL_LEDGER_RECEIPTS: ReceiptItem[] = SAMPLE_RECEIPTS.map(
  (s, idx) => ({
    id: `rcpt-${Date.now() - (idx + 1) * 86400000 * 3}`,
    merchant: s.data.merchant,
    date: s.data.date,
    subtotal: s.data.subtotal,
    tax: s.data.tax,
    tip: s.data.tip,
    total: s.data.total,
    currency: s.data.currency,
    category: s.data.category,
    taxCategory: s.data.taxCategory,
    isBusiness: s.isBusiness,
    taxYear: s.taxYear,
    paymentMethod: s.data.paymentMethod,
    status: "verified",
    tags: s.tags,
    notes: s.description,
    confidence: s.data.confidence,
    fieldConfidence: s.data.fieldConfidence,
    rawText: s.data.rawText,
    imageUrl: s.thumbnailUrl,
    createdAt: new Date(Date.now() - (idx + 1) * 86400000 * 3).toISOString(),
  })
);
