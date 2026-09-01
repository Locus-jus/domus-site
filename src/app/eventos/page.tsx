"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { debates, formatLabels } from "@/data/debates";
import { events } from "@/data/events";
import { loadManagedEvents, type ManagedEvent } from "@/components/admin/EventManager";
import { fetchCloudEvents, fetchDeletedSystemEvents } from "@/lib/supabase-data";
import { fetchCloudDebates } from "@/lib/supabase-data";
import PdfLink from "@/components/ui/PdfLink";
import { cn } from "@/lib/utils";
import { Calendar, Clock, MapPin, ArrowRight } from "lucide-react";

export default function EventosPage() {
  const [tab, setTab] = useState<"proximos" | "realizados">("proximos");
  const [managedEvents, setManagedEvents] = useState<ManagedEvent[]>([]);
  const [publicDebates, setPublicDebates] = useState<typeof debates>([]);
  const [hiddenSystemEvents, setHiddenSystemEvents] = useState<string[]>([]);

  useEffect(() => {
    setManagedEvents(loadManagedEvents());
    try { setHiddenSystemEvents(JSON.parse(localStorage.getItem("domus_hidden_system_events") || "[]")); } catch { setHiddenSystemEvents([]); }
    void fetchCloudEvents().then((cloud) => { if (cloud) setManagedEvents(cloud); });
    void fetchCloudDebates().then((cloud) => { if (cloud) setPublicDebates(cloud); });
    void fetchDeletedSystemEvents().then((deleted) => { if (deleted.length) setHiddenSystemEvents((current) => [...new Set([...current, ...deleted])]); });
    const refresh = () => setManagedEvents(loadManagedEvents());
    window.addEventListener("storage", refresh);
    const onEventsChanged = () => { try { setHiddenSystemEvents(JSON.parse(localStorage.getItem("domus_hidden_system_events") || "[]")); } catch {} };
    window.addEventListener("domus:events-changed", onEventsChanged);
    return () => { window.removeEventListener("storage", refresh); window.removeEventListener("domus:events-changed", onEventsChanged); };
  }, []);

  const upcomingDebates = publicDebates.filter((d) => d.status === "upcoming");
  const pastDebates = publicDebates.filter((d) => d.status === "past");
  const visibleEvents = events.filter((e) => !hiddenSystemEvents.includes(e.id));
  const upcomingEvents = visibleEvents.filter((e) => e.status !== "closed");
  const pastEvents = visibleEvents.filter((e) => e.status === "closed");
  const managedUpcoming = managedEvents.filter((e) => e.status === "upcoming");
  const managedPast = managedEvents.filter((e) => e.status === "past");

  const hasUpcoming = upcomingDebates.length > 0 || upcomingEvents.length > 0 || managedUpcoming.length > 0;
  const hasPast = pastDebates.length > 0 || pastEvents.length > 0 || managedPast.length > 0;

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
              Eventos DOMUS
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Debates, torneios, palestras, encontros e treinamentos.
              Acompanhe a agenda da sociedade.
            </p>
          </div>
        </section>

        {/* Tabs */}
        <section className="bg-domus-background border-b border-domus-border-light">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <div className="flex gap-8">
              <button
                onClick={() => setTab("proximos")}
                className={cn(
                  "py-4 text-sm font-medium border-b-2 transition-colors cursor-pointer",
                  tab === "proximos"
                    ? "border-domus-primary text-domus-primary"
                    : "border-transparent text-domus-text-muted hover:text-domus-text"
                )}
              >
                Próximos
              </button>
              <button
                onClick={() => setTab("realizados")}
                className={cn(
                  "py-4 text-sm font-medium border-b-2 transition-colors cursor-pointer",
                  tab === "realizados"
                    ? "border-domus-primary text-domus-primary"
                    : "border-transparent text-domus-text-muted hover:text-domus-text"
                )}
              >
                Realizados
              </button>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-20 bg-domus-background">
          <div className="max-w-5xl mx-auto px-6 md:px-8">
            {tab === "proximos" && (
              <>
                {/* Upcoming Debates */}
                {upcomingDebates.length > 0 && (
                  <div className="mb-12">
                    <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-domus-text mb-6">
                      Debates
                    </h2>
                    <div className="space-y-4">
                      {upcomingDebates.map((debate) => (
                        <Link
                          key={debate.id}
                          href={`/debates/${debate.slug}`}
                          className="group block bg-domus-surface border border-domus-border-light rounded-[var(--radius-lg)] p-6 hover:border-domus-primary/20 hover:shadow-[var(--shadow-md)] transition-all"
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                            <div>
                              <div className="flex items-center gap-2 mb-1">
                                <span className="text-xs font-mono text-domus-text-muted">
                                  #{String(debate.number).padStart(2, "0")}
                                </span>
                                <span className="text-xs font-semibold tracking-wider uppercase text-domus-accent bg-domus-accent/10 px-2 py-0.5 rounded-full">
                                  {formatLabels[debate.format]}
                                </span>
                                {debate.inscriptionsOpen && (
                                  <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-green-50 text-green-700">
                                    Inscrições abertas
                                  </span>
                                )}
                              </div>
                              <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-domus-text group-hover:text-domus-primary transition-colors">
                                {debate.title}
                              </h3>
                              <p className="text-sm text-domus-text-secondary mt-1">
                                &ldquo;{debate.theme}&rdquo;
                              </p>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-domus-text-muted">
                              <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                {new Date(debate.date).toLocaleDateString("pt-BR")}
                              </span>
                              <span className="flex items-center gap-1.5">
                                <Clock className="w-4 h-4" />
                                {debate.time}
                              </span>
                              <ArrowRight className="w-4 h-4 text-domus-primary" />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                 {/* Managed upcoming events */}
                 {managedUpcoming.length > 0 && (
                   <div className="mb-8 space-y-4">
                     {managedUpcoming.map((event) => (
                         <Link href={`/eventos/${event.id}`} key={event.id} className="block bg-domus-surface border border-domus-border-light rounded-[var(--radius-lg)] p-6 hover:border-domus-primary/30 hover:shadow-[var(--shadow-md)] transition-all">
                         <span className="text-xs font-semibold tracking-wider uppercase text-domus-accent">{event.type}</span>
                         <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-domus-text mt-2">{event.name}</h3>
                         <p className="text-sm text-domus-text-secondary my-2">{event.description}</p>
                         <p className="text-sm text-domus-text-muted">{new Date(event.date).toLocaleDateString("pt-BR")} · {event.time} · {event.location}</p>
                         <p className="text-xs text-domus-text-muted mt-2">{formatLabels[event.format]} · {event.participation === "interno" ? "Apenas membros DOMUS" : "Aberto a participantes"}{event.maxParticipants ? ` · ${event.maxParticipants} vagas` : ""}</p>
                         {event.editalUrl && <div className="mt-3"><PdfLink href={event.editalUrl} label="Consultar edital em PDF" /></div>}
                       </Link>
                     ))}
                   </div>
                 )}

                 {/* Upcoming Events */}
                {upcomingEvents.length > 0 && (
                  <div>
                    <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-domus-text mb-6">
                      Eventos
                    </h2>
                    <div className="space-y-4">
                      {upcomingEvents.map((event) => (
                        <div
                          key={event.id}
                          className="bg-domus-surface border border-domus-border-light rounded-[var(--radius-lg)] p-6"
                        >
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xs font-semibold tracking-wider uppercase text-domus-accent bg-domus-accent/10 px-2 py-0.5 rounded-full">
                              {event.category}
                            </span>
                            <span
                              className={cn(
                                "text-xs font-semibold px-2 py-0.5 rounded-full",
                                event.status === "open"
                                  ? "bg-green-50 text-green-700"
                                  : "bg-amber-50 text-amber-700"
                              )}
                            >
                              {event.status === "open" ? "Inscrições abertas" : "Em breve"}
                            </span>
                          </div>
                          <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-domus-text mb-1">
                            {event.name}
                          </h3>
                          <p className="text-sm text-domus-text-secondary mb-3">
                            {event.description}
                          </p>
                          <div className="flex flex-wrap gap-4 text-sm text-domus-text-muted">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4" />
                              {new Date(event.date).toLocaleDateString("pt-BR")}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <Clock className="w-4 h-4" />
                              {event.time}
                            </span>
                            <span className="flex items-center gap-1.5">
                              <MapPin className="w-4 h-4" />
                              {event.location}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!hasUpcoming && (
                  <div className="text-center py-16">
                    <p className="text-domus-text-muted text-lg">
                      Nenhum evento programado no momento.
                    </p>
                    <p className="text-domus-text-muted text-sm mt-2">
                      Acompanhe nossas redes sociais para novidades.
                    </p>
                  </div>
                )}
              </>
            )}

            {tab === "realizados" && (
              <>
                {pastDebates.length > 0 && (
                  <div className="mb-12">
                    <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-domus-text mb-6">
                      Debates Realizados
                    </h2>
                    <div className="space-y-4">
                      {pastDebates.map((debate) => (
                        <Link
                          key={debate.id}
                          href={`/debates/${debate.slug}`}
                          className="group block bg-domus-surface border border-domus-border-light rounded-[var(--radius-lg)] p-6 hover:border-domus-primary/20 hover:shadow-[var(--shadow-md)] transition-all"
                        >
                          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
                            <div>
                              <span className="text-xs font-mono text-domus-text-muted">
                                #{String(debate.number).padStart(2, "0")}
                              </span>
                              <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-domus-text group-hover:text-domus-primary transition-colors">
                                {debate.title}
                              </h3>
                              <p className="text-sm text-domus-text-secondary mt-1">
                                &ldquo;{debate.theme}&rdquo;
                              </p>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-domus-text-muted">
                              <span className="flex items-center gap-1.5">
                                <Calendar className="w-4 h-4" />
                                {new Date(debate.date).toLocaleDateString("pt-BR")}
                              </span>
                              <ArrowRight className="w-4 h-4 text-domus-primary" />
                            </div>
                          </div>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}

                {pastEvents.length > 0 && (
                  <div>
                    <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-domus-text mb-6">
                      Eventos Realizados
                    </h2>
                    <div className="space-y-4">
                      {pastEvents.map((event) => (
                        <div
                          key={event.id}
                          className="bg-domus-surface border border-domus-border-light rounded-[var(--radius-lg)] p-6 opacity-75"
                        >
                          <span className="text-xs font-semibold tracking-wider uppercase text-domus-text-muted bg-domus-text-muted/10 px-2 py-0.5 rounded-full">
                            {event.category}
                          </span>
                          <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-domus-text mt-2 mb-1">
                            {event.name}
                          </h3>
                          <div className="flex gap-4 text-sm text-domus-text-muted">
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-4 h-4" />
                              {new Date(event.date).toLocaleDateString("pt-BR")}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {managedPast.length > 0 && (
                  <div className="space-y-4">
                    {managedPast.map((event) => <div key={event.id} className="bg-domus-surface border border-domus-border-light rounded-[var(--radius-lg)] p-6 opacity-75"><h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-domus-text">{event.name}</h3><p className="text-sm text-domus-text-muted mt-2">{new Date(event.date).toLocaleDateString("pt-BR")} · {event.location}</p></div>)}
                  </div>
                )}

                {!hasPast && (
                  <div className="text-center py-16">
                    <p className="text-domus-text-muted text-lg">
                      Nenhum evento realizado ainda.
                    </p>
                  </div>
                )}
              </>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
