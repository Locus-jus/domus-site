"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { Lock } from "lucide-react";
import Image from "next/image";

const ADMIN_PASSWORD = "domus2026";

interface AdminGateProps {
  children: React.ReactNode;
}

export default function AdminGate({ children }: AdminGateProps) {
  const [authenticated, setAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === ADMIN_PASSWORD) {
      setAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPassword("");
    }
  };

  if (authenticated) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen bg-domus-background flex items-center justify-center px-6">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Image
            src="/file_0000000009a0820eaf8042a865e67d68.png"
            alt="DOMUS"
            width={64}
            height={64}
            className="w-16 h-16 mx-auto mb-4"
          />
          <h1 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-domus-text mb-2">
            Área Administrativa
          </h1>
          <p className="text-sm text-domus-text-muted">
            Insira a senha para acessar o painel.
          </p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-domus-surface border border-domus-border-light rounded-[var(--radius-xl)] p-8 shadow-[var(--shadow-sm)]"
        >
          <div className="mb-6">
            <label
              htmlFor="admin-password"
              className="block text-sm font-medium text-domus-text mb-2"
            >
              Senha
            </label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-domus-text-muted" />
              <input
                id="admin-password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                className={cn(
                  "w-full pl-10 pr-4 py-3 rounded-[var(--radius-sm)] border bg-domus-background text-domus-text text-sm focus:outline-none focus:ring-2 focus:ring-domus-primary/30 focus:border-domus-primary transition-colors",
                  error ? "border-red-400" : "border-domus-border"
                )}
                placeholder="Digite a senha"
                autoFocus
              />
            </div>
            {error && (
              <p className="mt-2 text-sm text-red-500">
                Senha incorreta. Tente novamente.
              </p>
            )}
          </div>

          <button
            type="submit"
            className="w-full px-6 py-3 bg-domus-primary text-white font-medium rounded-[var(--radius-sm)] hover:bg-domus-primary-dark transition-colors cursor-pointer"
          >
            Entrar
          </button>
        </form>

        <p className="text-center text-xs text-domus-text-muted mt-6">
          Acesso restrito a administradores da DOMUS.
        </p>
      </div>
    </div>
  );
}
