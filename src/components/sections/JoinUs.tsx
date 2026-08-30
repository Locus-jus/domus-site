"use client";

import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { cn } from "@/lib/utils";
import { Send, CheckCircle } from "lucide-react";

export default function JoinUs() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    institution: "",
    course: "",
    message: "",
    consent: false,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    window.location.href = `mailto:domusoratoriaedebates@gmail.com?subject=${encodeURIComponent("Interesse em participar da DOMUS")}&body=${encodeURIComponent(`Nome: ${formData.name}\nE-mail: ${formData.email}\nInstituição: ${formData.institution}\nCurso/Área: ${formData.course}\n\n${formData.message}`)}`;
    setSubmitted(true);
  };

  return (
    <section id="contato" className="py-24 md:py-32 bg-domus-dark relative overflow-hidden">
      {/* Decorative */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-domus-primary/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left - CTA */}
          <div>
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-domus-accent mb-4">
              Faça parte
            </span>
            <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight mb-6">
              Faça parte da DOMUS
            </h2>
            <p className="text-lg text-gray-400 leading-relaxed mb-8">
              Se você acredita que boas ideias merecem bons argumentos, há um
              lugar para você na DOMUS.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 mb-12">
              <Button variant="primary" size="lg">
                Quero participar
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-600 text-gray-300 hover:bg-white/10 hover:border-white/30 hover:text-white"
              >
                Conhecer os próximos debates
              </Button>
            </div>

            <div className="border-t border-gray-800 pt-8">
              <p className="text-sm text-gray-500 italic">
                &ldquo;Pense. Argumente. Debata.&rdquo;
              </p>
            </div>
          </div>

          {/* Right - Form */}
          <div className="bg-domus-surface rounded-[var(--radius-xl)] p-8 md:p-10">
            {submitted ? (
              <div className="text-center py-12">
                <CheckCircle className="w-16 h-16 text-domus-primary mx-auto mb-4" />
                <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-domus-text mb-2">
                  Mensagem enviada
                </h3>
                <p className="text-domus-text-secondary">
                  Entraremos em contato em breve.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-domus-text mb-2"
                  >
                    Nome completo
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-background text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors"
                    placeholder="Seu nome"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-domus-text mb-2"
                  >
                    E-mail
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-background text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors"
                    placeholder="seu@email.com"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label
                      htmlFor="institution"
                      className="block text-sm font-medium text-domus-text mb-2"
                    >
                      Instituição
                    </label>
                    <input
                      id="institution"
                      type="text"
                      value={formData.institution}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          institution: e.target.value,
                        })
                      }
                      className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-background text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors"
                      placeholder="Sua instituição"
                    />
                  </div>
                  <div>
                    <label
                      htmlFor="course"
                      className="block text-sm font-medium text-domus-text mb-2"
                    >
                      Curso / Área
                    </label>
                    <input
                      id="course"
                      type="text"
                      value={formData.course}
                      onChange={(e) =>
                        setFormData({ ...formData, course: e.target.value })
                      }
                      className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-background text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors"
                      placeholder="Seu curso ou área"
                    />
                  </div>
                </div>

                <div>
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-domus-text mb-2"
                  >
                    Mensagem
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-background text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors resize-none"
                    placeholder="Conte-nos sobre seu interesse na DOMUS"
                  />
                </div>

                <div className="flex items-start gap-3">
                  <input
                    id="consent"
                    type="checkbox"
                    required
                    checked={formData.consent}
                    onChange={(e) =>
                      setFormData({ ...formData, consent: e.target.checked })
                    }
                    className="mt-1 rounded border-domus-border text-domus-primary focus:ring-domus-primary"
                  />
                  <label
                    htmlFor="consent"
                    className="text-xs text-domus-text-muted leading-relaxed"
                  >
                    Concordo com o uso dos meus dados para fins de contato e
                    participação nas atividades da DOMUS.
                  </label>
                </div>

                <Button
                  type="submit"
                  variant="primary"
                  size="lg"
                  className="w-full"
                >
                  <Send className="w-4 h-4 mr-2" />
                  Enviar mensagem
                </Button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
