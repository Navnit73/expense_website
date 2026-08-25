"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { Container } from "@/components/marketing/Container";
import { Button } from "@/components/marketing/Button";
import { Badge } from "@/components/marketing/Badge";
import { RefreshCw, Home, Mail, AlertTriangle } from "lucide-react";

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({ error, reset }: ErrorProps) {
  useEffect(() => {
    // Optionally log error details to an external logging service
    console.error("Expenseliy Client Error:", error);
  }, [error]);

  return (
    <div className="flex flex-col flex-1 items-center justify-center py-16 sm:py-24 bg-canvas">
      <Container size="narrow">
        <div className="bg-surface border border-hairline-strong rounded-md p-8 sm:p-12 text-center flex flex-col items-center max-w-2xl mx-auto">
          {/* Brand Mark & 500 Badge */}
          <div className="flex items-center gap-3 mb-6">
            <Image
              src="/favicon.ico"
              alt="Expenseliy Logo"
              width={36}
              height={36}
              className="rounded-md shrink-0"
              priority
            />
            <Badge variant="warning" size="sm">
              Server Error 500
            </Badge>
          </div>

          <div className="w-12 h-12 rounded-md bg-warning-bg border border-warning-border flex items-center justify-center text-warning mb-4">
            <AlertTriangle className="w-6 h-6" aria-hidden="true" />
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-ink tracking-tight mb-3">
            Something Went Wrong
          </h1>

          <p className="text-sm sm:text-base text-ink-secondary leading-relaxed max-w-md mb-6">
            An unexpected server error occurred while processing your request. Our technical team
            has been notified.
          </p>

          {error.digest && (
            <div className="mb-8 px-3 py-1.5 rounded-md bg-canvas border border-hairline font-mono text-[11px] text-ink-muted">
              Error Digest: <code>{error.digest}</code>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 w-full sm:w-auto mb-8">
            <Button onClick={() => reset()} variant="primary" size="md" className="w-full sm:w-auto">
              <RefreshCw className="w-4 h-4" aria-hidden="true" />
              <span>Try Again</span>
            </Button>
            <Button href="/" variant="secondary" size="md" className="w-full sm:w-auto">
              <Home className="w-4 h-4" aria-hidden="true" />
              <span>Return to Homepage</span>
            </Button>
          </div>

          {/* Support Link */}
          <div className="border-t border-hairline pt-6 w-full text-center text-xs text-ink-muted">
            <p className="mb-2">Need immediate assistance with your account or billing?</p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-1.5 font-medium text-primary hover:underline"
            >
              <Mail className="w-3.5 h-3.5" aria-hidden="true" />
              <span>Contact Support Team</span>
            </Link>
          </div>
        </div>
      </Container>
    </div>
  );
}
