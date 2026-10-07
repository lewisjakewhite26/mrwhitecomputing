# mrwhitecomputing

Mr White's computing lessons for Hartburn Primary. Static HTML pages, one file per lesson, with `index.html` as the hub. Vercel deploys from `master` on every push.

## Sending work to cheaper models

The main session does the thinking: lesson design, pedagogy, new pages, animation, anything Mr White will judge by looking at it, and every commit and push. Routine checking and small mechanical edits go to the agents in `.claude/agents/`, which run on cheaper models.

| Job | Agent | Model |
|---|---|---|
| Screenshot parts of a page and report overlaps, overflow, console errors | `screenshot-checker` | Haiku |
| Check copy against `copyrules.md` and UK English | `copy-checker` | Haiku |
| Verify facts, figures and what a source says | `fact-checker` | Sonnet |
| A precisely specified small edit, or finding where something lives in `index.html` | `quick-edit` | Sonnet |

Rules for routing:

- Delegate when the task is mechanical and the instructions can be written down exactly. Keep it in the main session when it needs taste, a design decision, or knowledge of what Mr White asked for earlier.
- After building or changing a page, send `screenshot-checker` and `copy-checker` off together in one message so they run at the same time.
- Agents report back; the main session reads the report, decides what to fix, and fixes anything visual itself.
- The first look at any brand-new visual (a new character pose, a new scene, a new layout) stays in the main session. Re-checks after small fixes can go to `screenshot-checker`.
- Don't delegate a two-second job. A single Grep or a one-line Edit is cheaper done directly than written up as a brief.
- Give agents everything they need in the prompt: file names, part numbers, exact wording. They start with no memory of the conversation.

## Conventions

- All copy follows `copyrules.md`: UK English, no em or en dashes, at most one exclamation mark per 1,000 words, Phosphor icons and never emoji.
- Never show Mr White's football top in a resource. Cover it with a shirt and tie.
- Year 3/4 content never mentions Whiteflix.
- Lesson pages use a fixed 1600x900 stage and a `PARTS` array; `#partN` jumps to a part. `.pp` elements with `data-s` appear at that step.
- Screenshots: `node _tools/shoot.js <page> "<part:steps,...>" <outDir>` with a local server on port 8765 (see the script header).
- Stop the test server with `pkill -f "http.server 8765"; true` as its own command, never chained with `&&`.
