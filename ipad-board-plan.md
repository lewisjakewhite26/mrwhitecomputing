# Live task: the build plan

This replaces the earlier buy-vs-build comparison. The decision's made —
recreate the mechanic inside the app, not license someone else's. What
follows is the actual design: what it's built from, in what order, and
how big each piece really is.

A UI-only prototype of both screens exists and is approved:
[Answer Wall](https://claude.ai/code/artifact/2ff8197b-b479-46aa-b451-927577d79137)
— pupil iPad view and teacher board view side by side, wired together
live in the browser, no backend behind it. Treat it as the visual
reference for the real build, not a separate design pass to redo.

## Decisions this plan locks in

**Submit-once, not live-stroke.** A pupil draws or types locally, hits
Send, their answer appears as a tile on the board. Nobody's watching a
pencil move stroke by stroke across the room's screen. This is the
Padlet model, not the Whiteboard.fi model, and it's the difference
between a weekend build and a multi-week one — no continuous socket
traffic, no per-frame bandwidth budget, no conflict handling, because
each pupil only ever writes to their own answer.

**Vanilla JS, no framework.** The whole app is one `index.html` file with
no build step. This feature stays that way: a `<canvas>` element,
`PointerEvent` handlers, and a module in the same style as `HB_DECK` —
not React, not Tailwind, not a package.json. Introducing a framework for
one feature breaks the thing that makes the rest of this file easy to
open and edit directly.

**Poll, don't socket, for v1.** School web filters (Smoothwall,
Lightspeed, and the like) sometimes throttle or inspect WebSocket
traffic; plain HTTPS requests rarely get special treatment. A submit-once
model doesn't need sub-second latency — a drawing landing on the board
two or three seconds after a pupil finishes it still reads as instant to
a room of children. So: pupils POST their answer once, the board view
re-fetches the room's answer list every two seconds and renders whatever's
new. No persistent connection to babysit, no reconnect-on-sleep logic, no
special handling for an iPad's Smart Cover cutting the network — a
dropped poll just tries again next tick.

**Supabase for the backend.** PartyKit was the original choice (still
described below in a couple of places kept for context) but its free
shared hosting domain hit a hard capacity limit on deploy day, with no
ETA to fix — a genuine outage on their end, not a code problem. Switched
to Supabase since an account already existed. The shape barely changes:
a `rooms` table and an `answers` table, with all writes going through a
handful of Postgres functions (`live_get_room`, `live_set_question`,
`live_submit_answer`, `live_hide_answer`, `live_clear_all`) called over
Supabase's auto-generated REST endpoint — plain `fetch`, no SDK. The
functions run as `security definer`, so Row Level Security stays "deny
everything" on the tables themselves and the teacher-token check happens
inside the functions instead. Same "POST an answer, GET this room's
answers" shape either way.

## Data model

Two tiny records, nothing else. No pupil accounts, no history beyond the
current room, nothing written that outlives the lesson.

```
Room:   { code: "PLUM-7", question: "...", mode: "gallery" | "cloud", createdAt }
Answer: { id, roomCode, kind: "text" | "drawing", content, ts }
```

`content` is either a plain string (text/word-cloud mode) or a small PNG
data URL (drawing mode) — no vector path storage needed for v1, since
nothing has to be re-rendered at a different resolution the way a
live-synced stroke would. A pupil's canvas already renders at whatever
size their iPad gives it; flatten it to an image once, on Send, and the
board just displays that image at whatever size the tile needs.

## The two views

**Pupil view**, opened by scanning the room's QR code (built exactly like
the existing one at `buildQR()` — same `QRCode(...)` call, bundled
offline, just pointing at `#/live/<code>` instead of `#/task/1`):

- the question, read from the room
- a textarea and a small canvas, pupil picks whichever fits the answer
- a proper drawing toolbar on the canvas, not just a pen — confirmed
  priority after the UI prototype: six colour swatches, three brush
  sizes, an eraser, and undo (a canvas snapshot pushed before each
  stroke, popped on undo — no server round-trip, purely a client-side
  history). One Clear-all still sits alongside it for starting over
  completely. Modelled loosely on onlineboard.eu's toolbar, not copied
  pixel for pixel.
- one Send button, disabled after one send so a pupil can't spam tiles
- no name field, ever

**Board view**, projected on the IWB, opened from the teacher's own
device at `#/board/<code>`:

- polls every 2 seconds, adds a tile for each new answer it hasn't seen
- tap a tile to enlarge it full-screen for the class to discuss — this
  is the one feature every tool researched has in some form (Nearpod
  calls it "broadcast," Whiteboard.fi calls it "spotlight"), and it's
  cheap: the tile's already rendered, enlarging it is a CSS transform
- a hide button on each tile, separate from Clear all — Padlet and
  Nearpod both let a teacher pull one bad submission without wiping
  the board, and TODO.md's original spec only had the wipe-everything
  version
- Clear all, for the end of the activity

## Build order

1. **Gallery + spotlight + hide.** Everything above. This is the whole
   feature for a "write or draw your answer" moment, and it's the
   version worth testing in a real lesson before anything else gets
   built.
2. **Word cloud mode**, as a second `mode` value on the same room and
   the same poll loop — no new backend concept, just a different render
   on the board side: tally word frequency across the text answers,
   size each word by count. This is the Mentimeter-style moment, built
   in rather than rented, and it doesn't touch the drawing canvas at
   all.
3. **Live-stroke sync**, later, only if a real lesson shows pupils want
   to watch a drawing appear rather than just see the result. This is
   the genuinely harder piece — continuous pointer events, throttled
   and batched, normalized coordinates so a portrait iPad canvas maps
   sensibly onto a widescreen board. Worth scoping properly if it's
   wanted, not worth building speculatively.
4. **Shared single canvas** (the FigJam idea — everyone drawing on one
   board together, not separate answers side by side). A genuinely
   different feature from the other three, needs real conflict handling
   the moment two pupils touch the same spot at once, and probably more
   chaos than most KS1/2 lessons want from thirty iPads at once. Filed
   as "maybe eventually," not part of this build.

## What's already reusable

The QR generation is done — `buildQR()` at `index.html:1737` already
builds an offline QR from a room-specific URL; the live task's QR is the
same function pointed at a different hash. The existing worksheet/task
routing (`#/y12/sheet/...`, the `route()` function) is the pattern to
follow for `#/live/<code>` and `#/board/<code>` — a new branch in the
same `if/else if` chain, not a new router. `PointerEvent` handling for
touch and Apple Pencil is standard and needs no library; `touch-action:
none` on the canvas container stops Safari treating a drawing gesture as
a scroll.

## Difficulty, correctly scoped

A weekend, solo, for the version in Build order step 1 — a QR, a room
code, a pupil view with a textarea and a canvas, a board that polls and
tiles, tap-to-enlarge, hide, clear. That matches the ~200-line estimate
already in `TODO.md`. Most of what makes a *live-stroke* version hard —
bandwidth throttling for continuous drawing, socket reconnection,
canvas-resolution normalization for real-time rendering across wildly
different screen sizes — doesn't apply here, because nothing streams
continuously and nothing needs re-rendering at a different resolution
than the one it was drawn at.

What's still worth testing before trusting this in front of a class,
even at this scope: whether the school's wifi and web filter are happy
with plain POST/GET traffic to Supabase (should be fine — it's ordinary
HTTPS, not a websocket a filter might flag), and whether iPads on the
school's actual network can reach Supabase at all if there's a
restrictive allowlist. Both are five-minute checks on a real school
iPad, not engineering risk.

## Decided

- **Room lifetime: two small Postgres tables, never queried outside a
  room's own code.** Supabase replaced PartyKit's in-memory Durable
  Object with an actual `rooms` row and its `answers` rows — a real
  disk-backed table, not memory. Nothing auto-deletes a room when the
  teacher closes the tab, same as the original PartyKit design; unlike
  PartyKit there's also no automatic idle eviction, so a stale room's
  rows just sit there until something explicitly clears them. Worth a
  periodic manual clear-out in the Supabase table view, or a small
  scheduled cleanup query later, if this runs for a full term. Not
  urgent at classroom scale — a few dozen rows a day is nothing.
- **Moderation: after-the-fact hide, not pre-approval.** Vetting 30
  submissions one by one before they're visible stalls the lesson.
  New answers land on the board immediately; the hide button pulls one
  back if it needs pulling. Fine for a primary classroom, not fine if
  this ever needed to run genuinely unsupervised.
- **No wifi, or Supabase unreachable:** silent retry on the board (a
  failed poll just tries again in two seconds, no error overlay
  interrupting the class), sticky feedback on the pupil side (a failed
  Send re-enables the button and says plainly that it didn't go through
  — a pupil should never be left wondering).

## Implementation review

A first pass at the actual code turned up one mistake worth catching
before it's anywhere near `index.html`, plus some real gaps.

**The routing has to be a branch inside the existing `route()`, not a
replacement for it.** Hub's router (`index.html:1137`) already toggles a
`views` object of pre-existing `<section>` elements — `view-picker`,
`view-hub`, `view-deck`, and so on — inside one function with its own
`lastRoute`/`selfHash` guards and a try/catch that falls back to the
picker on error. A version of this feature that defines its own
`route()` rendering into a generic `document.getElementById("app")`
would replace that function outright and silently kill every other page
in the app. The fix is two new sections (`view-live`, `view-board`)
added to the HTML and the `views` object, and two new `else if`
branches inside the real `route()` — everything else about it (the
guards, the fallback, the toggle loop) is reused for free.

**Nothing sets the room's question.** The pupil view reads it with a
`GET`; nothing anywhere calls the matching `set-question`. That has to
happen once, when the teacher opens the board for a room that doesn't
have a question yet — pulling from whatever prompt the current slide
already carries (`taskH1`/`taskIntro` on the lesson's `UNITS` entry) is
the natural source, rather than making the teacher retype it.

**No "this room doesn't exist" state.** A stale or mistyped code
currently falls through to the same "write or draw your answer" prompt
as a working room. Given rooms are meant to be single-lesson and
short-lived, a pupil hitting an expired one needs to be told that
plainly, not left assuming it's working.

**`clear-all` and `hide-answer` need the teacher token.** This is now
enforced inside Postgres itself, not just in client code: `live_hide_answer`
and `live_clear_all` check the stored `teacher_token` before touching a
row, and Row Level Security denies the `answers`/`rooms` tables to the
public API entirely — the only door in is those `security definer`
functions. So even someone reading the anon key straight out of the
page's source can't bypass the check by hitting the tables directly.

**Styling needs to become hub's, not generic.** A first pass came back
in ad hoc hex colours and system sans-serif — functional, but visually
foreign next to the rest of the deck. Before this ships it should pull
from the same custom properties everything else in `index.html` already
uses (`--proc`, `--paper`, `--ink`, the existing border-radius and
shadow scale), not introduce a second visual language.

**The schema has to actually be run once.** `_supabase/schema.sql` isn't
applied automatically — it has to be pasted into the Supabase project's
SQL editor and run by hand the first time a project exists, same kind of
easy-to-forget step the old `partykit.json` manifest was.

**Worth keeping regardless:** the pre-flight check — open Safari on an
actual school iPad, on the school's pupil wifi, and hit the Supabase URL
directly before writing another line of code. A content-filter block or
a DNS failure there is a five-minute finding; the same problem
discovered mid-lesson in front of a class is not.

## Wiring it up, step by step

Everything above is design. This is the sequence for actually connecting
the two views to a real backend next session — plan only, no code yet.

### 1. Room codes: how one gets made, and by whom

The teacher's device makes the code, client-side, the moment they start
a live task — there's no "create room" call to PartyKit at all. A
PartyKit room is addressed by whatever string sits in its URL and comes
into existence the first time anything hits that URL, so the code itself
*is* the room; nothing has to register it first.

Format: five characters, uppercase, drawn from a set with the
easily-confused ones removed (`0/O`, `1/I/L`) — `ABCDEFGHJKMNPQRSTUVWXYZ23456789`.
Plain `Math.random()` is fine; nothing about this needs to be
unguessable, only short enough to read off a projector and type once.

### 2. Telling the two roles apart: the teacher-token

The gap flagged in the implementation review — anyone with the room code
can clear the board — gets closed with one extra value, not a login
system. When the teacher starts a live task, the client generates a
second, longer random string (a token) alongside the room code. That
token travels only in the teacher's own board URL
(`#/board/<code>/<token>`), never in the QR pupils scan
(`#/live/<code>` only carries the code). The very first `set-question`
call a room receives stores whatever token came with it as that room's
`teacherToken`, permanently, for the room's lifetime. Every later call to
`set-question`, `hide-answer`, or `clear-all` must include a token that
matches, or the server rejects it. `submit-answer` needs no token —
that's the one action a pupil is supposed to be able to take, by design.

This means a stray or malicious guess of a five-character room code can,
at worst, add a submission to a board — it can't wipe one, because
wiping needs a token nobody but the teacher's own device ever saw.

### 3. The API, finalised

Rewritten for Supabase after the PartyKit deploy hit a capacity wall on
their shared domain (see the top of this file). Same four actions, now
Postgres functions called over Supabase's REST RPC endpoint
(`POST /rest/v1/rpc/<function>` with the args as a JSON body) rather than
one `onRequest` handler — `_supabase/schema.sql` has the real SQL.

```
live_get_room(p_code)
     -> rows of { question, id, kind, content, ts }, one per non-hidden
        answer (or one row with null answer fields if there are none yet);
        zero rows means the room was never started

live_set_question(p_code, p_token, p_question)
     -> first call for a room stores p_token, returns true
     -> later calls must match the stored token, else returns false

live_submit_answer(p_code, p_kind, p_content)
     -> no token needed; appends, returns the new answer's id

live_hide_answer(p_code, p_token, p_id)
     -> token must match; marks that answer hidden (not deleted, just
        filtered out of live_get_room, in case "undo the hide" is ever wanted)

live_clear_all(p_code, p_token)
     -> token must match; deletes the room's answers
```

The token check happens inside the SQL functions themselves, and Row
Level Security denies the underlying tables to everyone else — so this
is actually a stronger guarantee than the PartyKit draft had, not just a
like-for-like swap.

### 4. Where "start a live task" actually lives in the deck — done

Built as planned: a button next to the existing QR box (`buildQR()`,
`index.html`), "Start live answer wall." One judgement call — the current
QR box only exists on the Year 5/6 bespoke deck's task slide, and that
unit doesn't carry `taskH1`/`taskIntro` fields the way the Year 1-4
`HB_DECK` unit data does, so the question text is read straight from
that slide's own rendered `#view-task h1` / `.task-card p` DOM instead,
falling back to "What do you think?" if it's ever missing. Generates a
code and a token, stores both in `sessionStorage`, sends `set-question`,
repoints the QR at `#/live/<code>`, and opens the teacher's own board at
`#/board/<code>/<token>` in a new tab (so starting a live task never
loses the teacher's place in the deck they were on).

### 5. Client-side wiring — done

Two new `<section>` elements (`view-live`, `view-board`), registered in
the `views` object, two new branches inside the real `route()` — not a
competing router. A new `HB_LIVE` module owns `renderPupilView`,
`renderBoardView`, and `cleanup()`, exactly as specced: pupil view shows
a plain "this room isn't active" message when `live_get_room` comes back
with no question; board view polls every two seconds, diffs by answer
`id` against a `Set`, wipes local tiles if the answers array comes back
empty while the known-set isn't; `cleanup()` clears the poll interval
and runs as the literal first line of `route()`. The drawing canvas
reuses the existing whiteboard's stroke-array-plus-full-redraw approach
(`wbData`/`wbCol`-style) rather than inventing a second drawing engine.

### 6. Deployment

Supabase, not PartyKit — see the top of this file for why. Steps:

1. Create a Supabase project (free tier) from the account that already
   exists — takes about a minute, no card needed.
2. Open the project's SQL editor, paste in the whole of
   `_supabase/schema.sql`, and run it once. Safe to re-run later if the
   schema ever changes, since every statement is create-or-replace.
3. From Project Settings -> API, copy the Project URL and the `anon`
   `public` key — these are meant to be public, they're what every
   Supabase web app ships in its client-side code; the actual security
   is the Row Level Security + `security definer` functions in the
   schema, not keeping this key secret.
4. Paste those two values into `SUPABASE_URL` and `SUPABASE_ANON_KEY` at
   the top of the `HB_LIVE` module in `index.html`.

Free tier limits are not a real concern at this scale — a handful of
rooms a day, a few dozen requests each, is nowhere near what would need
a paid plan.

### 7. Testing order, before this is in front of a class

1. With the two Supabase values filled in, open `index.html` in two
   browser tabs on the same laptop — cheapest possible way to catch a
   wiring mistake before a second device is involved at all. Confirm a
   mismatched teacher token genuinely gets rejected (try hitting
   `live_hide_answer` or `live_clear_all` with the wrong token) — this is
   the one part of the whole feature with a real security property to
   verify, worth checking on purpose rather than assuming the code does
   what it says.
2. The pre-flight check from the section above: an actual school iPad,
   on the school's pupil wifi, hitting the Supabase project's URL
   directly in Safari.
3. A small pilot — a handful of pupils, not a full class — before
   trusting it in front of thirty children at once.
