"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import Stats from "@/components/ui/Stats";
import { cn } from "@/lib/utils";

const pillars = [
  {
    icon: "⚖",
    title: "Debate",
    description: "Competições e enArgumentação para desenvolver argumentação, estratégia e pensamento crítico.",
  },
  {
    icon: "🗣",
    title: "Oratória",
    description: "Treinamento de comunicação, discurso, presença e persuasão.",
  },
  {
    icon: "🧠",
    title: "Pensamento Crítico",
    description: "Desenvolvimento da capacidade de analisar, avaliar e julgar argumentos.",
  },
  {
    icon: "📚",
    title: "Formação",
    description: "Atividades voltadas à construção de repertório e desenvolvimento intelectual.",
  },
];

const stats = [
  { value: "+100", label: "Debatedores" },
  { value: "+20", label: "Debates realizados" },
  { value: "+10", label: "Eventos" },
  { value: "1", label: "Comunidade" },
];

export default function About() {
  return (
    <section id="sobre" className="py-24 md:py-32 bg-domus-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <SectionHeader
          label="Sobre a DOMUS"
          title="Mais do que falar. Saber argumentar."
          subtitle="A DOMUS é uma sociedade voltada ao desenvolvimento da oratória, pensamento crítico, argumentação e debate."
        />

        {/* Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {pillars.map((pillar, index) => (
            <div
              key={index}
              className={cn(
                "group relative p-8 rounded-[var(--radius-lg)] border border-domus-border-light bg-domus-surface",
                "hover:border-domus-primary/20 hover:shadow-[var(--shadow-md)] transition-all duration-300"
              )}
            >
              <div className="text-3xl mb-4">{pillar.icon}</div>
              <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-domus-text mb-2">
                {pillar.title}
              </h3>
              <p className="text-sm text-domus-text-secondary leading-relaxed">
                {pillar.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-domus-dark rounded-[var(--radius-xl)] p-12 md:p-16">
          <Stats items={stats} className="[&>*]:text-white [&>div>div:first-child]:text-domus-accent [&>div>div:last-child]:text-gray-400" />
        </div>
      </div>
    </section>
  );
}
