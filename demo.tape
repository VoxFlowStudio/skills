# demo.tape — VoxFlow CLI first-impression demo recording recipe
#
# Renders demo.gif at the repo root, used as the README hero image.
#
# Render:
#   vhs demo.tape
#
# Prerequisites:
#   - vhs installed (`brew install vhs`)
#   - voxflow installed (`npm install -g voxflow`)
#   - voxflow login completed (chico's account, 10K free tier is plenty)
#   - terminal in a clean state (no prior history shown)
#
# Re-record after meaningful CLI UX changes (new flag, output format, etc).

Output demo.gif

# ── canvas ────────────────────────────────────────────────────────────────
# 800x500 fits inside GitHub README's ~768px container without scaling.
# No outer frame — the terminal window itself (with traffic lights +
# rounded corners) is the visual identity.
Set Theme "TokyoNight"
Set FontSize 18
Set FontFamily "JetBrains Mono"
Set Width 960
Set Height 540
Set Padding 20
Set TypingSpeed 35ms
Set WindowBar Colorful
Set BorderRadius 10

# ── setup (hidden) ────────────────────────────────────────────────────────
# Unset CLAUDECODE so the CLI's plugin-install hint (<claude-code-hint .../>)
# doesn't leak into the recording when running inside Claude Code.
Hide
Type "unset CLAUDECODE && clear"
Enter
Show

# ── intro ─────────────────────────────────────────────────────────────────
Type "# VoxFlow — voice CLI that ships as a skill"
Sleep 600ms
Enter
Sleep 400ms

# ── 1. browse the voice catalog (read-only API, reliable) ────────────────
Type "voxflow voices --lang en --gender female | head -8"
Sleep 300ms
Enter
Sleep 4s
# voxflow's post-command "Was this helpful?" prompt opens stdin briefly
# after the command exits — Enter consumes it (skip path).
Enter
Sleep 500ms

# ── 2. the skill pitch (3 short lines, all < 74 chars) ───────────────────
Type "# 200+ voices · 40+ languages"
Sleep 1s
Enter
Type "# voxflow say 'Hello' -o hi.mp3   # one-line TTS"
Sleep 1s
Enter
Type "# npx skills add VoxFlowStudio/skills   # for any AI agent"
Sleep 2s
