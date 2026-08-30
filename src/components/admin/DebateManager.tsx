"use client";

import { useEffect, useState } from "react";
import { Check, Pencil, Plus, Trash2, X } from "lucide-react";
import { debates as defaultDebates, formatLabels, participationLabels, type Debate, type DebateFormat, type DebateParticipation } from "@/data/debates";
import { deleteCloudDebate, fetchCloudDebates, seedCloudDebates, upsertCloudDebate } from "@/lib/supabase-data";

const STORAGE_KEY = "domus_managed_debates";
type DebateForm = Omit<Debate, "id" | "number" | "currentParticipants" | "participants" | "result">;
const emptyForm: DebateForm = {
  slug: "", title: "", subtitle: "", theme: "", description: "", date: "", time: "", location: "",
  format: "simples", participation: "interno", status: "upcoming", inscriptionsOpen: false,
  maxParticipants: 30, category: "Institucional", rules: "", edital: "", tabbycatUrl: "",
};

function loadDebates(): Debate[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultDebates;
  } catch {
    return defaultDebates;
  }
}

export function getManagedDebates(): Debate[] {
  if (typeof window === "undefined") return defaultDebates;
  return loadDebates();
}

export default function DebateManager() {
  const [items, setItems] = useState<Debate[]>([]);
  const [form, setForm] = useState<DebateForm>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let active = true;
    setItems(loadDebates());
    seedCloudDebates().then(() => fetchCloudDebates().then((cloud) => { if (active && cloud) setItems(cloud); }));
    return () => { active = false; };
  }, []);

  const persist = (next: Debate[]) => {
    setItems(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const handlePdfChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || file.type !== "application/pdf") return;
    const reader = new FileReader();
    reader.onload = () => setForm((current) => ({ ...current, edital: String(reader.result) }));
    reader.readAsDataURL(file);
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = editingId
      ? items.map((item) => item.id === editingId ? { ...item, ...form } : item)
      : [...items, { ...form, id: `debate_${Date.now()}`, number: items.length + 1, currentParticipants: 0 }];
    persist(next);
    const saved = next.find((item) => item.id === (editingId || next[next.length - 1].id));
    if (saved) void upsertCloudDebate(saved);
    setForm(emptyForm);
    setEditingId(null);
    setOpen(false);
  };

  const edit = (item: Debate) => {
    const { id: _id, number: _number, currentParticipants: _current, participants: _participants, result: _result, ...values } = item;
    setForm(values);
    setEditingId(item.id);
    setOpen(true);
  };

  const input = (field: keyof DebateForm, label: string, type = "text", required = false) => (
    <input
      type={type}
      required={required}
      value={String(form[field] ?? "")}
      onChange={(e) => setForm({ ...form, [field]: e.target.value })}
      placeholder={label}
      className="px-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-background text-sm text-domus-text"
    />
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div><h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-domus-text">Debates</h2><p className="text-sm text-domus-text-muted">Crie, edite ou exclua debates.</p></div>
        <button onClick={() => { setForm(emptyForm); setEditingId(null); setOpen(true); }} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-domus-primary text-white rounded-[var(--radius-sm)]"><Plus className="w-4 h-4" /> Novo debate</button>
      </div>
      {open && (
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-domus-surface border border-domus-border-light rounded-[var(--radius-lg)]">
          {input("title", "Título *", "text", true)}
          {input("slug", "Slug *", "text", true)}
          {input("theme", "Tema *", "text", true)}
          {input("category", "Categoria", "text")}
          {input("date", "Data *", "date", true)}
          {input("time", "Horário *", "time", true)}
          {input("location", "Local *", "text", true)}
          {input("maxParticipants", "Limite de vagas", "number")}
          <select value={form.format} onChange={(e) => setForm({ ...form, format: e.target.value as DebateFormat })} className="px-4 py-3 rounded border border-domus-border bg-domus-background text-sm">{Object.entries(formatLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select>
          <select value={form.participation} onChange={(e) => setForm({ ...form, participation: e.target.value as DebateParticipation })} className="px-4 py-3 rounded border border-domus-border bg-domus-background text-sm">{Object.entries(participationLabels).map(([key, label]) => <option key={key} value={key}>{label}</option>)}</select>
          <select value={form.status} onChange={(e) => setForm({ ...form, status: e.target.value as Debate["status"] })} className="px-4 py-3 rounded border border-domus-border bg-domus-background text-sm"><option value="upcoming">Próximo</option><option value="past">Realizado</option></select>
          {input("edital", "Link do edital em PDF")}
          <div className="md:col-span-2">
            <label className="block text-sm font-medium text-domus-text mb-1.5">Ou selecione o arquivo PDF</label>
            <input type="file" accept="application/pdf,.pdf" onChange={handlePdfChange} className="block w-full text-sm text-domus-text-muted file:mr-3 file:rounded file:border-0 file:bg-domus-primary file:px-3 file:py-2 file:text-white" />
            {form.edital?.startsWith("data:application/pdf") && <p className="text-xs text-green-700 mt-1">PDF selecionado e pronto para salvar.</p>}
            <p className="text-xs text-domus-text-muted mt-1">O arquivo fica salvo neste navegador. Para disponibilizar para todos os usuários, prefira um link público.</p>
          </div>
          {input("tabbycatUrl", "Link do Tabbycat")}
          <textarea required value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} placeholder="Descrição *" className="md:col-span-2 px-4 py-3 rounded border border-domus-border bg-domus-background text-sm" rows={3} />
          <textarea value={form.rules} onChange={(e) => setForm({ ...form, rules: e.target.value })} placeholder="Regras" className="md:col-span-2 px-4 py-3 rounded border border-domus-border bg-domus-background text-sm" rows={3} />
          <label className="flex items-center gap-2 text-sm text-domus-text"><input type="checkbox" checked={form.inscriptionsOpen} onChange={(e) => setForm({ ...form, inscriptionsOpen: e.target.checked })} /> Inscrições abertas</label>
          <div className="flex gap-3 md:col-span-2"><button type="submit" className="inline-flex items-center gap-2 px-5 py-2.5 bg-domus-primary text-white rounded text-sm"><Check className="w-4 h-4" /> Salvar</button><button type="button" onClick={() => setOpen(false)} className="inline-flex items-center gap-2 px-5 py-2.5 border border-domus-border rounded text-sm"><X className="w-4 h-4" /> Cancelar</button></div>
        </form>
      )}
      <div className="space-y-3">
        {items.map((item) => <div key={item.id} className="flex items-center justify-between gap-4 p-5 bg-domus-surface border border-domus-border-light rounded-[var(--radius-lg)]"><div><p className="font-medium text-domus-text">{item.title}</p><p className="text-sm text-domus-text-muted">{item.date} · {item.time} · {item.inscriptionsOpen ? "Inscrições abertas" : "Inscrições fechadas"}</p></div><div className="flex gap-2"><button onClick={() => edit(item)} aria-label="Editar debate" className="p-2 text-domus-text-muted hover:text-domus-primary"><Pencil className="w-4 h-4" /></button><button onClick={() => { persist(items.filter((current) => current.id !== item.id)); void deleteCloudDebate(item.id); }} aria-label="Excluir debate" className="p-2 text-domus-text-muted hover:text-red-500"><Trash2 className="w-4 h-4" /></button></div></div>)}
      </div>
    </div>
  );
}
