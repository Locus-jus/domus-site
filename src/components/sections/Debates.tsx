"use client";

import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import DebateCard from "@/components/cards/DebateCard";
import { debates, getUpcomingDebates } from "@/data/debates";
import { cn } from "@/lib/utils";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";
import Button from "@/components/ui/Button";

export default function Debates() {
  const upcoming = getUpcomingDebates();
  const nextDebate = upcoming[0];

  return (
    <section id="debates" className="py-24 md:py-32 bg-domus-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <SectionHeader
          label="Debates"
          title="Arenas de Argumentação"
          subtitle="Competições e encontros onde ideias se encontram, argumentos são construídos e perspectivas se expandem."
        />

        {/* Próximo Destaque */}
        {nextDebate && (
          <div className="mb-12 bg-domus-dark rounded-[var(--radius-xl)] p-8 md:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-domus-primary/10 rounded-full blur-3xl" />
            <div className="relative z-10">
              <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-domus-accent mb-3">
                Próximo Debate
              </span>
              <div className="flex flex-wrap items-center gap-3 mb-4">
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-bold text-white">
                  {nextDebate.title}
                </h3>
                {nextDebate.inscriptionsOpen && (
                  <span className="text-xs font-semibold px-3 py-1 rounded-full bg-green-500/10 text-green-400 border border-green-500/20">
                    Inscrições Abertas
                  </span>
                )}
              </div>
              <p className="font-[family-name:var(--font-playfair)] text-lg text-domus-accent italic mb-4">
                &ldquo;{nextDebate.theme}&rdquo;
              </p>
              <div className="flex flex-wrap gap-6 text-gray-400 mb-8">
                <span className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-domus-primary" />
                  {new Date(nextDebate.date).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })}
                </span>
                <span className="flex items-center gap-2 text-sm">
                  <Clock className="w-4 h-4 text-domus-primary" />
                  {nextDebate.time}
                </span>
                <span className="flex items-center gap-2 text-sm">
                  <MapPin className="w-4 h-4 text-domus-primary" />
                  {nextDebate.location}
                </span>
              </div>
              <Link href={`/debates/${nextDebate.slug}`}>
                <Button variant="primary" size="md">
                  Participar
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        )}

        {/* Todos os debates */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {debates.map((debate) => (
            <DebateCard key={debate.id} debate={debate} />
          ))}
        </div>
      </div>
    </section>
  );
}
