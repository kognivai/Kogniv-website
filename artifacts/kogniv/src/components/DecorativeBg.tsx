/* Reusable decorative background elements — all absolutely positioned, pointer-events-none */

/** Subtle dot grid that tiles across the section */
export function DotGrid({ opacity = 0.18, color = "#6366F1", spacing = 28 }: { opacity?: number; color?: string; spacing?: number }) {
  const id = `dg-${color.replace("#", "")}-${spacing}`;
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
      <defs>
        <pattern id={id} x="0" y="0" width={spacing} height={spacing} patternUnits="userSpaceOnUse">
          <circle cx={spacing / 2} cy={spacing / 2} r="1" fill={color} opacity={opacity} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/** Large partial arc rings decorating a corner or edge */
export function ArcRings({ cx = "110%", cy = "-10%", r1 = 380, r2 = 560, r3 = 720, color = "#6366F1", opacity = 0.12 }:
  { cx?: string; cy?: string; r1?: number; r2?: number; r3?: number; color?: string; opacity?: number }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible" aria-hidden>
      {[r1, r2, r3].map((r, i) => (
        <circle key={i} cx={cx} cy={cy} r={r}
          fill="none" stroke={color} strokeWidth="1"
          opacity={opacity - i * 0.03}
          strokeDasharray={i === 1 ? "6 10" : i === 2 ? "2 14" : undefined} />
      ))}
    </svg>
  );
}

/** Soft radial glow blob */
export function GlowOrb({ x = "80%", y = "20%", size = 500, color = "#6366F1", opacity = 0.12 }:
  { x?: string; y?: string; size?: number; color?: string; opacity?: number }) {
  const id = `orb-${x}-${y}-${color.replace("#", "")}`.replace(/[%\s]/g, "");
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden style={{ overflow: "visible" }}>
      <defs>
        <radialGradient id={id} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity={opacity} />
          <stop offset="100%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cx={x} cy={y} rx={size} ry={size * 0.75} fill={`url(#${id})`} />
    </svg>
  );
}

/** Diagonal parallel lines streaming across the section */
export function DiagonalLines({ color = "#6366F1", opacity = 0.07, count = 8, angle = -35 }:
  { color?: string; opacity?: number; count?: number; angle?: number }) {
  const id = `dl-${color.replace("#", "")}-${angle}`;
  const rad = (angle * Math.PI) / 180;
  const spacing = 80;
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden style={{ overflow: "visible" }}>
      <defs>
        <pattern id={id} x="0" y="0" width={spacing} height={spacing} patternUnits="userSpaceOnUse" patternTransform={`rotate(${angle})`}>
          <line x1={spacing / 2} y1="-500" x2={spacing / 2} y2="1500" stroke={color} strokeWidth="1" opacity={opacity} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/** Hexagonal wireframe grid */
export function HexGrid({ opacity = 0.08, color = "#6366F1", size = 48 }:
  { opacity?: number; color?: string; size?: number }) {
  const id = `hx-${color.replace("#", "")}-${size}`;
  const w = size * 2;
  const h = size * Math.sqrt(3);
  const points = [
    [size, 0], [size * 2, h / 4], [size * 2, (h * 3) / 4],
    [size, h], [0, (h * 3) / 4], [0, h / 4],
  ].map(([x, y]) => `${x},${y}`).join(" ");
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
      <defs>
        <pattern id={id} x="0" y="0" width={w} height={h} patternUnits="userSpaceOnUse">
          <polygon points={points} fill="none" stroke={color} strokeWidth="0.8" opacity={opacity} />
          <polygon points={points} fill="none" stroke={color} strokeWidth="0.8" opacity={opacity}
            transform={`translate(${size},${h / 2})`} />
        </pattern>
      </defs>
      <rect width="100%" height="100%" fill={`url(#${id})`} />
    </svg>
  );
}

/** Radiating lines from a focal point */
export function RadialBurst({ cx = "50%", cy = "100%", spokes = 16, len = 700, color = "#6366F1", opacity = 0.06 }:
  { cx?: string; cy?: string; spokes?: number; len?: number; color?: string; opacity?: number }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden style={{ overflow: "visible" }}>
      {Array.from({ length: spokes }).map((_, i) => {
        const angle = (i / spokes) * 180 - 90;
        const rad = (angle * Math.PI) / 180;
        return (
          <line key={i}
            x1={cx} y1={cy}
            x2={`calc(${cx} + ${(Math.cos(rad) * len).toFixed(1)}px)`}
            y2={`calc(${cy} + ${(Math.sin(rad) * len).toFixed(1)}px)`}
            stroke={color} strokeWidth="1" opacity={opacity - (i % 3) * 0.01}
          />
        );
      })}
    </svg>
  );
}

/** Concentric rings — good for "radar" / contact section feel */
export function ConcentricRings({ cx = "50%", cy = "50%", rings = 5, baseR = 100, step = 120, color = "#6366F1", opacity = 0.1 }:
  { cx?: string; cy?: string; rings?: number; baseR?: number; step?: number; color?: string; opacity?: number }) {
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden style={{ overflow: "visible" }}>
      {Array.from({ length: rings }).map((_, i) => (
        <circle key={i} cx={cx} cy={cy} r={baseR + i * step}
          fill="none" stroke={color} strokeWidth="1"
          opacity={opacity - i * 0.015}
          strokeDasharray={i % 2 === 1 ? "4 12" : undefined} />
      ))}
    </svg>
  );
}

/** Circuit-board style L-shaped line paths */
export function CircuitLines({ color = "#6366F1", opacity = 0.07 }:
  { color?: string; opacity?: number }) {
  const paths = [
    "M -40 120 H 180 V 60 H 400",
    "M 600 -20 V 140 H 820 V 220",
    "M 200 300 H 440 V 180 H 560",
    "M 900 80 H 700 V 200 H 500",
    "M 0 400 H 120 V 340 H 300 V 280",
    "M 1100 300 H 920 V 380 H 760",
  ];
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden style={{ overflow: "visible" }}>
      {paths.map((d, i) => (
        <g key={i}>
          <path d={d} fill="none" stroke={color} strokeWidth="1" opacity={opacity} />
          <circle
            cx={parseFloat(d.split(" ").filter(s => !isNaN(parseFloat(s)))[0])}
            cy={parseFloat(d.split(" ").filter(s => !isNaN(parseFloat(s)))[1])}
            r="3" fill="none" stroke={color} strokeWidth="1" opacity={opacity * 1.5}
          />
        </g>
      ))}
    </svg>
  );
}

/** Scattered star/sparkle dots */
export function StarField({ count = 40, color = "#6366F1", opacity = 0.3 }:
  { count?: number; color?: string; opacity?: number }) {
  const stars = Array.from({ length: count }, (_, i) => ({
    x: ((i * 137.508) % 100).toFixed(2) + "%",
    y: ((i * 97.32 + 13) % 100).toFixed(2) + "%",
    r: (0.8 + (i % 3) * 0.6).toFixed(1),
    o: (opacity * (0.4 + (i % 5) * 0.12)).toFixed(2),
  }));
  return (
    <svg className="absolute inset-0 w-full h-full pointer-events-none" aria-hidden>
      {stars.map((s, i) => (
        <circle key={i} cx={s.x} cy={s.y} r={s.r} fill={color} opacity={s.o} />
      ))}
    </svg>
  );
}
