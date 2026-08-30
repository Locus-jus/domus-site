import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "@/lib/auth";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "DOMUS — Sociedade de Debates e Oratória",
  description:
    "Sociedade de Debates e Oratória DOMUS. Desenvolvimento de argumentação, oratória, pensamento crítico e formação intelectual.",
  keywords: [
    "debates",
    "oratória",
    "argumentação",
    "pensamento crítico",
    "retórica",
    "sociedade acadêmica",
    "DOMUS",
  ],
  openGraph: {
    title: "DOMUS — Sociedade de Debates e Oratória",
    description:
      "Sociedade de Debates e Oratória DOMUS. Desenvolvimento de argumentação, oratória, pensamento crítico e formação intelectual.",
    type: "website",
    locale: "pt_BR",
    siteName: "DOMUS",
  },
  twitter: {
    card: "summary_large_image",
    title: "DOMUS — Sociedade de Debates e Oratória",
    description:
      "Sociedade de Debates e Oratória DOMUS. Desenvolvimento de argumentação, oratória, pensamento crítico e formação intelectual.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt-BR"
      className={`${playfair.variable} ${inter.variable} h-full antialiased`}
    >
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
      </head>
      <body className="min-h-full flex flex-col">
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
