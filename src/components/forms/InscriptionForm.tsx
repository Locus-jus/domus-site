"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import Button from "@/components/ui/Button";
import { Send, CheckCircle } from "lucide-react";

interface InscriptionFormProps {
  debateId: string;
  debateTitle: string;
  className?: string;
}

export default function InscriptionForm({
  debateId,
  debateTitle,
  className,
}: InscriptionFormProps) {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    society: "DOMUS",
    customSociety: "",
    institution: "",
    category: "Debatedor",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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
