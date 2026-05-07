# Security Policy

## Scope

This repository ships skill content (markdown guidance for AI agents) that drives the [`voxflow` CLI on npm](https://www.npmjs.com/package/voxflow). Vulnerabilities in the CLI runtime itself should also be reported through this advisory channel — both are covered.

`SKILL.md` files contain natural-language guidance for AI agents and cannot execute on their own. Issues most relevant to this repo:

- Skill instructions that lead agents to leak credentials, exfiltrate data, or run unintended commands.
- Recipes / presets that pull resources from untrusted URLs.
- Anything that would let a malicious recipe be installed via `npx skills add VoxFlowStudio/skills` and compromise a user's machine.

## Sensitive Data

- Never commit API keys, tokens, passwords, or private URLs.
- `SKILL.md` files must contain usage patterns only — not credentials, internal endpoints, or test accounts.
- Use `voxflow login` for interactive auth or the `VOXFLOW_TOKEN` env var for CI.

## Reporting

Use **[GitHub Private Vulnerability Reporting](https://github.com/VoxFlowStudio/skills/security/advisories/new)** to file a private advisory. Initial response within 5 business days.

Please do **not** post exploit details, reproducers, or unredacted PII in public issues, discussions, or PRs.
