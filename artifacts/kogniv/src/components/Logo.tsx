interface LogoProps {
  size?: number;
  showWordmark?: boolean;
  className?: string;
}

export default function Logo({ size = 36, showWordmark = true, className = "" }: LogoProps) {
  const r = size * 0.22;
  return (
    <span className={`inline-flex items-center gap-2.5 ${className}`}>
      <svg
        width={size}
        height={size}
        viewBox="0 0 36 36"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{ flexShrink: 0 }}
      >
        <defs>
          <linearGradient id="logo-bg" x1="0" y1="0" x2="36" y2="36" gradientUnits="userSpaceOnUse">
            <stop offset="0%"   stopColor="#6B7CF6" />
            <stop offset="100%" stopColor="#4F46E5" />
          </linearGradient>
        </defs>
        <rect width="36" height="36" rx={r} fill="url(#logo-bg)" />
        <text
          x="18"
          y="25"
          textAnchor="middle"
          fill="white"
          fontFamily="'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif"
          fontWeight="700"
          fontSize="20"
          letterSpacing="-0.5"
        >
          K
        </text>
      </svg>

      {showWordmark && (
        <span style={{
          fontFamily: "'Inter', 'Helvetica Neue', Helvetica, Arial, sans-serif",
          fontWeight: 600,
          fontSize: size * 0.47,
          color: "#ffffff",
          letterSpacing: "0.04em",
          lineHeight: 1,
        }}>
          Kogniv
        </span>
      )}
    </span>
  );
}
