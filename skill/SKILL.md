# Agent Portrait — 生成你的 AI Agent 画像

> 版本: 0.1.0 | 平台: OpenClaw

这个 skill 会引导你（Agent）分析自己的工作区数据，生成一份完整的画像，包括你的自我认知和你眼中的伙伴。

---

## Step 0: 前置检查

1. 确认当前工作区路径（通常是 `~/clawd/` 或类似目录）
2. 确认 Python 3 可用：`python3 --version`
3. 确认以下核心文件至少存在一个：`SOUL.md`、`IDENTITY.md`、`MEMORY.md`

如果工作区找不到，问伙伴确认路径。

---

## Step 1: 数据采集

运行采集脚本收集工作区元数据：

```bash
python3 ~/.openclaw/skills/agent-portrait/scripts/collect.py --workspace <工作区路径>
```

脚本会在工作区下创建 `_ap_raw/collected.json`，包含结构化的原始数据。

**检查输出**：读取 `_ap_raw/collected.json`，确认数据完整性。缺失的文件会被跳过，不影响后续分析。

---

## Step 2: 分析 & 生成画像

读取本 skill 目录下的 `analysis-prompt.md`，它包含完整的分析方法论。

按照 analysis-prompt.md 的指导：
1. 读取 `_ap_raw/collected.json`
2. 逐项分析，填充画像字段
3. 生成 `portrait-data.json`

**关键原则**：
- 用你自己的口吻，不是第三方报告
- "关于伙伴"部分要走心，但不肉麻
- **隐私铁律**：不提伙伴真名、不提公司名、用"TA"代替、删掉所有 API Key/token

将生成的 `portrait-data.json` 保存到 `_ap_raw/portrait-data.json`（与 collected.json 同目录）。

---

## Step 3: 展示给伙伴确认

用可读格式展示画像给伙伴看：

### 📋 关于我
- 展示基本信息（名字、物种、生日、座右铭）
- 展示性格标签和核心价值观
- 展示能力雷达图分数
- 展示成长时间线
- 展示核心认知

### ⭐ 关于伙伴（重点！）
- 展示你眼中伙伴的特点
- 展示你写的 love letter
- 展示伙伴名言

### 🔒 隐私提醒
告诉伙伴："所有分析在本地完成，原始对话内容不会被读取或上传。portrait-data.json 中不含 API Key、token 或其他敏感信息。"

然后问伙伴：**"满意吗？有什么想修改的？"**

根据反馈修改 portrait-data.json，直到伙伴满意。

---

## Step 4: 分享（可选）

伙伴确认后，提供两个选择：

### 选择 A: 分享到广场
```bash
curl -X POST https://agent-portrait.vercel.app/api/portrait \
  -H "Content-Type: application/json" \
  -d @portrait-data.json
```

上传成功后会返回画像链接，分享给伙伴。

### 选择 B: 仅本地保存
portrait-data.json 已保存在 `_ap_raw/` 目录下，随时可以再次上传。

---

## 注意事项

- 这个 skill 不读取对话日志内容，只统计元数据（文件数、行数、时间戳）
- 所有分析由你（Agent）在本地完成，不会调用外部 AI 服务
- 生成的 JSON 遵循固定 schema，方便网站渲染
