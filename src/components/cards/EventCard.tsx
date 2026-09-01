"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Calendar, Clock, MapPin, ArrowRight, Users } from "lucide-react";

interface EventCardProps {
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  speakers?: string[];
  status: "open" | "soon" | "closed";
  category: string;
  href?: string;
  className?: string;
}

const statusConfig = {
  open: {
    label: "Inscrições Abertas",
    className: "bg-green-50 text-green-700 border border-green-200",
  },
  soon: {
    label: "Em Breve",
    className: "bg-amber-50 text-amber-700 border border-amber-200",
  },
  closed: {
    label: "Encerrado",
    className: "bg-domus-text-muted/10 text-domus-text-muted border border-domus-border",
  },
};

export default function EventCard({
  name,
  description,
  date,
  time,
  location,
  speakers,
  status,
  category,
  href,
  className,
}: EventCardProps) {
  const statusInfo = statusConfig[status];

  return (
    <Link href={href || "#"} className={href ? "block" : "block pointer-events-none"}>
    <article
      className={cn(
        "group relative bg-domus-surface border border-domus-border-light rounded-[var(--radius-lg)] overflow-hidden transition-all duration-300",
        "hover:border-domus-primary/30 hover:shadow-[var(--shadow-lg)]",
        className
      )}
    >
      <div className="h-1 bg-gradient-to-r from-domus-primary to-domus-accent" />

      <div className="p-6 md:p-8">
        <div className="flex items-start justify-between mb-4">
          <span className="inline-block text-xs font-semibold tracking-wider uppercase text-domus-accent bg-domus-accent/10 px-3 py-1 rounded-full">
            {category}
          </span>
          <span
            className={cn(
              "text-xs font-semibold px-3 py-1 rounded-full",
              statusInfo.className
            )}
          >
            {statusInfo.label}
          </span>
        </div>

        <h3 className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl font-bold text-domus-text mb-3 group-hover:text-domus-primary transition-colors">
          {name}
        </h3>

        <p className="text-domus-text-secondary text-sm leading-relaxed mb-6">
          {description}
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
          {speakers && speakers.length > 0 && (
            <div className="flex items-center gap-2 text-sm text-domus-text-muted">
              <Users className="w-4 h-4" />
              <span>{speakers.join(", ")}</span>
            </div>
          )}
        </div>

        {status === "open" && (
          <span className="inline-flex items-center gap-2 text-sm font-semibold text-domus-primary group-hover:text-domus-primary-dark transition-colors">
            Inscreva-se
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </span>
        )}
        {status === "soon" && (
          <span className="inline-block text-sm text-domus-text-muted italic">
            Inscrições em breve
          </span>
        )}
      </div>
    </article>
    </Link>
  );
}
