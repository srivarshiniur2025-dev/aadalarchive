-- Creative ideas saved by dancers (AI suggestions become user-owned when saved)

create table if not exists public.creative_ideas (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  description text not null,
  category text not null,
  dance_form text,
  source_context text,
  related_queries text[] not null default '{}',
  related_image_url text,
  board_id uuid references public.boards (id) on delete set null,
  ai_generated boolean not null default true,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists creative_ideas_user_id_idx on public.creative_ideas (user_id);
create index if not exists creative_ideas_created_at_idx on public.creative_ideas (created_at desc);
create index if not exists creative_ideas_board_id_idx on public.creative_ideas (board_id);

alter table public.creative_ideas enable row level security;

drop policy if exists "creative_ideas_own" on public.creative_ideas;
create policy "creative_ideas_own" on public.creative_ideas
  for all using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- Optional dancer profile enrichment (safe additive columns)
alter table public.profiles
  add column if not exists secondary_dance_forms text[] not null default '{}';

alter table public.profiles
  add column if not exists current_project text;

alter table public.profiles
  add column if not exists experience_level text;

alter table public.profiles
  add column if not exists guru_name text;
