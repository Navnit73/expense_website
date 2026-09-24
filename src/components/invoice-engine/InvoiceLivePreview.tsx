"use client";

import React, { useState } from "react";
import {
  Download,
  Printer,
  FileSpreadsheet,
  Copy,
  Check,
  Sparkles,
  ArrowUpRight,
  ArrowLeft,
  ShieldCheck,
  CheckCircle2,
  Loader2,
  FileText,
  Edit3,
} from "lucide-react";
import { InvoiceData } from "@/lib/invoice-engine/types";
import { exportInvoiceToCSV, downloadInvoicePDF, printInvoicePDF } from "@/lib/invoice-engine/invoice-store";

interface InvoiceLivePreviewProps {
  invoice: InvoiceData;
  onOpenExpenseliyTrack?: () => void;
  onBackToEditor?: () => void;
}

const TEMPLATE_ACCENTS: Record<
  string,
  {
    titleColor: string;
    totalColor: string;
    badgeStyle: string;
    dividerColor: string;
  }
> = {
  modern: {
    titleColor: "text-emerald-700",
    totalColor: "text-emerald-700",
    badgeStyle: "bg-emerald-50 text-emerald-800 border-emerald-200",
    dividerColor: "border-emerald-500",
  },
  corporate: {
    titleColor: "text-blue-800",
    totalColor: "text-blue-800",
    badgeStyle: "bg-blue-50 text-blue-800 border-blue-200",
    dividerColor: "border-blue-600",
  },
  classic: {
    titleColor: "text-zinc-900",
    totalColor: "text-zinc-900",
    badgeStyle: "bg-zinc-100 text-zinc-800 border-zinc-200",
    dividerColor: "border-zinc-800",
  },
  creative: {
    titleColor: "text-purple-700",
    totalColor: "text-purple-700",
    badgeStyle: "bg-purple-50 text-purple-800 border-purple-200",
    dividerColor: "border-purple-600",
  },
  sunset: {
    titleColor: "text-orange-700",
    totalColor: "text-orange-700",
    badgeStyle: "bg-orange-50 text-orange-800 border-orange-200",
    dividerColor: "border-orange-600",
  },
  freelance: {
    titleColor: "text-cyan-700",
    totalColor: "text-cyan-700",
    badgeStyle: "bg-cyan-50 text-cyan-800 border-cyan-200",
    dividerColor: "border-cyan-600",
  },
  thermal: {
    titleColor: "text-gray-900",
    totalColor: "text-gray-900",
    badgeStyle: "bg-gray-100 text-gray-800 border-gray-300",
    dividerColor: "border-gray-800",
  },
};

export function InvoiceLivePreview({
  invoice,
  onOpenExpenseliyTrack,
  onBackToEditor,
}: InvoiceLivePreviewProps) {
  const [copied, setCopied] = useState(false);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isPrinting, setIsPrinting] = useState(false);

  const themeStyle = TEMPLATE_ACCENTS[invoice.template] || TEMPLATE_ACCENTS.modern;
  const isThermal = invoice.template === "thermal" || invoice.type === "receipt";

  const handleDownloadPDF = async () => {
    setIsGeneratingPDF(true);
    try {
      await downloadInvoicePDF(invoice);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  const handlePrint = async () => {
    setIsPrinting(true);
    try {
      await printInvoicePDF(invoice);
    } finally {
      setIsPrinting(false);
    }
  };

  const handleCopySummary = () => {
    const text = `${invoice.type.toUpperCase()}: ${invoice.invoiceNumber}
Date: ${invoice.issueDate} | Due: ${invoice.dueDate}
From: ${invoice.sender.name}
To: ${invoice.client.name}
Total: ${invoice.currencySymbol}${invoice.total.toFixed(2)} (${invoice.status.toUpperCase()})
Generated with Expenseliy Free Invoice Engine`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="flex flex-col gap-5">
      {/* Top Action Floating Bar */}
      <div className="flex flex-wrap items-center justify-between gap-3 p-3.5 sm:p-4 rounded-2xl bg-canvas border border-hairline shadow-xs">
        <div className="flex items-center gap-2">
          {onBackToEditor && (
            <button
              type="button"
              onClick={onBackToEditor}
              aria-label="Return to invoice form editor"
              className="mr-2 px-3 py-1.5 rounded-xl border border-slate-300 dark:border-hairline bg-white dark:bg-surface hover:bg-slate-100 dark:hover:bg-surface-raised text-slate-900 dark:text-white text-xs font-bold flex items-center gap-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none shadow-xs"
            >
              <ArrowLeft className="w-3.5 h-3.5 text-emerald-600" aria-hidden="true" />
              <span>Edit Form</span>
            </button>
          )}
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-xs font-bold text-ink">Live Document Preview</span>
          <span className="px-2 py-0.5 rounded-full text-[10px] font-mono font-bold bg-surface text-ink-muted border border-hairline uppercase">
            {invoice.template}
          </span>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={handleCopySummary}
            aria-label="Copy plain text summary of this invoice to clipboard"
            className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-hairline bg-white dark:bg-surface hover:bg-slate-100 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
            title="Copy Text Summary"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" aria-hidden="true" /> : <Copy className="w-3.5 h-3.5" aria-hidden="true" />}
            <span className="hidden sm:inline">{copied ? "Copied" : "Copy"}</span>
          </button>

          <button
            type="button"
            onClick={() => exportInvoiceToCSV(invoice)}
            aria-label="Export invoice line items as CSV spreadsheet"
            className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-hairline bg-white dark:bg-surface hover:bg-slate-100 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
            title="Download CSV Spreadsheet"
          >
            <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-700 dark:text-emerald-400" aria-hidden="true" />
            <span className="hidden sm:inline">CSV</span>
          </button>

          <button
            type="button"
            onClick={handlePrint}
            disabled={isPrinting}
            aria-label="Print this invoice via server-side generated document"
            className="px-3 py-1.5 rounded-xl border border-slate-300 dark:border-hairline bg-white dark:bg-surface hover:bg-slate-100 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 transition-colors disabled:opacity-50 focus-visible:ring-2 focus-visible:ring-emerald-600 focus-visible:outline-none"
            title="Print"
          >
            {isPrinting ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin text-emerald-600" aria-hidden="true" />
            ) : (
              <Printer className="w-3.5 h-3.5" aria-hidden="true" />
            )}
            <span className="hidden sm:inline">{isPrinting ? "Preparing..." : "Print"}</span>
          </button>

          <button
            type="button"
            onClick={handleDownloadPDF}
            disabled={isGeneratingPDF}
            aria-label="Generate and download high-resolution PDF invoice"
            className="px-4 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-extrabold flex items-center gap-1.5 shadow-sm transition-all disabled:opacity-50 cursor-pointer focus-visible:ring-2 focus-visible:ring-emerald-400 focus-visible:outline-none"
          >
            {isGeneratingPDF ? (
              <>
                <Loader2 className="w-3.5 h-3.5 animate-spin" aria-hidden="true" />
                <span>Generating...</span>
              </>
            ) : (
              <>
                <Download className="w-3.5 h-3.5" aria-hidden="true" />
                <span>Download PDF</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Printable Invoice Sheet */}
      <div
        id="printable-invoice-document"
        className={`w-full bg-white text-slate-900 rounded-2xl border border-slate-200 shadow-xl overflow-hidden transition-all print:border-none print:shadow-none print:rounded-none print:m-0 ${
          isThermal ? "max-w-md mx-auto p-6 sm:p-8 font-mono text-xs" : "p-6 sm:p-10 text-sm"
        }`}
      >
        {isThermal ? (
          /* THERMAL RECEIPT STYLE */
          <div className="space-y-4 text-center font-mono">
            <div className="border-b border-dashed border-gray-400 pb-3">
              <h2 className="text-sm font-black uppercase tracking-wider">
                {invoice.sender.name || "STORE / VENDOR"}
              </h2>
              <p className="text-[11px] text-gray-600 mt-0.5">{invoice.sender.address}</p>
              <p className="text-[11px] text-gray-600">{invoice.sender.cityStateZip}</p>
              {invoice.sender.phone && <p className="text-[11px] text-gray-600">{invoice.sender.phone}</p>}
              {invoice.sender.taxId && <p className="text-[10px] text-gray-500 mt-0.5">{invoice.sender.taxId}</p>}
            </div>

            <div className="flex items-center justify-between text-[11px] border-b border-dashed border-gray-400 pb-2 text-left">
              <div>
                <div>
                  <strong>{invoice.type.toUpperCase()}:</strong> #{invoice.invoiceNumber}
                </div>
                <div>
                  <strong>DATE:</strong> {invoice.issueDate}
                </div>
              </div>
              <div className="text-right">
                <span className="px-1.5 py-0.5 rounded bg-gray-100 text-gray-800 text-[10px] font-bold uppercase">
                  {invoice.status}
                </span>
                {invoice.paymentMethod && (
                  <div className="text-[10px] text-gray-600 mt-0.5">{invoice.paymentMethod}</div>
                )}
              </div>
            </div>

            {/* Line Items */}
            <table className="w-full text-left text-xs my-2">
              <thead>
                <tr className="border-b border-gray-300 text-[10px] uppercase font-bold">
                  <th className="pb-1">Item</th>
                  <th className="pb-1 text-center">Qty</th>
                  <th className="pb-1 text-right">Price</th>
                  <th className="pb-1 text-right">Total</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-dashed divide-gray-200">
                {invoice.items.map((item) => (
                  <tr key={item.id} className="py-1">
                    <td className="py-1 font-semibold pr-2">{item.description}</td>
                    <td className="py-1 text-center text-gray-600">{item.quantity}</td>
                    <td className="py-1 text-right text-gray-600">
                      {invoice.currencySymbol}
                      {item.rate.toFixed(2)}
                    </td>
                    <td className="py-1 text-right font-bold">
                      {invoice.currencySymbol}
                      {item.amount.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            {/* Totals */}
            <div className="border-t border-dashed border-gray-400 pt-3 space-y-1 text-right text-xs">
              <div className="flex justify-between">
                <span>Subtotal:</span>
                <span>
                  {invoice.currencySymbol}
                  {invoice.subtotal.toFixed(2)}
                </span>
              </div>
              {invoice.discountAmount > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Discount:</span>
                  <span>
                    -{invoice.currencySymbol}
                    {invoice.discountAmount.toFixed(2)}
                  </span>
                </div>
              )}
              {invoice.taxAmount > 0 && (
                <div className="flex justify-between text-gray-600">
                  <span>Tax ({invoice.taxRate}%):</span>
                  <span>
                    {invoice.currencySymbol}
                    {invoice.taxAmount.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="flex justify-between text-sm font-black border-t border-gray-900 pt-1.5 mt-1">
                <span>TOTAL:</span>
                <span>
                  {invoice.currencySymbol}
                  {invoice.total.toFixed(2)}
                </span>
              </div>
            </div>

            <div className="border-t border-dashed border-gray-400 pt-3 text-[10px] text-gray-500 uppercase tracking-wider">
              *** THANK YOU FOR YOUR BUSINESS ***
            </div>
          </div>
        ) : (
          /* STRIPE / LINEAR GRADE CLEAN MODERN INVOICE STYLE */
          <div className="space-y-8">
            {/* Header: Company Info (Left) & Document Meta (Right) */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-6 pb-6 border-b border-slate-200">
              <div className="space-y-1 max-w-sm">
                {invoice.sender.logoUrl ? (
                  <img
                    src={invoice.sender.logoUrl}
                    alt="Business Logo"
                    className="max-h-12 max-w-44 object-contain mb-4.5 rounded"
                  />
                ) : null}
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  {invoice.sender.name || "Your Company Name"}
                </h2>
                <div className="text-xs text-slate-500 space-y-0.5">
                  <p>{invoice.sender.address}</p>
                  <p>{invoice.sender.cityStateZip}</p>
                  <p>
                    {[invoice.sender.email, invoice.sender.phone].filter(Boolean).join("  •  ")}
                  </p>
                  {invoice.sender.taxId && (
                    <p className="font-mono text-slate-600 pt-0.5">{invoice.sender.taxId}</p>
                  )}
                </div>
              </div>

              <div className="text-left sm:text-right space-y-1">
                <h2 className={`text-2xl sm:text-3xl font-black uppercase tracking-tight ${themeStyle.titleColor}`}>
                  {invoice.type.toUpperCase()}
                </h2>
                <p className="text-sm font-mono font-bold text-slate-900">
                  #{invoice.invoiceNumber}
                </p>

                <div className="pt-2 text-xs space-y-1 text-slate-500">
                  {invoice.referenceNumber && (
                    <div className="flex sm:justify-end gap-3">
                      <span>PO / Ref:</span>
                      <span className="font-mono font-semibold text-slate-900">{invoice.referenceNumber}</span>
                    </div>
                  )}
                  <div className="flex sm:justify-end gap-3">
                    <span>Issue Date:</span>
                    <span className="font-mono font-semibold text-slate-900">{invoice.issueDate}</span>
                  </div>
                  {invoice.type !== "receipt" && (
                    <div className="flex sm:justify-end gap-3">
                      <span>Due Date:</span>
                      <span className="font-mono font-semibold text-slate-900">{invoice.dueDate}</span>
                    </div>
                  )}
                  <div className="pt-1">
                    <span
                      className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider ${
                        invoice.status === "paid"
                          ? "bg-emerald-50 text-emerald-800 border border-emerald-200"
                          : invoice.status === "pending"
                          ? "bg-amber-50 text-amber-800 border border-amber-200"
                          : "bg-slate-100 text-slate-700 border border-slate-200"
                      }`}
                    >
                      {invoice.status}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Recipient Section (Billed To) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
              <div className="space-y-1">
                <span className="font-bold text-[10px] text-slate-400 uppercase tracking-wider font-mono">
                  {invoice.type === "receipt" ? "CUSTOMER" : "BILLED TO"}
                </span>
                <h3 className="text-sm font-bold text-slate-900">{invoice.client.name || "Client Name"}</h3>
                <p className="text-slate-500">{invoice.client.address}</p>
                <p className="text-slate-500">{invoice.client.cityStateZip}</p>
                <p className="text-slate-500">
                  {[invoice.client.email, invoice.client.phone].filter(Boolean).join("  •  ")}
                </p>
                {invoice.client.taxId && (
                  <p className="font-mono text-slate-400 pt-0.5">{invoice.client.taxId}</p>
                )}
              </div>
            </div>

            {/* Line Items Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-t border-slate-200 bg-slate-50 text-slate-500 font-bold uppercase tracking-wider text-[10px]">
                    <th className="py-2.5 px-3">Item & Description</th>
                    <th className="py-2.5 px-3 text-center w-20">Qty</th>
                    <th className="py-2.5 px-3 text-right w-28">Rate</th>
                    <th className="py-2.5 px-3 text-right w-28">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {invoice.items.map((item) => (
                    <tr key={item.id} className="hover:bg-slate-50/50">
                      <td className="py-3 px-3 font-medium text-slate-900">{item.description}</td>
                      <td className="py-3 px-3 text-center text-slate-600 font-mono">{item.quantity}</td>
                      <td className="py-3 px-3 text-right text-slate-600 font-mono">
                        {invoice.currencySymbol}
                        {item.rate.toFixed(2)}
                      </td>
                      <td className="py-3 px-3 text-right font-bold font-mono text-slate-900">
                        {invoice.currencySymbol}
                        {item.amount.toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Totals & Notes Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-8 pt-4">
              {/* Payment Details & Notes (Left 7 cols) */}
              <div className="sm:col-span-7 space-y-4 text-xs">
                {invoice.paymentInstructions && (
                  <div>
                    <h4 className="font-bold uppercase tracking-wider font-mono text-[10px] text-slate-400 mb-1">
                      Payment Instructions
                    </h4>
                    <p className="text-slate-600 bg-slate-50 p-3 rounded-xl border border-slate-100 font-mono text-[11px] leading-relaxed">
                      {invoice.paymentInstructions}
                    </p>
                  </div>
                )}

                {invoice.notes && (
                  <div>
                    <h4 className="font-bold uppercase tracking-wider font-mono text-[10px] text-slate-400 mb-1">
                      Notes
                    </h4>
                    <p className="text-slate-600 italic text-[11px]">{invoice.notes}</p>
                  </div>
                )}

                {invoice.terms && (
                  <div>
                    <h4 className="font-bold uppercase tracking-wider font-mono text-[10px] text-slate-400 mb-1">
                      Terms & Conditions
                    </h4>
                    <p className="text-slate-500 text-[11px]">{invoice.terms}</p>
                  </div>
                )}
              </div>

              {/* Numerical Totals (Right 5 cols) */}
              <div className="sm:col-span-5 space-y-2 text-xs text-right sm:pl-4">
                <div className="flex justify-between py-1 text-slate-500">
                  <span>Subtotal:</span>
                  <span className="font-mono font-semibold text-slate-900">
                    {invoice.currencySymbol}
                    {invoice.subtotal.toFixed(2)}
                  </span>
                </div>

                {invoice.discountAmount > 0 && (
                  <div className="flex justify-between py-1 text-slate-500">
                    <span>
                      Discount {invoice.discountType === "percentage" ? `(${invoice.discountValue}%)` : ""}:
                    </span>
                    <span className="font-mono text-emerald-600">
                      -{invoice.currencySymbol}
                      {invoice.discountAmount.toFixed(2)}
                    </span>
                  </div>
                )}

                {invoice.taxAmount > 0 && (
                  <div className="flex justify-between py-1 text-slate-500">
                    <span>Tax ({invoice.taxRate}%):</span>
                    <span className="font-mono">
                      +{invoice.currencySymbol}
                      {invoice.taxAmount.toFixed(2)}
                    </span>
                  </div>
                )}

                {invoice.shipping > 0 && (
                  <div className="flex justify-between py-1 text-slate-500">
                    <span>Shipping:</span>
                    <span className="font-mono">
                      +{invoice.currencySymbol}
                      {invoice.shipping.toFixed(2)}
                    </span>
                  </div>
                )}

                <div className="border-t border-slate-200 pt-3 flex justify-between items-baseline">
                  <span className="text-xs font-bold text-slate-900">Total Amount:</span>
                  <span className={`font-mono text-lg font-black ${themeStyle.totalColor}`}>
                    {invoice.currencySymbol}
                    {invoice.total.toFixed(2)}
                  </span>
                </div>

                {invoice.amountPaid > 0 && (
                  <>
                    <div className="flex justify-between py-1 text-slate-500">
                      <span>Amount Paid:</span>
                      <span className="font-mono">
                        {invoice.currencySymbol}
                        {invoice.amountPaid.toFixed(2)}
                      </span>
                    </div>

                    <div className="flex justify-between py-1.5 font-bold text-rose-600 border-t border-slate-200">
                      <span>Balance Due:</span>
                      <span className="font-mono">
                        {invoice.currencySymbol}
                        {invoice.balanceDue.toFixed(2)}
                      </span>
                    </div>
                  </>
                )}
              </div>
            </div>

            {/* Bottom Footer Note */}
            <div className="border-t border-slate-200 pt-4 text-center text-[10px] text-slate-400">
              Thank you for your business  •  Expenseliy Invoice Studio  •  www.expenseliy.com
            </div>
          </div>
        )}
      </div>

      {/* Conversion Banner: Track this Invoice in Expenseliy */}
      <div className="p-4 sm:p-5 rounded-2xl bg-homepage-mintcream dark:bg-surface-raised border border-income-border/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-income text-white flex items-center justify-center shrink-0 shadow-xs">
            <Sparkles className="w-4 h-4" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-ink">
              Track Outbound Invoices & Cash Flow in Expenseliy
            </h4>
            <p className="text-[11px] sm:text-xs text-ink-secondary mt-0.5">
              Automate client accounts receivable, categorize income write-offs, and monitor net monthly margins.
            </p>
          </div>
        </div>

        <a
          href="https://app.expenseliy.com/auth/signin"
          target="_blank"
          rel="noopener noreferrer"
          className="px-3.5 py-2 rounded-xl bg-income hover:bg-income/90 text-white text-xs font-bold flex items-center justify-center gap-1.5 shrink-0 transition-all shadow-xs"
        >
          <span>Track in Expenseliy</span>
          <ArrowUpRight className="w-3.5 h-3.5" />
        </a>
      </div>
    </div>
  );
}
