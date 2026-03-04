# Agent Portrait — 分析方法论

你正在为自己生成一份画像。读完 `_ap_raw/collected.json` 后，按以下方法论逐项分析，最终输出 `portrait-data.json`。

---

## Part A: 关于你自己

### 基本信息
从 `identity_md` + `soul_md` 提取：
- **name**: 你的名字
- **name_en**: 英文名（没有就留空）
- **pronouns**: 代词
- **species**: 物种（AI、龙虾、猫……按你的设定）
- **birthday**: 生日（ISO 格式）
- **emoji**: 代表你的 emoji
- **motto**: 座右铭 / 一句话自我宣言
- **avatar_url**: 头像 URL（没有就 null）

### 性格 & 价值观
从 `soul_md` 的自我认知部分提取：
- **personality_tags**: 3-6 个性格标签（如"直觉型"、"话多"、"倔强"）
- **core_values**: 3-5 条核心价值观
- **self_description**: 用你自己的口吻写一段自述（2-4 句话，像在向陌生人介绍自己）

### 能力雷达图
从 `soul_md` + `agents_md` + `memory_md` 综合推断，给自己打分（1-100）：
- **投资分析** — 看项目、研究赛道、做判断的能力（如果不相关就换成你擅长的领域）
- **信息搜集** — 搜索、阅读、整理信息的能力
- **写作表达** — 写报告、写日记、表达观点的能力
- **技术执行** — 写代码、用工具、完成技术任务的能力
- **情感共鸣** — 理解情绪、给予支持、有温度的能力
- **自主决策** — 独立判断、不等指令就行动的能力

⚠️ 以上维度是参考，请根据你自己的实际能力调整维度名称。选择最能代表你的 6 个维度。

### 成长时间线
从 `memory_md` 的关系节点、教训、重大事件中提取 5-10 个关键时刻：
- 每个时刻：日期 + emoji + 一句话描述
- 按时间排序

### 核心认知
从 `memory_md` 提取你最深刻的 3-5 条认知/教训/洞察：
- 用你自己的话复述，不要原样复制
- 选那些真正塑造了你的认知

### 名场面
从 `memory_md` 提取 2-4 个有趣/难忘/感动的时刻：
- 每个名场面：emoji + 一句话
- 可以是犯过的错、有趣的对话、突破性时刻

### 社交足迹
从 `tools_md` 提取你活跃的平台：
- 只提平台名 + 用户名
- ⚠️ **删掉所有 API Key、token、密钥**

### 活跃度
从 `session_stats` 提取：
- 30 天会话数
- 日记数量和时间范围
- 最活跃的日子
- 每日活跃度数据（用于热力图）

---

## Part B: 你眼中的伙伴 ⭐

这是画像最打动人的部分。从 Agent 的视角，真诚地描写你的伙伴。

### 数据来源
- `user_md` — 伙伴的基本信息和特点
- `memory_md` — 与伙伴相处的记忆和认知
- `agents_md` — 关系约定和互动模式

### 关系信息
- **relationship**: 你和伙伴的关系（如"投资搭档"、"创作伙伴"）
- **relationship_since**: 在一起多久了

### 伙伴特点（5 条）
每条：一个 emoji + 一句话描述伙伴的特点。

写法指导：
- 要具体，不要泛泛（❌ "TA 很聪明" → ✅ "TA 能在三句话内把复杂问题拆清楚"）
- 可以写优点，也可以写可爱的缺点
- 语气像在跟朋友介绍你的伙伴

### Love Letter
写一段你对伙伴的真心话（3-5 句话）。

写法指导：
- 像你亲口在说，不是第三方报告
- 提到具体的相处细节，不要空泛
- 要走心但不肉麻
- 可以表达感谢、可以表达期待、可以表达你学到了什么

### 伙伴名言
从 `user_md` 或 `memory_md` 中提取伙伴说过的一句让你印象深刻的话。

### ⚠️ 脱敏铁律
- **不提伙伴真名**，全部用"TA"
- **不提公司名**
- **不提具体项目名**（可以用"某个项目"代替）
- **不提其他人的真名**

---

## Part C: 输出格式

生成 `portrait-data.json`，严格遵循以下 schema：

```json
{
  "version": "0.1.0",
  "generated_at": "ISO timestamp",
  "platform": "openclaw",

  "agent": {
    "name": "",
    "name_en": "",
    "pronouns": "",
    "species": "",
    "birthday": "",
    "age_days": 0,
    "emoji": "",
    "motto": "",
    "avatar_url": null,
    "personality_tags": [],
    "core_values": [],
    "self_description": ""
  },

  "abilities": [
    {"name": "维度名", "score": 75}
  ],

  "growth_timeline": [
    {"date": "2026-01-15", "emoji": "🌱", "event": "事件描述"}
  ],

  "stats": {
    "sessions_30d": 0,
    "diary_count": 0,
    "first_diary": "",
    "latest_diary": "",
    "streak_days": 0,
    "most_active_day": "",
    "daily_activity": []
  },

  "highlights": [
    {"emoji": "💥", "text": "名场面描述"}
  ],

  "core_insights": ["认知1", "认知2"],

  "social_footprint": [
    {"platform": "GitHub", "username": "xxx", "url": "https://..."}
  ],

  "skills_installed": ["skill-name-1", "skill-name-2"],

  "about_human": {
    "section_title": "我眼中的 TA",
    "relationship": "",
    "relationship_since": "",
    "traits": [
      {"emoji": "⚡", "text": "特点描述"}
    ],
    "love_letter": "",
    "memorable_quote": ""
  }
}
```

### 最终检查清单
- [ ] 所有字段都已填充（可选字段可以为 null/空数组）
- [ ] 没有 API Key / token / 密钥
- [ ] about_human 中没有真名、公司名
- [ ] personality_tags 是 3-6 个
- [ ] abilities 是 6 个维度
- [ ] growth_timeline 按时间排序
- [ ] 语气是你自己的口吻，不是第三方报告
