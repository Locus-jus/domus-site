"use client";

import { use, useState } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { cn } from "@/lib/utils";
import { getDebateBySlug, formatLabels, participationLabels } from "@/data/debates";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import InscriptionForm from "@/components/forms/InscriptionForm";
import Button from "@/components/ui/Button";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowLeft,
  Shield,
  Tag,
  CheckCircle,
} from "lucide-react";

export default function DebatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const debate = getDebateBySlug(slug);

  if (!debate) {
    notFound();
  }

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
              {debate.inscriptionsOpen && (
                <span className="text-xs font-semibold tracking-wider uppercase text-green-400 bg-green-400/10 px-3 py-1 rounded-full">
                  Inscrições Abertas
                </span>
              )}
            </div>

            <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-5xl lg:text-6xl font-bold text-white mb-4 leading-tight">
              {debate.title}
            </h1>

            {debate.subtitle && (
              <p className="text-lg text-gray-400 mb-2">{debate.subtitle}</p>
            )}

            <p className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl text-domus-accent italic mb-8">
              &ldquo;{debate.theme}&rdquo;
            </p>

            <div className="flex flex-wrap gap-6 text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5 text-domus-primary" />
                <span>{new Date(debate.date).toLocaleDateString("pt-BR", { day: "numeric", month: "long", year: "numeric" })}</span>
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
                      <h3 className="font-semibold text-domus-text">Participação</h3>
                    </div>
                    <p className="text-sm text-domus-text-secondary">
                      {participationLabels[debate.participation]}
                    </p>
                  </div>
                </div>

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

                {debate.status === "past" && debate.result && (
                  <div className="p-6 rounded-[var(--radius-lg)] border border-domus-accent/20 bg-domus-accent/5">
                    <div className="flex items-center gap-3 mb-3">
                      <CheckCircle className="w-5 h-5 text-domus-accent" />
                      <h3 className="font-semibold text-domus-text">Resultado</h3>
                    </div>
                    <p className="text-sm text-domus-text-secondary">
                      {debate.result}
                    </p>
                  </div>
                )}
              </div>

              {/* Sidebar */}
              <div className="lg:col-span-1">
                <div className="sticky top-24 space-y-6">
                  {debate.inscriptionsOpen && (
                    <div className="p-6 rounded-[var(--radius-xl)] border border-domus-border-light bg-domus-surface shadow-[var(--shadow-sm)]">
                      <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-domus-text mb-4">
                        Inscrições
                      </h3>
                      {debate.maxParticipants && (
                        <div className="mb-4">
                          <div className="flex justify-between text-xs text-domus-text-muted mb-1">
                            <span>{debate.currentParticipants || 0} inscritos</span>
                            <span>{debate.maxParticipants} vagas</span>
                          </div>
                          <div className="w-full h-2 bg-domus-border-light rounded-full overflow-hidden">
                            <div
                              className="h-full bg-domus-primary rounded-full transition-all"
                              style={{
                                width: `${((debate.currentParticipants || 0) / debate.maxParticipants) * 100}%`,
                              }}
                            />
                          </div>
                        </div>
                      )}
                      <InscriptionForm
                        debateId={debate.id}
                        debateTitle={debate.title}
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

                  <div className="p-6 rounded-[var(--radius-xl)] border border-domus-border-light bg-domus-surface shadow-[var(--shadow-sm)]">
                    <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-domus-text mb-3">
                      Compartilhar
                    </h3>
                    <p className="text-xs text-domus-text-muted">
                      Compartilhe este debate com outros debatedores.
                    </p>
                  </div>
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
