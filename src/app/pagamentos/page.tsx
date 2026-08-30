"use client";

import { useEffect, useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { debates as defaultDebates, type Debate } from "@/data/debates";
import { fetchCloudDebates } from "@/lib/supabase-data";
import { useAuth } from "@/lib/auth";
import { CreditCard, Calendar, ArrowRight } from "lucide-react";

export default function PagamentosPage() {
  const [debates, setDebates] = useState<Debate[]>(defaultDebates);
  const { user } = useAuth();
  useEffect(() => { void fetchCloudDebates().then((cloud) => { if (cloud) setDebates(cloud); }); }, []);
  const paid = debates.filter((debate) => debate.isPaid && debate.status === "upcoming");
  return <><Navbar /><main className="flex-1 pt-20"><section className="bg-domus-dark py-16 md:py-24"><div className="max-w-4xl mx-auto px-6 text-center"><span className="text-xs font-semibold tracking-[0.2em] uppercase text-domus-accent">Participação</span><h1 className="font-[family-name:var(--font-playfair)] text-4xl font-bold text-white mt-4">Pagamentos</h1><p className="text-gray-400 mt-4">Consulte as taxas dos debates pagos e solicite as instruções.</p></div></section><section className="py-16 bg-domus-background"><div className="max-w-4xl mx-auto px-6 space-y-5">{paid.length === 0 ? <p className="text-center text-domus-text-muted">Nenhum debate pago com inscrições abertas.</p> : paid.map((debate) => { const body = `Olá, gostaria de receber as instruções de pagamento para o debate ${debate.title}.\n\nDados do participante:\nNome: ${user?.name || "Não informado"}\nE-mail: ${user?.email || "Não informado"}\nTelefone: ${user?.phone || "Não informado"}\nInstituição: ${user?.institution || "Não informada"}\nMembro DOMUS: ${user?.isDomusMember ? "Sim" : "Não"}`; return <div key={debate.id} className="p-6 bg-domus-surface border border-domus-border-light rounded-[var(--radius-lg)]"><div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5"><div><h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-domus-text">{debate.title}</h2><p className="flex items-center gap-2 text-sm text-domus-text-muted mt-2"><Calendar className="w-4 h-4" />{new Date(debate.date).toLocaleDateString("pt-BR")}</p><p className="text-sm text-domus-text-secondary mt-3">{debate.pricing?.description || "Consulte a taxa de participação."}</p><p className="text-sm text-domus-accent font-medium mt-2">Membros DOMUS: isentos de taxa.</p></div><a href={`mailto:domusoratoriaedebates@gmail.com?subject=${encodeURIComponent(`Pagamento - ${debate.title}`)}&body=${encodeURIComponent(body)}`} className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-domus-primary text-white rounded text-sm">Solicitar pagamento <ArrowRight className="w-4 h-4" /></a></div></div>; })}</div></section></main><Footer /></>;
}
