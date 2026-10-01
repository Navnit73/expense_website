"use client";

import React, { useState } from "react";
import {
  FileSpreadsheet,
  Download,
  Copy,
  Check,
  RotateCcw,
  Sparkles,
  ShieldCheck,
  Trash2,
} from "lucide-react";

interface ParsedTx {
  date: string;
  description: string;
  amount: string;
  type: "debit" | "credit";
}

const SAMPLE_RAW_TEXT = `03/15/2026  FIGMA MONTHLY SUBSCRIPTION     -15.00
03/14/2026  STRIPE PAYOUT MERCHANT TRANSFER  +2450.00
03/12/2026  UBER TRIP SAN FRANCISCO        -34.20
03/10/2026  AMAZON AWS CLOUD SERVERS       -142.50
03/08/2026  OFFICE DEPOT SUPPLIES          -56.12
03/05/2026  CLIENT INVOICE #1042 WIRE      +3800.00`;

export function BankStatementCsvFormatter({ className = "" }: { className?: string }) {
  const [rawText, setRawText] = useState(SAMPLE_RAW_TEXT);
  const [parsedRows, setParsedRows] = useState<ParsedTx[]>([]);
  const [copied, setCopied] = useState(false);

  const handleParse = (textToParse: string) => {
    const lines = textToParse.split("\n").filter((l) => l.trim().length > 0);
    const results: ParsedTx[] = [];

    for (const line of lines) {
      // Regex heuristics for date (MM/DD/YYYY or YYYY-MM-DD), description, and amount (-$XX.XX or +$XX.XX)
      const dateMatch = line.match(/(\d{1,4}[-/.]\d{1,2}[-/.]\d{2,4})/);
      const amountMatch = line.match(/([+-]?\$?\d+(?:,\d{3})*(?:\.\d{2})?)/g);

      if (dateMatch) {
        const date = dateMatch[1];
        let amount = "0.00";
        let type: "debit" | "credit" = "debit";

        if (amountMatch && amountMatch.length > 0) {
          const lastNum = amountMatch[amountMatch.length - 1].replace("$", "").replace(",", "");
          const numVal = parseFloat(lastNum);
          if (!isNaN(numVal)) {
            type = numVal >= 0 && !line.includes("-") ? "credit" : "debit";
            amount = Math.abs(numVal).toFixed(2);
          }
        }

        // Clean description
        let desc = line.replace(date, "");
        if (amountMatch) {
          amountMatch.forEach((m) => {
            desc = desc.replace(m, "");
          });
        }
        desc = desc.trim().replace(/\s+/g, " ");

        results.push({
          date,
          description: desc || "Bank Transaction",
          amount,
          type,
        });
      }
    }

    setParsedRows(results);
  };

  React.useEffect(() => {
    handleParse(rawText);
  }, []);

  const handleDownloadCsv = () => {
    let csv = "Date,Description,Amount,Type\n";
    parsedRows.forEach((row) => {
      csv += `"${row.date}","${row.description.replace(/"/g, '""')}","${row.type === "debit" ? "-" : ""}${row.amount}","${row.type}"\n`;
    });

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "formatted_transactions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleCopyCsv = () => {
    let csv = "Date\tDescription\tAmount\tType\n";
    parsedRows.forEach((row) => {
      csv += `${row.date}\t${row.description}\t${row.type === "debit" ? "-" : ""}${row.amount}\t${row.type}\n`;
    });
    navigator.clipboard.writeText(csv);
    setCopied(true);
    setTimeout(() => setCopied(false), 2200);
  };

  return (
    <div className={`w-full rounded-2xl bg-surface border border-hairline shadow-sm overflow-hidden ${className}`}>
      {/* Header Bar */}
      <div className="p-6 md:p-8 bg-gradient-to-r from-sky-bg/30 via-surface to-surface border-b border-hairline">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-bg text-sky border border-sky-border">
                Client-Side Privacy Safe Parser
              </span>
              <span className="inline-flex items-center text-xs text-ink-muted">
                <ShieldCheck className="w-3.5 h-3.5 mr-1 text-income" /> 100% In-Browser (No Data Sent to Server)
              </span>
            </div>
            <h2 className="text-2xl font-bold text-ink tracking-tight">
              Bank Statement & PDF Transaction CSV Formatter
            </h2>
            <p className="text-sm text-ink-muted mt-1">
              Paste raw bank transactions or statement text to clean, standardize, and export into accounting-ready CSV files.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={handleCopyCsv}
              className="py-2 px-3 rounded-lg text-xs font-semibold bg-surface-raised hover:bg-surface border border-hairline text-ink flex items-center gap-1.5 cursor-pointer"
            >
              {copied ? <Check className="w-4 h-4 text-income" /> : <Copy className="w-4 h-4 text-ink-muted" />}
              {copied ? "Copied CSV!" : "Copy Table"}
            </button>
            <button
              onClick={handleDownloadCsv}
              className="py-2 px-4 rounded-lg text-xs font-semibold bg-sky hover:bg-sky/90 text-white flex items-center gap-1.5 cursor-pointer"
            >
              <Download className="w-4 h-4" /> Download Clean CSV
            </button>
          </div>
        </div>
      </div>

      {/* Body */}
      <div className="p-6 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Raw Text Input */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex justify-between items-center text-xs font-semibold text-ink">
            <label htmlFor="raw-statement-text">Paste Raw Bank Statement Text</label>
            <button
              onClick={() => {
                setRawText(SAMPLE_RAW_TEXT);
                handleParse(SAMPLE_RAW_TEXT);
              }}
              className="text-sky hover:underline cursor-pointer"
            >
              Load Sample Data
            </button>
          </div>

          <textarea
            id="raw-statement-text"
            rows={12}
            value={rawText}
            onChange={(e) => {
              setRawText(e.target.value);
              handleParse(e.target.value);
            }}
            placeholder="Paste raw bank text lines here..."
            className="w-full p-3.5 rounded-xl bg-surface-raised border border-hairline text-ink text-xs font-mono leading-relaxed focus:outline-none focus:ring-2 focus:ring-sky"
          />

          <p className="text-[11px] text-ink-muted">
            Automatically detects dates, merchants, and debit/credit amounts from bank statement copy-pastes.
          </p>
        </div>

        {/* Clean Formatted Table */}
        <div className="lg:col-span-6 space-y-4">
          <div className="flex justify-between items-center text-xs font-semibold text-ink">
            <span>Clean Formatted Transactions ({parsedRows.length})</span>
            <span className="text-income font-medium">Ready for Spreadsheet Import</span>
          </div>

          <div className="overflow-x-auto rounded-xl border border-hairline max-h-[380px] overflow-y-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-surface-raised text-ink-muted sticky top-0 border-b border-hairline">
                <tr>
                  <th className="py-2.5 px-3 font-semibold w-24">Date</th>
                  <th className="py-2.5 px-3 font-semibold">Description</th>
                  <th className="py-2.5 px-3 font-semibold w-24 text-right">Amount</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-hairline">
                {parsedRows.length === 0 ? (
                  <tr>
                    <td colSpan={3} className="py-8 text-center text-ink-muted">
                      Paste statement text on the left to view parsed rows.
                    </td>
                  </tr>
                ) : (
                  parsedRows.map((row, idx) => (
                    <tr key={idx} className="hover:bg-surface-raised/40">
                      <td className="py-2 px-3 font-mono text-ink-secondary">{row.date}</td>
                      <td className="py-2 px-3 font-medium text-ink">{row.description}</td>
                      <td className={`py-2 px-3 text-right font-semibold ${row.type === "credit" ? "text-income" : "text-ink"}`}>
                        {row.type === "credit" ? "+" : "-"}${row.amount}
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
