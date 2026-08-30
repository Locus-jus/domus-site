export interface Article {
  id: string;
  title: string;
  excerpt: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  coverGradient?: string;
}

export const articles: Article[] = [
  {
    id: "1",
    title: "A arte de ouvir antes de responder",
    excerpt: "Debater não é apenas falar. É construir Argumentação a partir da compreensão genuína do outro.",
    category: "Debate",
    author: "[Autor Placeholder]",
    date: "2026-08-25",
    readTime: "5 min",
  },
  {
    id: "2",
    title: "Retórica aplicada: do púlpito ao tribunal",
    excerpt: "Como os princípios da retórica clássica permanecem relevantes na comunicação contemporânea.",
    category: "Retórica",
    author: "[Autor Placeholder]",
    date: "2026-08-18",
    readTime: "7 min",
  },
  {
    id: "3",
    title: "Pensamento crítico na era da informação",
    excerpt: "Navegando entre dados, opiniões e vieses: por que pensar criticamente é uma habilidade essencial.",
    category: "Pensamento Crítico",
    author: "[Autor Placeholder]",
    date: "2026-08-10",
    readTime: "6 min",
  },
  {
    id: "4",
    title: "Estruturas argumentativas essenciais",
    excerpt: "Silogismos, entimemas e argumentação indutiva: ferramentas fundamentais para qualquer debatedor.",
    category: "Argumentação",
    author: "[Autor Placeholder]",
    date: "2026-08-02",
    readTime: "8 min",
  },
  {
    id: "5",
    title: "A filosofia por trás do debate moderno",
    excerpt: "De Sócrates aos torneios contemporâneos: a evolução do pensamento dialético.",
    category: "Filosofia",
    author: "[Autor Placeholder]",
    date: "2026-07-28",
    readTime: "6 min",
  },
  {
    id: "6",
    title: "Oratória e presença: o corpo como instrumento",
    excerpt: "A comunicação vai além das palavras. Gestos, postura e vocalização constroem a persuasão.",
    category: "Oratória",
    author: "[Autor Placeholder]",
    date: "2026-07-20",
    readTime: "5 min",
  },
];
