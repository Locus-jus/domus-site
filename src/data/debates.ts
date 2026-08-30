export type DebateFormat =
  | "simples"
  | "parlamentar"
  | "duplas"
  | "equipes"
  | "torneio"
  | "palestra-debate"
  | "outro";

export type DebateParticipation =
  | "interno"
  | "aberto"
  | "intersociedades"
  | "convidados";

export interface DebatePricing {
  membersFree: boolean;
  guestPrice: number;
  nonMemberPrice: number;
  currency: string;
  description?: string;
}

export interface Debate {
  id: string;
  slug: string;
  number: number;
  title: string;
  subtitle?: string;
  theme: string;
  description: string;
  date: string;
  time: string;
  location: string;
  format: DebateFormat;
  participation: DebateParticipation;
  status: "upcoming" | "past";
  inscriptionsOpen: boolean;
  maxParticipants?: number;
  currentParticipants?: number;
  category: string;
  rules?: string;
  participants?: string[];
  result?: string;
  edital?: string;
  pricing?: DebatePricing;
  tabbycatUrl?: string;
}

export const debates: Debate[] = [
  {
    id: "1",
    slug: "domus-open-2026",
    number: 1,
    title: "DOMUS OPEN 2026",
    subtitle: "Debate Aberto",
    theme: "Liberdade de expressão e os limites do discurso público",
    description:
      "O DOMUS OPEN é um debate aberto a membros da DOMUS e a participantes convidados de outras sociedades de debates. O tema convida à reflexão sobre os limites entre liberdade de expressão e responsabilidade no discurso público, abordando questões contemporâneas sobre censura, regulação e pluralidade de vozes.",
    date: "2026-09-15",
    time: "19:00",
    location: "Auditório Central — [Instituição]",
    format: "parlamentar",
    participation: "aberto",
    status: "upcoming",
    inscriptionsOpen: true,
    maxParticipants: 40,
    currentParticipants: 18,
    category: "Institucional",
    rules:
      "Formato parlamentar com equipes de 2 debatedores. Tempo de fala: 7 minutos por argumentador. Réplica: 3 minutos. Eliminatória seguida de final.",
    edital: "https://www.exemplo.com/edital-domus-open-2026.pdf",
    pricing: {
      membersFree: true,
      guestPrice: 25,
      nonMemberPrice: 40,
      currency: "BRL",
      description: "Membros DOMUS: gratuita. Demais: R$ 25 (estudante) / R$ 40 (não-estudante).",
    },
    tabbycatUrl: "https://tabbycat.example.com/tournament/domus-open-2026/",
  },
  {
    id: "2",
    slug: "domus-debate-02",
    number: 2,
    title: "DEBATE DOMUS #02",
    theme: "Inteligência artificial e o futuro do trabalho intelectual",
    description:
      "Discussão sobre como a inteligência artificial está transformando o trabalho intelectual, a criatividade e as profissões do futuro. Os debatedores explorarão oportunidades, riscos e dilemas éticos dessa transição.",
    date: "2026-10-03",
    time: "19:00",
    location: "Sala de Conferências — [Instituição]",
    format: "simples",
    participation: "interno",
    status: "upcoming",
    inscriptionsOpen: true,
    maxParticipants: 20,
    currentParticipants: 12,
    category: "Tecnologia",
    pricing: {
      membersFree: true,
      guestPrice: 0,
      nonMemberPrice: 0,
      currency: "BRL",
      description: "Apenas membros DOMUS. Participação gratuita.",
    },
  },
  {
    id: "3",
    slug: "domus-intersociedades-01",
    number: 3,
    title: "DOMUS INTERSOCIEDADES #01",
    subtitle: "Encontro de Debatedores",
    theme: "Democracia representativa versus democracia direta",
    description:
      "Primeiro encontro intersociedades da DOMUS, reunindo debatedores de diferentes sociedades para confrontar ideias sobre modelos democráticos. Uma oportunidade de ampliar perspectivas e fortalecer a rede de debate acadêmico.",
    date: "2026-08-20",
    time: "19:00",
    location: "Auditório Central — [Instituição]",
    format: "equipes",
    participation: "intersociedades",
    status: "past",
    inscriptionsOpen: false,
    participants: ["[Participante A]", "[Participante B]"],
    result: "[Resultado placeholder]",
    category: "Política",
    pricing: {
      membersFree: true,
      guestPrice: 15,
      nonMemberPrice: 20,
      currency: "BRL",
      description: "Membros DOMUS: gratuita. Outras sociedades: R$ 15. Independentes: R$ 20.",
    },
  },
  {
    id: "4",
    slug: "domus-debate-04",
    number: 4,
    title: "DEBATE DOMUS #04",
    theme: "Educação formal versus autoaprendizagem na era digital",
    description:
      "Um debate sobre o futuro da educação: o papel das instituições formais diante da abundância de recursos de aprendizagem digital e autodidata.",
    date: "2026-08-05",
    time: "18:30",
    location: "Biblioteca Universitária — [Instituição]",
    format: "duplas",
    participation: "interno",
    status: "past",
    inscriptionsOpen: false,
    participants: ["[Participante C]", "[Participante D]"],
    result: "[Resultado placeholder]",
    category: "Educação",
    pricing: {
      membersFree: true,
      guestPrice: 0,
      nonMemberPrice: 0,
      currency: "BRL",
      description: "Apenas membros DOMUS. Participação gratuita.",
    },
  },
];

export function getDebateBySlug(slug: string): Debate | undefined {
  return debates.find((d) => d.slug === slug);
}

export function getUpcomingDebates(): Debate[] {
  return debates.filter((d) => d.status === "upcoming");
}

export function getOpenDebates(): Debate[] {
  return debates.filter((d) => d.inscriptionsOpen);
}

export const formatLabels: Record<DebateFormat, string> = {
  simples: "Debate Simples",
  parlamentar: "Debate Parlamentar",
  duplas: "Debate em Duplas",
  equipes: "Debate em Equipes",
  torneio: "Torneio",
  "palestra-debate": "Palestra/Debate",
  outro: "Outro",
};

export const participationLabels: Record<DebateParticipation, string> = {
  interno: "Apenas membros DOMUS",
  aberto: "Aberto a membros e convidados",
  intersociedades: "Aberto a outras sociedades",
  convidados: "Apenas convidados",
};
