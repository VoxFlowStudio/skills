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

Set Theme "TokyoNight"
Set FontSize 18
Set FontFamily "JetBrains Mono"
Set Width 1200
Set Height 700
Set Padding 30
Set TypingSpeed 55ms
Set WindowBar Colorful
Set BorderRadius 10
Set Margin 30
Set MarginFill "#5851b8"

# ── setup (hidden) ────────────────────────────────────────────────────────
Hide
Type "clear"
Enter
Show

# ── intro ─────────────────────────────────────────────────────────────────
Type "# VoxFlow — AI voice CLI that ships as a skill for any AI agent"
Sleep 800ms
Enter
Sleep 500ms

# ── 1. one-line TTS ───────────────────────────────────────────────────────
Type "voxflow say 'Hello from VoxFlow' -o hello.mp3"
Sleep 400ms
Enter
Sleep 3s

Type "ls -lh hello.mp3"
Sleep 300ms
Enter
Sleep 1500ms

# ── 2. browse the voice catalog ───────────────────────────────────────────
Type "voxflow voices --lang en --gender female | head -8"
Sleep 400ms
Enter
Sleep 2500ms

# ── 3. the skill pitch ────────────────────────────────────────────────────
Type "# 200+ voices · 40+ languages · podcasts · transcribe · video dub"
Sleep 1500ms
Enter
Type "# Install for your AI agent: npx skills add VoxFlowStudio/skills"
Sleep 2500ms
