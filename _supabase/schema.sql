-- Live answer wall: run this whole file once in Supabase's SQL editor
-- (Project -> SQL Editor -> New query -> paste -> Run) after creating the
-- project. Safe to re-run: every statement is create-or-replace / if-not-exists
-- / add-column-if-not-exists, so re-running after a schema update is fine too.

create table if not exists live_rooms (
  code text primary key,
  teacher_token text not null,
  question text not null default '',
  round int not null default 1,
  created_at timestamptz not null default now()
);
alter table live_rooms add column if not exists round int not null default 1;

create table if not exists live_answers (
  id uuid primary key default gen_random_uuid(),
  room_code text not null references live_rooms(code) on delete cascade,
  kind text not null check (kind in ('text','drawing')),
  content text not null,
  round int not null default 1,
  hidden boolean not null default false,
  created_at timestamptz not null default now()
);
alter table live_answers add column if not exists round int not null default 1;

-- one row per distinct pupil DEVICE that has ever opened this room (not per
-- round -- this is a whole-session headcount, like a classroom roster, not a
-- per-question count). pupil_id is a random id the client generates once and
-- keeps in sessionStorage, so refreshing the same pupil's page doesn't inflate
-- the count. No teacher_token needed to write here, same as submit-answer --
-- announcing "I'm here" is the one thing every pupil is allowed to do.
create table if not exists live_presence (
  room_code text not null references live_rooms(code) on delete cascade,
  pupil_id text not null,
  joined_at timestamptz not null default now(),
  primary key (room_code, pupil_id)
);

-- RLS is on with no policies on any of these tables, so the anon key used by
-- the pupil/board pages can never read or write them directly. Every action
-- goes through one of the "security definer" functions below, which run with
-- elevated rights and do their own checks (the teacher_token match) before
-- touching a row. This is what makes hide/clear/set-question safe against
-- anyone who only has the room code, not the teacher's token.
alter table live_rooms enable row level security;
alter table live_answers enable row level security;
alter table live_presence enable row level security;

-- GET: the question, the room's current round, a live join headcount, and
-- every non-hidden answer FROM THAT ROUND ONLY (older rounds' answers stay in
-- the table, just filtered out here, so a teacher moving on to task 2 doesn't
-- need to Clear All first -- the board naturally only shows the current
-- task's answers). One row per answer, or one row with null answer fields if
-- the round has none yet. No rows at all means the room was never started ->
-- client treats that as "not active".
drop function if exists live_get_room(text);
create or replace function live_get_room(p_code text)
returns table(question text, round int, joined int, id uuid, kind text, content text, ts bigint)
language sql security definer set search_path = public as $$
  select r.question, r.round,
         (select count(*)::int from live_presence p where p.room_code = r.code) as joined,
         a.id, a.kind, a.content,
         (extract(epoch from a.created_at) * 1000)::bigint as ts
  from live_rooms r
  left join live_answers a on a.room_code = r.code and a.hidden = false and a.round = r.round
  where r.code = p_code;
$$;

-- no token required, same reasoning as submit-answer. Idempotent: a pupil
-- reopening the same room (same pupil_id from their own sessionStorage) just
-- no-ops rather than double-counting. Returns nothing meaningful; the board
-- picks up the new count on its next live_get_room poll, no need to call
-- this from the board side at all.
create or replace function live_mark_joined(p_code text, p_pupil_id text)
returns boolean
language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from live_rooms where code = p_code) then
    return false;
  end if;
  insert into live_presence(room_code, pupil_id) values (p_code, p_pupil_id)
    on conflict (room_code, pupil_id) do nothing;
  return true;
end;
$$;

-- first call for a room claims the teacher token and starts round 1; every
-- later call must match that token, and bumps the round -- this is what
-- "unlock the next task" is, on the same room/QR code, no re-scan needed.
create or replace function live_set_question(p_code text, p_token text, p_question text)
returns boolean
language plpgsql security definer set search_path = public as $$
declare existing text;
begin
  select teacher_token into existing from live_rooms where code = p_code;
  if existing is null then
    insert into live_rooms(code, teacher_token, question, round) values (p_code, p_token, p_question, 1);
    return true;
  elsif existing = p_token then
    update live_rooms set question = p_question, round = round + 1 where code = p_code;
    return true;
  else
    return false;
  end if;
end;
$$;

-- no token required: this is the one action a pupil is meant to take.
-- stamped with the room's CURRENT round at the moment of submission, so a
-- late answer to an already-superseded task doesn't show up under the new one.
create or replace function live_submit_answer(p_code text, p_kind text, p_content text)
returns uuid
language plpgsql security definer set search_path = public as $$
declare new_id uuid; room_round int;
begin
  select round into room_round from live_rooms where code = p_code;
  if room_round is null then
    return null;
  end if;
  insert into live_answers(room_code, kind, content, round) values (p_code, p_kind, p_content, room_round)
    returning id into new_id;
  return new_id;
end;
$$;

create or replace function live_hide_answer(p_code text, p_token text, p_id uuid)
returns boolean
language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from live_rooms where code = p_code and teacher_token = p_token) then
    return false;
  end if;
  update live_answers set hidden = true where id = p_id and room_code = p_code;
  return true;
end;
$$;

-- deliberately wipes ALL rounds' answers, not just the current one -- this
-- stays the "hard reset the whole board" action; moving to the next task
-- without wiping history is what live_set_question's round-bump is for.
create or replace function live_clear_all(p_code text, p_token text)
returns boolean
language plpgsql security definer set search_path = public as $$
begin
  if not exists (select 1 from live_rooms where code = p_code and teacher_token = p_token) then
    return false;
  end if;
  delete from live_answers where room_code = p_code;
  return true;
end;
$$;

grant execute on function live_get_room(text) to anon;
grant execute on function live_set_question(text, text, text) to anon;
grant execute on function live_submit_answer(text, text, text) to anon;
grant execute on function live_hide_answer(text, text, uuid) to anon;
grant execute on function live_clear_all(text, text) to anon;
grant execute on function live_mark_joined(text, text) to anon;
