"use client";

import React, { useState } from "react";
import {
  DollarSign,
  Calendar,
  AlertTriangle,
  RotateCcw,
  Copy,
  Check,
  Sparkles,
  ShieldCheck,
  Mail,
  Clock,
} from "lucide-react";

export interface LateFeeProps {
  initialAmount?: number;
  currencySymbol?: string;
  className?: string;
}

export function InvoiceLateFeeCalculator({
  initialAmount = 4500,
  currencySymbol = "$",
  className = "",
}: LateFeeProps) {
  const [invoiceAmount, setInvoiceAmount] = useState<number>(initialAmount);
  const [daysOverdue, setDaysOverdue] = useState<number>(35);
  const [feeType, setFeeType] = useState<"percentage_monthly" | "percentage_annual" | "flat">("percentage_monthly");
  const [interestRate, setInterestRate] = useState<number>(1.5); // 1.5% per month (standard 18% APR)
  const [flatFee, setFlatFee] = useState<number>(50);
  const [gracePeriodDays, setGracePeriodDays] = useState<number>(7);
  const [currency, setCurrency] = useState<string>(currencySymbol);
  const [copiedEmail, setCopiedEmail] = useState<boolean>(false);
  const [copiedSummary, setCopiedSummary] = useState<boolean>(false);

  // Calculations
  const chargeableDays = Math.max(0, daysOverdue - gracePeriodDays);

  let lateFeeAmount = 0;
  if (chargeableDays > 0) {
    if (feeType === "percentage_monthly") {
      // Monthly interest = Amount * (MonthlyRate / 100) * (Days / 30)
      lateFeeAmount = invoiceAmount * (interestRate / 100) * (chargeableDays / 30);
    } else if (feeType === "percentage_annual") {
      // APR interest = Amount * (APR / 100) * (Days / 365)
      lateFeeAmount = invoiceAmount * (interestRate / 100) * (chargeableDays / 365);
    } else {
      // Flat fee + optional recurring daily flat
      lateFeeAmount = flatFee;
    }
  }

  const totalAmountDue = invoiceAmount + lateFeeAmount;
  const dailyInterest = chargeableDays > 0 ? lateFeeAmount / chargeableDays : 0;

  const emailDraft = `Subject: Overdue Notice: Updated Balance Due on Invoice (Payment Required)

Hi [Client Name],

I am writing to follow up on Invoice #[Invoice Number] in the original amount of ${currency}${invoiceAmount.toLocaleString()}, which was due on [Due Date] and is currently ${daysOverdue} days past due.

Per our contract terms, a late payment interest fee of ${feeType === "flat" ? `${currency}${flatFee}` : `${interestRate}%`} has been assessed for the ${chargeableDays} days overdue beyond our ${gracePeriodDays}-day grace period.

Updated Balance Summary:
- Original Invoice Balance: ${currency}${invoiceAmount.toLocaleString()}
- Accrued Late Penalty: ${currency}${lateFeeAmount.toFixed(2)}
- Total Balance Due Immediately: ${currency}${totalAmountDue.toFixed(2)}

Please remit payment today via [Payment Method / Stripe Link / Bank Details] to bring this account up to date.

Thank you,
[Your Name / Business Name]`;

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(emailDraft);
    setCopiedEmail(true);
    setTimeout(() => setCopiedEmail(false), 2200);
  };

  const handleCopySummary = () => {
    const text = `=== Overdue Invoice Late Fee Breakdown ===
Original Invoice Amount: ${currency}${invoiceAmount.toLocaleString()}
Days Past Due: ${daysOverdue} days (Grace Period: ${gracePeriodDays} days)
Chargeable Overdue Days: ${chargeableDays} days
Late Fee Structure: ${feeType === "flat" ? `Flat ${currency}${flatFee}` : `${interestRate}% rate`}
Accrued Late Fee: ${currency}${lateFeeAmount.toFixed(2)}
Total Amount Now Due: ${currency}${totalAmountDue.toFixed(2)}
Calculated via Expenseliy Invoicing Tools`;

    navigator.clipboard.writeText(text);
    setCopiedSummary(true);
    setTimeout(() => setCopiedSummary(false), 2200);
  };

  const handleReset = () => {
    setInvoiceAmount(4500);
    setDaysOverdue(35);
    setFeeType("percentage_monthly");
    setInterestRate(1.5);
    setGracePeriodDays(7);
  };

  return (
    <div className={`w-full rounded-2xl bg-surface border border-hairline shadow-sm overflow-hidden ${className}`}>
      {/* Header Bar */}
      <div className="p-6 md:p-8 bg-gradient-to-r from-warning-bg/40 via-surface to-surface border-b border-hairline">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-warning-bg text-warning border border-warning-border">
                Standard Commercial Terms (1.5%/mo)
              </span>
              <span className="inline-flex items-center text-xs text-ink-muted">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-income" /> Statutory Compliant
              </span>
            </div>
            <h2 className="text-2xl font-bold text-ink tracking-tight">
              Invoice Late Fee & Overdue Interest Calculator
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              Calculate late payment penalties, accrued statutory interest, and generate a ready-to-send payment demand notice.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <select
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              aria-label="Currency"
              className="px-3 py-2 text-sm font-medium rounded-lg bg-surface-raised border border-hairline text-ink hover:border-warning/60 focus:outline-none focus:ring-2 focus:ring-warning"
            >
              <option value="$">USD ($)</option>
              <option value="€">EUR (€)</option>
              <option value="£">GBP (£)</option>
              <option value="CAD $">CAD ($)</option>
              <option value="AUD $">AUD ($)</option>
            </select>
            <button
              onClick={handleReset}
              className="p-2 rounded-lg text-ink-muted hover:text-ink hover:bg-surface-raised border border-hairline transition-colors"
              title="Reset"
              aria-label="Reset form"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Main Grid */}
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Left Inputs */}
        <div className="lg:col-span-6 space-y-6">
          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-muted">
            1. Invoice Details
          </h3>

          <div className="space-y-2">
            <label htmlFor="invoice-amount" className="block text-sm font-semibold text-ink">Original Invoice Amount</label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-muted font-medium">
                {currency}
              </span>
              <input
                id="invoice-amount"
                type="number"
                min="0"
                step="100"
                value={invoiceAmount || ""}
                onChange={(e) => setInvoiceAmount(Math.max(0, Number(e.target.value) || 0))}
                className="w-full pl-9 pr-4 py-3 rounded-xl bg-surface-raised border border-hairline text-ink font-semibold text-lg focus:outline-none focus:ring-2 focus:ring-warning"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label htmlFor="days-overdue" className="block text-xs font-semibold text-ink mb-1.5">
                Days Overdue: <span className="text-warning font-bold">{daysOverdue} days</span>
              </label>
              <input
                id="days-overdue"
                type="range"
                min="1"
                max="180"
                value={daysOverdue}
                onChange={(e) => setDaysOverdue(Number(e.target.value))}
                className="w-full accent-warning cursor-pointer"
              />
            </div>

            <div>
              <label htmlFor="grace-period" className="block text-xs font-semibold text-ink mb-1.5">
                Grace Period: <span className="text-ink">{gracePeriodDays} days</span>
              </label>
              <input
                id="grace-period"
                type="range"
                min="0"
                max="30"
                value={gracePeriodDays}
                onChange={(e) => setGracePeriodDays(Number(e.target.value))}
                className="w-full accent-warning cursor-pointer"
              />
            </div>
          </div>

          <h3 className="text-sm font-semibold uppercase tracking-wider text-ink-muted pt-2">
            2. Late Fee Structure
          </h3>

          <div className="space-y-3">
            <div className="grid grid-cols-3 gap-2">
              <button
                type="button"
                onClick={() => {
                  setFeeType("percentage_monthly");
                  setInterestRate(1.5);
                }}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  feeType === "percentage_monthly"
                    ? "bg-warning-bg text-warning border-warning-border"
                    : "bg-surface-raised text-ink-secondary border-hairline"
                }`}
              >
                1.5% / Month
              </button>

              <button
                type="button"
                onClick={() => {
                  setFeeType("percentage_annual");
                  setInterestRate(18);
                }}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  feeType === "percentage_annual"
                    ? "bg-warning-bg text-warning border-warning-border"
                    : "bg-surface-raised text-ink-secondary border-hairline"
                }`}
              >
                Annual APR %
              </button>

              <button
                type="button"
                onClick={() => setFeeType("flat")}
                className={`py-2 px-3 rounded-xl text-xs font-semibold border transition-all ${
                  feeType === "flat"
                    ? "bg-warning-bg text-warning border-warning-border"
                    : "bg-surface-raised text-ink-secondary border-hairline"
                }`}
              >
                Flat Fee ($)
              </button>
            </div>

            {feeType !== "flat" ? (
              <div>
                <label htmlFor="interest-rate-input" className="block text-xs font-semibold text-ink mb-1">
                  {feeType === "percentage_monthly" ? "Monthly Interest Rate (%)" : "Annual APR (%)"}
                </label>
                <input
                  id="interest-rate-input"
                  type="number"
                  step="0.1"
                  value={interestRate}
                  onChange={(e) => setInterestRate(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-raised border border-hairline text-ink font-semibold text-sm"
                />
              </div>
            ) : (
              <div>
                <label htmlFor="flat-fee-input" className="block text-xs font-semibold text-ink mb-1">Flat Penalty Amount ({currency})</label>
                <input
                  id="flat-fee-input"
                  type="number"
                  value={flatFee}
                  onChange={(e) => setFlatFee(Math.max(0, Number(e.target.value) || 0))}
                  className="w-full px-3.5 py-2.5 rounded-xl bg-surface-raised border border-hairline text-ink font-semibold text-sm"
                />
              </div>
            )}
          </div>
        </div>

        {/* Right Output */}
        <div className="lg:col-span-6 space-y-6">
          <div className="p-6 rounded-2xl bg-gradient-to-br from-surface-raised to-surface border border-hairline-strong shadow-md">
            <div className="flex items-center justify-between pb-4 border-b border-hairline">
              <div>
                <span className="text-xs font-semibold text-ink-muted uppercase tracking-wider">
                  Total Balance Now Due
                </span>
                <div className="text-3xl sm:text-4xl font-black text-ink mt-1">
                  {currency}{totalAmountDue.toFixed(2)}
                </div>
              </div>
              <div className="text-right">
                <span className="inline-flex px-3 py-1 rounded-full text-xs font-bold bg-warning-bg text-warning border border-warning-border">
                  +{currency}{lateFeeAmount.toFixed(2)} Penalty
                </span>
                <p className="text-xs text-ink-muted mt-1">{chargeableDays} billable overdue days</p>
              </div>
            </div>

            {/* Breakdown List */}
            <div className="space-y-3 pt-4 text-sm">
              <div className="flex justify-between items-center text-ink-secondary">
                <span>Original Invoice Principal</span>
                <span className="font-semibold text-ink">{currency}{invoiceAmount.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-ink-secondary">
                <span>Late Payment Interest / Penalty</span>
                <span className="font-semibold text-warning">+{currency}{lateFeeAmount.toFixed(2)}</span>
              </div>
              <div className="flex justify-between items-center text-ink-secondary text-xs">
                <span>Daily Accrual Rate</span>
                <span>{currency}{dailyInterest.toFixed(2)} / day</span>
              </div>
            </div>

            {/* Email Notice Generator */}
            <div className="mt-6 pt-4 border-t border-hairline space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-xs font-bold text-ink flex items-center gap-1.5">
                  <Mail className="w-4 h-4 text-warning" /> Ready-to-Send Overdue Notice
                </span>
                <button
                  onClick={handleCopyEmail}
                  className="text-xs font-semibold text-income hover:underline flex items-center gap-1 cursor-pointer"
                >
                  {copiedEmail ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedEmail ? "Copied Email!" : "Copy Email"}
                </button>
              </div>

              <div className="p-3 rounded-xl bg-surface border border-hairline text-xs font-mono text-ink-secondary max-h-36 overflow-y-auto whitespace-pre-line leading-relaxed">
                {emailDraft}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-surface-raised border border-hairline flex items-start gap-3">
            <Sparkles className="w-5 h-5 text-warning shrink-0 mt-0.5" />
            <div className="text-xs text-ink-muted space-y-1">
              <p className="font-semibold text-ink">Legal Enforcement Tip</p>
              <p>
                To legally enforce late fees, the payment terms (e.g. <em>"1.5% interest per month on balances past 30 days"</em>) must be explicitly stated on your original contract and invoice.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
