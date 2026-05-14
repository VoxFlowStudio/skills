---
name: voxflow-slice
description: "OFFLINE / LOCAL-ONLY slicing route — use when the user explicitly wants no-cloud / no-quota / offline / local slicing of a markdown / text article into a VoxFlow Slice deck.json. The user's own Claude does the slicing — there is no VoxFlow API call, no JWT, no quota deduction. Produces a validated 5–8 card JSON ready for `voxflow slice render deck.json` (local Remotion render). Pick this skill ONLY when the user says offline / local / no-cloud / 离线 / 本地 / 不联网 / no quota / 不用配额 — for cloud-route slicing (which calls VoxFlow backend and consumes quota), use the `slice` / `voxflow:slice` skill instead. Triggers: offline slice / local slice / 离线切片 / 本地切片 / no-cloud slice / 不联网切片 / slice this article offline / 文章离线转切片 / 本地切片视频."
---

# voxflow-slice — Article → deck.json (offline)

This skill owns the **slicing workflow** for VoxFlow Slice in pure local mode: you read an article the user points at, then write a `deck.json` that picks ONE of the 33 curated Remotion themes and fills in card fields. The user's own Claude does the work — there is no VoxFlow API call, no JWT, no quota deduction.

Compare with the broader `voxflow:slice` skill (which routes between web app, `voxflow slice` cloud command, and `voxflow slice stage` preview). This skill is the local-only alternative: when the user has no token, wants to iterate freely, or asks for an offline slice — slice here, hand off to `voxflow slice preview deck.json` for visual review.

## Hard rules

1. **Write exactly one file**: `deck.json` in the directory the user points at (or the current working directory if they don't specify). Never write `.tsx`, `.css`, `.jsx`, or any React/Remotion source — themes are fixed; you only fill in card fields.
2. **Pick ONE theme from the registry** (see Theme catalog below). Do not invent themes. Typo'd theme ids are hard-rejected by the validator.
3. **5–8 cards inclusive.** First card must be `kind: "title"`. An optional `kind: "outro"` may appear *only as the last card* (server-side BrandKit usually appends this — leave it off unless the user explicitly asks for a CTA card).
4. **No images you didn't already have.** Don't `WebFetch` or generate stock-photo URLs. `imageUrl` is only valid when the user explicitly provides a public http(s) URL and the chosen theme supports it (`photo-feature` / `atmospheric`).
5. **`figureKeyword` must come from the controlled list** in the Card shapes section below. Invented keywords render as a default arrow.
6. **No `narration` ≥ 60 zh chars and no `caption` ≥ 16 zh chars** — these are hard validator caps; the renderer's text-box clips overflows silently.
7. **Captions must NOT end with punctuation** (no 。！？…）— they are subtitles, not prose.
8. **Do not call any VoxFlow API.** This skill is offline. The user pays nothing.

## When to use this skill vs `voxflow:slice`

| Situation | Pick |
|---|---|
| User wants a `deck.json` produced locally, no quota cost | **this skill** |
| User asks "切一下这篇文章" and is logged in via `voxflow login` | `voxflow:slice` → uses `voxflow slice <file>` (200 quota) |
| User wants the mp4 too | `voxflow:slice` → web app |
| User wants to iterate visually on an existing deck | hand off to `voxflow slice preview deck.json` (after this skill writes the file) |

## Step 1 — Locate the article

The user will give you one of:
- a path to a `.md` / `.txt` / `.mdx` file (read it with the Read tool)
- raw text pasted into the chat
- a URL — only fetch it if the user is on a system with network access *and* explicitly asked you to fetch; otherwise ask them to paste the text

Minimum content: **80 characters** (validator floor). If shorter, ask for more material before slicing.

## Step 2 — Pick a theme

Confirm with the user once. Default is `paper-slide` (good for 抖音 / 视频号 / 小红书 knowledge-card content). If they have a target platform in mind, suggest the matching theme from the catalog below. **Only pick from the 33 registered ids** — anything else is rejected by `backend/services/paper-slide/deck-validator.js:148`.

## Step 3 — Plan the structure

Sketch the deck as a list before writing JSON. Default arc:

| Slot | Kind | Purpose |
|---|---|---|
| 1 | `title` | Hook line (反差 / 悬念 / 数字), 2 short rows |
| 2 | `body` | The setup — first idea, one sentence |
| 3 | `body` | Pivot or evidence — second idea |
| 4 | `body` | Payoff — third idea |
| 5 | `body` | Closing point — last idea (or a `data` / `quote` / `list` swap-in) |

Rules of thumb:
- One idea per card. Don't cram two into one `body`.
- Vary adjacent `figureKeyword` — never two consecutive `thinking` / `evidence-board` etc.
- A `quote` card is only justified if the article literally contains a stand-out line (≤30 zh chars).
- A `data` card is only justified if the article cites a memorable number.
- A `list` card is only justified if the article has an explicit 2–4 point structure.
- Each rich kind (quote / data / list) appears **at most once per deck**.

## Step 4 — Write `deck.json`

Use the schemas in the next section. The validator lives at `backend/services/paper-slide/deck-validator.js` and is the source of truth — when in doubt, read it.

## Deck schema (V1 — the shape this skill produces)

```jsonc
{
  "header": "顶部小字，≤22 zh chars",           // required, non-empty string
  "seriesTitle": "系列名，≤10 zh chars",        // required, will be wrapped in 【】 by some themes
  "seriesTagline": "底部斜体副标题，≤22 zh chars",  // required
  "theme": "paper-slide",                       // optional but recommended — must be in catalog
  "coverHookCaption": "封面钩子，≤18 zh chars",    // optional; falls back to first body's caption
  "coverFigureKeyword": "growth-system",         // optional; falls back to first body's figureKeyword
  "cards": [ /* 2–9 entries; first must be title; outro only last */ ]
}
```

### Card shapes by `kind`

All cards require a non-empty `narration` string (TTS reads this; 30–60 zh chars, ends with 。).

```jsonc
// kind: "title" — first card only
{
  "kind": "title",
  "title": ["第一行 ≤14 zh chars", "第二行 ≤14 zh chars"],   // non-empty array
  "narration": "30–60 zh chars 开场白，自然口语。"
}

// kind: "body" — default for ideas
{
  "kind": "body",
  "caption": "一句金句字幕，≤16 zh chars，结尾无标点",      // required
  "figureKeyword": "problem-framing",                       // pick from controlled list below
  "narration": "30–60 zh chars 配音稿，自然口语。"
}

// kind: "quote" — quote card (max 1 per deck)
{
  "kind": "quote",
  "quote": {
    "text": "≤60 chars 引文，结尾无标点",
    "attribution": "出处或人名（可省略），≤30 chars"
  },
  "narration": "30–60 zh chars 配音稿。"
}

// kind: "data" — number card (max 1 per deck)
{
  "kind": "data",
  "data": {
    "value": "≤12 chars，如 80 / 3x / 240万+",
    "unit": "≤8 chars（可省略），如 % / 倍 / 年",
    "label": "≤30 chars 数字解释"
  },
  "narration": "30–60 zh chars 配音稿。"
}

// kind: "list" — 2–4 items (max 1 per deck)
{
  "kind": "list",
  "list": {
    "items": [
      { "text": "≤30 chars 短句", "glyph": "✦" },      // glyph is optional emoji/char
      { "text": "≤30 chars 短句" },
      { "text": "≤30 chars 短句" }
    ]
  },
  "narration": "30–60 zh chars 配音稿。"
}

// kind: "outro" — only allowed as LAST card; usually server-appended
{
  "kind": "outro",
  "narration": "8–60 chars 关注语口播。",
  "outro": {
    "cta": "关注 + 系列名，看下集",
    "handle": "@voxflow（可省略）"
  }
}
```

> **Source of truth**: `backend/services/paper-slide/deck-validator.js` — caps live at lines 39–46 (QUOTE_TEXT_MAX, DATA_VALUE_MAX, LIST_ITEM_MAX_LEN, etc.). Read it if anything below seems ambiguous.

### Controlled `figureKeyword` list

Pick from these (mirrors `backend/services/paper-slide/prompt.js:31–61`). Anything else renders as a default arrow.

**Narrative scenes** (best for paper-slide / daisy-pastel / showa-catalog / photo-feature / atmospheric / hand-lettered):
`problem-framing` · `evidence-board` · `customer-pain` · `timeline-review` · `owner-deadline` · `risk-guardrail` · `cashflow-ledger` · `team-alignment` · `before-after` · `learning-loop` · `decision-fork` · `growth-system`

**Pose / mood** (paper-slide family only):
`climbing` · `thinking` · `stuck` · `running` · `celebrating`

**Single-symbol Lucide glyphs** (use these for all other themes — see Theme catalog for which themes are Lucide-only):
`briefcase` · `users` · `target` · `trending-up` · `dollar-sign` · `clock` · `message-circle` · `flame` · `lightbulb` · `chart-bar` · `rocket` · `bell`

## Theme catalog (33 themes)

All ids are valid for `deck.theme`. The "figure mode" column tells you which `figureKeyword` vocabulary to draw from — themes marked **Lucide** ignore narrative scene keywords.

| Theme id | Vibe (1 line) | Platform fit | Figure mode |
|---|---|---|---|
| `paper-slide` | 泛黄纸纹 + 衬线红字 + 手绘印章 | 抖音 / 视频号 / 小红书 | narrative |
| `editorial-mag` | 米白页面 + 衬线斜体 + 杂志感留白 | 知乎 / 公众号 / LinkedIn | Lucide |
| `bold-poster` | 左侧 accent 条 + 黑体超粗大字 + 红方块数字 | X / Threads / LinkedIn | Lucide |
| `notion-card` | 纯白底 + 暖灰墨 + 蓝色 accent + 页面图标 | 公众号 / 飞书 / 知识星球 | Lucide |
| `brutalist` | 黑白纯色 + 粗边框 + NO.NN 标签 + raw 排版 | X / Mastodon / 播客 | Lucide |
| `glass-dark` | 深色渐变 + 紫色发光 + 玻璃拟态 + 短视频感 | 抖音 / 视频号 / TikTok | Lucide |
| `broadsheet` | FT 三文鱼底 + 重磅衬线 + 首字下沉 + DATELINE | LinkedIn / 知乎 / 雪球 | Lucide |
| `blueprint` | 青底 + 白色网格 + 橙色尺寸标 + 工程图纸感 | 少数派 / 知乎 / GitHub | Lucide |
| `daisy-pastel` | 奶油底 + 手绘雏菊 + 星星 + 粉嫩可爱 | 小红书 / 微博 / 即刻 | narrative |
| `showa-catalog` | 70s city-pop + 彩虹斜条 + 太阳印章 | 小红书 / B 站 / 播客 | narrative |
| `photo-feature` | 全屏摄影 + 渐变压底 + 重磅衬线（needs `imageUrl`） | 小红书 / 知乎 / 微博 | narrative |
| `atmospheric` | 黑底 + 一束暖光 + 衬线粉红 italic + 深夜散文 | 微博 / 即刻 / 播客 | narrative |
| `art-mag` | 颗粒感色块 + 大字衬线 + 几何球 + 艺术画廊感 | 小红书 / 播客 / 即刻 | Lucide |
| `tome-noir` | 纯黑画布 + humanist sans + 60/40 非对称 + 暖光晕 | X / LinkedIn / 即刻 | Lucide |
| `flomo-mute` | #fafafa Muji 纸面 + IBM Plex + 苹方 + 绿色细线 | 小红书 / 即刻 / 微博 | Lucide |
| `substack-drop` | 米色衬线 + 首字下沉 + 章节分隔 + 阅读时间 chip | 公众号 / 知乎 / 少数派 | Lucide |
| `ink-scroll` | 米黄宣纸 + 楷体竖排 + 印章红 + 水墨边缘 | 小红书 / 微博 / B 站国创 | Lucide |
| `podcast-clip` | 封面渐变 + 圆形封面 + 大字幕 + 波形底栏 | 小宇宙 / 即刻 / 抖音 | Lucide |
| `ink-wash` | 宣纸 + 思源宋体 + 横排单字 + 笔触 + 朱印 + 留白 | 知乎长文 / 小红书 / 公众号 | Lucide |
| `morandi-calm` | 低饱和粉褐 / 灰绿 / 灰蓝色块 + 苹方 Light | 小红书 / 公众号 / 即刻 | Lucide |
| `douyin-data` | 纯黑底 + 抖音品红 + 湖蓝 + RGB 色差 + 大数字 | 抖音 / 视频号 / 小红书 | Lucide |
| `highlighter-note` | 奶油格纸 + 印刷体黑字 + Caveat 手写 + 黄色荧光笔 | 小红书 / B 站 / 知乎 | Lucide |
| `memphis-design` | 奶油 + 原色块 + 波浪线 + 锯齿 + 实心圆 + 1986 后现代 | 即刻 / 小红书 / 播客 | Lucide |
| `bauhaus-grid` | 奶油纸 + 红黄蓝原色 + 圆方三角 + 1923 包豪斯几何 | LinkedIn / 设计博客 / 知乎 | Lucide |
| `riso-print` | 荧光粉 + 钴蓝错版 + 网点 + 噪点 + Risograph | 独立开发 / 设计 newsletter | Lucide |
| `chrome-y2k` | 镀铬全息 + 像素栅 + 双径向辉光 + Y2K Bratz/iPod | 小红书 girlie / 抖音 Z / TikTok | Lucide |
| `botanical-press` | 羊皮纸 + Cormorant 斜体 + 拉丁学名 + 18 世纪植物标本 | 茶道 / 园艺 / 慢生活 | Lucide |
| `art-nouveau` | Mucha 曲线 + 烫金 + 装饰边框 + 1900 巴黎沙龙海报 | 艺术评论 / 美术志 / 插画家 | Lucide |
| `tabloid-print` | 红色 BREAKING + Anton 巨字 + 半调 + 双栏 + 小报头条 | 行业八卦 / 争议事件 / 独立专栏 | Lucide |
| `arcade-pixel` | CRT 扫描线 + 8-bit 像素 + RGB 色差 + 80s 街机标题屏 | 独立游戏 / 像素艺术 / 90s 复古 | Lucide |
| `hand-lettered` | 黑板绿底 + 粉笔白字 + Caveat 手写 + 咖啡馆菜单板 | 咖啡馆菜单 / 教师笔记 / 生活感 | narrative |
| `stamp-collector` | 齿孔 + 邮戳 + 面额 + 复古集邮册标本页 | 旅行游记 / 收藏品 / 怀旧专栏 | Lucide |
| `tropical-postcard` | 落日渐变 + 椰影 + 浪潮线 + 60s 旅游海报明信片 | 旅行游记 / 夏日散文 / 小红书 vlog | Lucide |

### Per-theme caption voice (quick guide)

The slicing prompt at `backend/services/paper-slide/prompt.js:94–237` defines per-theme caption tone. Highlights:

- `paper-slide`: 短、实、有冲击；反差/悬念/痛点钩子
- `bold-poster`: 数字 + 硬观点，≤12 字最佳
- `glass-dark`: 未来 / tech 感，断句多
- `broadsheet`: 财经评论调，开篇即判断 + 数字
- `ink-scroll` / `ink-wash`: 文言短句 / 现代东方意味
- `douyin-data`: "你不知道的…" / "%/倍/前 N" 爆款句式
- `morandi-calm`: 安静、克制、像周报作者写给自己
- `hand-lettered`: 温暖、随手、像便签上一句话

When picking caption vocabulary, match the theme's register. The user's own LLM (you) is doing the slicing — read the relevant block in `prompt.js` for the chosen theme if precision matters.

## Top schema invariants you MUST enforce

These are the most common failure modes. The validator surfaces a clean error, but it's faster to get them right the first time.

1. **First card is `kind: "title"`** — `deck-validator.js:198–200`. Reordering would push a body to slot 0; the renderer assumes title at slot 0 for cover-card composition.
2. **Card count 2–9 inclusive** — `deck-validator.js:195–197`. Target 5 cards; never exceed 8 (BrandKit may append an outro server-side, room for 1 more).
3. **`caption` must not end with punctuation** for body cards — implicit in V2 at `deck-validator.js:323` and prompt rule line 425. Trailing 。！？…）leaks into subtitles.
4. **`figureKeyword`** has no validator check on the keyword string itself (only that it's a string if present) — but **unknown keywords render as a default arrow**. Always pick from the controlled list.
5. **`outro` card invariant** — at most one, must be last. `deck-validator.js:204–208`. Multiple outros = wiring bug, mid-deck outro = bug.

## Hand-off

After writing `deck.json`, tell the user:

```
Wrote deck.json (<N> cards, theme: <theme-id>). Next:

  voxflow slice render deck.json --output out.mp4    # render mp4 locally (~30s)
  voxflow slice stage  deck.json                     # live preview in browser
```

Do not run either command yourself unless the user asks.

## Self-review checklist

Before declaring the slice done:

- [ ] `deck.json` parses as JSON (no trailing commas, no comments)
- [ ] `theme` is one of the 33 registered ids
- [ ] 5–8 cards (target 5; max 8 without outro, 9 with)
- [ ] First card is `title`, with `title` as a non-empty array of 1–2 short strings
- [ ] Every card has a non-empty `narration`
- [ ] No `caption` ends with 。！？…
- [ ] Every `figureKeyword` is in the controlled list
- [ ] No `caption` exceeds 16 zh chars; no `narration` exceeds 60 zh chars
- [ ] At most one of each rich kind (quote / data / list)
- [ ] If the theme is `photo-feature` or `atmospheric` and the user provided per-card images, `imageUrl` starts with `https://`
- [ ] No outro card unless the user explicitly asked for one
- [ ] No React, TSX, or CSS files were created

## Anti-patterns

- ❌ Inventing themes ("modern-clean", "tech-blue"). Only the 33 registered ids work.
- ❌ Writing TSX / React / CSS — the renderer is fixed; you only fill in card fields.
- ❌ `narration` longer than 60 zh chars — gets clipped silently by the TTS-text-box constraint.
- ❌ `caption` ending in 。！？— these are subtitles, not prose.
- ❌ Two consecutive `figureKeyword: "thinking"` — visually repetitive.
- ❌ Adding a `kind: "outro"` card on your own — the server's BrandKit usually appends it.
- ❌ Calling `voxflow slice <file>` to do the work — this skill is the **offline** path.
- ❌ Fetching arbitrary image URLs into `imageUrl` — only public http(s) URLs the user explicitly provided.

## Examples

See `examples/article.md` for a representative input and `examples/expected-deck.json` for the matching output that validates cleanly. Run `node examples/validate.mjs` to verify any deck against the real backend validator.
