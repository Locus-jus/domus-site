"use client";

import { useEffect, useState } from "react";
import { Check, Pencil, Plus, Trash2, X } from "lucide-react";
import { articles as defaultIdeas, type Article } from "@/data/articles";

const STORAGE_KEY = "domus_managed_ideas";
type IdeaForm = Omit<Article, "id">;
const emptyIdea: IdeaForm = { title: "", excerpt: "", category: "Debate", author: "", date: "", readTime: "" };

function loadIdeas(): Article[] {
  try { const saved = localStorage.getItem(STORAGE_KEY); return saved ? JSON.parse(saved) : defaultIdeas; } catch { return defaultIdeas; }
}

export default function IdeaManager() {
  const [items, setItems] = useState<Article[]>([]);
  const [form, setForm] = useState<IdeaForm>(emptyIdea);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [open, setOpen] = useState(false);
  useEffect(() => setItems(loadIdeas()), []);
  const handlePdf = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file || file.type !== "application/pdf") return;
    const reader = new FileReader();
    reader.onload = () => setForm((current) => ({ ...current, pdfUrl: String(reader.result) }));
    reader.readAsDataURL(file);
  };
  const persist = (next: Article[]) => { setItems(next); localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); window.dispatchEvent(new Event("domus:ideas-changed")); };
  const submit = (e: React.FormEvent) => { e.preventDefault(); const next = editingId ? items.map((item) => item.id === editingId ? { ...item, ...form } : item) : [...items, { ...form, id: `idea_${Date.now()}` }]; persist(next); setForm(emptyIdea); setEditingId(null); setOpen(false); };
  return <div className="space-y-6"><div className="flex items-center justify-between"><div><h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-domus-text">Ideias</h2><p className="text-sm text-domus-text-muted">Crie, edite ou remova artigos e reflexões.</p></div><button onClick={() => { setForm(emptyIdea); setEditingId(null); setOpen(true); }} className="inline-flex items-center gap-2 px-4 py-2 text-sm font-medium bg-domus-primary text-white rounded"><Plus className="w-4 h-4" /> Nova ideia</button></div>
    {open && <form onSubmit={submit} className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 bg-domus-surface border border-domus-border-light rounded-lg">{(["title", "category", "author", "date", "readTime"] as const).map((field) => <input key={field} required={field === "title"} type={field === "date" ? "date" : "text"} value={form[field]} onChange={(e) => setForm({ ...form, [field]: e.target.value })} placeholder={field} className="px-4 py-3 rounded border border-domus-border bg-domus-background text-sm" />)}<textarea required value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })} placeholder="Resumo" className="md:col-span-2 px-4 py-3 rounded border border-domus-border bg-domus-background text-sm" rows={3} /><div className="md:col-span-2"><label className="block text-sm font-medium text-domus-text mb-2">Upload do artigo em PDF</label><input type="file" accept="application/pdf,.pdf" onChange={handlePdf} className="block w-full text-sm text-domus-text-muted file:mr-3 file:rounded file:border-0 file:bg-domus-primary file:px-3 file:py-2 file:text-white" /><p className="text-xs text-domus-text-muted mt-1">O PDF será associado à ideia neste navegador.</p></div><div className="flex gap-3 md:col-span-2"><button className="inline-flex items-center gap-2 px-5 py-2 bg-domus-primary text-white rounded text-sm"><Check className="w-4 h-4" /> Salvar</button><button type="button" onClick={() => setOpen(false)} className="inline-flex items-center gap-2 px-5 py-2 border border-domus-border rounded text-sm"><X className="w-4 h-4" /> Cancelar</button></div></form>}
    {items.map((item) => <div key={item.id} className="flex items-center justify-between gap-4 p-5 bg-domus-surface border border-domus-border-light rounded-lg"><div><p className="font-medium text-domus-text">{item.title}</p><p className="text-sm text-domus-text-muted">{item.category} · {item.author} · {item.date}</p></div><div className="flex gap-2"><button onClick={() => { const { id: _id, ...values } = item; setForm(values); setEditingId(item.id); setOpen(true); }} aria-label="Editar ideia" className="p-2 text-domus-text-muted hover:text-domus-primary"><Pencil className="w-4 h-4" /></button><button onClick={() => persist(items.filter((current) => current.id !== item.id))} aria-label="Excluir ideia" className="p-2 text-domus-text-muted hover:text-red-500"><Trash2 className="w-4 h-4" /></button></div></div>)}</div>;
}
