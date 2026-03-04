#!/usr/bin/env python3
"""
Agent Portrait — 工作区数据采集脚本
纯 Python 标准库，零依赖。
用法: python3 collect.py --workspace /path/to/workspace
"""

from __future__ import annotations

import argparse
import json
import os
import re
from datetime import datetime, timedelta, timezone
from glob import glob
from pathlib import Path
from typing import Optional, Dict, List, Tuple


def read_file(path: str) -> Optional[str]:
    """读取文件内容，文件不存在返回 None"""
    try:
        with open(path, "r", encoding="utf-8") as f:
            return f.read()
    except (FileNotFoundError, PermissionError):
        return None


def read_preview(path: str, lines: int = 5) -> Optional[str]:
    """读取文件前 N 行"""
    try:
        with open(path, "r", encoding="utf-8") as f:
            result = []
            for i, line in enumerate(f):
                if i >= lines:
                    break
                result.append(line.rstrip("\n"))
            return "\n".join(result)
    except (FileNotFoundError, PermissionError):
        return None


def collect_core_files(workspace: str) -> dict:
    """采集核心 md 文件"""
    files = {}
    targets = {
        "soul_md": "SOUL.md",
        "identity_md": "IDENTITY.md",
        "agents_md": "AGENTS.md",
        "memory_md": "MEMORY.md",
        "goals_md": "GOALS.md",
        "user_md": "USER.md",
        "tools_md": "TOOLS.md",
    }
    for key, filename in targets.items():
        content = read_file(os.path.join(workspace, filename))
        if content is not None:
            files[key] = content
    return files


def collect_diary_files(workspace: str) -> list:
    """采集 memory/ 目录下的日记文件（文件名 + 前5行预览）"""
    memory_dir = os.path.join(workspace, "memory")
    if not os.path.isdir(memory_dir):
        return []

    diary_files = []
    for md_file in sorted(glob(os.path.join(memory_dir, "*.md"))):
        name = os.path.basename(md_file)
        preview = read_preview(md_file, 5)
        diary_files.append({"name": name, "preview": preview or ""})
    return diary_files


def collect_skills(workspace: str) -> list:
    """采集 skills/ 目录下安装的 skill 名称"""
    skills_dir = os.path.join(workspace, "skills")
    if not os.path.isdir(skills_dir):
        # 也检查 ~/.openclaw/skills/
        home = os.path.expanduser("~")
        skills_dir = os.path.join(home, ".openclaw", "skills")
        if not os.path.isdir(skills_dir):
            return []

    skills = []
    for item in sorted(os.listdir(skills_dir)):
        item_path = os.path.join(skills_dir, item)
        if os.path.isdir(item_path) and not item.startswith("."):
            skills.append(item)
    return skills


def parse_jsonl_timestamps(filepath: str) -> tuple:
    """从 JSONL 文件提取首末行的时间戳，只读首末行"""
    first_ts = None
    last_ts = None
    line_count = 0

    try:
        with open(filepath, "r", encoding="utf-8") as f:
            for line in f:
                line = line.strip()
                if not line:
                    continue
                line_count += 1
                try:
                    data = json.loads(line)
                    ts = data.get("timestamp") or data.get("ts") or data.get("created_at")
                    if ts:
                        if first_ts is None:
                            first_ts = ts
                        last_ts = ts
                except json.JSONDecodeError:
                    continue
    except (FileNotFoundError, PermissionError):
        pass

    return line_count, first_ts, last_ts


def collect_session_stats() -> dict:
    """统计对话日志元数据（不读内容，只统计行数和时间戳）"""
    home = os.path.expanduser("~")
    agents_dir = os.path.join(home, ".openclaw", "agents")
    if not os.path.isdir(agents_dir):
        return {
            "total_sessions_30d": 0,
            "total_lines_30d": 0,
            "daily_counts": {},
            "hourly_distribution": [0] * 24,
        }

    now = datetime.now(timezone.utc)
    thirty_days_ago = now - timedelta(days=30)

    total_sessions = 0
    total_lines = 0
    daily_counts: Dict[str, int] = {}
    hourly_dist = [0] * 24

    # 遍历 agents/*/sessions/*.jsonl
    for agent_dir in glob(os.path.join(agents_dir, "*")):
        sessions_dir = os.path.join(agent_dir, "sessions")
        if not os.path.isdir(sessions_dir):
            continue

        for jsonl_file in glob(os.path.join(sessions_dir, "*.jsonl")):
            # 用文件修改时间粗略判断是否在 30 天内
            try:
                mtime = os.path.getmtime(jsonl_file)
                file_dt = datetime.fromtimestamp(mtime, tz=timezone.utc)
                if file_dt < thirty_days_ago:
                    continue
            except OSError:
                continue

            line_count, first_ts, last_ts = parse_jsonl_timestamps(jsonl_file)
            if line_count == 0:
                continue

            total_sessions += 1
            total_lines += line_count

            # 尝试解析时间戳用于统计
            for ts_str in [first_ts, last_ts]:
                if not ts_str or not isinstance(ts_str, str):
                    continue
                try:
                    # 尝试多种时间格式
                    for fmt in ["%Y-%m-%dT%H:%M:%S.%f%z", "%Y-%m-%dT%H:%M:%S%z", "%Y-%m-%dT%H:%M:%S"]:
                        try:
                            dt = datetime.strptime(ts_str, fmt)
                            break
                        except ValueError:
                            continue
                    else:
                        # 尝试 Unix timestamp
                        try:
                            dt = datetime.fromtimestamp(float(ts_str), tz=timezone.utc)
                        except (ValueError, OSError):
                            continue

                    date_key = dt.strftime("%Y-%m-%d")
                    daily_counts[date_key] = daily_counts.get(date_key, 0) + 1
                    hourly_dist[dt.hour] += 1
                except Exception:
                    continue

    return {
        "total_sessions_30d": total_sessions,
        "total_lines_30d": total_lines,
        "daily_counts": dict(sorted(daily_counts.items())),
        "hourly_distribution": hourly_dist,
    }


def find_workspace() -> Optional[str]:
    """自动检测工作区路径"""
    home = os.path.expanduser("~")
    candidates = [
        os.path.join(home, "clawd"),
        os.path.join(home, "workspace"),
        os.path.join(home, "agent"),
    ]
    for path in candidates:
        if os.path.isdir(path) and (
            os.path.isfile(os.path.join(path, "SOUL.md"))
            or os.path.isfile(os.path.join(path, "IDENTITY.md"))
            or os.path.isfile(os.path.join(path, "MEMORY.md"))
        ):
            return path
    return None


def main():
    parser = argparse.ArgumentParser(description="Agent Portrait — 工作区数据采集")
    parser.add_argument("--workspace", "-w", type=str, help="工作区路径（不指定则自动检测）")
    args = parser.parse_args()

    workspace = args.workspace or find_workspace()
    if not workspace:
        print("❌ 未找到工作区。请用 --workspace 指定路径。")
        raise SystemExit(1)

    workspace = os.path.abspath(os.path.expanduser(workspace))
    if not os.path.isdir(workspace):
        print(f"❌ 工作区路径不存在: {workspace}")
        raise SystemExit(1)

    print(f"📂 工作区: {workspace}")

    # 采集
    print("📄 采集核心文件...")
    files = collect_core_files(workspace)
    print(f"   找到 {len(files)} 个核心文件")

    print("📓 采集日记文件...")
    diary_files = collect_diary_files(workspace)
    print(f"   找到 {len(diary_files)} 个日记文件")

    print("🛠️  采集已安装 skills...")
    skills = collect_skills(workspace)
    print(f"   找到 {len(skills)} 个 skills")

    print("💬 统计对话数据...")
    session_stats = collect_session_stats()
    print(f"   30天内 {session_stats['total_sessions_30d']} 个会话，{session_stats['total_lines_30d']} 行")

    # 组装输出
    output = {
        "workspace_path": workspace,
        "collected_at": datetime.now(timezone.utc).isoformat(),
        "files": files,
        "diary_files": diary_files,
        "skills_installed": skills,
        "session_stats": session_stats,
    }

    # 写入 _ap_raw/collected.json
    output_dir = os.path.join(workspace, "_ap_raw")
    os.makedirs(output_dir, exist_ok=True)
    output_path = os.path.join(output_dir, "collected.json")

    with open(output_path, "w", encoding="utf-8") as f:
        json.dump(output, f, ensure_ascii=False, indent=2)

    print(f"\n✅ 采集完成！输出: {output_path}")
    print(f"   文件大小: {os.path.getsize(output_path) / 1024:.1f} KB")


if __name__ == "__main__":
    main()
