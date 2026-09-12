# Copy rules

All written copy in this project follows the anti-AI-slop writing directive:
https://github.com/jalaalrd/anti-ai-slop-writing

That covers pupil-facing text, teacher notes, slide copy, hub and unit intros,
worksheet wording, this repo's docs, commit messages, and anything written back
in chat about the work.

One project carve-out: pupil-facing text for Years 1 to 4 may use short, simple
sentences and plain repetition where reading age needs it. Everything else keeps
the full ruleset, including sentence-length variety.

The rules are copied in full below so they travel with the repo.

---

## Before writing anything

Never use any word, phrase, or opener from the banned list at the end of this
file. If you reach for one, swap in a concrete alternative or rebuild the
sentence.

## Structural rules

Readers spot AI text from these patterns even when the vocabulary is clean.

**No rule of three.** AI defaults to threes. Break it: use two, four, one, five.
Only group in threes when the content genuinely has three items.

**No uniform sentence length.** Never three sentences in a row at the same
length. Mix a 4-word sentence against a 30-word one. This is the single most
measurable detection signal.

**No parataxis.** Short sentence, then another, then another reads like a poem and
signals AI straight away. Connect related thoughts with subordinate clauses,
conjunctions, semicolons, or commas. Show how ideas relate: cause, contrast,
qualification.

**No hedging seesaw.** Pick a side and state it. Give any counterpoint one
sentence at most.

**No corporate pep talk.** Write like someone with real experience, including the
annoying parts. No cheerleading.

**No identical paragraph structure.** Don't run topic sentence, explanation,
example, transition every time. Start some paragraphs with a question, some with
a blunt statement. Let some be one sentence. Let some stop without a transition.

**No excessive bullet points.** Use them rarely and make them uneven. Never more
than 5 to 7 in a row. If it fits in a sentence, write a sentence.

**No "As a [role], I..." openers.** Say the thing without announcing credentials.

**No parallel structure across sections.** Different points get different
treatment. Vary section lengths.

**No passive construction.** Avoid "is being done", "was found to be", "are
considered to be". Write active and direct.

**Let paragraphs end abruptly.** Not every one needs a summary or a hand-off.
Sometimes just stop.

## Punctuation rules

**Em dashes:** at most one per 500 words. The most cited AI tell there is. Use
commas, semicolons, colons, parentheses, or a new sentence.

**Exclamation marks:** at most one per 1,000 words. Enthusiasm comes from word
choice.

**Ellipses:** only for a genuine trail-off, never as a transition. One per piece.

**Semicolons:** use them; good writers do, and AI underuses them.

**Colons:** use them to set up a payoff that the next clause delivers on.

## What to do instead

**Be specific, not general.** "You paste your treasury address and it tells you
you'll run out of USDC in 47 days" beats "powerful analytics capabilities".

**Show, don't describe.** "Three clicks from wallet connect to your first risk
score" beats "a seamless user experience".

**Use real numbers.** "34 users in the first week, 12 came back the next day"
beats "significant growth".

**Name real things.** "Solana, specifically" beats "various blockchain networks".

**Include friction, doubt, or mess.** "The RPC kept timing out at 3am and I
nearly scrapped the feature" beats "a rewarding journey".

**Use contractions.** "don't", "can't", "it's".

**Reference time, place, context.** "last Tuesday", "at 2am", "during the
hackathon deadline".

**Let sentences be ugly sometimes.** A fragment. A run-on that keeps going
because the thought isn't finished. That reads human.

**Never invent anecdotes or pass hypotheticals off as real.** Say "imagine" or
"suppose". Fake specificity is worse than honest vagueness.

**Use the less obvious word.** Reach past the first one that comes to mind.

## Accuracy and honesty

**Never invent data, studies, or statistics.** With no real number, say
"roughly" or "around", or admit the uncertainty.

**Never fabricate quotes.** Paraphrase with attribution or drop it.

**Take a clear position when the evidence is solid.** Qualifiers are for real
uncertainty, not habit.

**Use real, verifiable names, companies, and dates.** "OakNorth" beats "a major
bank". "A Databricks report from March 2026" beats "research shows".

## Formatting rules

**No markdown headers** in social posts, emails, or casual writing.

**No bold random phrases** for emphasis in social posts.

**No emoji as bullet points.** One or two emoji in a post is fine. Every line
starting with a tick or a flame is slop.

**No "thread" openers.** The content should pull people through on its own.

**No hashtag stacks.** Zero to two, worked into the sentence.

**No markdown in plain-text contexts** such as emails, DMs, or SMS.

## Voice calibration

Writing for a specific person means matching their voice. Do they swear? Use
slang? Write long or short? What humour: dry, sarcastic, self-deprecating,
absurd? What would they never say? What platform is it for?

Default when unknown: direct, slightly informal, contractions, occasionally
opens with "And" or "But", doesn't over-explain, trusts the reader.

## Self-check before every output

1. Any banned words or phrases? Replace them.
2. Three consecutive sentences the same length? Vary them.
3. Three or more short declaratives in a row? Merge or connect them.
4. Grouped in threes? Break it.
5. Hedging instead of committing? Pick a side.
6. More than one em dash? Cut the extras.
7. Passive construction? Make it active.
8. Every paragraph ending on a transition? Cut some.
9. Fabricated any specifics? Remove them or flag as hypothetical.
10. Could any AI have written this for anyone? Add something specific.
11. Still sounds like ChatGPT? Rewrite until it doesn't.

Apply the rules silently. Don't mention them in the output.

## Icons and emoji

Anything meant for paper (worksheets, printable tasks): Phosphor icons only,
inlined as SVG. No emoji. Emoji print inconsistently and depend on the machine's
installed fonts.

On screen:
- KS2 lesson decks (Year 3/4, Year 5/6) use Phosphor icons.
- KS1 lesson decks (Year 1/2) use emoji, because young readers recognise a
  coloured picture faster than a line icon.

When a printable lists the same items as its deck, use the Phosphor version of
those items so the sheet and the slide line up. Keep the item list identical
across both. If the deck can only show an item as an emoji that Phosphor has no
match for, swap it for an item that works in both places.

Phosphor icons come from the inlined `PH` map in `index.html`. Add a new one by
taking the regular-weight SVG from the Phosphor package and inlining its paths.
Never load them from a CDN.

---

## Banned vocabulary

delve / delves / delving, tapestry, landscape (figurative), testament (e.g. "a
testament to"), vibrant, pivotal, crucial, intricate / intricacies, meticulous /
meticulously, bolster / bolstered, garner / garnered, underscore / underscores,
interplay, multifaceted, nuanced (as filler), foster / fostering, leverage (as
verb), utilize (say "use"), commence (say "start"), facilitate, encompass /
encompassing, paramount, groundbreaking, cutting-edge, game-changing /
game-changer, transformative, revolutionise / revolutionize, seamless /
seamlessly, robust (outside engineering), comprehensive (describing your own
output), endeavour / endeavor, aforementioned, harnessing, spearheading,
navigating (figurative), showcasing, highlighting, emphasizing, enhancing,
unprecedented, remarkable, stunning, profound, epic (non-literal), in essence,
thought leader / thought leadership, synergy / synergies, pain points, value add
/ value proposition (casual contexts), moving forward, touch base / circle back,
rest assured, it goes without saying

## Banned phrases

- "In today's [adjective] [noun]..."
- "It's worth noting that..."
- "It's important to note that..."
- "Let's dive in" / "Let's dive deeper" / "Let's delve into"
- "At its core..."
- "In the realm of..."
- "When it comes to..."
- "A testament to..."
- "Not just X, but Y"
- "It's not just about X — it's about Y"
- "This is where X comes in"
- "Whether you're a [X] or a [Y]..."
- "From X to Y" (range opener)
- "At the end of the day..."
- "The bottom line is..."
- "Here's the thing..."
- "Here's the deal..."
- "Without further ado..."
- "In a nutshell..."
- "Buckle up"
- "Take it to the next level"
- "Unlock the power of..."
- "Empower / empowering"
- "Elevate your..."
- "Streamline your..."
- "Supercharge your..."
- "Bridge the gap"
- "Move the needle"
- "In conclusion"
- "Overall," (paragraph starter)
- "Firstly... Secondly... Thirdly..."
- "I hope this helps"
- "I hope this finds you well"
- "I hope this email finds you well"
- "As per my last email"
- "Please don't hesitate to reach out"

## Banned sentence and paragraph openers

- "Certainly,"
- "Absolutely,"
- "Sure,"
- "Great question!"
- "That's a great point!"
- "I'd be happy to..."
- "As an AI..."
- "As a language model..."
- "However, it's important to..."
- "Moreover,"
- "Furthermore,"
- "Additionally,"
- "Interestingly,"
- "Notably,"
- "Importantly,"
- "Indeed,"

## Model first-word tells (don't open with these)

- ChatGPT: "as", "yes", "sure", "here", "in", "to", "creating", "certainly", "title", "the"
- Claude: "in", "from", "this", "how", "yes", "title", "according", "the", "based", "here"
- Grok: "step", "introduction", "yes", "creating", "to", "title", "in", "certainly"
- Gemini: "my", "creating", "while", "here", "yes", "this", "the"
- DeepSeek: "based", "yes", "step", "comprehensive", "here", "to", "creating", "title", "certainly"

## Era-specific AI vocabulary (context)

- 2023 to mid 2024 (GPT-4): additionally, boasts, bolstered, crucial, delve, emphasizing, enduring, garner, intricate, interplay, key, landscape, meticulous, pivotal, underscore, tapestry, testament, valuable, vibrant
- Mid 2024 to mid 2025 (GPT-4o): align with, bolstered, crucial, emphasizing, enhance, enduring, fostering, highlighting, pivotal, showcasing, underscore, vibrant
- Mid 2025 on (GPT-5): emphasizing, enhance, highlighting, showcasing
