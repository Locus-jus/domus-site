"use client";

import { useAuth } from "@/lib/auth";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { getDebateBySlug } from "@/data/debates";
import { User, Mail, Phone, Building2, Calendar, Award, LogOut, ExternalLink, Shield } from "lucide-react";

export default function ProfilePage() {
  const router = useRouter();
  const { user, isLoading, logout, isDomusMember } = useAuth();

  useEffect(() => {
    if (!isLoading && !user) {
      router.push("/login");
    }
  }, [user, isLoading, router]);

  if (isLoading) {
    return (
      <>
        <Navbar />
        <main className="flex-1 pt-20 flex items-center justify-center">
          <p className="text-domus-text-muted">Carregando...</p>
        </main>
        <Footer />
      </>
    );
  }

  if (!user) return null;

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">
        <section className="bg-domus-dark py-16 md:py-20">
          <div className="max-w-4xl mx-auto px-6 md:px-8">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-domus-primary/20 flex items-center justify-center">
                <User className="w-8 h-8 text-domus-primary" />
              </div>
              <div>
                <h1 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-bold text-white">
                  {user.name}
                </h1>
                <p className="text-gray-400">{user.email}</p>
              </div>
            </div>

            {isDomusMember && (
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-domus-accent/10 border border-domus-accent/20">
                <Shield className="w-4 h-4 text-domus-accent" />
                <span className="text-sm font-medium text-domus-accent">Membro DOMUS</span>
              </div>
            )}
          </div>
        </section>

        <section className="py-12 md:py-16 bg-domus-background">
          <div className="max-w-4xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {/* Personal Info */}
              <div className="p-6 rounded-[var(--radius-xl)] border border-domus-border-light bg-domus-surface">
                <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-domus-text mb-6">
                  Informações pessoais
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-domus-text-muted" />
                    <span className="text-sm text-domus-text-secondary">{user.email}</span>
                  </div>
                  {user.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="w-4 h-4 text-domus-text-muted" />
                      <span className="text-sm text-domus-text-secondary">{user.phone}</span>
                    </div>
                  )}
                  {user.institution && (
                    <div className="flex items-center gap-3">
                      <Building2 className="w-4 h-4 text-domus-text-muted" />
                      <span className="text-sm text-domus-text-secondary">{user.institution}</span>
                    </div>
                  )}
                  {user.memberSince && (
                    <div className="flex items-center gap-3">
                      <Calendar className="w-4 h-4 text-domus-text-muted" />
                      <span className="text-sm text-domus-text-secondary">
                        Membro desde {new Date(user.memberSince).toLocaleDateString("pt-BR")}
                      </span>
                    </div>
                  )}
                </div>
              </div>

              {/* Stats */}
              <div className="p-6 rounded-[var(--radius-xl)] border border-domus-border-light bg-domus-surface">
                <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-domus-text mb-6">
                  Suas estatísticas
                </h2>
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-3 rounded-[var(--radius-sm)] bg-domus-background">
                    <span className="text-sm text-domus-text-secondary">Debates participados</span>
                    <span className="font-bold text-domus-text">{user.joinedDebates}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-[var(--radius-sm)] bg-domus-background">
                    <span className="text-sm text-domus-text-secondary">Inscrições ativas</span>
                    <span className="font-bold text-domus-text">{user.inscriptions.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-[var(--radius-sm)] bg-domus-background">
                    <span className="text-sm text-domus-text-secondary">Status</span>
                    <span className={`text-sm font-semibold ${isDomusMember ? "text-domus-accent" : "text-domus-text-muted"}`}>
                      {isDomusMember ? "Membro" : "Convidado"}
                    </span>
                  </div>
                </div>
              </div>

              {/* Inscriptions */}
              <div className="md:col-span-2 p-6 rounded-[var(--radius-xl)] border border-domus-border-light bg-domus-surface">
                <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-domus-text mb-6">
                  Suas inscrições
                </h2>
                {user.inscriptions.length === 0 ? (
                  <div className="text-center py-8">
                    <Award className="w-12 h-12 text-domus-text-muted mx-auto mb-3" />
                    <p className="text-domus-text-muted mb-4">
                      Você ainda não está inscrito em nenhum debate.
                    </p>
                    <Link href="/#debates">
                      <Button variant="primary" size="sm">
                        Ver debates disponíveis
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="space-y-3">
                    {user.inscriptions.map((debateId) => {
                      const debate = getDebateBySlug(debateId);
                      if (!debate) return null;
                      return (
                        <div
                          key={debateId}
                          className="flex items-center justify-between p-4 rounded-[var(--radius-sm)] border border-domus-border-light bg-domus-background"
                        >
                          <div>
                            <p className="font-medium text-domus-text text-sm">{debate.title}</p>
                            <p className="text-xs text-domus-text-muted">
                              {new Date(debate.date).toLocaleDateString("pt-BR")} · {debate.time}
                            </p>
                          </div>
                          <Link href={`/debates/${debate.slug}`}>
                            <ExternalLink className="w-4 h-4 text-domus-text-muted hover:text-domus-primary transition-colors" />
                          </Link>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Logout */}
            <div className="mt-8 text-center">
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  logout();
                  router.push("/");
                }}
              >
                <LogOut className="w-4 h-4 mr-2" />
                Sair da conta
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
