create table if not exists public.budget_data (
  user_id uuid primary key references auth.users(id) on delete cascade,
  data jsonb not null default '{}'::jsonb,
  updated_at timestamptz not null default now()
);

alter table public.budget_data enable row level security;

drop policy if exists "Read own budget" on public.budget_data;
drop policy if exists "Insert own budget" on public.budget_data;
drop policy if exists "Update own budget" on public.budget_data;
drop policy if exists "Delete own budget" on public.budget_data;

create policy "Read own budget" on public.budget_data
  for select to authenticated using ((select auth.uid()) = user_id);
create policy "Insert own budget" on public.budget_data
  for insert to authenticated with check ((select auth.uid()) = user_id);
create policy "Update own budget" on public.budget_data
  for update to authenticated using ((select auth.uid()) = user_id)
  with check ((select auth.uid()) = user_id);
create policy "Delete own budget" on public.budget_data
  for delete to authenticated using ((select auth.uid()) = user_id);

revoke all on table public.budget_data from anon;
grant select, insert, update, delete on table public.budget_data to authenticated;
