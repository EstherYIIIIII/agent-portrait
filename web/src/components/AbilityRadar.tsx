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
    <section className="section-compact" ref={ref}>
      <h2 className="text-xs font-medium text-[var(--color-text-muted)] tracking-widest uppercase mb-5">
        能力雷达
      </h2>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        className="card p-8 flex justify-center"
      >
        <svg viewBox="0 0 300 300" className="w-full max-w-[280px]">
          {gridPaths.map((d, i) => (
            <path key={i} d={d} fill="none" stroke="#E8E0D6" strokeWidth="0.5" />
          ))}

          {abilities.map((_, i) => {
            const p = polarToCartesian(cx, cy, maxR, i * angleStep);
            return <line key={i} x1={cx} y1={cy} x2={p.x} y2={p.y} stroke="#E8E0D6" strokeWidth="0.5" />;
          })}

          <path
            d={dataPath}
            fill="rgba(196, 149, 106, 0.1)"
            stroke="#C4956A"
            strokeWidth="1.5"
            style={{ transition: "all 1s ease-out" }}
          />

          {dataPoints.map((p, i) => (
            <circle
              key={i}
              cx={p.x}
              cy={p.y}
              r="3.5"
              fill="#C4956A"
              stroke="white"
              strokeWidth="2"
              style={{ transition: "all 1s ease-out" }}
            />
          ))}

          {labelPoints.map((p, i) => (
            <g key={i}>
              <text
                x={p.x}
                y={p.y - 5}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#5C5549"
                fontSize="9"
                fontWeight="500"
              >
                {p.name}
              </text>
              <text
                x={p.x}
                y={p.y + 7}
                textAnchor="middle"
                dominantBaseline="middle"
                fill="#8C8279"
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
