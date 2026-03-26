# VoxFlow Skills

Installable Agent Skills for [VoxFlow](https://voxflow.studio) AI voice workflows. Give your AI coding agent (Claude Code, Cursor, OpenClaw, etc.) the ability to synthesize speech, generate podcasts, dub videos, transcribe audio, and more — using the VoxFlow CLI.

## Install

```bash
# Install the voxflow skill
npx skills add VoxFlowStudio/skills --skill voxflow

# List available skills
npx skills add VoxFlowStudio/skills --list
```

## Prerequisites

```bash
# Install VoxFlow CLI
npm install -g voxflow

# Login (one-time, opens browser)
voxflow login
```

## What it does

After installation, your AI agent automatically knows how to use VoxFlow CLI commands:

| You say | Agent runs |
|---------|-----------|
| "把这段话合成语音" | `voxflow say "..." -o output.mp3` |
| "把这个视频翻译成日语" | `voxflow video-translate video.mp4 --to ja` |
| "生成一个 AI 播客" | `voxflow podcast "topic" --duration 3` |
| "转录这段录音" | `voxflow asr recording.mp3` |
| "用温柔女声念这个文件" | `voxflow narrate file.txt --voice v-female-R2s4N9qJ` |

## Included Skills

- **`voxflow`**: Full VoxFlow CLI skill — 11 commands, voice search, workflows, quota management. See [voxflow/SKILL.md](voxflow/SKILL.md) for the complete reference.

## Also Available: MCP Server

For AI agents that support [MCP](https://modelcontextprotocol.io) (Claude Code, Cursor, Windsurf):

```bash
claude mcp add voxflow https://api.voxflow.studio/api/mcp
```

**Skills vs MCP**: Skills teach the agent to use CLI (local, supports video/ffmpeg). MCP calls the cloud API directly (no local deps). Install both for full coverage.

## Update

```bash
npx skills check     # Check for updates
npx skills update    # Update to latest
```

## Security

- This repository contains no API keys or tokens.
- Do not add secrets to `SKILL.md` files.
- Use `voxflow login` for interactive auth or `VOXFLOW_TOKEN` env var for CI.

## Layout

```text
skills/
  README.md
  LICENSE
  SECURITY.md
  voxflow/
    SKILL.md      # The skill file agents read (~200 lines)
```

## Links

- [VoxFlow Studio](https://voxflow.studio) — Web app
- [CLI docs](https://voxflow.studio/docs/cli) — Command reference
- [MCP docs](https://voxflow.studio/docs/mcp) — MCP server setup
- [Skills docs](https://voxflow.studio/docs/skills) — Skills installation guide
- [npm package](https://www.npmjs.com/package/voxflow) — CLI on npm
