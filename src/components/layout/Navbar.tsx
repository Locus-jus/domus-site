"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Menu, X, User, LogOut } from "lucide-react";
import { useAuth } from "@/lib/auth";

const navLinks = [
  { href: "/#sobre", label: "A DOMUS" },
  { href: "/#debates", label: "Debates" },
  { href: "/eventos", label: "Eventos" },
  { href: "/#ideias", label: "Ideias" },
  { href: "/membros", label: "Membros" },
  { href: "/contato", label: "Contato" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { user, logout, isLoading } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled
            ? "bg-domus-surface/95 backdrop-blur-md border-b border-domus-border-light shadow-[var(--shadow-sm)]"
            : "bg-transparent"
        )}
      >
        <nav className="max-w-7xl mx-auto px-6 md:px-8 flex items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-3 group" aria-label="DOMUS - Página inicial">
            <Image
              src="/domus-logo.svg"
              alt="DOMUS"
              width={40}
              height={40}
              className="w-9 h-9 md:w-10 md:h-10"
              priority
            />
            <div className="hidden sm:block">
              <span className="font-[family-name:var(--font-playfair)] text-lg font-bold text-domus-text group-hover:text-domus-primary transition-colors">
                DOMUS
              </span>
            </div>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-domus-text-secondary hover:text-domus-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-0 after:h-0.5 after:bg-domus-primary after:transition-all hover:after:w-full"
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop User / Admin links */}
          <div className="hidden md:flex items-center gap-4">
            {!isLoading && user ? (
              <>
                <Link
                  href="/perfil"
                  className="flex items-center gap-2 text-sm text-domus-text-secondary hover:text-domus-primary transition-colors"
                >
                  <User className="w-4 h-4" />
                  <span className="max-w-[100px] truncate">{user.name}</span>
                </Link>
                <button
                  onClick={logout}
                  className="text-xs text-domus-text-muted hover:text-domus-primary transition-colors"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="text-sm font-medium text-domus-text-secondary hover:text-domus-primary transition-colors"
              >
                Entrar
              </Link>
            )}
            <Link
              href="/admin"
              className="text-xs text-domus-text-muted hover:text-domus-primary transition-colors"
            >
              Admin
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-domus-text"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label={mobileOpen ? "Fechar menu" : "Abrir menu"}
            aria-expanded={mobileOpen}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </nav>
      </header>

      {/* Mobile Menu */}
      <div
        className={cn(
          "fixed inset-0 z-40 bg-domus-surface transition-all duration-300 md:hidden",
          mobileOpen
            ? "opacity-100 pointer-events-auto"
            : "opacity-0 pointer-events-none"
        )}
      >
        <div className="flex flex-col items-center justify-center h-full gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-domus-text hover:text-domus-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/admin"
            onClick={() => setMobileOpen(false)}
            className="text-sm text-domus-text-muted hover:text-domus-primary transition-colors"
          >
            Área administrativa
          </Link>
          {!isLoading && user ? (
            <>
              <Link
                href="/perfil"
                onClick={() => setMobileOpen(false)}
                className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-domus-text hover:text-domus-primary transition-colors"
              >
                Meu perfil
              </Link>
              <button
                onClick={() => {
                  logout();
                  setMobileOpen(false);
                }}
                className="text-sm text-domus-text-muted hover:text-domus-primary transition-colors"
              >
                Sair da conta
              </button>
            </>
          ) : (
            <Link
              href="/login"
              onClick={() => setMobileOpen(false)}
              className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-domus-text hover:text-domus-primary transition-colors"
            >
              Entrar
            </Link>
          )}
        </div>
      </div>
    </>
  );
}
