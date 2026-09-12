# To do

## Live "answer the question" task (Route B, cloud room)

Pupils scan the QR on the slide, a question opens on their iPad, they type or
draw an answer and send it. Answers tile onto the teacher's board view in real
time.

**Backend:** a hosted realtime room. PartyKit or Firebase Realtime Database,
free tier. A fresh random room code per lesson.

**Pupil view** `#/live/<room>`:
- question text at the top
- a textarea and a drawing canvas, pupil picks either
- one Send button
- drawing compresses to a JPEG data URL (~30KB) before sending
- no name field

**Board view** `#/board/<room>`:
- answers appear as tiles as they land
- tap a tile to enlarge it
- a Clear all button

**QR:** reuse the box already on the deck. Add a "live task" mode that encodes
the room URL instead of `#/task/1`.

**Data protection:** answers stay anonymous, room wiped at lesson end. The
school will ask about this before it goes near real pupils.

**Trade-off:** this is the first thing in the app that needs the internet and a
third-party service. The rest of the file runs fully offline. Keep the live task
self-contained enough that the deck still works with it switched off.

Rough size: ~200 lines in `index.html` plus the room code on PartyKit.

## Also outstanding

- **QR code needs a real host.** It builds its URL from `location.origin`, so it
  only works once `index.html` is served from a real address. Opening the file
  directly breaks the iPad hand-off.
- **Lessons 3 to 6** for all three units. Lessons 1 and 2 are built. Source packs
  live one level up in `..\KS1\`, `..\LKS2\`, `..\UKS2\` (siblings of `hub\`).
  `..\UKS2\` has zipped source packs for all six Year 5/6 lessons (L1-L6), so a
  real pack exists for L2 too — Lesson 2 was written from the NCCE unit outline
  instead because that pack hadn't been unzipped/checked at the time. Worth
  re-checking L2 against the real pack before writing L3-6. `hub\_src\L1\` only
  has the unzipped Lesson 1 pack; L2-L6 for UKS2 still need unzipping.
- **Two engines for Year 5/6.** Lesson 1 runs on the original bespoke deck
  (`#/lesson/1`, the `initDeck` code). Lesson 2 onward runs on the shared kid-deck
  factory (`HB_DECK`, `#/y56/lesson/2`). They look slightly different. Either port
  Lesson 1 onto the factory, or leave it, but know the split is there.
- **Year 5/6 deck chrome** (Lesson 1 only) still uses hand-drawn inline SVG rather
  than Phosphor. Fine as is.
- **Year 1/2 "click and drag" slide** is an auto-playing animation, not a real
  drag. A pointer-drag version would be better for the mouse-skills objective.
