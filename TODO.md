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

- **Fix the shit timeline on Lesson 4 of Year 5/6.** The "brief history of the
  web" slide (`#/y56/lesson/4`, second content slide, `Y56_SLIDES4` in
  `index.html`, class prefix `d2-tl-`). Three attempts this session, all
  rejected by the user as not matching the reference
  (dropship.io/about's timeline) and looking bad in the browser. Don't
  guess again from a fetched HTML dump — get an actual screenshot or live
  look at both the reference and the current render before touching this,
  or ask the user to describe exactly what's wrong with a screenshot in
  hand.
- **QR code needs a real host.** It builds its URL from `location.origin`, so it
  only works once `index.html` is served from a real address. Opening the file
  directly breaks the iPad hand-off.
- ~~Lessons 3 to 6 for all three units~~ — done. All 18 lessons (KS1, LKS2,
  UKS2, Lessons 1-6 each) are now built and live, matching the real NCCE
  source packs unzipped into `..\KS1\L*_src\`, `..\LKS2\L*_src\`,
  `..\UKS2\L*_src\` (siblings of `hub\`, git-ignored by the source repo since
  they sit outside it). Extracted text dumps are kept in
  `hub\_tools\dumps\*.txt` for reference; `hub\_tools\extract-office-text.js`
  and `dump-lesson.sh` can regenerate them from any future NCCE pack update.
  Lesson 2 for each unit was left as originally built (not re-checked against
  the real pack) since it was already live before this pass.
- **Two engines for Year 5/6.** Lesson 1 runs on the original bespoke deck
  (`#/lesson/1`, the `initDeck` code). Lesson 2 onward runs on the shared kid-deck
  factory (`HB_DECK`, `#/y56/lesson/2`). They look slightly different. Either port
  Lesson 1 onto the factory, or leave it, but know the split is there.
- **Year 5/6 deck chrome** (Lesson 1 only) still uses hand-drawn inline SVG rather
  than Phosphor. Fine as is.
- **Year 1/2 "click and drag" slide** is an auto-playing animation, not a real
  drag. A pointer-drag version would be better for the mouse-skills objective.
