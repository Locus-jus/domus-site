"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

interface TimelineProps {
  events: { year: string; title: string; description: string }[];
  className?: string;
}

export default function Timeline({ events, className }: TimelineProps) {
  return (
    <div className={cn("relative", className)}>
      <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-domus-border" />
      {events.map((event, index) => (
        <TimelineItem key={index} event={event} index={index} />
      ))}
    </div>
  );
}

function TimelineItem({
  event,
  index,
}: {
  event: { year: string; title: string; description: string };
  index: number;
}) {
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
      { threshold: 0.2 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const isLeft = index % 2 === 0;

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex items-start mb-12 transition-all duration-700",
        isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6",
        "md:justify-center"
      )}
    >
      <div
        className={cn(
          "absolute left-4 md:left-1/2 w-3 h-3 rounded-full bg-domus-primary border-2 border-white transform -translate-x-1.5 md:-translate-x-1.5 z-10",
          "mt-1.5"
        )}
      />
      <div
        className={cn(
          "ml-10 md:ml-0 md:w-[calc(50%-2rem)]",
          isLeft ? "md:pr-8 md:text-right" : "md:pl-8 md:ml-auto"
        )}
      >
        <span className="text-sm font-semibold text-domus-accent tracking-wider uppercase">
          {event.year}
        </span>
        <h3 className="mt-1 font-[family-name:var(--font-playfair)] text-xl font-bold text-domus-text">
          {event.title}
        </h3>
        <p className="mt-2 text-sm text-domus-text-secondary leading-relaxed">
          {event.description}
        </p>
      </div>
    </div>
  );
}
