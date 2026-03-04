"use client";

import { motion } from "framer-motion";
import { Ability } from "@/lib/types";
import { useEffect, useRef, useState } from "react";

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) };
}

const accentColors = ["#b8a9e8", "#7ecfb8", "#e8a9c8", "#f0c27a", "#82aaff", "#ff9682"];

export default function AbilityRadar({ abilities }: { abilities: Ability[] }) {
  const [visible, setVisible] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const cx = 150, cy = 150, maxR = 105;
  const n = abilities.length;
  const angleStep = 360 / n;

  const gridLevels = [0.25, 0.5, 0.75, 1.0];
  const gridPaths = gridLevels.map((level) => {
    const r = maxR * level;
    const points = abilities.map((_, i) => polarToCartesian(cx, cy, r, i * angleStep));
    return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
  });

  const dataPoints = abilities.map((a, i) => {
    const r = (a.score / 100) * maxR;
    return polarToCartesian(cx, cy, visible ? r : 0, i * angleStep);
  });
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  const labelPoints = abilities.map((a, i) => ({
    ...polarToCartesian(cx, cy, maxR + 28, i * angleStep),
    name: a.name,
    score: a.score,
  }));

  return (
    <section className="section px-6 max-w-[680px] mx-auto" ref={ref}>
      <div className="section-divider mb-12" />

      <motion.h2
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-xs uppercase tracking-[0.2em] text-[var(--accent-lavender)] mb-8 text-center"
      >
        能力雷达
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="glass-card p-8 flex justify-center"
      >
        <svg viewBox="0 0 300 300" className="w-full max-w-[280px]">
          {/* Grid */}
          {gridPaths.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="rgba(184, 169, 232, 0.08)" strokeWidth="0.5" />
          ))}

          {/* Axes */}
          {abilities.map((_, i) => {
            const p = polarToCartesian(cx, cy, maxR, i * angleStep);
            return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(184, 169, 232, 0.06)" strokeWidth="0.5" />;
          })}

          {/* Data area - glow */}
          <path
            d={dataPath}
            fill="rgba(184, 169, 232, 0.08)"
            stroke="none"
            style={{ transition: "all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)", filter: "blur(4px)" }}
          />

          {/* Data area */}
          <path
            d={dataPath}
            fill="rgba(184, 169, 232, 0.12)"
            stroke="url(#radarGradient)"
            strokeWidth="1.5"
            style={{ transition: "all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
          />

          {/* Gradient def */}
          <defs>
            <linearGradient id="radarGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#b8a9e8" />
              <stop offset="50%" stopColor="#7ecfb8" />
              <stop offset="100%" stopColor="#e8a9c8" />
            </linearGradient>
          </defs>

          {/* Data points */}
          {dataPoints.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="3"
              fill={accentColors[i % accentColors.length]}
              style={{ transition: "all 1.2s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
            />
          ))}

          {/* Labels */}
          {labelPoints.map((p, i) => (
            <g key={i}>
              <text
                x={p.x}
                y={p.y - 6}
                textAnchor="middle"
                dominantBaseline="middle"
                fill={accentColors[i % accentColors.length]}
                fontSize="9"
                fontWeight="500"
              >
                {p.name}
              </text>
              <text
                x={p.x}
                y={p.y + 6}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="rgba(238, 238, 246, 0.3)"
                fontSize="8"
              >
                {p.score}
              </text>
            </g>
          ))}
        </svg>
      </motion.div>
    </section>
  );
}
