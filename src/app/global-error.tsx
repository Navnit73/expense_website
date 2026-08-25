"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { RefreshCw, Home, AlertTriangle } from "lucide-react";
import "./globals.css";

interface GlobalErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GlobalError({ error, reset }: GlobalErrorProps) {
  useEffect(() => {
    console.error("Expenseliy Global Error:", error);
  }, [error]);

  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col items-center justify-center bg-[#f6f5f4] dark:bg-[#0e1714] text-[#111c18] dark:text-[#f4f9f6] p-4 font-sans antialiased">
        <div className="w-full max-w-lg bg-white dark:bg-[#15221e] border border-[#e2ede8] dark:border-[#223730] rounded-md p-8 text-center flex flex-col items-center">
          {/* Logo & Error Icon */}
          <div className="flex items-center gap-3 mb-6">
            <Image
              src="/favicon.ico"
              alt="Expenseliy Logo"
              width={36}
              height={36}
              className="rounded-md shrink-0"
              priority
            />
            <span className="px-2.5 py-1 rounded-md text-xs font-mono font-bold bg-[#fffbeb] dark:bg-[#332403] text-[#d97706] border border-[#fde68a] dark:border-[#5e4308]">
              Critical Error 500
            </span>
          </div>

          <div className="w-12 h-12 rounded-md bg-[#fffbeb] dark:bg-[#332403] border border-[#fde68a] dark:border-[#5e4308] flex items-center justify-center text-[#d97706] mb-4">
            <AlertTriangle className="w-6 h-6" aria-hidden="true" />
          </div>

          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3 text-[#111c18] dark:text-[#f4f9f6]">
            Application Error
          </h1>

          <p className="text-sm text-[#2d3e38] dark:text-[#d1e4dc] leading-relaxed mb-6">
            A critical error occurred while rendering the page. You can try refreshing the application
            or returning to the homepage.
          </p>

          {error.digest && (
            <div className="mb-6 px-3 py-1.5 rounded-md bg-[#f6f5f4] dark:bg-[#0e1714] border border-[#e2ede8] dark:border-[#223730] font-mono text-[11px] text-[#526e63]">
              Digest: <code>{error.digest}</code>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto">
            <button
              onClick={() => reset()}
              type="button"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium bg-[#00874C] hover:bg-[#006e3d] text-white transition-colors cursor-pointer w-full sm:w-auto"
            >
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              <span>Try Again</span>
            </button>
            <Link
              href="/"
              className="inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-md text-sm font-medium bg-white dark:bg-[#15221e] hover:bg-[#f6f5f4] dark:hover:bg-[#1c2d28] border border-[#c8ded5] dark:border-[#2f4b42] text-[#111c18] dark:text-[#f4f9f6] transition-colors w-full sm:w-auto"
            >
              <Home className="w-4 h-4" aria-hidden="true" />
              <span>Homepage</span>
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
