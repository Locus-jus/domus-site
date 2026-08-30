create table if not exists public.debates (
  id text primary key,
  slug text unique not null,
  number integer not null,
  title text not null,
  subtitle text,
  theme text not null,
  description text not null,
  date date not null,
  time text not null,
  location text not null,
  format text not null,
  participation text not null,
  status text not null default 'upcoming',
  inscriptions_open boolean not null default false,
  max_participants integer,
  current_participants integer not null default 0,
  category text not null,
  is_paid boolean not null default false,
  rules text,
  edital text,
  tabbycat_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.inscriptions (
  id text primary key,
  debate_id text not null references public.debates(id) on delete cascade,
  name text not null,
  email text not null,
  society text not null,
  institution text not null default '',
  category text not null,
  phone text,
  status text not null default 'pendente',
  created_at date not null default current_date
);

create table if not exists public.events (
  id text primary key,
  name text not null,
  description text not null default '',
  date date not null,
  time text not null,
  location text not null,
  type text not null,
  format text not null,
  participation text not null,
  status text not null default 'upcoming',
  inscriptions_open boolean not null default false,
  max_participants integer,
  current_participants integer not null default 0,
  edital_url text,
  created_at timestamptz not null default now()
);

create table if not exists public.judges (
  id text primary key,
  name text not null,
  email text not null,
  society text not null,
  experience text not null default '',
  notes text,
  assigned_debates text[] not null default '{}',
  created_at timestamptz not null default now()
);

create table if not exists public.deleted_events (
  id text primary key,
  deleted_at timestamptz not null default now()
);

alter table public.debates enable row level security;
alter table public.inscriptions enable row level security;
alter table public.events enable row level security;
alter table public.judges enable row level security;
alter table public.deleted_events enable row level security;
create policy "public can read debates" on public.debates for select using (true);
create policy "public can read inscriptions" on public.inscriptions for select using (true);
create policy "public can submit inscriptions" on public.inscriptions for insert with check (true);
create policy "public can update debates" on public.debates for all using (true) with check (true);
create policy "public can read events" on public.events for select using (true);
create policy "public can manage events" on public.events for all using (true) with check (true);
create policy "public can read judges" on public.judges for select using (true);
create policy "public can manage judges" on public.judges for all using (true) with check (true);
create policy "public can read deleted events" on public.deleted_events for select using (true);
create policy "public can manage deleted events" on public.deleted_events for all using (true) with check (true);
