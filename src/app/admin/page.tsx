"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import { debates, formatLabels, participationLabels } from "@/data/debates";
import { inscriptions, getInscriptionsByDebate } from "@/data/inscriptions";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  FileText,
  Calendar,
  Users,
  Download,
  ChevronDown,
  ChevronUp,
  Eye,
  ArrowLeft,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";

type AdminTab = "dashboard" | "debates" | "inscricoes";

export default function AdminPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>("dashboard");
  const [selectedDebate, setSelectedDebate] = useState<string | null>(null);
  const [inscFilter, setInscFilter] = useState<"todos" | "domus" | "externas" | "independentes" | "confirmadas" | "pendentes">("todos");

  const tabs = [
    { key: "dashboard" as AdminTab, label: "Dashboard", icon: LayoutDashboard },
    { key: "debates" as AdminTab, label: "Debates", icon: FileText },
    { key: "inscricoes" as AdminTab, label: "Inscrições", icon: Users },
  ];

  const allInscricoes = selectedDebate
    ? getInscriptionsByDebate(selectedDebate)
    : inscriptions;

  const filteredInscricoes = allInscricoes.filter((i) => {
    if (inscFilter === "todos") return true;
    if (inscFilter === "domus") return i.society === "DOMUS";
    if (inscFilter === "externas") return i.society !== "DOMUS" && i.society !== "Independente";
    if (inscFilter === "independentes") return i.society === "Independente";
    if (inscFilter === "confirmadas") return i.status === "confirmada";
    if (inscFilter === "pendentes") return i.status === "pendente";
    return true;
  });

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20 min-h-screen bg-domus-background">
        <div className="max-w-7xl mx-auto px-6 md:px-8 py-8">
          {/* Header */}
          <div className="mb-8">
            <Link
              href="/"
              className="inline-flex items-center gap-2 text-sm text-domus-text-muted hover:text-domus-primary transition-colors mb-4"
            >
              <ArrowLeft className="w-4 h-4" />
              Voltar ao site
            </Link>
            <h1 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-domus-text">
              Painel Administrativo
            </h1>
            <p className="text-domus-text-secondary mt-2">
              Gerencie debates, inscrições e conteúdo da DOMUS.
            </p>
          </div>

          {/* Tabs */}
          <div className="flex gap-2 mb-8 border-b border-domus-border-light pb-4 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={cn(
                    "flex items-center gap-2 px-5 py-2.5 text-sm font-medium rounded-[var(--radius-sm)] transition-all whitespace-nowrap cursor-pointer",
                    activeTab === tab.key
                      ? "bg-domus-primary text-white shadow-md"
                      : "text-domus-text-secondary hover:bg-domus-primary/10 hover:text-domus-primary"
                  )}
                >
                  <Icon className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>

          {/* Dashboard */}
          {activeTab === "dashboard" && (
            <div className="space-y-8">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-domus-surface border border-domus-border-light rounded-[var(--radius-lg)] p-6">
                  <p className="text-sm text-domus-text-muted mb-1">Total de Debates</p>
                  <p className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-domus-primary">
                    {debates.length}
                  </p>
                </div>
                <div className="bg-domus-surface border border-domus-border-light rounded-[var(--radius-lg)] p-6">
                  <p className="text-sm text-domus-text-muted mb-1">Inscrições Totais</p>
                  <p className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-domus-primary">
                    {inscriptions.length}
                  </p>
                </div>
                <div className="bg-domus-surface border border-domus-border-light rounded-[var(--radius-lg)] p-6">
                  <p className="text-sm text-domus-text-muted mb-1">Inscrições Pendentes</p>
                  <p className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-domus-accent">
                    {inscriptions.filter((i) => i.status === "pendente").length}
                  </p>
                </div>
              </div>

              {/* Quick list */}
              <div className="bg-domus-surface border border-domus-border-light rounded-[var(--radius-lg)] overflow-hidden">
                <div className="p-6 border-b border-domus-border-light">
                  <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-domus-text">
                    Próximos Debates
                  </h2>
                </div>
                <div className="divide-y divide-domus-border-light">
                  {debates
                    .filter((d) => d.status === "upcoming")
                    .map((d) => (
                      <div key={d.id} className="p-6 flex items-center justify-between">
                        <div>
                          <p className="font-semibold text-domus-text">{d.title}</p>
                          <p className="text-sm text-domus-text-muted">
                            {new Date(d.date).toLocaleDateString("pt-BR")} · {d.time}
                          </p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm text-domus-text-muted">
                            {d.currentParticipants || 0}/{d.maxParticipants || "—"} inscritos
                          </span>
                          <Link
                            href={`/debates/${d.slug}`}
                            className="text-sm text-domus-primary hover:text-domus-primary-dark"
                          >
                            <Eye className="w-4 h-4" />
                          </Link>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          )}

          {/* Debates */}
          {activeTab === "debates" && (
            <div className="space-y-4">
              {debates.map((debate) => (
                <div
                  key={debate.id}
                  className="bg-domus-surface border border-domus-border-light rounded-[var(--radius-lg)] p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-mono text-domus-text-muted">
                          #{String(debate.number).padStart(2, "0")}
                        </span>
                        <span
                          className={cn(
                            "text-xs font-semibold px-2 py-0.5 rounded-full",
                            debate.status === "upcoming"
                              ? "bg-green-50 text-green-700"
                              : "bg-gray-100 text-gray-500"
                          )}
                        >
                          {debate.status === "upcoming" ? "Próximo" : "Realizado"}
                        </span>
                      </div>
                      <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-domus-text">
                        {debate.title}
                      </h3>
                      <p className="text-sm text-domus-text-secondary mt-1">
                        {debate.theme}
                      </p>
                      <div className="flex flex-wrap gap-3 mt-2 text-xs text-domus-text-muted">
                        <span>{new Date(debate.date).toLocaleDateString("pt-BR")}</span>
                        <span>·</span>
                        <span>{formatLabels[debate.format]}</span>
                        <span>·</span>
                        <span>{participationLabels[debate.participation]}</span>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="text-right">
                        <p className="text-sm font-semibold text-domus-text">
                          {debate.currentParticipants || 0}/{debate.maxParticipants || "∞"}
                        </p>
                        <p className="text-xs text-domus-text-muted">inscritos</p>
                      </div>
                      <Link
                        href={`/debates/${debate.slug}`}
                        className="px-4 py-2 text-sm font-medium text-domus-primary border border-domus-primary rounded-[var(--radius-sm)] hover:bg-domus-primary hover:text-white transition-colors"
                      >
                        Ver
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Inscriptions */}
          {activeTab === "inscricoes" && (
            <div className="space-y-6">
              {/* Filters */}
              <div className="flex flex-wrap gap-3">
                <select
                  value={selectedDebate || ""}
                  onChange={(e) => setSelectedDebate(e.target.value || null)}
                  className="px-4 py-2 text-sm border border-domus-border rounded-[var(--radius-sm)] bg-domus-surface text-domus-text"
                >
                  <option value="">Todos os debates</option>
                  {debates.map((d) => (
                    <option key={d.id} value={d.id}>
                      {d.title}
                    </option>
                  ))}
                </select>

                <div className="flex gap-2 flex-wrap">
                  {(
                    [
                      { key: "todos", label: "Todos" },
                      { key: "domus", label: "DOMUS" },
                      { key: "externas", label: "Outras Sociedades" },
                      { key: "independentes", label: "Independentes" },
                      { key: "confirmadas", label: "Confirmadas" },
                      { key: "pendentes", label: "Pendentes" },
                    ] as const
                  ).map((f) => (
                    <button
                      key={f.key}
                      onClick={() => setInscFilter(f.key)}
                      className={cn(
                        "px-4 py-2 text-sm font-medium rounded-full transition-all cursor-pointer",
                        inscFilter === f.key
                          ? "bg-domus-primary text-white"
                          : "bg-domus-surface text-domus-text-secondary border border-domus-border-light hover:border-domus-primary/30"
                      )}
                    >
                      {f.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Table */}
              <div className="bg-domus-surface border border-domus-border-light rounded-[var(--radius-lg)] overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full text-left">
                    <thead>
                      <tr className="border-b border-domus-border-light">
                        <th className="py-3 px-4 text-xs font-semibold tracking-wider uppercase text-domus-text-muted">
                          Nome
                        </th>
                        <th className="py-3 px-4 text-xs font-semibold tracking-wider uppercase text-domus-text-muted">
                          Sociedade
                        </th>
                        <th className="py-3 px-4 text-xs font-semibold tracking-wider uppercase text-domus-text-muted">
                          Categoria
                        </th>
                        <th className="py-3 px-4 text-xs font-semibold tracking-wider uppercase text-domus-text-muted">
                          Status
                        </th>
                        <th className="py-3 px-4 text-xs font-semibold tracking-wider uppercase text-domus-text-muted">
                          Debate
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredInscricoes.map((insc) => {
                        const debate = debates.find((d) => d.id === insc.debateId);
                        return (
                          <tr
                            key={insc.id}
                            className="border-b border-domus-border-light last:border-0 hover:bg-domus-primary/5 transition-colors"
                          >
                            <td className="py-3 px-4">
                              <div>
                                <p className="font-medium text-domus-text text-sm">{insc.name}</p>
                                <p className="text-xs text-domus-text-muted">{insc.email}</p>
                              </div>
                            </td>
                            <td className="py-3 px-4 text-sm text-domus-text-secondary">
                              {insc.society}
                            </td>
                            <td className="py-3 px-4 text-sm text-domus-text-secondary">
                              {insc.category}
                            </td>
                            <td className="py-3 px-4">
                              <span
                                className={cn(
                                  "inline-flex items-center gap-1 text-xs font-semibold px-2 py-0.5 rounded-full",
                                  insc.status === "confirmada"
                                    ? "bg-green-50 text-green-700"
                                    : insc.status === "pendente"
                                    ? "bg-amber-50 text-amber-700"
                                    : "bg-red-50 text-red-700"
                                )}
                              >
                                {insc.status === "confirmada" && <CheckCircle className="w-3 h-3" />}
                                {insc.status === "pendente" && <Clock className="w-3 h-3" />}
                                {insc.status === "cancelada" && <XCircle className="w-3 h-3" />}
                                {insc.status.charAt(0).toUpperCase() + insc.status.slice(1)}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-sm text-domus-text-secondary">
                              {debate?.title || "—"}
                            </td>
                          </tr>
                        );
                      })}
                      {filteredInscricoes.length === 0 && (
                        <tr>
                          <td colSpan={5} className="py-8 text-center text-domus-text-muted">
                            Nenhuma inscrição encontrada.
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Export */}
              <div className="flex justify-end">
                <button className="inline-flex items-center gap-2 px-5 py-2.5 text-sm font-medium text-domus-primary border border-domus-primary rounded-[var(--radius-sm)] hover:bg-domus-primary hover:text-white transition-colors cursor-pointer">
                  <Download className="w-4 h-4" />
                  Exportar inscritos
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </>
  );
}
