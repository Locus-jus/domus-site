"use client";

import { useEffect, useState } from "react";
import { Check, Pencil, Plus, Trash2, X } from "lucide-react";
import { judges as defaultJudges, type Judge } from "@/data/judges";

const STORAGE_KEY = "domus_managed_judges";
const emptyJudge: Omit<Judge, "id"> = {
  name: "",
  email: "",
  society: "",
  experience: "",
  notes: "",
  assignedDebates: [],
};

function loadJudges(): Judge[] {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    return saved ? JSON.parse(saved) : defaultJudges;
  } catch {
    return defaultJudges;
  }
}

export default function JudgeManager() {
  const [items, setItems] = useState<Judge[]>([]);
  const [form, setForm] = useState(emptyJudge);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);

  useEffect(() => setItems(loadJudges()), []);

  const persist = (next: Judge[]) => {
    setItems(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const next = editingId
      ? items.map((item) => item.id === editingId ? { ...item, ...form } : item)
      : [...items, { ...form, id: `judge_${Date.now()}` }];
    persist(next);
    setForm(emptyJudge);
    setEditingId(null);
    setOpen(false);
  };

  const edit = (judge: Judge) => {
    setForm({ name: judge.name, email: judge.email, society: judge.society, experience: judge.experience, notes: judge.notes, assignedDebates: judge.assignedDebates });
    setEditingId(judge.id);
    setOpen(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-domus-text">Jurados</h2>
        <button onClick={() => { setForm(emptyJudge); setEditingId(null); setOpen(true); }} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-domus-primary text-white rounded-[var(--radius-sm)]">
          <Plus className="w-4 h-4" /> Novo jurado
        </button>
      </div>
      {open && (
        <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-domus-surface border border-domus-border-light rounded-[var(--radius-lg)]">
          {(["name", "email", "society", "experience"] as const).map((field) => (
            <input key={field} required={field !== "experience"} value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} placeholder={{ name: "Nome *", email: "E-mail *", society: "Sociedade *", experience: "Experiência" }[field]} className="px-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-background text-sm" />
          ))}
          <div className="flex gap-3 md:col-span-2">
            <button type="submit" className="inline-flex items-center gap-2 px-5 py-2.5 bg-domus-primary text-white rounded-[var(--radius-sm)] text-sm"><Check className="w-4 h-4" /> Salvar</button>
            <button type="button" onClick={() => setOpen(false)} className="inline-flex items-center gap-2 px-5 py-2.5 border border-domus-border rounded-[var(--radius-sm)] text-sm"><X className="w-4 h-4" /> Cancelar</button>
          </div>
        </form>
      )}
      <div className="space-y-3">
        {items.map((judge) => (
          <div key={judge.id} className="flex items-center justify-between gap-4 p-5 bg-domus-surface border border-domus-border-light rounded-[var(--radius-lg)]">
            <div><p className="font-medium text-domus-text">{judge.name}</p><p className="text-sm text-domus-text-muted">{judge.email} · {judge.society}</p><p className="text-sm text-domus-text-secondary mt-1">{judge.experience}</p></div>
            <div className="flex gap-2"><button onClick={() => edit(judge)} aria-label="Editar jurado" className="p-2 text-domus-text-muted hover:text-domus-primary"><Pencil className="w-4 h-4" /></button><button onClick={() => persist(items.filter((item) => item.id !== judge.id))} aria-label="Excluir jurado" className="p-2 text-domus-text-muted hover:text-red-500"><Trash2 className="w-4 h-4" /></button></div>
          </div>
        ))}
      </div>
    </div>
  );
}
