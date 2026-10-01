"use client";

import React, { useState } from "react";
import {
  FileSpreadsheet,
  Plus,
  Trash2,
  Download,
  Printer,
  Sparkles,
  ShieldCheck,
  RotateCcw,
  ArrowRight,
  DollarSign,
  Calendar,
  Building,
  User,
} from "lucide-react";

interface EstimateItem {
  id: string;
  description: string;
  quantity: number;
  rate: number;
}

export function EstimateMaker({ className = "" }: { className?: string }) {
  const [estimateNumber, setEstimateNumber] = useState("EST-2026-001");
  const [estimateDate, setEstimateDate] = useState(new Date().toISOString().split("T")[0]);
  const [expiryDate, setExpiryDate] = useState(
    new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  );
  const [currency, setCurrency] = useState("$");
  const [senderName, setSenderName] = useState("Acme Creative Studio");
  const [senderEmail, setSenderEmail] = useState("hello@acmecreative.com");
  const [clientName, setClientName] = useState("Global Retail Corp");
  const [clientEmail, setClientEmail] = useState("billing@globalretail.com");
  const [taxRate, setTaxRate] = useState<number>(8.5);
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [notes, setNotes] = useState(
    "Estimate valid for 30 days from issue date. A 50% deposit is required upon approval before work commences."
  );

  const [items, setItems] = useState<EstimateItem[]>([
    { id: "1", description: "UI/UX Interface Design & Wireframes", quantity: 35, rate: 95 },
    { id: "2", description: "Frontend Development & Responsive Web", quantity: 45, rate: 110 },
    { id: "3", description: "Search Engine Optimization & Schema Setup", quantity: 1, rate: 850 },
  ]);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Math.random().toString(36).substring(2, 9),
        description: "New Service or Product Item",
        quantity: 1,
        rate: 100,
      },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof EstimateItem, value: string | number) => {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return { ...item, [field]: value };
        }
        return item;
      })
    );
  };

  const subtotal = items.reduce((acc, item) => acc + item.quantity * item.rate, 0);
  const discountedSubtotal = Math.max(0, subtotal - discountAmount);
  const taxAmount = (discountedSubtotal * taxRate) / 100;
  const totalAmount = discountedSubtotal + taxAmount;

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = async () => {
    try {
      const { jsPDF } = await import("jspdf");
      const autoTable = (await import("jspdf-autotable")).default;

      const doc = new jsPDF();

      // Header
      doc.setFontSize(22);
      doc.setTextColor(0, 135, 76);
      doc.text("PRICE ESTIMATE / QUOTE", 14, 22);

      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Estimate #: ${estimateNumber}`, 14, 30);
      doc.text(`Date: ${estimateDate}`, 14, 35);
      doc.text(`Valid Until: ${expiryDate}`, 14, 40);

      // Sender & Client Box
      doc.setFontSize(11);
      doc.setTextColor(30, 30, 30);
      doc.text("FROM:", 14, 52);
      doc.setFontSize(10);
      doc.text(senderName, 14, 58);
      doc.text(senderEmail, 14, 63);

      doc.setFontSize(11);
      doc.text("PREPARED FOR:", 120, 52);
      doc.setFontSize(10);
      doc.text(clientName, 120, 58);
      doc.text(clientEmail, 120, 63);

      // Table
      const tableData = items.map((item) => [
        item.description,
        item.quantity.toString(),
        `${currency}${item.rate.toFixed(2)}`,
        `${currency}${(item.quantity * item.rate).toFixed(2)}`,
      ]);

      autoTable(doc, {
        startY: 72,
        head: [["Description", "Qty/Hrs", "Unit Rate", "Total"]],
        body: tableData,
        headStyles: { fillColor: [0, 135, 76], textColor: [255, 255, 255] },
        theme: "striped",
      });

      // Totals
      // @ts-expect-error - lastAutoTable injected by jspdf-autotable
      const finalY = doc.lastAutoTable.finalY + 10;

      doc.setFontSize(10);
      doc.text(`Subtotal: ${currency}${subtotal.toFixed(2)}`, 140, finalY);
      doc.text(`Discount: -${currency}${discountAmount.toFixed(2)}`, 140, finalY + 6);
      doc.text(`Tax (${taxRate}%): ${currency}${taxAmount.toFixed(2)}`, 140, finalY + 12);
      doc.setFontSize(13);
      doc.setTextColor(0, 135, 76);
      doc.text(`Total Estimate: ${currency}${totalAmount.toFixed(2)}`, 140, finalY + 20);

      // Notes
      doc.setFontSize(9);
      doc.setTextColor(120, 120, 120);
      doc.text("Notes & Terms:", 14, finalY + 10);
      doc.text(notes, 14, finalY + 16, { maxWidth: 110 });

      doc.save(`${estimateNumber}_Estimate.pdf`);
    } catch (err) {
      console.error("PDF generation error:", err);
      window.print();
    }
  };

  return (
    <div className={`w-full rounded-2xl bg-surface border border-hairline shadow-sm overflow-hidden ${className}`}>
      {/* Header Bar */}
      <div className="p-6 md:p-8 bg-gradient-to-r from-income-bg/30 via-surface to-surface border-b border-hairline">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-income-bg text-income border border-income-border">
                Client Quotation Generator
              </span>
              <span className="inline-flex items-center text-xs text-ink-muted">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-income" /> Instant PDF Export
              </span>
            </div>
            <h2 className="text-2xl font-bold text-ink tracking-tight">
              Free Price Estimate & Quotation Maker
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              Create professional client project quotes, itemized price proposals, and download clean PDFs in seconds.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handlePrint}
              className="py-2 px-3 rounded-lg text-xs font-semibold bg-surface-raised hover:bg-surface border border-hairline text-ink flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Printer className="w-4 h-4" /> Print
            </button>
            <button
              onClick={handleDownloadPdf}
              className="py-2 px-4 rounded-lg text-xs font-semibold bg-income hover:bg-income/90 text-white flex items-center gap-1.5 transition-all cursor-pointer shadow-sm"
            >
              <Download className="w-4 h-4" /> Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Editor Body */}
      <div className="p-6 md:p-8 space-y-6">
        {/* Metadata Row */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="estimate-number" className="block text-xs font-semibold text-ink mb-1">Estimate #</label>
            <input
              id="estimate-number"
              type="text"
              value={estimateNumber}
              onChange={(e) => setEstimateNumber(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-hairline text-ink font-mono text-sm"
            />
          </div>

          <div>
            <label htmlFor="estimate-date" className="block text-xs font-semibold text-ink mb-1">Date Issued</label>
            <input
              id="estimate-date"
              type="date"
              value={estimateDate}
              onChange={(e) => setEstimateDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-hairline text-ink text-sm"
            />
          </div>

          <div>
            <label htmlFor="expiry-date" className="block text-xs font-semibold text-ink mb-1">Valid Until (Expiry)</label>
            <input
              id="expiry-date"
              type="date"
              value={expiryDate}
              onChange={(e) => setExpiryDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-hairline text-ink text-sm"
            />
          </div>

          <div>
            <label htmlFor="estimate-currency" className="block text-xs font-semibold text-ink mb-1">Currency</label>
            <select
              id="estimate-currency"
              value={currency}
              onChange={(e) => setCurrency(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-hairline text-ink text-sm"
            >
              <option value="$">USD ($)</option>
              <option value="€">EUR (€)</option>
              <option value="£">GBP (£)</option>
              <option value="CAD $">CAD ($)</option>
              <option value="AUD $">AUD ($)</option>
            </select>
          </div>
        </div>

        {/* Sender & Recipient */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="p-4 rounded-xl bg-surface-raised border border-hairline space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-muted flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-income" /> From (Your Business)
            </h4>
            <input
              type="text"
              placeholder="Your Business Name"
              value={senderName}
              onChange={(e) => setSenderName(e.target.value)}
              className="w-full px-3 py-1.5 rounded-md bg-surface border border-hairline text-ink font-semibold text-sm"
            />
            <input
              type="email"
              placeholder="your-email@business.com"
              value={senderEmail}
              onChange={(e) => setSenderEmail(e.target.value)}
              className="w-full px-3 py-1.5 rounded-md bg-surface border border-hairline text-ink text-xs"
            />
          </div>

          <div className="p-4 rounded-xl bg-surface-raised border border-hairline space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-muted flex items-center gap-1.5">
              <User className="w-3.5 h-3.5 text-sky" /> Prepared For (Client)
            </h4>
            <input
              type="text"
              placeholder="Client Company or Contact Name"
              value={clientName}
              onChange={(e) => setClientName(e.target.value)}
              className="w-full px-3 py-1.5 rounded-md bg-surface border border-hairline text-ink font-semibold text-sm"
            />
            <input
              type="email"
              placeholder="client-billing@company.com"
              value={clientEmail}
              onChange={(e) => setClientEmail(e.target.value)}
              className="w-full px-3 py-1.5 rounded-md bg-surface border border-hairline text-ink text-xs"
            />
          </div>
        </div>

        {/* Itemized Table */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              Scope of Work & Line Items
            </h4>
            <button
              onClick={addItem}
              className="text-xs font-semibold text-income hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Line Item
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-raised text-ink-muted border-y border-hairline">
                <tr>
                  <th className="py-2.5 px-3 font-semibold">Description</th>
                  <th className="py-2.5 px-3 font-semibold w-24">Qty/Hrs</th>
                  <th className="py-2.5 px-3 font-semibold w-28">Unit Rate</th>
                  <th className="py-2.5 px-3 font-semibold w-28">Amount</th>
                  <th className="py-2.5 px-2 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {items.map((item) => (
                  <tr key={item.id} className="hover:bg-surface-raised/40">
                    <td className="py-2 px-3">
                      <input
                        type="text"
                        value={item.description}
                        onChange={(e) => updateItem(item.id, "description", e.target.value)}
                        className="w-full px-2 py-1 rounded bg-surface border border-hairline text-ink text-xs"
                      />
                    </td>
                    <td className="py-2 px-3">
                      <input
                        type="number"
                        min="1"
                        value={item.quantity || ""}
                        onChange={(e) => updateItem(item.id, "quantity", Number(e.target.value))}
                        className="w-full px-2 py-1 rounded bg-surface border border-hairline text-ink text-xs text-center"
                      />
                    </td>
                    <td className="py-2 px-3">
                      <input
                        type="number"
                        min="0"
                        value={item.rate || ""}
                        onChange={(e) => updateItem(item.id, "rate", Number(e.target.value))}
                        className="w-full px-2 py-1 rounded bg-surface border border-hairline text-ink text-xs"
                      />
                    </td>
                    <td className="py-2 px-3 font-bold text-ink">
                      {currency}{(item.quantity * item.rate).toFixed(2)}
                    </td>
                    <td className="py-2 px-2 text-right">
                      <button
                        onClick={() => removeItem(item.id)}
                        disabled={items.length <= 1}
                        className="text-ink-muted hover:text-expense p-1 disabled:opacity-30 cursor-pointer"
                        title="Remove line"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Totals & Notes Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-4 border-t border-hairline">
          <div>
            <label htmlFor="estimate-notes" className="block text-xs font-semibold text-ink mb-1">Notes & Terms of Agreement</label>
            <textarea
              id="estimate-notes"
              rows={4}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full p-3 rounded-xl bg-surface-raised border border-hairline text-ink text-xs leading-relaxed"
            />
          </div>

          <div className="p-4 rounded-xl bg-surface-raised border border-hairline space-y-2.5 text-xs">
            <div className="flex justify-between text-ink-secondary">
              <span>Subtotal:</span>
              <span className="font-semibold text-ink">{currency}{subtotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between items-center text-ink-secondary">
              <span>Discount ({currency}):</span>
              <input
                type="number"
                min="0"
                value={discountAmount}
                onChange={(e) => setDiscountAmount(Math.max(0, Number(e.target.value) || 0))}
                className="w-24 px-2 py-1 rounded bg-surface border border-hairline text-right font-semibold text-xs"
              />
            </div>

            <div className="flex justify-between items-center text-ink-secondary">
              <span>Tax Rate (%):</span>
              <input
                type="number"
                step="0.1"
                min="0"
                value={taxRate}
                onChange={(e) => setTaxRate(Math.max(0, Number(e.target.value) || 0))}
                className="w-24 px-2 py-1 rounded bg-surface border border-hairline text-right font-semibold text-xs"
              />
            </div>

            <div className="pt-2 border-t border-hairline flex justify-between items-center text-sm font-bold text-ink">
              <span>Total Estimate:</span>
              <span className="text-xl text-income">{currency}{totalAmount.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
