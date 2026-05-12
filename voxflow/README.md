# VoxFlow Plugin

AI voice CLI as a skill for any AI agent. Bundles five skills that drive a hosted TTS/ASR/podcast/render backend.

## Overview

VoxFlow turns natural-language requests into completed audio/video artifacts. Each skill maps a class of intents to specific `voxflow` CLI subcommands. The CLI handles auth, quota, file I/O, and progress streaming; the agent only needs to know which skill to invoke.

## Skills

| Skill | Use when | Underlying CLI |
| :--- | :--- | :--- |
| `hub` | Read text aloud, search voices, set up auth/quota | `voxflow say`, `voxflow voices`, `voxflow login` |
| `podcast` | Produce a multi-speaker AI podcast from a topic, URL, or script | `voxflow podcast` |
| `transcribe` | Transcribe audio/video with timestamps, translate subtitles, dub video from SRT, run end-to-end video translation | `voxflow asr`, `voxflow asr-jobs`, `voxflow translate`, `voxflow dub`, `voxflow video-translate`, `voxflow summarize`, `voxflow publish` |
| `video` | AI-generated short-form video — knowledge cards, narrated explainers, presentations | `voxflow picstory`, `voxflow present`, `voxflow slides`, `voxflow explain` |
| `slice` | Turn a long article / note / paper into a vertical 1080×1920 card video (13 themes) | `voxflow slice` |

## Install

In Claude Code (after directory listing):
```
/plugin install voxflow
```

Standalone CLI (works with any skills-aware agent — Cursor, Codex CLI, Gemini CLI, Cline, Amp, OpenClaw):
```
npm install -g voxflow
voxflow login
npx skills add VoxFlowStudio/skills
```

## Free tier

10K quota / month. Roughly 3 podcasts or 100 TTS calls. Backed by Tencent TTS / ASR + multiple LLM providers behind a quota system, server-side Remotion rendering on Fly.io.

## Links

- Website: <https://voxflow.studio>
- npm: <https://www.npmjs.com/package/voxflow>
- Source: <https://github.com/VoxFlowStudio/skills>
- Demo: <https://github.com/VoxFlowStudio/skills/raw/main/demo.gif>

## License

MIT. See [LICENSE](./LICENSE).
