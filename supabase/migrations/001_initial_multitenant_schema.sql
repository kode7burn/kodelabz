create table public.organizations (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  created_at timestamptz not null default now()
);

create table public.organization_members (
  organization_id uuid references public.organizations(id) on delete cascade,
  user_id uuid not null,
  role text not null check (role in ('owner','admin','editor','viewer')),
  created_at timestamptz not null default now(),
  primary key (organization_id, user_id)
);

create table public.projects (
  id uuid primary key default gen_random_uuid(),
  organization_id uuid not null references public.organizations(id) on delete cascade,
  name text not null,
  canvas jsonb not null default '{"nodes":[],"edges":[]}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.organizations enable row level security;
alter table public.organization_members enable row level security;
alter table public.projects enable row level security;

create policy "members can read organizations" on public.organizations
for select using (exists (select 1 from public.organization_members m where m.organization_id = id and m.user_id = auth.uid()));

create policy "members can read membership" on public.organization_members
for select using (user_id = auth.uid() or exists (select 1 from public.organization_members m where m.organization_id = organization_members.organization_id and m.user_id = auth.uid()));

create policy "members can read projects" on public.projects
for select using (exists (select 1 from public.organization_members m where m.organization_id = projects.organization_id and m.user_id = auth.uid()));

create policy "editors can manage projects" on public.projects
for all using (exists (select 1 from public.organization_members m where m.organization_id = projects.organization_id and m.user_id = auth.uid() and m.role in ('owner','admin','editor')))
with check (exists (select 1 from public.organization_members m where m.organization_id = projects.organization_id and m.user_id = auth.uid() and m.role in ('owner','admin','editor')));
