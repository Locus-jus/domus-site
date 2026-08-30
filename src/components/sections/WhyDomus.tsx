"use client";

import { cn } from "@/lib/utils";
import { Brain, ShieldCheck, Mic2, MessagesSquare } from "lucide-react";

const pillars = [
  {
    icon: Brain,
    title: "Pensar",
    description: "Desenvolver pensamento crítico.",
  },
  {
    icon: ShieldCheck,
    title: "Argumentar",
    description: "Construir argumentos sólidos.",
  },
  {
    icon: Mic2,
    title: "Comunicar",
    description:
      "Transformar ideias em discursos claros e persuasivos.",
  },
  {
    icon: MessagesSquare,
    title: "Debater",
    description:
      "Ouvir, responder e evoluir diante de diferentes perspectivas.",
  },
];

export default function WhyDomus() {
  return (
    <section className="py-24 md:py-32 bg-domus-dark relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-domus-primary/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-domus-accent/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <div className="text-center mb-16 md:mb-20">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-domus-accent mb-4">
            Por que DOMUS?
          </span>
          <h2 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl lg:text-5xl font-bold text-white leading-tight">
            &ldquo;Ideias importam.
            <br />
            Saber defendê-las também.&rdquo;
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {pillars.map((pillar, index) => {
            const Icon = pillar.icon;
            return (
              <div
                key={index}
                className={cn(
                  "group text-center p-8 rounded-[var(--radius-lg)] border border-gray-800",
                  "hover:border-domus-primary/30 hover:bg-white/5 transition-all duration-300"
                )}
              >
                <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-domus-primary/10 flex items-center justify-center group-hover:bg-domus-primary/20 transition-colors">
                  <Icon className="w-7 h-7 text-domus-accent" />
                </div>
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-white mb-2">
                  {pillar.title}
                </h3>
                <p className="text-sm text-gray-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
