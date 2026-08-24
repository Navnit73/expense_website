import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?:
    | "default"
    | "income"
    | "expense"
    | "investment"
    | "sky"
    | "warning"
    | "neutral";
  size?: "sm" | "md";
  className?: string;
  id?: string;
}

export function Badge({
  children,
  variant = "default",
  size = "md",
  className = "",
  id,
}: BadgeProps) {
  const sizeStyles = {
    sm: "text-[11px] px-2 py-0.5 font-medium tracking-wide",
    md: "text-xs px-2.5 py-1 font-medium",
  };

  const variantStyles = {
    default:
      "bg-income-bg text-income border border-income-border",
    income:
      "bg-income-bg text-income border border-income-border",
    expense:
      "bg-expense-bg text-expense border border-expense-border",
    investment:
      "bg-investment-bg text-investment border border-investment-border",
    sky:
      "bg-sky-bg text-sky border border-sky-border",
    warning:
      "bg-warning-bg text-warning border border-warning-border",
    neutral:
      "bg-surface text-ink-muted border border-hairline",
  };

  return (
    <span
      id={id}
      className={`inline-flex items-center gap-1.5 rounded-md ${sizeStyles[size]} ${variantStyles[variant]} ${className}`}
    >
      {children}
    </span>
  );
}
