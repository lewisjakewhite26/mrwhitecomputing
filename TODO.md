# To do

## Live "answer the question" task — built and wired up

Built: pupil view (`#/live/<room>`), board view (`#/board/<room>`), room
codes with a teacher-only token, the drawing canvas with the full
onlineboard.eu-style toolbar (colour swatches, brush sizes, eraser, undo),
QR "start a live task" hand-off, and the Supabase backend — schema applied,
real project URL and anon key are live in `index.html`'s `HB_LIVE` module
(`SUPABASE_URL`/`SUPABASE_ANON_KEY`). See `ipad-board-plan.md` for the
original design and `_supabase/schema.sql` for the tables/functions.

Also now reachable from the deck toolbar itself, not just the pre-authored
task page: an "ask a question" button on every lesson using the shared
factory engine starts a room from any slide, any time, no planning ahead
needed. `HB_LIVE.askQuestion()` does the work; the toolbar popover is just
a text box and a Start button, then a QR code and room code come straight
back. See the toolbar timer entry below, built the same session.

**What's actually left:**
- Test on a real iPad against a real board, not just two browser tabs —
  `ipad-board-plan.md` step 7 has the test script.
- Blocked by the same QR/hosting issue below: `location.origin` needs
  `index.html` served from a real address before the iPad hand-off works
  at all, live task included.
- Data protection: answers stay anonymous and the room wipes at lesson
  end, but the school hasn't signed off on this yet. Ask before it goes
  near real pupils.
- `enrichment-research.md` found the live answer wall doesn't suit KS1 as
  built. Use a single-tap emoji/traffic-light response instead (reusing
  the same backend), or Plickers, for that age group.
- The toolbar's "ask a question" button only exists on the shared factory
  engine (17 of 18 lessons). Y5/6 Lesson 1's old bespoke deck doesn't have
  it, same engine split noted below.

## Also outstanding

- **NEXT: Year 3/4 scenario picker.** Agreed 23/09/2026, not yet built.
  Four cards, each an offline system a digital invention could improve:
  dinner bands counted by hand at registration, lights left on at
  playtime, the paper-card library, the watering rota in the school
  garden. A pair picks one, then builds the invention on the machine
  builder from Lesson 2, so the tool already exists. Needs two additions
  to the builder: several inputs or outputs, and a way to name the
  machine.

  This carries four of the six Year 3/4 end points for the unit, which
  the machine builder alone does not: Y3 "recognise how digital devices
  can change the way we work", and all three Y4 network ones. See
  `end-points.md`.

  **Placement is undecided.** Lewis has not settled where it goes, and
  the Lesson 3 to 6 progression is being rebuilt, so build it as a
  self-contained slide that works wherever it lands. The per-lesson
  project slides and the network drawing stay deferred until the order
  settles.

- **Mr Whiteflix needs three photos of Lewis.** Mr Whiteflix is its own
  app now, `whiteflix.html`, opened from Year 5/6 Lessons 5 and 6 the way
  Quick Click is opened from Year 1/2. The three Mr White programmes
  (marking books, the photocopier, the whiteboard pens) run on drawn
  posters until real photos exist. Each photo goes into `WF_IMG` at the
  bottom of that file under the programme's id (`mark`, `photo`, `pens`)
  as a 16:9 WebP, about 1024 by 576, and the poster steps aside on its own.
  The start-up sound and the full screen on the power button have only
  been checked in a test browser, never on the board itself.

- **Year 1/2 unit rework.** Lessons 3 and 4 are rebuilt around the
  no-devices constraint and are now internally coherent, but the unit
  itself is thin: it teaches operating instructions rather than computing,
  and nothing in it has a purpose. See `y12-roadmap.md` for the diagnosis,
  the proposed reframe around instructing and debugging, and the open
  decisions (saving and loading, reordering, the drawing tool). Lesson 5 is
  untouched and its dependency on Lesson 4's saved file is currently
  broken.

- **Pedagogy pass.** Every lesson now has at least one checked, hands-on
  activity — that gap is closed. What's still open, from
  `pedagogy-audit.md`: no lesson has a mid-lesson check (only end-of-lesson
  quiz + confidence slider), and the spot-the-mistake component
  (`spotY12`/`spotY34`/`spotY56`) is only used in 3 of 18 lessons so far
  (Y1/2 L1, Y3/4 L1, Y5/6 L6) — it's built and ready to reuse in the other
  15, that's a content task now, not an engineering one. The visible-
  time-signal gap is effectively closed by the toolbar timer below (any
  activity slide can now get a countdown on demand, teacher's choice, not
  baked into specific slides) — but nobody's actually run a "speed round"
  mid-lesson check with it yet, that's still a content/delivery idea, not
  a built slide.
- **QR code needs a real host.** It builds its URL from `location.origin`, so it
  only works once `index.html` is served from a real address. Opening the file
  directly breaks the iPad hand-off — this also blocks testing the live task above.
- **Two engines for Year 5/6.** Lesson 1 still runs on the original bespoke deck
  (`#/lesson/1`, the `initDeck` code); Lesson 2 onward runs on the shared kid-deck
  factory (`HB_DECK`, `#/y56/lesson/2`). Deliberately left as-is: restyled the
  factory's toolbar CSS (`.d2-home`/`.d2-toolgroup`/`.d2-rbtn`/`.d2-toolpop`) to
  match Lesson 1's exactly — same 40px square buttons, bottom-right, glass
  background, same hover, same popover behaviour — so all 18 lessons now look
  identical even though two different engines still sit underneath. Verified
  in-browser, pixel-matched against Lesson 1. Only port Lesson 1 onto the
  factory if the underlying code duplication itself becomes a problem.
- **Year 1/2 "click and drag" demo slide** is still an auto-playing animation
  in Lesson 3 (leads into a real hands-on task straight after: PaintZ, pupils
  actually click-and-drag with a mouse/trackpad, so the objective is still
  covered even though that demo itself is unchanged).

## Done, kept for reference

- ~~Lessons 3 to 6 for all three units~~ — done. All 18 lessons (KS1, LKS2,
  UKS2, Lessons 1-6 each) are built and live, matching the real NCCE
  source packs unzipped into `..\KS1\L*_src\`, `..\LKS2\L*_src\`,
  `..\UKS2\L*_src\` (siblings of `hub\`, git-ignored by the source repo since
  they sit outside it). Extracted text dumps are kept in
  `hub\_tools\dumps\*.txt` for reference; `hub\_tools\extract-office-text.js`
  and `dump-lesson.sh` can regenerate them from any future NCCE pack update.
- ~~Fix the shit timeline on Lesson 4 of Year 5/6~~ — done. Dropped the
  arc-shaped chart (three failed attempts) for a horizontal draggable
  scrubber with prev/next arrows and an auto-advance play-through. No
  further complaints logged since.
- ~~Year 1/2 Lesson 2's drag skill was never actually practised~~ — done.
  The lesson's own objective is "use a mouse to click and drag," but the
  deck only had a passive animation plus Quick Click (which only trains
  clicking, not dragging). Checked the real NCCE source pack
  (`_tools/dumps/KS1_L2.txt`): the original plan sends pupils to a
  code.org drag-and-drop jigsaw at `ncce.io/drag`. Built our own version
  instead of linking out to a third-party site — a new "Build the
  picture" slide where pupils drag the screen/keyboard/mouse/base unit
  onto outlined slots to complete a computer picture, reusing the
  existing `sortInitN` matching-sort engine so it's real pointer drag,
  checked, with a completion celebration. Also added a fake power-on/
  log-in mockup slide (`initLoginDemo`) right before it, covering the
  lesson's other unpracticed objective ("turn it on and log in") with no
  real accounts needed. Quick Click demoted to an early-finisher extra.
  Both verified working end-to-end in a real browser (actual mouse drag
  simulation, not just a click) before landing.
- ~~No pacing timer or ad-hoc way to ask pupils something~~ — done. Two new
  toolbar buttons on every lesson using the shared factory engine (17 of
  18, see the two-engines note above): a timer (five mechanics to pick
  from — drain ring, rocket-launch fuel gauge, flip clock, a ten-circle
  sensory wall with no numbers, a big pulsing speed-round numeral — a
  duration picker or typed mm:ss, a small widget that keeps counting down
  across slide changes, and a real synthesised chime on zero), and "ask a
  question" (types straight into `HB_LIVE.askQuestion()`, hands back a QR
  code and room code in the toolbar itself, no need to pre-plan a task
  page). Both verified against real interaction: the timer against an
  actual countdown reaching zero and surviving a slide change, ask-a-
  question against the real Supabase backend, a real room really got
  created.
