export type InscriptionStatus = "pendente" | "confirmada" | "cancelada";

export interface Inscription {
  id: string;
  debateId: string;
  name: string;
  email: string;
  society: string;
  institution: string;
  category: string;
  phone?: string;
  status: InscriptionStatus;
  createdAt: string;
}

export const inscriptions: Inscription[] = [
  {
    id: "1",
    debateId: "1",
    name: "Ana Beatriz Silva",
    email: "ana@email.com",
    society: "DOMUS",
    institution: "[Instituição]",
    category: "Debatedora",
    status: "confirmada",
    createdAt: "2026-08-20",
  },
  {
    id: "2",
    debateId: "1",
    name: "João Pedro Santos",
    email: "joao@email.com",
    society: "Sociedade X",
    institution: "[Instituição]",
    category: "Debatedor",
    status: "confirmada",
    createdAt: "2026-08-21",
  },
  {
    id: "3",
    debateId: "1",
    name: "Maria Fernanda Costa",
    email: "maria@email.com",
    society: "Independente",
    institution: "[Instituição]",
    category: "Convidada",
    status: "pendente",
    createdAt: "2026-08-22",
  },
];

export function getInscriptionsByDebate(debateId: string): Inscription[] {
  return inscriptions.filter((i) => i.debateId === debateId);
}

export function addInscription(inscription: Omit<Inscription, "id" | "status" | "createdAt">): Inscription {
  const newInscription: Inscription = {
    ...inscription,
    id: String(inscriptions.length + 1),
    status: "pendente",
    createdAt: new Date().toISOString().split("T")[0],
  };
  inscriptions.push(newInscription);
  return newInscription;
}
