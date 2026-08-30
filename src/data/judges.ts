export interface Judge {
  id: string;
  name: string;
  email: string;
  society: string;
  experience: string;
  notes?: string;
  assignedDebates: string[];
}

export const judges: Judge[] = [
  {
    id: "1",
    name: "[Nome Placeholder]",
    email: "[email@placeholder.com]",
    society: "[Instituição Placeholder]",
    experience: "Experiência em debates parlamentares e formação de debatedores.",
    assignedDebates: ["1"],
  },
  {
    id: "2",
    name: "[Nome Placeholder]",
    email: "[email@placeholder.com]",
    society: "[Instituição Placeholder]",
    experience: "Jurado em torneios interestaduais de debate.",
    assignedDebates: ["1"],
  },
];

export function getJudgeById(id: string): Judge | undefined {
  return judges.find((j) => j.id === id);
}

export function getJudgesForDebate(debateId: string): Judge[] {
  return judges.filter((j) => j.assignedDebates.includes(debateId));
}
