"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { debates, formatLabels } from "@/data/debates";
import { events } from "@/data/events";
import { cn } from "@/lib/utils";
import { Calendar, Clock, MapPin, ArrowRight, Users } from "lucide-react";

type EventFilter = "todos" | "debates" | "eventos" | "inscricoes";

export default function AgendaPage() {
  const [filter, setFilter] = useState<EventFilter>("todos");

  const allItems = [
    ...debates.map((d) => ({
      type: "debate" as const,
      id: d.id,
      title: d.title,
      subtitle: d.theme,
      date: d.date,
      time: d.time,
      location: d.location,
      status: d.inscriptionsOpen ? "open" : d.status === "upcoming" ? "soon" : "closed",
      slug: d.slug,
      format: formatLabels[d.format],
      participation: d.participation,
    })),
    ...events.map((e) => ({
      type: "evento" as const,
      id: e.id,
      title: e.name,
      subtitle: e.description,
      date: e.date,
      time: e.time,
      location: e.location,
      status: e.status,
      slug: null,
      format: e.category,
      participation: null,
    })),
  ].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  const filtered = allItems.filter((item) => {
    if (filter === "todos") return true;
    if (filter === "debates") return item.type === "debate";
    if (filter === "eventos") return item.type === "evento";
    if (filter === "inscricoes") return item.status === "open";
    return true;
  });

  const statusConfig: Record<string, { label: string; className: string }> = {
    open: {
      label: "Inscrições Abertas",
      className: "bg-green-50 text-green-700 border border-green-200",
    },
    upcoming: {
      label: "Em Breve",
      className: "bg-amber-50 text-amber-700 border border-amber-200",
    },
    soon: {
      label: "Em Breve",
      className: "bg-amber-50 text-amber-700 border border-amber-200",
    },
    closed: {
      label: "Encerrado",
      className: "bg-gray-100 text-gray-500 border border-gray-200",
    },
    past: {
      label: "Realizado",
      className: "bg-gray-100 text-gray-500 border border-gray-200",
    },
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">
        {/* Header */}
        <section className="bg-domus-dark py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-domus-accent mb-4">
              Agenda
            </span>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Agenda DOMUS
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Debates, eventos, palestras, encontros e treinamentos. Acompanhe
              tudo o que acontece na sociedade.
            </p>
          </div>
        </section>

        {/* Filters + List */}
        <section className="py-16 md:py-20 bg-domus-background">
          <div className="max-w-5xl mx-auto px-6 md:px-8">
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {(
                [
                  { key: "todos", label: "Todos" },
                  { key: "debates", label: "Debates" },
                  { key: "eventos", label: "Eventos" },
                  { key: "inscricoes", label: "Inscrições Abertas" },
                ] as const
              ).map((f) => (
                <button
                  key={f.key}
                  onClick={() => setFilter(f.key)}
                  className={cn(
                    "px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer",
                    filter === f.key
                      ? "bg-domus-primary text-white shadow-md"
                      : "bg-domus-surface text-domus-text-secondary hover:bg-domus-primary/10 hover:text-domus-primary border border-domus-border-light"
                  )}
                >
                  {f.label}
                </button>
              ))}
            </div>

            {/* Items */}
            <div className="space-y-4">
              {filtered.map((item) => {
                const statusInfo = statusConfig[item.status] || statusConfig.closed;
                return (
                  <div
                    key={`${item.type}-${item.id}`}
                    className="group bg-domus-surface border border-domus-border-light rounded-[var(--radius-lg)] p-6 md:p-8 hover:border-domus-primary/20 hover:shadow-[var(--shadow-md)] transition-all duration-300"
                  >
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span className="text-xs font-semibold tracking-wider uppercase text-domus-accent bg-domus-accent/10 px-2.5 py-0.5 rounded-full">
                            {item.type === "debate" ? "Debate" : item.format}
                          </span>
                          <span
                            className={cn(
                              "text-xs font-semibold px-2.5 py-0.5 rounded-full",
                              statusInfo.className
                            )}
                          >
                            {statusInfo.label}
                          </span>
                        </div>

                        <h3 className="font-[family-name:var(--font-playfair)] text-lg md:text-xl font-bold text-domus-text mb-1 group-hover:text-domus-primary transition-colors">
                          {item.title}
                        </h3>

                        <p className="text-sm text-domus-text-secondary mb-3 line-clamp-1">
                          {item.subtitle}
                        </p>

                        <div className="flex flex-wrap gap-4 text-sm text-domus-text-muted">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {new Date(item.date).toLocaleDateString("pt-BR")}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <Clock className="w-4 h-4" />
                            {item.time}
                          </span>
                          <span className="flex items-center gap-1.5">
                            <MapPin className="w-4 h-4" />
                            {item.location}
                          </span>
                        </div>
                      </div>

                      <div className="md:ml-4">
                        {item.type === "debate" && item.slug ? (
                          <Link
                            href={`/debates/${item.slug}`}
                            className="inline-flex items-center gap-2 text-sm font-semibold text-domus-primary hover:text-domus-primary-dark transition-colors"
                          >
                            Ver debate
                            <ArrowRight className="w-4 h-4" />
                          </Link>
                        ) : (
                          <span className="text-sm text-domus-text-muted italic">
                            Em breve
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}

              {filtered.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-domus-text-muted">
                    Nenhum item encontrado para este filtro.
                  </p>
                </div>
              )}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
