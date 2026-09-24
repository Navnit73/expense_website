import { useState, useEffect } from "react";
import { InvoiceData, InvoiceItem, DEFAULT_INVOICE_DATA, DEFAULT_BILL_DATA, DEFAULT_RECEIPT_DATA, DocumentType } from "./types";

const INVOICE_STORAGE_KEY = "expenseliy_invoice_draft_v1";
const INVOICE_HISTORY_KEY = "expenseliy_invoice_history_v1";

export function calculateInvoiceTotals(data: InvoiceData): InvoiceData {
  // 1. Calculate subtotal
  const calculatedItems = data.items.map((item) => {
    const itemAmount = parseFloat((item.quantity * item.rate).toFixed(2));
    return { ...item, amount: itemAmount };
  });

  const subtotal = parseFloat(
    calculatedItems.reduce((acc, item) => acc + item.amount, 0).toFixed(2)
  );

  // 2. Calculate discount
  let discountAmount = 0;
  if (data.discountType === "percentage") {
    discountAmount = parseFloat(((subtotal * (data.discountValue || 0)) / 100).toFixed(2));
  } else {
    discountAmount = parseFloat((data.discountValue || 0).toFixed(2));
  }
  discountAmount = Math.min(discountAmount, subtotal);

  const taxableAmount = Math.max(0, subtotal - discountAmount);

  // 3. Calculate tax
  const taxAmount = parseFloat(
    (((taxableAmount * (data.taxRate || 0)) / 100)).toFixed(2)
  );

  // 4. Calculate total
  const shipping = parseFloat((data.shipping || 0).toFixed(2));
  const total = parseFloat((taxableAmount + taxAmount + shipping).toFixed(2));

  // 5. Balance due
  const amountPaid = parseFloat((data.amountPaid || 0).toFixed(2));
  const balanceDue = parseFloat(Math.max(0, total - amountPaid).toFixed(2));

  return {
    ...data,
    items: calculatedItems,
    subtotal,
    discountAmount,
    taxAmount,
    shipping,
    total,
    amountPaid,
    balanceDue,
  };
}

export function useInvoiceStore(initialType: DocumentType = "invoice") {
  const [invoice, setInvoice] = useState<InvoiceData>(() => {
    if (initialType === "bill") return DEFAULT_BILL_DATA;
    if (initialType === "receipt") return DEFAULT_RECEIPT_DATA;
    return DEFAULT_INVOICE_DATA;
  });
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(`${INVOICE_STORAGE_KEY}_${initialType}`);
      if (stored) {
        const parsed = JSON.parse(stored);
        setInvoice(calculateInvoiceTotals(parsed));
      }
    } catch (e) {
      console.error("Failed to load invoice draft", e);
    } finally {
      setIsLoaded(true);
    }
  }, [initialType]);

  const updateInvoice = (updates: Partial<InvoiceData>) => {
    setInvoice((prev) => {
      const updated = calculateInvoiceTotals({ ...prev, ...updates });
      try {
        localStorage.setItem(`${INVOICE_STORAGE_KEY}_${initialType}`, JSON.stringify(updated));
      } catch (e) {
        console.error("Failed to save draft", e);
      }
      return updated;
    });
  };

  const addItem = () => {
    const newItem: InvoiceItem = {
      id: `item-${Date.now()}`,
      description: "New Item / Service",
      quantity: 1,
      rate: 100,
      amount: 100,
    };
    updateInvoice({ items: [...invoice.items, newItem] });
  };

  const updateItem = (id: string, updates: Partial<InvoiceItem>) => {
    const updatedItems = invoice.items.map((item) =>
      item.id === id ? { ...item, ...updates } : item
    );
    updateInvoice({ items: updatedItems });
  };

  const removeItem = (id: string) => {
    if (invoice.items.length <= 1) return;
    const updatedItems = invoice.items.filter((item) => item.id !== id);
    updateInvoice({ items: updatedItems });
  };

  const resetInvoice = () => {
    let freshData = DEFAULT_INVOICE_DATA;
    if (initialType === "bill") freshData = DEFAULT_BILL_DATA;
    if (initialType === "receipt") freshData = DEFAULT_RECEIPT_DATA;

    const fresh = {
      ...freshData,
      id: `${initialType}-${Date.now()}`,
      invoiceNumber: `${initialType.toUpperCase().slice(0, 3)}-${Date.now().toString().slice(-4)}`,
      issueDate: new Date().toISOString().split("T")[0],
    };
    setInvoice(fresh);
    localStorage.setItem(`${INVOICE_STORAGE_KEY}_${initialType}`, JSON.stringify(fresh));
  };

  return {
    invoice,
    isLoaded,
    updateInvoice,
    addItem,
    updateItem,
    removeItem,
    resetInvoice,
  };
}

/**
 * Generate CSV / Excel format of the active invoice
 */
export function exportInvoiceToCSV(invoice: InvoiceData) {
  const metaRows = [
    ["DOCUMENT TYPE", invoice.type.toUpperCase()],
    ["DOCUMENT NUMBER", invoice.invoiceNumber],
    ["ISSUE DATE", invoice.issueDate],
    ["DUE DATE", invoice.dueDate],
    ["STATUS", invoice.status.toUpperCase()],
    ["CURRENCY", invoice.currency],
    [],
    ["FROM (SENDER)", invoice.sender.name],
    ["SENDER EMAIL", invoice.sender.email],
    ["SENDER PHONE", invoice.sender.phone],
    ["SENDER ADDRESS", `${invoice.sender.address}, ${invoice.sender.cityStateZip}`],
    ["SENDER TAX ID", invoice.sender.taxId || ""],
    [],
    ["BILL TO (CLIENT)", invoice.client.name],
    ["CLIENT EMAIL", invoice.client.email],
    ["CLIENT PHONE", invoice.client.phone],
    ["CLIENT ADDRESS", `${invoice.client.address}, ${invoice.client.cityStateZip}`],
    ["CLIENT TAX ID", invoice.client.taxId || ""],
    [],
    ["LINE ITEMS"],
    ["Description", "Quantity", "Unit Rate ($)", "Total Amount ($)"],
  ];

  const itemRows = invoice.items.map((item) => [
    `"${item.description.replace(/"/g, '""')}"`,
    item.quantity,
    item.rate.toFixed(2),
    item.amount.toFixed(2),
  ]);

  const summaryRows = [
    [],
    ["SUBTOTAL", "", "", invoice.subtotal.toFixed(2)],
    [`DISCOUNT (${invoice.discountType === "percentage" ? `${invoice.discountValue}%` : "Fixed"})`, "", "", `-${invoice.discountAmount.toFixed(2)}`],
    [`TAX (${invoice.taxRate}%)`, "", "", invoice.taxAmount.toFixed(2)],
    ["SHIPPING", "", "", invoice.shipping.toFixed(2)],
    ["GRAND TOTAL", "", "", invoice.total.toFixed(2)],
    ["AMOUNT PAID", "", "", invoice.amountPaid.toFixed(2)],
    ["BALANCE DUE", "", "", invoice.balanceDue.toFixed(2)],
    [],
    ["NOTES", `"${(invoice.notes || "").replace(/"/g, '""')}"`],
    ["TERMS", `"${(invoice.terms || "").replace(/"/g, '""')}"`],
  ];

  const allRows = [...metaRows, ...itemRows, ...summaryRows];
  const csvContent =
    "data:text/csv;charset=utf-8," + allRows.map((e) => e.join(",")).join("\n");
  const encodedUri = encodeURI(csvContent);
  const link = document.createElement("a");
  link.setAttribute("href", encodedUri);
  link.setAttribute("download", `${invoice.invoiceNumber.toLowerCase() || "invoice"}.csv`);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

/**
 * Generate and download PDF from backend API route
 */
export async function downloadInvoicePDF(
  invoice: InvoiceData
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch("/api/generate-invoice-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoice),
    });

    if (!res.ok) {
      throw new Error(`Server PDF generation failed with status ${res.status}`);
    }

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    const docType = (invoice.type || "invoice").toLowerCase();
    const num = invoice.invoiceNumber ? invoice.invoiceNumber.replace(/[^a-zA-Z0-9-_]/g, "_") : "document";
    a.download = `${docType}-${num}.pdf`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
    return { success: true };
  } catch (err: any) {
    console.error("Backend PDF generation error:", err);
    return { success: false, error: err?.message || "Failed to download PDF" };
  }
}

/**
 * Server-side high-resolution PDF print:
 * Generates PDF on the server and prints ONLY the isolated document with zero web page clutter
 */
export async function printInvoicePDF(
  invoice: InvoiceData
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch("/api/generate-invoice-pdf", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(invoice),
    });

    if (!res.ok) {
      throw new Error(`Server PDF generation failed with status ${res.status}`);
    }

    const blob = await res.blob();
    const blobUrl = window.URL.createObjectURL(blob);

    // Create a hidden iframe for isolated PDF printing
    const iframe = document.createElement("iframe");
    iframe.style.position = "fixed";
    iframe.style.top = "-9999px";
    iframe.style.left = "-9999px";
    iframe.style.width = "1px";
    iframe.style.height = "1px";
    iframe.style.opacity = "0";
    iframe.style.pointerEvents = "none";
    iframe.src = blobUrl;

    document.body.appendChild(iframe);

    let printed = false;
    const triggerPrint = () => {
      if (printed) return;
      printed = true;
      try {
        iframe.contentWindow?.focus();
        iframe.contentWindow?.print();
      } catch (e) {
        // Fallback: Open in dedicated print popup window
        const printWin = window.open(blobUrl, "_blank");
        if (printWin) {
          printWin.focus();
          printWin.print();
        }
      }

      // Cleanup after timeout
      setTimeout(() => {
        try {
          if (iframe.parentNode) {
            document.body.removeChild(iframe);
          }
          window.URL.revokeObjectURL(blobUrl);
        } catch (_) {}
      }, 60000);
    };

    iframe.onload = () => {
      setTimeout(triggerPrint, 300);
    };

    // Safety fallback trigger for browsers that don't emit load for PDF blobs
    setTimeout(triggerPrint, 1500);

    return { success: true };
  } catch (err: any) {
    console.error("Server-side print failed:", err);
    return { success: false, error: err?.message || "Failed to print PDF" };
  }
}

