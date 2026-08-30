"use client";

import { useState, use } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { getJudgeById } from "@/data/judges";
import { getDebateBySlug, debates } from "@/data/debates";
import Button from "@/components/ui/Button";
import { ArrowLeft, CheckCircle, Star } from "lucide-react";
import { cn } from "@/lib/utils";

function ScoreInput({
  label,
  value,
  onChange,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
}) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-domus-border-light last:border-0">
      <span className="text-sm font-medium text-domus-text">{label}</span>
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((n) => (
          <button
            key={n}
            type="button"
            onClick={() => onChange(n)}
            className={cn(
              "w-8 h-8 rounded text-xs font-medium transition-all cursor-pointer",
              n <= value
                ? "bg-domus-primary text-white"
                : "bg-domus-background text-domus-text-muted border border-domus-border-light hover:border-domus-primary/30"
            )}
          >
            {n}
          </button>
        ))}
      </div>
    </div>
  );
}

export default function AvaliarPage({
  params,
}: {
  params: Promise<{ id: string; debateId: string }>;
}) {
  const { id, debateId } = use(params);
  const judge = getJudgeById(id);
  const debate = debates.find((d) => d.id === debateId);

  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    participantName: "",
    team: "",
    argumentation: 5,
    oratory: 5,
    refutation: 5,
    clarity: 5,
    content: 5,
    generalComment: "",
    strengths: "",
    improvements: "",
    result: "vitoria" as "vitoria" | "derrota" | "empate",
  });

  if (!judge || !debate) {
    return (
      <>
        <Navbar />
        <main className="flex-1 pt-20 flex items-center justify-center min-h-screen bg-domus-background">
          <div className="text-center">
            <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-domus-text mb-2">
              Não encontrado
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20 min-h-screen bg-domus-background">
        <div className="max-w-2xl mx-auto px-6 md:px-8 py-8">
          <Link
            href={`/jurados/${id}`}
            className="inline-flex items-center gap-2 text-sm text-domus-text-muted hover:text-domus-primary transition-colors mb-8"
          >
            <ArrowLeft className="w-4 h-4" />
            Voltar
          </Link>

          {/* Debate info */}
          <div className="bg-domus-dark rounded-[var(--radius-xl)] p-6 mb-8">
            <span className="text-xs font-mono text-gray-400">
              #{String(debate.number).padStart(2, "0")}
            </span>
            <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-white mt-1">
              {debate.title}
            </h1>
            <p className="text-domus-accent italic mt-2">
              &ldquo;{debate.theme}&rdquo;
            </p>
            <div className="flex gap-4 text-sm text-gray-400 mt-3">
              <span>{new Date(debate.date).toLocaleDateString("pt-BR")}</span>
              <span>·</span>
              <span>{debate.time}</span>
              <span>·</span>
              <span>{debate.location}</span>
            </div>
          </div>

          {submitted ? (
            <div className="text-center py-16 bg-domus-surface rounded-[var(--radius-xl)] border border-domus-border-light">
              <CheckCircle className="w-16 h-16 text-domus-primary mx-auto mb-4" />
              <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-domus-text mb-2">
                Avaliação enviada
              </h2>
              <p className="text-domus-text-secondary mb-6">
                Sua avaliação foi registrada com sucesso.
              </p>
              <Link
                href={`/jurados/${id}`}
                className="text-sm font-semibold text-domus-primary hover:underline"
              >
                Voltar à área do jurado
              </Link>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="bg-domus-surface border border-domus-border-light rounded-[var(--radius-xl)] p-6 md:p-8"
            >
              <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-domus-text mb-6">
                Avaliação do Debate
              </h2>

              {/* Participant */}
              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-medium text-domus-text mb-1.5">
                    Participante / Equipe
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.participantName}
                    onChange={(e) =>
                      setFormData({ ...formData, participantName: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-background text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors"
                    placeholder="Nome do participante ou equipe"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-domus-text mb-1.5">
                    Equipe / Posição (opcional)
                  </label>
                  <input
                    type="text"
                    value={formData.team}
                    onChange={(e) =>
                      setFormData({ ...formData, team: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-background text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors"
                    placeholder="Ex: Governo, Oposição, Equipe A"
                  />
                </div>
              </div>

              {/* Scores */}
              <div className="mb-8">
                <h3 className="text-sm font-semibold text-domus-text uppercase tracking-wider mb-4">
                  Notas
                </h3>
                <ScoreInput
                  label="Argumentação"
                  value={formData.argumentation}
                  onChange={(v) => setFormData({ ...formData, argumentation: v })}
                />
                <ScoreInput
                  label="Oratória"
                  value={formData.oratory}
                  onChange={(v) => setFormData({ ...formData, oratory: v })}
                />
                <ScoreInput
                  label="Refutação"
                  value={formData.refutation}
                  onChange={(v) => setFormData({ ...formData, refutation: v })}
                />
                <ScoreInput
                  label="Clareza"
                  value={formData.clarity}
                  onChange={(v) => setFormData({ ...formData, clarity: v })}
                />
                <ScoreInput
                  label="Conteúdo"
                  value={formData.content}
                  onChange={(v) => setFormData({ ...formData, content: v })}
                />
              </div>

              {/* Comments */}
              <div className="space-y-4 mb-8">
                <div>
                  <label className="block text-sm font-medium text-domus-text mb-1.5">
                    Avaliação geral
                  </label>
                  <textarea
                    rows={3}
                    value={formData.generalComment}
                    onChange={(e) =>
                      setFormData({ ...formData, generalComment: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-background text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-domus-text mb-1.5">
                    Pontos positivos
                  </label>
                  <textarea
                    rows={2}
                    value={formData.strengths}
                    onChange={(e) =>
                      setFormData({ ...formData, strengths: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-background text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors resize-none"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-domus-text mb-1.5">
                    Pontos a desenvolver
                  </label>
                  <textarea
                    rows={2}
                    value={formData.improvements}
                    onChange={(e) =>
                      setFormData({ ...formData, improvements: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-background text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors resize-none"
                  />
                </div>
              </div>

              {/* Result */}
              <div className="mb-8">
                <label className="block text-sm font-medium text-domus-text mb-3">
                  Resultado
                </label>
                <div className="flex gap-3">
                  {(
                    [
                      { value: "vitoria", label: "Vitória" },
                      { value: "derrota", label: "Derrota" },
                      { value: "empate", label: "Empate" },
                    ] as const
                  ).map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() =>
                        setFormData({ ...formData, result: opt.value })
                      }
                      className={cn(
                        "px-5 py-2.5 text-sm font-medium rounded-[var(--radius-sm)] transition-all cursor-pointer",
                        formData.result === opt.value
                          ? "bg-domus-primary text-white"
                          : "bg-domus-background text-domus-text-secondary border border-domus-border-light hover:border-domus-primary/30"
                      )}
                    >
                      {opt.label}
                    </button>
                  ))}
                </div>
              </div>

              <Button type="submit" variant="primary" size="lg" className="w-full">
                Enviar avaliação
              </Button>
            </form>
          )}
        </div>
      </main>
      <Footer />
    </>
  );
}
