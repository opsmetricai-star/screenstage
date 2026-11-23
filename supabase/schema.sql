-- ScreenStage schema. Run in the Supabase SQL editor.
create extension if not exists "pgcrypto";

create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text,
  company text,
  plan text not null default 'free' check (plan in ('free','starter','growth','scale')),
  credits_total int not null default 5,
  credits_used int not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists public.roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text not null default '',
  status text not null default 'open' check (status in ('open','closed')),
  created_at timestamptz not null default now()
);

create table if not exists public.interviews (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role_id uuid references public.roles(id) on delete set null,
  title text not null,
  script jsonb not null,           -- {intro, questions:[{text, competency, rubric:[...]}]}
  share_token text unique not null default encode(gen_random_bytes(12),'hex'),
  created_at timestamptz not null default now()
);

create table if not exists public.candidates (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  role_id uuid references public.roles(id) on delete set null,
  name text not null,
  email text not null,
  stage text not null default 'applied' check (stage in ('applied','screened','assessed','interview','offer','rejected')),
  score numeric,
  created_at timestamptz not null default now()
);

create table if not exists public.responses (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  interview_id uuid not null references public.interviews(id) on delete cascade,
  candidate_id uuid references public.candidates(id) on delete cascade,
  answers jsonb not null,          -- [{question, answer}]
  evaluation jsonb,                -- AI structured scoring
  overall_score numeric,
  created_at timestamptz not null default now()
);

create table if not exists public.assessments (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  items jsonb not null,            -- [{prompt, options:[..], answer_index, competency}]
  created_at timestamptz not null default now()
);

create table if not exists public.assessment_results (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  assessment_id uuid not null references public.assessments(id) on delete cascade,
  candidate_id uuid references public.candidates(id) on delete set null,
  picks jsonb not null,
  score numeric not null,          -- deterministic percentage
  created_at timestamptz not null default now()
);

create table if not exists public.usage_events (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  kind text not null,
  credits int not null default 1,
  created_at timestamptz not null default now()
);

create table if not exists public.subscriptions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  plan text not null check (plan in ('starter','growth','scale')),
  status text not null default 'active',
  reference text unique,           -- payment reference from the provider
  created_at timestamptz not null default now()
);

create table if not exists public.demo_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null, email text not null, company text, size text, message text,
  created_at timestamptz not null default now()
);

create table if not exists public.notifications (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  body text not null, read boolean not null default false,
  created_at timestamptz not null default now()
);

-- Row Level Security
alter table public.profiles enable row level security;
alter table public.roles enable row level security;
alter table public.interviews enable row level security;
alter table public.candidates enable row level security;
alter table public.responses enable row level security;
alter table public.assessments enable row level security;
alter table public.assessment_results enable row level security;
alter table public.usage_events enable row level security;
alter table public.subscriptions enable row level security;
alter table public.demo_requests enable row level security;
alter table public.notifications enable row level security;

create policy "own profile read" on public.profiles for select using (auth.uid() = id);
create policy "own profile update" on public.profiles for update using (auth.uid() = id)
  with check (auth.uid() = id and plan = (select plan from public.profiles where id = auth.uid())
              and credits_total = (select credits_total from public.profiles where id = auth.uid())
              and credits_used = (select credits_used from public.profiles where id = auth.uid()));

do $$ declare t text; begin
  foreach t in array array['roles','interviews','candidates','responses','assessments','assessment_results','notifications'] loop
    execute format('create policy "own rows select" on public.%I for select using (auth.uid() = user_id)', t);
    execute format('create policy "own rows insert" on public.%I for insert with check (auth.uid() = user_id)', t);
    execute format('create policy "own rows update" on public.%I for update using (auth.uid() = user_id)', t);
    execute format('create policy "own rows delete" on public.%I for delete using (auth.uid() = user_id)', t);
  end loop;
end $$;

create policy "own usage read" on public.usage_events for select using (auth.uid() = user_id);
create policy "own subscriptions read" on public.subscriptions for select using (auth.uid() = user_id);
-- usage_events / subscriptions are written only by server code with the service role.
-- demo_requests: no public policies; inserted via the server route with the service role.

-- Create a profile on sign-up
create or replace function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, full_name, company)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'company');
  return new;
end $$;
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created after insert on auth.users for each row execute function public.handle_new_user();

-- Atomic credit spend, callable only by server code (service role)
create or replace function public.spend_credit(p_user uuid, p_kind text, p_n int default 1) returns boolean
language plpgsql security definer set search_path = public as $$
declare ok boolean;
begin
  update public.profiles set credits_used = credits_used + p_n
   where id = p_user and credits_used + p_n <= credits_total returning true into ok;
  if ok then insert into public.usage_events(user_id, kind, credits) values (p_user, p_kind, p_n); end if;
  return coalesce(ok, false);
end $$;
revoke all on function public.spend_credit(uuid, text, int) from public, anon, authenticated;
