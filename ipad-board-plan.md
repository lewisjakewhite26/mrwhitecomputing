# iPads to the board: comparing the options

You're right that this is worth building. Pupils writing or drawing an
answer on their own iPad and watching it land on the big screen is one of
the few things a class genuinely can't do on paper, and it directly
answers the pedagogy audit's biggest gap: almost none of the built lessons
ask a pupil to do something and see it checked or shared. This is that,
at scale.

Requirements, stated plainly, before comparing anything: pupils write or
draw freely, not just tick a box. Nothing that needs a pupil to create an
account or remember a password — these are five to eleven year olds. The
answer has to actually reach a shared screen, not sit trapped on one
iPad. It has to survive a real classroom's wifi. And it shouldn't collect
anything that would make a school's data protection lead nervous.

## The eight tools, as they actually are

| Tool | Draws freely? | Pupil login? | Free-tier catch | Paid cost |
|---|---|---|---|---|
| Whiteboard.fi | Yes, it's a drawing canvas | No — join by code or QR | Room expires after 2 hours, 20 pupils | $4.99–12.99/month for a permanent room |
| Apple Classroom + Freeform | Freeform: yes. Classroom: no drawing, it mirrors screens | Freeform needs each pupil signed into an Apple Account (iCloud) | Classroom itself is free and needs no account | Free — but Freeform's iCloud requirement is the real catch, not price |
| Pear Deck | Yes, but only on the paid tier | No — join by code | Free tier drops the drawing/draggable question types | $149.99/year |
| Nearpod | Yes, "Draw It" — but paid only | No — join by code | Draw It and Collaborate Board both require a paid plan | $159/year |
| Padlet | Yes, drawing is one of the post types | No — anonymous guest posting is built in | 3 boards total, ever, on the free plan | $199/year (Classroom, 2 teachers) |
| Miro / FigJam | Yes, sticky notes and a freehand pen | No — FigJam's "Open Sessions" skip login | Open Sessions need a paid FigJam plan | From $3/user/month, but K-12 districts can get FigJam Enterprise free if the school qualifies |
| Mentimeter | No real drawing — text, word clouds, "pin on image" | No — join by code | 50 participants **total, per month**, then locked out 30 days | $11.99–24.99/month |
| Slido | No drawing — polls, Q&A, word clouds | No — join by code | 3 polls per presentation, 100 participants | $7/month education rate |

Sources: [Whiteboard.fi support](https://support.whiteboard.fi/how-do-students-join-my-class), [Apple Classroom support](https://support.apple.com/en-us/103275), [Freeform iCloud requirements](https://support.apple.com/guide/icloud/set-up-freeform-mmd1b86048ac/icloud), [Pear Deck via Capterra](https://www.capterra.com/p/209857/Pear-Deck/), [Nearpod pricing](https://nearpod.com/pricing), [Padlet anonymous posting](https://padlet.blog/anonymous-attribution/), [Padlet pricing via SoftwareSuggest](https://www.softwaresuggest.com/padlet/pricing), [FigJam Open Sessions](https://help.figma.com/hc/en-us/articles/4410786053911-Invite-visitors-to-an-open-session), [Mentimeter plans](https://www.mentimeter.com/plans), [Slido pricing via Wooclap](https://www.wooclap.com/en/blog/slido-pricing/).

A few things worth pulling out of that table on their own.

**Nearpod's Draw It and Collaborate Board are not on the free plan.**
Several review sites imply the free tier is generous; it isn't, for this
specific use. You'd be paying $159/year for exactly the one feature you
came for.

**Freeform's catch is real, not theoretical.** Every pupil needs to be
signed into an Apple Account with iCloud on iPadOS 16.2 or later. Schools
that hand out iPads under Managed Apple IDs sometimes lock the Account
section of Settings entirely, which blocks Freeform's iCloud sharing
outright. Worth testing on one of the school's actual iPads before
planning around it — Apple's own discussion boards are full of IT staff
hitting exactly this wall.

**Mentimeter's free cap is per month, not per lesson.** You said you like
this one, and it's genuinely good for what it does — but "50 participants
a month, then a 30-day lockout" means one class of 30 pupils, run twice,
uses up the entire month's quota. It also has no real freehand drawing;
the closest thing is dropping a pin on an image. It's a strong fit for a
quick word-cloud or opinion check, a weak fit for "draw your answer."

**FigJam is the closest commercial match to what you're picturing** — a
shared canvas, sticky notes, a pen tool, and Open Sessions that skip
login entirely. The catch is Open Sessions sit behind a paid plan, unless
the school's K-12 status qualifies for Figma's free education tier, which
is worth a real enquiry rather than assuming either way.

**Whiteboard.fi's "catch" isn't a catch for a single lesson.** A 40 to
60 minute lesson fits inside the free plan's 2-hour room limit with room
to spare, and the room code changing every session is the same "fresh
code each lesson" design already planned for the hub's own live-task
route. The free plan's actual limitation is 20 pupils per room, which
matters for a class of 30, and the fact that a paid room is needed if you
ever want the same URL twice.

## Three real ways to do this, ranked by effort

### Option 1: pilot Whiteboard.fi now, decide after

Zero code, zero cost, works this week. Project the teacher's own view —
it already shows every pupil's board live, so "answers pop up on the
board" is the default behaviour, not a feature you have to dig for. Class
size over 20 needs the $4.99 tier or two rooms running side by side.

This is the fastest way to find out whether the idea lands with real
pupils on the real school wifi before spending engineering time on
anything else. If a lesson or two goes well, you'll know exactly what you
want the custom build to copy — and what you don't miss.

### Option 2: keep building Route B, the custom room already in TODO.md

Still the only option with no per-pupil cap, no monthly lockout, no
account for anyone, and no separate app for the teacher to juggle
alongside the hub deck — the QR code already on the slide would open
straight into it. The trade-off hasn't changed: it's unbuilt, it needs
real testing on school wifi before trusting it in front of a class, and
it's the one thing in the whole app that needs the internet.

Given the pilot in Option 1 is nearly free to run, do it first. It'll
tell you whether pupils actually want to draw here, whether tablets over
wifi keep up, and what the board view needs to feel calm rather than
chaotic — all of which is cheaper to learn from someone else's product
than your own.

### Option 3: Padlet, for "share an idea" moments rather than live drawing

Padlet's anonymous posting is genuinely frictionless, and a drawing is
one of the post types. The free plan's 3-boards-forever limit is
workable if the same three boards get reused and cleared lesson to
lesson, which fits a school on a tight budget better than $199/year.
It's a better fit for "post your idea to the wall" than for "draw a
diagram and see it appear" — the wall updates when a pupil finishes and
submits, not stroke by stroke like Whiteboard.fi.

## Not worth building around, but worth keeping in the toolkit

**Mentimeter and Slido** aren't drawing tools and the free tiers won't
survive regular classroom use. Keep Mentimeter for the moments that
actually suit it — a quick word cloud on "what does technology mean?",
an anonymous opinion poll — rather than trying to make it do the drawing
job it isn't built for.

**Pear Deck** would need its $149.99/year tier just to unlock the
drawing question type, which makes it a harder sell than Whiteboard.fi
for the same money.

**Apple Classroom + Freeform** is the only option here that's genuinely
free forever with no third party involved, which fits the hub's
offline-first design better than anything else on this list. It's worth
a real test on the school's iPad fleet specifically to see if Managed
Apple IDs allow Freeform's iCloud sharing — if they do, this becomes a
serious contender; if they don't, it's a dead end for this particular
use, though Classroom's plain screen-mirroring (no drawing, one pupil's
screen at a time, teacher-picked) still has a place for showing off one
piece of work rather than gathering a whole class's answers at once.

## Suggested next step

Run one real lesson on Whiteboard.fi's free plan before touching any
code. It costs nothing, takes ten minutes to set up, and answers the
question that actually matters: do the pupils and the wifi cope, and does
seeing everyone's drawing pop up onto the board feel like the moment
you're picturing. Everything else in this document is easier to decide
once you've watched that happen.
