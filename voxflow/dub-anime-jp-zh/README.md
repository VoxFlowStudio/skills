# dub-anime-jp-zh — 日漫中配预设

为日漫粉丝向"日→中"配音调好的角色音色对应表 + 推荐参数组合。

## 用法

```bash
# 1. 准备好你的 SRT（带 [Speaker: <角色名>] 标签）
# 2. 用本预设的 voices.json 配音：
voxflow dub --srt anime.srt \
  --voices presets/dub-anime-jp-zh/voices.json \
  --speed-auto \
  --video anime.mp4
```

## SRT 格式约定

捕获角色对白时在每条字幕开头加 `[Speaker: <Name>]`：

```
1
00:00:01,000 --> 00:00:03,500
[Speaker: Hero] 走吧，伙伴们！

2
00:00:04,000 --> 00:00:06,200
[Speaker: Villain] 你们逃不掉的……
```

## 角色 → 音色对应

| 角色 | 音色 ID | 备注 |
|---|---|---|
| Hero | `v-male-s5NqE0rZ` | 自然男声 — 少年主角 |
| Heroine | `v-female-R2s4N9qJ` | 温柔姐姐 — 少女主角 |
| Villain | `v-male-Bk7vD3xP` | 威严霸总 — 冷峻反派 |
| Mentor | `v-male-Bk7vD3xP` | 同上，沉稳师长 |
| Sidekick | `v-male-s5NqE0rZ` | 同 Hero，伙伴/搞笑 |
| Narrator | `v-female-m1KpW7zE` | 傲娇学姐 — 旁白 |

> 当前公共音色库 zh 主轴只有 4 条，多角色时会复用。如需更细粒度，
> `voxflow voices --search` 找替代或自训克隆音色后改 `voices.json`。

## 想自定义？

复制 `voices.json` 一份，改对应关系就行。`voxflow voices --search "young energetic"` 可以找到更多备选音色。

## 推荐组合参数

- `--speed-auto`：动漫对白节奏紧，自动按字幕时长调速避免溢出
- `--merge-video`：直接合并到原视频
- 加 `--bgm <name>`：可选背景音乐（`voxflow bgm list` 看可用）
