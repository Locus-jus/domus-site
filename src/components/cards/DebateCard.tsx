"use client";

import { cn } from "@/lib/utils";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";

interface DebateCardProps {
  number: number;
  title: string;
  theme: string;
  date: string;
  time: string;
  location: string;
  status: "upcoming" | "past";
  category: string;
  className?: string;
}

export default function DebateCard({
  number,
  title,
  theme,
  date,
  time,
  location,
  status,
  category,
  className,
}: DebateCardProps) {
  return (
    <article
      className={cn(
        "group relative bg-domus-surface border border-domus-border-light rounded-[var(--radius-lg)] p-6 md:p-8 transition-all duration-300",
        "hover:border-domus-primary/30 hover:shadow-[var(--shadow-lg)]",
        className
      )}
    >
      <div className="flex items-start justify-between mb-4">
        <span className="inline-block text-xs font-semibold tracking-wider uppercase text-domus-accent bg-domus-accent/10 px-3 py-1 rounded-full">
          {category}
        </span>
        <span
          className={cn(
            "text-xs font-semibold px-3 py-1 rounded-full",
            status === "upcoming"
              ? "bg-green-50 text-green-700 border border-green-200"
              : "bg-domus-text-muted/10 text-domus-text-muted border border-domus-border"
          )}
        >
          {status === "upcoming" ? "Próximo" : "Realizado"}
        </span>
      </div>

      <div className="mb-1 text-xs font-mono text-domus-text-muted">
        #{String(number).padStart(2, "0")}
      </div>

      <h3 className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl font-bold text-domus-text mb-3 group-hover:text-domus-primary transition-colors">
        {title}
      </h3>

      <p className="text-domus-text-secondary text-sm leading-relaxed mb-6">
        &ldquo;{theme}&rdquo;
      </p>

      <div className="space-y-2 mb-6">
        <div className="flex items-center gap-2 text-sm text-domus-text-muted">
          <Calendar className="w-4 h-4" />
          <span>{new Date(date).toLocaleDateString("pt-BR")}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-domus-text-muted">
          <Clock className="w-4 h-4" />
          <span>{time}</span>
        </div>
        <div className="flex items-center gap-2 text-sm text-domus-text-muted">
          <MapPin className="w-4 h-4" />
          <span>{location}</span>
        </div>
      </div>

      <button className="inline-flex items-center gap-2 text-sm font-semibold text-domus-primary hover:text-domus-primary-dark transition-colors group/btn">
        Ver debate
        <ArrowRight className="w-4 h-4 transition-transform group-hover/btn:translate-x-1" />
      </button>
    </article>
  );
}
