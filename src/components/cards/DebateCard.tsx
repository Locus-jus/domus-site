"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { getInscriptionCount } from "@/data/inscriptions";
import { cn } from "@/lib/utils";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import { formatLabels, participationLabels, type Debate } from "@/data/debates";

interface DebateCardProps {
  debate: Debate;
  className?: string;
}

export default function DebateCard({ debate, className }: DebateCardProps) {
  const [participantCount, setParticipantCount] = useState(debate.currentParticipants || 0);

  useEffect(() => {
    const refresh = () => setParticipantCount(getInscriptionCount(debate.id, debate.currentParticipants));
    refresh();
    window.addEventListener("domus:inscriptions-changed", refresh);
    window.addEventListener("storage", refresh);
    return () => {
      window.removeEventListener("domus:inscriptions-changed", refresh);
      window.removeEventListener("storage", refresh);
    };
  }, [debate.id]);

  return (
    <Link href={`/debates/${debate.slug}`}>
      <article
        className={cn(
          "group relative bg-domus-surface border border-domus-border-light rounded-[var(--radius-lg)] p-6 md:p-8 transition-all duration-300 h-full",
          "hover:border-domus-primary/30 hover:shadow-[var(--shadow-lg)] cursor-pointer",
          className
        )}
      >
        <div className="flex items-start justify-between mb-4">
          <div className="flex flex-wrap gap-2">
            <span className="inline-block text-xs font-semibold tracking-wider uppercase text-domus-accent bg-domus-accent/10 px-3 py-1 rounded-full">
              {debate.category}
            </span>
            <span className="inline-block text-xs font-semibold tracking-wider uppercase text-domus-primary bg-domus-primary/10 px-3 py-1 rounded-full">
              {formatLabels[debate.format]}
            </span>
          </div>
          <span
            className={cn(
              "text-xs font-semibold px-3 py-1 rounded-full",
              debate.inscriptionsOpen
                ? "bg-green-50 text-green-700 border border-green-200"
                : debate.status === "upcoming"
                ? "bg-amber-50 text-amber-700 border border-amber-200"
                : "bg-domus-text-muted/10 text-domus-text-muted border border-domus-border"
            )}
          >
            {debate.inscriptionsOpen
              ? "Inscrições Abertas"
              : debate.status === "upcoming"
              ? "Em Breve"
              : "Realizado"}
          </span>
        </div>

        <div className="mb-1 text-xs font-mono text-domus-text-muted">
          #{String(debate.number).padStart(2, "0")}
        </div>

        <h3 className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl font-bold text-domus-text mb-3 group-hover:text-domus-primary transition-colors">
          {debate.title}
        </h3>

        <p className="text-domus-text-secondary text-sm leading-relaxed mb-4 line-clamp-2">
          &ldquo;{debate.theme}&rdquo;
        </p>

        <p className="text-xs text-domus-text-muted mb-4">
          {participationLabels[debate.participation]}
        </p>

        <div className="space-y-2 mb-6">
          <div className="text-sm text-domus-text-muted">
            <span className="font-semibold text-domus-text">{participantCount}</span>{debate.maxParticipants ? `/${debate.maxParticipants}` : ""} inscritos
          </div>
          <div className="flex items-center gap-2 text-sm text-domus-text-muted">
            <Calendar className="w-4 h-4" />
            <span>{new Date(debate.date).toLocaleDateString("pt-BR")}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-domus-text-muted">
            <Clock className="w-4 h-4" />
            <span>{debate.time}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-domus-text-muted">
            <MapPin className="w-4 h-4" />
            <span>{debate.location}</span>
          </div>
        </div>

        <span className="inline-flex items-center gap-2 text-sm font-semibold text-domus-primary group-hover:text-domus-primary-dark transition-colors">
          Ver debate
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
        </span>
      </article>
    </Link>
  );
}
