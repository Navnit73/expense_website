import React from "react";

interface SectionProps extends React.HTMLAttributes<HTMLElement> {
  children: React.ReactNode;
  className?: string;
  id?: string;
  variant?: "default" | "surface" | "surface-raised" | "brand";
}

export function Section({
  children,
  className = "",
  id,
  variant = "default",
  ...props
}: SectionProps) {
  const variantStyles = {
    default: "bg-canvas text-ink",
    surface: "bg-surface text-ink border-y border-hairline",
    "surface-raised": "bg-surface-raised text-ink border-y border-hairline",
    brand: "bg-homepage-mintcream dark:bg-surface text-ink border-y border-hairline",
  };

  return (
    <section
      id={id}
      className={`py-16 sm:py-20 lg:py-24 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </section>
  );
}
