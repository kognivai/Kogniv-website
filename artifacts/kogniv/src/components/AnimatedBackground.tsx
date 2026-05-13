import { useEffect, useRef } from "react";

/* ─── helpers ───────────────────────────────────────────────── */
type Col = [number, number, number];
const rgba  = ([r, g, b]: Col, a: number) => `rgba(${r},${g},${b},${a.toFixed(3)})`;
const lerp  = (a: number, b: number, t: number) => a + (b - a) * t;
const clamp = (v: number, lo: number, hi: number) => Math.min(hi, Math.max(lo, v));
const lc    = (a: Col, b: Col, t: number): Col =>
  [Math.round(lerp(a[0],b[0],t)), Math.round(lerp(a[1],b[1],t)), Math.round(lerp(a[2],b[2],t))];

/* phase helper: normalised progress within a sub-phase */
const phT = (t: number, s: number, e: number) => clamp((t - s) / (e - s), 0, 1);

/* ─── palette ───────────────────────────────────────────────── */
const INDIGO: Col = [99,  102, 241];
const CYAN:   Col = [34,  211, 238];
const GREEN:  Col = [52,  211, 153];
const RED:    Col = [239,  68,  68];
const AMBER:  Col = [251, 146,  60];
const DARK:   Col = [10,   18,  40];
const WHITE:  Col = [255, 255, 255];

/* ─── node definitions ─────────────────────────────────────── */
/* positions are fractions of W/H, resolved at render time      */
const NODE_DEFS = [
  { id: 0, fx: 0.10, fy: 0.50, label: "Request",    sub: "Intake"    },
  { id: 1, fx: 0.30, fy: 0.50, label: "Triage",     sub: "Manual"    },   // bottleneck
  { id: 2, fx: 0.50, fy: 0.28, label: "Approval",   sub: "Multi-step" },  // bottleneck
  { id: 3, fx: 0.50, fy: 0.72, label: "HR/ITSM",    sub: "Case Mgmt" },
  { id: 4, fx: 0.70, fy: 0.50, label: "Processing", sub: "Routing"   },
  { id: 5, fx: 0.90, fy: 0.50, label: "Resolved",   sub: "Completed" },
];

/* ─── edge definitions ─────────────────────────────────────── */
/* type: 'default'|'bottleneck'|'bypass'|'optimized'           */
const EDGE_DEFS: { a:number; b:number; kind:'base'|'slow'|'bypass' }[] = [
  { a:0, b:1, kind:'base'    },
  { a:1, b:2, kind:'slow'    },   // through slow approval
  { a:1, b:3, kind:'base'    },
  { a:2, b:4, kind:'slow'    },   // slow path
  { a:3, b:4, kind:'base'    },
  { a:4, b:5, kind:'base'    },
];

/* new edges that appear after AI routing */
const BYPASS_EDGES: { a:number; b:number }[] = [
  { a:1, b:4 },   // AI auto-routes simple cases directly
  { a:2, b:5 },   // streamlined approval → resolved
];

const BW = 76, BH = 30;

export default function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const raf = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let W = 0, H = 0, lastT = 0;
    let cycleT = 0;          // 0-1 over CYCLE_S seconds
    const CYCLE_S = 22;

    /* phase thresholds (normalised) */
    const P = {
      build:  [0.00, 0.10] as [number,number],
      bottle: [0.10, 0.24] as [number,number],
      scan:   [0.24, 0.42] as [number,number],
      reorg:  [0.42, 0.60] as [number,number],
      route:  [0.60, 0.76] as [number,number],
      accel:  [0.76, 0.92] as [number,number],
      fade:   [0.92, 1.00] as [number,number],
    };

    /* ── resolve node screen positions ─────────────────────── */
    const nx = (id: number) => NODE_DEFS[id].fx * W;
    const ny = (id: number) => NODE_DEFS[id].fy * H;

    /* ── scan line state ─────────────────────────────────────── */
    let scanX = 0;

    /* ── packets ─────────────────────────────────────────────── */
    interface Pkt { ax: number; ay: number; bx: number; by: number; p: number; spd: number; col: Col; }
    let packets: Pkt[] = [];
    let pktTimer = 0;

    const spawnPackets = (edges: { a:number; b:number }[], col: Col, spd: number) => {
      if (packets.length > 40) return;
      for (const e of edges) {
        if (Math.random() > 0.5) continue;
        packets.push({ ax: nx(e.a), ay: ny(e.a), bx: nx(e.b), by: ny(e.b), p: 0, spd, col });
      }
    };

    const resize = () => {
      W = canvas.width  = canvas.offsetWidth;
      H = canvas.height = canvas.offsetHeight;
    };

    /* ── draw helpers ─────────────────────────────────────────── */
    const rrect = (x: number, y: number, w: number, h: number, r: number) => {
      ctx.beginPath();
      ctx.moveTo(x+r,y); ctx.lineTo(x+w-r,y); ctx.arcTo(x+w,y,x+w,y+r,r);
      ctx.lineTo(x+w,y+h-r); ctx.arcTo(x+w,y+h,x+w-r,y+h,r);
      ctx.lineTo(x+r,y+h); ctx.arcTo(x,y+h,x,y+h-r,r);
      ctx.lineTo(x,y+r); ctx.arcTo(x,y,x+r,y,r);
      ctx.closePath();
    };

    const arrow = (x1:number, y1:number, x2:number, y2:number, col:Col, a:number, width=1.2, dashed=false) => {
      if (a <= 0) return;
      ctx.save();
      ctx.globalAlpha = a;
      ctx.strokeStyle = rgba(col, 0.8);
      ctx.lineWidth = width;
      if (dashed) ctx.setLineDash([5, 7]);
      ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
      ctx.setLineDash([]);
      /* arrowhead */
      const ang = Math.atan2(y2-y1, x2-x1);
      const hs  = 7;
      ctx.fillStyle = rgba(col, 0.85);
      ctx.beginPath();
      ctx.moveTo(x2, y2);
      ctx.lineTo(x2 - hs*Math.cos(ang-0.4), y2 - hs*Math.sin(ang-0.4));
      ctx.lineTo(x2 - hs*Math.cos(ang+0.4), y2 - hs*Math.sin(ang+0.4));
      ctx.closePath(); ctx.fill();
      ctx.restore();
    };

    /* edge endpoint pulled back to node border */
    const edgePts = (aId:number, bId:number) => {
      const ax=nx(aId), ay=ny(aId), bx=nx(bId), by=ny(bId);
      const ang = Math.atan2(by-ay, bx-ax);
      return {
        x1: ax + Math.cos(ang)*(BW/2+2),
        y1: ay + Math.sin(ang)*(BH/2+2),
        x2: bx - Math.cos(ang)*(BW/2+8),
        y2: by - Math.sin(ang)*(BH/2+8),
      };
    };

    const drawNode = (id:number, col:Col, glowCol:Col, glow:number, alpha:number, sub?:string) => {
      if (alpha <= 0) return;
      const x = nx(id), y = ny(id);
      const nd = NODE_DEFS[id];
      ctx.save();
      ctx.globalAlpha = alpha;
      /* glow halo */
      if (glow > 0) {
        const gr = ctx.createRadialGradient(x, y, 0, x, y, 55);
        gr.addColorStop(0, rgba(glowCol, glow * 0.45));
        gr.addColorStop(1, rgba(glowCol, 0));
        ctx.beginPath(); ctx.arc(x, y, 55, 0, Math.PI*2);
        ctx.fillStyle = gr; ctx.fill();
      }
      /* body */
      rrect(x-BW/2, y-BH/2, BW, BH, 6);
      ctx.fillStyle = rgba(DARK, 0.92); ctx.fill();
      ctx.strokeStyle = rgba(col, 0.85);
      ctx.lineWidth = 1.5; ctx.stroke();
      /* status dot */
      ctx.beginPath(); ctx.arc(x-BW/2+9, y, 3, 0, Math.PI*2);
      ctx.fillStyle = rgba(glowCol, 0.9); ctx.fill();
      /* label */
      ctx.fillStyle = rgba(WHITE, 0.92);
      ctx.font = "600 10px ui-monospace, monospace";
      ctx.textAlign = "center"; ctx.textBaseline = "middle";
      ctx.fillText(nd.label, x+4, y - (sub ? 4 : 0));
      if (sub) {
        ctx.fillStyle = rgba(col, 0.65);
        ctx.font = "400 8px ui-monospace, monospace";
        ctx.fillText(sub, x+4, y+6);
      }
      ctx.restore();
    };

    const drawPacketDot = (pk: Pkt) => {
      const x = lerp(pk.ax, pk.bx, pk.p);
      const y = lerp(pk.ay, pk.by, pk.p);
      const gr = ctx.createRadialGradient(x,y,0,x,y,11);
      gr.addColorStop(0, rgba(pk.col, 0.8));
      gr.addColorStop(1, rgba(pk.col, 0));
      ctx.beginPath(); ctx.arc(x,y,11,0,Math.PI*2);
      ctx.fillStyle = gr; ctx.fill();
      ctx.beginPath(); ctx.arc(x,y,2.5,0,Math.PI*2);
      ctx.fillStyle = rgba(WHITE, 0.95); ctx.fill();
    };

    const label = (text:string, col:Col, alpha:number, yFrac:number) => {
      if (alpha<=0) return;
      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.font = "700 11px ui-sans-serif, system-ui, sans-serif";
      ctx.textAlign = "center";
      ctx.fillStyle = rgba(col, 0.9);
      ctx.letterSpacing = "0.15em";
      ctx.fillText(text.toUpperCase(), W/2, H * yFrac);
      ctx.restore();
    };

    /* ─── main render ──────────────────────────────────────── */
    const draw = (ts: number) => {
      const dt = Math.min((ts - lastT) / 1000, 0.05);
      lastT = ts;
      ctx.clearRect(0, 0, W, H);

      cycleT += dt / CYCLE_S;
      if (cycleT >= 1) cycleT = 0;
      const t = cycleT;

      const inBuild  = t < P.build[1];
      const inBottle = t >= P.bottle[0] && t < P.bottle[1];
      const inScan   = t >= P.scan[0]   && t < P.scan[1];
      const inReorg  = t >= P.reorg[0]  && t < P.reorg[1];
      const inRoute  = t >= P.route[0]  && t < P.route[1];
      const inAccel  = t >= P.accel[0]  && t < P.accel[1];
      const inFade   = t >= P.fade[0];

      /* overall alpha */
      const fade = inFade ? 1 - phT(t, P.fade[0], P.fade[1]) : 1;

      /* ── build-in progress ── */
      const buildP = phT(t, P.build[0], P.build[1]);

      /* nodes appear one by one during build */
      const nodeAlpha = (id: number) => {
        if (!inBuild) return fade;
        return clamp(buildP * NODE_DEFS.length - id, 0, 1) * fade;
      };

      /* base edge alpha (pre-reorg) */
      const baseEdgeAlpha = (kind:'base'|'slow') => {
        if (inBuild) return buildP * 0.7 * fade;
        if (inReorg) return (1 - phT(t, P.reorg[0], P.reorg[0]+0.08)) * fade;
        if (inRoute || inAccel || inFade) return 0;
        return 0.75 * fade;
      };

      /* bypass edge alpha */
      const bypassAlpha = () => {
        if (inReorg) return phT(t, P.reorg[0]+0.05, P.reorg[1]) * fade;
        if (inRoute || inAccel || inFade) return fade;
        return 0;
      };

      /* bottleneck glow */
      const bottleGlow = (id: number) => {
        const isBn = id === 1 || id === 2;
        if (!isBn) return 0;
        if (inBottle) return 0.5 + 0.4 * Math.sin(t * Math.PI * 2 * CYCLE_S * 1.5);
        if (inScan)   return phT(t, P.scan[0], P.scan[0]+0.05) * 0.6;
        if (t < P.bottle[0]) return 0;
        return 0;
      };

      /* node color */
      const nodeCol = (id: number): [Col, Col] => {
        const isBn = id === 1 || id === 2;
        if (inBottle && isBn) return [RED, RED];
        if (inScan   && isBn) return [lc(RED, AMBER, phT(t, P.scan[0], P.scan[1])), AMBER];
        if ((inReorg || inRoute || inAccel) && isBn) return [INDIGO, CYAN];
        if (inRoute || inAccel) return [INDIGO, CYAN];
        return [INDIGO, INDIGO];
      };

      /* ── scan line ── */
      if (inScan) {
        scanX = lerp(0, W, phT(t, P.scan[0], P.scan[1]));
        /* soft vertical glow beam */
        const sg = ctx.createLinearGradient(scanX-40, 0, scanX+40, 0);
        sg.addColorStop(0,    rgba(CYAN, 0));
        sg.addColorStop(0.45, rgba(CYAN, 0.15));
        sg.addColorStop(0.5,  rgba(CYAN, 0.35));
        sg.addColorStop(0.55, rgba(CYAN, 0.15));
        sg.addColorStop(1,    rgba(CYAN, 0));
        ctx.fillStyle = sg;
        ctx.globalAlpha = fade;
        ctx.fillRect(scanX-40, 0, 80, H);
        ctx.globalAlpha = 1;
        /* scan line */
        ctx.save();
        ctx.globalAlpha = 0.7 * fade;
        ctx.strokeStyle = rgba(CYAN, 0.85);
        ctx.lineWidth = 1;
        ctx.setLineDash([4, 6]);
        ctx.beginPath(); ctx.moveTo(scanX, 0); ctx.lineTo(scanX, H); ctx.stroke();
        ctx.setLineDash([]);
        ctx.restore();
      }

      /* ── base edges ── */
      for (const e of EDGE_DEFS) {
        const { x1,y1,x2,y2 } = edgePts(e.a, e.b);
        const col = (inBottle && e.kind==='slow') ? RED : INDIGO;
        const wid = (inBottle && e.kind==='slow') ? 2 : 1.2;
        arrow(x1,y1,x2,y2, col, baseEdgeAlpha(e.kind), wid, e.kind==='slow' && !inBottle);
      }

      /* ── bypass edges (after reorg) ── */
      const bAlpha = bypassAlpha();
      for (const e of BYPASS_EDGES) {
        const { x1,y1,x2,y2 } = edgePts(e.a, e.b);
        const col = inAccel ? GREEN : CYAN;
        arrow(x1,y1,x2,y2, col, bAlpha, 1.8);
        /* "AI" label on bypass arrow */
        if (bAlpha > 0.4) {
          const mx=(x1+x2)/2, my=(y1+y2)/2;
          ctx.save();
          ctx.globalAlpha = bAlpha * 0.85;
          rrect(mx-10, my-7, 20, 13, 3);
          ctx.fillStyle = rgba(DARK, 0.9); ctx.fill();
          ctx.strokeStyle = rgba(col, 0.6); ctx.lineWidth=0.8; ctx.stroke();
          ctx.fillStyle = rgba(col, 1);
          ctx.font = "700 8px ui-monospace, monospace";
          ctx.textAlign = "center"; ctx.textBaseline = "middle";
          ctx.fillText("AI", mx, my);
          ctx.restore();
        }
      }

      /* ── nodes ── */
      for (const nd of NODE_DEFS) {
        const [col, glowCol] = nodeCol(nd.id);
        drawNode(nd.id, col, glowCol, bottleGlow(nd.id), nodeAlpha(nd.id),
          (inRoute || inAccel) ? (nd.id===1||nd.id===2 ? "Auto" : nd.sub) : nd.sub);
      }

      /* ── scan "analyzing" tags on bottleneck nodes ── */
      if (inScan) {
        const sP = phT(t, P.scan[0], P.scan[1]);
        for (const id of [1, 2]) {
          if (nx(id) < scanX + 20) {
            const aa = clamp(sP * 4 - (id===2 ? 0.5 : 0), 0, 1) * fade;
            const x = nx(id), y = ny(id);
            ctx.save();
            ctx.globalAlpha = aa;
            rrect(x+BW/2+4, y-8, 52, 16, 4);
            ctx.fillStyle = rgba(DARK, 0.95); ctx.fill();
            ctx.strokeStyle = rgba(AMBER, 0.7); ctx.lineWidth=0.8; ctx.stroke();
            ctx.fillStyle = rgba(AMBER, 0.95);
            ctx.font = "600 8px ui-monospace, monospace";
            ctx.textAlign = "center"; ctx.textBaseline = "middle";
            ctx.fillText("BOTTLENECK", x+BW/2+30, y);
            ctx.restore();
          }
        }
      }

      /* ── packets ── */
      pktTimer += dt;
      if (pktTimer > (inAccel ? 0.3 : 1.2)) {
        pktTimer = 0;
        if (inRoute || inAccel) {
          const spd = inAccel ? 0.6 : 0.35;
          spawnPackets(BYPASS_EDGES.map(e=>e), inAccel ? GREEN : CYAN, spd);
          if (inAccel) spawnPackets(EDGE_DEFS.filter(e=>e.kind==='base').map(e=>({a:e.a,b:e.b})), INDIGO, spd);
        } else if (inBottle || inScan) {
          spawnPackets(EDGE_DEFS.map(e=>({a:e.a,b:e.b})), AMBER, 0.18);
        } else if (!inBuild && !inReorg && !inFade) {
          spawnPackets(EDGE_DEFS.map(e=>({a:e.a,b:e.b})), INDIGO, 0.25);
        }
      }

      /* update + draw packets */
      packets = packets.filter(pk => pk.p <= 1);
      for (const pk of packets) {
        pk.p += dt * pk.spd;
        drawPacketDot(pk);
      }

      /* ── throughput badge (accel phase) ── */
      if (inAccel) {
        const ap = phT(t, P.accel[0], P.accel[0]+0.06);
        ctx.save();
        ctx.globalAlpha = ap * fade;
        rrect(W*0.68, H*0.14, 120, 34, 8);
        ctx.fillStyle = rgba(DARK, 0.92); ctx.fill();
        ctx.strokeStyle = rgba(GREEN, 0.65); ctx.lineWidth=1; ctx.stroke();
        ctx.fillStyle = rgba(GREEN, 0.9);
        ctx.font = "700 11px ui-sans-serif, sans-serif";
        ctx.textAlign = "center"; ctx.textBaseline = "middle";
        ctx.fillText("↑ 340% Faster", W*0.68+60, H*0.14+12);
        ctx.fillStyle = rgba(GREEN, 0.55);
        ctx.font = "400 8.5px ui-monospace, monospace";
        ctx.fillText("AI-Native Routing Active", W*0.68+60, H*0.14+24);
        ctx.restore();
      }

      /* ── phase labels ── */
      if (inBuild)  label("Workflow Map",             INDIGO, phT(t,P.build[0],P.build[1]),  0.88);
      if (inBottle) label("Identifying Bottlenecks",  RED,    phT(t,P.bottle[0],P.bottle[1]),0.88);
      if (inScan)   label("AI Scanning Workflow",     CYAN,   phT(t,P.scan[0],P.scan[1]),    0.88);
      if (inReorg)  label("Reorganising Paths",       CYAN,   phT(t,P.reorg[0],P.reorg[1]),  0.88);
      if (inRoute)  label("Intelligent Routing Active",GREEN, phT(t,P.route[0],P.route[1]),  0.88);
      if (inAccel)  label("Workflow Accelerated",     GREEN,  phT(t,P.accel[0],P.accel[1]),  0.88);

      raf.current = requestAnimationFrame(draw);
    };

    resize();
    window.addEventListener("resize", resize);
    raf.current = requestAnimationFrame(ts => { lastT = ts; draw(ts); });
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
