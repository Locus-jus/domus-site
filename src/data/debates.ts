export interface Debate {
  id: string;
  number: number;
  title: string;
  theme: string;
  date: string;
  time: string;
  location: string;
  status: "upcoming" | "past";
  participants?: string[];
  result?: string;
  category: string;
}

export const debates: Debate[] = [
  {
    id: "1",
    number: 1,
    title: "DEBATE DOMUS #01",
    theme: "Liberdade de expressão e os limites do discurso público",
    date: "2026-09-15",
    time: "19:00",
    location: "Auditório Central — [Instituição]",
    status: "upcoming",
    category: "Institucional",
  },
  {
    id: "2",
    number: 2,
    title: "DEBATE DOMUS #02",
    theme: "Inteligência artificial e o futuro do trabalho intelectual",
    date: "2026-10-03",
    time: "19:00",
    location: "Sala de Conferências — [Instituição]",
    status: "upcoming",
    category: "Tecnologia",
  },
  {
    id: "3",
    number: 3,
    title: "DEBATE DOMUS #03",
    theme: "Democracia representativa versus democracia direta",
    date: "2026-08-20",
    time: "19:00",
    location: "Auditório Central — [Instituição]",
    status: "past",
    participants: ["[Participante A]", "[Participante B]"],
    result: "[Resultado placeholder]",
    category: "Política",
  },
  {
    id: "4",
    number: 4,
    title: "DEBATE DOMUS #04",
    theme: "Educação formal versus autoaprendizagem na era digital",
    date: "2026-08-05",
    time: "18:30",
    location: "Biblioteca Universitária — [Instituição]",
    status: "past",
    participants: ["[Participante C]", "[Participante D]"],
    result: "[Resultado placeholder]",
    category: "Educação",
  },
];
