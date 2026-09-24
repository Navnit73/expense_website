import { NextRequest, NextResponse } from "next/server";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import { InvoiceData } from "@/lib/invoice-engine/types";

// Helper function to extract exact image dimensions from base64 string to prevent stretching
function getImageDimensions(dataUrl: string): { width: number; height: number } | null {
  try {
    const base64Index = dataUrl.indexOf(";base64,");
    if (base64Index === -1) return null;
    const base64Data = dataUrl.slice(base64Index + 8);
    const buf = Buffer.from(base64Data, "base64");

    // PNG
    if (dataUrl.includes("image/png") && buf.length >= 24) {
      const width = buf.readUInt32BE(16);
      const height = buf.readUInt32BE(20);
      if (width > 0 && height > 0) return { width, height };
    }

    // JPEG
    if ((dataUrl.includes("image/jpeg") || dataUrl.includes("image/jpg")) && buf.length >= 4) {
      let offset = 2;
      while (offset < buf.length - 8) {
        if (buf[offset] === 0xff && (buf[offset + 1] === 0xc0 || buf[offset + 1] === 0xc2)) {
          const height = buf.readUInt16BE(offset + 5);
          const width = buf.readUInt16BE(offset + 7);
          if (width > 0 && height > 0) return { width, height };
        }
        offset++;
      }
    }

    return null;
  } catch {
    return null;
  }
}

// High-Contrast Design color palettes for PDF invoices
interface ThemePalette {
  primary: [number, number, number];
  primaryDark: [number, number, number];
  primaryLight: [number, number, number];
  ink: [number, number, number];
  inkSecondary: [number, number, number];
  inkMuted: [number, number, number];
  border: [number, number, number];
  borderStrong: [number, number, number];
  bgHead: [number, number, number];
}

const THEME_PALETTES: Record<string, ThemePalette> = {
  modern: {
    primary: [4, 120, 87], // Deep Emerald 700
    primaryDark: [6, 95, 70], // Emerald 800
    primaryLight: [209, 250, 229], // Emerald 100
    ink: [15, 23, 42], // Slate 900 (High Contrast)
    inkSecondary: [30, 41, 59], // Slate 800
    inkMuted: [71, 85, 105], // Slate 600
    border: [203, 213, 225], // Slate 300
    borderStrong: [148, 163, 184], // Slate 400
    bgHead: [241, 245, 249], // Slate 100
  },
  corporate: {
    primary: [29, 78, 216], // Deep Blue 700
    primaryDark: [30, 58, 138], // Blue 900
    primaryLight: [219, 234, 254], // Blue 100
    ink: [15, 23, 42],
    inkSecondary: [30, 41, 59],
    inkMuted: [71, 85, 105],
    border: [203, 213, 225],
    borderStrong: [148, 163, 184],
    bgHead: [241, 245, 249],
  },
  classic: {
    primary: [15, 23, 42], // Deep Charcoal / Slate 900
    primaryDark: [0, 0, 0],
    primaryLight: [228, 228, 231],
    ink: [15, 23, 42],
    inkSecondary: [39, 39, 42],
    inkMuted: [82, 82, 91],
    border: [212, 212, 216],
    borderStrong: [161, 161, 170],
    bgHead: [244, 244, 245],
  },
  creative: {
    primary: [109, 40, 217], // Deep Violet 700
    primaryDark: [91, 33, 182], // Violet 800
    primaryLight: [237, 233, 254], // Violet 100
    ink: [15, 23, 42],
    inkSecondary: [30, 41, 59],
    inkMuted: [71, 85, 105],
    border: [203, 213, 225],
    borderStrong: [148, 163, 184],
    bgHead: [241, 245, 249],
  },
  sunset: {
    primary: [194, 65, 12], // Deep Orange / Amber 700
    primaryDark: [154, 52, 18], // Orange 800
    primaryLight: [254, 215, 170], // Orange 100
    ink: [28, 25, 23],
    inkSecondary: [41, 37, 36],
    inkMuted: [87, 83, 78],
    border: [214, 211, 209],
    borderStrong: [168, 162, 158],
    bgHead: [245, 245, 244],
  },
  freelance: {
    primary: [14, 116, 144], // Deep Cyan 700
    primaryDark: [21, 94, 117], // Cyan 800
    primaryLight: [207, 250, 254], // Cyan 100
    ink: [15, 23, 42],
    inkSecondary: [30, 41, 59],
    inkMuted: [71, 85, 105],
    border: [203, 213, 225],
    borderStrong: [148, 163, 184],
    bgHead: [241, 245, 249],
  },
  thermal: {
    primary: [0, 0, 0],
    primaryDark: [0, 0, 0],
    primaryLight: [240, 240, 240],
    ink: [0, 0, 0],
    inkSecondary: [24, 24, 27],
    inkMuted: [60, 60, 60],
    border: [180, 180, 180],
    borderStrong: [100, 100, 100],
    bgHead: [245, 245, 245],
  },
};

export async function POST(req: NextRequest) {
  try {
    const data: InvoiceData = await req.json();

    if (!data || !data.invoiceNumber || !data.sender) {
      return NextResponse.json(
        { error: "Invalid invoice data provided" },
        { status: 400 }
      );
    }

    const docType = (data.type || "invoice").toUpperCase();
    const templateKey = data.template || "modern";
    const palette = THEME_PALETTES[templateKey] || THEME_PALETTES.modern;
    const isThermal = templateKey === "thermal" || data.type === "receipt";

    const sym = data.currencySymbol || "$";

    // Setup document
    const doc = isThermal
      ? new jsPDF({ orientation: "portrait", unit: "mm", format: [80, 220] })
      : new jsPDF({ orientation: "portrait", unit: "mm", format: "a4" });

    const pageWidth = doc.internal.pageSize.getWidth();
    const pageHeight = doc.internal.pageSize.getHeight();

    if (isThermal) {
      // ==========================================
      // THERMAL 80MM RECEIPT
      // ==========================================
      const margin = 6;
      let currentY = 10;

      doc.setFont("courier", "bold");
      doc.setFontSize(12);
      doc.setTextColor(0, 0, 0);
      doc.text(data.sender.name || "STORE / VENDOR", pageWidth / 2, currentY, {
        align: "center",
      });
      currentY += 4.5;

      doc.setFont("courier", "normal");
      doc.setFontSize(8);
      doc.setTextColor(40, 40, 40);

      if (data.sender.address) {
        doc.text(data.sender.address, pageWidth / 2, currentY, { align: "center" });
        currentY += 3.5;
      }
      if (data.sender.cityStateZip) {
        doc.text(data.sender.cityStateZip, pageWidth / 2, currentY, { align: "center" });
        currentY += 3.5;
      }
      if (data.sender.phone) {
        doc.text(`Tel: ${data.sender.phone}`, pageWidth / 2, currentY, { align: "center" });
        currentY += 3.5;
      }
      if (data.sender.taxId) {
        doc.text(data.sender.taxId, pageWidth / 2, currentY, { align: "center" });
        currentY += 3.5;
      }

      currentY += 1.5;
      doc.setLineDashPattern([1, 1], 0);
      doc.setDrawColor(120, 120, 120);
      doc.line(margin, currentY, pageWidth - margin, currentY);
      doc.setLineDashPattern([], 0);
      currentY += 4.5;

      doc.setFont("courier", "bold");
      doc.setFontSize(8.5);
      doc.setTextColor(0, 0, 0);
      doc.text(`${docType}: #${data.invoiceNumber}`, margin, currentY);
      doc.text(data.issueDate, pageWidth - margin, currentY, { align: "right" });
      currentY += 4;

      if (data.client.name) {
        doc.setFont("courier", "normal");
        doc.setFontSize(8);
        doc.text(`Cust: ${data.client.name}`, margin, currentY);
        currentY += 3.5;
      }

      const receiptRows = (data.items || []).map((item) => [
        item.description,
        String(item.quantity),
        `${sym}${item.rate.toFixed(2)}`,
        `${sym}${item.amount.toFixed(2)}`,
      ]);

      autoTable(doc, {
        startY: currentY,
        head: [["Item", "Qty", "Price", "Total"]],
        body: receiptRows,
        margin: { left: margin, right: margin },
        theme: "plain",
        styles: { font: "courier", fontSize: 7.5, cellPadding: 1.5, textColor: [0, 0, 0] },
        headStyles: { fontStyle: "bold", textColor: [0, 0, 0] },
        columnStyles: {
          0: { cellWidth: "auto" },
          1: { cellWidth: 9, halign: "center" },
          2: { cellWidth: 16, halign: "right" },
          3: { cellWidth: 17, halign: "right", fontStyle: "bold" },
        },
      });

      // @ts-expect-error - jspdf-autotable extends jsPDF
      currentY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 3 : currentY + 30;

      doc.setLineDashPattern([1, 1], 0);
      doc.line(margin, currentY, pageWidth - margin, currentY);
      doc.setLineDashPattern([], 0);
      currentY += 3.5;

      const renderReceiptTotal = (lbl: string, val: string, isBold = false) => {
        doc.setFont("courier", isBold ? "bold" : "normal");
        doc.setFontSize(isBold ? 9.5 : 8);
        doc.setTextColor(0, 0, 0);
        doc.text(lbl, margin, currentY);
        doc.text(val, pageWidth - margin, currentY, { align: "right" });
        currentY += isBold ? 5.5 : 4;
      };

      renderReceiptTotal("Subtotal:", `${sym}${data.subtotal.toFixed(2)}`);
      if (data.discountAmount > 0) renderReceiptTotal("Discount:", `-${sym}${data.discountAmount.toFixed(2)}`);
      if (data.taxAmount > 0) renderReceiptTotal(`Tax (${data.taxRate}%):`, `${sym}${data.taxAmount.toFixed(2)}`);
      if (data.shipping > 0) renderReceiptTotal("Shipping:", `${sym}${data.shipping.toFixed(2)}`);

      doc.setDrawColor(0, 0, 0);
      doc.setLineWidth(0.35);
      doc.line(margin, currentY, pageWidth - margin, currentY);
      currentY += 3;

      renderReceiptTotal("TOTAL:", `${sym}${data.total.toFixed(2)}`, true);

      if (data.paymentMethod) {
        doc.setFont("courier", "normal");
        doc.setFontSize(7.5);
        doc.setTextColor(40, 40, 40);
        doc.text(`Paid via: ${data.paymentMethod}`, margin, currentY);
        currentY += 3.5;
      }

      currentY += 4;
      doc.setFont("courier", "normal");
      doc.setFontSize(7);
      doc.setTextColor(60, 60, 60);
      doc.text("*** THANK YOU FOR YOUR BUSINESS ***", pageWidth / 2, currentY, {
        align: "center",
      });
      currentY += 3;
      doc.text("Expenseliy POS Engine", pageWidth / 2, currentY, { align: "center" });
    } else {
      // ==========================================
      // HIGH-CONTRAST EXECUTIVE INVOICE
      // ==========================================
      const margin = 20;
      const contentWidth = pageWidth - margin * 2;
      let currentY = 20;

      // 1. TOP HEADER SECTION
      // Left: Company Logo (With aspect-ratio preservation) or Styled Business Name
      let logoHeightUsed = 0;
      if (data.sender.logoUrl && data.sender.logoUrl.startsWith("data:image")) {
        try {
          const imgType = data.sender.logoUrl.includes("image/png") ? "PNG" : "JPEG";
          const dims = getImageDimensions(data.sender.logoUrl);

          const maxBoxW = 42; // mm
          const maxBoxH = 15; // mm

          let renderW = maxBoxW;
          let renderH = maxBoxH;

          if (dims && dims.width > 0 && dims.height > 0) {
            const aspect = dims.width / dims.height;
            if (aspect > maxBoxW / maxBoxH) {
              renderW = maxBoxW;
              renderH = maxBoxW / aspect;
            } else {
              renderH = maxBoxH;
              renderW = maxBoxH * aspect;
            }
          } else {
            // Default 2:1 ratio fallback
            renderW = 32;
            renderH = 12;
          }

          doc.addImage(data.sender.logoUrl, imgType, margin, currentY, renderW, renderH, undefined, "FAST");
          logoHeightUsed = renderH + 7; // Generous bottom padding after logo
        } catch (logoErr) {
          console.warn("Could not render logo in PDF", logoErr);
        }
      }

      const companyTextY = currentY + logoHeightUsed;
      doc.setFont("helvetica", "bold");
      doc.setFontSize(14.5);
      doc.setTextColor(palette.ink[0], palette.ink[1], palette.ink[2]);
      doc.text(data.sender.name || "Your Business Name", margin, companyTextY);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(palette.inkSecondary[0], palette.inkSecondary[1], palette.inkSecondary[2]);

      let senderY = companyTextY + 5;
      if (data.sender.address) {
        doc.text(data.sender.address, margin, senderY);
        senderY += 4;
      }
      if (data.sender.cityStateZip) {
        doc.text(data.sender.cityStateZip, margin, senderY);
        senderY += 4;
      }
      if (data.sender.email || data.sender.phone) {
        const contactLine = [data.sender.email, data.sender.phone].filter(Boolean).join("  •  ");
        doc.text(contactLine, margin, senderY);
        senderY += 4;
      }
      if (data.sender.taxId) {
        doc.setFont("helvetica", "bold");
        doc.setTextColor(palette.ink[0], palette.ink[1], palette.ink[2]);
        doc.text(data.sender.taxId, margin, senderY);
        senderY += 4;
      }

      // Right: Document Title & Metadata
      const rightX = pageWidth - margin;
      let rightY = currentY;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(22);
      doc.setTextColor(palette.primary[0], palette.primary[1], palette.primary[2]);
      doc.text(docType, rightX, rightY + 3, { align: "right" });
      rightY += 8;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      doc.setTextColor(palette.ink[0], palette.ink[1], palette.ink[2]);
      doc.text(`#${data.invoiceNumber}`, rightX, rightY + 2, { align: "right" });
      rightY += 6;

      // Metadata Table (Right Aligned, High Contrast)
      const renderRightMetaRow = (label: string, value: string) => {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8.5);
        doc.setTextColor(palette.inkMuted[0], palette.inkMuted[1], palette.inkMuted[2]);
        doc.text(label, rightX - 35, rightY, { align: "right" });

        doc.setFont("helvetica", "bold");
        doc.setTextColor(palette.ink[0], palette.ink[1], palette.ink[2]);
        doc.text(value, rightX, rightY, { align: "right" });
        rightY += 4.5;
      };

      if (data.referenceNumber) {
        renderRightMetaRow("PO / Ref:", data.referenceNumber);
      }
      renderRightMetaRow("Issue Date:", data.issueDate);
      if (data.type !== "receipt" && data.dueDate) {
        renderRightMetaRow("Due Date:", data.dueDate);
      }

      // Status Tag (High Contrast Border & Text)
      const statusText = (data.status || "SENT").toUpperCase();
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      const statusWidth = doc.getTextWidth(statusText) + 8;
      const statusX = rightX - statusWidth;

      if (data.status === "paid") {
        doc.setFillColor(209, 250, 229); // Emerald 100
        doc.setDrawColor(5, 150, 105);
        doc.setTextColor(6, 95, 70); // Emerald 800
      } else if (data.status === "pending" || data.status === "draft") {
        doc.setFillColor(254, 243, 199); // Amber 100
        doc.setDrawColor(217, 119, 6);
        doc.setTextColor(146, 64, 14); // Amber 800
      } else {
        doc.setFillColor(224, 231, 255); // Indigo 100
        doc.setDrawColor(99, 102, 241);
        doc.setTextColor(30, 27, 75); // Indigo 900
      }

      doc.setLineWidth(0.2);
      doc.roundedRect(statusX, rightY - 1, statusWidth, 5, 1, 1, "FD");
      doc.text(statusText, statusX + 4, rightY + 2.6);

      currentY = Math.max(senderY, rightY + 7) + 6;

      // 2. HAIRLINE DIVIDER (Stronger Contrast)
      doc.setDrawColor(palette.border[0], palette.border[1], palette.border[2]);
      doc.setLineWidth(0.3);
      doc.line(margin, currentY, pageWidth - margin, currentY);
      currentY += 7;

      // 3. BILLED TO SECTION (High Contrast)
      const billToY = currentY;

      doc.setFont("helvetica", "bold");
      doc.setFontSize(8);
      doc.setTextColor(palette.inkMuted[0], palette.inkMuted[1], palette.inkMuted[2]);
      doc.text(
        data.type === "receipt" ? "CUSTOMER" : "BILLED TO",
        margin,
        billToY
      );

      // Client Name
      doc.setFont("helvetica", "bold");
      doc.setFontSize(11);
      doc.setTextColor(palette.ink[0], palette.ink[1], palette.ink[2]);
      doc.text(data.client.name || "Client Name", margin, billToY + 5);

      // Client Details
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8.5);
      doc.setTextColor(palette.inkSecondary[0], palette.inkSecondary[1], palette.inkSecondary[2]);

      let clientY = billToY + 9;
      if (data.client.address) {
        doc.text(data.client.address, margin, clientY);
        clientY += 4;
      }
      if (data.client.cityStateZip) {
        doc.text(data.client.cityStateZip, margin, clientY);
        clientY += 4;
      }
      if (data.client.email || data.client.phone) {
        const clientContact = [data.client.email, data.client.phone].filter(Boolean).join("  •  ");
        doc.text(clientContact, margin, clientY);
        clientY += 4;
      }
      if (data.client.taxId) {
        doc.setFont("helvetica", "bold");
        doc.setTextColor(palette.ink[0], palette.ink[1], palette.ink[2]);
        doc.text(data.client.taxId, margin, clientY);
        clientY += 4;
      }

      currentY = clientY + 5;

      // 4. LINE ITEMS TABLE (High Contrast Headers & Borders)
      const tableHeaders = [["ITEM & DESCRIPTION", "QTY", "RATE", "AMOUNT"]];
      const tableRows = (data.items || []).map((item) => [
        item.description || "Service or Item Description",
        String(item.quantity || 1),
        `${sym}${(item.rate || 0).toFixed(2)}`,
        `${sym}${(item.amount || 0).toFixed(2)}`,
      ]);

      autoTable(doc, {
        startY: currentY,
        head: tableHeaders,
        body: tableRows,
        margin: { left: margin, right: margin },
        theme: "plain",
        headStyles: {
          fillColor: [palette.bgHead[0], palette.bgHead[1], palette.bgHead[2]],
          textColor: [palette.ink[0], palette.ink[1], palette.ink[2]],
          fontStyle: "bold",
          fontSize: 8,
          cellPadding: { top: 4, bottom: 4, left: 3, right: 3 },
        },
        bodyStyles: {
          textColor: [palette.ink[0], palette.ink[1], palette.ink[2]],
          fontSize: 8.5,
          cellPadding: { top: 4.5, bottom: 4.5, left: 3, right: 3 },
        },
        columnStyles: {
          0: { cellWidth: "auto", fontStyle: "bold" },
          1: { cellWidth: 20, halign: "center" },
          2: { cellWidth: 28, halign: "right" },
          3: { cellWidth: 30, halign: "right", fontStyle: "bold" },
        },
        alternateRowStyles: {
          fillColor: [250, 250, 252],
        },
        tableLineColor: [palette.border[0], palette.border[1], palette.border[2]],
        tableLineWidth: 0.2,
      });

      // @ts-expect-error - jspdf-autotable extends jsPDF
      const finalTableY = doc.lastAutoTable ? doc.lastAutoTable.finalY + 6 : currentY + 50;

      // 5. TOTALS & SUMMARY SECTION (High Contrast)
      const totalsWidth = 74;
      const totalsStartX = pageWidth - margin - totalsWidth;
      let totalsY = finalTableY;

      const renderTotalLine = (label: string, value: string, isBold = false) => {
        doc.setFont("helvetica", isBold ? "bold" : "normal");
        doc.setFontSize(8.5);
        doc.setTextColor(
          isBold ? palette.ink[0] : palette.inkSecondary[0],
          isBold ? palette.ink[1] : palette.inkSecondary[1],
          isBold ? palette.ink[2] : palette.inkSecondary[2]
        );
        doc.text(label, totalsStartX, totalsY);
        doc.setFont("helvetica", "bold");
        doc.setTextColor(palette.ink[0], palette.ink[1], palette.ink[2]);
        doc.text(value, pageWidth - margin, totalsY, { align: "right" });
        totalsY += 5;
      };

      renderTotalLine("Subtotal:", `${sym}${data.subtotal.toFixed(2)}`);

      if (data.discountAmount > 0) {
        renderTotalLine(
          `Discount (${data.discountType === "percentage" ? `${data.discountValue}%` : "Fixed"}):`,
          `-${sym}${data.discountAmount.toFixed(2)}`
        );
      }

      if (data.taxAmount > 0) {
        renderTotalLine(`Tax (${data.taxRate}%):`, `+${sym}${data.taxAmount.toFixed(2)}`);
      }

      if (data.shipping > 0) {
        renderTotalLine("Shipping:", `+${sym}${data.shipping.toFixed(2)}`);
      }

      // Divider Line above Total
      totalsY += 1;
      doc.setDrawColor(palette.borderStrong[0], palette.borderStrong[1], palette.borderStrong[2]);
      doc.setLineWidth(0.35);
      doc.line(totalsStartX, totalsY, pageWidth - margin, totalsY);
      totalsY += 5.5;

      // Grand Total Row (Large, bold, high contrast)
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10.5);
      doc.setTextColor(palette.ink[0], palette.ink[1], palette.ink[2]);
      doc.text("Total Amount:", totalsStartX, totalsY);

      doc.setFontSize(14);
      doc.setTextColor(palette.primary[0], palette.primary[1], palette.primary[2]);
      doc.text(`${sym}${data.total.toFixed(2)}`, pageWidth - margin, totalsY, {
        align: "right",
      });
      totalsY += 6.5;

      if (data.amountPaid > 0) {
        renderTotalLine("Amount Paid:", `${sym}${data.amountPaid.toFixed(2)}`);
        doc.setFont("helvetica", "bold");
        doc.setFontSize(9);
        doc.setTextColor(190, 18, 60); // Rose 700
        doc.text("Balance Due:", totalsStartX, totalsY);
        doc.text(`${sym}${data.balanceDue.toFixed(2)}`, pageWidth - margin, totalsY, {
          align: "right",
        });
        totalsY += 5.5;
      }

      // 6. LEFT COLUMN: PAYMENT INSTRUCTIONS & NOTES (High Contrast)
      let leftY = finalTableY;
      const leftColWidth = contentWidth - totalsWidth - 16;

      if (data.paymentInstructions || data.paymentMethod) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor(palette.inkMuted[0], palette.inkMuted[1], palette.inkMuted[2]);
        doc.text("PAYMENT INSTRUCTIONS", margin, leftY);
        leftY += 4;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(palette.inkSecondary[0], palette.inkSecondary[1], palette.inkSecondary[2]);

        if (data.paymentMethod) {
          doc.text(`Method: ${data.paymentMethod}`, margin, leftY);
          leftY += 4;
        }
        if (data.paymentInstructions) {
          const splitInst = doc.splitTextToSize(data.paymentInstructions, leftColWidth);
          doc.text(splitInst.slice(0, 3), margin, leftY);
          leftY += splitInst.slice(0, 3).length * 3.8;
        }
        leftY += 3;
      }

      if (data.notes) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor(palette.inkMuted[0], palette.inkMuted[1], palette.inkMuted[2]);
        doc.text("NOTES", margin, leftY);
        leftY += 4;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(8);
        doc.setTextColor(palette.inkSecondary[0], palette.inkSecondary[1], palette.inkSecondary[2]);
        const splitNotes = doc.splitTextToSize(data.notes, leftColWidth);
        doc.text(splitNotes.slice(0, 3), margin, leftY);
        leftY += splitNotes.slice(0, 3).length * 3.8 + 3;
      }

      if (data.terms) {
        doc.setFont("helvetica", "bold");
        doc.setFontSize(8);
        doc.setTextColor(palette.inkMuted[0], palette.inkMuted[1], palette.inkMuted[2]);
        doc.text("TERMS & CONDITIONS", margin, leftY);
        leftY += 4;

        doc.setFont("helvetica", "normal");
        doc.setFontSize(7.5);
        doc.setTextColor(palette.inkSecondary[0], palette.inkSecondary[1], palette.inkSecondary[2]);
        const splitTerms = doc.splitTextToSize(data.terms, leftColWidth);
        doc.text(splitTerms.slice(0, 3), margin, leftY);
      }

      // 7. ELEGANT FOOTER (High Contrast)
      const footerY = pageHeight - 14;
      doc.setDrawColor(palette.border[0], palette.border[1], palette.border[2]);
      doc.setLineWidth(0.25);
      doc.line(margin, footerY - 4, pageWidth - margin, footerY - 4);

      doc.setFont("helvetica", "normal");
      doc.setFontSize(7.5);
      doc.setTextColor(palette.inkMuted[0], palette.inkMuted[1], palette.inkMuted[2]);
      doc.text(
        "Thank you for your business  •  Expenseliy Invoice Studio  •  www.expenseliy.com",
        pageWidth / 2,
        footerY,
        { align: "center" }
      );
    }

    // Output PDF ArrayBuffer
    const pdfOutput = doc.output("arraybuffer");
    const filename = `${docType.toLowerCase()}-${data.invoiceNumber || "document"}.pdf`;

    return new NextResponse(pdfOutput, {
      status: 200,
      headers: {
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename="${filename}"`,
        "Content-Length": String(pdfOutput.byteLength),
      },
    });
  } catch (err: unknown) {
    console.error("Failed to generate invoice PDF:", err);
    return NextResponse.json(
      { error: "Internal Server Error during PDF generation" },
      { status: 500 }
    );
  }
}
