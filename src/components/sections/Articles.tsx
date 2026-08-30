"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import ArticleCard from "@/components/cards/ArticleCard";
import { articles } from "@/data/articles";
import { useEffect, useState } from "react";

export default function Articles() {
  const [ideas, setIdeas] = useState(articles);
  useEffect(() => {
    const refresh = () => { try { const saved = localStorage.getItem("domus_managed_ideas"); if (saved) setIdeas(JSON.parse(saved)); } catch { /* use defaults */ } };
    refresh();
    window.addEventListener("domus:ideas-changed", refresh);
    window.addEventListener("storage", refresh);
    return () => { window.removeEventListener("domus:ideas-changed", refresh); window.removeEventListener("storage", refresh); };
  }, []);
  return (
    <section id="ideias" className="py-24 md:py-32 bg-domus-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <SectionHeader
          label="Ideias DOMUS"
          title="Artigos e Reflexões"
          subtitle="Textos sobre oratória, retórica, filosofia, argumentação e pensamento crítico."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ideas.map((article) => (
            <ArticleCard
              key={article.id}
              title={article.title}
              excerpt={article.excerpt}
              category={article.category}
              author={article.author}
              date={article.date}
              readTime={article.readTime}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
