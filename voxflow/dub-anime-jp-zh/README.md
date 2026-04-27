# dub-anime-jp-zh — 日漫中配预设

为日漫粉丝向"日→中"配音调好的角色音色对应表 + 推荐参数组合。

## 用法

```bash
# 1. 准备好你的 SRT（带 [Speaker: <角色名>] 标签）
# 2. 用本预设的 voices.json 配音：
voxflow dub anime.srt \
  --voices presets/dub-anime-jp-zh/voices.json \
  --speed-auto \
  --merge-video anime.mp4
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

| 角色 | 音色 ID | 适用类型 |
|---|---|---|
| Hero | `v-male-young-energetic` | 少年主角，热血/正义 |
| Heroine | `v-female-young-bright` | 少女主角，明朗/坚强 |
| Villain | `v-male-bass-cold` | 反派，低音/冷峻 |
| Mentor | `v-male-elder-warm` | 师长/导师，沉稳 |
| Sidekick | `v-male-cheerful-light` | 搞笑/伙伴 |
| Narrator | `v-female-calm-clear` | 旁白 |

## 想自定义？

复制 `voices.json` 一份，改对应关系就行。`voxflow voices --search "young energetic"` 可以找到更多备选音色。

## 推荐组合参数

- `--speed-auto`：动漫对白节奏紧，自动按字幕时长调速避免溢出
- `--merge-video`：直接合并到原视频
- 加 `--bgm <name>`：可选背景音乐（`voxflow bgm list` 看可用）
