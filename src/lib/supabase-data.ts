"use client";

import { supabase } from "@/lib/supabase";
import { debates as defaultDebates, type Debate } from "@/data/debates";
import type { Inscription } from "@/data/inscriptions";

function toRow(debate: Debate) {
  return {
    id: debate.id, slug: debate.slug, number: debate.number, title: debate.title,
    subtitle: debate.subtitle, theme: debate.theme, description: debate.description,
    date: debate.date, time: debate.time, location: debate.location, format: debate.format,
    participation: debate.participation, status: debate.status,
    inscriptions_open: debate.inscriptionsOpen, max_participants: debate.maxParticipants,
    current_participants: debate.currentParticipants || 0, category: debate.category,
    rules: debate.rules, edital: debate.edital, tabbycat_url: debate.tabbycatUrl,
  };
}

function fromRow(row: Record<string, unknown>): Debate {
  return {
    id: String(row.id), slug: String(row.slug), number: Number(row.number), title: String(row.title),
    subtitle: row.subtitle ? String(row.subtitle) : undefined, theme: String(row.theme), description: String(row.description),
    date: String(row.date), time: String(row.time), location: String(row.location), format: row.format as Debate["format"],
    participation: row.participation as Debate["participation"], status: row.status as Debate["status"],
    inscriptionsOpen: Boolean(row.inscriptions_open), maxParticipants: row.max_participants ? Number(row.max_participants) : undefined,
    currentParticipants: Number(row.current_participants || 0), category: String(row.category),
    rules: row.rules ? String(row.rules) : undefined, edital: row.edital ? String(row.edital) : undefined,
    tabbycatUrl: row.tabbycat_url ? String(row.tabbycat_url) : undefined,
  };
}

export async function fetchCloudDebates(): Promise<Debate[] | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.from("debates").select("*").order("number");
  return error ? null : (data || []).map((row) => fromRow(row));
}

export async function upsertCloudDebate(debate: Debate) {
  if (!supabase) return;
  await supabase.from("debates").upsert(toRow(debate));
}

export async function seedCloudDebates() {
  if (!supabase) return;
  const current = await fetchCloudDebates();
  if (current?.length === 0) await supabase.from("debates").upsert(defaultDebates.map(toRow));
}

export async function deleteCloudDebate(id: string) {
  if (supabase) await supabase.from("debates").delete().eq("id", id);
}

export async function fetchCloudInscriptions(): Promise<Inscription[] | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.from("inscriptions").select("*").order("created_at", { ascending: false });
  if (error) return null;
  return (data || []).map((row) => ({ id: String(row.id), debateId: String(row.debate_id), name: String(row.name), email: String(row.email), society: String(row.society), institution: String(row.institution || ""), category: String(row.category), phone: row.phone ? String(row.phone) : undefined, status: row.status as Inscription["status"], createdAt: String(row.created_at) }));
}

export async function insertCloudInscription(item: Inscription) {
  if (!supabase) return;
  const { error } = await supabase.from("inscriptions").upsert({ id: item.id, debate_id: item.debateId, name: item.name, email: item.email, society: item.society, institution: item.institution, category: item.category, phone: item.phone, status: item.status, created_at: item.createdAt });
  if (!error) {
    const { data: debate } = await supabase.from("debates").select("current_participants").eq("id", item.debateId).maybeSingle();
    if (debate) await supabase.from("debates").update({ current_participants: Number(debate.current_participants || 0) + 1 }).eq("id", item.debateId);
  }
}
