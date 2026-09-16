# E-safety lesson audit: `digital-safety-lesson`

Scope: the standalone React app at
`C:\Users\lewis\Downloads\digital-safety-lesson\digital-safety-lesson`
(Year 6 online-safety lesson: branching chat scenarios on Roblox, WhatsApp
and Snapchat). Reviewed by reading `src/data/scenarios.ts`,
`ScenarioPage.tsx`, `OutcomeReview.tsx`, `HubPage.tsx`, `IntroPage.tsx`,
`SplashPage.tsx`, `ChatBubble.tsx`, and by running the app and clicking
through the Roblox scenario end to end. Written the night before a first
use with two Year 6 classes, where the plan is to run **one scenario** in
about 15 minutes as a slot inside the Systems and Searching lesson, not
the full three-scenario lesson.

## Bottom line

The content is genuinely strong — better than most bought-in e-safety
resources — and safe to hardcode into the hub as-is content-wise. The
delivery mechanics have one real gap (no Childline number or DSL guidance
anywhere in the live app) that needs fixing before tomorrow, and the
"vote as a class" framing in the README oversells what the software
actually does. Timing-wise, one scenario at 4 stages is realistically
15-20 minutes with real discussion, not far off your 15-minute target —
but only if you compress or skip stage 4 discussion.

## What's good

- **Content quality is high.** Each scenario (Roblox, WhatsApp, Snapchat)
  runs a realistic 4-stage escalation — mild annoyance, to friend
  request/bribe, to personal-data fishing, to a pressure/blackmail-style
  ask — and the choices aren't strawmen. The "wrong" choices are
  plausible things a Year 6 pupil would actually do (leaving a game
  server, giving a fake name to seem safe, replying "no thanks" but not
  blocking), not obviously-stupid options that make the "right" answer
  trivial.
- **No shaming, no scoring.** `OutcomeReview` shows the outcome of all
  three choices at every stage, not just the one taken, and there's no
  score or grade. This is the correct pedagogical call for a safeguarding
  topic — a scored quiz on "did you get groomed correctly" would be a bad
  design, and this avoids it.
- **The reassurance message is real and repeated on purpose.** The
  `NOT_YOUR_FAULT` text ("it is never your fault — not even if you
  already replied, added them, shared something, or sent a photo... tell
  a trusted adult") appears after every scenario, and the code comment
  confirms that's deliberate repetition, not an oversight. Good call for
  this age group.
- **No personal-data risk.** Checked specifically for this: there is no
  text input anywhere in the app, no camera/photo capture, no network
  calls, no way for a pupil to type their own name/address/photo. All
  interaction is fixed multiple-choice buttons. Safe to run as-is.
- **Snapchat's disappearing-message UX (tap-to-open messages) and the
  platform-accurate chat styling** are a nice authenticity touch — pupils
  will recognise the UI shape immediately, which matters for transfer to
  real life.

## What's not good / needs fixing before tomorrow

1. **No Childline number, no DSL/safeguarding guidance anywhere in the
   live app.** This is the one finding that actually matters for
   tomorrow. `IntroPage`, `HubPage`, and `OutcomeReview` never mention
   Childline (0800 1111) or what to do if a disclosure happens mid-lesson.
   That content exists — but only in `LESSON-SLIDES.html`, the offline
   backup, on its final slide and a teacher-only "before you start" slide
   ("This lesson can prompt a child to disclose something that has
   happened to them... follow your school's child protection policy and
   speak to your DSL. Do not promise to keep it secret."). The README
   claims "the app" has the golden rules and Childline number (line 27)
   — it doesn't; only the slide deck does. **If you're running the live
   web app tomorrow rather than the HTML slides, you currently have no
   Childline number on screen for pupils and no DSL reminder for
   yourself.** Cheapest fix: read the DSL note yourself before the lesson
   (you don't need it on screen), and either switch to
   `LESSON-SLIDES.html` for the closing slide, or read out the Childline
   number yourself at the end.

2. **"Vote as a class" isn't a feature — there's no voting mechanism at
   all.** Confirmed by grep: zero matches for "vote" anywhere in `src/`.
   One person (you, on the shared screen) taps one of the 3 choices.
   That's fine for how you'll actually run it (you take a class show-of-
   hands verbally, then tap whichever wins) — just don't expect the app
   to do anything with a vote, and don't describe it to the class as
   "the app is voting."

3. **The story doesn't actually branch — it's one linear plot with three
   possible flavours of "what happens next" text.** Whichever of the 3
   choices you pick at stage 1, stage 2 shows the same messages
   regardless. This is mostly invisible in play, except in one place it
   surfaces awkwardly: if you pick the *best* choice at Roblox stage 1
   (block immediately), the outcome text says "for this scenario, imagine
   you chose 1B or forgot to block, so we can see what happens when
   someone persists" — i.e. picking the correct answer gets narrated back
   as "let's pretend you didn't do that." Worth knowing before you run it
   live, so it doesn't look like a bug when a sharp pupil clocks it. Not
   worth fixing tonight — just be ready to say "in real life, blocking
   here would end it — we're continuing the story to see what happens if
   someone doesn't."

4. **No skip control on the message animation.** Every stage forces a
   sequential typing-indicator animation (roughly 5-7 seconds per stage,
   longer on Snapchat where you also have to tap each message open) with
   no way to speed it up. Across a full scenario that's under a minute of
   dead air total, not a big deal for one scenario in 15 minutes, but
   don't queue up all three back-to-back expecting to save time by
   rushing — you can't skip ahead.

5. **Splash screen shows unframed grooming-language phrases before any
   teacher framing.** The very first thing on screen (before "Begin
   lesson" even) is ambient text drifting over a dark background: "add me
   on snap", "are you home alone?", "send it or i tell everyone", "how
   old are you really?", "it'll be our secret". This is thematically
   correct for the topic, but it's the *first* thing pupils see, with
   zero adult framing yet (framing text doesn't appear until the next
   screen). Recommend: don't project the splash screen while pupils are
   filing in/settling — start it face-down or on your own screen, cue it
   up, and only display once you're ready to say the "we're going to look
   at some things people might say online" line yourself.

## Timing reality check for tomorrow

One scenario = 4 stages × (read message animation + discuss + pick +
reveal outcome). Realistic minimum with even brief discussion at each
stage is 12-15 minutes; with proper "why did you pick that" discussion at
each of the 4 stages it's closer to 20-25 minutes (that's the subagent's
estimate from reading the actual message/timing code, and it matches what
the scenario density looks like — 3 choices with real consequence text at
every stage invites discussion, it's not a quick tap-through).

For a hard 15-minute slot: pick **one scenario**, and treat stages 1-3 as
quick show-of-hands-then-move-on, saving real discussion time for stage 4
(the pressure/escalation stage, which is the pedagogical payoff) and the
`OutcomeReview` debrief. Roblox is probably the easiest single scenario to
run in 15 minutes cold — WhatsApp's is bullying-flavoured group dynamics
which tend to generate more classroom discussion than you'll have time
for, Snapchat's stage 3 has a subtler "jigsaw" data point that's worth
lingering on.

## On hardcoding it into the hub

Content-wise, yes — safe and good enough to port in. Before you do:
- Carry over the DSL/"before you start" note and the Childline number from
  `LESSON-SLIDES.html` into whatever screen replaces `IntroPage`/the final
  screen in the hub version — don't let it get left behind in translation
  the way it's currently missing from the live app.
- Decide whether the hub version should keep the "vote as a class"
  wording at all, since there's no vote to back it — either build a real
  show-of-hands prompt into the deck (matching the hub's existing pattern
  for group activities) or just reword it to "discuss, then choose as a
  class."
