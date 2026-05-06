---
name: paper-slide
description: Use when the user wants PaperSlide / paperslide / paper-slide style vertical knowledge videos, article-to-card reels, 纸面手绘风知识短视频, management/career/research/product update explainers, or wants to experiment with Remotion card videos from long text.
---

# PaperSlide Skill

Create paper-textured vertical knowledge reels from articles, notes, reports, or rough topics. The output should be a real preview artifact whenever possible: MP4 first, or at least title/body stills plus renderable props.

## Pick the Route

| Context | Route |
|---|---|
| FlowStudio repo has `video-present/src/compositions/PaperSlide` | Use the local Remotion `PaperSlideDeck` composition. |
| User has VoxFlow CLI but no PaperSlide component | Use `voxflow present` for narrated card video, or `voxflow picstory --style sketchnote` for illustrated knowledge cards. |
| User only wants strategy or copy | Produce the PaperSlide deck JSON and explain what renderer is needed. |
| User asks to open-source or package it | Keep private APIs, tokens, generated audio, and MP4 outputs out of the skill package. |

If there is a local experiment script such as `video-present/scripts/paper-slide-experiments.mjs`, prefer running it over rewriting render orchestration.

## Workflow

1. **Choose a scenario.** Pick a concrete use case instead of generic filler: paper summary, product update, meeting closeout, career advice, founder lesson, research digest.
2. **Write a tight deck.** Use 4-6 cards: one title card plus 3-5 body cards. Keep captions short enough to fit one line.
3. **Choose visuals from controlled keywords.** Do not search the web or generate random images at render time. Pick the best canonical `figureKeyword`; the renderer maps it to a local hand-drawn scene, pose, or icon.
4. **Render, do not just describe.** Generate TTS, build Remotion props, render MP4, then extract at least one title frame and one body frame.
5. **Verify the artifact.** Check duration, dimensions, file size, and visual frames before saying it is done.
6. **Report paths.** Return absolute paths to MP4s, posters, and any script/props files.

Read `references/deck-schema.md` when writing deck JSON, adding keywords, or debugging layout. Read `references/example-decks.md` when the user asks for examples, wants to compare scenarios, or needs a seed deck for experiments.

## Local FlowStudio Commands

From the repo root:

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

## VoxFlow CLI Fallback

When exact PaperSlide Remotion code is unavailable:

```bash
voxflow present --text "paste article or summary" --style paper --output paperslide-draft.mp4
voxflow picstory --topic "topic" --style sketchnote --scenes 4 --output paperslide-sketch.mp4
```

Tell the user this is a PaperSlide-adjacent draft, not the exact PaperSlide renderer.

## Open-Source Packaging Rules

- Include only `SKILL.md`, lightweight references, and optional reusable scripts/templates.
- Do not include generated `.mp4`, `.mp3`, `.wav`, `.aiff`, `.env`, tokens, or private API URLs.
- Prefer local/system TTS for demos, or document that VoxFlow CLI is optional.
- Keep the skill trigger broad enough to catch `PaperSlide`, `paperslide`, `paper-slide`, `paper slide`, `文章转知识短视频`, and `纸面手绘风`.

## Release Checklist

Before publishing a skill package:

```bash
python3 <skill-creator>/scripts/quick_validate.py cli/skills/paper-slide
rg -n "(service_role|api[.]voxflow|supabase|PRIVATE KEY)" cli/skills/paper-slide --glob '!SKILL.md'
find cli/skills/paper-slide -type f | rg "\\.(mp4|mp3|wav|aiff|mov)$" && exit 1 || true
claude plugin tag cli --dry-run
```

If `claude plugin tag` complains about uncommitted changes, commit the skill changes first; use `--force` only for local validation.
