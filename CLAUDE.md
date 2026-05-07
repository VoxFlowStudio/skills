# CLAUDE.md — Read This Before Editing

This repository is a **public mirror**. The canonical source lives in the private monorepo `VoxFlowStudio/FlowStudio` under `cli/skills/`.

## Do not commit directly to this repo

- Skill content (`voxflow/*/SKILL.md`, registry recipes, `registry.json`) is overwritten on every sync. Manual edits here will be lost.
- README / LICENSE / SECURITY / `.gitignore` are the only files maintained in-place. Touch them only with explicit user authorization.
- AI agents must NOT generate "comprehensive analysis", "architecture overview", or "documentation index" files in this repo. They are out of scope for a public mirror and will be wiped.

## How changes flow

```
FlowStudio/cli/skills/<skill>/SKILL.md   ←  edit here
FlowStudio/registry/                      ←  edit here
        │
        │  bash scripts/sync-skills.sh --push   (chico runs this manually)
        ▼
VoxFlowStudio/skills (this repo, public)
```

The sync script lives at `FlowStudio/scripts/sync-skills.sh`. It clones this repo, mirrors `cli/skills/` into `voxflow/`, copies the registry, commits as `chore: sync voxflow skills + registry from FlowStudio v<version>`, and pushes.

## If you find drift

Open an issue or message the maintainer. Do not fix by direct commit.
