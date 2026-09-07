-- AadalArchive production schema
-- Run in Supabase SQL Editor (or via supabase db push)
-- Safe to re-run: uses IF NOT EXISTS / DROP POLICY IF EXISTS patterns where needed.

create extension if not exists "pgcrypto";

-- ---------- helpers ----------
create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- ---------- profiles ----------
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text,
  name text not null default '',
  handle text unique,
  avatar_url text,
  bio text default '',
  dance_form text default '',
  location text default '',
  website text default '',
  artistic_statement text default '',
  user_type text default 'dancer',
  interests text[] not null default '{}',
  socials jsonb not null default '[]'::jsonb,
  portfolio_public boolean not null default false,
  onboarding_completed boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists profiles_handle_idx on public.profiles (handle);
create index if not exists profiles_dance_form_idx on public.profiles (dance_form);

drop trigger if exists profiles_set_updated_at on public.profiles;
create trigger profiles_set_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

-- Auto-create profile on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
declare
  base_handle text;
  final_handle text;
begin
  base_handle := lower(regexp_replace(coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)), '[^a-z0-9]+', '', 'g'));
  if base_handle is null or length(base_handle) < 3 then
    base_handle := 'dancer';
  end if;
  final_handle := base_handle || substr(replace(new.id::text, '-', ''), 1, 6);

  insert into public.profiles (id, email, name, handle)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', ''),
    final_handle
  )
  on conflict (id) do nothing;

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row execute function public.handle_new_user();

-- ---------- boards ----------
create table if not exists public.boards (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  description text default '',
  cover_url text,
  privacy text not null default 'private' check (privacy in ('private','invite_only','public')),
  tags text[] not null default '{}',
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists boards_owner_id_idx on public.boards (owner_id);
create index if not exists boards_created_at_idx on public.boards (created_at desc);
create index if not exists boards_privacy_idx on public.boards (privacy);

drop trigger if exists boards_set_updated_at on public.boards;
create trigger boards_set_updated_at
before update on public.boards
for each row execute function public.set_updated_at();

-- ---------- inspiration cache (external API results) ----------
create table if not exists public.inspiration_cache (
  id uuid primary key default gen_random_uuid(),
  provider text not null,
  external_id text not null,
  title text,
  image_url text not null,
  thumbnail_url text,
  source_url text,
  creator_name text,
  creator_url text,
  category text,
  tags text[] not null default '{}',
  width integer,
  height integer,
  attribution_required boolean not null default true,
  license text,
  query_key text,
  metadata jsonb not null default '{}'::jsonb,
  fetched_at timestamptz not null default now(),
  unique (provider, external_id)
);

create index if not exists inspiration_cache_query_key_idx on public.inspiration_cache (query_key);
create index if not exists inspiration_cache_fetched_at_idx on public.inspiration_cache (fetched_at desc);
create index if not exists inspiration_cache_category_idx on public.inspiration_cache (category);

-- ---------- saved inspirations ----------
create table if not exists public.saved_items (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  provider text not null,
  external_id text not null,
  inspiration_id uuid references public.inspiration_cache (id) on delete set null,
  title text,
  image_url text not null,
  source_url text,
  creator_name text,
  category text,
  tags text[] not null default '{}',
  metadata jsonb not null default '{}'::jsonb,
  saved_at timestamptz not null default now(),
  unique (user_id, provider, external_id)
);

create index if not exists saved_items_user_id_idx on public.saved_items (user_id);
create index if not exists saved_items_saved_at_idx on public.saved_items (saved_at desc);

-- ---------- board items ----------
create table if not exists public.board_items (
  id uuid primary key default gen_random_uuid(),
  board_id uuid not null references public.boards (id) on delete cascade,
  added_by uuid references public.profiles (id) on delete set null,
  provider text,
  external_id text,
  inspiration_id uuid references public.inspiration_cache (id) on delete set null,
  title text,
  image_url text,
  source_url text,
  note text default '',
  position integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists board_items_board_id_idx on public.board_items (board_id);
create index if not exists board_items_position_idx on public.board_items (board_id, position);

-- ---------- albums / events ----------
create table if not exists public.albums (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  name text not null,
  event_type text not null default 'Other',
  event_date date,
  venue text default '',
  location text default '',
  dance_form text default '',
  description text default '',
  cover_url text,
  privacy text not null default 'private' check (privacy in ('private','invite_only','public','unlisted')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists albums_owner_id_idx on public.albums (owner_id);
create index if not exists albums_created_at_idx on public.albums (created_at desc);

drop trigger if exists albums_set_updated_at on public.albums;
create trigger albums_set_updated_at
before update on public.albums
for each row execute function public.set_updated_at();

create table if not exists public.album_items (
  id uuid primary key default gen_random_uuid(),
  album_id uuid not null references public.albums (id) on delete cascade,
  uploaded_by uuid references public.profiles (id) on delete set null,
  media_type text not null check (media_type in ('image','video')),
  storage_path text not null,
  public_url text,
  title text default '',
  caption text default '',
  section text default 'on_stage',
  position integer not null default 0,
  created_at timestamptz not null default now()
);

create index if not exists album_items_album_id_idx on public.album_items (album_id);

-- ---------- choreography ----------
create table if not exists public.choreography (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  title text not null,
  description text default '',
  dance_form text default '',
  composition text default '',
  choreographer text default '',
  guru text default '',
  music text default '',
  difficulty text default '',
  duration_seconds integer,
  tags text[] not null default '{}',
  privacy text not null default 'private' check (privacy in ('private','unlisted','public')),
  allow_download boolean not null default false,
  storage_path text,
  public_url text,
  poster_url text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists choreography_owner_id_idx on public.choreography (owner_id);
create index if not exists choreography_created_at_idx on public.choreography (created_at desc);

drop trigger if exists choreography_set_updated_at on public.choreography;
create trigger choreography_set_updated_at
before update on public.choreography
for each row execute function public.set_updated_at();

-- ---------- practice ----------
create table if not exists public.practice_sessions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  choreography_id uuid not null references public.choreography (id) on delete cascade,
  started_at timestamptz not null default now(),
  ended_at timestamptz,
  duration_seconds integer default 0,
  last_position_seconds numeric(10,2) default 0,
  completion_percentage numeric(5,2) default 0,
  created_at timestamptz not null default now()
);

create index if not exists practice_sessions_user_id_idx on public.practice_sessions (user_id);
create index if not exists practice_sessions_choreography_id_idx on public.practice_sessions (choreography_id);

create table if not exists public.practice_notes (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  choreography_id uuid not null references public.choreography (id) on delete cascade,
  timestamp_seconds numeric(10,2) not null default 0,
  note text not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists practice_notes_user_video_idx on public.practice_notes (user_id, choreography_id);

drop trigger if exists practice_notes_set_updated_at on public.practice_notes;
create trigger practice_notes_set_updated_at
before update on public.practice_notes
for each row execute function public.set_updated_at();

-- ---------- collaborations ----------
create table if not exists public.collaborations (
  id uuid primary key default gen_random_uuid(),
  owner_id uuid not null references public.profiles (id) on delete cascade,
  collaborator_id uuid not null references public.profiles (id) on delete cascade,
  resource_type text not null check (resource_type in ('board','album','choreography')),
  resource_id uuid not null,
  role text not null default 'viewer' check (role in ('owner','editor','viewer')),
  status text not null default 'pending' check (status in ('pending','accepted','declined','revoked')),
  created_at timestamptz not null default now(),
  unique (collaborator_id, resource_type, resource_id)
);

create index if not exists collaborations_resource_idx on public.collaborations (resource_type, resource_id);
create index if not exists collaborations_collaborator_idx on public.collaborations (collaborator_id);

create or replace function public.is_collaborator(
  p_resource_type text,
  p_resource_id uuid,
  p_roles text[] default array['owner','editor','viewer']
)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.collaborations c
    where c.resource_type = p_resource_type
      and c.resource_id = p_resource_id
      and c.collaborator_id = auth.uid()
      and c.status = 'accepted'
      and c.role = any (p_roles)
  );
$$;

-- ---------- notifications ----------
create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  type text not null,
  title text not null,
  body text default '',
  href text,
  read_at timestamptz,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now()
);

create index if not exists notifications_user_id_idx on public.notifications (user_id, created_at desc);

-- ---------- search history (light personalization) ----------
create table if not exists public.search_history (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  query text not null,
  created_at timestamptz not null default now()
);

create index if not exists search_history_user_id_idx on public.search_history (user_id, created_at desc);

-- ============================================================
-- Row Level Security
-- ============================================================

alter table public.profiles enable row level security;
alter table public.boards enable row level security;
alter table public.board_items enable row level security;
alter table public.inspiration_cache enable row level security;
alter table public.saved_items enable row level security;
alter table public.albums enable row level security;
alter table public.album_items enable row level security;
alter table public.choreography enable row level security;
alter table public.practice_sessions enable row level security;
alter table public.practice_notes enable row level security;
alter table public.collaborations enable row level security;
alter table public.notifications enable row level security;
alter table public.search_history enable row level security;

-- profiles
drop policy if exists "profiles_select" on public.profiles;
create policy "profiles_select" on public.profiles
  for select using (
    id = auth.uid()
    or portfolio_public = true
  );

drop policy if exists "profiles_update_own" on public.profiles;
create policy "profiles_update_own" on public.profiles
  for update using (id = auth.uid())
  with check (id = auth.uid());

drop policy if exists "profiles_insert_own" on public.profiles;
create policy "profiles_insert_own" on public.profiles
  for insert with check (id = auth.uid());

-- boards
drop policy if exists "boards_select" on public.boards;
create policy "boards_select" on public.boards
  for select using (
    owner_id = auth.uid()
    or privacy = 'public'
    or public.is_collaborator('board', id)
  );

drop policy if exists "boards_insert" on public.boards;
create policy "boards_insert" on public.boards
  for insert with check (owner_id = auth.uid());

drop policy if exists "boards_update" on public.boards;
create policy "boards_update" on public.boards
  for update using (
    owner_id = auth.uid()
    or public.is_collaborator('board', id, array['owner','editor'])
  );

drop policy if exists "boards_delete" on public.boards;
create policy "boards_delete" on public.boards
  for delete using (owner_id = auth.uid());

-- board items
drop policy if exists "board_items_select" on public.board_items;
create policy "board_items_select" on public.board_items
  for select using (
    exists (
      select 1 from public.boards b
      where b.id = board_id
        and (
          b.owner_id = auth.uid()
          or b.privacy = 'public'
          or public.is_collaborator('board', b.id)
        )
    )
  );

drop policy if exists "board_items_mutate" on public.board_items;
create policy "board_items_mutate" on public.board_items
  for all using (
    exists (
      select 1 from public.boards b
      where b.id = board_id
        and (
          b.owner_id = auth.uid()
          or public.is_collaborator('board', b.id, array['owner','editor'])
        )
    )
  )
  with check (
    exists (
      select 1 from public.boards b
      where b.id = board_id
        and (
          b.owner_id = auth.uid()
          or public.is_collaborator('board', b.id, array['owner','editor'])
        )
    )
  );

-- inspiration cache: authenticated users can read; inserts via service or authenticated
drop policy if exists "inspiration_cache_select" on public.inspiration_cache;
create policy "inspiration_cache_select" on public.inspiration_cache
  for select to authenticated using (true);

drop policy if exists "inspiration_cache_insert" on public.inspiration_cache;
create policy "inspiration_cache_insert" on public.inspiration_cache
  for insert to authenticated with check (true);

-- saved items
drop policy if exists "saved_items_own" on public.saved_items;
create policy "saved_items_own" on public.saved_items
  for all using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- albums
drop policy if exists "albums_select" on public.albums;
create policy "albums_select" on public.albums
  for select using (
    owner_id = auth.uid()
    or privacy in ('public','unlisted')
    or public.is_collaborator('album', id)
  );

drop policy if exists "albums_insert" on public.albums;
create policy "albums_insert" on public.albums
  for insert with check (owner_id = auth.uid());

drop policy if exists "albums_update" on public.albums;
create policy "albums_update" on public.albums
  for update using (
    owner_id = auth.uid()
    or public.is_collaborator('album', id, array['owner','editor'])
  );

drop policy if exists "albums_delete" on public.albums;
create policy "albums_delete" on public.albums
  for delete using (owner_id = auth.uid());

-- album items
drop policy if exists "album_items_select" on public.album_items;
create policy "album_items_select" on public.album_items
  for select using (
    exists (
      select 1 from public.albums a
      where a.id = album_id
        and (
          a.owner_id = auth.uid()
          or a.privacy in ('public','unlisted')
          or public.is_collaborator('album', a.id)
        )
    )
  );

drop policy if exists "album_items_mutate" on public.album_items;
create policy "album_items_mutate" on public.album_items
  for all using (
    exists (
      select 1 from public.albums a
      where a.id = album_id
        and (
          a.owner_id = auth.uid()
          or public.is_collaborator('album', a.id, array['owner','editor'])
        )
    )
  )
  with check (
    exists (
      select 1 from public.albums a
      where a.id = album_id
        and (
          a.owner_id = auth.uid()
          or public.is_collaborator('album', a.id, array['owner','editor'])
        )
    )
  );

-- choreography
drop policy if exists "choreography_select" on public.choreography;
create policy "choreography_select" on public.choreography
  for select using (
    owner_id = auth.uid()
    or privacy in ('public','unlisted')
    or public.is_collaborator('choreography', id)
  );

drop policy if exists "choreography_insert" on public.choreography;
create policy "choreography_insert" on public.choreography
  for insert with check (owner_id = auth.uid());

drop policy if exists "choreography_update" on public.choreography;
create policy "choreography_update" on public.choreography
  for update using (
    owner_id = auth.uid()
    or public.is_collaborator('choreography', id, array['owner','editor'])
  );

drop policy if exists "choreography_delete" on public.choreography;
create policy "choreography_delete" on public.choreography
  for delete using (owner_id = auth.uid());

-- practice
drop policy if exists "practice_sessions_own" on public.practice_sessions;
create policy "practice_sessions_own" on public.practice_sessions
  for all using (user_id = auth.uid())
  with check (user_id = auth.uid());

drop policy if exists "practice_notes_own" on public.practice_notes;
create policy "practice_notes_own" on public.practice_notes
  for all using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- collaborations
drop policy if exists "collaborations_select" on public.collaborations;
create policy "collaborations_select" on public.collaborations
  for select using (owner_id = auth.uid() or collaborator_id = auth.uid());

drop policy if exists "collaborations_insert" on public.collaborations;
create policy "collaborations_insert" on public.collaborations
  for insert with check (owner_id = auth.uid());

drop policy if exists "collaborations_update" on public.collaborations;
create policy "collaborations_update" on public.collaborations
  for update using (owner_id = auth.uid() or collaborator_id = auth.uid());

-- notifications
drop policy if exists "notifications_own" on public.notifications;
create policy "notifications_own" on public.notifications
  for all using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- search history
drop policy if exists "search_history_own" on public.search_history;
create policy "search_history_own" on public.search_history
  for all using (user_id = auth.uid())
  with check (user_id = auth.uid());

-- ============================================================
-- Storage buckets (run once; policies for paths {user_id}/...)
-- ============================================================
-- insert into storage.buckets (id, name, public) values
--   ('avatars', 'avatars', true),
--   ('album-media', 'album-media', false),
--   ('choreography', 'choreography', false),
--   ('practice', 'practice', false)
-- on conflict (id) do nothing;
