"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { UserPlus, Mail, Lock, User, Phone, Building2, AlertCircle, CheckCircle } from "lucide-react";

export default function RegisterPage() {
  const router = useRouter();
  const { register } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    phone: "",
    institution: "",
    isDomusMember: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (form.password.length < 6) {
      setError("A senha deve ter pelo menos 6 caracteres.");
      setLoading(false);
      return;
    }

    const success = await register(form);
    setLoading(false);

    if (success) {
      router.push("/perfil");
    } else {
      setError("Erro ao criar conta. Tente novamente.");
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">
        <section className="min-h-[80vh] flex items-center justify-center bg-domus-background px-6 py-12">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-domus-text mb-2">
                Criar conta
              </h1>
              <p className="text-domus-text-secondary">
                Junte-se à comunidade DOMUS
              </p>
            </div>

            <div className="p-8 rounded-[var(--radius-xl)] border border-domus-border-light bg-domus-surface shadow-[var(--shadow-md)]">
              {error && (
                <div className="flex items-center gap-2 p-3 mb-6 rounded-[var(--radius-sm)] bg-red-50 text-red-700 text-sm">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  {error}
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-domus-text mb-1.5">
                    Nome completo *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-domus-text-muted" />
                    <input
                      id="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-background text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors"
                      placeholder="Seu nome completo"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-domus-text mb-1.5">
                    E-mail *
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-domus-text-muted" />
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => setForm({ ...form, email: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-background text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-domus-text mb-1.5">
                    Senha *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-domus-text-muted" />
                    <input
                      id="password"
                      type="password"
                      required
                      value={form.password}
                      onChange={(e) => setForm({ ...form, password: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-background text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors"
                      placeholder="Mínimo 6 caracteres"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-domus-text mb-1.5">
                    Telefone (opcional)
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-domus-text-muted" />
                    <input
                      id="phone"
                      type="tel"
                      value={form.phone}
                      onChange={(e) => setForm({ ...form, phone: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-background text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors"
                      placeholder="(00) 00000-0000"
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="institution" className="block text-sm font-medium text-domus-text mb-1.5">
                    Instituição (opcional)
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-domus-text-muted" />
                    <input
                      id="institution"
                      type="text"
                      value={form.institution}
                      onChange={(e) => setForm({ ...form, institution: e.target.value })}
                      className="w-full pl-10 pr-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-background text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors"
                      placeholder="Sua instituição de ensino"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-3 p-4 rounded-[var(--radius-sm)] border border-domus-border-light bg-domus-background">
                  <input
                    id="isDomusMember"
                    type="checkbox"
                    checked={form.isDomusMember}
                    onChange={(e) => setForm({ ...form, isDomusMember: e.target.checked })}
                    className="w-4 h-4 rounded border-domus-border text-domus-primary focus:ring-domus-primary/30"
                  />
                  <label htmlFor="isDomusMember" className="text-sm text-domus-text">
                    Sou membro da DOMUS
                  </label>
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
                  <UserPlus className="w-4 h-4 mr-2" />
                  {loading ? "Criando conta..." : "Criar conta"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-domus-text-muted">
                  Já tem conta?{" "}
                  <Link href="/login" className="text-domus-primary hover:underline font-medium">
                    Entrar
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
