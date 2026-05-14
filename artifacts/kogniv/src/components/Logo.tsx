interface LogoProps {
  size?: number;
  showWordmark?: boolean;
  className?: string;
}

export default function Logo({ size = 36, className = "" }: LogoProps) {
  const height = Math.round(size * 1.25);
  return (
    <span className={`inline-flex items-center ${className}`}>
      <img
        src="/kogniv-logo.png"
        alt="Kogniv"
        height={height}
        style={{ height: height, width: "auto", display: "block" }}
        draggable={false}
      />
    </span>
  );
}
