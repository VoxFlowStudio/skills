---
name: hub
description: VoxFlow AI voice toolkit — text-to-speech, voice search, AI stories, install/auth/quota. Use when the user wants to read text aloud, search voices, sample stories, or set up VoxFlow access. For podcasts use voxflow:podcast; for short videos / AI clips use voxflow:video; for transcription / dubbing / subtitle translation use voxflow:transcribe.
---

# VoxFlow Skill — Hub

VoxFlow turns text into speech in 200+ voices across 40+ languages, plus full audio/video pipelines. This skill is the **entry point**: install, auth, voice search, and the simple `say` / `narrate` / `story` workflows.

For specialized tasks, switch to:

- **Podcasts** (multi-speaker dialogue) → `voxflow:podcast`
- **Short videos / AI clips / knowledge cards** (`picstory`, `present`, `slides`, `explain`) → `voxflow:video`
- **Transcription, subtitle translation, dubbing** (`asr`, `translate`, `dub`, `video-translate`) → `voxflow:transcribe`

## Install & login

Install once, never ask the user again:

```bash
npm install -g voxflow
voxflow login          # opens browser — Google or email OTP
```

Token cached at `~/.config/voxflow/token.json`. For CI, set `VOXFLOW_TOKEN`.

## Authentication

```bash
voxflow login        # browser-based, one-time
voxflow status       # who am I + remaining quota
voxflow logout
```

## Voice search — always do this before synthesizing

Never guess voice IDs. Search first.

```bash
voxflow voices --lang zh --gender female
voxflow voices --lang en
voxflow voices --search "narrator"
voxflow voices --all
```

No login required. Output includes the voice ID, language, gender, and a short description.

### Popular voice IDs (sane defaults)

| ID | Style | Language |
|----|-------|----------|
| `v-female-R2s4N9qJ` | 温柔姐姐 (gentle female) | zh |
| `v-male-s5NqE0rZ` | 自然男声 (natural male) | zh |
| `v-male-Bk7vD3xP` | 威严霸总 (authoritative male) | zh |
| `v-female-m1KpW7zE` | 傲娇学姐 (sassy female) | zh |
| `v-female-T8m4WxP7` | Chenwen (native English female) | en |

## Text-to-speech (`say` / `synthesize`)

The atomic command. One snippet → one audio file.

```bash
voxflow say "你好世界" -o hello.mp3
voxflow say "Hello world" --voice v-female-T8m4WxP7 -o greeting.mp3
voxflow say "慢速朗读" --speed 0.8 -o slow.mp3
voxflow say "高质量音频" --format wav -o output.wav
```

| Flag | Default | Range / Values |
|------|---------|----------------|
| `--voice <id>` | `v-female-R2s4N9qJ` | any voice ID from `voxflow voices` |
| `--format <fmt>` | `pcm` | `pcm` (WAV), `wav`, `mp3` |
| `--speed <n>` | `1.0` | `0.5` – `2.0` |
| `--volume <n>` | `1.0` | `0.1` – `2.0` |
| `--pitch <n>` | `0` | `-12` – `12` |
| `--output <path>` | auto-named | any writable path |

After synthesis, auto-play: `open output.mp3` (macOS).

## Long text (`narrate`)

Split a document or long string into sentences, synthesize each, concat into one file.

```bash
voxflow narrate --input article.txt -o narration.wav
voxflow narrate --input readme.md --voice v-male-Bk7vD3xP -o readme_audio.wav
voxflow narrate --text "第一段。第二段。第三段。" -o paragraphs.mp3
echo "Hello world" | voxflow narrate -o hello.wav
```

Best for: long documents, articles, README files, email newsletters.

Markdown is stripped automatically (headings, links, code fences, etc.) — no need to clean it first.

## AI story (`story`)

LLM writes a short story on the topic, then narrates it.

```bash
voxflow story "一只会飞的小猫" -o story.mp3
voxflow story "space adventure" --lang en -o adventure.wav
```

Best for: bedtime stories, content samples, demos.

## Quota

Free tier: 10,000 quota / month (resets monthly). Bonus pool from invitations never expires.

| Operation | Cost |
|-----------|------|
| 1 TTS call (`say`) | ~100 |
| `narrate` | ~100 per segment |
| `story` (short) | ~500-1500 |
| `podcast` (medium) | ~5,000 |
| `picstory` 5-scene | ~3,100 |

Always check before expensive operations:

```bash
voxflow status
```

## Common scenarios

### "把这段话念出来"
```bash
voxflow say "用户输入的文字" -o /tmp/out.mp3 && open /tmp/out.mp3
```

### "用温柔女声读这个文件"
```bash
voxflow voices --lang zh --gender female
voxflow narrate --input file.txt --voice v-female-R2s4N9qJ -o /tmp/narration.mp3
```

### "讲个睡前故事"
```bash
voxflow story "小狐狸的星星种子" --lang zh -o /tmp/bedtime.mp3 && open /tmp/bedtime.mp3
```

### "多语言朗读"
```bash
voxflow voices --lang en --gender female   # pick English voice
voxflow voices --lang ja --gender female   # pick Japanese voice
voxflow say "English text" --voice <en_id> -o /tmp/en.mp3
voxflow say "日本語テキスト" --voice <ja_id> -o /tmp/ja.mp3
```

## Creative workflows (combine TTS with the agent's writing)

The agent writes content first, then synthesizes each part with `say` or `narrate`.

### Audio storybook (有声绘本)

1. Write a 6-page children's story.
2. For each page: generate inline SVG illustration (400×300).
3. `voxflow say "page text" --voice v-female-R2s4N9qJ --speed 0.85 -o /tmp/page_N.mp3`
4. Read mp3 files, base64-encode, embed inline in HTML.
5. Output a single self-contained HTML file with audio play buttons per page.
6. `open /tmp/storybook.html`

### Article → audio briefing

```bash
# Agent fetches the URL, summarizes, then:
voxflow say "summary text" --voice v-male-s5NqE0rZ -o /tmp/briefing.mp3
```

### Document narration

```bash
voxflow narrate --input README.md --voice v-female-R2s4N9qJ --speed 0.9 -o /tmp/readme.mp3
```

### Git daily report audio

1. `git log --oneline --since="1 day ago"`
2. Agent summarizes.
3. `voxflow say "today's summary..." -o /tmp/daily.mp3`

### Mock interview

1. Agent generates 3 interview questions on the topic.
2. For each: `voxflow say "question N..." --voice v-male-Bk7vD3xP -o /tmp/q_N.mp3`
3. Play sequentially.

## Prerequisites

- **Node.js** `^20.19.0 || >=22.12.0`
- **ffmpeg** — only for video-related commands (see `voxflow:video`, `voxflow:transcribe`)
- **Login** required for any API call — `voxflow login`

## Feedback & support

Found a bug or have a feature request? Run `voxflow feedback` from any terminal:

```bash
voxflow feedback          # interactive: choose type, enter title + details → opens GitHub issue
voxflow feedback --bug    # pre-fill as bug report
voxflow feedback --feature  # pre-fill as feature request
```

Opens a pre-filled GitHub issue in the browser. System info (OS, Node, CLI version) is attached automatically.

## Installing third-party voices or templates (`add`)

```bash
voxflow add <recipe-name>      # install a voice preset or pipeline template
voxflow add --list             # browse available recipes
```

Use this when the user asks to install a custom voice pack or community template.

## Rules

1. **Search voices before use** — never invent voice IDs. Always run `voxflow voices` first.
2. **Check quota** before podcasts (~5K), picstory (~3K), or batched jobs: `voxflow status`.
3. **Auto-play** after synthesis: `open output.mp3` (macOS) / `xdg-open` (Linux).
4. **Never print tokens or secrets** to logs.
5. If a command fails, run `voxflow <cmd> --help` to confirm flags before retry.

## When to switch skills

- User says "podcast" / "对话" / "多人对谈" → load `voxflow:podcast`.
- User says "short video" / "知识卡片" / "小红书" / "TikTok" / "AI clip" / "render" → load `voxflow:video`.
- User says "transcribe" / "字幕" / "dub" / "translate this video" / "SRT" → load `voxflow:transcribe`.
