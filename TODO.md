# To do

## Live "answer the question" task — built and wired up

Built: pupil view (`#/live/<room>`), board view (`#/board/<room>`), room
codes with a teacher-only token, the drawing canvas with the full
onlineboard.eu-style toolbar (colour swatches, brush sizes, eraser, undo),
QR "start a live task" hand-off, and the Supabase backend — schema applied,
real project URL and anon key are live in `index.html`'s `HB_LIVE` module
(`SUPABASE_URL`/`SUPABASE_ANON_KEY`). See `ipad-board-plan.md` for the
original design and `_supabase/schema.sql` for the tables/functions.

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

## Also outstanding

- **Pedagogy pass.** Every lesson now has at least one checked, hands-on
  activity — that gap is closed. What's still open, from
  `pedagogy-audit.md`: no lesson has a mid-lesson check (only end-of-lesson
  quiz + confidence slider), only one slide anywhere states an activity
  duration on-screen (Y5/6 L5, "15 minutes"), and the spot-the-mistake
  component (`spotY12`/`spotY34`/`spotY56`) is only used in 3 of 18 lessons
  so far (Y1/2 L1, Y3/4 L1, Y5/6 L6) — it's built and ready to reuse in the
  other 15, that's a content task now, not an engineering one.
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
