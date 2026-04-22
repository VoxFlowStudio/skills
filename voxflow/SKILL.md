---
name: voxflow
description: VoxFlow AI voice & video platform — text-to-speech (200+ voices, 40+ languages), AI podcast generation, AI short video clips (render_create/render_status), cloud rendering, and voice search. Use this skill for any speech, voice, audio, or AI video creation task.
---

# VoxFlow Skill

Use this skill whenever users ask for text-to-speech, voice synthesis, podcast creation, narrated stories, or voice/audio generation tasks.

VoxFlow provides 200+ voices in 40+ languages.

## IMPORTANT: How to execute (read this first)

Follow this decision tree EVERY TIME:

### Step 1: Try MCP tools

If VoxFlow MCP tools are available, use them directly:
- `voice_list` — search voices
- `tts_synthesize` — text to speech (returns base64, save to file then `open` it)
- `asr_transcribe` — transcribe audio
- `podcast_script` — generate podcast dialogue
- `quota_check` — check remaining quota
- `render_create` — create AI video clip (topic or pre-built cards mode)
- `render_status` — poll render job until completed + get download URL
- `render_list` — list recent render jobs

Example: user says "给我讲个故事" → write a story → call `tts_synthesize` → save mp3 → `open` it.

**If MCP tools work, stop here. Do NOT install or use CLI.**

### Step 2: MCP not available → install CLI automatically

If MCP tools are not available, install the CLI yourself (do NOT ask the user to do it):

```bash
npm install -g voxflow
```

Then login:

```bash
voxflow login
```

This opens a browser. After the user logs in, the token is cached and all subsequent commands work.

### Step 3: CLI not installable → guide user to add MCP

If `npm install -g` fails (permissions, no Node.js, etc.), tell the user:

```
Run this in your terminal, then restart the session:
claude mcp add voxflow https://api.voxflow.studio/api/mcp
```

### Using CLI (when MCP is not available)

If MCP is not available but CLI is installed:

## Quick Reference

| Command | What it does | Example |
|---------|-------------|---------|
| `say` | Text → speech audio | `voxflow say "Hello" -o hello.mp3` |
| `narrate` | File/text → multi-segment TTS | `voxflow narrate script.txt -o out.wav` |
| `podcast` | Topic → AI podcast episode | `voxflow podcast "AI trends" --duration 3` |
| `story` | Topic → AI narrated story | `voxflow story "太空冒险" -o story.wav` |
| `voices` | Search voice library | `voxflow voices --lang zh --gender female` |
| `asr` | Audio → text transcript | `voxflow asr meeting.mp3` |
| `status` | Check login & quota | `voxflow status` |

## Authentication

```bash
# Login (opens browser for Google/email OTP)
voxflow login

# Check login status and remaining quota
voxflow status

# Logout
voxflow logout
```

- Login is required before any command that calls the API.
- Token is cached at `~/.config/voxflow/token.json`.
- For CI environments, set `VOXFLOW_TOKEN` env var.

## Commands

### Text-to-Speech (`say`)

The core command. Convert text to speech audio.

```bash
# Basic usage
voxflow say "你好世界" -o hello.mp3

# With specific voice
voxflow say "Hello world" --voice v-female-R2s4N9qJ -o greeting.mp3

# Slow narration speed
voxflow say "慢速朗读" --speed 0.8 -o slow.mp3

# WAV format
voxflow say "高质量音频" --format wav -o output.wav
```

**Flags:** `--voice <id>` · `--speed <0.5-2.0>` · `--format <mp3|wav>` · `-o <path>`

### Narrate (`narrate`)

Read a file or long text, split into segments, synthesize each with TTS.

```bash
# From file
voxflow narrate article.txt -o narration.wav

# From stdin (pipe any text)
cat readme.md | voxflow narrate -o readme_audio.wav

# With voice
voxflow narrate script.txt --voice v-male-Bk7vD3xP -o output.wav
```

Best for: long documents, articles, README files, email newsletters.

### Podcast (`podcast`)

Generate a multi-speaker podcast episode with AI-written script.

```bash
# From topic
voxflow podcast "程序员如何用AI提升效率" --duration 3

# With background music
voxflow podcast "Tech trends" --bgm lofi --duration 5

# From existing script
voxflow podcast --script dialogue.txt

# Control language
voxflow podcast "量子计算" --language zh-CN
```

**Flags:** `--duration <min>` · `--bgm <lofi|jazz|ambient>` · `--script <file>` · `--language <zh-CN|en-US|ja-JP>`

### Story (`story`)

AI writes a short story and narrates it with TTS.

```bash
voxflow story "一只会飞的小猫" -o story.wav
voxflow story "space adventure" --lang en -o adventure.wav
```

Best for: bedtime stories, creative writing demos, content samples.

### Voice Search (`voices`)

Browse the voice library. No login required.

```bash
# Chinese female voices
voxflow voices --lang zh --gender female

# English voices
voxflow voices --lang en

# Search by keyword
voxflow voices --search "narrator"

# All voices
voxflow voices --all
```

Always call `voices` first when the user wants a specific voice style.

### Speech Recognition (`asr`)

Transcribe audio to text. Supports Chinese, English, Japanese, Korean.

```bash
voxflow asr recording.mp3
voxflow asr meeting.wav --lang en
```

**Note:** Requires publicly accessible audio URL or local file upload.

## Voice Selection Guide

```bash
# Step 1: Search for matching voices
voxflow voices --lang zh --gender female

# Step 2: Use the voice ID in synthesis
voxflow say "测试" --voice v-female-R2s4N9qJ -o test.mp3
```

Popular voices:
- `v-female-R2s4N9qJ` — 温柔姐姐 (Gentle Female, Chinese)
- `v-male-Bk7vD3xP` — 威严霸总 (Authoritative Male, Chinese)
- `v-female-m1KpW7zE` — 傲娇学姐 (Sassy Female, Chinese)

## Common Scenarios

### "把这段话念出来"
```bash
voxflow say "用户输入的文字" -o output.mp3 && open output.mp3
```

### "用温柔女声读这个文件"
```bash
voxflow voices --lang zh --gender female   # 先找音色
voxflow narrate file.txt --voice v-female-R2s4N9qJ -o narration.mp3
```

### "生成一个关于 XX 的播客"
```bash
voxflow status                              # 检查配额（播客约 5000）
voxflow podcast "话题" --duration 3 --bgm lofi
```

### "讲个睡前故事"
```bash
voxflow story "小狐狸的星星种子" -o bedtime.mp3 && open bedtime.mp3
```

### "转录这段录音"
```bash
voxflow asr recording.mp3
```

## Creative Workflows

These workflows combine VoxFlow TTS with the AI agent's own abilities (writing, coding, web fetching). The agent writes content, then calls `voxflow say` or `voxflow narrate` to synthesize each part.

### Audio Storybook (有声绘本)

AI writes a children's story, generates SVG illustrations, synthesizes narration per page, and bundles everything into a single offline HTML file.

Steps:
1. Write a 6-page children's story
2. For each page: generate an inline SVG illustration (400×300)
3. Synthesize narration: `voxflow say "page text" --voice v-female-R2s4N9qJ --speed 0.85 -o /tmp/page_N.mp3`
4. Read the mp3 files, base64 encode, embed inline in HTML
5. Output a single self-contained HTML file with audio play buttons per page
6. `open /tmp/storybook.html`

### Audio Presentation (有声演示文稿)

AI creates an HTML slide deck with TTS narration on each slide.

Steps:
1. Generate N slides (title + bullet points + narration script)
2. For each slide: `voxflow say "narration script" -o /tmp/slide_N.mp3`
3. Build an HTML file with slide navigation (prev/next) and audio buttons
4. Embed audio inline as base64
5. `open /tmp/presentation.html`

Best for: product introductions, technical tutorials, course materials.

### Article → Audio Briefing (文章有声摘要)

Read a URL or document, summarize, synthesize as audio.

Steps:
1. Fetch/read the content
2. Summarize into 3-5 key points
3. `voxflow say "summary text" --voice v-male-Bk7vD3xP -o /tmp/briefing.mp3`
4. `open /tmp/briefing.mp3`

### Document Narration (文档朗读)

Read a README, code comments, or any text file aloud.

```bash
voxflow narrate README.md --voice v-female-R2s4N9qJ --speed 0.9 -o /tmp/readme.mp3
open /tmp/readme.mp3
```

### Multi-language Voice (多语言合成)

AI translates text, then synthesizes in each language with matching voices.

Steps:
1. Translate user text to target languages (AI does this natively)
2. `voxflow voices --lang en --gender female` → pick English voice
3. `voxflow voices --lang ja --gender female` → pick Japanese voice
4. `voxflow say "English text" --voice <en_id> -o /tmp/en.mp3`
5. `voxflow say "日本語テキスト" --voice <ja_id> -o /tmp/ja.mp3`

### Git Daily Report Audio (Git 日报音频)

Steps:
1. Read `git log --oneline --since="1 day ago"`
2. Summarize changes into a brief report
3. `voxflow say "today's summary..." -o /tmp/daily_report.mp3`
4. `open /tmp/daily_report.mp3`

### Code PR Explanation (PR 语音讲解)

Steps:
1. Read the PR diff
2. Write a plain-language explanation
3. `voxflow say "explanation..." -o /tmp/pr_review.mp3`
4. `open /tmp/pr_review.mp3`

### Mock Interview (模拟面试)

Steps:
1. Generate 3 interview questions on the topic
2. For each: `voxflow say "question N..." --voice v-male-Bk7vD3xP -o /tmp/q_N.mp3`
3. Play questions in sequence: `open /tmp/q_1.mp3`

## Quota

- Free: 10,000 quota/month
- 1 TTS call ≈ 100 quota
- 1 podcast ≈ 5,000 quota
- Check: `voxflow status`

## Prerequisites

- **Node.js** 20+ required
- **ffmpeg** optional (only for video-related commands)
- Install CLI: `npm install -g voxflow`

## 🎬 AI Video Clips (render_create MCP tool)

Generate short-form videos with AI-generated cards, TTS narration, captions, and BGM.

**Cost:** 500 quota per video. Check with `quota_check` first.

### Two modes

**Topic mode** — full AI pipeline (LLM writes cards → TTS → Remotion render):
```
render_create(
  topic = "5个改善睡眠质量的科学方法",
  scheme = "aurora",
  aspect_ratio = "9:16",
  bgm_track = "calm",
  voice_id = "v-male-s5NqE0rZ",
  show_captions = true
)
```

**Cards mode** — provide pre-built LayoutTree (skip LLM generation):
```
render_create(
  cardsData = { cards: [...] },
  scheme = "neon",
  aspect_ratio = "1:1",
  bgm_track = "tech"
)
```

### Poll until done

```
job = render_create(topic="如何在30天内养成早起习惯")
# Poll every 15-30 seconds until completed
result = render_status(job_id=job.jobId)
# When completed: result.downloadUrl is the MP4
```

Typical duration: 2-5 minutes.

### scheme (visual theme)

| scheme | Style | Best for |
|--------|-------|----------|
| `aurora` | Teal/purple dark | General, tech, knowledge |
| `neon` | Cyan/pink cyberpunk | AI, gaming, future |
| `noir` | Gold/dark editorial | Stories, culture, lifestyle |
| `editorial` | Warm gold dark | Humanistic, narrative |
| `brutalist` | B&W high contrast | Business, finance |
| `minimal` | Clean white/blue | Professional, comparison |
| `crimson` | Red dark | Health, sports |
| `dusk` | Orange-brown warm | Food, travel |
| `slate` | Blue-gray cool | Tech, productivity |
| `sand` | Warm beige | Mindfulness, education |
| `mint` | Green-teal soft | Wellness, environment |

### bgm_track

| bgm_track | Mood | Best for |
|-----------|------|----------|
| `corporate` | Professional | Business, knowledge, default |
| `calm` | Peaceful | Health, sleep, mindfulness |
| `upbeat` | Energetic | Sports, food, motivation |
| `tech` | Electronic | AI, coding, sci-fi |
| `inspiring` | Uplifting | Finance, growth, success |
| `cinematic` | Emotional | Stories, culture, travel |
| `none` | Silent | Clear narration |

### Voice + BGM by content type

| Content type | voice_id | bgm_track | scheme |
|-------------|----------|-----------|--------|
| Business / tech (Chinese) | `v-male-s5NqE0rZ` | `corporate` / `tech` | `aurora` / `neon` |
| Health / lifestyle (Chinese) | `v-female-R2s4N9qJ` | `calm` / `upbeat` | `mint` / `crimson` |
| Emotional / storytelling | `v-female-R2s4N9qJ` | `cinematic` | `noir` / `editorial` |
| Knowledge / tutorial | `v-male-s5NqE0rZ` | `corporate` / `calm` | `aurora` / `minimal` |
| Inspirational / finance | `v-male-s5NqE0rZ` | `inspiring` | `aurora` / `brutalist` |
| English content | `v-female-T8m4WxP7` | `corporate` | `brutalist` / `minimal` |

---

## Rules

1. **Always try MCP first** — if MCP tools are available, use them instead of CLI.
2. Always search voices before synthesizing — never guess voice IDs.
3. Check quota before expensive operations (podcast ≈ 5000, render ≈ 500 quota).
4. After synthesis, auto-play the file: `open output.mp3` (macOS).
5. For video renders: poll `render_status` every 15-30s until `completed`. Typical: 2-5 min.
6. Never print tokens or secrets.
7. If CLI fails with "not logged in", suggest MCP: `claude mcp add voxflow https://api.voxflow.studio/api/mcp`
8. If a command fails, check `--help` and correct flags before retrying.

## MCP Setup (if not already configured)

If MCP tools are not available and you want the easiest setup:

```bash
claude mcp add voxflow https://api.voxflow.studio/api/mcp
```

After adding, MCP tools work immediately — OAuth auto-login, no CLI install needed. Restart the agent session to load MCP tools.
