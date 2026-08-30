"use client";

import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Plus, Pencil, Trash2, X, Check, Calendar, Clock, MapPin } from "lucide-react";
import { formatLabels, participationLabels, type DebateFormat, type DebateParticipation } from "@/data/debates";

export interface ManagedEvent {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  type: string;
  format: DebateFormat;
  participation: DebateParticipation;
  status: "upcoming" | "past";
  inscriptionsOpen: boolean;
  maxParticipants?: number;
  currentParticipants: number;
}

const STORAGE_KEY = "domus_managed_events";

function loadEvents(): ManagedEvent[] {
  if (typeof window === "undefined") return [];
  const stored = localStorage.getItem(STORAGE_KEY);
  return stored ? JSON.parse(stored) : [];
}

function saveEvents(events: ManagedEvent[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(events));
}

const defaultEvent: Omit<ManagedEvent, "id" | "currentParticipants"> = {
  name: "",
  description: "",
  date: "",
  time: "",
  location: "",
  type: "Debate",
  format: "simples",
  participation: "interno",
  status: "upcoming",
  inscriptionsOpen: false,
  maxParticipants: 30,
};

export default function EventManager() {
  const [events, setEvents] = useState<ManagedEvent[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState(defaultEvent);
  const [deleteConfirm, setDeleteConfirm] = useState<string | null>(null);

  useEffect(() => {
    setEvents(loadEvents());
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? (e.target as HTMLInputElement).checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let updated: ManagedEvent[];

    if (editingId) {
      updated = events.map((ev) =>
        ev.id === editingId
          ? { ...ev, ...formData }
          : ev
      );
    } else {
      const newEvent: ManagedEvent = {
        ...formData,
        id: String(Date.now()),
        currentParticipants: 0,
      };
      updated = [...events, newEvent];
    }

    setEvents(updated);
    saveEvents(updated);
    setShowForm(false);
    setEditingId(null);
    setFormData(defaultEvent);
  };

  const handleEdit = (event: ManagedEvent) => {
    setFormData({
      name: event.name,
      description: event.description,
      date: event.date,
      time: event.time,
      location: event.location,
      type: event.type,
      format: event.format,
      participation: event.participation,
      status: event.status,
      inscriptionsOpen: event.inscriptionsOpen,
      maxParticipants: event.maxParticipants,
    });
    setEditingId(event.id);
    setShowForm(true);
  };

  const handleDelete = (id: string) => {
    const updated = events.filter((ev) => ev.id !== id);
    setEvents(updated);
    saveEvents(updated);
    setDeleteConfirm(null);
  };

  const handleCancel = () => {
    setShowForm(false);
    setEditingId(null);
    setFormData(defaultEvent);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-domus-text">
          Eventos Gerenciados
        </h2>
        <button
          onClick={() => {
            setShowForm(true);
            setEditingId(null);
            setFormData(defaultEvent);
          }}
          className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-domus-primary text-white rounded-[var(--radius-sm)] hover:bg-domus-primary-dark transition-colors cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          Novo Evento
        </button>
      </div>

      {/* Form */}
      {showForm && (
        <div className="bg-domus-surface border border-domus-border-light rounded-[var(--radius-xl)] p-6 md:p-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-domus-text">
              {editingId ? "Editar Evento" : "Novo Evento"}
            </h3>
            <button
              onClick={handleCancel}
              className="p-2 text-domus-text-muted hover:text-domus-text transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-domus-text mb-1.5">
                  Nome do evento *
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-background text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors"
                  placeholder="Ex: DOMUS Debate #05"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-domus-text mb-1.5">
                  Descrição
                </label>
                <textarea
                  name="description"
                  rows={3}
                  value={formData.description}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-background text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors resize-none"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-domus-text mb-1.5">
                  Tipo de evento *
                </label>
                <select
                  name="type"
                  value={formData.type}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-background text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors"
                >
                  <option>Debate</option>
                  <option>Torneio</option>
                  <option>Encontro</option>
                  <option>Palestra</option>
                  <option>Workshop</option>
                  <option>Treinamento</option>
                  <option>Evento institucional</option>
                  <option>Outro</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-domus-text mb-1.5">
                  Formato
                </label>
                <select
                  name="format"
                  value={formData.format}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-background text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors"
                >
                  {Object.entries(formatLabels).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-domus-text mb-1.5">
                  Data *
                </label>
                <input
                  name="date"
                  type="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-background text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-domus-text mb-1.5">
                  Horário *
                </label>
                <input
                  name="time"
                  type="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-background text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors"
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-domus-text mb-1.5">
                  Local *
                </label>
                <input
                  name="location"
                  type="text"
                  required
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-background text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors"
                  placeholder="Ex: Auditório Central"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-domus-text mb-1.5">
                  Participação
                </label>
                <select
                  name="participation"
                  value={formData.participation}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-background text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors"
                >
                  {Object.entries(participationLabels).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-domus-text mb-1.5">
                  Limite de vagas
                </label>
                <input
                  name="maxParticipants"
                  type="number"
                  min={0}
                  value={formData.maxParticipants || ""}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-background text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors"
                  placeholder="Ex: 30"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-domus-text mb-1.5">
                  Status
                </label>
                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-background text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors"
                >
                  <option value="upcoming">Próximo</option>
                  <option value="past">Realizado</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="flex items-center gap-3 cursor-pointer">
                  <input
                    name="inscriptionsOpen"
                    type="checkbox"
                    checked={formData.inscriptionsOpen}
                    onChange={handleChange}
                    className="rounded border-domus-border text-domus-primary focus:ring-domus-primary"
                  />
                  <span className="text-sm font-medium text-domus-text">
                    Inscrições abertas
                  </span>
                </label>
              </div>
            </div>

            <div className="flex gap-3 pt-4">
              <button
                type="submit"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium bg-domus-primary text-white rounded-[var(--radius-sm)] hover:bg-domus-primary-dark transition-colors cursor-pointer"
              >
                <Check className="w-4 h-4" />
                {editingId ? "Salvar alterações" : "Criar evento"}
              </button>
              <button
                type="button"
                onClick={handleCancel}
                className="px-6 py-3 text-sm font-medium text-domus-text-secondary border border-domus-border rounded-[var(--radius-sm)] hover:bg-domus-background transition-colors cursor-pointer"
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Events list */}
      <div className="space-y-3">
        {events.length === 0 && !showForm && (
          <div className="text-center py-12 bg-domus-surface border border-domus-border-light rounded-[var(--radius-lg)]">
            <p className="text-domus-text-muted">
              Nenhum evento gerenciado ainda.
            </p>
            <p className="text-sm text-domus-text-muted mt-1">
              Clique em &ldquo;Novo Evento&rdquo; para começar.
            </p>
          </div>
        )}

        {events.map((event) => (
          <div
            key={event.id}
            className="bg-domus-surface border border-domus-border-light rounded-[var(--radius-lg)] p-6"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2 mb-1">
                  <span className="text-xs font-semibold tracking-wider uppercase text-domus-accent bg-domus-accent/10 px-2 py-0.5 rounded-full">
                    {event.type}
                  </span>
                  <span
                    className={cn(
                      "text-xs font-semibold px-2 py-0.5 rounded-full",
                      event.status === "upcoming"
                        ? "bg-green-50 text-green-700"
                        : "bg-gray-100 text-gray-500"
                    )}
                  >
                    {event.status === "upcoming" ? "Próximo" : "Realizado"}
                  </span>
                  {event.inscriptionsOpen && (
                    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-50 text-blue-700">
                      Inscrições abertas
                    </span>
                  )}
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-domus-text">
                  {event.name}
                </h3>
                {event.description && (
                  <p className="text-sm text-domus-text-secondary mt-1 line-clamp-1">
                    {event.description}
                  </p>
                )}
                <div className="flex flex-wrap gap-4 text-sm text-domus-text-muted mt-2">
                  <span className="flex items-center gap-1.5">
                    <Calendar className="w-4 h-4" />
                    {event.date
                      ? new Date(event.date).toLocaleDateString("pt-BR")
                      : "Sem data"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-4 h-4" />
                    {event.time || "—"}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-4 h-4" />
                    {event.location || "—"}
                  </span>
                </div>
              </div>

              <div className="flex items-center gap-2">
                {deleteConfirm === event.id ? (
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-domus-text-muted">
                      Excluir?
                    </span>
                    <button
                      onClick={() => handleDelete(event.id)}
                      className="px-3 py-1.5 text-xs font-medium bg-red-500 text-white rounded cursor-pointer hover:bg-red-600 transition-colors"
                    >
                      Sim
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(null)}
                      className="px-3 py-1.5 text-xs font-medium bg-gray-200 text-gray-700 rounded cursor-pointer hover:bg-gray-300 transition-colors"
                    >
                      Não
                    </button>
                  </div>
                ) : (
                  <>
                    <button
                      onClick={() => handleEdit(event)}
                      className="p-2 text-domus-text-muted hover:text-domus-primary transition-colors cursor-pointer"
                      aria-label="Editar"
                    >
                      <Pencil className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => setDeleteConfirm(event.id)}
                      className="p-2 text-domus-text-muted hover:text-red-500 transition-colors cursor-pointer"
                      aria-label="Excluir"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
