# Year 1/2 Computing Lessons: Input-Device Constraints

## Purpose

This document is a handoff for another AI agent. It records the classroom problem, the constraints that matter, the changes previously attempted in the lesson app, and what still needs to be decided.

## Classroom Context

- The affected lessons are the Year 1/2 computing lessons in `index.html`.
- For this half term, pupils will **not** have individual iPads, mice, or keyboards.
- The teacher will be teaching from the interactive whiteboard (IWB).
- The teacher may have access to the IWB pointer/mouse, but having children use one teacher mouse one at a time is not a sensible whole-class activity.
- An IWB touch interaction may be available, but this is not the same as every pupil having a physical mouse or keyboard.
- The practical question is how to teach the curriculum honestly and usefully under those conditions.

## Original Problem

The Year 1/2 lessons currently assume access to individual computer equipment in places where the class cannot realistically use it:

### Lesson 2: Using computer technology

The lesson includes:

- Naming computer parts.
- Turning on and logging in.
- Learning click-and-drag through a built-in computer-picture jigsaw.
- Optional additional drag sorting.

The picture jigsaw is technically built into the app, but it still assumes that pupils can each interact with it. One child at the IWB can demonstrate it, but that does not give the rest of the class physical mouse practice.

### Lesson 3: Developing mouse skills

The lesson objective includes:

- Double-clicking to open a program.
- Clicking and dragging.
- Making a picture with a mouse or trackpad.

The lesson currently sends pupils to PaintZ for practical work and offers Quick Click for extra clicking practice. Both activities depend on access to an individual pointer device, or at least on children taking turns one at a time.

### Lesson 4: Using a computer keyboard

The lesson objective includes:

- Typing a name.
- Saving work.

This assumes an actual keyboard and an individual computer workflow.

### Lesson 5: Developing keyboard skills

The lesson objective includes:

- Opening saved work.
- Moving a cursor with arrow keys.
- Using Backspace and Space.
- Writing and correcting a sentence.

This also assumes individual saved files and physical keyboards.

## Important Pedagogical Constraint

The app should not claim that pupils have mastered physical mouse or keyboard skills when they have only watched the teacher or tapped the IWB.

There are three different outcomes that must not be conflated:

1. **Conceptual understanding**: pupils can explain what a mouse, click, drag, keyboard, key press, Backspace, or Space does.
2. **Shared demonstration/rehearsal**: the class directs or watches an IWB interaction and discusses the next action.
3. **Physical fluency**: an individual pupil can operate a real mouse or keyboard independently.

This half term, the app can realistically support outcomes 1 and 2. Outcome 3 should be deferred, assessed separately, or achieved when equipment becomes available.

## Original On-Screen Keyboard Idea

A possible direction was an on-screen keyboard inside the app. It could support a teacher-led activity where:

- The class says which key should be pressed next.
- The teacher or one helper taps the IWB key.
- The class notices letters appearing on screen.
- The class practises Space and Backspace conceptually.
- The activity is framed as shared modelling, not individual keyboard mastery.

The key question for the next agent is whether this is genuinely useful for the teaching objective or merely a replacement interaction that looks busy while leaving the equipment problem unsolved.

## Changes Previously Attempted

The previous agent made and then reverted these changes:

### Attempt 1: Shared virtual keyboard

A reusable virtual keyboard was added to the shared Year 1/2 lesson engine. It included:

- Large touch-friendly letter keys.
- Space.
- Backspace.
- Clear.
- Check/Done.
- A visible text output and cursor.

It was wired into:

- Lesson 4: typing a name.
- Lesson 5: building the sentence `MY NAME IS`.

The first wording assumed pupils could take turns tapping keys. It was then revised to say that the teacher or a helper would operate the IWB while the class called out letters.

### Attempt 2: IWB mouse activity

A built-in activity was added for Lesson 3 with:

- A clickable dot.
- A draggable purple piece.
- A target area.
- A class message explaining click versus drag.

The external PaintZ activity was removed and the teacher notes were changed to describe whole-class IWB rehearsal.

### Why those attempts were rejected

The user rejected the changes because they were building things that were not helpful. The likely issue was not syntax or implementation quality; it was that the proposed widgets still tried to turn an individual practical-skills problem into an on-screen game without first agreeing what the lesson should honestly teach under IWB-only conditions.

All changes from those attempts were reverted. The current `index.html` should be treated as restored to its previous state.

## Existing Useful Assets

The project already contains several relevant pieces that another agent should inspect before building anything new:

- `quick-click.html`: a standalone click reaction game.
- Lesson 2's built-in computer-picture jigsaw.
- Lesson 3's double-click explanation and animated click/drag demonstration.
- Lesson 5's built-in cursor and Backspace typo-fixer.
- Existing lesson notes and teacher-facing task cards in `index.html`.
- `enrichment-research.md`, which already questions whether interaction formats suit Year 1/2 and warns against assuming that typing, dragging, and free drawing are good KS1 interactions.
- `TODO.md`, which records the history and limitations of the Year 1/2 mouse and keyboard work.

## Questions for the Next Agent

Before editing, decide:

1. Is the goal to preserve the original curriculum objectives, or to write a temporary IWB-only version for this half term?
2. Should Lessons 3–5 explicitly distinguish “we are learning what this does” from “we are practising the physical skill later”?
3. Is an on-screen keyboard useful as a teacher modelling tool, or should keyboard work be handled through oral spelling, printed key cards, or a paper activity instead?
4. Should Lesson 2 and Lesson 3 use one-child-at-the-IWB demonstrations, or should the activities be redesigned around whole-class prediction and discussion?
5. Which activities can be honestly checked by the app without implying individual device competence?
6. Should the temporary IWB-only approach be kept separate from the normal equipment-rich lesson version, perhaps as a delivery mode or teacher note?

## Recommended Starting Point

Do not begin by adding another widget.

First write a short IWB-only teaching plan for Lessons 2–5 with three columns:

| Lesson | What pupils can genuinely learn now | What must wait for real equipment |
|---|---|---|
| 2 | Names and purposes of computer parts; sequence of turning on/logging in; explain click and drag | Individual mouse control |
| 3 | Explain click, double-click, and drag; direct a shared demonstration | Individual mouse/trackpad fluency and drawing |
| 4 | Explain what a keyboard is for; observe or direct shared typing; discuss saving and file names | Individual typing and saving |
| 5 | Explain cursor, Space, Backspace, and arrow keys; direct a shared correction task | Independent editing with a physical keyboard |

Then decide whether the app needs only better teacher notes and IWB demonstrations, or whether one small shared activity is worth building. Any new activity should be judged against the classroom constraint, not just whether it is interactive.
