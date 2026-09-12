# Pedagogy audit: the 18 built lessons

Scope: all six lessons in each of the three units (Year 1/2 Technology
around us, Year 3/4 Connecting Computers, Year 5/6 Systems and Searching).
Short version first, then the numbers, then what to actually do about it.

## Short version

The lessons aren't short because there isn't enough content in them. They're
short because most of the content is a teacher clicking through cards that
say "here's a fact, tap to see the answer," one after another, for ten to
eighteen slides. That's real teaching time, but it's the least demanding
kind: no pupil has to do anything except watch and occasionally shout an
answer out. The minutes marked against each slide in the teacher notes
add up to 40, 45 or 60 correctly — I wrote them to. That arithmetic was
never the problem. The problem is that most of those minutes are pinned to
a single instruction sentence and a printed sheet, with nothing in the deck
that paces it, checks it, or stops a quick class finishing in four minutes
flat.

Four of the eighteen lessons don't have this problem. They already existed
before this pass, and they use a drag-and-drop sorting activity with a
Check button built into the slide itself. Pupils sort real content, get
told if they're right, and the teacher can see at a glance who's struggling.
That mechanic already exists in the code (`sortInit`, plus a sequencing
version with `renderSeq` in the Year 5/6 Lesson 1 deck). None of the
thirteen lessons built this session use it. That's the fix, not a rewrite.

## Method

For each lesson I counted: how many slides it takes to get through the
deck, how many of those slides are tap-to-reveal cards versus something
with an actual check or drag mechanic, and how the claimed lesson length
splits between deck-driven teaching and independent activity time (pulled
straight from the teacher notes, since I wrote explicit minute estimates
against each note when building these).

"Deck-only time" below is a walkthrough estimate: how long an experienced
teacher takes to move through the slides at a natural pace, narrating and
taking a few answers, doing none of the described off-slide activities.
It's a range, not a stopwatch reading — nobody has taught these yet. Treat
it as directional: is this lesson mostly slides, or mostly slides plus
something pupils actually do.

## The numbers

| Unit | Lesson | Claimed length | Slides | Tap-to-reveal cards | Checked activity in the deck? | Deck-only walkthrough |
|---|---|---|---|---|---|---|
| Y1/2 | 1 Technology in our classroom | 40 min | 10 | few | **Yes** — sort Technology/Not Technology | ~9 min |
| Y1/2 | 2 Using computer technology | 40 min | 11 | 8 | Demo only (real activity is on code.org) | ~10 min |
| Y1/2 | 3 Developing mouse skills | 40 min | 11 | 10 | Demo only (click-and-drag animation) | ~10 min |
| Y1/2 | 4 Using a computer keyboard | 40 min | 12 | 6 | No | ~10 min |
| Y1/2 | 5 Developing keyboard skills | 40 min | 10 | 10 | No | ~9 min |
| Y1/2 | 6 Using a computer responsibly | 40 min | 12 | 9 | No | ~10 min |
| Y3/4 | 1 How does a digital device work? | 45 min | 13 | few | **Yes** — sort input/output devices | ~11 min |
| Y3/4 | 2 What parts make up a digital device? | 45 min | 11 | 3 | **Yes** — sort input/output devices | ~10 min |
| Y3/4 | 3 How do digital devices help us? | 45 min | 11 | 7 | No | ~10 min |
| Y3/4 | 4 How am I connected? | 45 min | 13 | 5 | No | ~11 min |
| Y3/4 | 5 How are computers connected? | 45 min | 13 | 7 | No | ~11 min |
| Y3/4 | 6 What does our school network look like? | 45 min | 11 | 9 | No | ~10 min |
| Y5/6 | 1 Systems | 60 min | (bespoke deck) | — | **Yes** — sort parts, sequence the smart locker steps | ~14 min |
| Y5/6 | 2 Computer systems and us | 60 min | 18 | 21 | No | ~16 min |
| Y5/6 | 3 Searching the web | 60 min | 13 | 7 | No | ~12 min |
| Y5/6 | 4 Selecting search results | 60 min | 13 | 0 (timeline instead) | No | ~12 min |
| Y5/6 | 5 How search results are ranked | 60 min | 12 | 8 | No | ~11 min |
| Y5/6 | 6 How are searches influenced | 60 min | 13 | 25 | No | ~12 min |

Fourteen of eighteen lessons have zero checked, embedded activity. Thirteen
of those fourteen are lessons built this session. The gap between the
claimed length and the deck-only walkthrough — 25 to 48 minutes per lesson
— is meant to be filled by a printed worksheet and a single sentence of
spoken instruction ("in pairs, sort these into the grid," "write your
instructions, then swap"). That's a real activity, and the worksheets
themselves are fine. What's missing is anything in the deck that paces it,
checks it, or gives a struggling pair a way back in without the teacher
noticing and intervening manually.

## Why this happened

I built thirteen lessons in one session, working from the real NCCE source
packs. The fastest way to turn a source activity into a slide is to
summarise it as a fact, then a follow-up fact, then a tap-to-reveal card
group — the `d2-reveal` / `rc()` pattern already in the codebase. It's
quick to write, looks fine in isolation, and does convey the content. It
just doesn't ask a pupil to do anything themselves until the worksheet,
which lives entirely outside the deck's pacing and feedback.

The four lessons that already had a Check-button sorting activity predate
this session. I matched their tone and factual content but not their
interaction design, because building a genuinely new sort or sequence
activity for each lesson — deciding what the categories are, writing
distractors, wiring `sortInit` or `renderSeq` with the right data — takes
real thought per lesson, not a template. Twelve lessons in a row of that
would have taken a lot longer than twelve lessons in a row of reveal
cards. I optimised for finishing the unit, not for the weakest slide type
being repeated ten times an hour.

## What to actually change

**1. Give every lesson at least one Check-button activity, reusing what's
already built.** `sortInit` (drag chips into labelled bins, or `renderSeq`
(drag steps into order, checked against a correct sequence) are already
wired into the deck engine. Converting a reveal-card slide into one of
these is a content change, not new engineering. Candidates that would
convert cleanly:

- Y1/2 L4 "Explorer task" (fill/shape/eraser cards) → sort tools into "makes a mark" vs "fixes a mistake"
- Y1/2 L6 "Why do we have rules?" → sort real classroom rules into the four reason-bins, which the printed worksheet already asks for on paper
- Y3/4 L4 "Which part is this?" → sort device/process/person, which is currently a tap-and-read card group
- Y3/4 L5 "Adding a server" file's-journey slide → sequence the steps a file takes from computer to server
- Y5/6 L3 "Ambiguous searches" (Priya/Marcus/Sophie, currently reveal cards) → sequence "first search → why it failed → better search" per scenario
- Y5/6 L5 "Score your page" → an actual scored sort: drag the search term's location (URL / heading / subheading / paragraph) onto its point value, then total it live

**2. Break up runs of reveal cards.** Y5/6 Lesson 6 has 25 tappable cards
across 8 slides in one 60-minute lesson — even split across three
"perspectives" sections, that's a lot of the same gesture in a row. Cut
some of it to a printed matching sheet instead, and use the recovered slide
budget for one of the sort/sequence conversions above.

**3. Add one mid-lesson check, not just an end-of-lesson quiz.** Every
lesson currently checks understanding twice: the confidence slider and the
task quiz, both at the very end. By then a misconception from slide 4 has
already been practised wrong for twenty minutes. A two-question check
after the main teaching chunk, before the independent activity, catches it
while it's still cheap to fix.

**4. Put a "spot the mistake" slide in every lesson.** None of the
eighteen lessons currently show pupils a wrong answer and ask why it's
wrong — one of the highest-value formative techniques, and one that source
packs already gesture at (Y3/4 Lesson 1's "cyber-attack" slide is the
closest thing here, and it works well). Y5/6 Lesson 5 already has the
ingredients for a good one: show a page that's been keyword-stuffed, ask
what's wrong with it, then reveal that it would be penalised, not rewarded.

**5. Put a visible time signal on the biggest activity slides.** Right now
a "15 min" activity is 15 minutes only because the teacher's watch says so.
A simple on-slide line — "come back together in 10 minutes" — costs nothing
and stops the wide variance between a class that finishes in four minutes
and one that's still going at twenty.

## If you only fix three lessons first

Y5/6 Lesson 2 (18 slides, 21 reveal cards, zero checked activity, 60
minutes claimed) is the most reveal-card-heavy lesson in the whole set and
the one most likely to feel like a long lecture. Y5/6 Lesson 6 is close
behind on card count. Y3/4 Lesson 4 is the clearest quick win: "which part
is this?" is already structured as a three-way sort in the writing, it's
just presented as cards instead of a drag activity.
