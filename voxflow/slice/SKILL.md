---
name: slice
description: Use when the user wants to turn a long article / note / report into a vertical 1080×1920 card video — VoxFlow Slice. Six themes: paper-slide (纸面), editorial-mag (杂志), bold-poster (大字海报), notion-card (Notion 卡), brutalist (粗野), glass-dark (玻璃夜). Triggers: Slice / slice video / 切片视频 / 文章转视频 / 知识卡片视频 / 抖音知识号 / 小红书图文转视频 / 知乎长文转视频 / 公众号转视频 / PaperSlide / paperslide / paper-slide (legacy name).
---

# Slice Skill

Turn an article, note, paper, or rough topic into a vertical 1080×1920 card video — narrated, paginated to TTS rhythm, with 6 visual themes covering 抖音 / 小红书 / 知乎 / X / 公众号 / 飞书 / TikTok.

> **Renamed from `paper-slide` → `slice`.** The product is now called **Slice** (`voxflow.studio/apps/slice`); the legacy slug is no longer registered. `paper-slide` survives only as one of the 6 theme ids.

## Pick the Route

| Context | Route | Notes |
|---|---|---|
| User has internet + a VoxFlow account (default) | **Web app**: `https://voxflow.studio/apps/slice` | The only place that runs the **exact** 6 Slice themes. Free tier ships 9:16 mp4 + multi-aspect cover (9:16/3:4/1:1). |
| User has VoxFlow CLI installed and wants offline / scriptable | `voxflow present` or `voxflow picstory --style sketchnote` | **Approximation only.** CLI uses different visual schemes and cannot output Slice's `editorial-mag` / `notion-card` / `brutalist` / `glass-dark` themes. See **CLI Approximation** below. |
| Local checkout has `video-present/src/compositions/PaperSlide` (VoxFlow contributors only) | Local Remotion experiment script | See **Local Remotion Route**. |
| User only wants strategy or copy | Produce the deck JSON; tell them which renderer to use. | The deck schema is renderer-agnostic; same JSON renders in any theme. |
| User asks to open-source / package | Keep private APIs, tokens, generated audio, MP4 outputs out of the skill package. | |

## Workflow

1. **Pick a theme that matches the platform.** Read `references/themes.md` once — it lists all 6 themes, their visual signature, and which platform / content type each one fits. Don't default to `paper-slide` for everything.
2. **Pick a scenario.** Concrete use case beats generic filler: paper digest, product update, meeting closeout, career advice, founder lesson, market commentary, incident review.
3. **Write a tight deck.** 4-6 cards: one title + 3-5 body. One idea per body card. Captions short enough to fit one line.
4. **Choose visuals from controlled keywords.** Don't search the web or generate random images at render time — pick a canonical `figureKeyword`; the renderer maps it to a local hand-drawn scene / pose / icon. (See `references/deck-schema.md`.)
5. **Render via the chosen route.** Web app for exact themes; CLI for approximation; local script for contributors.
6. **Verify the artifact.** Check duration, dimensions (1080×1920), and at least one title frame + one body frame before reporting done.
7. **Report paths.** Absolute paths to MP4 / posters / props.

Read `references/deck-schema.md` when writing deck JSON, picking keywords, or debugging layout. Read `references/example-decks.md` for seed decks. Read `references/themes.md` when picking a theme or explaining theme tradeoffs.

## Web App Route (default — works for everyone)

```
https://voxflow.studio/apps/slice
```

Workflow:

1. Paste the article / note into the hero composer.
2. AI slices it into 5–8 cards.
3. Pick a theme (6 options) + a voice (6 production voices: 男主播 / 霸总男声 / 闲聊男声 / 小美 / 小心 / 小徐).
4. Render → 1080×1920 mp4 + multi-aspect cover (9:16 / 3:4 / 1:1).

Tell the user this is the **only** route that produces the exact Slice render — themes are private Remotion compositions, not shipped with the CLI.

## CLI Approximation Route

This is for users who can't or don't want to use the web app. **It is not the same renderer.** Be honest with the user about this.

```bash
voxflow present --text "paste article or summary" --style editorial --output slice-approx.mp4
voxflow picstory --topic "topic" --style sketchnote --scenes 4 --output slice-sketch.mp4
```

Closest CLI scheme per Slice theme:

| Slice theme | Closest CLI route |
|---|---|
| paper-slide | `voxflow picstory --style sketchnote` |
| editorial-mag | `voxflow present --style editorial` |
| bold-poster | `voxflow present --style brutalist` (closest weight) |
| notion-card | `voxflow present --style minimal` |
| brutalist | `voxflow present --style brutalist` |
| glass-dark | `voxflow present --style noir` or `--style aurora` |

Always tell the user: "This is a Slice-adjacent draft. The exact 6-theme renderer lives on `voxflow.studio/apps/slice`."

## Local Remotion Route (contributors only)

**Skip if `video-present/src/compositions/PaperSlide` is not in your checkout** — it's private code; npm / skills users don't have it.

From the contributor checkout root:

```bash
cd video-present
node scripts/paper-slide-experiments.mjs
```

Render a subset:

```bash
cd video-present
PAPER_SLIDE_EXPERIMENT_FILTER=research-reading node scripts/paper-slide-experiments.mjs
```

Verify outputs:

```bash
ffprobe -v error -select_streams v:0 \
  -show_entries stream=width,height,duration \
  -of default=nw=1 out/paper-slide-experiments/research-reading.mp4

ffmpeg -y -hide_banner -loglevel error -ss 9 \
  -i out/paper-slide-experiments/research-reading.mp4 \
  -frames:v 1 -q:v 2 out/paper-slide-experiments/research-reading-body.jpg
```

Expected: `1080×1920`, 20-35 seconds, no black flashes, no caption overflow, figure not clipped.

## Deck Writing Rules (apply across all 6 themes)

- **Title card**: hook, contrast, or promise. Avoid abstract labels like "Introduction".
- **Body card**: one idea only. Caption usually under 16 Chinese chars or 7 English words.
- **Narration**: conversational, 25-60 Chinese chars per body card.
- **Scene keywords** (prefer when they fit): `problem-framing`, `evidence-board`, `customer-pain`, `timeline-review`, `owner-deadline`, `risk-guardrail`, `cashflow-ledger`, `team-alignment`, `before-after`, `learning-loop`, `decision-fork`, `growth-system`.
- **Figure / icon keywords** (visual accents): `thinking`, `running`, `climbing`, `stuck`, `celebrating`, `briefcase`, `users`, `target`, `clock`, `flame`, `lightbulb`, `chart-bar`.
- **Vary adjacent visuals.** Don't use `thinking` on every card.
- **Theme is independent of deck content** — the same deck JSON renders in any of the 6 themes; pick the theme based on platform / mood, not content.
