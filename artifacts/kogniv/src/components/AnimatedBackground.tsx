import { useEffect, useRef } from "react";

/* ─── types ────────────────────────────────────────────────── */
type Col = [number, number, number];
const rgba = ([r, g, b]: Col, a: number) => `rgba(${r},${g},${b},${a.toFixed(3)})`;
const lerp  = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) => Math.min(Math.max(v, lo), hi);
const rand  = (a: number, b: number) => a + Math.random() * (b - a);
const lerpCol = (a: Col, b: Col, t: number): Col =>
  [Math.round(lerp(a[0], b[0], t)), Math.round(lerp(a[1], b[1], t)), Math.round(lerp(a[2], b[2], t))];

/* ─── palette ───────────────────────────────────────────────── */
const INDIGO: Col = [99,  102, 241];
const CYAN:   Col = [34,  211, 238];
const PURPLE: Col = [168,  85, 247];
const RED:    Col = [239, 100,  60];
const DARK:   Col = [11,   19,  45];

const LABELS = ["ITSM", "HR", "IT Ops", "CRM", "Vendor", "Approval", "Audit", "Catalog", "Finance", "Legal"];

interface Block {
  id: number; x: number; y: number; vx: number; vy: number;
  label: string; fixProg: number; pulse: number;
}
interface Edge {
  a: number; b: number; fixProg: number;
  jag: [number, number][];  // jagged waypoints for broken state
  pkt: number;              // packet progress 0-1, -1=none
  pktCol: Col;
}

const BW = 72, BH = 26;

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raf       = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0;
    let blocks: Block[] = [];
    let edges:  Edge[]  = [];

    /* ── cycle state ──────────────────────────────────────────
       0.00 – 0.18  Chaos   (broken paths, floating blocks)
       0.18 – 0.62  Fixing  (AI orb travels, paths heal)
       0.62 – 0.88  Orch    (clean orchestration map)
       0.88 – 1.00  Fade    (smooth reset)
    ───────────────────────────────────────────────────────── */
    const CYCLE_S  = 20;
    const P_FIX    = 0.18;
    const P_ORCH   = 0.62;
    const P_FADE   = 0.88;

    let cycleT    = 0;
    let lastTime  = 0;
    let aiSrcBlk  = 0;           // block AI orb is currently at
    let aiEdgeIdx = -1;          // edge currently being traversed
    let aiEdgePr  = 0;           // progress along that edge (0-1)
    let aiX = 0, aiY = 0;

    /* ── helpers ──────────────────────────────────────────── */
    const makeJag = (a: Block, b: Block): [number, number][] => {
      const pts: [number, number][] = [];
      const steps = Math.floor(rand(3, 6));
      for (let i = 1; i < steps; i++) {
        const t = i / steps;
        const jit = rand(18, 45) * (Math.random() > 0.5 ? 1 : -1);
        pts.push([lerp(a.x, b.x, t) + jit, lerp(a.y, b.y, t) + jit * 0.5]);
      }
      return pts;
    };

    const bezier = (a: Block, b: Block, t: number): [number, number] => {
      const cpx = (a.x + b.x) / 2 + (b.y - a.y) * 0.18;
      const cpy = (a.y + b.y) / 2 - (b.x - a.x) * 0.18;
      return [
        (1-t)*(1-t)*a.x + 2*(1-t)*t*cpx + t*t*b.x,
        (1-t)*(1-t)*a.y + 2*(1-t)*t*cpy + t*t*b.y,
      ];
    };

    /* ── init ─────────────────────────────────────────────── */
    const init = () => {
      const N = clamp(Math.floor(W * H / 18000), 6, 10);
      blocks = Array.from({ length: N }, (_, i) => ({
        id: i,
        x: rand(BW * 2, W - BW * 2),
        y: rand(BH * 3, H - BH * 3),
        vx: rand(-0.10, 0.10),
        vy: rand(-0.10, 0.10),
        label: LABELS[i % LABELS.length],
        fixProg: 0,
        pulse: rand(0, Math.PI * 2),
      }));

      edges = [];
      for (let i = 0; i < blocks.length; i++) {
        const sorted = blocks
          .map((b, j) => ({ j, d: Math.hypot(b.x - blocks[i].x, b.y - blocks[i].y) }))
          .filter(d => d.j !== i).sort((a, b) => a.d - b.d);
        const nConns = Math.floor(rand(1, 3));
        for (let k = 0; k < nConns && k < sorted.length; k++) {
          const j = sorted[k].j;
          if (!edges.some(e => (e.a === i && e.b === j) || (e.a === j && e.b === i))) {
            edges.push({ a: i, b: j, fixProg: 0, jag: makeJag(blocks[i], blocks[j]), pkt: -1, pktCol: CYAN });
          }
        }
      }

      cycleT = 0;
      aiSrcBlk = Math.floor(Math.random() * blocks.length);
      aiEdgeIdx = -1;
      aiEdgePr  = 0;
      aiX = blocks[aiSrcBlk].x;
      aiY = blocks[aiSrcBlk].y;
    };

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
      init();
    };

    /* ── drawing primitives ───────────────────────────────── */
    const rrect = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      ctx.moveTo(x + r, y);
      ctx.lineTo(x + w - r, y); ctx.arcTo(x + w, y, x + w, y + r, r);
      ctx.lineTo(x + w, y + h - r); ctx.arcTo(x + w, y + h, x + w - r, y + h, r);
      ctx.lineTo(x + r, y + h); ctx.arcTo(x, y + h, x, y + h - r, r);
      ctx.lineTo(x, y + r); ctx.arcTo(x, y, x + r, y, r);
      ctx.closePath();
    };

    const drawBrokenEdge = (e: Edge, alpha: number) => {
      const a = blocks[e.a], b = blocks[e.b];
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.setLineDash([5, 9]);
      ctx.lineWidth = 1;
      ctx.strokeStyle = rgba(RED, 0.45);
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      for (const [px, py] of e.jag) ctx.lineTo(px, py);
      ctx.lineTo(b.x, b.y);
      ctx.stroke();
      /* small "break" X markers at midpoint */
      const mx = (a.x + b.x) / 2, my = (a.y + b.y) / 2;
      ctx.setLineDash([]);
      ctx.strokeStyle = rgba(RED, 0.55);
      ctx.lineWidth = 1;
      ctx.beginPath(); ctx.moveTo(mx - 4, my - 4); ctx.lineTo(mx + 4, my + 4); ctx.stroke();
      ctx.beginPath(); ctx.moveTo(mx + 4, my - 4); ctx.lineTo(mx - 4, my + 4); ctx.stroke();
      ctx.restore();
    };

    const drawFixedEdge = (e: Edge, alpha: number) => {
      const a = blocks[e.a], b = blocks[e.b];
      ctx.save();
      ctx.globalAlpha = alpha;
      const cpx = (a.x + b.x) / 2 + (b.y - a.y) * 0.18;
      const cpy = (a.y + b.y) / 2 - (b.x - a.x) * 0.18;
      const gr = ctx.createLinearGradient(a.x, a.y, b.x, b.y);
      gr.addColorStop(0, rgba(INDIGO, 0.65));
      gr.addColorStop(1, rgba(CYAN,   0.65));
      ctx.beginPath();
      ctx.moveTo(a.x, a.y);
      ctx.quadraticCurveTo(cpx, cpy, b.x, b.y);
      ctx.strokeStyle = gr;
      ctx.lineWidth = 1.5;
      ctx.stroke();
      ctx.restore();
    };

    const drawPacket = (e: Edge) => {
      if (e.pkt < 0 || e.pkt > 1) return;
      const a = blocks[e.a], b = blocks[e.b];
      const [px, py] = bezier(a, b, e.pkt);
      const [t0, t0_] = bezier(a, b, Math.max(0, e.pkt - 0.1));
      const gr = ctx.createRadialGradient(px, py, 0, px, py, 12);
      gr.addColorStop(0, rgba(e.pktCol, 0.7));
      gr.addColorStop(1, rgba(e.pktCol, 0));
      ctx.beginPath(); ctx.arc(px, py, 12, 0, Math.PI * 2);
      ctx.fillStyle = gr; ctx.fill();
      ctx.beginPath(); ctx.arc(px, py, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,0.96)"; ctx.fill();
      /* tail */
      const tailGr = ctx.createLinearGradient(t0_, py, px, py);
      tailGr.addColorStop(0, rgba(e.pktCol, 0));
      tailGr.addColorStop(1, rgba(e.pktCol, 0.55));
      ctx.beginPath(); ctx.moveTo(t0, t0_); ctx.lineTo(px, py);
      ctx.strokeStyle = tailGr; ctx.lineWidth = 1.5; ctx.stroke();
    };

    const drawBlock = (b: Block, alpha: number) => {
      const fp  = b.fixProg;
      const col = lerpCol(RED, INDIGO, fp);
      const glc = lerpCol(RED, CYAN,   fp);
      const pul = 0.85 + 0.15 * Math.sin(b.pulse);
      ctx.save();
      ctx.globalAlpha = alpha;
      /* glow halo */
      const gr = ctx.createRadialGradient(b.x, b.y, 0, b.x, b.y, 48 * pul);
      gr.addColorStop(0, rgba(glc, (0.06 + fp * 0.16) * pul));
      gr.addColorStop(1, rgba(glc, 0));
      ctx.beginPath(); ctx.arc(b.x, b.y, 48 * pul, 0, Math.PI * 2);
      ctx.fillStyle = gr; ctx.fill();
      /* block body */
      rrect(b.x - BW/2, b.y - BH/2, BW, BH, 5);
      ctx.fillStyle = rgba(DARK, 0.88);
      ctx.fill();
      /* border */
      ctx.strokeStyle = rgba(col, 0.85);
      ctx.lineWidth   = fp > 0.5 ? 1.5 : 1;
      ctx.stroke();
      /* status dot */
      const dotCol: Col = fp > 0.8 ? CYAN : fp > 0.3 ? PURPLE : RED;
      ctx.beginPath(); ctx.arc(b.x - BW/2 + 8, b.y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = rgba(dotCol, 0.95); ctx.fill();
      /* label */
      ctx.fillStyle = rgba(lerpCol([220, 100, 60], [200, 220, 255], fp), 0.92);
      ctx.font = `${fp > 0.5 ? "600" : "400"} 10px ui-monospace, monospace`;
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(b.label, b.x + 4, b.y);
      ctx.restore();
    };

    const drawAIOrb = (x: number, y: number, alpha: number) => {
      ctx.save();
      ctx.globalAlpha = alpha;
      /* outer ring */
      ctx.beginPath(); ctx.arc(x, y, 22, 0, Math.PI * 2);
      ctx.strokeStyle = rgba(CYAN, 0.35); ctx.lineWidth = 1; ctx.stroke();
      /* glow */
      const gr = ctx.createRadialGradient(x, y, 0, x, y, 32);
      gr.addColorStop(0, rgba(CYAN, 0.9));
      gr.addColorStop(0.45, rgba(CYAN, 0.35));
      gr.addColorStop(1, rgba(CYAN, 0));
      ctx.beginPath(); ctx.arc(x, y, 32, 0, Math.PI * 2);
      ctx.fillStyle = gr; ctx.fill();
      /* core */
      ctx.beginPath(); ctx.arc(x, y, 5, 0, Math.PI * 2);
      ctx.fillStyle = rgba(CYAN, 1); ctx.fill();
      ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(255,255,255,1)"; ctx.fill();
      ctx.restore();
    };

    /* draw a floating "chaos" label chip (in chaos phase only) */
    const drawChaosLabel = (t: number) => {
      if (t > 0.15) return;
      const a = Math.min(1, t < 0.05 ? t / 0.05 : (0.15 - t) / 0.05);
      ctx.save();
      ctx.globalAlpha = a * 0.7;
      ctx.font = "600 11px ui-sans-serif, sans-serif";
      ctx.fillStyle = rgba(RED, 0.8);
      ctx.textAlign = "center";
      ctx.fillText("MANUAL PROCESSES", W / 2, H * 0.88);
      ctx.restore();
    };

    const drawOrchLabel = (t: number) => {
      const inOrch = t >= P_ORCH && t < P_FADE;
      if (!inOrch) return;
      const a = Math.min(1, (t - P_ORCH) / 0.06);
      ctx.save();
      ctx.globalAlpha = a * 0.65;
      ctx.font = "600 11px ui-sans-serif, sans-serif";
      ctx.fillStyle = rgba(CYAN, 0.9);
      ctx.textAlign = "center";
      ctx.fillText("AI-NATIVE OPERATIONS", W / 2, H * 0.88);
      ctx.restore();
    };

    /* ── AI orb logic ─────────────────────────────────────── */
    const updateAI = (dt: number) => {
      if (aiEdgeIdx < 0) {
        /* pick next unhealed edge from current block */
        const cands = edges
          .map((e, i) => ({ e, i }))
          .filter(({ e }) => (e.a === aiSrcBlk || e.b === aiSrcBlk) && e.fixProg < 0.95);
        if (cands.length === 0) {
          /* jump to nearest unfixed block */
          const unfixed = blocks.filter(b => b.fixProg < 0.5 && b.id !== aiSrcBlk);
          if (unfixed.length > 0) {
            aiSrcBlk = unfixed[Math.floor(Math.random() * unfixed.length)].id;
            aiX = blocks[aiSrcBlk].x;
            aiY = blocks[aiSrcBlk].y;
          }
          return;
        }
        const { i } = cands[Math.floor(Math.random() * cands.length)];
        aiEdgeIdx = i;
        edges[i].pkt = 0;
        edges[i].pktCol = CYAN;
        aiEdgePr = 0;
      }

      aiEdgePr = Math.min(1, aiEdgePr + dt * 0.55);
      const e = edges[aiEdgeIdx];
      e.pkt = aiEdgePr;
      e.fixProg = Math.min(1, e.fixProg + dt * 0.9);

      const src = blocks[e.a], dst = blocks[e.b];
      const [x, y] = bezier(src, dst, aiEdgePr);
      aiX = x; aiY = y;

      if (aiEdgePr >= 1) {
        const tgt = e.a === aiSrcBlk ? e.b : e.a;
        e.fixProg = 1; e.pkt = -1;
        blocks[tgt].fixProg = Math.min(1, blocks[tgt].fixProg + 0.5);
        aiSrcBlk  = tgt;
        aiEdgeIdx = -1;
        aiEdgePr  = 0;
      }
      blocks[aiSrcBlk].fixProg = Math.min(1, blocks[aiSrcBlk].fixProg + dt * 1.6);
    };

    /* ── orchestrated data packets (after full fix) ────────── */
    let orchTimer = 0;
    const spawnOrchPacket = (dt: number) => {
      orchTimer += dt;
      if (orchTimer < 1.2) return;
      orchTimer = 0;
      const fixedEdges = edges.filter(e => e.fixProg > 0.9 && e.pkt < 0);
      if (fixedEdges.length === 0) return;
      const e = fixedEdges[Math.floor(Math.random() * fixedEdges.length)];
      e.pkt = 0;
      e.pktCol = Math.random() > 0.5 ? INDIGO : CYAN;
    };

    /* ── main loop ────────────────────────────────────────── */
    const draw = (ts: number) => {
      const dt = Math.min((ts - lastTime) / 1000, 0.05);
      lastTime = ts;
      ctx.clearRect(0, 0, W, H);

      cycleT += dt / CYCLE_S;
      if (cycleT >= 1) {
        /* reset */
        blocks.forEach(b => { b.fixProg = 0; b.pulse = rand(0, Math.PI * 2); });
        edges.forEach(e => {
          e.fixProg = 0; e.pkt = -1;
          e.jag = makeJag(blocks[e.a], blocks[e.b]);
        });
        cycleT = 0;
        aiSrcBlk = Math.floor(Math.random() * blocks.length);
        aiEdgeIdx = -1; aiEdgePr = 0;
        aiX = blocks[aiSrcBlk].x; aiY = blocks[aiSrcBlk].y;
        orchTimer = 0;
      }

      const inChaos = cycleT < P_FIX;
      const inFix   = cycleT >= P_FIX  && cycleT < P_ORCH;
      const inOrch  = cycleT >= P_ORCH && cycleT < P_FADE;
      const inFade  = cycleT >= P_FADE;
      const fade    = inFade ? 1 - (cycleT - P_FADE) / (1 - P_FADE) : 1;

      /* move blocks */
      for (const b of blocks) {
        b.pulse += 0.022;
        b.x += b.vx; b.y += b.vy;
        b.x = clamp(b.x, BW, W - BW);
        b.y = clamp(b.y, BH, H - BH);
        if (b.x <= BW || b.x >= W - BW) b.vx *= -1;
        if (b.y <= BH || b.y >= H - BH) b.vy *= -1;
        /* in orch phase gently continue fixing straggler nodes */
        if (inOrch || inFade) b.fixProg = Math.min(1, b.fixProg + dt * 0.3);
      }

      /* update edge packets */
      for (const e of edges) {
        if (e.pkt >= 0) {
          e.pkt += dt * 0.45;
          if (e.pkt > 1) e.pkt = -1;
        }
      }

      if (inFix)  updateAI(dt);
      if (inOrch) spawnOrchPacket(dt);

      /* ── draw ── */
      /* broken edges (chaos / early fix) */
      for (const e of edges) {
        const bf = 1 - e.fixProg;
        if (bf > 0) drawBrokenEdge(e, bf * fade);
      }
      /* fixed edges */
      for (const e of edges) {
        if (e.fixProg > 0) drawFixedEdge(e, e.fixProg * fade);
      }
      /* packets */
      for (const e of edges) drawPacket(e);
      /* blocks */
      for (const b of blocks) drawBlock(b, fade);
      /* AI orb */
      if (inFix) {
        const a = clamp((cycleT - P_FIX) / 0.04, 0, 1) * clamp((P_ORCH - cycleT) / 0.04, 0, 1);
        drawAIOrb(aiX, aiY, a * fade);
      }
      /* phase labels */
      drawChaosLabel(cycleT);
      drawOrchLabel(cycleT);

      raf.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    raf.current = requestAnimationFrame(ts => { lastTime = ts; draw(ts); });
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
