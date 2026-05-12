import { useEffect, useRef } from "react";

type RGB = [number, number, number];

/* ── colour helpers ──────────────────────────────────────────── */
function hslToRgb(h: number, s: number, l: number): RGB {
  h = ((h % 360) + 360) % 360;
  s /= 100; l /= 100;
  const a = s * Math.min(l, 1 - l);
  const f = (n: number) => {
    const k = (n + h / 30) % 12;
    return l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  };
  return [Math.round(f(0) * 255), Math.round(f(8) * 255), Math.round(f(4) * 255)];
}
const rgba = ([r, g, b]: RGB, a: number) => `rgba(${r},${g},${b},${a.toFixed(3)})`;
const rand = (a: number, b: number) => a + Math.random() * (b - a);

/* ── interfaces ──────────────────────────────────────────────── */
interface DataLine {
  x1: number; y1: number; x2: number; y2: number;
  progress: number; speed: number;
  baseHue: number; hueRange: number;
  tailLength: number; width: number; opacity: number;
}

interface Particle {
  x: number; y: number; vx: number; vy: number;
  radius: number; baseHue: number;
  opacity: number; pulse: number;
}

/* base hues spread across indigo → purple → cyan band */
const BASE_HUES = [235, 255, 270, 190, 245, 280, 200];
const pickHue   = () => BASE_HUES[Math.floor(Math.random() * BASE_HUES.length)];

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef    = useRef<number>(0);
  const tick      = useRef(0);
  const particles = useRef<Particle[]>([]);
  const lines     = useRef<DataLine[]>([]);
  const WH        = useRef({ W: 0, H: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    /* ── helpers ─────────────────────────────────────────── */
    const makeLine = (): DataLine => {
      const { W, H } = WH.current;
      const side = Math.floor(Math.random() * 4);
      let x1: number, y1: number, x2: number, y2: number;
      if      (side === 0) { x1 = -20;    y1 = rand(0,H); x2 = W+20; y2 = y1+rand(-H*.35,H*.35); }
      else if (side === 1) { x1 = W+20;   y1 = rand(0,H); x2 = -20;  y2 = y1+rand(-H*.35,H*.35); }
      else if (side === 2) { x1 = rand(0,W); y1 = -20;    x2 = x1+rand(-W*.35,W*.35); y2 = H+20; }
      else                  { x1 = rand(0,W); y1 = H+20;  x2 = x1+rand(-W*.35,W*.35); y2 = -20; }
      return {
        x1: x1!, y1: y1!, x2: x2!, y2: y2!,
        progress: Math.random(),
        speed:    rand(0.0008, 0.0025),
        baseHue:  pickHue(),
        hueRange: rand(-30, 30),
        tailLength: rand(0.12, 0.28),
        width:    rand(0.6, 1.8),
        opacity:  rand(0.45, 0.85),
      };
    };

    const init = () => {
      const { W, H } = WH.current;
      particles.current = Array.from({ length: 45 }, () => ({
        x: rand(0, W), y: rand(0, H),
        vx: rand(-0.35, 0.35), vy: rand(-0.35, 0.35),
        radius: rand(1, 2.5),
        baseHue: pickHue(),
        opacity: rand(0.4, 0.85),
        pulse: rand(0, Math.PI * 2),
      }));
      lines.current   = Array.from({ length: 22 }, makeLine);
    };

    const resize = () => {
      WH.current.W = canvas.width  = canvas.offsetWidth;
      WH.current.H = canvas.height = canvas.offsetHeight;
      init();
    };

    /* ── draw layers ─────────────────────────────────────── */
    const drawAuroras = (W: number, H: number, shift: number) => {
      const t = tick.current;
      [
        { ox:0.28, oy:0.32, ox2:0.10, oy2:0.08, ft:0.14, ft2:0.11, rr:0.52, ra:0.60, bh: 240, o:0.14 },
        { ox:0.72, oy:0.58, ox2:0.08, oy2:0.07, ft:0.09, ft2:0.13, rr:0.44, ra:0.55, bh: 270, o:0.10 },
        { ox:0.50, oy:0.18, ox2:0.11, oy2:0.06, ft:0.07, ft2:0.10, rr:0.38, ra:0.50, bh: 190, o:0.07 },
      ].forEach(a => {
        const cx = W * (a.ox + a.ox2 * Math.sin(t * a.ft));
        const cy = H * (a.oy + a.oy2 * Math.cos(t * a.ft2));
        const rx = Math.min(W, H) * a.rr;
        const ry = rx * a.ra;
        const c  = hslToRgb(a.bh + shift, 85, 68);
        const gr = ctx.createRadialGradient(cx, cy, 0, cx, cy, rx);
        gr.addColorStop(0,   rgba(c, a.o));
        gr.addColorStop(0.5, rgba(c, a.o * 0.35));
        gr.addColorStop(1,   rgba(c, 0));
        ctx.save();
        ctx.translate(cx, cy); ctx.scale(1, ry / rx); ctx.translate(-cx, -cy);
        ctx.beginPath(); ctx.arc(cx, cy, rx, 0, Math.PI * 2);
        ctx.fillStyle = gr; ctx.fill();
        ctx.restore();
      });
    };

    const drawGrid = (W: number, H: number, shift: number) => {
      const vy = H * 0.72;
      const gc = hslToRgb(240 + shift, 70, 65);
      const dc = hslToRgb(265 + shift, 70, 65);
      ctx.save();
      for (let i = 1; i <= 10; i++) {
        const fi = i / 10;
        const y = vy + (H - vy) * Math.pow(fi, 0.6);
        ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(W, y);
        ctx.strokeStyle = rgba(gc, 0.025 + fi * 0.04);
        ctx.lineWidth = 0.5; ctx.stroke();
      }
      const vx = W * 0.5;
      for (let i = 0; i <= 18; i++) {
        const fi = i / 18;
        const xB = fi * W;
        const xT = vx + (xB - vx) * 0.06;
        const ofs = Math.abs(fi - 0.5);
        ctx.beginPath(); ctx.moveTo(xT, H * 0.15); ctx.lineTo(xB, H);
        ctx.strokeStyle = rgba(gc, 0.02 + ofs * 0.07);
        ctx.lineWidth = 0.5; ctx.stroke();
      }
      for (let i = -4; i <= 12; i++) {
        const x = (i / 12) * W;
        ctx.beginPath(); ctx.moveTo(x - W * 0.3, 0); ctx.lineTo(x + W * 0.3, H);
        ctx.strokeStyle = rgba(dc, 0.018);
        ctx.lineWidth = 0.5; ctx.stroke();
      }
      ctx.restore();
    };


    const drawDataLines = (shift: number) => {
      for (const dl of lines.current) {
        dl.progress += dl.speed;
        if (dl.progress > 1 + dl.tailLength) {
          Object.assign(dl, makeLine()); dl.progress = 0; continue;
        }
        const p    = dl.progress;
        const tail = dl.tailLength;
        const segs = 24;
        const c    = hslToRgb(dl.baseHue + dl.hueRange + shift, 85, 68);

        for (let s = 0; s < segs; s++) {
          const t0 = Math.max(0, p - tail + (s       / segs) * tail);
          const t1 = Math.max(0, p - tail + ((s + 1) / segs) * tail);
          if (t0 >= p || t1 > 1) continue;
          const alpha = (s / (segs - 1)) * dl.opacity;
          ctx.beginPath();
          ctx.moveTo(dl.x1 + (dl.x2-dl.x1)*t0,              dl.y1 + (dl.y2-dl.y1)*t0);
          ctx.lineTo(dl.x1 + (dl.x2-dl.x1)*Math.min(t1, p), dl.y1 + (dl.y2-dl.y1)*Math.min(t1, p));
          ctx.strokeStyle = rgba(c, alpha);
          ctx.lineWidth   = dl.width; ctx.stroke();
        }

        if (p <= 1) {
          const hx = dl.x1 + (dl.x2-dl.x1)*p;
          const hy = dl.y1 + (dl.y2-dl.y1)*p;
          const glow = ctx.createRadialGradient(hx, hy, 0, hx, hy, 10);
          glow.addColorStop(0, rgba(c, 0.9));
          glow.addColorStop(1, rgba(c, 0));
          ctx.beginPath(); ctx.arc(hx, hy, 10, 0, Math.PI*2);
          ctx.fillStyle = glow; ctx.fill();
          ctx.beginPath(); ctx.arc(hx, hy, 1.8, 0, Math.PI*2);
          ctx.fillStyle = "rgba(255,255,255,0.95)"; ctx.fill();
        }
      }
    };

    const drawParticles = (W: number, H: number, shift: number) => {
      for (const p of particles.current) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < 0 || p.x > W) p.vx *= -1;
        if (p.y < 0 || p.y > H) p.vy *= -1;
        p.pulse += 0.018;
        const pulse = 0.75 + 0.25 * Math.sin(p.pulse);
        const c     = hslToRgb(p.baseHue + shift, 85, 70);
        const gr    = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.radius * 9 * pulse);
        gr.addColorStop(0, rgba(c, 0.28 * pulse));
        gr.addColorStop(1, rgba(c, 0));
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius * 9 * pulse, 0, Math.PI*2);
        ctx.fillStyle = gr; ctx.fill();
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius * pulse, 0, Math.PI*2);
        ctx.fillStyle = rgba(c, p.opacity); ctx.fill();
        ctx.beginPath(); ctx.arc(p.x, p.y, p.radius * 0.35, 0, Math.PI*2);
        ctx.fillStyle = `rgba(255,255,255,${(0.55 * pulse).toFixed(3)})`; ctx.fill();
      }
    };

    /* ── main loop ───────────────────────────────────────── */
    const draw = () => {
      tick.current += 0.016;
      const { W, H } = WH.current;
      /* hue shift: full 360° cycle every ~190 s (tick * 0.085 deg/frame) */
      const shift = (tick.current * 0.085 * (180 / Math.PI)) % 360;

      ctx.clearRect(0, 0, W, H);
      drawAuroras(W, H, shift);
      drawGrid(W, H, shift);
      drawDataLines(shift);
      drawParticles(W, H, shift);

      rafRef.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
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
