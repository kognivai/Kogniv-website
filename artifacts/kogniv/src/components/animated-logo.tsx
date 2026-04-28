import "./animated-logo.css";

const sparks = [
  { tx: "-55px", ty: "-40px", d: "2.2s", delay: "1.6s" },
  { tx: "60px",  ty: "-35px", d: "2.5s", delay: "2.1s" },
  { tx: "45px",  ty: "55px",  d: "2.0s", delay: "2.6s" },
  { tx: "-50px", ty: "48px",  d: "2.3s", delay: "3.0s" },
  { tx: "-30px", ty: "-60px", d: "1.9s", delay: "1.8s", size: "5px" },
  { tx: "65px",  ty: "15px",  d: "2.4s", delay: "2.4s", size: "4px" },
];

export function AnimatedLogo() {
  return (
    <div className="kogniv-scene">
      <div className="kogniv-ring kogniv-ring1" />
      <div className="kogniv-ring kogniv-ring2" />
      <div className="kogniv-glow-core" />

      {sparks.map((s, i) => (
        <div
          key={i}
          className="kogniv-spark"
          style={{
            "--tx": s.tx,
            "--ty": s.ty,
            "--d": s.d,
            "--delay": s.delay,
            ...(s.size ? { width: s.size, height: s.size } : {}),
          } as React.CSSProperties}
        />
      ))}

      <div className="kogniv-k-tile">
        <svg className="kogniv-k-svg" width="52" height="52" viewBox="0 0 52 52" style={{ overflow: "visible" }}>
          <path className="kogniv-k-path" d="M 14 8 L 14 44 M 14 26 L 38 8 M 14 26 L 38 44" />
        </svg>
      </div>

      <div className="kogniv-wordmark">
        Kogniv
      </div>
      <div className="kogniv-tagline">www.kogniv.com</div>
    </div>
  );
}
