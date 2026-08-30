"use client";

import { cn } from "@/lib/utils";

interface RankingTableProps {
  data: { position: number; name: string; wins: number; points: number }[];
  className?: string;
}

export default function RankingTable({ data, className }: RankingTableProps) {
  return (
    <div className={cn("w-full overflow-x-auto", className)}>
      <table className="w-full text-left">
        <thead>
          <tr className="border-b border-domus-border">
            <th className="py-4 px-4 text-xs font-semibold tracking-wider uppercase text-domus-text-muted">
              #
            </th>
            <th className="py-4 px-4 text-xs font-semibold tracking-wider uppercase text-domus-text-muted">
              Debatedor
            </th>
            <th className="py-4 px-4 text-xs font-semibold tracking-wider uppercase text-domus-text-muted text-center">
              Vitórias
            </th>
            <th className="py-4 px-4 text-xs font-semibold tracking-wider uppercase text-domus-text-muted text-center">
              Pontos
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((entry) => (
            <tr
              key={entry.position}
              className={cn(
                "border-b border-domus-border-light transition-colors hover:bg-domus-primary/5",
                entry.position <= 3 && "bg-domus-accent/5"
              )}
            >
              <td className="py-4 px-4">
                <span
                  className={cn(
                    "inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold",
                    entry.position === 1 &&
                      "bg-domus-accent text-domus-dark",
                    entry.position === 2 &&
                      "bg-domus-text-muted/20 text-domus-text",
                    entry.position === 3 &&
                      "bg-domus-accent/20 text-domus-accent",
                    entry.position > 3 &&
                      "text-domus-text-secondary"
                  )}
                >
                  {entry.position}
                </span>
              </td>
              <td className="py-4 px-4 font-medium text-domus-text">
                {entry.name}
              </td>
              <td className="py-4 px-4 text-center text-domus-text-secondary">
                {entry.wins}
              </td>
              <td className="py-4 px-4 text-center font-semibold text-domus-primary">
                {entry.points}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
