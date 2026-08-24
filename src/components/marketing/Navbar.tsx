"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, X, ArrowUpRight, TrendingUp } from "lucide-react";
import { Container } from "./Container";
import { Button } from "./Button";
import { ThemeToggle } from "./ThemeToggle";

const NAV_LINKS = [
  { name: "Features", href: "/features" },
  { name: "How It Works", href: "/how-it-works" },
  { name: "Pricing", href: "/pricing" },
  { name: "Guide", href: "/guide" },
];

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 w-full bg-surface/95 backdrop-blur-sm border-b border-hairline">
      <Container size="default">
        <div className="flex h-16 items-center justify-between gap-4">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2.5 font-bold text-lg text-ink hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary rounded-md px-1 py-0.5"
            id="navbar-brand-logo"
            aria-label="Expenseliy Home"
          >
            <div className="w-8 h-8 rounded-md bg-primary text-white flex items-center justify-center font-extrabold text-base border border-primary">
              <TrendingUp className="w-4 h-4 text-white stroke-[2.5]" aria-hidden="true" />
            </div>
            <span className="tracking-tight text-xl font-bold">
              Expense<span className="text-primary">liy</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav
            className="hidden md:flex items-center gap-1 lg:gap-2"
            aria-label="Main Navigation"
          >
            {NAV_LINKS.map((link) => {
              const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className={`px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                    isActive
                      ? "text-primary bg-homepage-mintcream dark:bg-surface-raised font-semibold"
                      : "text-ink-secondary hover:text-ink hover:bg-canvas"
                  }`}
                  id={`nav-link-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                >
                  {link.name}
                </Link>
              );
            })}
          </nav>

          {/* Desktop Right Actions (Theme, Sign In, Get Started) */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle />
            <Button
              href="https://app.expenseliy.com/login"
              variant="ghost"
              size="sm"
              id="navbar-signin-btn"
            >
              Sign In
            </Button>
            <Button
              href="https://app.expenseliy.com/signup"
              variant="primary"
              size="sm"
              id="navbar-getstarted-btn"
            >
              <span>Get Started</span>
              <ArrowUpRight className="w-3.5 h-3.5" aria-hidden="true" />
            </Button>
          </div>

          {/* Mobile Right Controls */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle />
            <button
              type="button"
              id="navbar-mobile-menu-btn"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md border border-hairline bg-surface text-ink hover:bg-surface-raised focus-visible:outline-2 focus-visible:outline-primary"
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation-menu"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" aria-hidden="true" />
              ) : (
                <Menu className="w-5 h-5" aria-hidden="true" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div
            id="mobile-navigation-menu"
            className="md:hidden border-t border-hairline py-4 bg-surface"
          >
            <nav className="flex flex-col gap-1 px-1 pb-4" aria-label="Mobile Navigation">
              {NAV_LINKS.map((link) => {
                const isActive = pathname === link.href || (link.href !== "/" && pathname?.startsWith(link.href));
                return (
                  <Link
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`px-4 py-2.5 text-base font-medium rounded-md transition-colors ${
                      isActive
                        ? "text-primary bg-homepage-mintcream dark:bg-surface-raised font-semibold"
                        : "text-ink-secondary hover:text-ink hover:bg-canvas"
                    }`}
                    id={`mobile-nav-${link.name.toLowerCase().replace(/\s+/g, "-")}`}
                  >
                    {link.name}
                  </Link>
                );
              })}
            </nav>
            <div className="flex flex-col gap-2 pt-3 border-t border-hairline px-1">
              <Button
                href="https://app.expenseliy.com/login"
                variant="secondary"
                size="md"
                className="w-full justify-center"
                id="mobile-signin-btn"
              >
                Sign In
              </Button>
              <Button
                href="https://app.expenseliy.com/signup"
                variant="primary"
                size="md"
                className="w-full justify-center"
                id="mobile-getstarted-btn"
              >
                <span>Get Started Free</span>
                <ArrowUpRight className="w-4 h-4" aria-hidden="true" />
              </Button>
            </div>
          </div>
        )}
      </Container>
    </header>
  );
}
