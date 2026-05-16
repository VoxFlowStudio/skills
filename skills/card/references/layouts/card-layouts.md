# Card Layout System

Use this reference whenever a card set needs more design structure than a simple title-and-grid treatment. The goal is to make layout a planning and implementation contract, not a vague inspiration list.

Pair this with `references/design-languages.md` when the user wants style variation or a stronger visual point of view. Layout defines the card's structure; design language defines its graphic voice.

## Shape-First Direction

When the user wants stronger design or says the cards feel too plain, do not solve it by adding more thin lines, grids, or boxed panels. Those are utility devices, not a visual concept.

Default away from:

- full-canvas coordinate grids
- repeated thin-line boxes
- equal card grids as the main composition
- hairline-heavy technical diagrams
- one border around every item

Prefer:

- one dominant visual metaphor per card
- large cropped shapes, oversized type, silhouettes, stamps, labels, receipts, tickets, dossiers, product objects, image crops, or generated assets
- asymmetric composition with deliberate overlap
- thick rules, filled bands, paper cuts, torn labels, diagonal tape, stamps, and large negative space
- grouped text that attaches to the visual anchor instead of floating in separate boxes

Thin lines, grids, and rectangular panels are allowed only when they support a stronger anchor. If the screenshot would still work after removing the anchor, the design is probably too component-like.

## Layout Contract

Before writing card HTML, create a layout plan table with one row per card:

| Card | Role | Layout | Visual Anchor | Text Density | Asset Slot | Risk |
|---|---|---|---|---|---|---|
| 01 | Cover | `cover-object` | package inspection tag | Low | CSS object / image | title crowding |
| 02 | Mechanism | `split-diagram` | artifact -> scan flow | Medium | diagram 16:10 | too much copy |

Required fields:

- `Role`: cover, context, proof, mechanism, contrast, quote, checklist, closer, etc.
- `Layout`: one of the layout recipes below.
- `Visual Anchor`: the dominant object, image, number, diagram, shape, artifact, or typographic move. If this is "none", the card is likely under-designed.
- `Text Density`: low, medium, or high. Low cards need stronger composition; high cards need tighter information architecture.
- `Asset Slot`: none, CSS object, photo, screenshot, generated image, diagram, or proof grid.
- `Risk`: likely failure mode, such as text crowding, weak anchor, repetitive shell, or image crop.

Do not let every card in a real explainer set be low density. A 3-card set should normally include one medium-density explanation or takeaway card. A 5+ card set should include at least two structured information cards.

Do not start coding until every card has a different enough role or visual anchor. A set can share a system, but it should not feel like the same card with swapped text. For high-design cards, also name the `Composition Move`: crop, overlap, diagonal, scale contrast, split field, cutaway, stamp, wraparound, or image-led.

## Set-Level Rhythm

For 1-3 cards:

- Use a `hook / explain / takeaway` density arc by default.
- Use at least 2 layout recipes.
- Card 1 should be a cover or bold thesis, not a dense checklist.
- Avoid making every card `title-stack + cards-grid`.
- Include one structured information card: numbers, process, comparison, proof grid, callouts, field notes, or checklist.
- At least one card should use a large non-box visual anchor or cropped shape.

For 4-7 cards:

- Use at least 3 layout recipes.
- Include one low-density visual card: cover, divider, quote, question, or hero object.
- Include one structured information card: numbers, process, comparison, proof grid, or checklist.
- Use at least two medium-density structured cards when the set is an explainer. Strong covers and closers can stay sparse, but the middle should carry concrete information.
- Do not place more than 2 dense cards back to back.
- Avoid more than 2 cards whose main structure is equal rectangular panels.

For 8+ cards:

- Use at least 4 layout recipes.
- Add at least one reset card every 3-4 cards: divider, quote, question, image-led card, or big number.

## Layout Recipes

### `cover-object`

Purpose: make the first card instantly memorable.

Composition:

- small chrome at top
- large title occupying 45-65% of width
- one dominant object or visual metaphor occupying 25-50% of canvas, preferably cropped, tilted, stamped, wrapped, or overlapped
- short promise line
- footer/source and page number

Use when: topic has a concrete metaphor such as package label, receipt, microscope, map, passport, machine part, screenshot, document, stamp, signal, or artifact.

Avoid: title-only covers unless the typography itself is distinctive. Avoid placing the object inside a neat box; make it behave like a physical or graphic object.

### `cover-crop`

Purpose: make a visual asset or generated image carry the cover.

Composition:

- image fills one edge or corner and is cropped intentionally
- title overlays or sits in the negative space
- chrome is minimal
- footer is quiet

Use when: there is a real photo, product screenshot, event image, object, or generated editorial visual.

Avoid: dark blurred stock imagery or images that do not reveal the subject.

### `split-diagram`

Purpose: explain a mechanism with text and a diagram/object side by side.

Composition:

- 55/45 or 60/40 split in square cards
- left: kicker, headline, short explanation
- right: diagram, code/object panel, screenshot crop, cutaway shape, or annotated asset
- optional callout strip below

Use when: the content needs "how it works".

Avoid: using the right side for another text card. The right side must be visual. Avoid a plain boxed diagram unless it has a strong silhouette, scale, or crop.

### `artifact-board`

Purpose: make abstract software/process content feel tangible.

Composition:

- main title
- 1 large document, label, ticket, receipt, terminal printout, inspection sheet, or dossier object
- 2-4 annotations around it
- restrained stamps, serial numbers, margins, or clipping marks

Use when: content involves packages, audits, release notes, files, policies, contracts, research, incident reports, or checklists.

Avoid: too many equal cards. One artifact should dominate. Make it feel like an object through scale, angle, crop, folding, stamp, tape, or layered paper, not through a thin border.

### `big-number`

Purpose: turn metrics into a visual event.

Composition:

- one oversized number or 2-3 large metrics
- short labels and notes
- source line
- optional scale marks, ruled columns, or small comparison baseline

Use when: numbers are the story.

Avoid: six equal metric boxes unless the goal is a data table.

### `proof-grid`

Purpose: show evidence through multiple assets.

Composition:

- title and one-sentence claim
- 2x2, 3x1, 3x2, or asymmetric large+small proof grid
- consistent crop/height within each image group
- captions that add information, not decoration

Use when: screenshots, examples, posts, UI states, or clips prove the claim.

Avoid: mixing unrelated aspect ratios without an intentional grid. If possible, use an asymmetric proof wall rather than equal boxes.

### `process-rail`

Purpose: make ordered steps readable as one static sequence.

Composition:

- title and context
- 3-6 steps on a rail, arc, ladder, timeline, conveyor, orbit, stack, or route
- numbers are prominent
- one clear start and end

Use when: release flow, workflow, architecture path, migration, or causal chain.

Avoid: equal boxes floating without connection. Add a rail, arrows, rhythm, grouping, or physical metaphor. The rail should be more visually important than individual boxes.

### `before-after`

Purpose: compare two systems or states.

Composition:

- mirrored left and right panels
- shared row labels or matching bullet counts
- muted old side, stronger new side
- clear dividing rule or axis

Use when: old vs new, myth vs reality, risk vs mitigation, manual vs automated.

Avoid: two unrelated lists with no shared comparison structure.

### `quote-poster`

Purpose: give one idea emotional weight.

Composition:

- large quote/principle
- attribution or context
- very little supporting text
- optional ghost word, rule lines, or small source note

Use when: a short sentence is the takeaway.

Avoid: long quotes or dense paragraphs.

### `checklist-sheet`

Purpose: present practical actions without becoming a plain grid.

Composition:

- checklist title
- one dominant sheet, clipboard, form, stamp, receipt, tag, or inspection object
- 4-8 checks with clear grouping
- optional pass/fail marks, stamps, or sections

Use when: actions, launch criteria, recommendations, operational playbooks.

Avoid: six equal boxes if a form metaphor would be stronger. Prefer one large object with grouped rows, stamps, tears, tabs, or highlighted blocks.

### `closer-question`

Purpose: end with a memorable prompt or decision.

Composition:

- one sharp question or conclusion
- one small line of context
- large whitespace or single object
- minimal footer

Use when: final carousel card, act break, or call to action.

Avoid: adding a full checklist to the closer.

## CSS Primitive Requirements

When using this layout system, define card-local classes for the chosen recipes before writing individual cards. Do not rely on ad hoc inline layout for every card.

Recommended primitive names:

- `.chrome`, `.kicker`, `.foot`, `.page-no`
- `.layout-cover`, `.layout-split`, `.layout-artifact`, `.layout-proof`, `.layout-rail`, `.layout-compare`, `.layout-quote`, `.layout-checklist`
- `.visual-anchor`, `.artifact`, `.stamp`, `.tape`, `.ticket`, `.cutout`, `.annotation`, `.rail`, `.step`, `.proof-frame`, `.quote-mark`, `.ghost`

The exact CSS can vary, but each chosen layout recipe should have a recognizable parent class in the HTML. This makes visual audit possible.

## Layout QA

Fail and revise a card when:

- the planned `Visual Anchor` is missing or visually weaker than the body text.
- 3 or more cards in a set share the same `headline + equal grid + footer` structure.
- the card's primary design language is thin lines, coordinate grids, and rectangular boxes instead of the planned anchor.
- a supposed `split-diagram` has text on both sides and no real diagram/object/image.
- a supposed `process-rail` is just disconnected equal boxes.
- a supposed `checklist-sheet` is just a generic card grid instead of a form, sheet, or grouped checklist.
- the layout recipe cannot be identified from the rendered screenshot.

During visual review, name the layout actually used for each card. If you cannot name it, the layout system is not being used.
