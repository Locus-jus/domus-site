"use client";

import { use, useEffect, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getDebateBySlug, formatLabels, participationLabels } from "@/data/debates";
import { getJudgesForDebate } from "@/data/judges";
import { getManagedDebates } from "@/components/admin/DebateManager";
import { getInscriptionCount } from "@/data/inscriptions";
import { fetchCloudDebates } from "@/lib/supabase-data";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import InscriptionForm from "@/components/forms/InscriptionForm";
import {
  Calendar,
  Clock,
  MapPin,
  ArrowLeft,
  Tag,
  Users,
  Gavel,
  Building2,
  FileText,
  CreditCard,
  ExternalLink,
} from "lucide-react";

export default function DebatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const [debate, setDebate] = useState(() => getDebateBySlug(slug));
  const [loaded, setLoaded] = useState(false);
  const [participantCount, setParticipantCount] = useState(0);

  useEffect(() => {
    let active = true;
    setLoaded(false);
    const local = getManagedDebates().find((item) => item.slug === slug);
    setDebate(local);
    void fetchCloudDebates().then((cloud) => {
      if (!active) return;
      const current = cloud?.find((item) => item.slug === slug) || local;
      setDebate(current);
      setParticipantCount(current ? getInscriptionCount(current.id, current.currentParticipants) : 0);
      setLoaded(true);
    });
    return () => { active = false; };
  }, [slug]);

  useEffect(() => {
    const refresh = () => {
      const current = getManagedDebates().find((item) => item.slug === slug);
      setParticipantCount(current ? getInscriptionCount(current.id, current.currentParticipants) : 0);
    };
    window.addEventListener("domus:inscriptions-changed", refresh);
    window.addEventListener("storage", refresh);
    return () => { window.removeEventListener("domus:inscriptions-changed", refresh); window.removeEventListener("storage", refresh); };
  }, [slug]);

  if (!loaded) {
    return (
      <>
        <Navbar />
        <main className="flex-1 pt-20 min-h-screen flex items-center justify-center bg-domus-background">
          <p className="text-domus-text-muted">Carregando debate...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!debate) {
    notFound();
  }

  const judges = getJudgesForDebate(debate.id);

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">
        {/* Header */}
        <section className="bg-domus-dark py-16 md:py-24">
          <div className="max-w-4xl mx-auto px-6 md:px-8">
            <Link
              href="/#debates"
              className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors mb-8"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar aos debates
            </Link>

            <div className="flex flex-wrap items-center gap-3 mb-4">
              <span className="text-xs font-semibold tracking-wider uppercase text-domus-accent bg-domus-accent/10 px-3 py-1 rounded-full">
                {debate.category}
              </span>
              <span className="text-xs font-semibold tracking-wider uppercase text-domus-primary bg-domus-primary/10 px-3 py-1 rounded-full">
                {formatLabels[debate.format]}
              </span>
            </div>

            <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {debate.title}
            </h1>

            <p className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl text-domus-accent italic mb-8">
              &ldquo;{debate.theme}&rdquo;
            </p>

            <div className="flex flex-wrap gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-domus-primary" />
                <span>
                  {new Date(debate.date).toLocaleDateString("pt-BR", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-domus-primary" />
                <span>{debate.time}</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-5 h-5 text-domus-primary" />
                <span>{debate.location}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-20 bg-domus-background">
          <div className="max-w-4xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
              {/* Main content */}
              <div className="lg:col-span-2 space-y-10">
                <div>
                  <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-domus-text mb-4">
                    Sobre o debate
                  </h2>
                  <p className="text-domus-text-secondary leading-relaxed">
                    {debate.description}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div className="p-6 rounded-[var(--radius-lg)] border border-domus-border-light bg-domus-surface">
                    <div className="flex items-center gap-3 mb-3">
                      <Tag className="w-5 h-5 text-domus-primary" />
                      <h3 className="font-semibold text-domus-text">Formato</h3>
                    </div>
                    <p className="text-sm text-domus-text-secondary">
                      {formatLabels[debate.format]}
                    </p>
                  </div>

                  <div className="p-6 rounded-[var(--radius-lg)] border border-domus-border-light bg-domus-surface">
                    <div className="flex items-center gap-3 mb-3">
                      <Users className="w-5 h-5 text-domus-primary" />
                      <h3 className="font-semibold text-domus-text">
                        Participação
                      </h3>
                    </div>
                    <p className="text-sm text-domus-text-secondary">
                      {participationLabels[debate.participation]}
                    </p>
                    {debate.maxParticipants && (
                      <p className="text-xs text-domus-text-muted mt-2">
                        {participantCount} inscritos de{" "}
                        {debate.maxParticipants} vagas
                      </p>
                    )}
                  </div>
                </div>

                {/* Pricing */}
                {debate.pricing && (
                  <div className="p-6 rounded-[var(--radius-lg)] border border-domus-border-light bg-domus-surface">
                    <div className="flex items-center gap-3 mb-3">
                      <CreditCard className="w-5 h-5 text-domus-primary" />
                      <h3 className="font-semibold text-domus-text">Taxa de participação</h3>
                    </div>
                    <p className="text-sm text-domus-text-secondary">
                      {debate.pricing.description}
                    </p>
                    {debate.pricing.membersFree && (
                      <p className="text-sm text-domus-accent font-medium mt-2">
                        Membros DOMUS são isentos de taxa.
                      </p>
                    )}
                  </div>
                )}

                {/* Edital */}
                {debate.edital && (
                  <div className="p-6 rounded-[var(--radius-lg)] border border-domus-border-light bg-domus-surface">
                    <div className="flex items-center gap-3 mb-3">
                      <FileText className="w-5 h-5 text-domus-primary" />
                      <h3 className="font-semibold text-domus-text">Edital</h3>
                    </div>
                    <a
                      href={debate.edital}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-domus-primary hover:underline"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Consultar edital completo
                    </a>
                  </div>
                )}

                {/* Tabbycat */}
                {debate.tabbycatUrl && (
                  <div className="p-6 rounded-[var(--radius-lg)] border border-domus-border-light bg-domus-surface">
                    <div className="flex items-center gap-3 mb-3">
                      <Gavel className="w-5 h-5 text-domus-primary" />
                      <h3 className="font-semibold text-domus-text">Torneio</h3>
                    </div>
                    <p className="text-sm text-domus-text-secondary mb-3">
                      Acompanhe as rodadas e classificações no Tabbycat.
                    </p>
                    <a
                      href={debate.tabbycatUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm text-domus-primary hover:underline"
                    >
                      <ExternalLink className="w-4 h-4" />
                      Abrir Tabbycat
                    </a>
                  </div>
                )}

                {/* Organization */}
                <div className="p-6 rounded-[var(--radius-lg)] border border-domus-border-light bg-domus-surface">
                  <div className="flex items-center gap-3 mb-3">
                    <Building2 className="w-5 h-5 text-domus-primary" />
                    <h3 className="font-semibold text-domus-text">
                      Organização
                    </h3>
                  </div>
                  <p className="text-sm text-domus-text-secondary">
                    DOMUS — Sociedade de Debates e Oratória
                  </p>
                </div>

                {/* Judges */}
                {judges.length > 0 && (
                  <div>
                    <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-domus-text mb-4">
                      Jurados
                    </h2>
                    <div className="space-y-3">
                      {judges.map((judge) => (
                        <div
                          key={judge.id}
                          className="flex items-center gap-4 p-4 rounded-[var(--radius-lg)] border border-domus-border-light bg-domus-surface"
                        >
                          <div className="w-10 h-10 rounded-full bg-domus-primary/10 flex items-center justify-center flex-shrink-0">
                            <Gavel className="w-5 h-5 text-domus-primary" />
                          </div>
                          <div>
                            <p className="font-medium text-domus-text text-sm">
                              {judge.name}
                            </p>
                            <p className="text-xs text-domus-text-muted">
                              {judge.society}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {debate.rules && (
                  <div>
                    <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-domus-text mb-4">
                      Regras
                    </h2>
                    <p className="text-domus-text-secondary leading-relaxed">
                      {debate.rules}
                    </p>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {debate.inscriptionsOpen && (
                    <div className="p-6 rounded-[var(--radius-xl)] border border-domus-border-light bg-domus-surface shadow-[var(--shadow-sm)]">
                      <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-domus-text mb-2">
                        Inscrições
                      </h3>
                      <p className="text-sm text-domus-text-secondary mb-4">
                        {debate.participation === "aberto" ||
                        debate.participation === "intersociedades"
                          ? "Aberto a participantes de outras sociedades."
                          : "Apenas para membros DOMUS."}
                      </p>
                      {debate.maxParticipants && (
                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-domus-text-muted mb-1">
                            <span>
                              {participantCount} inscritos
                            </span>
                            <span>{debate.maxParticipants} vagas</span>
                          </div>
                          <div className="w-full h-2 bg-domus-border-light rounded-full overflow-hidden">
                            <div
                              className="h-full bg-domus-primary rounded-full transition-all"
                              style={{
                                width: `${Math.min((participantCount / debate.maxParticipants) * 100, 100)}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}
                      <InscriptionForm
                        debateId={debate.id}
                        debateTitle={debate.title}
                        pricing={debate.pricing}
                      />
                    </div>
                  )}

                  {!debate.inscriptionsOpen && debate.status === "upcoming" && (
                    <div className="p-6 rounded-[var(--radius-xl)] border border-domus-border-light bg-domus-surface shadow-[var(--shadow-sm)] text-center">
                      <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-domus-text mb-2">
                        Inscrições encerradas
                      </h3>
                      <p className="text-sm text-domus-text-muted">
                        As inscrições para este debate foram encerradas.
                      </p>
                    </div>
                  )}

                  {debate.status === "past" && (
                    <div className="p-6 rounded-[var(--radius-xl)] border border-domus-border-light bg-domus-surface shadow-[var(--shadow-sm)] text-center">
                      <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-domus-text mb-2">
                        Debate realizado
                      </h3>
                      <p className="text-sm text-domus-text-muted">
                        Este debate já foi realizado.
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
