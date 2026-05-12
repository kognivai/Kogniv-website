/* Discover — bright indigo glowing 3D cube */
export function LatticeCube() {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="cube-front" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#818CF8" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#6366F1" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id="cube-top" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#C7D2FE" stopOpacity="0.75" />
          <stop offset="100%" stopColor="#818CF8" stopOpacity="0.35" />
        </linearGradient>
        <linearGradient id="cube-right" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#6366F1" stopOpacity="0.45" />
          <stop offset="100%" stopColor="#4F46E5" stopOpacity="0.2" />
        </linearGradient>
        <filter id="cube-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Outer ambient glow */}
      <ellipse cx="110" cy="115" rx="72" ry="55" fill="#6366F1" fillOpacity="0.08" />

      {/* Faces */}
      <polygon points="55,82 143,82 143,152 55,152" fill="url(#cube-front)" stroke="#A5B4FC" strokeWidth="1.8" filter="url(#cube-glow)" />
      <polygon points="55,82 143,82 163,57 75,57"   fill="url(#cube-top)"   stroke="#C7D2FE" strokeWidth="1.8" filter="url(#cube-glow)" />
      <polygon points="143,82 163,57 163,127 143,152" fill="url(#cube-right)" stroke="#818CF8" strokeWidth="1.8" filter="url(#cube-glow)" />

      {/* Front grid */}
      {[1,2,3].map(i => (
        <line key={`fh${i}`} x1="55" y1={82+i*17.5} x2="143" y2={82+i*17.5} stroke="#A5B4FC" strokeWidth="0.8" strokeOpacity="0.7" />
      ))}
      {[1,2,3,4].map(i => (
        <line key={`fv${i}`} x1={55+i*22} y1="82" x2={55+i*22} y2="152" stroke="#A5B4FC" strokeWidth="0.8" strokeOpacity="0.7" />
      ))}
      {/* Top grid */}
      {[1,2,3].map(i => (
        <line key={`tv${i}`} x1={55+i*22} y1="82" x2={75+i*22} y2="57" stroke="#C7D2FE" strokeWidth="0.8" strokeOpacity="0.65" />
      ))}
      {/* Right grid */}
      {[1,2,3].map(i => (
        <line key={`rh${i}`} x1="143" y1={82+i*17.5} x2="163" y2={57+i*17.5} stroke="#818CF8" strokeWidth="0.8" strokeOpacity="0.65" />
      ))}

      {/* Corner dots */}
      {[[55,82],[143,82],[55,152],[143,152],[75,57],[163,57],[163,127]].map(([x,y],i) => (
        <circle key={i} cx={x} cy={y} r="3.5" fill="#E0E7FF" filter="url(#cube-glow)" />
      ))}
    </svg>
  );
}

/* Decode — vivid magenta/pink spiky burst */
export function SpikyStar() {
  const pts = 12, cx = 100, cy = 100;
  const spikes = Array.from({ length: pts }).map((_, i) => {
    const a  = (i * 2 * Math.PI) / pts - Math.PI / 2;
    const oR = 68 + (i % 3 === 0 ? 12 : i % 3 === 1 ? -9 : 5);
    const iR = 28;
    const a2 = a + Math.PI / pts;
    return `${cx + oR * Math.cos(a)},${cy + oR * Math.sin(a)} ${cx + iR * Math.cos(a2)},${cy + iR * Math.sin(a2)}`;
  });

  return (
    <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
      <defs>
        <radialGradient id="burst-fill" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#F0ABFC" stopOpacity="0.65" />
          <stop offset="55%"  stopColor="#D946EF" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#A21CAF" stopOpacity="0.0"  />
        </radialGradient>
        <radialGradient id="burst-ring" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#F5D0FE" />
          <stop offset="100%" stopColor="#D946EF" />
        </radialGradient>
        <filter id="burst-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Ambient halo */}
      <circle cx={cx} cy={cy} r="78" fill="#D946EF" fillOpacity="0.07" />
      <circle cx={cx} cy={cy} r="74" stroke="#D946EF" strokeWidth="0.6" strokeOpacity="0.35" strokeDasharray="4 7" />
      <circle cx={cx} cy={cy} r="52" stroke="#F0ABFC" strokeWidth="0.5" strokeOpacity="0.3"  strokeDasharray="2 6" />

      {/* Spokes */}
      {Array.from({ length: pts }).map((_, i) => {
        const a  = (i * 2 * Math.PI) / pts - Math.PI / 2;
        const oR = 68 + (i % 3 === 0 ? 12 : i % 3 === 1 ? -9 : 5);
        return <line key={i} x1={cx} y1={cy} x2={cx + oR * Math.cos(a)} y2={cy + oR * Math.sin(a)}
          stroke="#F0ABFC" strokeWidth="0.7" strokeOpacity="0.55" />;
      })}

      {/* Star */}
      <polygon points={spikes.join(" ")} fill="url(#burst-fill)" stroke="url(#burst-ring)" strokeWidth="1.8" filter="url(#burst-glow)" />

      {/* Centre */}
      <circle cx={cx} cy={cy} r="20" fill="#D946EF" fillOpacity="0.2" stroke="#F5D0FE" strokeWidth="1.5" filter="url(#burst-glow)" />
      <circle cx={cx} cy={cy} r="7"  fill="#F5D0FE" filter="url(#burst-glow)" />
      <circle cx={cx} cy={cy} r="3"  fill="white" />

      {/* Tip dots */}
      {Array.from({ length: pts }).map((_, i) => {
        const a  = (i * 2 * Math.PI) / pts - Math.PI / 2;
        const oR = 68 + (i % 3 === 0 ? 12 : i % 3 === 1 ? -9 : 5);
        return <circle key={i} cx={cx + oR * Math.cos(a)} cy={cy + oR * Math.sin(a)} r="3" fill="#F5D0FE" filter="url(#burst-glow)" />;
      })}
    </svg>
  );
}

/* Transform — vivid cyan/teal globe */
export function WireframeGlobe() {
  const cx = 100, cy = 100, r = 68;
  return (
    <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
      <defs>
        <radialGradient id="globe-fill" cx="38%" cy="32%" r="62%">
          <stop offset="0%"   stopColor="#67E8F9" stopOpacity="0.30" />
          <stop offset="100%" stopColor="#0E7490" stopOpacity="0.0"  />
        </radialGradient>
        <linearGradient id="globe-edge" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%"   stopColor="#A5F3FC" />
          <stop offset="100%" stopColor="#06B6D4" />
        </linearGradient>
        <filter id="globe-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Ambient fill */}
      <circle cx={cx} cy={cy} r={r} fill="url(#globe-fill)" />

      {/* Latitude lines */}
      {[-50,-28,0,28,50].map(lat => {
        const y  = cy + (lat / 90) * r;
        const rx = r * Math.cos((lat * Math.PI) / 180);
        return <ellipse key={lat} cx={cx} cy={y} rx={rx} ry={rx * 0.28}
          stroke="#22D3EE" strokeWidth={lat === 0 ? "2" : "1.2"}
          strokeOpacity={lat === 0 ? 1 : 0.7}
          filter="url(#globe-glow)" />;
      })}

      {/* Longitude lines */}
      {Array.from({ length: 6 }).map((_, i) => (
        <ellipse key={i} cx={cx} cy={cy}
          rx={r * Math.abs(Math.cos((i * Math.PI) / 6))} ry={r}
          stroke="#22D3EE" strokeWidth={i === 0 ? "1.6" : "1"}
          strokeOpacity={i === 0 ? 0.9 : 0.5}
          transform={`rotate(${(i * 180) / 6} ${cx} ${cy})`}
          filter="url(#globe-glow)" />
      ))}

      {/* Outer ring */}
      <circle cx={cx} cy={cy} r={r} stroke="url(#globe-edge)" strokeWidth="2.2" filter="url(#globe-glow)" />

      {/* Highlight arc */}
      <path d={`M ${cx-r*0.5} ${cy-r*0.75} Q ${cx-r*0.18} ${cy-r*0.92} ${cx+r*0.32} ${cy-r*0.64}`}
        stroke="#CFFAFE" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.85" filter="url(#globe-glow)" />

      {/* Poles */}
      <circle cx={cx} cy={cy-r} r="4.5" fill="#A5F3FC" filter="url(#globe-glow)" />
      <circle cx={cx} cy={cy+r} r="4.5" fill="#22D3EE" filter="url(#globe-glow)" />
    </svg>
  );
}

/* Thrive — bright violet/indigo infinity loop */
export function InfinityWave() {
  return (
    <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
      <defs>
        <linearGradient id="inf-stroke" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#818CF8" />
          <stop offset="45%"  stopColor="#A78BFA" />
          <stop offset="100%" stopColor="#C084FC" />
        </linearGradient>
        <linearGradient id="inf-inner" x1="0" y1="0" x2="1" y2="0">
          <stop offset="0%"   stopColor="#A5B4FC" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#D8B4FE" stopOpacity="0.55" />
        </linearGradient>
        <radialGradient id="inf-fill" cx="50%" cy="50%" r="50%">
          <stop offset="0%"   stopColor="#7C3AED" stopOpacity="0.18" />
          <stop offset="100%" stopColor="#7C3AED" stopOpacity="0.0"  />
        </radialGradient>
        <filter id="inf-glow" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="3.5" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Ambient halo */}
      <ellipse cx="100" cy="100" rx="82" ry="44" fill="url(#inf-fill)" />
      <ellipse cx="100" cy="100" rx="82" ry="44" stroke="#7C3AED" strokeWidth="0.5" strokeOpacity="0.3" strokeDasharray="3 7" />

      {/* Outer path */}
      <path d="M100,100 C100,63 147,42 170,66 C193,90 193,110 170,134 C147,158 100,137 100,100 C100,63 53,42 30,66 C7,90 7,110 30,134 C53,158 100,137 100,100Z"
        fill="#7C3AED" fillOpacity="0.10"
        stroke="url(#inf-stroke)" strokeWidth="2.8" filter="url(#inf-glow)" />

      {/* Inner path */}
      <path d="M100,100 C100,78 130,64 146,78 C162,92 162,108 146,122 C130,136 100,122 100,100 C100,78 70,64 54,78 C38,92 38,108 54,122 C70,136 100,122 100,100Z"
        stroke="url(#inf-inner)" strokeWidth="1.6" strokeDasharray="4 4" filter="url(#inf-glow)" />

      {/* Vertical accent lines */}
      {[54,68,84,116,132,146].map(x => (
        <line key={x} x1={x} y1="76" x2={x} y2="124"
          stroke="#C4B5FD" strokeWidth="0.8" strokeOpacity="0.45" strokeDasharray="2 4" />
      ))}

      {/* Centre node */}
      <circle cx="100" cy="100" r="6.5" fill="#A78BFA" filter="url(#inf-glow)" />
      <circle cx="100" cy="100" r="3"   fill="white" />

      {/* Lobe end dots */}
      <circle cx="30"  cy="100" r="5" fill="#818CF8" filter="url(#inf-glow)" />
      <circle cx="170" cy="100" r="5" fill="#C084FC" filter="url(#inf-glow)" />

      {/* Top highlight arc */}
      <path d="M 54 78 Q 100 50 146 78" stroke="#DDD6FE" strokeWidth="2" strokeOpacity="0.65"
        strokeLinecap="round" fill="none" filter="url(#inf-glow)" />
    </svg>
  );
}
