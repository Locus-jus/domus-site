"use client";

import { cn } from "@/lib/utils";

interface DebaterCardProps {
  name: string;
  role: string;
  description: string;
  imageInitials: string;
  className?: string;
}

export default function DebaterCard({
  name,
  role,
  description,
  imageInitials,
  className,
}: DebaterCardProps) {
  return (
    <article
      className={cn(
        "group relative bg-domus-surface border border-domus-border-light rounded-[var(--radius-lg)] p-6 text-center transition-all duration-300",
        "hover:border-domus-primary/30 hover:shadow-[var(--shadow-lg)]",
        className
      )}
    >
      <div className="w-20 h-20 mx-auto mb-4 rounded-full bg-domus-primary/10 flex items-center justify-center border-2 border-domus-primary/20 group-hover:border-domus-primary/50 transition-colors">
        <span className="font-[family-name:var(--font-playfair)] text-xl font-bold text-domus-primary">
          {imageInitials}
        </span>
      </div>

      <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-domus-text mb-1 group-hover:text-domus-primary transition-colors">
        {name}
      </h3>

      <p className="text-xs font-semibold tracking-wider uppercase text-domus-accent mb-3">
        {role}
      </p>

      <p className="text-sm text-domus-text-secondary leading-relaxed">
        {description}
      </p>
    </article>
  );
}
