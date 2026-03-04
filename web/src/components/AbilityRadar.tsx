"use client";

import { motion } from "framer-motion";
import { Ability } from "@/lib/types";
import { useEffect, useRef, useState } from "react";

function polarToCartesian(cx: number, cy: number, r: number, angleDeg: number) {
  const angleRad = ((angleDeg - 90) * Math.PI) / 180;
  return { x: cx + r * Math.cos(angleRad), y: cy + r * Math.sin(angleRad) };
}

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

  const cx = 150, cy = 150, maxR = 110;
  const n = abilities.length;
  const angleStep = 360 / n;

  // Background grid
  const gridLevels = [0.25, 0.5, 0.75, 1.0];
  const gridPaths = gridLevels.map((level) => {
    const r = maxR * level;
    const points = abilities.map((_, i) => polarToCartesian(cx, cy, r, i * angleStep));
    return points.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";
  });

  // Data polygon
  const dataPoints = abilities.map((a, i) => {
    const r = (a.score / 100) * maxR;
    return polarToCartesian(cx, cy, visible ? r : 0, i * angleStep);
  });
  const dataPath = dataPoints.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ") + " Z";

  // Labels
  const labelPoints = abilities.map((a, i) => ({
    ...polarToCartesian(cx, cy, maxR + 24, i * angleStep),
    name: a.name,
    score: a.score,
  }));

  return (
    <section className="section px-4 max-w-2xl mx-auto" ref={ref}>
      <motion.h2
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-2xl font-bold mb-8 gradient-text"
      >
        能力雷达
      </motion.h2>

      <div className="glass-card p-6 flex justify-center">
        <svg viewBox="0 0 300 300" className="w-full max-w-[300px]">
          {/* Grid */}
          {gridPaths.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="rgba(255,255,255,0.08)" strokeWidth="1" />
          ))}

          {/* Axes */}
          {abilities.map((_, i) => {
            const p = polarToCartesian(cx, cy, maxR, i * angleStep);
            return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="rgba(255,255,255,0.06)" strokeWidth="1" />;
          })}

          {/* Data area */}
          <path
            d={dataPath}
            fill="rgba(124, 106, 255, 0.15)"
            stroke="#7c6aff"
            strokeWidth="2"
            style={{
              transition: "all 1s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          />

          {/* Data points */}
          {dataPoints.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="4"
              fill="#7c6aff"
              stroke="#050505"
              strokeWidth="2"
              style={{ transition: "all 1s cubic-bezier(0.34, 1.56, 0.64, 1)" }}
            />
          ))}

          {/* Labels */}
          {labelPoints.map((p, i) => (
            <text
              key={i}
              x={p.x}
              y={p.y}
              textAnchor="middle"
              dominantBaseline="middle"
              fill="rgba(255,255,255,0.6)"
              fontSize="10"
            >
              {p.name}
            </text>
          ))}
        </svg>
      </div>
    </section>
  );
}
