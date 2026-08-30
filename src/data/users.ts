export type UserRole = "admin" | "member" | "guest";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  phone?: string;
  institution?: string;
  memberSince?: string;
  joinedDebates: number;
  inscriptions: string[];
  isDomusMember: boolean;
}

export const users: User[] = [
  {
    id: "1",
    name: "Admin DOMUS",
    email: "admin@domus.com",
    role: "admin",
    institution: "DOMUS",
    memberSince: "2025-01-01",
    joinedDebates: 15,
    inscriptions: ["1", "2", "3", "4"],
    isDomusMember: true,
  },
];

export function getUserByEmail(email: string): User | undefined {
  return users.find((u) => u.email === email);
}

export function getUserById(id: string): User | undefined {
  return users.find((u) => u.id === id);
}
