-- 1. Create function
create or replace function public.handle_new_user()
returns trigger as $$
begin
  if not exists (select 1 from public.profiles where email = new.email) then
    insert into public.profiles (id, email, created_at, is_paid)
    values (new.id, new.email, now(), false);
  end if;
  return new;
end;
$$ language plpgsql
security definer;

-- 2. Attach trigger to auth.users table
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();
