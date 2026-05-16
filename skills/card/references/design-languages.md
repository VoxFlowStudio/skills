# Design Language System

Use this index to choose a visible design language before building cards. A design language is not the same as a theme preset. Theme presets define palette and type tone; design language defines the visual grammar: composition, focal devices, texture, objects, and pacing.

## How To Use

1. Choose 1 primary design language.
2. Load that language's individual spec file from `references/design-languages/<name>.md`.
3. Optionally add 1-2 modifiers.
4. Combine with a theme preset and layout recipes.

Recommended structure:

```text
Theme preset + Primary language + Modifier + Modifier
```

Examples:

- `product-manual + editorial-artifact + diagonal-tension + stamp-label`
- `magazine-eink + image-led-magazine + edge-crop + annotation`
- `bold-editorial + swiss-poster + scale-contrast + big-number`

Do not combine more than 3 languages/modifiers in one card set unless the user explicitly wants maximal eclecticism.

## Primary Language Specs

Load only the spec files relevant to the selected language(s):

- `editorial-artifact`: `references/design-languages/editorial-artifact.md`
- `swiss-poster`: `references/design-languages/swiss-poster.md`
- `image-led-magazine`: `references/design-languages/image-led-magazine.md`
- `field-notes`: `references/design-languages/field-notes.md`
- `newsroom-poster`: `references/design-languages/newsroom-poster.md`
- `product-catalog`: `references/design-languages/product-catalog.md`
- `cinematic-still`: `references/design-languages/cinematic-still.md`
- `data-poster`: `references/design-languages/data-poster.md`

Each spec defines:

- required visual anchors
- prohibited elements
- typography strategy
- recommended layout recipes
- text density limits
- image/object/data requirements
- QA criteria

## Modifier Catalog

### Composition Modifiers

- `scale-contrast`: extreme size differences for hierarchy.
- `edge-crop`: crop objects or images at the canvas edge.
- `diagonal-tension`: angled bands, tilted labels, or slanted object stacks.
- `layered-depth`: overlap, stacked sheets, shadows, tape, labels, and depth ordering.
- `split-field`: large filled fields instead of many boxes.
- `asymmetric-space`: unbalanced whitespace that points attention toward the focal point.
- `cutaway`: show an object/system as sliced open or partially revealed.

### Device Modifiers

- `stamp-label`: stamps, tags, seals, labels, tabs, warnings, approvals, or status marks.
- `receipt-form`: receipts, forms, logs, ledgers, manifests, inspection sheets, and checklists.
- `annotation`: callouts, arrows, labels, circled details, figure captions, and margin notes.
- `big-number`: one large number or short metric phrase as the visual anchor.
- `paper-cut`: torn edges, cut paper, scraps, tabs, clipped fragments, or collage layers.
- `map-route`: route lines, paths, milestones, coordinates, or directional systems.

## User-Facing Preset Combinations

Use these as concise choices for the user. Internally map them to language specs and modifiers.

### Technical But Designed

- Primary: `editorial-artifact`
- Load: `references/design-languages/editorial-artifact.md`
- Modifiers: `cutaway`, `annotation`, `stamp-label`
- Theme fit: `product-manual`, `engineering-paper`, `porcelain-research`
- Good for: API, release, security, architecture, tooling

### Magazine Explainer

- Primary: `image-led-magazine`
- Load: `references/design-languages/image-led-magazine.md`
- Modifiers: `edge-crop`, `asymmetric-space`, `annotation`
- Theme fit: `magazine-eink`, `dune-gallery`, `field-notes`
- Good for: product stories, essays, profiles, visual topics

### Bold Thesis

- Primary: `swiss-poster`
- Load: `references/design-languages/swiss-poster.md`
- Modifiers: `scale-contrast`, `split-field`, `big-number`
- Theme fit: `bold-editorial`, `newsroom-paper`, `magazine-eink`
- Good for: opinions, launches, strong hooks, short carousels

### News Incident

- Primary: `newsroom-poster`
- Load: `references/design-languages/newsroom-poster.md`
- Modifiers: `stamp-label`, `split-field`, `big-number`
- Theme fit: `newsroom-paper`, `quiet-report`, `engineering-paper`
- Good for: incidents, releases, factual updates, comparisons

### Archive Dossier

- Primary: `field-notes`
- Load: `references/design-languages/field-notes.md`
- Modifiers: `layered-depth`, `receipt-form`, `paper-cut`
- Theme fit: `kraft-editorial`, `field-notes`, `magazine-eink`
- Good for: history, research, culture, analysis, case studies

### Product Specimen

- Primary: `product-catalog`
- Load: `references/design-languages/product-catalog.md`
- Modifiers: `edge-crop`, `annotation`, `stamp-label`
- Theme fit: `product-manual`, `quiet-report`, `dune-gallery`
- Good for: product features, UI states, tools, how-to explainers

### Cinematic Hook

- Primary: `cinematic-still`
- Load: `references/design-languages/cinematic-still.md`
- Modifiers: `edge-crop`, `asymmetric-space`, `layered-depth`
- Theme fit: `dune-gallery`, `magazine-eink`, dark custom variants
- Good for: narrative openers, launch teasers, cultural hooks, closers

### Data Poster

- Primary: `data-poster`
- Load: `references/design-languages/data-poster.md`
- Modifiers: `scale-contrast`, `big-number`, `split-field`
- Theme fit: `quiet-report`, `newsroom-paper`, `porcelain-research`
- Good for: metrics, benchmarks, reports, survey findings

## Selection Rules

- User can choose a preset combination directly.
- User can choose one primary design language plus modifiers.
- If user asks for "more design", default to `editorial-artifact + scale-contrast + stamp-label` for technical/process content.
- If the user gives no preference, pick the smallest combination that solves the content: one primary language and one composition modifier.
- Keep the combination stable across a card set, but vary the layout recipe and visual anchor per card.
- When mixing two primary languages, designate one as primary and the other as an accent. Example: `image-led-magazine` primary with `data-poster` accent for one metrics card.

## Density Compatibility

Apply `references/taste.md` set-level density rules without violating the selected primary language.

- Raising information density means the set must contain useful detail; it does not mean every card becomes dense.
- If the primary language is low-density, such as `swiss-poster`, `cinematic-still`, or `data-poster`, keep each card within that language's density limit and distribute detail across the set.
- If the user needs a real explainer and the primary language cannot carry enough detail, add a medium-density card using a compatible recipe or secondary accent language.
- Never resolve density by shrinking all text. Add structure: labels, callouts, captions, checklists, observations, or source/context notes.

## QA

During visual review, state:

- Primary design language used.
- Spec file loaded.
- Modifiers used.
- Visual anchor per card.
- Whether the card still relies too much on boxes, grids, or hairlines.

Fail and revise if the selected language cannot be recognized from the screenshot or if a spec's `Must Use` / `Must Not Use` rules are violated.
