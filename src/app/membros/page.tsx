"use client";

import { useState } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionHeader from "@/components/ui/SectionHeader";
import { members } from "@/data/members";
import { cn } from "@/lib/utils";

export default function MembersPage() {
  const [filter, setFilter] = useState("Todos");

  const roles = ["Todos", ...Array.from(new Set(members.map((m) => m.role.split("|")[1]?.trim() || "Membro")))];

  const filtered =
    filter === "Todos" ? members : members.filter((m) => m.role.includes(filter));

  return (
    <>
      <Navbar />
      <main className="flex-1 pt-20">
        {/* Header */}
        <section className="bg-domus-dark py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
            <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-domus-accent mb-4">
              Comunidade
            </span>
            <h1 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Membros DOMUS
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              Conheça as pessoas que compõem a sociedade. Debatedores,
              pensadores e comunicadores que defense ideias com excelência.
            </p>
          </div>
        </section>

        {/* Members Grid */}
        <section className="py-16 md:py-20 bg-domus-background">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            {/* Filters */}
            <div className="flex flex-wrap justify-center gap-3 mb-12">
              {roles.map((role) => (
                <button
                  key={role}
                  onClick={() => setFilter(role)}
                  className={cn(
                    "px-5 py-2 text-sm font-medium rounded-full transition-all duration-200 cursor-pointer",
                    filter === role
                      ? "bg-domus-primary text-white shadow-md"
                      : "bg-domus-surface text-domus-text-secondary hover:bg-domus-primary/10 hover:text-domus-primary border border-domus-border-light"
                  )}
                >
                  {role}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((member) => (
                <article
                  key={member.id}
                  className="group bg-domus-surface border border-domus-border-light rounded-[var(--radius-lg)] p-8 text-center hover:border-domus-primary/20 hover:shadow-[var(--shadow-lg)] transition-all duration-300"
                >
                  <div className="w-24 h-24 mx-auto mb-5 rounded-full bg-domus-primary/10 flex items-center justify-center border-2 border-domus-primary/20 group-hover:border-domus-primary/40 transition-colors">
                    <span className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-domus-primary">
                      {member.imageInitials}
                    </span>
                  </div>

                  <h2 className="font-[family-name:var(--font-playfair)] text-xl font-bold text-domus-text mb-1 group-hover:text-domus-primary transition-colors">
                    {member.name}
                  </h2>

                  <p className="text-xs font-semibold tracking-wider uppercase text-domus-accent mb-3">
                    {member.role}
                  </p>

                  <p className="text-sm text-domus-text-secondary leading-relaxed mb-4">
                    {member.bio}
                  </p>

                  <div className="flex flex-wrap justify-center gap-2 mb-4">
                    {member.interests.map((interest) => (
                      <span
                        key={interest}
                        className="text-xs px-3 py-1 rounded-full bg-domus-background text-domus-text-muted border border-domus-border-light"
                      >
                        {interest}
                      </span>
                    ))}
                  </div>

                  {member.joinedDebates !== undefined && (
                    <p className="text-xs text-domus-text-muted">
                      {member.joinedDebates} debates participados
                    </p>
                  )}
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 md:py-20 bg-domus-dark">
          <div className="max-w-3xl mx-auto px-6 md:px-8 text-center">
            <h2 className="font-[family-name:var(--font-playfair)] text-2xl md:text-3xl font-bold text-white mb-4">
              Quer fazer parte da DOMUS?
            </h2>
            <p className="text-gray-400 mb-8">
              Se você acredita que boas ideias merecem bons argumentos, há um
              lugar para você.
            </p>
            <Link
              href="/#contato"
              className="inline-flex items-center justify-center px-8 py-4 bg-domus-primary text-white font-medium rounded-[var(--radius-sm)] hover:bg-domus-primary-dark transition-colors shadow-md hover:shadow-lg"
            >
              Participe da DOMUS
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
