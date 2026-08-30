"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowLeft, Play, Pause, RotateCcw } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TimerPage() {
  const [time, setTime] = useState(420); // 7 minutes in seconds
  const [running, setRunning] = useState(false);
  const [initialTime] = useState(420);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const minutes = Math.floor(time / 60);
  const seconds = time % 60;
  const formatted = `${String(minutes).padStart(2, "0")}:${String(seconds).padStart(2, "0")}`;

  const progress = ((initialTime - time) / initialTime) * 100;

  useEffect(() => {
    if (running && time > 0) {
      intervalRef.current = setInterval(() => {
        setTime((t) => {
          if (t <= 1) {
            setRunning(false);
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [running, time]);

  const handleStart = useCallback(() => setRunning(true), []);
  const handlePause = useCallback(() => setRunning(false), []);
  const handleReset = useCallback(() => {
    setRunning(false);
    setTime(initialTime);
  }, [initialTime]);

  const handleSetTime = (min: number) => {
    setRunning(false);
    setTime(min * 60);
  };

  return (
    <div className="min-h-screen bg-domus-dark flex flex-col">
      {/* Header */}
      <div className="p-6 flex items-center justify-between">
        <Link
          href="/admin"
          className="inline-flex items-center gap-2 text-sm text-gray-400 hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar ao admin
        </Link>
        <h1 className="text-sm font-medium text-gray-400">Cronômetro DOMUS</h1>
      </div>

      {/* Timer */}
      <div className="flex-1 flex flex-col items-center justify-center px-6">
        {/* Time display */}
        <div className="relative mb-12">
          {/* Progress ring */}
          <svg className="w-64 h-64 md:w-80 md:h-80 -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke="rgba(255,255,255,0.05)"
              strokeWidth="2"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              fill="none"
              stroke={time <= 60 ? "#EF4444" : "#0B7285"}
              strokeWidth="2"
              strokeDasharray={`${2 * Math.PI * 45}`}
              strokeDashoffset={`${2 * Math.PI * 45 * (1 - progress / 100)}`}
              strokeLinecap="round"
              className="transition-all duration-1000"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span
              className={cn(
                "font-mono text-6xl md:text-8xl font-bold tabular-nums",
                time <= 60 ? "text-red-500" : "text-white",
                time === 0 && "text-red-500"
              )}
            >
              {formatted}
            </span>
          </div>
        </div>

        {/* Controls */}
        <div className="flex items-center gap-4 mb-12">
          {!running ? (
            <button
              onClick={handleStart}
              className="w-16 h-16 rounded-full bg-domus-primary flex items-center justify-center text-white hover:bg-domus-primary-dark transition-colors cursor-pointer"
              aria-label="Iniciar"
            >
              <Play className="w-6 h-6 ml-1" />
            </button>
          ) : (
            <button
              onClick={handlePause}
              className="w-16 h-16 rounded-full bg-domus-accent flex items-center justify-center text-domus-dark hover:bg-domus-accent-light transition-colors cursor-pointer"
              aria-label="Pausar"
            >
              <Pause className="w-6 h-6" />
            </button>
          )}
          <button
            onClick={handleReset}
            className="w-12 h-12 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-gray-500 transition-colors cursor-pointer"
            aria-label="Reiniciar"
          >
            <RotateCcw className="w-5 h-5" />
          </button>
        </div>

        {/* Presets */}
        <div className="flex gap-3">
          {[3, 5, 7, 10, 15].map((min) => (
            <button
              key={min}
              onClick={() => handleSetTime(min)}
              className={cn(
                "px-4 py-2 text-sm font-medium rounded-[var(--radius-sm)] transition-all cursor-pointer",
                time === min * 60 && !running
                  ? "bg-domus-primary text-white"
                  : "bg-white/5 text-gray-400 hover:bg-white/10 hover:text-white"
              )}
            >
              {min}min
            </button>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="p-6 text-center">
        <p className="text-xs text-gray-600">
          Cronômetro para debates com tempo controlado. Use em tela cheia para melhor experiência.
        </p>
      </div>
    </div>
  );
}
