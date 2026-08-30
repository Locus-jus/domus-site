export interface Member {
  id: string;
  name: string;
  role: string;
  bio: string;
  interests: string[];
  imageInitials: string;
  joinedDebates?: number;
}

export const members: Member[] = [
  {
    id: "1",
    name: "[Nome Placeholder]",
    role: "Debatedor(a) | Membro Fundador",
    bio: "Responsável pela coordenação geral das atividades da DOMUS. Especialista em retórica e argumentação.",
    interests: ["Retórica", "Filosofia", "Política"],
    imageInitials: "NF",
    joinedDebates: 8,
  },
  {
    id: "2",
    name: "[Nome Placeholder]",
    role: "Debatedor(a) | Membro",
    bio: "Focado em debate parlamentar, direito constitucional e argumentação jurídica.",
    interests: ["Direito", "Debate Parlamentar", "Política"],
    imageInitials: "NM",
    joinedDebates: 6,
  },
  {
    id: "3",
    name: "[Nome Placeholder]",
    role: "Debatedor(a) | Membro",
    bio: "Interesse em oratória, comunicação persuasiva e filosofia da linguagem.",
    interests: ["Oratória", "Filosofia da Linguagem", "Comunicação"],
    imageInitials: "NM",
    joinedDebates: 5,
  },
  {
    id: "4",
    name: "[Nome Placeholder]",
    role: "Debatedor(a) | Membro",
    bio: "Atua em competições de debate formatado e análise crítica de políticas públicas.",
    interests: ["Políticas Públicas", "Debate Formatado", "Economia"],
    imageInitials: "NM",
    joinedDebates: 7,
  },
  {
    id: "5",
    name: "[Nome Placeholder]",
    role: "Debatedor(a) | Membro",
    bio: "Especialização em debate educacional e metodologias de ensino do pensamento crítico.",
    interests: ["Educação", "Pensamento Crítico", "Metodologias"],
    imageInitials: "NM",
    joinedDebates: 4,
  },
  {
    id: "6",
    name: "[Nome Placeholder]",
    role: "Debatedor(a) | Membro",
    bio: "Interesse em retórica clássica, debate acadêmico e história das ideias.",
    interests: ["Retórica Clássica", "História", "Debate Acadêmico"],
    imageInitials: "NM",
    joinedDebates: 3,
  },
];
