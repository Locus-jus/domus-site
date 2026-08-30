"use client";

import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  label?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
  titleClassName?: string;
}

export default function SectionHeader({
  label,
  title,
  subtitle,
  align = "center",
  className,
  titleClassName,
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        "mb-12 md:mb-16",
        align === "center" && "text-center",
        className
      )}
    >
      {label && (
        <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-domus-accent mb-4">
          {label}
        </span>
      )}
      <h2
        className={cn(
          "font-[family-name:var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl font-bold text-domus-text leading-tight",
          titleClassName
        )}
      >
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-lg text-domus-text-secondary max-w-2xl leading-relaxed font-light mx-auto">
          {subtitle}
        </p>
      )}
    </div>
  );
}
