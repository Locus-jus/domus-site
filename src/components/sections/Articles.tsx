"use client";

import SectionHeader from "@/components/ui/SectionHeader";
import ArticleCard from "@/components/cards/ArticleCard";
import { articles } from "@/data/articles";

export default function Articles() {
  return (
    <section id="ideias" className="py-24 md:py-32 bg-domus-background">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <SectionHeader
          label="Ideias DOMUS"
          title="Artigos e Reflexões"
          subtitle="Textos sobre oratória, retórica, filosofia, argumentação e pensamento crítico."
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {articles.map((article) => (
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
