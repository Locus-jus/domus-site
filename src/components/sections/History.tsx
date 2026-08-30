"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import Timeline from "@/components/ui/Timeline";
import { timeline } from "@/data/timeline";

export default function History() {
  return (
    <section id="historia" className="py-24 md:py-32 bg-white">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <SectionHeader
          label="Sobre"
          title="Uma casa para as ideias."
          subtitle="A trajetória da DOMUS é construída por pessoas que acreditam no poder da palavra bem argumentada."
        />

        {/* Mission, Vision, Values */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="p-8 rounded-[var(--radius-lg)] border border-domus-border-light bg-domus-surface">
            <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-domus-text mb-3">
              Missão
            </h3>
            <p className="text-sm text-domus-text-secondary leading-relaxed">
              [Placeholder] Desenvolver a argumentação, a oratória e o
              pensamento crítico como ferramentas de formação intelectual e
              cidadania.
            </p>
          </div>
          <div className="p-8 rounded-[var(--radius-lg)] border border-domus-border-light bg-domus-surface">
            <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-domus-text mb-3">
              Visão
            </h3>
            <p className="text-sm text-domus-text-secondary leading-relaxed">
              [Placeholder] Ser referência em formação de debatedores e na
              promoção da cultura argumentativa no ambiente acadêmico.
            </p>
          </div>
          <div className="p-8 rounded-[var(--radius-lg)] border border-domus-border-light bg-domus-surface">
            <h3 className="font-[family-name:var(--font-playfair)] text-lg font-bold text-domus-text mb-3">
              Valores
            </h3>
            <p className="text-sm text-domus-text-secondary leading-relaxed">
              [Placeholder] Excelência, respeito intelectual, rigor argumentativo,
              colaboração e compromisso com a verdade.
            </p>
          </div>
        </div>

        {/* Timeline */}
        <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-domus-text text-center mb-12">
          Nossa Trajetória
        </h3>
        <Timeline events={timeline} />
      </div>
    </section>
  );
}
