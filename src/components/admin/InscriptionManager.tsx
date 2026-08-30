"use client";

import { useEffect, useState } from "react";
import { RefreshCw, Users } from "lucide-react";
import { debates as defaultDebates } from "@/data/debates";
import type { Inscription } from "@/data/inscriptions";
import { fetchCloudDebates, fetchCloudInscriptions } from "@/lib/supabase-data";

export default function InscriptionManager() {
  const [items, setItems] = useState<Inscription[]>([]);
  const [titles, setTitles] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);

  const refresh = async () => {
    setLoading(true);
    const [cloudInscriptions, cloudDebates] = await Promise.all([fetchCloudInscriptions(), fetchCloudDebates()]);
    if (cloudInscriptions) setItems(cloudInscriptions);
    const currentDebates = cloudDebates || defaultDebates;
    setTitles(Object.fromEntries(currentDebates.map((debate) => [debate.id, debate.title])));
    setLoading(false);
  };

  useEffect(() => {
    void refresh();
    const interval = window.setInterval(() => void refresh(), 10000);
    return () => window.clearInterval(interval);
  }, []);

  const groups = Object.entries(items.reduce<Record<string, Inscription[]>>((result, item) => {
    (result[item.debateId] ||= []).push(item);
    return result;
  }, {}));

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between gap-4">
        <div><h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-domus-text">Inscrições por debate</h2><p className="text-sm text-domus-text-muted">Área exclusiva do administrador · atualização automática.</p></div>
        <button onClick={() => void refresh()} className="inline-flex items-center gap-2 px-4 py-2 text-sm border border-domus-border rounded-[var(--radius-sm)] text-domus-text"><RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} /> Atualizar</button>
      </div>
      {groups.length === 0 && !loading && <div className="py-12 text-center border border-domus-border-light rounded-[var(--radius-lg)] text-domus-text-muted">Nenhuma inscrição encontrada.</div>}
      {groups.map(([debateId, registrations]) => (
        <section key={debateId} className="bg-domus-surface border border-domus-border-light rounded-[var(--radius-lg)] overflow-hidden">
          <div className="flex items-center gap-3 p-5 border-b border-domus-border-light"><Users className="w-5 h-5 text-domus-primary" /><div><h3 className="font-semibold text-domus-text">{titles[debateId] || `Debate ${debateId}`}</h3><p className="text-xs text-domus-text-muted">{registrations.length} inscrição(ões)</p></div></div>
          <div className="overflow-x-auto"><table className="w-full text-left"><thead><tr className="border-b border-domus-border-light"><th className="p-4 text-xs uppercase text-domus-text-muted">Nome</th><th className="p-4 text-xs uppercase text-domus-text-muted">E-mail</th><th className="p-4 text-xs uppercase text-domus-text-muted">Sociedade</th><th className="p-4 text-xs uppercase text-domus-text-muted">Categoria</th><th className="p-4 text-xs uppercase text-domus-text-muted">Status</th></tr></thead><tbody>{registrations.map((item) => <tr key={item.id} className="border-b last:border-0 border-domus-border-light"><td className="p-4 text-sm text-domus-text">{item.name}</td><td className="p-4 text-sm text-domus-text-secondary">{item.email}</td><td className="p-4 text-sm text-domus-text-secondary">{item.society}</td><td className="p-4 text-sm text-domus-text-secondary">{item.category}</td><td className="p-4 text-sm text-domus-text-secondary">{item.status}</td></tr>)}</tbody></table></div>
        </section>
      ))}
    </div>
  );
}
