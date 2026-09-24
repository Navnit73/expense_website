export interface ReceiptItem {
  id: string;
  merchant: string;
  date: string; // YYYY-MM-DD
  subtotal: number;
  tax: number;
  tip?: number;
  total: number;
  currency: string;
  category: ExpenseCategory;
  taxCategory: TaxDeductionCategory;
  isBusiness: boolean;
  taxYear: string;
  paymentMethod: string;
  status: "verified" | "review_needed" | "approved";
  tags: string[];
  notes: string;
  confidence: number; // 0 - 100
  fieldConfidence?: {
    merchant: number;
    date: number;
    total: number;
    tax: number;
    category: number;
  };
  rawText?: string;
  imageUrl?: string;
  fileName?: string;
  createdAt: string;
}

export type ExpenseCategory =
  | "Food & Dining"
  | "Travel & Lodging"
  | "Office & Supplies"
  | "Software & SaaS"
  | "Utilities & Internet"
  | "Shopping & Equipment"
  | "Healthcare & Medical"
  | "Transportation & Gas"
  | "Advertising & Marketing"
  | "Legal & Professional"
  | "Repairs & Maintenance"
  | "Entertainment"
  | "Other";

export type TaxDeductionCategory =
  | "Schedule C: Meals (50%)"
  | "Schedule C: Office Expenses"
  | "Schedule C: Travel"
  | "Schedule C: Software & Subscriptions"
  | "Schedule C: Advertising & Marketing"
  | "Schedule C: Legal & Professional"
  | "Schedule C: Supplies & Materials"
  | "Schedule C: Vehicle & Transportation"
  | "Schedule C: Utilities & Phone"
  | "Medical & Healthcare (HSA/FSA)"
  | "Personal (Non-Deductible)"
  | "Other Deduction";

export interface OCRScanResult {
  merchant: string;
  date: string;
  subtotal: number;
  tax: number;
  tip: number;
  total: number;
  currency: string;
  category: ExpenseCategory;
  taxCategory: TaxDeductionCategory;
  paymentMethod: string;
  confidence: number;
  fieldConfidence: {
    merchant: number;
    date: number;
    total: number;
    tax: number;
    category: number;
  };
  rawText: string;
  detectedItems?: Array<{ description: string; amount: number }>;
}

export interface ReceiptFilterOptions {
  search: string;
  category: string;
  taxYear: string;
  type: "all" | "business" | "personal";
  status: "all" | "verified" | "review_needed" | "approved";
  sortBy: "date-desc" | "date-asc" | "amount-desc" | "amount-asc" | "merchant-asc";
  dateRange: "all" | "this-month" | "last-month" | "this-year" | "custom";
  minAmount?: number;
  maxAmount?: number;
}
