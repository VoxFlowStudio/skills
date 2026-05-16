# Magazine Card Adaptations

This reference adapts card-suitable ideas from `op7418/guizang-ppt-skill` without importing its slide runtime, WebGL background, horizontal navigation, or motion system. Use it as a planning aid for editorial card sets that should feel like a compact magazine spread rather than a generic social template.

Source inspiration:

- https://github.com/op7418/guizang-ppt-skill

## What To Reuse

- Editorial shell: small chrome labels, footer metadata, visible page numbers, issue-like naming, and a clear kicker above the main title.
- Typography roles: serif or expressive display for major titles and numbers, sans-serif for dense explanations, monospace for metadata, code, labels, and timestamps.
- Layout archetypes: cover, act divider, big-number card, left-text/right-image, image proof grid, pipeline/process, question closer, big quote, before/after, and lead-image/sidebar text.
- Image discipline: define the image slot first, then source or generate the asset to match that slot. Standardize ratios and crop only the expendable parts.
- Restrained palette families: `magazine-eink`, `porcelain-research`, `field-notes`, `kraft-editorial`, `dune-gallery`, and other paper-first themes from `references/themes/presets.md`.

## What Not To Reuse

- Do not copy the PPT template, slide classes, JavaScript navigation, WebGL shader background, or Motion One animation recipes.
- Do not use viewport-height slide dimensions such as `vh` as the main sizing system. Cards must use fixed pixel canvases and tokenized spacing.
- Do not require one deck-wide theme rhythm for small card sets. Instead, keep all cards visually sibling while varying background emphasis only when it helps pacing.
- Do not use emoji as icons in editorial or technical cards. Prefer text, Lucide icons when already available, simple CSS marks, or numbered labels.

## Card Layout Archetypes

Choose a small set of archetypes before writing HTML. Each card still uses a single fixed `.card` root, but composition can vary within a shared token system.

For stricter implementation guidance, use this alongside `references/layouts/card-layouts.md`. The layout file is the contract; this file explains the editorial adaptation.

### 1. Editorial Cover

Use for card 1 or a one-card poster.

- Structure: chrome/kicker, oversized title, short deck promise, one strong visual signal, footer/source and page number.
- Best for: opinion hooks, product notes, security incidents, launches, explainer covers.
- Card adaptation: keep the title to 2-4 semantic lines. Reserve 20-35% of the canvas for either a visual object or decisive whitespace.

### 2. Section Divider

Use when a carousel has 6+ cards and needs a reset.

- Structure: small act label, one short title, one line of setup, large background word or number.
- Best for: moving from context to method, from problem to solution, or from facts to takeaways.
- Card adaptation: do not overuse. One divider in a 7-card set is usually enough.

### 3. Big Numbers

Use when 2-6 metrics carry the story.

- Structure: title, lead sentence, metric cards with label -> number -> note, compact source line.
- Best for: funding, usage, benchmarks, timelines, incident scale.
- Card adaptation: numbers should be short enough to read at thumbnail size. Use `K`, `M`, `%`, or compact units instead of long raw values.

### 4. Left Narrative + Right Visual

Use for one key argument supported by a photo, screenshot, UI panel, code block, or diagram.

- Structure: left side kicker/title/body/callout; right side image frame with caption.
- Best for: contrast, personal story, product proof, workflow explanation.
- Card adaptation: in square cards, prefer a 60/40 or 55/45 split. In vertical cards, stack title above the visual and keep the callout below.

### 5. Image Proof Grid

Use when multiple screenshots or examples make the claim.

- Structure: title, one-line claim, 2x2, 3x2, or 1x3 image grid, captions.
- Best for: platform evidence, UI variations, before/after examples, research clips.
- Card adaptation: all image frames in the same grid must share one height and crop behavior. Avoid mixing portrait and landscape assets in one grid unless the layout intentionally reserves columns for them.

### 6. Pipeline / Process

Use for ordered steps.

- Structure: process label, title, 3-6 step blocks, optional grouped lanes.
- Best for: release flows, AI workflows, architecture pipelines, content production.
- Card adaptation: no interactive step reveal. Make the sequence readable in one static glance with numbering, arrows, or a continuous rail.

### 7. Question / Closer

Use as a final card or act break.

- Structure: one sharp question or takeaway, short clarifying line, minimal metadata.
- Best for: audience reflection, call to action, memorable closing.
- Card adaptation: preserve whitespace. A closer card should not become a checklist.

### 8. Big Quote

Use for a single idea that deserves weight.

- Structure: large quote or principle, source/attribution, small context note.
- Best for: executive summary, opinion carousel, report takeaway.
- Card adaptation: use a large serif/display blockquote only when the quote is short. Paraphrase long source text instead of squeezing it.

### 9. Before / After

Use for two systems, states, or positions.

- Structure: title, left panel, right panel, shared row labels or mirrored bullet structure.
- Best for: old vs new, myth vs reality, risk vs mitigation, manual vs automated.
- Card adaptation: make the panels symmetrical and keep bullet counts matched when possible.

### 10. Lead Image + Sidebar

Use when the image leads and text explains.

- Structure: large image or diagram, right/bottom sidebar with 3-5 labeled notes.
- Best for: annotated screenshots, maps, systems, product UI, visual case studies.
- Card adaptation: keep annotation labels outside the image when possible so the source asset remains reusable.

## Editorial Shell Rules

- `chrome` is stable metadata: series name, act, date, source class, or page position.
- `kicker` is the unique hook for that card. Do not repeat or translate the same text used in `chrome`.
- Footer/source text should be present when facts, quotes, assets, or research affect the card.
- Page numbers should be stable and visible, but secondary. They should never compete with the headline.
- Background ghost words or numbers are acceptable at very low opacity when they reinforce the topic and do not reduce legibility.

## Image Slot Workflow

Use this when the card set needs photos, screenshots, generated illustrations, diagrams, or UI scenes.

1. Decide which cards truly need images. Do not force images onto text-led cards.
2. For each image card, define the slot before sourcing assets:
   - square card hero image: 1:1, 4:3, 3:2, or 16:10 depending on composition.
   - vertical card hero image: 3:4, 4:5, 9:16 crop, or stacked 3:2 panels.
   - infographic or system diagram: 16:9 or 16:10, usually `fit-contain`.
   - screenshot redesign: 16:10 or 4:3, usually `fit-contain`.
   - proof grid: one shared frame height and one shared crop policy.
3. Use `object-fit: cover; object-position: top center;` for photos and screenshots where the top carries identity or UI chrome.
4. Use `object-fit: contain;` for diagrams, charts, screenshots with important text, or generated infographics.
5. If a real screenshot is too tall, too narrow, or too dense, crop to meaningful panels or regenerate it as a unified UI scene. Do not stretch it into a long strip.
6. Generated image prompts should describe only the asset, not the whole card. Do not ask the image model to create card chrome, page numbers, titles, watermarks, decorative borders, or captions.
7. Save final assets in `cards/<slug>/assets/` and record asset sources or generated-image notes in `sources.md` or `credits.md`.

## Compact Image Prompt Patterns

Use these as short starting points and adapt the language to the card set.

- Documentary photo: `Editorial documentary photo about [scene], natural light, low saturation, real workspace or field context, restrained magazine tone, medium density, leave negative space, no logos or watermark, [ratio].`
- Magazine infographic: `Restrained editorial infographic explaining [concept/process], ink-on-paper palette, fine lines, short readable labels in [language], ample whitespace, no slide title or border, [ratio].`
- Pipeline diagram: `Clean process diagram showing [step 1] to [step 2] to [result], numbered segments, fine arrows, short labels in [language], ink-on-paper editorial style, [ratio].`
- Before/after graphic: `Two-column editorial comparison of [before] versus [after], symmetrical layout, low-saturation accent, short labels in [language], no page chrome, [ratio].`
- UI scene redesign: `Horizontal UI scene based on [workflow/screenshot], paper background, fine grid, subtle annotations in [language], realistic product workflow feel, no fake logo or dashboard glamour, [ratio].`

## Card QA Additions

Add these checks to the normal render audit:

- Chrome and kicker are not semantically redundant.
- Serif/display type is used only for titles, quotes, or numbers; dense explanatory text remains sans-serif.
- Image frames in the same group use consistent dimensions and crop policy.
- No generated image contains its own card title, page number, footer, watermark, or decorative frame.
- Long Chinese titles are manually line-broken at semantic boundaries instead of relying on browser wrapping.
- Decorative background words, grids, and labels stay below the content in visual priority.
