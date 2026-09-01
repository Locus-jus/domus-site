"use client";

import { cn } from "@/lib/utils";
import { ArrowRight, Clock } from "lucide-react";
import PdfLink from "@/components/ui/PdfLink";

interface ArticleCardProps {
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  pdfUrl?: string;
  className?: string;
}

const categoryColors: Record<string, string> = {
  Oratória: "bg-blue-50 text-blue-700",
  Retórica: "bg-purple-50 text-purple-700",
  Filosofia: "bg-amber-50 text-amber-700",
  Argumentação: "bg-green-50 text-green-700",
  Atualidades: "bg-red-50 text-red-700",
  Debate: "bg-domus-primary/10 text-domus-primary",
  "Pensamento Crítico": "bg-indigo-50 text-indigo-700",
};

export default function ArticleCard({
  title,
  excerpt,
  category,
  author,
  date,
  readTime,
  pdfUrl,
  className,
}: ArticleCardProps) {
  return (
    <article
      className={cn(
        "group relative bg-domus-surface border border-domus-border-light rounded-[var(--radius-lg)] overflow-hidden transition-all duration-300",
        "hover:border-domus-primary/30 hover:shadow-[var(--shadow-lg)]",
        className
      )}
    >
      <div className="p-6 md:p-8">
        <div className="flex items-center justify-between mb-4">
          <span
            className={cn(
              "text-xs font-semibold tracking-wider uppercase px-3 py-1 rounded-full",
              categoryColors[category] || "bg-domus-primary/10 text-domus-primary"
            )}
          >
            {category}
          </span>
          <div className="flex items-center gap-1 text-xs text-domus-text-muted">
            <Clock className="w-3 h-3" />
            {readTime}
          </div>
        </div>

        <h3 className="font-[family-name:var(--font-playfair)] text-lg md:text-xl font-bold text-domus-text mb-3 group-hover:text-domus-primary transition-colors leading-snug">
          {title}
        </h3>

        <p className="text-domus-text-secondary text-sm leading-relaxed mb-6">
          {excerpt}
        </p>

        <div className="flex items-center justify-between">
          <div className="text-xs text-domus-text-muted">
            <span>{author}</span>
            <span className="mx-2">·</span>
            <span>{new Date(date).toLocaleDateString("pt-BR")}</span>
          </div>

           {pdfUrl ? <PdfLink href={pdfUrl} label="Ler PDF" /> : <span className="inline-flex items-center gap-2 text-sm font-semibold text-domus-primary">Ler artigo <ArrowRight className="w-4 h-4" /></span>}
        </div>
      </div>
    </article>
  );
}
