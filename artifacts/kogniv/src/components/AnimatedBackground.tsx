import { useEffect, useRef } from "react";

/* ─── palette ──────────────────────────────────────────────── */
const COLORS = [
  [99,  102, 241] as const,  // indigo  #6366F1
  [34,  211, 238] as const,  // cyan    #22D3EE
  [168,  85, 247] as const,  // purple  #A855F7
];
const pick = <T,>(a: T[]) => a[Math.floor(Math.random() * a.length)];
const rand = (a: number, b: number) => a + Math.random() * (b - a);
const rgba = ([r, g, b]: readonly [number, number, number], a: number) =>
  `rgba(${r},${g},${b},${a.toFixed(3)})`;

/* ─── types ────────────────────────────────────────────────── */
interface Node {
  x: number; y: number; vx: number; vy: number;
  r: number; color: readonly [number, number, number];
  glow: number;        // 0-1, decays after activation
  ring: number;        // expanding ring radius, 0 = none
  ringAlpha: number;
}
interface Packet {
  from: number; to: number;
  progress: number; speed: number;
  color: readonly [number, number, number];
}

/* ─── constants ─────────────────────────────────────────────── */
const MAX_DIST  = 190;
const CONN_FREQ = 40;   // frames between connection refresh

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raf       = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, tick = 0;
    let nodes:   Node[]   = [];
    let packets: Packet[] = [];
    let conns:   number[][] = [];   // conns[i] = list of j indices node i connects to

    /* ── initialise nodes ─────────────────────────────────── */
    const init = () => {
      const count = Math.min(70, Math.max(30, Math.floor(W * H / 14000)));
      nodes = Array.from({ length: count }, () => ({
        x: rand(0, W), y: rand(0, H),
        vx: rand(-0.12, 0.12), vy: rand(-0.12, 0.12),
        r: rand(1.8, 3.2),
        color: pick(COLORS),
        glow: 0, ring: 0, ringAlpha: 0,
      }));
      packets = [];
      buildConns();
    };

    /* ── build adjacency from proximity ───────────────────── */
    const buildConns = () => {
      conns = nodes.map((a, i) =>
        nodes.reduce<number[]>((acc, b, j) => {
          if (j === i) return acc;
          const d = Math.hypot(a.x - b.x, a.y - b.y);
          if (d < MAX_DIST) acc.push(j);
          return acc;
        }, [])
      );
    };

    /* ── spawn a travelling packet ────────────────────────── */
    const spawnPacket = () => {
      if (packets.length >= 28) return;
      const fi = Math.floor(Math.random() * nodes.length);
      const nb = conns[fi];
      if (!nb || nb.length === 0) return;
      packets.push({
        from: fi,
        to:   nb[Math.floor(Math.random() * nb.length)],
        progress: 0,
        speed: rand(0.003, 0.009),
        color: pick(COLORS),
      });
    };

    /* ── resize ───────────────────────────────────────────── */
    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      init();
    };

    /* ── main render loop ─────────────────────────────────── */
    const draw = () => {
      tick++;
      ctx.clearRect(0, 0, W, H);

      /* spawn packets */
      if (tick % 18 === 0) spawnPacket();

      /* refresh connections periodically */
      if (tick % CONN_FREQ === 0) buildConns();

      /* ── update + draw connections ── */
      ctx.lineWidth = 0.6;
      for (let i = 0; i < nodes.length; i++) {
        const a = nodes[i];
        for (const j of conns[i]) {
          if (j <= i) continue;
          const b   = nodes[j];
          const d   = Math.hypot(a.x - b.x, a.y - b.y);
          const t   = 1 - d / MAX_DIST;
          const [r, g, bl] = a.color;

          /* gradient edge: bright near active nodes */
          const boost = (a.glow + b.glow) * 0.25;
          const grad  = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
          grad.addColorStop(0, rgba(a.color, (t * 0.18) + boost));
          grad.addColorStop(1, rgba(b.color, (t * 0.18) + boost));
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = grad;
          ctx.stroke();
        }
      }

      /* ── update + draw packets ── */
      const live: Packet[] = [];
      for (const p of packets) {
        p.progress += p.speed;
        if (p.progress >= 1) {
          /* activate destination */
          nodes[p.to].glow  = 1;
          nodes[p.to].ring  = 0;
          nodes[p.to].ringAlpha = 1;
          continue;
        }
        live.push(p);

        const a = nodes[p.from];
        const b = nodes[p.to];
        const px = a.x + (b.x - a.x) * p.progress;
        const py = a.y + (b.y - a.y) * p.progress;

        /* head glow */
        const hg = ctx.createRadialGradient(px, py, 0, px, py, 14);
        hg.addColorStop(0, rgba(p.color, 0.55));
        hg.addColorStop(1, rgba(p.color, 0));
        ctx.beginPath(); ctx.arc(px, py, 14, 0, Math.PI * 2);
        ctx.fillStyle = hg; ctx.fill();

        /* bright core */
        ctx.beginPath(); ctx.arc(px, py, 2.2, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(255,255,255,0.95)"; ctx.fill();

        /* tail */
        const tail = 0.09;
        const t0   = Math.max(0, p.progress - tail);
        const tx0  = a.x + (b.x - a.x) * t0;
        const ty0  = a.y + (b.y - a.y) * t0;
        const tailGrad = ctx.createLinearGradient(tx0, ty0, px, py);
        tailGrad.addColorStop(0, rgba(p.color, 0));
        tailGrad.addColorStop(1, rgba(p.color, 0.6));
        ctx.beginPath(); ctx.moveTo(tx0, ty0); ctx.lineTo(px, py);
        ctx.strokeStyle = tailGrad;
        ctx.lineWidth   = 1.5; ctx.stroke();
      }
      packets = live;

      /* ── update + draw nodes ── */
      for (const n of nodes) {
        n.x += n.vx; n.y += n.vy;
        if (n.x < 0 || n.x > W) n.vx *= -1;
        if (n.y < 0 || n.y > H) n.vy *= -1;
        n.glow      = Math.max(0, n.glow - 0.018);
        n.ringAlpha = Math.max(0, n.ringAlpha - 0.022);
        if (n.ringAlpha > 0) n.ring += 1.8;

        /* expanding activation ring */
        if (n.ringAlpha > 0) {
          ctx.beginPath();
          ctx.arc(n.x, n.y, n.ring, 0, Math.PI * 2);
          ctx.strokeStyle = rgba(n.color, n.ringAlpha * 0.6);
          ctx.lineWidth   = 1;
          ctx.stroke();
        }

        /* soft ambient halo */
        const haloR = n.r * 7 + n.glow * 8;
        const halo  = ctx.createRadialGradient(n.x, n.y, 0, n.x, n.y, haloR);
        halo.addColorStop(0, rgba(n.color, 0.10 + n.glow * 0.25));
        halo.addColorStop(1, rgba(n.color, 0));
        ctx.beginPath(); ctx.arc(n.x, n.y, haloR, 0, Math.PI * 2);
        ctx.fillStyle = halo; ctx.fill();

        /* node body */
        const r = n.r + n.glow * 1.8;
        ctx.beginPath(); ctx.arc(n.x, n.y, r, 0, Math.PI * 2);
        ctx.fillStyle = rgba(n.color, 0.75 + n.glow * 0.25);
        ctx.fill();

        /* white specular core */
        ctx.beginPath(); ctx.arc(n.x, n.y, r * 0.38, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255,255,255,${(0.65 + n.glow * 0.35).toFixed(2)})`;
        ctx.fill();
      }

      raf.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}
