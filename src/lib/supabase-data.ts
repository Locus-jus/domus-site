"use client";

import { supabase } from "@/lib/supabase";
import { debates as defaultDebates, type Debate } from "@/data/debates";
import { inscriptions as defaultInscriptions, type Inscription } from "@/data/inscriptions";
import type { ManagedEvent } from "@/components/admin/EventManager";
import type { Judge } from "@/data/judges";

function toRow(debate: Debate) {
  return {
    id: debate.id, slug: debate.slug, number: debate.number, title: debate.title,
    subtitle: debate.subtitle, theme: debate.theme, description: debate.description,
    date: debate.date, time: debate.time, location: debate.location, format: debate.format,
    participation: debate.participation, status: debate.status,
    inscriptions_open: debate.inscriptionsOpen, max_participants: debate.maxParticipants,
    current_participants: debate.currentParticipants || 0, category: debate.category,
    rules: debate.rules, edital: debate.edital, is_paid: debate.isPaid, tabbycat_url: debate.tabbycatUrl,
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
    rules: row.rules ? String(row.rules) : undefined, edital: row.edital ? String(row.edital) : undefined, isPaid: Boolean(row.is_paid),
    tabbycatUrl: row.tabbycat_url ? String(row.tabbycat_url) : undefined,
  };
}

export async function fetchCloudDebates(): Promise<Debate[] | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.from("debates").select("*").order("number");
  if (error) return null;
  const { data: cloudInscriptions } = await supabase.from("inscriptions").select("id, debate_id, status");
  const originalIds = new Set(["1", "2", "3"]);
  return (data || []).map((row) => {
    const debate = fromRow(row);
    const newCount = (cloudInscriptions || []).filter((item) => item.debate_id === debate.id && !originalIds.has(String(item.id)) && item.status !== "cancelada").length;
    return { ...debate, currentParticipants: (debate.currentParticipants || 0) + newCount };
  });
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
  const cloudItems = (data || []).map((row) => ({ id: String(row.id), debateId: String(row.debate_id), name: String(row.name), email: String(row.email), society: String(row.society), institution: String(row.institution || ""), category: String(row.category), phone: row.phone ? String(row.phone) : undefined, status: row.status as Inscription["status"], createdAt: String(row.created_at) }));
  return cloudItems;
}

export async function seedCloudInscriptions() {
  if (!supabase) return;
  const { data } = await supabase.from("inscriptions").select("id");
  const existing = new Set((data || []).map((item) => String(item.id)));
  const missing = defaultInscriptions.filter((item) => !existing.has(item.id));
  if (missing.length) await supabase.from("inscriptions").upsert(missing.map((item) => ({ id: item.id, debate_id: item.debateId, name: item.name, email: item.email, society: item.society, institution: item.institution, category: item.category, phone: item.phone, status: item.status, created_at: item.createdAt })));
}

export async function insertCloudInscription(item: Inscription) {
  if (!supabase) return;
  const { error } = await supabase.from("inscriptions").upsert({ id: item.id, debate_id: item.debateId, name: item.name, email: item.email, society: item.society, institution: item.institution, category: item.category, phone: item.phone, status: item.status, created_at: item.createdAt });
  if (!error) {
    const { data: debate } = await supabase.from("debates").select("current_participants").eq("id", item.debateId).maybeSingle();
    if (debate) await supabase.from("debates").update({ current_participants: Number(debate.current_participants || 0) + 1 }).eq("id", item.debateId);
  }
}

export async function deleteCloudInscription(id: string) {
  if (supabase) await supabase.from("inscriptions").delete().eq("id", id);
}

export async function fetchCloudEvents(): Promise<ManagedEvent[] | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.from("events").select("*").order("date");
  if (error) return null;
  return (data || []).map((row) => ({ id: String(row.id), name: String(row.name), description: String(row.description || ""), date: String(row.date), time: String(row.time), location: String(row.location), type: String(row.type), format: row.format as ManagedEvent["format"], participation: row.participation as ManagedEvent["participation"], status: row.status as ManagedEvent["status"], inscriptionsOpen: Boolean(row.inscriptions_open), maxParticipants: row.max_participants ? Number(row.max_participants) : undefined, currentParticipants: Number(row.current_participants || 0), editalUrl: row.edital_url ? String(row.edital_url) : undefined }));
}

export async function upsertCloudEvent(event: ManagedEvent) {
  if (supabase) await supabase.from("events").upsert({ id: event.id, name: event.name, description: event.description, date: event.date, time: event.time, location: event.location, type: event.type, format: event.format, participation: event.participation, status: event.status, inscriptions_open: event.inscriptionsOpen, max_participants: event.maxParticipants, current_participants: event.currentParticipants, edital_url: event.editalUrl });
}

export async function deleteCloudEvent(id: string) {
  if (supabase) await supabase.from("events").delete().eq("id", id);
}

export async function fetchCloudJudges(): Promise<Judge[] | null> {
  if (!supabase) return null;
  const { data, error } = await supabase.from("judges").select("*").order("name");
  if (error) return null;
  return (data || []).map((row) => ({ id: String(row.id), name: String(row.name), email: String(row.email), society: String(row.society), experience: String(row.experience || ""), notes: row.notes ? String(row.notes) : undefined, assignedDebates: Array.isArray(row.assigned_debates) ? row.assigned_debates.map(String) : [] }));
}

export async function upsertCloudJudge(judge: Judge) {
  if (supabase) await supabase.from("judges").upsert({ id: judge.id, name: judge.name, email: judge.email, society: judge.society, experience: judge.experience, notes: judge.notes, assigned_debates: judge.assignedDebates });
}

export async function deleteCloudJudge(id: string) {
  if (supabase) await supabase.from("judges").delete().eq("id", id);
}
