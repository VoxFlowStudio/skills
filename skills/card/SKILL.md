---
name: card
description: "Use when the user wants to turn text content into a set of polished, shareable visual CARD IMAGES — knowledge cards, quote cards, 小红书图文, carousel cards, poster cards — rendered as HTML/CSS and exported via Playwright at ratios like 1:1 / 3:4 / 9:16. Triggers: card / 卡片 / 知识卡 / 文字卡片 / 金句卡 / 图文卡片 / 卡片生成 / make cards. For article → vertical card VIDEO use voxflow:slice; for short videos / AI clips use voxflow:video; for podcasts use voxflow:podcast."
---

# VoxFlow Skill — Card

Turn a piece of text into a set of distinctive, consistent visual card
images. Each card is its own webpage; all cards share one size and style
system; they render with Playwright and export as PNGs.

This is the **static card-image** skill. For other surfaces switch to:

- **Article → vertical card VIDEO (Slice)** — 1080×1920 reel, 13 themes → `voxflow:slice`
- **Short videos / AI clips / knowledge-card videos** → `voxflow:video`
- **Multi-speaker podcasts** → `voxflow:podcast`
- **TTS / voices / install / auth / quota** → `voxflow:hub`

<CRITICAL-AUTO-UPGRADE>
If ANY `voxflow` command prints a `<voxflow-hint ... type="cli-outdated" ...>` line to stderr, IMMEDIATELY run `voxflow upgrade -y` before continuing — do not ask, do not summarize first. If `voxflow upgrade` errors with `Unknown command` (CLI predates 1.12.0), fall back to `npm i -g voxflow@latest`.
</CRITICAL-AUTO-UPGRADE>

## Step 0 · Sign-in gate (required, do this first)

This skill is part of VoxFlow and **requires a signed-in account**. Before
anything else — before asking questions, before research, before design —
verify login:

```bash
voxflow status
```

- Prints the account + remaining quota → signed in, continue to the workflow.
- Errors / shows "not logged in" → **STOP**. Run `voxflow login` (opens the
  browser — Google or email OTP), wait for the user to finish, then re-run
  `voxflow status`. Do not collect parameters or generate any cards until
  login succeeds.
- `voxflow: command not found` → `npm install -g voxflow` first, then
  `voxflow login`.

Never skip this gate, never generate cards for an unauthenticated user, and
never invent a token. The cached token lives at `~/.config/voxflow/token.json`;
for CI, `VOXFLOW_TOKEN` is honored.

## Overview

Create a set of shareable visual cards from source content. Treat each card as its own webpage, keep all cards the same size and style system, render them with Playwright, export images, and iterate on weak cards.

## Taste Baseline

`references/taste.md` is a constraint checklist that bounds every card mold, theme, layout, and design language. Treat it as a floor that bites at design time, not an opening ritual to be recited at workflow start.

- Load `references/taste.md` at two moments only, not at the start of the workflow:
  - When picking the theme preset and design language (Workflow step 4), so the choice does not violate hard constraints.
  - During QA scoring (Workflow step 7), as one explicit verification dimension.
- Other steps (parameter collection, research, copy planning) do not need to reload `references/taste.md`; the constraints flow into them through the preset and language already chosen.
- The core goal is to remove obvious AI-generated design traces.
- Hard constraints include: no default Inter font, no pure black, no default centered hero, no three equal-card composition, no generic AI-copy voice, and no fake-looking data.
- Taste does not mean empty. Use the density rules in `references/taste.md` so real card sets include at least one useful information card unless the user explicitly asks for a poster-only or cinematic-only set.
- If a theme preset or design language conflicts with `references/taste.md`, the taste baseline wins unless the user explicitly asks for the banned style.

## Inputs

Collect or infer:

- `content`: source text, outline, notes, URL, topic, or brief.
- `ratio`: default to `1:1` unless the user requests `3:4`, `9:16`, or another ratio.
- `count`: default to an automatic count based on content density; accept explicit quantities.
- `style`: accept explicit style directions, brand constraints, audience, mood, and platform.
- `content-language`: zh / en / mixed. Infer from the source; ask only when ambiguous and it would change font selection. Drives the language override in `references/fonts.md`.
- `output`: choose a clear local folder such as `cards/<slug>/` unless the user specifies one.

If important facts may be current or disputed, search or verify before planning. Keep source attribution available for the user when research affects the content. See the Research & Fact Confirmation section for when this becomes a full deep-research pass instead of a quick check.

## Research & Fact Confirmation

Insert this between parameter collection and design work, but only when the input cannot stand on its own as the content of the cards.

- Trigger deep research when `content` is any of: a topic phrase, a single sentence brief, a URL whose body has not been read yet, a tweet-length idea, a question, or a request to "explain X / cover X / make cards about X".
- Skip deep research when `content` is already a self-contained article, transcript, set of structured notes, a fully drafted outline, or any text the user clearly wants cards built *from* rather than *about*.
- When triggered, produce a fact outline before any visual planning:
  - Core claim or thesis.
  - 3-7 supporting points with concrete numbers, names, dates, or mechanisms.
  - Sources for each non-trivial fact, with URLs or document references that will land in `sources.md`.
  - Open questions or contested points the user should resolve.
- Present the fact outline to the user and ask for confirmation, additions, or corrections before moving into theme/design-language selection. This is a separate confirmation from the later concept/visual confirmation.
- The output of this step is the "bones" — claims and evidence — not finished card copy. Card-level hooks, explainers, and takeaways are written later during content structuring (step 5) on top of the confirmed bones.
- Record sources gathered here into `sources.md` inside the output folder as soon as the fact outline is confirmed.

### Trigger Examples

Run deep research when:

- "做一组讲 MCP 协议的卡片" — bare topic, no body.
- "把这篇文章做成卡片：https://example.com/post" — URL whose contents have not been read in this conversation.
- "想做一组讲 RAG 优化技巧的卡片,重点放在 chunking 上" — topic + angle, no concrete points or data.
- "Cloudflare Durable Objects 适合什么场景?做几张卡片" — question or "explain X / cover X" framing.
- A single tweet, headline, or one-line brief that names a subject but supplies no evidence.

Skip deep research when:

- The user pastes a full article, blog post, transcript, or interview body (anything roughly 500+ words of self-contained source content).
- The user provides structured notes, meeting minutes, course notes, or a finished outline where each card's title and 2-4 points are already listed.
- The user provides their own finished copy and asks for visual treatment only ("把这段话排成卡片", "美化一下这段文案").
- The user explicitly says "不要查资料 / 直接基于这段写 / 不要扩展", regardless of input length.

### Borderline Inputs

- Short brief + ambition mismatch — e.g., 200-word summary plus "展开成 7 张卡". The brief is too thin to fill the target count, so trigger research and surface that the brief lacks evidence before expanding.
- Article + "再补点最新数据 / 加点案例" — run a scoped research pass only on the requested additions; do not re-research the parts the user already wrote.
- Bullet list with titles but no evidence — e.g., "1. 性能更好 2. 更便宜 3. 更安全". Trigger research to attach concrete numbers or examples; otherwise the cards will read as AI filler.
- Article + the user's own opinion or take — skip research on the source, but confirm with the user whether the opinion should be preserved verbatim or restructured.
- URL whose body has already been fetched and discussed earlier in this conversation — treat as pasted content, skip research, but still write the URL into `sources.md`.

When the input is ambiguous, ask one clarifying question ("这段内容是要直接做成卡片,还是希望我先查资料再展开?") instead of guessing — a wrong research decision wastes either the user's time or the model's research budget.

## Ask User Questions

Ask for missing generation parameters once near the start, before concept planning. Treat "Ask User Questions" as a portable decision policy, not a requirement to call a specific tool. Different coding agents expose different interaction primitives, so the skill must work when structured question tools are present, absent, or discouraged by the agent's operating mode.

- First extract known values for `content`, `ratio`, `count`, `theme/style`, `platform/audience`, and `output/constraints`.
- Ask the user to confirm generation parameters before planning whenever any meaningful choice is still missing. Do this even when the user says "帮我做 / 生成 / 制作 / 直接出图 / quickly export"; those phrases request execution, not silent parameter inference.
- Ask when the answer materially changes the output. Priority order: `content/source intent`, `ratio`, `count`, `theme/style`, `platform/audience`, `output/constraints`.
- Ask at most 3 concise questions by default. Use up to 5 only when the user explicitly wants configuration choices or the output is high-stakes.
- Do not ask again for parameters that are already explicit in the user's original request.
- Skip the question step only when the user explicitly says not to ask questions or explicitly approves default parameters. In that case, use defaults and state the assumptions briefly before or during execution.

### Compatibility Strategy

Use the current environment's best available question mechanism:

- If the environment supports `ask_user_question`, `ask question`, or an equivalent native clarification capability, use that native interaction to clarify blocking questions.
- If the environment does not support a native question capability, ask directly in normal conversation.
- Ask at most 2-5 questions at a time.
- If missing information does not block the task, still ask once for confirmation of the parameters that affect the final output. If the user has already approved defaults or asked for no questions, make reasonable assumptions and continue.
- Explicitly list important assumptions in the final response, `sources.md`, or `credits.md`.

### Stop Conditions

Stop and ask before generation only when one of these is true:

- There is no usable `content`, topic, URL, or source material.
- The source intent is ambiguous and choosing wrong would waste the work, for example "use this text as-is" versus "research and expand this topic".
- The requested ratio/platform is contradictory or impossible to satisfy with a single export.
- The visual direction is governed by brand, legal, accessibility, or exact-copy constraints that are missing.
- Research finds contested facts that would change the core claim.

Otherwise, ask once for confirmation of meaningful generation parameters, then proceed with documented assumptions and record them in `sources.md` or the final response.

### Ratio Question

Use these default choices:

- `1:1` square card for general social sharing.
- `3:4` vertical graphic card for richer text/image posts.
- `9:16` story, reel, short-video cover, or mobile-first card.

Accept free-form ratios such as `4:5`, `16:9`, or exact pixel sizes when the user provides them.

### Count Question

Use these default choices:

- Auto-recommend based on the content.
- `3` cards for a compact narrative.
- `5` cards for a standard explainer.
- `7` cards for a fuller carousel.

When auto-recommending, choose the smallest set that covers the idea without crowding. Prefer 3-7 cards for explainers and 1-3 cards for announcements.

### Theme Question

Do not expose the full preset catalog directly to the user. Load `references/themes/presets.md` and, when visual direction matters, `references/design-languages.md`; then recommend 3-5 scenario-based style options based on the content, platform, audience, and sharing goal. Map the user's chosen scenario to the final theme preset and design-language combination internally.

When asking the user to choose a style, do not present only one recommendation plus a vague "or change it?" question. Give 3-5 concrete options, each with:

- a short user-facing style name;
- the situation where it works best;
- a one-line visual description;
- the internal theme preset and design-language mapping.

Use a two-layer selection logic so outputs stay appropriate without collapsing into the same few looks:

1. Default recommendation layer:
   - Offer 3-5 high-fit styles based on content type, platform, audience, and sharing goal.
   - Keep the recommended set close enough to the user's task that any option can succeed without heavy rework.
   - Prefer options that differ in visible outcome, not just token names. For example: conservative report, data poster, social notebook, magazine explainer, bold opinion.

2. Variant perturbation layer:
   - When the user has not strongly specified an exact style, rotate within the compatible family instead of always selecting the top default.
   - Vary at least two of these dimensions across similar tasks: theme preset, primary design language, modifiers, layout recipes, visual anchors, surface metaphor, or title composition.
   - Keep perturbations semantically compatible with the content. Do not use random novelty that fights the topic, platform, accessibility, or factual clarity.
   - Record the final selected combination in the concept plan or `sources.md` / `credits.md` so the variation is inspectable.

Use user-facing scenario labels such as:

- Engineering infographic: map to `engineering-paper`, `product-manual`, or `porcelain-research`.
- Business briefing: map to `quiet-report`, `product-manual`, or `porcelain-research`.
- Bold opinion: map to `bold-editorial`, `magazine-eink`, or `newsroom-paper`.
- Social product note: map to `social-notebook`, `magazine-eink`, or `bold-editorial`.
- Editorial / magazine: map to `magazine-eink`, `dune-gallery`, `field-notes`, or `kraft-editorial`.

For design-language choices, use user-facing scenario labels such as:

- Technical but designed: map to `editorial-artifact + cutaway + annotation`.
- Magazine explainer: map to `image-led-magazine + edge-crop + asymmetric-space`.
- Bold thesis: map to `swiss-poster + scale-contrast + split-field`.
- News incident: map to `newsroom-poster + stamp-label + big-number`.
- Archive dossier: map to `field-notes + layered-depth + receipt-form`.
- Product specimen: map to `product-catalog + edge-crop + annotation`.
- Data poster: map to `data-poster + scale-contrast + big-number`.

After the user chooses, state the selected theme direction, final preset, design-language combination, and why it fits before moving into the concept plan.

## Design Context

Prefer existing design context over inventing a new visual system.

- Always load `references/taste.md` before choosing visual direction. Carry its anti-AI-trace rules into the visual DNA summary.
- Before planning the cards, look for any user-provided or local brand assets, previous card sets, screenshots, Figma/UI kit references, project design systems, existing webpages, or code styles that should influence the result.
- When the user asks for an editorial, magazine, e-ink, presentation-inspired, or image-heavy card style, load `references/magazine-card-adaptations.md` and apply only the card-suitable parts: editorial shell, compact layout archetypes, restrained ink/paper palettes, and image slot workflow.
- When the card set needs stronger design, or when the style is not explicitly minimal, load `references/layouts/card-layouts.md` and use it as the layout contract before writing HTML.
- When the card set needs stronger design, style variation, or user-selectable visual directions, load `references/design-languages.md` and choose a primary design language plus 1-2 modifiers.
- Extract a compact visual DNA summary: palette, typography feel, information density, border radius, shadow/depth, image or illustration treatment, layout rhythm, and copy tone.
- If no reliable design context is available, derive the visual direction from the content, audience, platform, and requested mood, and state that assumption in the plan.

## Theme Presets

Use theme presets as starting points, not as copied CSS. Define a fresh token block for each card set and adapt the palette to the content.

- Apply `references/taste.md` before theme selection. A preset can suggest palette and mood, but it cannot reintroduce Inter, pure black, centered hero defaults, three equal cards, AI purple-blue gradients, neon glows, fake data, or AI-copy voice.
- Load `references/themes/presets.md` when the user asks for style options, when the style is ambiguous, or when the card set needs a clear visual direction.
- Use 3-5 scenario-based theme options before coding when appropriate. Do not list the full preset catalog to the user.
- Convert the selected scenario direction into a final preset from the catalog, then adapt it with fresh local tokens.
- Do not copy external theme CSS wholesale. Recreate the needed palette and behavior in the local card style.

Default recommendation rules:

- Technical, API, architecture, or infrastructure content: prefer `engineering-paper`; alternatives are `product-manual` and `porcelain-research`.
- News, releases, product updates, changelogs, or incidents: prefer `newsroom-paper`; alternatives are `quiet-report` and `engineering-paper`.
- Business, fundraising, growth, or product narrative: prefer `quiet-report`; alternatives are `product-manual` and `porcelain-research`.
- Opinion, commentary, or strong shareable hook: prefer `bold-editorial`; alternatives are `magazine-eink` and `newsroom-paper`.
- Xiaohongshu, lifestyle, or consumer product content: prefer `social-notebook`; alternatives are `magazine-eink` and `bold-editorial`.
- Editorial, talk-summary, longform, culture, essay, or premium carousel content: prefer `magazine-eink`; alternatives are `dune-gallery`, `field-notes`, and `kraft-editorial` based on topic.
- CLI, security, or terminal tools: prefer `engineering-paper`, `product-manual`, or `newsroom-paper`; use `terminal-green` only when the user explicitly asks for a terminal look.
- Do not default to neon, cyberpunk, terminal, glowing dark dashboards, or blue-purple AI gradients unless the user explicitly asks for that visual language.

## Editorial Magazine Mode

Use `references/magazine-card-adaptations.md` when the card set should borrow from presentation or magazine design. This mode is inspired by `op7418/guizang-ppt-skill`, but adapted for static card exports.

- Reuse only card-appropriate ideas: editorial chrome, footer metadata, visible page numbers, serif/display title hierarchy, monospace metadata, restrained ink/paper palettes, and compact layout archetypes.
- Do not reuse slide-specific behavior: horizontal navigation, WebGL backgrounds, Motion One reveal systems, `vh`-driven slide sizing, or PPT-only class names.
- Before coding, choose the archetype for each card: editorial cover, section divider, big numbers, left narrative + right visual, image proof grid, pipeline/process, question closer, big quote, before/after, or lead image + sidebar.
- Treat `chrome` and `kicker` as different content roles. `chrome` is stable metadata or series navigation; `kicker` is the unique hook for that card. They must not repeat the same idea.
- If images are involved, define the image slot and ratio before sourcing or generating the asset. Generated images are card assets only; they must not include titles, page numbers, watermarks, captions, or card borders.

## Layout Contract

Use `references/layouts/card-layouts.md` whenever the output should have visible design quality, not just readable information.

- Apply `references/taste.md` as the first layout filter. Reject centered hero defaults and three equal-card layouts unless the user explicitly asks for them and the choice is justified.
- Before writing HTML, create a one-row-per-card layout plan with: card role, layout recipe, visual anchor, text density, asset slot, and layout risk.
- Plan information density at the set level. A real explainer set should not have every card at low density; include at least one mechanism, proof, checklist, comparison, or takeaway card with 2-4 concrete points.
- A visual anchor is mandatory for every card. It can be typography, a number, image, artifact, diagram, form, stamp, map, screenshot, or custom CSS object. If the anchor is "none", redesign the card concept.
- For 1-3 cards, use at least 2 layout recipes. For 4-7 cards, use at least 3. For 8+ cards, use at least 4 and add reset cards every 3-4 cards.
- Avoid repeating `headline + equal grid + footer` across the set. Shared style is good; repeated composition is not.
- Avoid making fine lines, coordinate grids, and boxed panels the default design language. Use them only as support for a stronger visual anchor.
- Prefer composition moves such as crop, overlap, diagonal placement, scale contrast, cutaway shapes, stamps, labels, tapes, large image/object anchors, and asymmetric whitespace.
- During concept planning, present the layout plan when layout/design quality is a concern. During final QA, name the actual layout used for each rendered card.

## Design Language System

Use `references/design-languages.md` to define the card set's visual grammar independently from the theme preset.

- A theme preset controls palette and type tone; a design language controls composition, focal devices, visual metaphors, texture, and pacing.
- Choose 1 primary design language and optionally 1-2 modifiers. Do not combine more than 3 languages/modifiers unless the user asks for eclectic variation.
- After choosing a primary design language, load its individual spec file from `references/design-languages/<name>.md` and follow its `Must Use`, `Must Not Use`, typography, layout, density, asset, and QA rules.
- Supported primary languages include `editorial-artifact`, `swiss-poster`, `image-led-magazine`, `field-notes`, `newsroom-poster`, `product-catalog`, `cinematic-still`, and `data-poster`.
- Supported modifiers include `scale-contrast`, `edge-crop`, `diagonal-tension`, `layered-depth`, `split-field`, `asymmetric-space`, `cutaway`, `stamp-label`, `receipt-form`, `annotation`, `big-number`, `paper-cut`, and `map-route`.
- Users may choose a preset combination such as Technical but designed, Magazine explainer, Bold thesis, News incident, Archive dossier, Product specimen, or Data poster.
- Keep the design-language combination stable across the set, but vary layout recipes and visual anchors per card.
- When a card set mixes multiple primary languages, designate one primary language for the whole set and use other languages only as card-level accents.

## Workflow

1. Collect parameters and ask user questions when needed.
   - Extract known parameters from the original request and do not repeat them.
   - Apply the Ask User Questions policy: infer low-risk defaults, ask only for true blockers, and adapt to the current agent's interaction mode.
   - Do not read `references/taste.md` at this step; it is loaded later in step 4 (theme/language selection) and step 7 (QA).
   - Skip the question step only when the user explicitly asked for no questions or explicitly approved defaults. Direct generation, quick export, or "帮我做" requests still require one early parameter confirmation when meaningful choices are missing.

2. Conditional deep research and fact outline confirmation.
   - Apply the trigger rules in Research & Fact Confirmation: run a research pass when the input is a topic, URL, brief, question, or "make cards about X" request; skip when the input is already a full article, transcript, structured notes, or finished outline.
   - When triggered, produce the fact outline (core claim, 3-7 supporting points with concrete data, sources, open questions). Present it to the user and wait when the facts, framing, or scope may change the card narrative; otherwise record clear and uncontested facts with sources after the initial parameter confirmation.
   - Treat this confirmation as separate from the later visual/concept confirmation in step 6 when the workflow is confirmation-led. In execution-first workflows, turn it into a short progress update instead of a blocking gate unless Stop Conditions apply.
   - Save confirmed sources into `sources.md` in the output folder.
   - Skip entirely when not triggered, or when the user explicitly asked to proceed without research.

3. Expand and structure the content.
   - Extract the core message, audience, emotional hook, claims, and supporting points from the confirmed bones (or directly from the input if step 2 was skipped).
   - If `count` is missing, choose the smallest number of cards that covers the idea without crowding; prefer 3-7 cards for explainers and 1-3 cards for announcements.
   - Decide a title, subtitle, and key visual idea for every card.
   - Decide the set-level density arc before writing final copy. For 3 cards, default to `hook / explain / takeaway`; for 5 cards, default to `hook / context / mechanism / evidence / takeaway`; for 7 cards, default to `hook / context / mechanism / evidence / contrast / action / closer`.
   - Unless the user wants poster-only cards, include at least one card with a concrete claim plus 2-4 supporting points, labels, observations, steps, or callouts.
   - Remove AI-copy phrases, generic placeholder brands/names, and fake-looking numbers during copy planning.

4. Pick the theme preset and design language, then build the layout plan.
   - Load `references/taste.md` now and read it as an active checklist; the hard constraints apply to every subsequent design decision in this step.
   - Confirm or revisit the theme preset chosen in step 1 against the taste baseline; if a preset would violate a hard constraint, swap it before continuing.
   - Apply the two-layer style selection logic: first choose from the high-fit recommendation set, then apply a compatible variant perturbation when the user did not specify an exact style.
   - The perturbation must affect the visible result, not only metadata. Rotate layout recipes, visual anchors, surface metaphors, and composition moves alongside theme / design-language tokens.
   - Assign one concrete layout recipe per card. For stronger design work, use `references/layouts/card-layouts.md`; for magazine/editorial cards, also use `references/magazine-card-adaptations.md`.
   - Assign a design-language combination when the style is open or the user wants more design variation. Load the individual spec file for the selected primary language from `references/design-languages/<name>.md`.
   - Load `references/fonts.md` and run its font-selection algorithm: from the chosen preset × design-language × content-language, take the per-role candidate pools, apply hard-constraint filtering, then weighted-random pick one font per role for the whole set (seed the randomness with the output slug so a given set is reproducible but different topics vary). Record the selected display/serif/sans/mono families in `sources.md`.
   - For each card, identify the visual anchor and composition move before writing body copy. If the card is only text blocks, equal boxes, or a background grid, either choose a stronger layout or deliberately mark it as a low-design utility card.
   - Respect low-density primary language limits by moving detail to another card in the set, not by overloading `swiss-poster`, `cinematic-still`, quote, cover, or closer cards.

5. Plan concepts and request confirmation.
   - Present the resolved ratio, card count, selected theme direction and preset, selected design language/modifiers, content outline, and first-card concept.
   - When layout quality matters, include the layout plan: card role, layout recipe, visual anchor, composition move, text density, and asset slot.
   - State which card carries the useful detail when the cover or primary language is intentionally low-density.
   - Make card 1 a precise high-impact cover: it must communicate the topic instantly, create curiosity, and feel worth opening and sharing.
   - Concept confirmation covers only the cover concept, content outline, and visual direction. Do not repeat questions about already-resolved ratio, count, theme, platform, or output constraints.
   - When the task is high-impact or the style is ambiguous after the question step, offer 3-5 visual directions before coding. Cover distinct options such as brand-aligned/conservative, structured/information-graphic, social-friendly, magazine/editorial, and bolder/shareable.
   - For each direction, describe the cover concept, overall visual language, and the situation where it works best.
   - Skip concept variations when the user already specified the visual style, explicitly asked to proceed without confirmation, or needs a fast direct export.
   - Ask the user to confirm before coding when Stop Conditions apply or when the concept direction may materially change the output. If the user already confirmed parameters and the concept follows those choices, state the concept briefly as a progress update and continue into implementation.

6. Build the card webpages.
   - Create one HTML page per card, named predictably such as `card-01.html`, `card-02.html`.
   - Use one shared CSS file or shared design tokens so size, typography, spacing, palette, border radius, and component styling stay consistent.
   - Choose fonts via the `references/fonts.md` selection algorithm decided in step 4; embed them locally by importing `assets/fonts/fonts.css` (or copying the used fonts into `cards/<slug>/assets/fonts/` and referencing them with local `@font-face`). Never load fonts from a CDN. Choose colors that satisfy `references/taste.md`: do not default to Inter, do not use pure black, and avoid generic AI purple-blue gradients or neon glow effects.
   - Set an explicit fixed canvas size derived from the ratio. Recommended bases:
     - `1:1`: `1080x1080`
     - `3:4`: `1080x1440`
     - `9:16`: `1080x1920`
     - Custom `a:b`: use width `1080` and height `round(1080*b/a)` unless the user requests exact pixels.
   - Keep every card inside a single fixed-size `.card` root. Do not allow body scrolling.
   - Use real HTML/CSS text instead of baking text into images.
   - Use the same style language across cards; vary composition only enough to fit content.
   - Define shared layout primitives in CSS for the selected recipes before implementing individual cards. Each card should have a recognizable layout parent class such as `.layout-cover`, `.layout-split`, `.layout-artifact`, `.layout-rail`, `.layout-compare`, `.layout-quote`, or `.layout-checklist`.
   - For editorial magazine mode, build the shell with card-native classes in the local CSS. Do not paste PPT layout classes unless they are defined and adapted in the card set's CSS.

7. Score and regenerate each card.
   - Reload `references/taste.md` and read it as the QA acceptance checklist before scoring; do not score from memory.
   - Render and screenshot every card before judging it.
   - Score each card on:
     - Boundary: no obvious clipping, unintended scrollbars, text outside the canvas, or important elements touching edges.
     - Color: palette is legible, attractive, intentional, and consistent with the requested style.
     - Layout: hierarchy is clear, whitespace is balanced, and content density fits the ratio.
     - Information value: the set has at least one card with actionable or concrete detail, not only atmospheric headlines; any low-density card is justified by role or primary language.
     - Layout contract: the planned visual anchor is present and dominant enough, the recipe can be recognized from the screenshot, and the set does not repeat the same composition card after card.
     - Design expression: the card does not rely mainly on fine lines, grids, and boxed panels; those elements must be secondary to the visual anchor.
     - Design language: the selected primary language and modifiers are recognizable from the screenshot, and the relevant spec file's `Must Use` / `Must Not Use` rules are satisfied.
     - Taste baseline: every hard constraint in `references/taste.md` is satisfied — no Inter default, no pure black, no default centered hero, no three equal-card main layout, no AI-copy voice, no fake-looking data, no neon/glow AI aesthetics.
     - Editorial discipline when applicable: chrome and kicker are not redundant, image frames share consistent crop rules, and generated assets do not contain their own slide/card chrome.
   - If any category fails, revise that card and rerender. Limit each card to 3 repair rounds.
   - If a card still fails after 3 rounds, report the remaining risk and keep the best version.

8. Export final images.
   - Use Playwright screenshots, not browser manual screenshots.
   - Export one PNG per card with stable names such as `card-01.png`.
   - Default to 2x screenshot exports for sharpness. A `1080x1080` card should export as a `2160x2160` PNG unless the user explicitly asks for smaller files or `--scale 1`.
   - Provide the user with the output paths and a concise summary of the final ratio, count, and style.

## Asset and Source Discipline

- Keep generated files contained in the requested output folder.
- Place any local images, logos, screenshots, textures, icons, or other assets used by the cards in `cards/<slug>/assets/` unless the user specifies another output path.
- Record research sources, external asset sources, and important factual references in `sources.md` or `credits.md` inside the output folder.
- Do not rely on external hotlinked assets for final exports. External URLs may be used during research or temporary preview only.
- Copy only the minimum assets actually used by the card set; do not bulk-copy unrelated asset folders.
- For generated or redesigned card images, record the prompt intent, model/tool if known, and whether the asset is synthetic in `sources.md` or `credits.md`.

## Rendering Helper

Use `scripts/render-cards.mjs` when a project does not already have an equivalent Playwright export script.

```bash
node /path/to/card/scripts/render-cards.mjs \
  --input ./cards/my-set \
  --output ./cards/my-set/exports \
  --ratio 9:16
```

The helper defaults to `--scale 2` for sharper PNG output. Use `--scale 1` only when file size matters more than edge sharpness.

The script:

- Scans the input folder for `.html` files.
- Sets the viewport from `--ratio` or `--size`.
- Screenshots `.card` when present, otherwise the viewport.
- Writes PNG files to the output folder.
- Writes `audit.json` with DOM overflow and out-of-bounds signals.

If Playwright is missing in the target project, install or use it with the local package manager, then install Chromium as needed:

```bash
npm install -D playwright
npx playwright install chromium
```

## Implementation Rules

- Keep all cards visually siblings: shared tokens, shared base layout, shared type scale, shared image treatment.
- Apply `references/taste.md` as the binding floor during the design step (Workflow step 4) and the QA step (Workflow step 7), including tests and demos. Do not skip these two loads even on fast paths.
- Prefer existing design context over inventing a new visual system.
- Use concept variations before coding when style is ambiguous or the card set is high-impact.
- Define theme tokens first: background, surface levels, border levels, text levels, accent trio, semantic colors, gradients, radius, shadow, and fonts.
- Use tokens in component CSS. Avoid scattering literal colors outside the token block unless a one-off asset or data visualization genuinely requires it.
- Do not use Inter as the default card font. Select concrete fonts via the weighted-random algorithm in `references/fonts.md` (preset × design-language × content-language → per-role pick). Do not hardcode a font list here; `references/fonts.md` is the single source of truth. Avenir Next and other paid/system fonts are disallowed because every font must be locally embeddable.
- Do not use pure black. Use off-black, charcoal, zinc-like darks, or ink colors.
- Do not copy external theme CSS wholesale. Recreate the needed palette and behavior in the local card style, and keep source inspiration in `sources.md` or `credits.md` when relevant.
- Avoid one-note palettes unless the user explicitly asks for a monochrome look.
- Fit text by editing, grouping, or changing layout before shrinking everything.
- Do not make every card low-density. For real explainers, at least one card should carry structured information: 2-4 points, labels, observations, steps, callouts, or decision criteria.
- Do not add density by shrinking text everywhere. Add structure first: grouping, hierarchy, labels, side notes, checklists, captions, or object-attached callouts.
- Replace AI-copy voice with concrete language. Avoid "赋能", "无缝", "释放", "下一代", "智能化", "重塑", and similar filler unless quoted from source material.
- Do not invent fake data. Use verified facts with sources, clearly synthetic demo values, or no numbers.
- Use responsive CSS only for development preview; the export canvas must remain fixed.
- Prefer semantic HTML and CSS over canvas for card content unless the visual requires custom drawing.
- Keep assets and source attribution inside the output folder.
- Keep letter spacing at `0` unless the file's existing design system clearly requires uppercase tracking; do not use negative letter spacing.
- For technical or dense cards, keep body copy in sans-serif and reserve serif/display type for headlines, quotes, and numbers. Editorial/literary presets (`magazine-eink`, `field-notes`, `kraft-editorial`) may use serif or kai (楷体) body per `references/fonts.md`. For editorial layouts, manually control long Chinese title breaks regardless of the body typeface.
- For image-heavy cards, standardize image ratios or frame heights inside each group, crop from the bottom when using `cover`, and use `contain` for diagrams or text-bearing screenshots.
- Do not skip visual verification. The final answer must state whether rendering and export succeeded.
