# Year 1/2 roadmap: Technology around us

Written after rebuilding Lessons 3 and 4 around the no-devices constraint.
The rebuild made both lessons coherent, and coherent is not the same as
good. This file records what's actually wrong with the unit, what to do
about it, and where the build has got to.

## Why this unit needs work

None of the following is caused by the equipment shortage. They would all
be true with a full suite of machines.

Lessons 3 to 5 are operating instructions for a machine rather than
computing. Name the parts, click this, press that. A child can complete all
three perfectly and have learned nothing about how a computer works or how
to approach a problem: no sequence, no logic, no prediction, no debugging.

"Double-click" as a forty-minute objective is really a fine motor skill. It
arrives with age and repetition, not with instruction, so the lesson is
promising something it can't deliver in the time.

Nothing in the unit has a purpose. Typing your name is not a reason to
type. Nothing is made, nobody receives it, no problem needed solving. Year
1 and 2 will do almost anything when there's a point to it, and this unit
never supplies one.

The sequence is unmotivated too. Mouse, then keyboard, then keyboard again.
Nothing in one lesson creates a need for the next.

## The constraint this half term

No individual iPads, mice or keyboards. Teaching happens from the IWB, with
the teacher's pointer available and one class computer. See
`y12-input-constraints-handoff.md` for the full picture.

The three outcomes that must not be conflated, from that handoff:

1. Conceptual understanding: explain what a mouse, click, drag or key does.
2. Shared rehearsal: the class directs an IWB interaction and discusses it.
3. Physical fluency: a child operates a real mouse or keyboard alone.

Only the first two are available this term. The app should not report the
third.

## The reframe: instructing and debugging

The constraint accidentally produced the better activity. When one child
drives the pointer and the rest of the class tells them where to go, you
get precise instruction-giving, prediction, and correction when they
overshoot the target. That is computing, and it is a great deal more
Year 1/2 computing than thirty children silently dragging a mouse each.

At the moment it's a workaround. Make it the point. The objective for
Lesson 3 becomes something closer to "give clear instructions, and fix them
when they don't work", with the mouse as the thing being instructed rather
than the thing being learned. Same for the keyboard: the class directs
which letter comes next, and Backspace becomes the debugging step rather
than a key to memorise.

This is the highest-value change on the list and it needs no equipment.

## Give Lessons 3 to 5 something to make

One shared outcome running across the three lessons, chosen because the
class wants it to exist. Labels for the classroom, captions for a display,
a class name chart. Then clicking and typing are in service of something
instead of being the something.

## Six lessons is too many

The two keyboard lessons want to be one. That frees a slot, which can go to
the instructing and debugging work or back to Lesson 6.

## Assess what can honestly be assessed

Physical fluency can't be judged this term, so the notes should say so
rather than quietly implying otherwise. What can be assessed: whether a
child can explain what a part does, whether they can direct someone else
accurately enough to hit a target, and whether they can find a named key.

## Where the build has got to

Lesson 3 is rewritten and internally coherent: 12 slides, notes matching
one for one, no surviving references to the paint program. It carries the
virtual mouse activity, where a drawn mouse drives a large pointer on a
drawn monitor. Nothing on that screen is tappable, so the only route to a
dot is aiming first and then pressing the left button. Quick Click is
reframed as the single real mouse in the room. The plenary and its matching
worksheet use the same three job/action pairs.

Lesson 4 is rewritten the same way: 12 slides, a large QWERTY keyboard on
the board for typing a name, a slide making the point that the letters
aren't in alphabetical order, and two cards on Space and Backspace. The
self-review at the end now ticks things the pupils actually did.

Shared celebration helpers (`fxArm`, `fxCannon`, `fxFanfare`, `fxPop`,
`fxClick`) live next to `burst()` in `index.html`; both activities use
them.

A deck-wide bug is fixed along the way: canvas-confetti was appending its
canvas to `document.body`, while the fullscreen button fullscreens
`#d2-frame`, so every celebration in every lesson was rendering behind the
fullscreen layer. It's now bound to a canvas inside the frame.

The glossary gained trackpad, pointer, double-click, QWERTY, space bar and
backspace.

Lesson 5 is untouched. It still opens "your saved work", which does not
exist, so the Lesson 4 to Lesson 5 dependency is currently broken.

## Open decisions

**Saving and loading.** Don't mock a fake file system. Either make it real
with `localStorage`, where the class saves one file in Lesson 4 under a
name they choose and opens it in Lesson 5, or drop saving from this term's
version entirely. One class, one board, one file. The learning on offer is
the sensible file name, and that survives either way.

**Reorder or rewrite.** Either hold Lessons 3 to 5 until equipment arrives
and teach the IWB-friendly lessons now, or rewrite the objectives for this
term and run a Lesson 3b later for the physical skill. Reordering is
cleaner if the timetable allows it.

**The drawing tool.** A small built-in canvas would give Lessons 3 to 5
something to make, and the engine already exists three times over in
`index.html` (`wbCanvas`, `wb2Canvas`, `pvCanvas`). Don't import Excalidraw
for this. Two things to settle: whether it's driven by finger or by the
virtual mouse, and, if the velocity-sensitive pen is wanted, that the board
drops points at speed, so it needs `getCoalescedEvents()` and a floor on
the minimum stroke width or fast strokes will nearly vanish.

## Caveat

None of the rebuild has been verified in a browser. It's syntax-checked,
the stylesheets balance, notes and slides are aligned one to one, and the
layouts were modelled at common board resolutions. That is not the same as
watching it work on the board.
