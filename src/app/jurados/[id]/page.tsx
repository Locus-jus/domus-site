"use client";

import { useState } from "react";
import { use } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getJudgeById } from "@/data/judges";
import { getEvaluationsByJudge } from "@/data/evaluations";
import { debates } from "@/data/debates";
import { cn } from "@/lib/utils";
import { ArrowLeft, ClipboardCheck, Calendar } from "lucide-react";

export default function JudgeAreaPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const judge = getJudgeById(id);

  if (!judge) {
    return (
      <>
        <Navbar />
        <main className="flex-1 pt-20 flex items-center justify-center min-h-screen bg-domus-background">
          <div className="text-center">
            <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-domus-text mb-2">
              Jurado não encontrado
            </h1>
            <Link href="/" className="text-domus-primary hover:underline">
              Voltar ao início
            </Link>
          </div>
        </main>
        <Footer />
      </>
    );
  }

  const evaluations = getEvaluationsByJudge(id);
  const assignedDebates = judge.assignedDebates
    .map((did) => debates.find((d) => d.id === did))
    .filter(Boolean);

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20 min-h-screen bg-domus-background">
        <div className="max-w-4xl mx-auto px-6 md:px-8 py-8">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-sm text-domus-text-muted hover:text-domus-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>

          {/* Judge Info */}
          <div className="bg-domus-surface border border-domus-border-light rounded-[var(--radius-xl)] p-8 mb-8">
            <div className="flex items-start gap-6">
              <div className="w-16 h-16 rounded-full bg-domus-primary/10 flex items-center justify-center flex-shrink-0">
                <span className="font-[family-name:var(--font-playfair)] text-xl font-bold text-domus-primary">
                  {judge.name.split(" ").map((n) => n[0]).join("").slice(0, 2)}
                </span>
              </div>
              <div>
                <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-domus-text mb-1">
                  {judge.name}
                </h1>
                <p className="text-sm text-domus-accent mb-2">Jurado DOMUS</p>
                <p className="text-sm text-domus-text-secondary">
                  {judge.society}
                </p>
                <p className="text-sm text-domus-text-muted mt-2">
                  {judge.experience}
                </p>
              </div>
            </div>
          </div>

          {/* Assigned Debates */}
          <div className="mb-8">
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-domus-text mb-4">
              Debates Designados
            </h2>
            {assignedDebates.length > 0 ? (
              <div className="space-y-3">
                {assignedDebates.map((debate) => (
                  <div
                    key={debate!.id}
                    className="bg-domus-surface border border-domus-border-light rounded-[var(--radius-lg)] p-6"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <span className="text-xs font-mono text-domus-text-muted">
                          #{String(debate!.number).padStart(2, "0")}
                        </span>
                        <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-domus-text">
                          {debate!.title}
                        </h3>
                        <p className="text-sm text-domus-text-secondary mt-1">
                          &ldquo;{debate!.theme}&rdquo;
                        </p>
                        <div className="flex gap-4 text-sm text-domus-text-muted mt-3">
                          <span className="flex items-center gap-1.5">
                            <Calendar className="w-4 h-4" />
                            {new Date(debate!.date).toLocaleDateString("pt-BR")}
                          </span>
                        </div>
                      </div>
                      <Link
                        href={`/jurados/${id}/avaliar/${debate!.id}`}
                        className="px-4 py-2 text-sm font-medium text-domus-primary border border-domus-primary rounded-[var(--radius-sm)] hover:bg-domus-primary hover:text-white transition-colors"
                      >
                        Avaliar
                      </Link>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-domus-text-muted">
                Nenhum debate designado no momento.
              </p>
            )}
          </div>

          {/* Past Evaluations */}
          <div>
            <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-domus-text mb-4">
              Avaliações Realizadas
            </h2>
            {evaluations.length > 0 ? (
              <div className="space-y-3">
                {evaluations.map((ev) => {
                  const debate = debates.find((d) => d.id === ev.debateId);
                  return (
                    <div
                      key={ev.id}
                      className="bg-domus-surface border border-domus-border-light rounded-[var(--radius-lg)] p-6"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <ClipboardCheck className="w-4 h-4 text-domus-primary" />
                        <span className="text-sm font-medium text-domus-text">
                          {debate?.title || "Debate"}
                        </span>
                      </div>
                      <p className="text-sm text-domus-text-secondary">
                        Participante: <strong>{ev.participantName}</strong>
                        {ev.team && ` · ${ev.team}`}
                      </p>
                      <p className="text-xs text-domus-text-muted mt-2">
                        {new Date(ev.createdAt).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  );
                })}
              </div>
            ) : (
              <p className="text-domus-text-muted">
                Nenhuma avaliação realizada ainda.
              </p>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
