"use client";

import React, { useState } from "react";
import {
  Package,
  Plus,
  Trash2,
  Download,
  Printer,
  ShieldCheck,
  Truck,
  Building,
} from "lucide-react";

interface SlipItem {
  id: string;
  sku: string;
  description: string;
  orderedQty: number;
  shippedQty: number;
  notes: string;
}

export function PackingSlipGenerator({ className = "" }: { className?: string }) {
  const [slipNumber, setSlipNumber] = useState("PS-2026-9042");
  const [orderNumber, setOrderNumber] = useState("ORD-77402");
  const [shipDate, setShipDate] = useState(new Date().toISOString().split("T")[0]);
  const [carrier, setCarrier] = useState("UPS Ground");
  const [trackingNumber, setTrackingNumber] = useState("1Z9999999999999999");
  const [companyName, setCompanyName] = useState("Starlight Direct Fulfillment");
  const [recipientName, setRecipientName] = useState("Sarah Jenkins");
  const [recipientAddress, setRecipientAddress] = useState("742 Evergreen Terrace, Springfield, OR 97477");

  const [items, setItems] = useState<SlipItem[]>([
    { id: "1", sku: "SKU-BLK-HOODIE-M", description: "Premium Cotton Hoodie (Black, Medium)", orderedQty: 2, shippedQty: 2, notes: "Inspected" },
    { id: "2", sku: "SKU-WHT-TEE-M", description: "Heavyweight Crewneck Tee (White, Medium)", orderedQty: 4, shippedQty: 4, notes: "Inspected" },
    { id: "3", sku: "SKU-CANVAS-TOTE", description: "Organic Cotton Canvas Tote Bag", orderedQty: 1, shippedQty: 1, notes: "Free Gift" },
  ]);

  const addItem = () => {
    setItems([
      ...items,
      {
        id: Math.random().toString(36).substring(2, 9),
        sku: "ITEM-SKU",
        description: "Product Description",
        orderedQty: 1,
        shippedQty: 1,
        notes: "",
      },
    ]);
  };

  const removeItem = (id: string) => {
    if (items.length > 1) {
      setItems(items.filter((item) => item.id !== id));
    }
  };

  const updateItem = (id: string, field: keyof SlipItem, value: string | number) => {
    setItems(items.map((item) => (item.id === id ? { ...item, [field]: value } : item)));
  };

  const totalUnits = items.reduce((acc, item) => acc + item.shippedQty, 0);

  const handleDownloadPdf = async () => {
    try {
      const { jsPDF } = await import("jspdf");
      const autoTable = (await import("jspdf-autotable")).default;

      const doc = new jsPDF();

      doc.setFontSize(22);
      doc.setTextColor(30, 30, 30);
      doc.text("PACKING SLIP", 14, 22);

      doc.setFontSize(10);
      doc.setTextColor(100, 100, 100);
      doc.text(`Packing Slip #: ${slipNumber}`, 14, 30);
      doc.text(`Order #: ${orderNumber}`, 14, 35);
      doc.text(`Ship Date: ${shipDate}`, 14, 40);
      doc.text(`Carrier: ${carrier} | Tracking: ${trackingNumber}`, 14, 45);

      doc.setFontSize(11);
      doc.setTextColor(30, 30, 30);
      doc.text("SHIP FROM:", 14, 56);
      doc.setFontSize(9);
      doc.text(companyName, 14, 62);

      doc.setFontSize(11);
      doc.text("SHIP TO:", 110, 56);
      doc.setFontSize(9);
      doc.text(recipientName, 110, 62);
      doc.text(recipientAddress, 110, 67, { maxWidth: 80 });

      const tableData = items.map((item) => [
        item.sku,
        item.description,
        item.orderedQty.toString(),
        item.shippedQty.toString(),
        item.notes,
      ]);

      autoTable(doc, {
        startY: 82,
        head: [["SKU", "Description", "Ordered", "Shipped", "Status / Notes"]],
        body: tableData,
        headStyles: { fillColor: [40, 50, 60], textColor: [255, 255, 255] },
        theme: "striped",
      });

      // @ts-expect-error - lastAutoTable injected by jspdf-autotable
      const finalY = doc.lastAutoTable.finalY + 10;

      doc.setFontSize(11);
      doc.text(`Total Units Packed & Shipped: ${totalUnits}`, 14, finalY);

      doc.setFontSize(9);
      doc.setTextColor(120, 120, 120);
      doc.text("Thank you for your order! Please inspect contents upon receipt.", 14, finalY + 15);

      doc.save(`${slipNumber}_Packing_Slip.pdf`);
    } catch (err) {
      console.error(err);
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
                E-Commerce & Warehouse Packing Slip
              </span>
              <span className="inline-flex items-center text-xs text-ink-muted">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-income" /> Print & PDF Ready
              </span>
            </div>
            <h2 className="text-2xl font-bold text-ink tracking-tight">
              Packing Slip & Delivery Note Maker
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              Generate warehouse packing slips, delivery manifests, and itemized shipment receipts with tracking details.
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
              className="py-2 px-4 rounded-lg text-xs font-semibold bg-income hover:bg-income/90 text-white flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4" /> Download PDF
            </button>
          </div>
        </div>
      </div>

      {/* Form Body */}
      <div className="p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
          <div>
            <label htmlFor="slip-number-input" className="block text-xs font-semibold text-ink mb-1">Slip Number</label>
            <input
              id="slip-number-input"
              type="text"
              value={slipNumber}
              onChange={(e) => setSlipNumber(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-hairline text-ink font-mono text-sm"
            />
          </div>
          <div>
            <label htmlFor="order-number-input" className="block text-xs font-semibold text-ink mb-1">Order Number</label>
            <input
              id="order-number-input"
              type="text"
              value={orderNumber}
              onChange={(e) => setOrderNumber(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-hairline text-ink font-mono text-sm"
            />
          </div>
          <div>
            <label htmlFor="ship-date-input" className="block text-xs font-semibold text-ink mb-1">Ship Date</label>
            <input
              id="ship-date-input"
              type="date"
              value={shipDate}
              onChange={(e) => setShipDate(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-hairline text-ink text-sm"
            />
          </div>
          <div>
            <label htmlFor="carrier-input" className="block text-xs font-semibold text-ink mb-1">Carrier & Tracking</label>
            <input
              id="carrier-input"
              type="text"
              value={`${carrier} - ${trackingNumber}`}
              onChange={(e) => {
                const parts = e.target.value.split(" - ");
                setCarrier(parts[0] || "");
                setTrackingNumber(parts[1] || "");
              }}
              className="w-full px-3 py-2 rounded-lg bg-surface-raised border border-hairline text-ink text-xs"
            />
          </div>
        </div>

        {/* Sender & Customer */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
          <div className="p-4 rounded-xl bg-surface-raised border border-hairline space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-muted flex items-center gap-1.5">
              <Building className="w-3.5 h-3.5 text-income" /> Fulfilled By
            </h4>
            <input
              type="text"
              placeholder="Fulfillment / Sender Business Name"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              className="w-full px-3 py-1.5 rounded-md bg-surface border border-hairline text-ink font-semibold text-sm"
            />
          </div>

          <div className="p-4 rounded-xl bg-surface-raised border border-hairline space-y-2">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-muted flex items-center gap-1.5">
              <Truck className="w-3.5 h-3.5 text-sky" /> Ship To Customer
            </h4>
            <input
              type="text"
              placeholder="Customer Name"
              value={recipientName}
              onChange={(e) => setRecipientName(e.target.value)}
              className="w-full px-3 py-1.5 rounded-md bg-surface border border-hairline text-ink font-semibold text-sm"
            />
            <input
              type="text"
              placeholder="Shipping Address, City, State, ZIP"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              className="w-full px-3 py-1.5 rounded-md bg-surface border border-hairline text-ink text-xs"
            />
          </div>
        </div>

        {/* Packing Items */}
        <div className="space-y-3 pt-2">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold uppercase tracking-wider text-ink-muted">
              Shipment Box Contents
            </h4>
            <button
              onClick={addItem}
              className="text-xs font-semibold text-income hover:underline flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Add Package Item
            </button>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-raised text-ink-muted border-y border-hairline">
                <tr>
                  <th className="py-2.5 px-3 font-semibold w-28">SKU</th>
                  <th className="py-2.5 px-3 font-semibold">Item Description</th>
                  <th className="py-2.5 px-3 font-semibold w-20 text-center">Ordered</th>
                  <th className="py-2.5 px-3 font-semibold w-20 text-center">Shipped</th>
                  <th className="py-2.5 px-3 font-semibold w-32">Notes</th>
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
                        value={item.orderedQty || ""}
                        onChange={(e) => updateItem(item.id, "orderedQty", Number(e.target.value))}
                        className="w-full px-2 py-1 rounded bg-surface border border-hairline text-ink text-xs text-center"
                      />
                    </td>
                    <td className="py-2 px-3">
                      <input
                        type="number"
                        min="0"
                        value={item.shippedQty || ""}
                        onChange={(e) => updateItem(item.id, "shippedQty", Number(e.target.value))}
                        className="w-full px-2 py-1 rounded bg-surface border border-hairline text-ink text-xs text-center font-bold"
                      />
                    </td>
                    <td className="py-2 px-3">
                      <input
                        type="text"
                        value={item.notes}
                        onChange={(e) => updateItem(item.id, "notes", e.target.value)}
                        className="w-full px-2 py-1 rounded bg-surface border border-hairline text-ink text-xs"
                      />
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

          <div className="flex justify-between items-center pt-4 border-t border-hairline text-xs font-bold text-ink">
            <span>Total Units Packed: {totalUnits} items</span>
            <span className="text-income font-medium">✓ Ready for Carrier Hand-off</span>
          </div>
        </div>
      </div>
    </div>
  );
}
