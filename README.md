# VoxFlow Skills

> **This repo is a public mirror.** Canonical source: [`FlowStudio/cli/skills/`](https://github.com/VoxFlowStudio/FlowStudio/tree/main/cli/skills). Do not send PRs against this repo's skill files — they are overwritten on every sync. See [CLAUDE.md](CLAUDE.md) for the contribution flow.

Agent skills for [VoxFlow](https://voxflow.studio) — give your AI coding agent the ability to synthesize speech, generate AI podcasts, dub videos, transcribe audio, create short videos, and more, all through the VoxFlow CLI.

Compatible with Claude Code, Cursor, OpenClaw, and any agent that supports the Skills protocol.

## Install

The simplest path — let the VoxFlow CLI auto-detect your agent and run the right command:

```bash
npm install -g voxflow
voxflow skills install
```

It detects Claude Code / Cursor / Codex / Gemini / WorkBuddy / OpenClaw on your `$PATH`, picks the right install command, asks for confirmation, runs it, and prints next steps. Use `--all` to install for every detected agent, or `--for <agent>` to force one.

If you'd rather run the install command directly — **one command for every agent**:

```bash
npx -y skills add VoxFlowStudio/skills --all --yes --global
```

The `skills` npm package detects every AI agent on your machine (Claude Code,
Cursor, Codex CLI, Gemini CLI, Cline, Amp, Antigravity, CodeBuddy, OpenClaw…)
and writes the 5 VoxFlow skills (`hub`, `podcast`, `transcribe`, `video`,
`paper-slide`) to each agent's standard skill location in a single shot.

## Prerequisites

```bash
npm install -g voxflow
voxflow login          # one-time browser auth
```

## What You Get

Five focused skills, each loaded on demand:

| Skill | Invoked as | What it covers |
|-------|-----------|----------------|
| **hub** | `voxflow:hub` | `say` · `narrate` · `story` · `voices` · auth · quota · feedback |
| **podcast** | `voxflow:podcast` | Multi-speaker AI podcast from topic / URL / script |
| **transcribe** | `voxflow:transcribe` | `asr` · `translate` · `dub` · `video-translate` · subtitles |
| **video** | `voxflow:video` | `picstory` · `present` · `slides` · `explain` · `image` |
| **paper-slide** | `voxflow:paper-slide` | Paper-textured vertical knowledge reels from articles / notes / reports |

Use the hub skill as the starting point — it routes to the others automatically.

## Example Interactions

| You say | Agent runs |
|---------|-----------|
| "把这段话合成语音" | `voxflow say "..." -o output.mp3` |
| "生成一个 3 分钟 AI 播客" | `voxflow podcast "topic" --duration 3` |
| "把这个视频翻译成日语" | `voxflow video-translate video.mp4 --to ja` |
| "转录这段录音" | `voxflow asr recording.mp3` |
| "做一个 AI 知识短视频" | `voxflow picstory "topic" --style sketchnote` |
| "生成一套演示幻灯片" | `voxflow slides "topic" --slides 8` |

## Skills Layout

```text
voxflow/
  hub/SKILL.md          # TTS, voice search, auth, quota, feedback
  podcast/SKILL.md      # AI dialogue podcast
  transcribe/SKILL.md   # ASR, translation, dubbing
  video/SKILL.md        # AI short video, slides, images
  paper-slide/SKILL.md  # PaperSlide-style article-to-card reels
```

## Registry

```text
registry.json           # VoxFlow CLI add-on recipes index
voxflow/
  dub-anime-jp-zh/      # Anime fan-dub voice preset (JP→ZH)
```

Install a recipe:
```bash
voxflow add dub-anime-jp-zh
```

## Quota

Free tier: 10,000 / month. Check before large jobs:

```bash
voxflow status
```

| Operation | Cost |
|-----------|------|
| `say` (1 call) | ~100 |
| `narrate` (per segment) | ~100 |
| `podcast` (medium) | ~5,000 |
| `picstory` (5 scenes) | ~3,100 |

## Security

- No API keys or tokens in this repository.
- Use `voxflow login` for interactive auth or `VOXFLOW_TOKEN` env var for CI.
- See [SECURITY.md](SECURITY.md) for vulnerability disclosure.

## Links

- [VoxFlow Studio](https://voxflow.studio) — Web app
- [CLI on npm](https://www.npmjs.com/package/voxflow) — `npm install -g voxflow`
- [CLI docs](https://voxflow.studio/docs/cli) — Full command reference
- [Skills source](https://github.com/VoxFlowStudio/FlowStudio/tree/main/cli/skills) — Canonical source in FlowStudio monorepo
