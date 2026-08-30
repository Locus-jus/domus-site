export interface RankingEntry {
  position: number;
  name: string;
  wins: number;
  points: number;
}

export const ranking: RankingEntry[] = [
  { position: 1, name: "[Nome Placeholder]", wins: 12, points: 360 },
  { position: 2, name: "[Nome Placeholder]", wins: 10, points: 310 },
  { position: 3, name: "[Nome Placeholder]", wins: 9, points: 285 },
  { position: 4, name: "[Nome Placeholder]", wins: 8, points: 260 },
  { position: 5, name: "[Nome Placeholder]", wins: 7, points: 230 },
  { position: 6, name: "[Nome Placeholder]", wins: 6, points: 200 },
  { position: 7, name: "[Nome Placeholder]", wins: 5, points: 175 },
  { position: 8, name: "[Nome Placeholder]", wins: 4, points: 140 },
];
