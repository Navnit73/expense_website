import React from "react";
import Link from "next/link";

interface ButtonProps {
  children: React.ReactNode;
  variant?: "primary" | "secondary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  href?: string;
  className?: string;
  onClick?: () => void;
  disabled?: boolean;
  type?: "button" | "submit" | "reset";
  id?: string;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}

export function Button({
  children,
  variant = "primary",
  size = "md",
  href,
  className = "",
  onClick,
  disabled = false,
  type = "button",
  id,
  target,
  rel,
  "aria-label": ariaLabel,
}: ButtonProps) {
  const baseStyles =
    "inline-flex items-center justify-center font-medium transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-50 disabled:pointer-events-none rounded-md cursor-pointer text-center";

  const sizeStyles = {
    sm: "text-xs px-3 py-1.5 gap-1.5",
    md: "text-sm px-4 py-2.5 gap-2",
    lg: "text-base px-6 py-3.5 gap-2.5 font-semibold",
  };

  const variantStyles = {
    primary:
      "bg-primary hover:bg-primary-active text-white border border-primary hover:border-primary-active focus-visible:outline-primary",
    secondary:
      "bg-surface text-ink hover:bg-canvas border border-hairline-strong focus-visible:outline-ink",
    outline:
      "bg-transparent text-ink hover:bg-surface border border-hairline-strong focus-visible:outline-primary",
    ghost:
      "bg-transparent text-ink hover:bg-surface-raised border border-transparent focus-visible:outline-ink",
    danger:
      "bg-expense text-white hover:opacity-90 border border-expense focus-visible:outline-expense",
  };

  const combinedStyles = `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${className}`;

  if (href) {
    return (
      <Link
        href={href}
        className={combinedStyles}
        id={id}
        target={target}
        rel={rel}
        aria-label={ariaLabel}
      >
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      className={combinedStyles}
      onClick={onClick}
      disabled={disabled}
      id={id}
      aria-label={ariaLabel}
    >
      {children}
    </button>
  );
}
