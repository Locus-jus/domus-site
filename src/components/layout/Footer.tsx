import Link from "next/link";
import Image from "next/image";

function InstagramIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
      <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
      <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
    </svg>
  );
}

function YoutubeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17" />
      <path d="m10 15 5-3-5-3z" />
    </svg>
  );
}

function LinkedinIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect width="4" height="12" x="2" y="9" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

const footerLinks = {
  navegacao: [
    { href: "/#sobre", label: "A DOMUS" },
    { href: "/#debates", label: "Debates" },
    { href: "/eventos", label: "Eventos" },
    { href: "/#ideias", label: "Ideias" },
    { href: "/membros", label: "Membros" },
    { href: "/contato", label: "Contato" },
  ],
  social: [
    { href: "#", label: "Instagram", icon: InstagramIcon },
    { href: "#", label: "YouTube", icon: YoutubeIcon },
    { href: "#", label: "LinkedIn", icon: LinkedinIcon },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-domus-dark text-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8">
          {/* Brand */}
          <div className="md:col-span-5">
            <Link href="/" className="inline-flex items-center gap-3 mb-4">
              <Image
                src="/domus-logo.svg"
                alt="DOMUS"
                width={40}
                height={40}
                className="w-10 h-10"
              />
              <span className="font-[family-name:var(--font-playfair)] text-xl font-bold">
                DOMUS
              </span>
            </Link>
            <p className="text-sm text-gray-400 leading-relaxed mt-4 max-w-sm">
              Sociedade de Debates e Oratória
            </p>
            <p className="text-sm text-gray-500 leading-relaxed mt-2 max-w-sm">
              Desenvolvimento de argumentação, oratória, pensamento crítico e
              formação intelectual.
            </p>
          </div>

          {/* Links */}
          <div className="md:col-span-4">
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-domus-accent mb-4">
              Navegação
            </h4>
            <ul className="space-y-3">
              {footerLinks.navegacao.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-white transition-colors"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div className="md:col-span-3">
            <h4 className="text-xs font-semibold tracking-[0.2em] uppercase text-domus-accent mb-4">
              Redes Sociais
            </h4>
            <div className="flex gap-4">
              {footerLinks.social.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.href}
                    className="w-10 h-10 rounded-full border border-gray-700 flex items-center justify-center text-gray-400 hover:text-white hover:border-domus-primary transition-colors"
                    aria-label={social.label}
                  >
                    <Icon className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
            <div className="mt-6">
              <Link
                href="/contato"
                className="text-sm font-semibold text-domus-primary hover:text-domus-primary-light transition-colors"
              >
                Entre em contato
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-gray-500">
            &copy; {new Date().getFullYear()} DOMUS — Sociedade de Debates e
            Oratória. Todos os direitos reservados.
          </p>
          <p className="text-xs text-gray-600 italic">
            &ldquo;Ideias encontram argumentos.&rdquo;
          </p>
        </div>
      </div>
    </footer>
  );
}
