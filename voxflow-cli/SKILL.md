---
name: voxflow-cli
description: Use VoxFlow CLI for auth/login, command discovery, and audio workflows.
---

# VoxFlow CLI Skill

Use this skill when users ask for VoxFlow dubbing, translation, TTS, or publishing tasks.

## Authentication
- Interactive login:
  - `npx voxflow login`
  - `npx voxflow status`

## Command Discovery
- List all commands:
  - `npx voxflow --help`
- Inspect specific commands:
  - `npx voxflow publish --help`
  - `npx voxflow video-translate --help`
  - `npx voxflow say --help`

## Workflow
1. Confirm user inputs (file path, language, output path).
2. Run `--help` first when flags are unclear.
3. Execute the target command with explicit arguments.
4. Return output path, core command, and verification notes.

## Rules
- Never print tokens or secrets in logs.
- Keep business logic in VoxFlow CLI commands, not in skill prose.
- If a command fails, retry only after checking `--help` and correcting flags.
