"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import RankingTable from "@/components/ui/RankingTable";
import { ranking } from "@/data/ranking";

export default function Ranking() {
  return (
    <section id="competidores" className="py-24 md:py-32 bg-domus-background">
      <div className="max-w-5xl mx-auto px-6 md:px-8">
        <SectionHeader
          label="Circuito DOMUS"
          title="Ranking de Debatedores"
          subtitle="Acompanhe o desempenho dos debatedores no circuito oficial da DOMUS."
        />

        <div className="bg-domus-surface border border-domus-border-light rounded-[var(--radius-xl)] overflow-hidden shadow-[var(--shadow-sm)]">
          <RankingTable data={ranking} />
        </div>

        <p className="text-center text-xs text-domus-text-muted mt-6 italic">
          Dados demonstrativos. O ranking será atualizado com resultados reais
          das competições.
        </p>
      </div>
    </section>
  );
}
