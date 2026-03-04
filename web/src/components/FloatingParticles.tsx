"use client";

export default function FloatingParticles() {
  const colors = [
    "rgba(184, 169, 232, 0.5)",  // lavender
    "rgba(126, 207, 184, 0.5)",  // mint
    "rgba(232, 169, 200, 0.4)",  // rose
  ];

  const particles = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: 2 + Math.random() * 3,
    delay: Math.random() * 10,
    duration: 8 + Math.random() * 12,
    opacity: 0.1 + Math.random() * 0.15,
    color: colors[i % colors.length],
  }));

  return (
    <>
      <div className="ambient-bg" />
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {particles.map((p) => (
          <div
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              background: p.color,
              opacity: p.opacity,
              animation: `float ${p.duration}s ease-in-out ${p.delay}s infinite`,
            }}
          />
        ))}
      </div>
    </>
  );
}
