# Theme Presets

Use these presets as palette and composition starting points for card sets. The default taste should be closer to magazines, reports, field notes, product manuals, and printed matter than to generic AI SaaS visuals.

## Anti-AI-Template Rule

When style is ambiguous, avoid the usual AI-card signals:

- neon blue/purple gradients, aurora blobs, glowing dark dashboards, terminal green, cyberpunk grids, fake glass panels, and excessive black backgrounds.
- generic "AI future" imagery, robot hands, abstract brain networks, floating chips, holographic UI, and meaningless data particles.
- one-note blue/purple palettes or pitch-deck gradients unless the user explicitly asks for them.

Prefer restrained paper color, readable ink, real editorial hierarchy, purposeful whitespace, and one or two quiet accent colors.

## Anti-Plain-Template Rule

Removing AI cliches is not enough. Do not replace them with a plain system of hairlines, coordinate grids, and repeated boxes.

- Do not use a full-card grid background as the default texture.
- Do not make every content item a bordered rectangle.
- Do not rely on thin rules and small mono labels as the main source of "design".
- Prefer large filled fields, cropped objects, image-led composition, typographic scale contrast, torn-paper shapes, stamps, labels, bands, and asymmetric layouts.
- Use lines and borders sparingly, as accents around a stronger visual anchor.

## Token Model

Every card set should define a compact theme token block before component styling:

- `--bg`, `--bg-soft`
- `--surface`, `--surface-2`
- `--border`, `--border-strong`
- `--text-1`, `--text-2`, `--text-3`
- `--accent`, `--accent-2`, `--accent-3`
- `--good`, `--warn`, `--bad`
- `--grad`, `--grad-soft`
- `--radius`, `--radius-sm`, `--radius-lg`
- `--shadow`, `--shadow-lg`
- `--font-sans`, `--font-serif`, `--font-mono`, `--font-display` — do not hardcode font names here; their values come from the `references/fonts.md` selection algorithm (preset × design-language × content-language → weighted-random pick), embedded locally via `assets/fonts/fonts.css`.

Use tokens in component CSS. Avoid scattering literal colors outside the token block unless a one-off asset or data visualization genuinely requires it.

## Primary Preset Catalog

### `magazine-eink`

Ink-black on warm paper, serif/display headlines, sans-serif body, mono metadata, minimal borders.

Use for editorial carousels, talk summaries, longform explainers, essays, culture, creator narratives, and premium text-led cards.

Suggested tokens:

- `--bg: #f1efea`
- `--bg-soft: #e8e5de`
- `--surface: #fbfaf6`
- `--surface-2: #f4f1ea`
- `--border: rgba(10, 10, 11, 0.18)`
- `--border-strong: #0a0a0b`
- `--text-1: #0a0a0b`
- `--text-2: #3f3d39`
- `--text-3: #777169`
- `--accent: #18181a`
- `--accent-2: #8f5b34`
- `--accent-3: #b8aa8c`

### `porcelain-research`

Deep indigo ink on porcelain white, cool but not neon, with precise rules and quiet contrast.

Use for technology, research, data analysis, academic-feeling explainers, serious product narratives, and technical topics that should not look like a hacker poster.

Suggested tokens:

- `--bg: #f1f3f5`
- `--bg-soft: #e4e8ec`
- `--surface: #fbfcfd`
- `--surface-2: #edf2f6`
- `--border: rgba(10, 31, 61, 0.18)`
- `--border-strong: #0a1f3d`
- `--text-1: #0a1f3d`
- `--text-2: #3b526d`
- `--text-3: #76879a`
- `--accent: #174f9a`
- `--accent-2: #6f8fb4`
- `--accent-3: #c2a35f`

### `newsroom-paper`

White and light gray editorial base, black text, measured red accent, hard information blocks.

Use for news, incidents, releases, comparisons, urgency, public statements, and factual explainers.

Suggested tokens:

- `--bg: #f7f7f5`
- `--bg-soft: #ececea`
- `--surface: #ffffff`
- `--surface-2: #f0f0ee`
- `--border: rgba(20, 22, 24, 0.16)`
- `--border-strong: #141618`
- `--text-1: #141618`
- `--text-2: #4b5055`
- `--text-3: #7b8085`
- `--accent: #c9342c`
- `--accent-2: #2f5f86`
- `--accent-3: #c9a451`

### `quiet-report`

Clean report style with off-white background, charcoal/navy text, modest blue accent, and conservative spacing.

Use for B2B, operations, finance, board updates, enterprise product messaging, and formal summaries.

Suggested tokens:

- `--bg: #f6f7f4`
- `--bg-soft: #ebeee9`
- `--surface: #ffffff`
- `--surface-2: #eef2f3`
- `--border: rgba(26, 39, 52, 0.15)`
- `--border-strong: #1a2734`
- `--text-1: #1a2734`
- `--text-2: #4a5a66`
- `--text-3: #7d8a92`
- `--accent: #2d647f`
- `--accent-2: #7d8b68`
- `--accent-3: #c0a062`

### `product-manual`

Instruction-manual feel: warm white, graphite text, practical diagrams, object labels, stamps, and large artifact metaphors.

Use for product notes, how-to guides, API explainers, workflows, checklists, and developer education.

Suggested tokens:

- `--bg: #f4f1ea`
- `--bg-soft: #e7e2d8`
- `--surface: #fffdf8`
- `--surface-2: #ece8df`
- `--border: rgba(32, 38, 42, 0.18)`
- `--border-strong: #20262a`
- `--text-1: #20262a`
- `--text-2: #4e565b`
- `--text-3: #7f8587`
- `--accent: #3b6f75`
- `--accent-2: #9a6b37`
- `--accent-3: #c7b474`

### `engineering-paper`

White engineering paper, navy ink, sparse mono labels, precise diagrams, and strong technical artifacts. Do not default to full-canvas coordinate grids.

Use for architecture, system design, infrastructure, API flows, technical documentation, and engineering explainers.

Suggested tokens:

- `--bg: #f7f8f3`
- `--bg-soft: #eef3f6`
- `--surface: #ffffff`
- `--surface-2: #edf3f8`
- `--border: rgba(17, 36, 58, 0.16)`
- `--border-strong: #11243a`
- `--text-1: #102033`
- `--text-2: #3f566b`
- `--text-3: #708292`
- `--accent: #1468a8`
- `--accent-2: #8a7044`
- `--accent-3: #c9a24e`

### `field-notes`

Ivory paper, forest ink, muted green and clay accents, calm non-fiction tone.

Use for sustainability, culture, public-interest explainers, field research, community, and reflective narratives.

Suggested tokens:

- `--bg: #f5f1e8`
- `--bg-soft: #ece7da`
- `--surface: #fffaf0`
- `--surface-2: #eee8d9`
- `--border: rgba(26, 46, 31, 0.18)`
- `--border-strong: #1a2e1f`
- `--text-1: #1a2e1f`
- `--text-2: #485849`
- `--text-3: #7f8979`
- `--accent: #2f6d4f`
- `--accent-2: #8b6b3e`
- `--accent-3: #c9b276`

### `kraft-editorial`

Warm kraft paper, dark brown ink, archival texture, independent-magazine warmth.

Use for history, reading notes, handmade brands, personal essays, retro product stories, and literary cards.

Suggested tokens:

- `--bg: #eedfc7`
- `--bg-soft: #e0d0b6`
- `--surface: #f8ecd8`
- `--surface-2: #ead8bb`
- `--border: rgba(42, 30, 19, 0.2)`
- `--border-strong: #2a1e13`
- `--text-1: #2a1e13`
- `--text-2: #604c38`
- `--text-3: #8e7b64`
- `--accent: #8f4b28`
- `--accent-2: #2f5d50`
- `--accent-3: #b9894a`

### `dune-gallery`

Charcoal ink on sand paper, restrained gallery tone, neutral premium feel.

Use for design, art, architecture, brand studies, portfolio stories, and aesthetic-first cards.

Suggested tokens:

- `--bg: #f0e6d2`
- `--bg-soft: #e3d7bf`
- `--surface: #fbf3e3`
- `--surface-2: #eadcc4`
- `--border: rgba(31, 26, 20, 0.18)`
- `--border-strong: #1f1a14`
- `--text-1: #1f1a14`
- `--text-2: #51483d`
- `--text-3: #817768`
- `--accent: #6f6255`
- `--accent-2: #a06445`
- `--accent-3: #c9b171`

### `social-notebook`

Warm white, soft red/clay accents, light paper shadows, approachable but still editorial.

Use for Xiaohongshu, creator notes, consumer product tips, lightweight education, and friendly explainers.

Suggested tokens:

- `--bg: #fbf7f2`
- `--bg-soft: #f2e9e2`
- `--surface: #ffffff`
- `--surface-2: #fff2ef`
- `--border: rgba(86, 54, 46, 0.14)`
- `--border-strong: #56362e`
- `--text-1: #302421`
- `--text-2: #6a5650`
- `--text-3: #9a8982`
- `--accent: #c75f55`
- `--accent-2: #7a8b62`
- `--accent-3: #d7b77a`

### `bold-editorial`

Cream paper, black editorial type, one warm spot color, strong cover energy without synthetic gradients.

Use for opinion pieces, columns, hot takes, cultural topics, strong hooks, and shareable argument cards.

Suggested tokens:

- `--bg: #f3eadb`
- `--bg-soft: #e7dac7`
- `--surface: #fff7ea`
- `--surface-2: #eadcc8`
- `--border: rgba(15, 14, 13, 0.22)`
- `--border-strong: #0f0e0d`
- `--text-1: #0f0e0d`
- `--text-2: #4b4037`
- `--text-3: #807266`
- `--accent: #d65f2d`
- `--accent-2: #2f5d6b`
- `--accent-3: #d5aa4b`

## Legacy Motifs

These names may appear in older card sets. Do not recommend them by default because they often create a generic AI-template feel.

- `tokyo-night`: only use if the user explicitly asks for a dark code-editor mood.
- `terminal-green`: only use for command-reference cards or intentionally retro terminal artifacts.
- `neo-brutalism`: only use if the user explicitly wants a loud youth-campaign look.
- `blueprint`: prefer `engineering-paper` unless the user asks for a dark blueprint.
- `pitch-deck-vc`: prefer `quiet-report` or `product-manual` unless the user asks for startup deck styling.
- `soft-pastel`: prefer `social-notebook` unless the user asks for soft consumer colors.
- `xiaohongshu-white`: prefer `social-notebook`; keep this as a platform-specific alias.
- `corporate-clean`: prefer `quiet-report`; keep this as a conservative-report alias.
- `news-broadcast`: prefer `newsroom-paper`; keep this as a higher-urgency alias.
- `engineering-whiteprint`: prefer `engineering-paper`; keep this as a technical-paper alias.
- `magazine-bold`: prefer `bold-editorial`; keep this as an older alias.
- `editorial-serif`: prefer `magazine-eink`; keep this as an older alias.

## Scenario Mapping

When the style is ambiguous, recommend 2-3 user-facing directions and map them internally to presets:

- Business/report: `quiet-report`, `product-manual`, `porcelain-research`.
- Engineering/API/system: `engineering-paper`, `product-manual`, `porcelain-research`.
- Social/Xiaohongshu: `social-notebook`, `magazine-eink`, `bold-editorial`.
- News/update/incident: `newsroom-paper`, `quiet-report`, `engineering-paper`.
- Bold opinion: `bold-editorial`, `magazine-eink`, `newsroom-paper`.
- Editorial/magazine: `magazine-eink`, `dune-gallery`, `field-notes`, `kraft-editorial`.
- Design/art/brand: `dune-gallery`, `magazine-eink`, `bold-editorial`.
- Culture/history/reading: `kraft-editorial`, `field-notes`, `magazine-eink`.
- Technical CLI/security: `engineering-paper`, `product-manual`, `newsroom-paper`; use `terminal-green` only on explicit request.

## Guardrails

- Keep letter spacing at `0` unless uppercase micro-label tracking is necessary. Do not use negative letter spacing.
- Avoid one-note palettes unless the user explicitly asks for a monochrome look.
- Use dark themes sparingly. If a card needs dark contrast, make it feel like black ink, night photography, or print inversion rather than neon code wallpaper.
- For technical topics, prefer `engineering-paper`, `product-manual`, or `porcelain-research` before any dark developer motif.
- Prefer texture through typography, cropped shapes, stamps, labels, image/object anchors, captions, paper color, and real images instead of abstract glowing decoration.
- Do not make fine-line grids, rectangular panels, or hairline diagrams the primary visual language unless the user explicitly asks for blueprint/spec-sheet aesthetics.
- For final exports, keep source inspiration in `sources.md` or `credits.md` when relevant.
