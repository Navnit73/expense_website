"use client";

import React, { useSyncExternalStore } from "react";
import { Sun, Moon } from "lucide-react";

function subscribe(callback: () => void) {
  window.addEventListener("storage", callback);
  const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
  mediaQuery.addEventListener("change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    mediaQuery.removeEventListener("change", callback);
  };
}

function getSnapshot() {
  if (typeof window === "undefined") return false;
  const stored = localStorage.getItem("expenseliy_theme");
  if (stored) {
    return stored === "dark";
  }
  return window.matchMedia("(prefers-color-scheme: dark)").matches;
}

function getServerSnapshot() {
  return false;
}

export function ThemeToggle({ className = "" }: { className?: string }) {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggleTheme = () => {
    const nextDark = !isDark;
    if (nextDark) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("expenseliy_theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("expenseliy_theme", "light");
    }
    window.dispatchEvent(new Event("storage"));
  };

  return (
    <button
      onClick={toggleTheme}
      type="button"
      id="theme-toggle-button"
      className={`inline-flex items-center justify-center w-9 h-9 rounded-md border border-hairline bg-surface hover:bg-surface-raised text-ink hover:text-primary transition-colors focus-visible:outline-2 focus-visible:outline-primary ${className}`}
      aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
      title={isDark ? "Switch to light mode" : "Switch to dark mode"}
    >
      {isDark ? (
        <Sun className="w-4 h-4 text-warning" aria-hidden="true" />
      ) : (
        <Moon className="w-4 h-4 text-ink-secondary" aria-hidden="true" />
      )}
    </button>
  );
}
