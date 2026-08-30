"use client";

import Link from "next/link";
import SectionHeader from "@/components/ui/SectionHeader";
import DebateCard from "@/components/cards/DebateCard";
import { getUpcomingDebates } from "@/data/debates";
import { getManagedDebates } from "@/components/admin/DebateManager";
import { useEffect, useState } from "react";
import { fetchCloudDebates } from "@/lib/supabase-data";

export default function Debates() {
  const [upcoming, setUpcoming] = useState(getUpcomingDebates);

  useEffect(() => {
    const refresh = () => setUpcoming(getManagedDebates().filter((debate) => debate.status === "upcoming"));
    refresh();
    void fetchCloudDebates().then((cloud) => { if (cloud) setUpcoming(cloud.filter((debate) => debate.status === "upcoming")); });
    window.addEventListener("storage", refresh);
    return () => window.removeEventListener("storage", refresh);
  }, []);

  return (
    <section id="debates" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <SectionHeader
          title="Debater é pensar em voz alta"
           subtitle="O debate combina escuta, argumentação e respeito à divergência em uma prática intelectual rigorosa."
        />

        {/* Editorial narrative */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            <div>
              <p className="text-domus-text-secondary leading-relaxed mb-4">
                Na DOMUS, o debate é tratado como uma prática intelectual
                séria. Cada tema é pesquisado, cada argumento é construído
                e cada refutação é pensada.
              </p>
              <p className="text-domus-text-secondary leading-relaxed">
                Promovemos debates que exigem preparação, raciocínio rápido
                 e capacidade genuína de ouvir. Nosso objetivo é formar
                 debatedores completos.
              </p>
            </div>
            <div>
              <p className="text-domus-text-secondary leading-relaxed mb-4">
                Os debates da DOMUS seguem formatos reconhecidos no circuito
                acadêmico, com regras claras, jurados experientes e
                estrutura organizada para garantir qualidade e equidade.
              </p>
              <p className="text-domus-text-secondary leading-relaxed">
                Cada participante sai do debate com algo: uma nova
                perspectiva, uma habilidade aprimorada ou a certeza de
                que suas ideias foram devidamente testadas.
              </p>
            </div>
          </div>
        </div>

        {/* Upcoming debates */}
        {upcoming.length > 0 && (
          <div>
            <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-domus-text mb-8 text-center">
              Próximos Debates
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {upcoming.map((debate) => (
                <DebateCard key={debate.id} debate={debate} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
