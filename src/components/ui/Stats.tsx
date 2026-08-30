"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

interface StatsProps {
  items: { value: string; label: string }[];
  className?: string;
}

export default function Stats({ items, className }: StatsProps) {
  return (
    <div
      className={cn(
        "grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12",
        className
      )}
    >
      {items.map((item, index) => (
        <StatItem key={index} value={item.value} label={item.label} />
      ))}
    </div>
  );
}

function StatItem({ value, label }: { value: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center">
      <div
        className={cn(
          "font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-domus-primary transition-all duration-700",
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        )}
      >
        {value}
      </div>
      <div className="mt-2 text-sm text-domus-text-secondary tracking-wide uppercase">
        {label}
      </div>
    </div>
  );
}
