"use client";

import { useState } from "react";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Button from "@/components/ui/Button";
import { Send, CheckCircle, Mail, MapPin } from "lucide-react";

export default function ContatoPage() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">
        {/* Header */}
        <section className="bg-domus-dark py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-domus-accent mb-4">
              Contato
            </span>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Fale com a DOMUS
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Dúvidas, sugestões, parcerias ou apenas uma conversa sobre debates
              e oratória. Estamos ouvindo.
            </p>
          </div>
        </section>

        {/* Content */}
        <section className="py-16 md:py-20 bg-domus-background">
          <div className="max-w-5xl mx-auto px-6 md:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Form */}
              <div>
                <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-domus-text mb-6">
                  Mensagem
                </h2>

                {submitted ? (
                  <div className="text-center py-12 bg-domus-surface rounded-[var(--radius-lg)] border border-domus-border-light">
                    <CheckCircle className="w-16 h-16 text-domus-primary mx-auto mb-4" />
                    <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-domus-text mb-2">
                      Mensagem enviada
                    </h3>
                    <p className="text-domus-text-secondary">
                      Entraremos em contato em breve.
                    </p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-domus-text mb-1.5">
                        Nome
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-surface text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-domus-text mb-1.5">
                        E-mail
                      </label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-surface text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="subject" className="block text-sm font-medium text-domus-text mb-1.5">
                        Assunto
                      </label>
                      <input
                        id="subject"
                        type="text"
                        required
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-surface text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="message" className="block text-sm font-medium text-domus-text mb-1.5">
                        Mensagem
                      </label>
                      <textarea
                        id="message"
                        rows={5}
                        required
                        value={formData.message}
                        onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                        className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-surface text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors resize-none"
                      />
                    </div>
                    <Button type="submit" variant="primary" size="md">
                      <Send className="w-4 h-4 mr-2" />
                      Enviar mensagem
                    </Button>
                  </form>
                )}
              </div>

              {/* Info */}
              <div className="space-y-8">
                <div>
                  <h2 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-domus-text mb-6">
                    Informações
                  </h2>
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-domus-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="w-5 h-5 text-domus-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-domus-text">E-mail</p>
                        <p className="text-sm text-domus-text-secondary">
                          [contato@domus.com.br]
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-domus-primary/10 flex items-center justify-center flex-shrink-0">
                        <MapPin className="w-5 h-5 text-domus-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-domus-text">Localização</p>
                        <p className="text-sm text-domus-text-secondary">
                          [Instituição — Endereço placeholder]
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="border-t border-domus-border-light pt-8">
                  <h3 className="font-semibold text-domus-text mb-4">Redes sociais</h3>
                  <div className="flex gap-4">
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full border border-domus-border flex items-center justify-center text-domus-text-muted hover:text-domus-primary hover:border-domus-primary transition-colors"
                      aria-label="Instagram"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full border border-domus-border flex items-center justify-center text-domus-text-muted hover:text-domus-primary hover:border-domus-primary transition-colors"
                      aria-label="YouTube"
                    >
                      <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" /><path d="m10 15 5-3-5-3z" /></svg>
                    </a>
                  </div>
                </div>

                <div className="bg-domus-surface border border-domus-border-light rounded-[var(--radius-lg)] p-6">
                  <p className="text-sm text-domus-text-secondary italic">
                    &ldquo;Debater é também aprender a ouvir.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
