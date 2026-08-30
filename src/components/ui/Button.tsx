"use client";

import { cn } from "@/lib/utils";
import { ButtonHTMLAttributes, forwardRef } from "react";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "outline" | "ghost" | "accent";
  size?: "sm" | "md" | "lg";
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "primary", size = "md", children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center font-medium transition-all duration-250 ease-out cursor-pointer",
          "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-domus-primary",
          "disabled:opacity-50 disabled:cursor-not-allowed",
          {
            "bg-domus-primary text-white hover:bg-domus-primary-dark shadow-md hover:shadow-lg":
              variant === "primary",
            "bg-domus-accent text-domus-dark hover:bg-domus-accent-light shadow-md hover:shadow-lg":
              variant === "accent",
            "bg-domus-dark-surface text-white hover:bg-domus-dark":
              variant === "secondary",
            "border border-domus-primary text-domus-primary hover:bg-domus-primary hover:text-white":
              variant === "outline",
            "text-domus-text-secondary hover:text-domus-primary hover:bg-domus-primary/5":
              variant === "ghost",
          },
          {
            "px-4 py-2 text-sm": size === "sm",
            "px-6 py-3 text-sm": size === "md",
            "px-8 py-4 text-base": size === "lg",
          },
          "rounded-[var(--radius-sm)]",
          className
        )}
        {...props}
      >
        {children}
      </button>
    );
  }
);

Button.displayName = "Button";

export default Button;
