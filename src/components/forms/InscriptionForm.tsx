"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { Send, CheckCircle, Shield } from "lucide-react";
import { useAuth } from "@/lib/auth";
import type { DebatePricing } from "@/data/debates";
import { addInscription, getStoredInscriptions } from "@/data/inscriptions";
import { insertCloudInscription, seedCloudDebates } from "@/lib/supabase-data";

interface InscriptionFormProps {
  debateId: string;
  debateTitle: string;
  pricing?: DebatePricing;
  className?: string;
}

export default function InscriptionForm({
  debateId,
  debateTitle,
  pricing,
  className,
}: InscriptionFormProps) {
  const { user, isDomusMember } = useAuth();
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: user?.name || "",
    email: user?.email || "",
    society: "DOMUS",
    customSociety: "",
    institution: user?.institution || "",
    category: "Debatedor",
    phone: user?.phone || "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const existing = getStoredInscriptions().some(
      (inscription) =>
        inscription.debateId === debateId &&
        inscription.email.toLowerCase() === formData.email.toLowerCase()
    );
    if (existing) {
      setSubmitted(true);
      return;
    }

    const newInscription = addInscription({
      debateId,
      name: formData.name,
      email: formData.email,
      society: formData.society === "outra" ? formData.customSociety : formData.society === "independente" ? "Independente" : formData.society,
      institution: formData.institution,
      category: formData.category,
      phone: formData.phone,
    });
    await seedCloudDebates();
    await insertCloudInscription(newInscription);
    window.dispatchEvent(new Event("domus:inscriptions-changed"));
    const emailBody = [
      `Nova inscrição: ${debateTitle}`,
      "",
      `Nome: ${formData.name}`,
      `E-mail: ${formData.email}`,
      `Sociedade: ${formData.society === "outra" ? formData.customSociety : formData.society}`,
      `Instituição: ${formData.institution || "Não informada"}`,
      `Categoria: ${formData.category}`,
      `Telefone: ${formData.phone || "Não informado"}`,
      `Membro DOMUS: ${isDomusMember ? "Sim" : "Não"}`,
    ].join("\n");
    window.location.href = `mailto:domusdebateseoratoria@gmail.com?subject=${encodeURIComponent(`Inscrição - ${debateTitle}`)}&body=${encodeURIComponent(emailBody)}`;
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className={cn("text-center py-12", className)}>
        <CheckCircle className="w-16 h-16 text-domus-primary mx-auto mb-4" />
        <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-domus-text mb-2">
          Inscrição enviada
        </h3>
        <p className="text-domus-text-secondary mb-1">
          Sua inscrição no debate <strong>{debateTitle}</strong> foi recebida.
        </p>
        <p className="text-sm text-domus-text-muted">
          Você receberá uma confirmação por e-mail em breve.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className={cn("space-y-5", className)}>
      {/* Member exemption banner */}
      {pricing?.membersFree && isDomusMember && (
        <div className="flex items-center gap-3 p-4 rounded-[var(--radius-sm)] bg-domus-accent/10 border border-domus-accent/20">
          <Shield className="w-5 h-5 text-domus-accent flex-shrink-0" />
          <p className="text-sm text-domus-accent font-medium">
            Membro DOMUS: isento(a) de taxa!
          </p>
        </div>
      )}

      {/* Pricing info */}
      {pricing && !isDomusMember && pricing.guestPrice > 0 && (
        <div className="p-4 rounded-[var(--radius-sm)] border border-domus-border-light bg-domus-background">
          <p className="text-sm font-medium text-domus-text mb-1">Taxa de participação</p>
          <p className="text-sm text-domus-text-secondary">
            {pricing.description || `R$ ${pricing.guestPrice}`}
          </p>
        </div>
      )}

      <div>
        <label htmlFor="insc-name" className="block text-sm font-medium text-domus-text mb-1.5">
          Nome completo *
        </label>
        <input
          id="insc-name"
          type="text"
          required
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-background text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors"
          placeholder="Seu nome completo"
        />
      </div>

      <div>
        <label htmlFor="insc-email" className="block text-sm font-medium text-domus-text mb-1.5">
          E-mail *
        </label>
        <input
          id="insc-email"
          type="email"
          required
          value={formData.email}
          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
          className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-background text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors"
          placeholder="seu@email.com"
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="insc-society" className="block text-sm font-medium text-domus-text mb-1.5">
            Sociedade de debates *
          </label>
          <select
            id="insc-society"
            required
            value={formData.society}
            onChange={(e) => setFormData({ ...formData, society: e.target.value })}
            className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-background text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors"
          >
            <option value="DOMUS">DOMUS</option>
            <option value="outra">Outra sociedade</option>
            <option value="independente">Não pertenço a uma sociedade</option>
          </select>
        </div>

        {formData.society === "outra" && (
          <div>
            <label htmlFor="insc-custom-society" className="block text-sm font-medium text-domus-text mb-1.5">
              Nome da sociedade *
            </label>
            <input
              id="insc-custom-society"
              type="text"
              required
              value={formData.customSociety}
              onChange={(e) => setFormData({ ...formData, customSociety: e.target.value })}
              className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-background text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors"
              placeholder="Nome da sua sociedade"
            />
          </div>
        )}

        <div>
          <label htmlFor="insc-category" className="block text-sm font-medium text-domus-text mb-1.5">
            Categoria *
          </label>
          <select
            id="insc-category"
            required
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-background text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors"
          >
            <option value="Debatedor">Debatedor</option>
            <option value="Debatedora">Debatedora</option>
            <option value="Convidado">Convidado</option>
            <option value="Convidada">Convidada</option>
            <option value="Observador">Observador</option>
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="insc-institution" className="block text-sm font-medium text-domus-text mb-1.5">
          Instituição
        </label>
        <input
          id="insc-institution"
          type="text"
          value={formData.institution}
          onChange={(e) => setFormData({ ...formData, institution: e.target.value })}
          className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-background text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors"
          placeholder="Sua instituição de ensino ou organização"
        />
      </div>

      <div>
        <label htmlFor="insc-phone" className="block text-sm font-medium text-domus-text mb-1.5">
          Telefone (opcional)
        </label>
        <input
          id="insc-phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
          className="w-full px-4 py-3 rounded-[var(--radius-sm)] border border-domus-border bg-domus-background text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors"
          placeholder="(00) 00000-0000"
        />
      </div>

      <Button type="submit" variant="primary" size="lg" className="w-full">
        <Send className="w-4 h-4 mr-2" />
        Quero participar
      </Button>

      <p className="text-xs text-domus-text-muted text-center">
        Ao se inscrever, você concorda com os termos de participação da DOMUS.
      </p>
    </form>
  );
}
