"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";
import { MessageSquareQuote, Mic, BookOpen, Trophy, CalendarDays, Users } from "lucide-react";

const activities = [
  {
    icon: MessageSquareQuote,
    title: "Debates",
    description:
      "Competições e encontros para desenvolver argumentação, estratégia e pensamento crítico.",
  },
  {
    icon: Mic,
    title: "Oratória",
    description:
      "Treinamento de comunicação, discurso, presença e persuasão.",
  },
  {
    icon: BookOpen,
    title: "Formação",
    description:
      "Atividades voltadas à construção de repertório e desenvolvimento intelectual.",
  },
  {
    icon: Trophy,
    title: "Competições",
    description:
      "Participação e organização de torneios e competições de debate.",
  },
  {
    icon: CalendarDays,
    title: "Eventos",
    description:
      "Palestras, encontros, workshops e atividades acadêmicas.",
  },
  {
    icon: Users,
    title: "Comunidade",
    description:
      "Um ambiente para pessoas interessadas em ideias, conhecimento e argumentação.",
  },
];

export default function WhatWeDo() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <SectionHeader
          label="O que fazemos"
          title="Atividades que formam debatedores"
          subtitle="Cada atividade da DOMUS é projetada para desenvolver habilidades reais de argumentação e comunicação."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {activities.map((activity, index) => {
            const Icon = activity.icon;
            return (
              <div
                key={index}
                className={cn(
                  "group relative p-8 rounded-[var(--radius-lg)] border border-domus-border-light bg-domus-surface",
                  "hover:border-domus-primary/20 hover:shadow-[var(--shadow-lg)] transition-all duration-300"
                )}
              >
                <div className="w-12 h-12 rounded-[var(--radius-md)] bg-domus-primary/10 flex items-center justify-center mb-6 group-hover:bg-domus-primary/20 transition-colors">
                  <Icon className="w-6 h-6 text-domus-primary" />
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-domus-text mb-3 group-hover:text-domus-primary transition-colors">
                  {activity.title}
                </h3>
                <p className="text-sm text-domus-text-secondary leading-relaxed">
                  {activity.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
