export interface Evaluation {
  id: string;
  judgeId: string;
  judgeName: string;
  debateId: string;
  participantName: string;
  team?: string;
  scores: {
    argumentation: number;
    oratory: number;
    refutation: number;
    clarity: number;
    content: number;
  };
  generalComment: string;
  strengths: string;
  improvements: string;
  result: "vitoria" | "derrota" | "empate";
  createdAt: string;
}

export const evaluations: Evaluation[] = [
  {
    id: "1",
    judgeId: "1",
    judgeName: "[Nome Placeholder]",
    debateId: "3",
    participantName: "[Participante A]",
    team: "Equipe Governo",
    scores: {
      argumentation: 8,
      oratory: 7,
      refutation: 9,
      clarity: 8,
      content: 7,
    },
    generalComment: "Argumentação sólida e boa capacidade de refutação.",
    strengths: "Presença de palco, clareza nos argumentos.",
    improvements: "Poderia desenvolver mais os dados empíricos.",
    result: "vitoria",
    createdAt: "2026-08-20",
  },
];

export function getEvaluationsForDebate(debateId: string): Evaluation[] {
  return evaluations.filter((e) => e.debateId === debateId);
}

export function getEvaluationsByJudge(judgeId: string): Evaluation[] {
  return evaluations.filter((e) => e.judgeId === judgeId);
}
