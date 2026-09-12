# Live task: the build plan

This replaces the earlier buy-vs-build comparison. The decision's made —
recreate the mechanic inside the app, not license someone else's. What
follows is the actual design: what it's built from, in what order, and
how big each piece really is.

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

**PartyKit for the backend**, per the original plan already in
`TODO.md`. It's a small hosted key-value store with a generous free tier
and no server to run yourself — a room is just a namespaced bucket of
answers, which fits the polling model above with almost no backend code.
Firebase's Realtime Database over its plain REST API is the fallback if
PartyKit's free tier ever gets tight; either works with the design below
unchanged, since the pupil and board views only ever see "POST an answer"
and "GET this room's answers."

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
with plain POST/GET traffic to PartyKit (should be fine — it's ordinary
HTTPS, not a websocket a filter might flag), and whether iPads on the
school's actual network can reach PartyKit at all if there's a
restrictive allowlist. Both are five-minute checks on a real school
iPad, not engineering risk.

## Open questions worth deciding before building

- **Room lifetime.** A code per lesson, wiped after — matches the
  original plan and needs no persistence beyond the current session.
- **Moderation before display, or after.** Padlet can vet a post before
  it's public; this plan's hide button is after-the-fact instead, which
  is simpler and probably fine for a primary classroom, but worth a
  deliberate choice rather than a default.
- **What happens with no wifi.** The rest of the app works offline by
  design; this feature is the one exception. Worth deciding what the
  pupil and board views show if PartyKit's unreachable — a plain error,
  or a graceful "try again" — rather than a raw failed fetch.
