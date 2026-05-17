# Taste Baseline

Global visual quality baseline for every card mold and every design language. Read this file before planning or generating HTML. Treat it as a floor, not a style preset.

Adapted for the VoxFlow `card` skill from the taste rules in `lijigang/ljg-skills`:
https://github.com/lijigang/ljg-skills/blob/master/skills/ljg-card/references/taste.md

## Core Principle

Remove obvious AI-generated design traces.

Hard bans:

- Do not use Inter as the default font.
- Do not use pure black `#000`, `#000000`, or `rgb(0,0,0)`.
- Do not use centered hero layouts by default.
- Do not use three equal cards or three equal columns as the main composition.
- Do not use AI-copy phrases such as "赋能", "无缝", "释放", "下一代", "智能化", "重塑", or "革新" unless they are quoted source material.
- Do not invent fake-looking data such as `99.99%`, `1234567`, `50%`, or generic placeholder metrics.

## Baseline Parameters

Use these as planning defaults unless the user explicitly asks for something else:

- `DESIGN_VARIANCE`: `8`
  - The composition should feel intentionally designed, not perfectly symmetrical.
- `VISUAL_DENSITY`: `5`
  - Default card sets should carry enough information to be useful, not only attractive. Keep editorial breathing room, but avoid making every card a title plus one short sentence.

Adjust by card role:

- Cover, poster, quote, cinematic, or closer card: density `2-4`. These cards earn low density through strong composition, not emptiness.
- Mechanism, explanation, proof, process, or comparison card: density `5-6`. Include a concrete claim plus 2-4 supporting points, labels, or observations.
- Checklist, field-note, product-catalog, how-to, or operational takeaway card: density `6-7`. Include structured detail, but keep the hierarchy scannable.
- Data card: density `5-6`. Use one dominant metric plus 2-3 context notes. Do not create competing metric boxes.
- Long reading card: density `4-5`, calmer color shifts, more reading comfort.
- Infographic card: density `6-7`, larger labels, data-driven structure.

## Information Density

Do not confuse taste with emptiness. Taste baseline reduces generic AI traces; it does not require low-information cards.

Card set requirements:

- A 3-card set should usually follow `hook / explain / takeaway`.
- A 5-card set should usually follow `hook / context / mechanism / evidence / takeaway`.
- A 7-card set should usually follow `hook / context / mechanism / evidence / contrast / action / closer`.
- Every explanatory set must include at least one medium-density information card.
- Do not let every card be only a headline plus one support sentence.

Per-card minimums:

- Low-density cards may have one headline and one short support line only when they are covers, posters, quotes, cinematic frames, or closers.
- Standard explanation cards should include one claim plus 2-4 concrete information points, labels, observations, or steps.
- Operational cards should include a checklist, sequence, comparison, decision rule, or callouts attached to a visible object.
- Data cards should include one dominant number plus context: source, scope, definition, or implication.

Conflict resolution:

- If a primary design language says `Low` or `Very low`, obey that card-level limit, but make another card in the same set carry the useful detail.
- For `swiss-poster`, keep each card low-density; use a sequence of posters to distribute the story across the set.
- For `cinematic-still`, keep cards very low-density; pair it with another language or add a separate explainer card when the user needs details.
- For `data-poster`, keep one dominant metric per card; density comes from context notes, not extra numbers.

## Typography

- Concrete font choices, the per-theme candidate pools, and the weighted-random font-selection algorithm live in `references/fonts.md` (single source of truth). Do not maintain a separate font list here.
- Hard floor only: never default to Inter; all fonts must be locally embedded via `assets/fonts/fonts.css` (no CDN/hotlink); body text avoids pure black.
- Technical dashboard-like cards should use high-quality sans or mono, not decorative serif.
- Large editorial cards may use serif/display titles, but body text should stay readable.
- Body text should avoid pure black. Use charcoal or deep gray such as `#1f1d1a`, `#2f2a24`, `#333333`, or `#4a4a4a`.
- Do not build hierarchy by making the H1 huge and leaving everything else weak. Use contrast, placement, weight, and object scale.
- Dense mobile-facing annotations should remain readable after downscaling. Avoid tiny labels below roughly 22-24px on a 1080px canvas.

## Color

- Use at most one dominant accent color per card unless the content genuinely requires categories or data comparison.
- Avoid saturated AI purple-blue gradients, neon glows, holographic color, and generic tech auroras.
- Keep warm/cool temperature consistent inside one card. Do not mix warm paper, cold gray panels, and random saturated accents.
- Replace pure black with off-black, charcoal, zinc-like darks, or ink colors.
- Background gradients must be subtle. Do not use gradient-filled headline text as a default move.

## Layout

- Avoid centered hero compositions when the card needs design quality. Prefer left alignment, split fields, asymmetry, edge crop, object dominance, diagonal placement, or large negative space.
- Do not use three equal cards, three equal columns, or three equal metric boxes as the main structure. Prefer asymmetric ratios such as `2fr 1fr`, staggered blocks, overlapping objects, or one dominant object plus secondary notes.
- Cards and boxed panels should exist only when they express a real hierarchy or object metaphor. Do not box every idea.
- Data should breathe. Use whitespace, scale, alignment, or dividers before resorting to repeated bordered boxes.
- Shadows should be tinted to the palette, not default gray drop shadows.
- Spacing must look mathematically intentional. Align edges across elements and avoid awkward near-alignments.

## Copy And Data

- Rewrite generic AI copy into concrete claims and verbs.
- Prefer nouns and actions that name the actual subject: "审发布包", "阻断源码目录", "标记 source map".
- Do not use generic placeholder people, brands, or products unless the content is explicitly fictional.
- If numbers are factual, verify or cite them. If numbers are illustrative, label them as synthetic or use them only in test/demo contexts.
- For synthetic demos, use plausible uneven values rather than fake-perfect numbers.

## Surface And Effects

- Avoid outer glows, glass panels, neon blur blobs, and default SaaS shimmer.
- Use material effects only when they support the metaphor: paper folds, labels, tape, stamps, specimen cards, photo crops, catalog objects.
- If glass is deliberately used, it needs physical edge treatment: subtle border, inner highlight, and controlled contrast. Do not rely on blur alone.
- Rounded corners are not a style by themselves. Use radius only when it matches the object or product language.

## Pre-Export Taste QA

Before screenshot export, verify:

- No Inter default font.
- No pure black.
- No centered hero unless explicitly justified.
- No three equal-card layout as the main structure.
- No AI purple-blue gradient or neon glow default.
- No generic AI copy.
- No fake-looking data.
- No meaningless boxes, dashboards, or decorative panels.
- One clear visual anchor dominates every card.
- Spacing and alignment are deliberate.
- Shadows, textures, and surfaces match the palette and metaphor.
