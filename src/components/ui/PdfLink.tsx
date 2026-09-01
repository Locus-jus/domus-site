"use client";

import { ExternalLink } from "lucide-react";

export default function PdfLink({ href, label = "Abrir PDF" }: { href: string; label?: string }) {
  const open = () => {
    if (!href.startsWith("data:")) return;
    const encoded = href.split(",", 2)[1];
    const binary = atob(encoded);
    const bytes = new Uint8Array(binary.length);
    for (let index = 0; index < binary.length; index += 1) bytes[index] = binary.charCodeAt(index);
    const url = URL.createObjectURL(new Blob([bytes], { type: "application/pdf" }));
    window.open(url, "_blank", "noopener,noreferrer");
  };
  if (!href.startsWith("data:")) return <a href={href} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 text-sm text-domus-primary hover:underline"><ExternalLink className="w-4 h-4" />{label}</a>;
  return <button type="button" onClick={open} className="inline-flex items-center gap-2 text-sm text-domus-primary hover:underline"><ExternalLink className="w-4 h-4" />{label}</button>;
}
