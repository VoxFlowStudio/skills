# VoxFlow Skills

Agent skills for [VoxFlow](https://voxflow.studio) — give your AI coding agent the ability to synthesize speech, generate AI podcasts, dub videos, transcribe audio, create short videos, and more, all through the VoxFlow CLI.

Compatible with Claude Code, Cursor, OpenClaw, and any agent that supports the Skills protocol.

## Install

```bash
# Claude Code
claude skills add voxflow

# Cursor / other agents
npx skills add VoxFlowStudio/skills --skill voxflow
```

## Prerequisites

```bash
npm install -g voxflow
voxflow login          # one-time browser auth
```

## What You Get

Four focused skills, each loaded on demand:

| Skill | Invoked as | What it covers |
|-------|-----------|----------------|
| **hub** | `voxflow:hub` | `say` · `narrate` · `story` · `voices` · auth · quota · feedback |
| **podcast** | `voxflow:podcast` | Multi-speaker AI podcast from topic / URL / script |
| **transcribe** | `voxflow:transcribe` | `asr` · `translate` · `dub` · `video-translate` · subtitles |
| **video** | `voxflow:video` | `picstory` · `present` · `slides` · `explain` · `image` |

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
