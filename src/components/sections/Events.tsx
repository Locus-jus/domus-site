"use client";

import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import EventCard from "@/components/cards/EventCard";
import { events } from "@/data/events";
import { cn } from "@/lib/utils";

const categories = ["Todos", "Formação", "Palestra", "Institucional", "Competição"];

export default function Events() {
  const [activeCategory, setActiveCategory] = useState("Todos");

  const filtered =
    activeCategory === "Todos"
      ? events
      : events.filter((e) => e.category === activeCategory);

  return (
    <section id="eventos" className="py-24 md:py-32 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <SectionHeader
          label="Eventos"
          title="Agenda da DOMUS"
          subtitle="Próximos encontros, treinamentos, palestras e competições."
        />

        {/* Filters */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={cn(
                "px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer",
                activeCategory === cat
                  ? "bg-domus-primary text-white shadow-md"
                  : "bg-domus-background text-domus-text-secondary hover:bg-domus-primary/10 hover:text-domus-primary border border-domus-border-light"
              )}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filtered.map((event) => (
            <EventCard
              key={event.id}
              name={event.name}
              description={event.description}
              date={event.date}
              time={event.time}
              location={event.location}
              speakers={event.speakers}
              status={event.status}
              category={event.category}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
