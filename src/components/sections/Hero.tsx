"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import Button from "@/components/ui/Button";
import { getUpcomingDebates } from "@/data/debates";

export default function Hero() {
  const upcoming = getUpcomingDebates();
  const nextDebate = upcoming[0];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-domus-dark" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 opacity-[0.04]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
        }}
      />

      {/* Decorative elements */}
      <div className="absolute top-20 right-[15%] w-64 h-64 rounded-full bg-domus-primary/10 blur-3xl" />
      <div className="absolute bottom-32 left-[10%] w-48 h-48 rounded-full bg-domus-accent/10 blur-3xl" />

      {/* Decorative lines */}
      <div className="absolute top-1/4 left-0 w-32 h-px bg-gradient-to-r from-transparent to-domus-primary/30" />
      <div className="absolute bottom-1/3 right-0 w-48 h-px bg-gradient-to-l from-transparent to-domus-accent/30" />

      {/* Content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 md:px-8 text-center">
        {/* Logo mark */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-8"
        >
          <div className="inline-flex items-center justify-center w-20 h-20 md:w-24 md:h-24 bg-domus-primary rounded-[var(--radius-md)] mb-6">
            <span className="font-[family-name:var(--font-playfair)] text-white text-4xl md:text-5xl font-bold">
              D
            </span>
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="font-[family-name:var(--font-playfair)] text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 leading-[0.9]"
        >
          DOMUS
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.35, ease: "easeOut" }}
          className="text-sm md:text-base tracking-[0.25em] uppercase text-domus-accent font-medium mb-6"
        >
          Sociedade de Debates e Oratória
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="w-16 h-px bg-domus-accent mx-auto mb-8"
        />

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
          className="font-[family-name:var(--font-playfair)] text-xl md:text-2xl lg:text-3xl text-gray-300 italic mb-4"
        >
          Ideias encontram argumentos.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.75, ease: "easeOut" }}
          className="text-base md:text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed mb-12"
        >
          A DOMUS é uma sociedade dedicada ao desenvolvimento da argumentação,
          da oratória e do pensamento crítico, formando pessoas capazes de
          defender ideias com clareza, inteligência e excelência.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <Link href="/#sobre">
            <Button variant="primary" size="lg">
              Conheça a DOMUS
            </Button>
          </Link>
          <Link href="/#debates">
            <Button variant="outline" size="lg" className="border-gray-600 text-gray-300 hover:bg-white/10 hover:border-white/30 hover:text-white">
              Próximos debates
            </Button>
          </Link>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="text-xs text-gray-500 tracking-wider uppercase">
          Continuar
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <ChevronDown className="w-5 h-5 text-gray-500" />
        </motion.div>
      </motion.div>
    </section>
  );
}
