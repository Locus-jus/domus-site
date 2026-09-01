import { NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

export async function GET(_request: Request, { params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (!url || !key) return new NextResponse("Supabase não configurado", { status: 500 });

  const client = createClient(url, key);
  const { data, error } = await client.from("debates").select("edital").eq("id", id).maybeSingle();
  if (error || !data?.edital) return new NextResponse("Edital não encontrado", { status: 404 });
  if (!data.edital.startsWith("data:")) return NextResponse.redirect(data.edital);

  const base64 = data.edital.split(",", 2)[1];
  const pdf = Buffer.from(base64, "base64");
  return new NextResponse(pdf, {
    headers: {
      "Content-Type": "application/pdf",
      "Content-Disposition": `inline; filename="edital-${id}.pdf"`,
      "Cache-Control": "public, max-age=3600",
    },
  });
}
