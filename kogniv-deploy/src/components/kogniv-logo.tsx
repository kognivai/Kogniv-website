interface KognivLogoProps {
  className?: string;
  iconOnly?: boolean;
  size?: "sm" | "md" | "lg";
}

export function KognivLogo({
  className = "",
  iconOnly = false,
  size = "md",
}: KognivLogoProps) {
  const scales = { sm: 0.75, md: 1, lg: 1.5 };
  const s = scales[size];

  const sq = 36 * s;
  const gap = 10 * s;
  const wordSize = 20 * s;
  const totalW = iconOnly ? sq : sq + gap + wordSize * 3.38;
  const totalH = sq;
  const id = `kgv-${size}`;

  return (
    <svg
      width={totalW}
      height={totalH}
      viewBox={`0 0 ${totalW} ${totalH}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Kogniv"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1E3A8A" />
          <stop offset="55%" stopColor="#1D4ED8" />
          <stop offset="100%" stopColor="#3B82F6" />
        </linearGradient>
      </defs>

      {/* Badge */}
      <rect x={0} y={0} width={sq} height={sq} rx={9 * s} fill={`url(#${id}-bg)`} />

      {/* K — same font as the wordmark, centered in badge */}
      <text
        x={sq * 0.5}
        y={sq * 0.535}
        textAnchor="middle"
        dominantBaseline="central"
        fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
        fontWeight="700"
        fontSize={21 * s}
        fill="white"
        letterSpacing={-0.5}
      >
        K
      </text>

      {/* Wordmark */}
      {!iconOnly && (
        <text
          x={sq + gap}
          y={sq * 0.735}
          fontFamily="'Inter', 'Helvetica Neue', Arial, sans-serif"
          fontWeight="700"
          fontSize={wordSize}
          fill="#60A5FA"
          letterSpacing={-0.6}
        >
          Kogniv
        </text>
      )}
    </svg>
  );
}
