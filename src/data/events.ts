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

export const events: Event[] = [];
