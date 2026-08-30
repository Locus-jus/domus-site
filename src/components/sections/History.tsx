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

        {/* Timeline */}
        <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-domus-text text-center mb-12">
          Nossa Trajetória
        </h3>
        <Timeline events={timeline} />
      </div>
    </section>
  );
}
