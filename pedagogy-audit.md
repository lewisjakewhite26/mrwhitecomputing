# Pedagogy audit: the 18 built lessons

Scope: all six lessons in each of the three units (Year 1/2 Technology
around us, Year 3/4 Connecting Computers, Year 5/6 Systems and Searching).
This is the updated audit, written after the follow-up build pass that
addressed the original findings below. For the actual before/after numbers
per lesson, see `pedagogy-scorecard.md` (and `pedagogy-scorecard-report.html`
for the rendered version): this file keeps the original diagnosis for
context and records what's still open.

## Where things stand now

The original version of this audit found fourteen of eighteen lessons with
zero checked, embedded activity: mostly tap-to-reveal cards backed by a
printed worksheet the deck never touched. That's fixed. A follow-up build
pass (`89ccf8c` through `99889a6`, then polish in `fb4411c`, `829015a`,
`f9d2bc7`, `d68371e`) gave every lesson at least one checked, hands-on
activity built into the deck itself, reusing and extending `sortInit` and
`renderSeq`, plus new mechanics where nothing suitable existed (a
cursor/backspace typo-fixer for Y1/2 L5, a live password-strength checker
for Y3/4 L1, a live search-scoring counter for Y5/6 L5, among others).

Overall score moved from 42.2/100 to 77.3/100 across all 18 lessons, the
higher figure reflecting a later follow-up pass on Y1/2 L2 and Y3/4 L2
specifically (a real image jigsaw replacing icon-matching, a login mockup,
and a "Spot the devices" click-in-story activity). Full per-lesson
before/after detail is in `pedagogy-scorecard.md`; don't duplicate those
numbers here, they'll drift out of sync.

## Original method (unchanged, still how the scorecard is judged)

For each lesson: how many slides it takes to get through the deck, how many
are tap-to-reveal cards versus something with an actual check or drag
mechanic, and how the claimed lesson length splits between deck-driven
teaching and independent activity time.

## What was recommended, and what actually happened

The original audit had five recommendations. Status of each:

**1. Give every lesson at least one Check-button activity.** Done, for all
18 lessons. This was the main gap and the main fix.

**2. Break up runs of reveal cards.** Partially done as a side effect of
#1: converting reveal-card slides into sort/sequence activities
necessarily cut card counts in the worst offenders (Y5/6 L2 and L6 both
went from the heaviest card-count lessons to having a real checked activity
in their place). Not separately audited slide-by-slide since; worth a fresh
card-count pass if this still feels heavy in the room.

**3. Add one mid-lesson check, not just an end-of-lesson quiz.** Not done.
Every lesson still checks understanding twice, both at the end (confidence
slider, task quiz). Still open.

**4. Put a "spot the mistake" slide in every lesson.** Partially done. A
reusable component now exists in three age-tiered variants (`spotY12`,
`spotY34`, `spotY56`: one mistake/tap-the-word, several sentences with a
"no mistake" option, and a longer passage with 2-3 hidden mistakes,
respectively), but it's only demoed in three lessons so far: Y1/2 L1
("A tree is technology"), Y3/4 L1 (input/process/output and password
strength), Y5/6 L6 (search engine myths). Fifteen lessons don't have one
yet. The component is built and ready to drop in: this is now a content
task per lesson, not an engineering one.

**5. Put a visible time signal on the biggest activity slides.** Essentially
not done. One isolated exception: Y5/6 L5's "design a paper webpage" slide
states "15 minutes" directly in the pupil-facing text. No other activity
slide in any lesson has one, and there's no reconvene-style line ("come
back together in X minutes") anywhere in the deck. Still open as a
systematic feature.

## What to actually change (updated)

With #1 done, the highest-value remaining work is:

- **#4, spread wider.** The spot-the-mistake component exists and works;
  reusing it in the other fifteen lessons is a content-writing exercise
  (pick the misconception, write the sentence/passage), not new code.
- **#3, mid-lesson check.** Genuinely not started. Would need a small new
  slide type (two questions, quick feedback) dropped in partway through
  each deck, after the main teaching chunk and before independent time.
- **#5, time signal.** Smallest lift of the three: a static line of text
  ("come back together in 10 minutes") on the activity slides that currently
  have none. No new mechanic needed.
- **Re-run a card-count pass** if #2 needs verifying properly: the
  original per-lesson reveal-card counts in this file are now stale since
  several of the worst offenders were converted.
