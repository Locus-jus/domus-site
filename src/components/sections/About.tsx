"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import { cn } from "@/lib/utils";

export default function About() {
  return (
    <section id="sobre" className="py-24 md:py-32 bg-domus-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <SectionHeader
          title="Uma sociedade para o debate de ideias"
          subtitle="A DOMUS existe para que ideias sejam confrontadas com argumentos, não com silêncio."
        />

        {/* Editorial content */}
        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 mb-20">
            <div>
              <p className="text-lg text-domus-text-secondary leading-relaxed mb-6">
                A <strong className="text-domus-text">Sociedade de Debates e Oratória DOMUS</strong> é
                um espaço dedicado ao exercício da argumentação, da oratória e do
                pensamento crítico. Fundada com o propósito de formar pessoas
                capazes de defender ideias com clareza, inteligência e respeito.
              </p>
              <p className="text-lg text-domus-text-secondary leading-relaxed">
                Acreditamos que o debate é mais do que uma competição — é um
                exercício de civilidade. É no confronto respeitoso de ideias que
                se constrói conhecimento, se desenvolve empatia intelectual e se
                fortalece a cultura argumentativa.
              </p>
            </div>
            <div>
              <p className="text-lg text-domus-text-secondary leading-relaxed mb-6">
                Nossa missão é promover a cultura do debate e da oratória,
                formando debatedores que dominam a arte de comunicar, ouvir e
                refutar — não apenas para vencer, mas para evoluir.
              </p>
              <p className="text-lg text-domus-text-secondary leading-relaxed">
                A DOMUS reúne estudantes, profissionais e entusiastas que
                compartilham o interesse por ideias, argumentação e
                comunicação eficaz. Somos uma comunidade que valoriza
                a excelência intelectual e a busca pela verdade através
                do diálogo.
              </p>
            </div>
          </div>

          {/* Pillars as editorial blocks */}
          <div className="border-t border-domus-border pt-16">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
              <div>
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-domus-accent mb-3 block">
                  01
                </span>
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-domus-text mb-3">
                  Oratória
                </h3>
                <p className="text-sm text-domus-text-secondary leading-relaxed">
                  A arte de falar bem é também a arte de pensar bem. Desenvolvemos
                  a capacidade de transformar ideias em discursos claros,
                  persuasivos e fundamentados.
                </p>
              </div>
              <div>
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-domus-accent mb-3 block">
                  02
                </span>
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-domus-text mb-3">
                  Argumentação
                </h3>
                <p className="text-sm text-domus-text-secondary leading-relaxed">
                  Argumentar não é gritar mais alto. É construir raciocínios
                  sólidos, sustentados em evidências e lógica, capazes de
                  convencer pela razão.
                </p>
              </div>
              <div>
                <span className="text-xs font-semibold tracking-[0.2em] uppercase text-domus-accent mb-3 block">
                  03
                </span>
                <h3 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-domus-text mb-3">
                  Pensamento Crítico
                </h3>
                <p className="text-sm text-domus-text-secondary leading-relaxed">
                  A capacidade de analisar, avaliar e julgar argumentos é
                  essencial em qualquer área do conhecimento. O debate é um
                  dos melhores treinos para o pensamento crítico.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
