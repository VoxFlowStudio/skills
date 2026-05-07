---
name: paper-slide
description: Use when the user wants PaperSlide / paperslide / paper-slide style vertical knowledge videos, article-to-card reels, 纸面手绘风知识短视频, management/career/research/product update explainers, or wants to experiment with Remotion card videos from long text.
---

# PaperSlide Skill

Create paper-textured vertical knowledge reels from articles, notes, reports, or rough topics. The output should be a real preview artifact whenever possible: MP4 first, or at least title/body stills plus renderable props.

## Pick the Route

| Context | Route |
|---|---|
| User has VoxFlow CLI installed (default for npm / skills users) | Use `voxflow present` for narrated card video, or `voxflow picstory --style sketchnote` for illustrated knowledge cards. See **VoxFlow CLI Route** below. |
| Local checkout has the private `video-present/src/compositions/PaperSlide` Remotion composition (VoxFlow contributors only) | Use the local Remotion `PaperSlideDeck` composition — see **Local Remotion Route (contributors only)** below. |
| User only wants strategy or copy | Produce the PaperSlide deck JSON and explain what renderer is needed. |
| User asks to open-source or package it | Keep private APIs, tokens, generated audio, and MP4 outputs out of the skill package. |

The exact `PaperSlideDeck` Remotion composition is internal to VoxFlow and is **not shipped to npm / skills users** — most readers should pick the CLI route. Only fall through to the local Remotion route if `video-present/src/compositions/PaperSlide` is actually present.

## Workflow

1. **Choose a scenario.** Pick a concrete use case instead of generic filler: paper summary, product update, meeting closeout, career advice, founder lesson, research digest.
2. **Write a tight deck.** Use 4-6 cards: one title card plus 3-5 body cards. Keep captions short enough to fit one line.
3. **Choose visuals from controlled keywords.** Do not search the web or generate random images at render time. Pick the best canonical `figureKeyword`; the renderer maps it to a local hand-drawn scene, pose, or icon.
4. **Render, do not just describe.** Generate TTS, build Remotion props, render MP4, then extract at least one title frame and one body frame.
5. **Verify the artifact.** Check duration, dimensions, file size, and visual frames before saying it is done.
6. **Report paths.** Return absolute paths to MP4s, posters, and any script/props files.

Read `references/deck-schema.md` when writing deck JSON, adding keywords, or debugging layout. Read `references/example-decks.md` when the user asks for examples, wants to compare scenarios, or needs a seed deck for experiments.

## VoxFlow CLI Route

This is the route that works for everyone with the VoxFlow CLI. No private code required.

```bash
voxflow present --text "paste article or summary" --style editorial --output paperslide-draft.mp4
voxflow picstory --topic "topic" --style sketchnote --scenes 4 --output paperslide-sketch.mp4
```

Tell the user this is a PaperSlide-adjacent draft, not the exact PaperSlide renderer (the exact renderer is private to VoxFlow Studio).

## Local Remotion Route (contributors only)

**Skip this section if `video-present/src/compositions/PaperSlide` is not present in your checkout.** It is private code; npm / skills users will not have it.

From the VoxFlow contributor's local checkout root (where `video-present/` lives):

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

Expected: `1080×1920`, 20-35 seconds, no black flashes, no title/caption overflow, figure not clipped.

## Deck Writing Rules

- Title card: hook, contrast, or promise. Avoid abstract labels like "Introduction".
- Body card: one idea only. Caption should be punchy and usually under 16 Chinese chars or 7 English words.
- Narration: conversational, 25-60 Chinese chars per body card.
- Keywords: prefer scene keywords when they fit: `problem-framing`, `evidence-board`, `customer-pain`, `timeline-review`, `owner-deadline`, `risk-guardrail`, `cashflow-ledger`, `team-alignment`, `before-after`, `learning-loop`, `decision-fork`, `growth-system`.
- Use figure/icon keywords as accents: `thinking`, `running`, `climbing`, `stuck`, `celebrating`, `briefcase`, `users`, `target`, `clock`, `flame`, `lightbulb`, `chart-bar`.
- Vary adjacent visuals. Do not use `thinking` on every card.

