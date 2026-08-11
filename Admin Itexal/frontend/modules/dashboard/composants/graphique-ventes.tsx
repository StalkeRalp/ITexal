"use client";

import React, { useState, useRef, useCallback } from "react";
import Link from "next/link";

// ── Real datasets per filter ─────────────────────────────────────────────────
type Pt = { label: string; val: number };

const LINE_DATA: Record<string, Pt[]> = {
  "Par jour": [
    { label: "1 Mai", val: 2200 }, { label: "2 Mai", val: 2500 },
    { label: "3 Mai", val: 3100 }, { label: "4 Mai", val: 4200 },
    { label: "5 Mai", val: 5800 }, { label: "6 Mai", val: 6500 },
    { label: "7 Mai", val: 7200 }, { label: "8 Mai", val: 7800 },
    { label: "9 Mai", val: 8100 }, { label: "10 Mai", val: 8300 },
    { label: "11 Mai", val: 8450 }, { label: "12 Mai", val: 8100 },
    { label: "13 Mai", val: 7600 }, { label: "14 Mai", val: 7200 },
    { label: "15 Mai", val: 7400 }, { label: "16 Mai", val: 7100 },
    { label: "17 Mai", val: 6900 }, { label: "18 Mai", val: 7200 },
    { label: "19 Mai", val: 7000 }, { label: "20 Mai", val: 6800 },
    { label: "21 Mai", val: 7100 }, { label: "22 Mai", val: 7300 },
    { label: "23 Mai", val: 7000 }, { label: "24 Mai", val: 6900 },
    { label: "25 Mai", val: 6700 }, { label: "26 Mai", val: 6500 },
    { label: "27 Mai", val: 6300 }, { label: "28 Mai", val: 6100 },
    { label: "29 Mai", val: 5900 }, { label: "30 Mai", val: 5700 },
    { label: "31 Mai", val: 5500 },
  ],
  "Par semaine": [
    { label: "Sem. 1", val: 28200 }, { label: "Sem. 2", val: 54100 },
    { label: "Sem. 3", val: 48600 }, { label: "Sem. 4", val: 41200 },
    { label: "Sem. 5", val: 24500 },
  ],
  "Par mois": [
    { label: "Jan", val: 38000 }, { label: "Fév", val: 42000 },
    { label: "Mar", val: 51000 }, { label: "Avr", val: 47000 },
    { label: "Mai", val: 89000 }, { label: "Jun", val: 76000 },
    { label: "Jul", val: 68000 }, { label: "Aoû", val: 72000 },
    { label: "Sep", val: 83000 }, { label: "Oct", val: 94000 },
    { label: "Nov", val: 105000 }, { label: "Déc", val: 121000 },
  ],
};

const DONUT_DATA: Record<string, { label: string; pct: number; color: string }[]> = {
  "Par catégorie": [
    { label: "Soins Visage", pct: 35, color: "#4379EE" },
    { label: "Maquillage",   pct: 28, color: "#22C55E" },
    { label: "Soins Corps",  pct: 20, color: "#F59E0B" },
    { label: "Parfums",      pct: 12, color: "#8B5CF6" },
    { label: "Autres",       pct: 5,  color: "#EC4899" },
  ],
  "Par marque": [
    { label: "ITexal Pro",      pct: 42, color: "#4379EE" },
    { label: "Naturel Bio",     pct: 31, color: "#22C55E" },
    { label: "Luxe & Prestige", pct: 18, color: "#F59E0B" },
    { label: "Essentiel",       pct: 9,  color: "#8B5CF6" },
  ],
};

// Which indices to display as X-axis labels
const X_TICK_IDX: Record<string, number[]> = {
  "Par jour":    [0, 5, 10, 15, 20, 25, 30],
  "Par semaine": [0, 1, 2, 3, 4],
  "Par mois":    [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11],
};

// ── SVG geometry ─────────────────────────────────────────────────────────────
const VW = 560, VH = 230;
const PL = 48, PR = 12, PT = 16, PB = 32;
const PW = VW - PL - PR;
const PH = VH - PT - PB;

function niceMax(data: Pt[]) {
  const max = Math.max(...data.map((d) => d.val));
  const mag = Math.pow(10, Math.floor(Math.log10(max)));
  return Math.ceil(max / mag) * mag;
}

function toX(idx: number, total: number) {
  return PL + (idx / Math.max(total - 1, 1)) * PW;
}
function toY(val: number, ymax: number) {
  return PT + PH - (val / ymax) * PH;
}

function buildPath(data: Pt[], ymax: number) {
  return data.reduce((acc, p, i) => {
    const x = toX(i, data.length), y = toY(p.val, ymax);
    if (i === 0) return `M ${x} ${y}`;
    const px = toX(i - 1, data.length), py = toY(data[i - 1].val, ymax);
    const mx = (px + x) / 2;
    return `${acc} C ${mx} ${py}, ${mx} ${y}, ${x} ${y}`;
  }, "");
}

// ── Donut geometry ────────────────────────────────────────────────────────────
const DR = 62, DCX = 80, DCY = 80, DSW = 20;
const DCIRC = 2 * Math.PI * DR;
const GAP = 4;

function buildArcs(segs: typeof DONUT_DATA["Par catégorie"]) {
  let cum = 0;
  return segs.map((s) => {
    const dash = (s.pct / 100) * DCIRC - GAP;
    const offset = DCIRC / 4 - cum;
    cum += (s.pct / 100) * DCIRC;
    return { ...s, dash, offset };
  });
}

const SEL = "appearance-none bg-white border border-slate-200 text-[11px] font-bold text-slate-600 py-1.5 pl-3 pr-7 rounded-xl cursor-pointer focus:outline-none hover:border-[#5D5FEF] transition-colors";

// ── Y-tick builder ────────────────────────────────────────────────────────────
function buildYTicks(ymax: number): number[] {
  const step = ymax / 5;
  return [ymax, ymax - step, ymax - 2 * step, ymax - 3 * step, ymax - 4 * step, 0];
}
function fmtY(v: number) {
  if (v >= 1000) return `${(v / 1000).toFixed(v % 1000 === 0 ? 0 : 1)}k`;
  return String(v);
}

// ══════════════════════════════════════════════════════════════════════════════
export const GraphiqueVentes: React.FC = () => {
  const [periodeCA, setPeriodeCA] = useState("Par jour");
  const [periodeDonut, setPeriodeDonut] = useState("Par catégorie");
  const [hovered, setHovered] = useState<Pt | null>(null);
  const [hoveredSeg, setHoveredSeg] = useState<number | null>(null);
  const [fadeLine, setFadeLine] = useState(false);
  const [fadeDonut, setFadeDonut] = useState(false);
  const [mounted, setMounted] = useState(false);
  const svgRef = useRef<SVGSVGElement>(null);

  // Mount animation
  React.useEffect(() => { const t = setTimeout(() => setMounted(true), 80); return () => clearTimeout(t); }, []);

  // Switch line filter with fade transition
  const switchPeriodeCA = (val: string) => {
    setFadeLine(true);
    setTimeout(() => { setPeriodeCA(val); setHovered(null); setMounted(false); setFadeLine(false); setTimeout(() => setMounted(true), 50); }, 220);
  };

  // Switch donut filter with fade transition
  const switchPeriodeDonut = (val: string) => {
    setFadeDonut(true);
    setTimeout(() => { setPeriodeDonut(val); setFadeDonut(false); }, 220);
  };

  const lineData = LINE_DATA[periodeCA];
  const donutSegs = DONUT_DATA[periodeDonut];
  const ymax = niceMax(lineData);
  const yticks = buildYTicks(ymax);
  const LINE = buildPath(lineData, ymax);
  const AREA = `${LINE} L ${toX(lineData.length - 1, lineData.length)} ${PT + PH} L ${toX(0, lineData.length)} ${PT + PH} Z`;
  const arcs = buildArcs(donutSegs);
  const xTickIdx = X_TICK_IDX[periodeCA];
  const pt = hovered ?? lineData[Math.floor(lineData.length * 0.35)];
  const ptIdx = lineData.indexOf(pt);

  const totalDonut = donutSegs.reduce((s, d) => s + d.pct, 0);
  const centerVal = periodeCA === "Par mois" ? "89 M" : periodeCA === "Par semaine" ? "196 k" : "6 426";

  const onMouseMove = useCallback((e: React.MouseEvent<SVGRectElement>) => {
    const svg = svgRef.current;
    if (!svg) return;
    const rect = svg.getBoundingClientRect();
    const relX = ((e.clientX - rect.left) / rect.width) * VW;
    const rawIdx = ((relX - PL) / PW) * (lineData.length - 1);
    const idx = Math.max(0, Math.min(lineData.length - 1, Math.round(rawIdx)));
    setHovered(lineData[idx]);
  }, [lineData]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

      {/* ─── LEFT: Line chart ──────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 flex flex-col">
        <div className="flex items-center justify-between mb-5 shrink-0">
          <div className="flex items-center gap-2.5">
            <h3 className="text-sm font-extrabold text-slate-800">Évolution du chiffre d'affaires</h3>
            <Link href="/admin/statistiques" className="w-6 h-6 rounded-full bg-[#5D5FEF] hover:bg-indigo-600 text-white font-black text-xs flex items-center justify-center shadow transition-all hover:scale-110" title="Statistiques avancées">+</Link>
          </div>
          <div className="relative shrink-0">
            <select value={periodeCA} onChange={(e) => switchPeriodeCA(e.target.value)} className={SEL}>
              <option>Par jour</option>
              <option>Par semaine</option>
              <option>Par mois</option>
            </select>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-slate-400 pointer-events-none">▼</span>
          </div>
        </div>

        <div className="flex-1 min-h-0" style={{ opacity: fadeLine ? 0 : 1, transition: "opacity 0.22s ease" }}>
          <svg ref={svgRef} viewBox={`0 0 ${VW} ${VH}`} className="w-full h-full overflow-visible" preserveAspectRatio="xMidYMid meet">
            <defs>
              <linearGradient id="ag2" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4379EE" stopOpacity="0.2" />
                <stop offset="100%" stopColor="#4379EE" stopOpacity="0.02" />
              </linearGradient>
            </defs>

            {/* Y grid + labels */}
            {yticks.map((v) => (
              <g key={v}>
                <line x1={PL} y1={toY(v, ymax)} x2={VW - PR} y2={toY(v, ymax)} stroke="#f1f5f9" strokeWidth="1" />
                <text x={PL - 6} y={toY(v, ymax) + 4} textAnchor="end" fontSize="9.5" fill="#94a3b8" fontWeight="600">{fmtY(v)}</text>
              </g>
            ))}

            {/* X labels */}
            {xTickIdx.map((idx) => (
              <text key={idx} x={toX(idx, lineData.length)} y={VH - 4} textAnchor="middle" fontSize="9.5" fill="#94a3b8" fontWeight="600">{lineData[idx]?.label}</text>
            ))}

            {/* Area */}
            <path d={AREA} fill="url(#ag2)" style={{ opacity: mounted ? 1 : 0, transition: "opacity 0.6s ease" }} />

            {/* Line */}
            <path d={LINE} fill="none" stroke="#4379EE" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"
              style={{ strokeDasharray: 3000, strokeDashoffset: mounted ? 0 : 3000, transition: "stroke-dashoffset 1.2s ease" }} />

            {/* Vertical indicator */}
            {hovered && <line x1={toX(ptIdx, lineData.length)} y1={PT} x2={toX(ptIdx, lineData.length)} y2={PT + PH} stroke="#4379EE" strokeWidth="1" strokeDasharray="3 3" opacity="0.4" />}

            {/* Dot */}
            <circle cx={toX(ptIdx, lineData.length)} cy={toY(pt.val, ymax)} r="5" fill="#4379EE" stroke="white" strokeWidth="2.5" />

            {/* Tooltip */}
            {(() => {
              const cx = toX(ptIdx, lineData.length);
              const cy = toY(pt.val, ymax);
              const tx = Math.min(Math.max(cx - 54, 2), VW - 112);
              const ty = Math.max(cy - 52, 2);
              return (
                <g>
                  <rect x={tx} y={ty} width={108} height={38} rx="7" fill="#1e293b" />
                  <text x={tx + 54} y={ty + 15} textAnchor="middle" fill="white" fontSize="10" fontWeight="800">{pt.val.toLocaleString("fr-FR")} FCFA</text>
                  <text x={tx + 54} y={ty + 29} textAnchor="middle" fill="#94a3b8" fontSize="9" fontWeight="600">{pt.label}</text>
                </g>
              );
            })()}

            {/* Hover overlay */}
            <rect x={PL} y={PT} width={PW} height={PH} fill="transparent" style={{ cursor: "crosshair" }} onMouseMove={onMouseMove} onMouseLeave={() => setHovered(null)} />
          </svg>
        </div>
      </div>

      {/* ─── RIGHT: Donut chart ────────────────────────────────────────── */}
      <div className="bg-white rounded-3xl shadow-sm border border-slate-100 p-6 flex flex-col">
        <div className="flex items-center justify-between mb-5 shrink-0">
          <h3 className="text-sm font-extrabold text-slate-800">Répartition des ventes</h3>
          <div className="relative shrink-0">
            <select value={periodeDonut} onChange={(e) => switchPeriodeDonut(e.target.value)} className={SEL}>
              <option>Par catégorie</option>
              <option>Par marque</option>
            </select>
            <span className="absolute right-2 top-1/2 -translate-y-1/2 text-[9px] text-slate-400 pointer-events-none">▼</span>
          </div>
        </div>

        <div className="flex-1 flex items-center justify-center gap-10" style={{ opacity: fadeDonut ? 0 : 1, transition: "opacity 0.22s ease" }}>
          {/* Donut SVG with animations */}
          <div className="shrink-0 relative">
            <svg viewBox="0 0 160 160" className="w-48 h-48" style={{ transform: "rotate(-90deg)" }}>
              {/* Track */}
              <circle cx={DCX} cy={DCY} r={DR} fill="none" stroke="#f1f5f9" strokeWidth={DSW} />

              {/* Animated segments */}
              {arcs.map((arc, i) => {
                const isHov = hoveredSeg === i;
                return (
                  <g key={`${periodeDonut}-${i}`}>
                    {/* Glow on hover */}
                    {isHov && (
                      <circle cx={DCX} cy={DCY} r={DR} fill="none" stroke={arc.color}
                        strokeWidth={DSW + 6} strokeDasharray={`${arc.dash - 2} ${DCIRC}`}
                        strokeDashoffset={arc.offset} strokeLinecap="butt" opacity="0.18" />
                    )}
                    <circle
                      cx={DCX} cy={DCY} r={DR} fill="none" stroke={arc.color}
                      strokeWidth={isHov ? DSW + 3 : DSW}
                      strokeDasharray={`${mounted ? arc.dash : 0} ${DCIRC}`}
                      strokeDashoffset={arc.offset} strokeLinecap="butt"
                      style={{ transition: `stroke-dasharray 0.9s ease ${i * 0.12}s, stroke-width 0.2s ease`, cursor: "pointer" }}
                      onMouseEnter={() => setHoveredSeg(i)}
                      onMouseLeave={() => setHoveredSeg(null)}
                    />
                  </g>
                );
              })}

              {/* Center: show segment info on hover, total otherwise */}
              <text x={DCX} y={DCY - 10} textAnchor="middle" fontSize={hoveredSeg !== null ? "10" : "17"}
                fontWeight="900" fill={hoveredSeg !== null ? arcs[hoveredSeg]?.color : "#1e293b"}
                style={{ transform: "rotate(90deg)", transformOrigin: `${DCX}px ${DCY}px`, transition: "all 0.2s ease" }}>
                {hoveredSeg !== null ? `${donutSegs[hoveredSeg]?.pct}%` : centerVal}
              </text>
              <text x={DCX} y={DCY + 8} textAnchor="middle" fontSize="8.5" fontWeight="700"
                fill={hoveredSeg !== null ? arcs[hoveredSeg]?.color : "#94a3b8"}
                style={{ transform: "rotate(90deg)", transformOrigin: `${DCX}px ${DCY}px`, transition: "all 0.2s ease" }}>
                {hoveredSeg !== null ? donutSegs[hoveredSeg]?.label : "FCFA"}
              </text>
              <text x={DCX} y={DCY + 20} textAnchor="middle" fontSize="8" fontWeight="600" fill="#94a3b8"
                style={{ transform: "rotate(90deg)", transformOrigin: `${DCX}px ${DCY}px`, opacity: hoveredSeg !== null ? 0 : 1, transition: "opacity 0.2s" }}>
                FCFA
              </text>
            </svg>
          </div>

          {/* Interactive Legend */}
          <div className="space-y-3.5 min-w-[150px]">
            {donutSegs.map((seg, i) => {
              const isHov = hoveredSeg === i;
              return (
                <div
                  key={seg.label}
                  className={`flex items-center justify-between gap-4 cursor-pointer rounded-xl px-2 py-1 transition-all duration-200 ${isHov ? "bg-slate-50 scale-[1.02]" : "hover:bg-slate-50"}`}
                  onMouseEnter={() => setHoveredSeg(i)}
                  onMouseLeave={() => setHoveredSeg(null)}
                >
                  <div className="flex items-center gap-2.5">
                    <span className={`rounded-full shrink-0 transition-all duration-200 ${isHov ? "w-3.5 h-3.5" : "w-3 h-3"}`} style={{ backgroundColor: seg.color }} />
                    <span className={`text-xs font-semibold transition-colors ${isHov ? "text-slate-900" : "text-slate-600"}`}>{seg.label}</span>
                  </div>
                  <span className={`text-xs font-extrabold transition-colors ${isHov ? "text-[#5D5FEF]" : "text-slate-800"}`}>{seg.pct}%</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
};
