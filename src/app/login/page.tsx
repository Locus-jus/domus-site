"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { LogIn, Mail, Lock, AlertCircle } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    const success = await login(form.email, form.password);
    setLoading(false);

    if (success) {
      router.push("/perfil");
    } else {
      setError("Email ou senha inválidos.");
    }
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">
        <section className="min-h-[80vh] flex items-center justify-center bg-domus-background px-6">
          <div className="w-full max-w-md">
            <div className="text-center mb-8">
              <h1 className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-domus-text mb-2">
                Entrar
              </h1>
              <p className="text-domus-text-secondary">
                Acesse sua conta na DOMUS
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
                  <label htmlFor="email" className="block text-sm font-medium text-domus-text mb-1.5">
                    E-mail
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
                    Senha
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
                      placeholder="Sua senha"
                    />
                  </div>
                </div>

                <Button type="submit" variant="primary" size="lg" className="w-full" disabled={loading}>
                  <LogIn className="w-4 h-4 mr-2" />
                  {loading ? "Entrando..." : "Entrar"}
                </Button>
              </form>

              <div className="mt-6 text-center">
                <p className="text-sm text-domus-text-muted">
                  Não tem conta?{" "}
                  <Link href="/registro" className="text-domus-primary hover:underline font-medium">
                    Criar conta
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
