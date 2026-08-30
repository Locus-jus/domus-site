"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import DebateCard from "@/components/cards/DebateCard";
import { debates } from "@/data/debates";

export default function Debates() {
  return (
    <section id="debates" className="py-24 md:py-32 bg-domus-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <SectionHeader
          label="Debates"
          title="Arenas deArgumentação"
          subtitle="Competições e encontros onde ideias se encontram, argumentos são construídos e perspectivas se expandem."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {debates.map((debate) => (
            <DebateCard
              key={debate.id}
              number={debate.number}
              title={debate.title}
              theme={debate.theme}
              date={debate.date}
              time={debate.time}
              location={debate.location}
              status={debate.status}
              category={debate.category}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
