# Fonts

卡片字体的单一真相源：本地字体包、授权、加载方式、**自动选字算法（带受控随机）**、主题→字体候选池、语言覆盖规则。

`taste.md`、`SKILL.md`、`presets.md`、各 `design-languages/*.md` 涉及具体字体的描述都引用本文件，不再各自维护字体清单（消解了历史冲突 C1–C4，见末节）。

## 适用范围与渲染约束

- 渲染管线：HTML/CSS + Playwright 截图，1080px 画布，2x 导出，比例 1:1 / 3:4 / 9:16。
- 字体**全部本地内嵌**，通过本地 `@font-face` 加载，**不依赖任何 CDN/外链**（开发预览也不依赖）。
- `scripts/render-cards.mjs` 在 `waitUntil:'load'` 后、截图前等待 `document.fonts.ready`，确保本地字体加载完成再截图。
- 字重层级优先**复用同一字体的多字重**（思源黑/宋为可变字体，单文件覆盖全字重；多数英文为 variable）——这是控制 CJK 体积最有效的手段。
- 字间距保持 `0`（uppercase 微标签除外），不用负字距；正文不用纯黑。

## 本地字体包

字体存放在 `assets/fonts/`，由 `scripts/download-fonts.sh` 下载并生成：

- `assets/fonts/fonts.css` —— 主入口，`@import` 全部字体的 `@font-face`。卡片集引用它即可。
- `assets/fonts/css/*.css`、`assets/fonts/woff2/**`、`assets/fonts/packages/**` —— 字体文件与分包 CSS。
- `assets/fonts/MANIFEST.md` —— **字体清单与体积的真相源（自动生成，勿手填进本文件，避免数字漂移）**。

### 已内嵌（OFL / ITF-FFL，可随仓库分发）

英文 10 款：Geist、Geist Mono、Space Grotesk、Newsreader、Source Serif 4、Spectral、IBM Plex Mono、Libre Caslon Display（以上 fontsource，OFL）；Satoshi、General Sans、Cabinet Grotesk（Fontshare，ITF-FFL）。

中文 4 款：思源黑体 `Noto Sans SC`、思源宋体 `Noto Serif SC`（fontsource 可变，分 unicode-range 分包）、霞鹜文楷 `LXGW WenKai`（Lite 常用字集；**为控体积只内嵌 regular 400 + bold 700 普通体，不含 light 及 Mono 变体**）、得意黑 `Smiley Sans Oblique`（cn-fontsource，单字重）。整包约 20MB，明细见 `assets/fonts/MANIFEST.md`。

> family 名已在下载时归一（去掉 fontsource 的 ` Variable` 后缀），与下文映射表完全一致。

### 未内嵌（授权不允许随仓库再分发，仅作系统字体回退）

- **HarmonyOS Sans SC**、**阿里巴巴普惠体 3.0**、**京華老宋体**：非 OFL，再分发授权不明确。仅在内容明确需要、且目标机器已装时，作为 font-family 链里的可选项；缺失则回退已内嵌字体。
- **朱雀仿宋 Zhuque Fangsong**、**更纱黑体 Mono Sarasa Mono SC**：OFL，但缺干净 woff2 源未自动内嵌。需要时手动放入 `assets/fonts/woff2/` 并在 `fonts.css` 补 `@font-face`；缺失时：仿宋角色回退思源宋，CJK 等宽角色回退「拉丁等宽 + 思源黑」（元信息多为拉丁，可接受）。
- **霞鹜文楷 light(300)、霞鹜文楷 Mono**：为控体积在 `download-fonts.sh` 的 lxgw `keep` 过滤中刻意丢弃（25MB→8MB）。文楷只用 400/700 两档做层级；中文等宽人文需求回退到「更纱黑体 Mono（未内嵌）→ 拉丁等宽 + 思源黑」。如确需，改 `download-fonts.sh` 中 lxgw 的 `keep` 列表并重跑。

## 授权速查

| 授权 | 含义 | 字体 |
|---|---|---|
| SIL OFL-1.1 | 自由商用/内嵌/子集化/分发 | 思源黑、思源宋、霞鹜文楷、得意黑（及候补朱雀仿宋）；Geist、Geist Mono、Space Grotesk、Newsreader、Source Serif 4、Spectral、IBM Plex Mono、Libre Caslon Display |
| ITF Free Font License | 免费可商用、允许网页内嵌打包 | Satoshi、General Sans、Cabinet Grotesk |
| 厂商私有免商 | 再分发授权不明确，**不内嵌**，仅系统回退 | HarmonyOS Sans SC、阿里巴巴普惠体 3.0、京華老宋体 |
| 系统/付费 | 不可打包/内嵌 | 苹方 PingFang、微软雅黑、方正系、Avenir Next、Söhne |

**禁用**：Inter 作默认（taste 硬约束）；苹方/雅黑/方正/Avenir Next 写入任何会被打包的 `@font-face`；任何 CDN 外链。

## 字体角色与候选池（按主题预设）

每个角色给**一个加权候选池**而非唯一字体——这是「自动选字 + 受控随机」的数据基础：随机只在**同主题、同角色**的池内发生，既避免「主题 ↔ 字体完全耦合」（同一主题多次生成不会千篇一律），又不会选出跑题字体。

记法：`字体A*` = 主选（默认权重高），其后为备选。`/` 分隔中文与英文侧。

| 预设 | display（封面标题）| serif（编辑标题/引用）| sans（正文/UI）| mono（数据/元信息）|
|---|---|---|---|---|
| `magazine-eink` | Cabinet Grotesk\* · Newsreader / 思源宋 700\* · 得意黑(封面≤1) | Spectral\* · Source Serif 4 / 思源宋\* · 霞鹜文楷 | General Sans\* · Satoshi / 思源黑\* | Geist Mono\* · IBM Plex Mono |
| `porcelain-research` | Geist 700\* · Space Grotesk / 思源黑 900\* | Source Serif 4\* · Newsreader / 思源宋\* | Geist\* · General Sans / 思源黑\* | IBM Plex Mono\* · Geist Mono |
| `newsroom-paper` | Newsreader 700\* · Cabinet Grotesk / 思源宋 700\* | Newsreader\* · Spectral / 思源宋\* | General Sans\* · Geist / 思源黑\* | IBM Plex Mono\* · Geist Mono |
| `quiet-report` | Source Serif 4 700\* · Geist 700 / 思源黑 900\* | Source Serif 4\* · Newsreader / 思源宋\* | General Sans\* · Geist / 思源黑\* | IBM Plex Mono\* · Geist Mono |
| `product-manual` | Space Grotesk\* · Geist 700 / 思源黑 700\* | Source Serif 4 · — / 思源宋 | Geist\* · Satoshi / 思源黑\* | Geist Mono\* · IBM Plex Mono |
| `engineering-paper` | Space Grotesk 600\* · Geist 700 / 思源黑 700\* | — | Geist\* · General Sans / 思源黑\* | Geist Mono\* · IBM Plex Mono |
| `field-notes` | Newsreader\* · Spectral / 思源宋 600\* | Spectral\* · Source Serif 4 / 霞鹜文楷\* · 思源宋 | General Sans\* · Geist / 思源黑\* · 霞鹜文楷 | IBM Plex Mono\* · Geist Mono |
| `kraft-editorial` | Libre Caslon Display\* · Newsreader / 思源宋 700\* | Spectral\* · Newsreader / 霞鹜文楷\* · 思源宋 | General Sans\* · Satoshi / 思源黑\* | Geist Mono\* · IBM Plex Mono |
| `dune-gallery` | Cabinet Grotesk\* · Space Grotesk / 思源宋 600\* | Source Serif 4\* · Spectral / 思源宋\* | General Sans\* · Satoshi / 思源黑\* | Geist Mono\* · IBM Plex Mono |
| `social-notebook` | Cabinet Grotesk 800\* · Satoshi / 思源黑 900\* · 得意黑(封面≤1) | Newsreader · — / 思源宋 | Satoshi\* · Geist / 思源黑\* | Geist Mono\* · IBM Plex Mono |
| `bold-editorial` | Cabinet Grotesk 800\* · Space Grotesk / 思源宋 900\* · 得意黑(封面≤1) | Newsreader\* · Spectral / 思源宋\* · 霞鹜文楷 | Satoshi\* · General Sans / 思源黑\* | Geist Mono\* · IBM Plex Mono |

Legacy 别名（`tokyo-night`/`terminal-green`/`blueprint`/`pitch-deck-vc` 等）先按 `presets.md` 映射到上述主预设再取池。

## 自动选字算法（带受控随机）

在 Workflow step 4（选定 preset + design-language + 内容语言后）执行：

1. **取池**：用所选 `preset` 查上表，得到 display/serif/sans/mono 四个加权候选池（中、英两侧）。
2. **硬约束过滤**（优先级最高，先裁池再随机）：
   - 用户显式指定字体 → 直接锁定该角色，跳过随机，并记入 `sources.md`。
   - design-language 排版约束（见下节）→ 据其裁剪/合并角色（如 `swiss-poster` 家族 ≤2：display 与 sans 取同族或合并）。
   - 内容语言（见下下节）→ 决定用中文侧还是英文侧、是否必须含已内嵌 CJK face。
   - taste 硬约束 → 永不选 Inter；单字重字体（得意黑）只能落到 display 且每套 ≤1 处。
3. **受控随机挑选**：
   - 为每个角色在过滤后的池里**加权随机选 1 款**（主选权重 ≈0.6，第一备选 ≈0.28，第二备选 ≈0.12；池被裁到 1 款时无随机）。
   - **每套卡片只选一次**，整套统一（不要逐卡换字体）。
   - **变化种子**：用输出目录 slug 作随机种子 → 同一 slug 可复现、不同主题/选题天然不同，从而「同主题不同选题」字体搭配有变化、不耦合。
   - **跨主题点缀（仅 display，概率 ≈0.15）**：display 角色可从「相邻气质主题」的 display 池借 1 款（如 `quiet-report` 偶尔借 `magazine-eink` 的 Cabinet Grotesk），给封面制造新鲜感；serif/sans/mono **不做**跨主题，保正文稳定。
4. **写入**：把选中的家族名写进卡片 CSS 的 `:root` token（`--font-display/-serif/-sans/-mono`），并 `@import "assets/fonts/fonts.css"`（或把用到的字体复制进 `cards/<slug>/assets/fonts/` 后本地引用）。
5. **记录**：在 `sources.md` 写明本套实际选中的四个字体 + 是否触发跨主题点缀，便于复现与解释。

> 目标：主题决定**气质边界**（池），随机决定**池内具体哪款**。主题与字体不再一一硬绑定，但也不会跑题。

## 设计语言排版约束（裁池，优先级高于随机）

命中时按其约束裁剪上面的池：

- `editorial-artifact`：标题须 serif/表现性 display → display 池只留 serif 系（思源宋粗 / Newsreader / Cabinet Grotesk）。
- `swiss-poster`：字体家族 ≤2 → display 与 sans 取同族或合并，mono 仅用于极少元信息；不触发跨主题点缀。
- `newsroom-poster`：标题重磅 → display 池只留重字重（思源黑 900 / Newsreader 700 / Cabinet Grotesk 800）。
- `cinematic-still`：克制 serif/display，正文极少 → 选定后正文字号压到最低密度。
- `data-poster`：大数字重磅 → 数字用 display 或 mono 的重字重（思源黑 900 / Space Grotesk / Geist 700）。
- `product-catalog`：标签 mono → mono 角色必选且权重提升。
- `field-notes`（设计语言）：人文质感 → sans 池把霞鹜文楷权重提到主选档。

## 内容语言覆盖规则（仅次于用户显式指定）

- **纯英文**：用候选池英文侧；不声明 CJK face。
- **纯中文**：`--font-sans` 必含已内嵌中文（思源黑）；display 角色在中文里**退回思源黑/宋粗字重或得意黑**，不选纯拉丁 display（拉丁 display 无汉字会整体回退）。
- **中英混排**：font-family 链**先拉丁后中文**，浏览器按 Unicode range 自动分工；西文字号较中文 **小 0.5–2px** 平衡视觉重量；数字用 tabular/lining；行高用无单位数值（如 `1.6`）。
- **CJK 无真斜体**：禁止对中文文本用 `font-style: italic`（伪斜变形）；用字号/字重/色块区分。
- **CJK 字重合成**：只声明字体真实拥有的字重；思源黑/宋为可变字体（100–900 连续）；得意黑单字重——不要对单字重字体写不存在的 `font-weight`。

## font-family 链写法（全本地）

本地内嵌优先；非内嵌的 niche 中文字体仅作可选项，缺失即回退已内嵌字体：

```css
@import url("assets/fonts/fonts.css"); /* 或复制 fonts 到 cards/<slug>/assets/fonts/ */

:root{
  --font-sans:    "Geist", "Noto Sans SC", system-ui, sans-serif;
  --font-serif:   "Source Serif 4", "Noto Serif SC", Georgia, serif;
  --font-mono:    "Geist Mono", "Noto Sans SC", ui-monospace, monospace;
  --font-display: "Cabinet Grotesk", "Noto Serif SC", sans-serif;
  /* 文化/文学预设的人文正文示例： */
  --font-humanist:"LXGW WenKai", "Noto Serif SC", serif;
}
/* 选字算法的结果直接覆盖上面四个 token 的首位字体即可 */
```

非内嵌 niche 字体若确需（且目标机已装）：把它放在已内嵌 face 之前，例如
`--font-serif: "KingHwa_OldSong", "Noto Serif SC", serif;` —— 装了用它，没装回退思源宋，永不外链。

## 验证检查清单

- [ ] `bash scripts/download-fonts.sh` 后 `assets/fonts/fonts.css` 与 `MANIFEST.md` 存在；MANIFEST 列出的 family 与本文件映射表一致。
- [ ] 卡片注入 `document.fonts.ready.then(()=>console.log([...document.fonts].map(f=>f.family+' '+f.status)))`，Playwright 抓 console，确认选中字体状态 `loaded`（非 `error`/`unloaded`）。
- [ ] `render-cards.mjs` 已在截图前 `await page.evaluate(()=>document.fonts.ready)`；同卡 `--wait 250` 与 `1500` 像素 diff 应无差异。
- [ ] grep 卡片 HTML/CSS：无 CDN/外链字体；无 `font-style: italic` 落在中文文本；单字重字体未写不存在字重。
- [ ] 同一 preset 用两个不同 slug 各生成一套，确认四个角色字体**有变化但都在该 preset 池内**（受控随机生效、未跑题）。
- [ ] `sources.md` 记录了本套实际选中的字体与是否跨主题点缀。
- [ ] 中英混排卡：行高无单位；数字 tabular；DevTools 与 Playwright 导出基线一致。

## 历史冲突消解记录（C1–C4）

- **C1**：`taste.md`、`SKILL.md` 曾推荐 **Avenir Next**（付费/系统、不可内嵌）→ 已删除，统一指向本文件。
- **C2**：字体候选清单曾在 taste.md / SKILL.md / 本文件**三处各存一份** → 本文件设为单一真相源，另两处只保留 no-Inter 硬约束与指针。
- **C3**：`taste.md` serif 清单（Songti SC 等）与本文件不一致 → 改为「见 references/fonts.md」。
- **C4**：`SKILL.md` 全局「body 必须 sans」与本文件「magazine-eink/field-notes/kraft 用 serif·楷体正文」相矛盾 → SKILL.md 软化为「技术/密集卡 body 用 sans；编辑/文学预设按本文件可用 serif/楷体正文」。
- 非冲突：Inter 禁令在多处重复是**刻意护栏**（多道工序复述），保留。

## Sources

字体来源见 `assets/fonts/MANIFEST.md`（每款的包、文件数、体积、授权，自动生成）。授权核实参考：思源黑/宋 Noto(OFL)、霞鹜文楷(OFL, github.com/lxgw/LxgwWenKai)、得意黑 Smiley Sans(OFL, github.com/atelier-anchor/smiley-sans)、Geist/Geist Mono(OFL, vercel.com/font)、Space Grotesk/Newsreader/Source Serif 4/Spectral/IBM Plex Mono/Libre Caslon Display(OFL, Google Fonts)、Satoshi/General Sans/Cabinet Grotesk(ITF-FFL, fontshare.com)。
