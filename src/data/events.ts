export interface Event {
  id: string;
  name: string;
  description: string;
  date: string;
  time: string;
  location: string;
  speakers?: string[];
  status: "open" | "soon" | "closed";
  category: string;
  coverColor?: string;
}

export const events: Event[] = [
  {
    id: "1",
    name: "Workshop de Oratória",
    description: "Treinamento prático de comunicação e presença em público para debatedores e interessados.",
    date: "2026-09-20",
    time: "14:00",
    location: "Sala de Workshops — [Instituição]",
    speakers: ["[Palestrante Placeholder]"],
    status: "open",
    category: "Formação",
  },
  {
    id: "2",
    name: "Palestra: Retórica Clássica",
    description: "Uma introdução aos princípios da retórica aristotélica e sua aplicação no debate contemporâneo.",
    date: "2026-10-10",
    time: "19:00",
    location: "Auditório Central — [Instituição]",
    speakers: ["[Palestrante Placeholder]"],
    status: "soon",
    category: "Palestra",
  },
  {
    id: "3",
    name: "Encontro de Abertura 2026",
    description: "Apresentação da programação semestral da DOMUS, abertura de inscrições e recepção de novos membros.",
    date: "2026-09-01",
    time: "18:00",
    location: "Auditório Central — [Instituição]",
    status: "closed",
    category: "Institucional",
  },
  {
    id: "4",
    name: "Torneio Interestadual de Debates",
    description: "Competição entre equipes de diversas instituições em formato de debate formal.",
    date: "2026-11-15",
    time: "09:00",
    location: "[Local Placeholder]",
    status: "soon",
    category: "Competição",
  },
];
