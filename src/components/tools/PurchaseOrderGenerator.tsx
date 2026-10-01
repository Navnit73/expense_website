"use client";

import React, { useState } from "react";
import {
  FileCheck,
  Plus,
  Trash2,
  Download,
  Printer,
  ShieldCheck,
  Building,
  Truck,
} from "lucide-react";

interface POItem {
  id: string;
  sku: string;
  description: string;
  quantity: number;
  unitPrice: number;
}

export function PurchaseOrderGenerator({ className = "" }: { className?: string }) {
  const [poNumber, setPoNumber] = useState("PO-2026-8801");
  const [poDate, setPoDate] = useState(new Date().toISOString().split("T")[0]);
  const [deliveryDate, setDeliveryDate] = useState(
    new Date(Date.now() + 14 * 24 * 60 * 60 * 1000).toISOString().split("T")[0]
  );
  const [currency, setCurrency] = useState("$");
  const [vendorName, setVendorName] = useState("Apex Logistics & Supplies LLC");
  const [vendorAddress, setVendorAddress] = useState("100 Industrial Parkway, Chicago, IL 60601");
  const [buyerCompany, setBuyerCompany] = useState("Nexus Commerce Group");
  const [shipToAddress, setShipToAddress] = useState("Warehouse 4, 450 Distribution Way, Dallas, TX 75201");
  const [shippingMethod, setShippingMethod] = useState("Ground Freight");
  const [paymentTerms, setPaymentTerms] = useState("Net 30");

  const [items, setItems] = useState<POItem[]>([
    { id: "1", sku: "BOX-M-100", description: "Corrugated Shipping Cartons (Medium)", quantity: 200, unitPrice: 3.25 },
    { id: "2", sku: "TAPE-HVY-50", description: "Heavy Duty Reinforced Packing Tape (50m)", quantity: 50, unitPrice: 5.40 },
    { id: "3", sku: "LBL-THM-4X6", description: "Direct Thermal Shipping Labels (1000/roll)", quantity: 15, unitPrice: 18.50 },
  ]);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Math.random().toString(36).substring(2, 9),
        sku: "ITEM-SKU",
        description: "New Inventory Item",
        quantity: 10,
        unitPrice: 15.0,
      },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof POItem, value: string | number) => {
    setItems(
      items.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const subtotal = items.reduce((acc, item) => acc + item.quantity * item.unitPrice, 0);

  const handleDownloadPdf = async () => {
    try {
      const { jsPDF } = await import("jspdf");
      const autoTable = (await import("jspdf-autotable")).default;

      const doc = new jsPDF();

      doc.setFontSize(22);
      doc.setTextColor(30, 41, 59);
      doc.text("PURCHASE ORDER", 14, 22);

      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`PO Number: ${poNumber}`, 14, 30);
      doc.text(`Date: ${poDate}`, 14, 35);
      doc.text(`Expected Delivery: ${deliveryDate}`, 14, 40);
      doc.text(`Payment Terms: ${paymentTerms}`, 14, 45);

      // Vendor & Ship To
      doc.setFontSize(11);
      doc.setTextColor(30, 30, 30);
      doc.text("VENDOR:", 14, 56);
      doc.setFontSize(9);
      doc.text(vendorName, 14, 62);
      doc.text(vendorAddress, 14, 67, { maxWidth: 80 });

      doc.setFontSize(11);
      doc.text("SHIP TO:", 110, 56);
      doc.setFontSize(9);
      doc.text(buyerCompany, 110, 62);
      doc.text(shipToAddress, 110, 67, { maxWidth: 80 });

      const tableData = items.map((item) => [
        item.sku,
        item.description,
        item.quantity.toString(),
        `${currency}${item.unitPrice.toFixed(2)}`,
        `${currency}${(item.quantity * item.unitPrice).toFixed(2)}`,
      ]);

      autoTable(doc, {
        startY: 82,
        head: [["SKU", "Description", "Qty", "Unit Price", "Total"]],
        body: tableData,
        headStyles: { fillColor: [51, 65, 85], textColor: [255, 255, 255] },
        theme: "grid",
      });

      // @ts-expect-error - lastAutoTable injected by jspdf-autotable
      const finalY = doc.lastAutoTable.finalY + 10;

      doc.setFontSize(12);
      doc.setTextColor(15, 23, 42);
      doc.text(`Total PO Amount: ${currency}${subtotal.toFixed(2)}`, 130, finalY);

      doc.setFontSize(8);
      doc.setTextColor(140, 140, 140);
      doc.text("Authorized Signature: _______________________   Date: ____________", 14, finalY + 25);

      doc.save(`${poNumber}.pdf`);
    } catch (err) {
      console.error(err);
      window.print();
    }
  };

  return (
    <div className={`w-full rounded-2xl bg-surface border border-hairline shadow-sm overflow-hidden ${className}`}>
      {/* Header Bar */}
      <div className="p-6 md:p-8 bg-gradient-to-r from-sky-bg/30 via-surface to-surface border-b border-hairline">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-bg text-sky border border-sky-border">
                B2B Procurement Engine
              </span>
              <span className="inline-flex items-center text-xs text-ink-muted">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-income" /> 100% Free & Client-Side
              </span>
            </div>
            <h2 className="text-2xl font-bold text-ink tracking-tight">
              Purchase Order (PO) Generator & Formatter
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              Create standardized B2B purchase orders with line items, SKU tracking, vendor details, and PDF export.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => window.print()}
              className="py-2 px-3 rounded-lg text-xs font-semibold bg-surface-raised hover:bg-surface border border-hairline text-ink flex items-center gap-1.5 cursor-pointer"
            >
              <Printer className="w-4 h-4" /> Print
            </button>
            <button
              onClick={handleDownloadPdf}
              className="py-2 px-4 rounded-lg text-xs font-semibold bg-sky hover:bg-sky/90 text-white flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4" /> Export PO PDF
            </button>
          </div>
        </div>
      </div>

      {/* Editor Body */}
      <div className="p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="po-number-input" className="block text-xs font-semibold text-ink mb-1">PO Number</label>
            <input
              id="po-number-input"
              type="text"
              value={poNumber}
              onChange={(e) => setPoNumber(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-hairline text-ink font-mono text-sm"
            />
          </div>
          <div>
            <label htmlFor="po-date-input" className="block text-xs font-semibold text-ink mb-1">PO Date</label>
            <input
              id="po-date-input"
              type="date"
              value={poDate}
              onChange={(e) => setPoDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-hairline text-ink text-sm"
            />
          </div>
          <div>
            <label htmlFor="delivery-date-input" className="block text-xs font-semibold text-ink mb-1">Expected Delivery</label>
            <input
              id="delivery-date-input"
              type="date"
              value={deliveryDate}
              onChange={(e) => setDeliveryDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-hairline text-ink text-sm"
            />
          </div>
          <div>
            <label htmlFor="payment-terms-input" className="block text-xs font-semibold text-ink mb-1">Payment Terms</label>
            <select
              id="payment-terms-input"
              value={paymentTerms}
              onChange={(e) => setPaymentTerms(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-hairline text-ink text-sm"
            >
              <option value="Net 30">Net 30</option>
              <option value="Net 60">Net 60</option>
              <option value="Net 15">Net 15</option>
              <option value="Due on Receipt">Due on Receipt</option>
              <option value="50% Upfront, 50% Net 30">50% Upfront, 50% Net 30</option>
            </select>
          </div>
        </div>

        {/* Vendor & Ship To */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="p-4 rounded-xl bg-surface-raised border border-hairline space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-muted flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-ink" /> Vendor Information
            </h4>
            <input
              type="text"
              placeholder="Vendor Company Name"
              value={vendorName}
              onChange={(e) => setVendorName(e.target.value)}
              className="w-full px-3 py-1.5 rounded-md bg-surface border border-hairline text-ink font-semibold text-sm"
            />
            <input
              type="text"
              placeholder="Vendor Full Address / Street, City, ZIP"
              value={vendorAddress}
              onChange={(e) => setVendorAddress(e.target.value)}
              className="w-full px-3 py-1.5 rounded-md bg-surface border border-hairline text-ink text-xs"
            />
          </div>

          <div className="p-4 rounded-xl bg-surface-raised border border-hairline space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-muted flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-sky" /> Shipping Destination (Ship To)
            </h4>
            <input
              type="text"
              placeholder="Your Receiving Company Name"
              value={buyerCompany}
              onChange={(e) => setBuyerCompany(e.target.value)}
              className="w-full px-3 py-1.5 rounded-md bg-surface border border-hairline text-ink font-semibold text-sm"
            />
            <input
              type="text"
              placeholder="Warehouse / Destination Address"
              value={shipToAddress}
              onChange={(e) => setShipToAddress(e.target.value)}
              className="w-full px-3 py-1.5 rounded-md bg-surface border border-hairline text-ink text-xs"
            />
          </div>
        </div>

        {/* Line Items */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              Ordered Products & Supplies
            </h4>
            <button
              onClick={addItem}
              className="text-xs font-semibold text-sky hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add PO Item
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-raised text-ink-muted border-y border-hairline">
                <tr>
                  <th className="py-2.5 px-3 font-semibold w-28">SKU / Item #</th>
                  <th className="py-2.5 px-3 font-semibold">Description</th>
                  <th className="py-2.5 px-3 font-semibold w-20">Qty</th>
                  <th className="py-2.5 px-3 font-semibold w-28">Unit Price</th>
                  <th className="py-2.5 px-3 font-semibold w-28">Total</th>
                  <th className="py-2.5 px-2 w-10"></th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {items.map((item) => (
                  <tr key={item.id}>
                    <td className="py-2 px-3">
                      <input
                        type="text"
                        value={item.sku}
                        onChange={(e) => updateItem(item.id, "sku", e.target.value)}
                        className="w-full px-2 py-1 rounded bg-surface border border-hairline text-ink text-xs font-mono"
                      />
                    </td>
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
                        value={item.unitPrice || ""}
                        onChange={(e) => updateItem(item.id, "unitPrice", Number(e.target.value))}
                        className="w-full px-2 py-1 rounded bg-surface border border-hairline text-ink text-xs"
                      />
                    </td>
                    <td className="py-2 px-3 font-bold text-ink">
                      {currency}{(item.quantity * item.unitPrice).toFixed(2)}
                    </td>
                    <td className="py-2 px-2 text-right">
                      <button
                        onClick={() => removeItem(item.id)}
                        disabled={items.length <= 1}
                        className="text-ink-muted hover:text-expense p-1 disabled:opacity-30 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="flex justify-end pt-4 border-t border-hairline">
            <div className="text-right">
              <span className="text-xs text-ink-muted block">Total Purchase Order Value:</span>
              <span className="text-2xl font-black text-ink">{currency}{subtotal.toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
