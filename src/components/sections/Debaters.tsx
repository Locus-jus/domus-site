"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import DebaterCard from "@/components/cards/DebaterCard";
import { debaters } from "@/data/debaters";

export default function Debaters() {
  return (
    <section className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <SectionHeader
          label="Nossos Debatedores"
          title="Quem debate na DOMUS"
          subtitle="Conheça os debatedores que compõem a sociedade."
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {debaters.map((debater) => (
            <DebaterCard
              key={debater.id}
              name={debater.name}
              role={debater.role}
              description={debater.description}
              imageInitials={debater.imageInitials}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
