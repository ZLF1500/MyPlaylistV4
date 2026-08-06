/* Deterministic "random-looking" spread using a golden-angle step, so the
   particle field looks organic without relying on Math.random(). */
const BOKEH = Array.from({ length: 16 }).map((_, i) => {
  const seed = i * 137.5 + 41;
  return {
    left: seed % 100,
    top: (seed * 1.7) % 100,
    size: 26 + (i % 5) * 12,
    dur: 16 + (i % 6) * 4,
    delay: -((i % 9) * 1.8),
    variant: (i % 3) + 1,
    color: i % 2 === 0 ? "var(--glow1)" : "var(--glow2)",
    peakOp: 0.28 + (i % 4) * 0.05,
  };
});

const DUST = Array.from({ length: 55 }).map((_, i) => {
  const seed = i * 137.5 + 7;
  return {
    left: seed % 100,
    top: (seed * 1.7) % 100,
    size: 2 + (i % 4) * 1.5,
    dur: 5 + (i % 8) * 1.4,
    delay: -((i % 11) * 1.1),
    variant: (i % 3) + 1,
    color: i % 3 === 0 ? "var(--glow3)" : i % 3 === 1 ? "var(--glow2)" : "var(--glow1)",
    peakOp: 0.6 + (i % 4) * 0.1,
  };
});

export default function ParticleField() {
  return (
    <div className="mm-particle-layer">
      {BOKEH.map((p, i) => (
        <span
          key={`b${i}`}
          className={`mm-bokeh mm-particle-v${p.variant}`}
          style={{
            left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size,
            background: `radial-gradient(circle, ${p.color} 0%, transparent 70%)`,
            animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s`,
            "--peak-op": p.peakOp,
          }}
        />
      ))}
      {DUST.map((p, i) => (
        <span
          key={`d${i}`}
          className={`mm-dust mm-particle-v${p.variant}`}
          style={{
            left: `${p.left}%`, top: `${p.top}%`, width: p.size, height: p.size,
            background: p.color, boxShadow: `0 0 ${p.size * 1.8}px ${p.size * 0.5}px ${p.color}`,
            animationDuration: `${p.dur}s`, animationDelay: `${p.delay}s`,
            "--peak-op": p.peakOp,
          }}
        />
      ))}
    </div>
  );
}
