# VoxFlow Skills

Installable Agent Skills for VoxFlow workflows.

## Install

Install all available skills:

```bash
npx skills add VoxFlowStudio/skills
```

Install only `voxflow`:

```bash
npx skills add VoxFlowStudio/skills --skill voxflow
```

List available skills before installing:

```bash
npx skills add VoxFlowStudio/skills --list
```

## Update

Check for available updates:

```bash
npx skills check
```

Update installed skills (project scope):

```bash
npx skills update
```

Update globally installed skills:

```bash
npx skills update -g
```

## Included Skills

- `voxflow`: authentication, command discovery, and command execution workflow for VoxFlow CLI.

## Security

- This repository contains no API keys or tokens.
- Do not add secrets to `SKILL.md` files.
- Use environment variables or interactive login when authentication is required.

## Layout

```text
skills/
  README.md
  LICENSE
  SECURITY.md
  voxflow/
    SKILL.md
```
