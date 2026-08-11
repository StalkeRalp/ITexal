"use client";

import React, { useState } from "react";
import Link from "next/link";
import { formatPrix, formatNombre } from "@/lib/formatteur";
import { useLanguage } from "@/lib/context/LanguageContext";
import {
  Chart01Icon,
  ShoppingBag01Icon,
  UserGroupIcon,
  PackageIcon,
  ArrowUp01Icon,
  Calendar01Icon,
  StarIcon,
  ArrowRight01Icon,
  Store01Icon,
  Discount01Icon,
} from "hugeicons-react";

type Pt = { label: string; sales: number; profit: number };

const REVENUE_DATA: Record<string, Pt[]> = {
  October: [
    { label: "01 Oct", sales: 150000, profit: 90000 },
    { label: "05 Oct", sales: 380000, profit: 240000 },
    { label: "10 Oct", sales: 290000, profit: 180000 },
    { label: "15 Oct", sales: 643000, profit: 421000 },
    { label: "20 Oct", sales: 480000, profit: 310000 },
    { label: "25 Oct", sales: 820000, profit: 545000 },
    { label: "30 Oct", sales: 940000, profit: 630000 },
  ],
  November: [
    { label: "01 Nov", sales: 220000, profit: 140000 },
    { label: "05 Nov", sales: 450000, profit: 290000 },
    { label: "10 Nov", sales: 510000, profit: 340000 },
    { label: "15 Nov", sales: 720000, profit: 480000 },
    { label: "20 Nov", sales: 890000, profit: 580000 },
    { label: "25 Nov", sales: 980000, profit: 650000 },
    { label: "30 Nov", sales: 1150000, profit: 780000 },
  ],
  December: [
    { label: "01 Déc", sales: 300000, profit: 200000 },
    { label: "05 Déc", sales: 580000, profit: 380000 },
    { label: "10 Déc", sales: 790000, profit: 520000 },
    { label: "15 Déc", sales: 980000, profit: 690000 },
    { label: "20 Déc", sales: 1250000, profit: 840000 },
    { label: "25 Déc", sales: 1420000, profit: 960000 },
    { label: "31 Déc", sales: 1650000, profit: 1100000 },
  ],
};

const DONUT_CUSTOMERS = [
  { label: "Nouveaux Clients", val: 3420, color: "#4880FF" },
  { label: "Fidélisés (Récurrents)", val: 1420, color: "#00B69B" },
];

const PRODUCTS_TOP = [
  {
    nom: "Sérum Visage Éclat Bio Karité",
    prix: 15000,
    ventesTotal: "1 420 unités",
    note: "4.9",
    image: "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&auto=format&fit=crop&q=80",
  },
  {
    nom: "Crème Hydratante Onctueuse Karité",
    prix: 18500,
    ventesTotal: "2 890 unités",
    note: "4.8",
    image: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&auto=format&fit=crop&q=80",
  },
  {
    nom: "Masque Capillaire Argan Luxe",
    prix: 22500,
    ventesTotal: "980 unités",
    note: "5.0",
    image: "https://images.unsplash.com/photo-1535585209827-a15fcdbc4c2d?w=400&auto=format&fit=crop&q=80",
  },
];

const VW = 900, VH = 240;
const PL = 50, PR = 15, PT = 15, PB = 30;
const PW = VW - PL - PR;
const PH = VH - PT - PB;

function toX(i: number, total: number) {
  return PL + (i / Math.max(total - 1, 1)) * PW;
}
function toY(val: number, ymax: number) {
  return PT + PH - (val / ymax) * PH;
}
function yMax(data: Pt[], key: "sales" | "profit") {
  const m = Math.max(...data.map((d) => d[key]));
  return Math.ceil(m / 500000) * 500000;
}
function buildCurve(data: Pt[], key: "sales" | "profit", ym: number) {
  return data.reduce((acc, p, i) => {
    const x = toX(i, data.length), y = toY(p[key], ym);
    if (i === 0) return `M ${x} ${y}`;
    const px = toX(i - 1, data.length), py = toY(data[i - 1][key], ym);
    const mx = (px + x) / 2;
    return `${acc} C ${mx} ${py}, ${mx} ${y}, ${x} ${y}`;
  }, "");
}

export default function PageStatistiquesAdmin() {
  const { t } = useLanguage();
  const [mois, setMois] = useState("October");
  const [metrique, setMetrique] = useState<"sales" | "profit">("sales");
  const [hoverIdx, setHoverIdx] = useState<number | null>(4);
  const [prodIdx, setProdIdx] = useState(0);

  const data = REVENUE_DATA[mois];
  const ym = yMax(data, metrique);
  const yticks = [ym, ym * 0.75, ym * 0.5, ym * 0.25, 0];
  const CURVE = buildCurve(data, metrique, ym);
  const AREA = `${CURVE} L ${toX(data.length - 1, data.length)} ${PT + PH} L ${toX(0, data.length)} ${PT + PH} Z`;

  const activeIdx = hoverIdx ?? 4;
  const activePt = data[activeIdx];

  const totalCust = DONUT_CUSTOMERS.reduce((s, d) => s + d.val, 0);
  const DCIRC = 2 * Math.PI * 40;
  let cumCust = 0;
  const custArcs = DONUT_CUSTOMERS.map((d) => {
    const dash = (d.val / totalCust) * DCIRC - 2;
    const offset = DCIRC / 4 - cumCust;
    cumCust += (d.val / totalCust) * DCIRC;
    return { ...d, dash, offset };
  });

  return (
    <div className="space-y-8 animate-fadeIn max-w-7xl mx-auto">
      {/* Title Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-slate-400 font-bold mb-1">
            <Link href="/admin" className="hover:text-[#4880FF] transition-colors">
              {t("tableauDeBord")}
            </Link>
            <span>/</span>
            <span className="text-slate-700">{t("statistiques")}</span>
          </div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Analyse & Performance E-Commerce
          </h1>
        </div>

        <Link
          href="/admin"
          className="px-5 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <span>← Dashboard Principal</span>
        </Link>
      </div>

      {/* KPI Cards Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Chiffre d'Affaires
            </span>
            <h3 className="text-2xl font-black text-slate-800 mt-1">10 250 000 FCFA</h3>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-2">
              <ArrowUp01Icon size={14} />
              <span>+18.4% ce mois</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#4880FF] flex items-center justify-center font-bold">
            <Chart01Icon size={24} strokeWidth={2} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Total Commandes
            </span>
            <h3 className="text-2xl font-black text-slate-800 mt-1">1 280</h3>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-2">
              <ArrowUp01Icon size={14} />
              <span>+12.1% par rapport au mois passé</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <ShoppingBag01Icon size={24} strokeWidth={2} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Clients Actifs
            </span>
            <h3 className="text-2xl font-black text-slate-800 mt-1">4 840</h3>
            <div className="flex items-center gap-1 text-[11px] font-bold text-emerald-600 mt-2">
              <ArrowUp01Icon size={14} />
              <span>+8.6% d'inscriptions</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center font-bold">
            <UserGroupIcon size={24} strokeWidth={2} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex items-center justify-between hover:shadow-md transition-shadow">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Produits Vendus
            </span>
            <h3 className="text-2xl font-black text-slate-800 mt-1">5 290</h3>
            <div className="flex items-center gap-1 text-[11px] font-bold text-amber-600 mt-2">
              <Store01Icon size={14} />
              <span>Stock réapprovisionné</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <PackageIcon size={24} strokeWidth={2} />
          </div>
        </div>
      </div>

      {/* Main Revenue Chart Card */}
      <div className="bg-white rounded-3xl p-8 shadow-sm border border-slate-100 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <h2 className="text-xl font-extrabold text-slate-800">
              Évolution du Chiffre d'Affaires & Bénéfice
            </h2>
            <p className="text-xs text-slate-500 font-medium mt-0.5">
              Survolez les points interactifs pour consulter les détails financiers par période.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="bg-[#F5F6FA] p-1 rounded-xl flex text-xs font-bold">
              {(["sales", "profit"] as const).map((m) => (
                <button
                  key={m}
                  type="button"
                  onClick={() => setMetrique(m)}
                  className={`px-3.5 py-1.5 rounded-lg transition-all ${
                    metrique === m
                      ? "bg-white text-[#4880FF] shadow-xs"
                      : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {m === "sales" ? "Ventes Brutes" : "Bénéfice Net"}
                </button>
              ))}
            </div>

            <select
              value={mois}
              onChange={(e) => setMois(e.target.value)}
              className="bg-[#F5F6FA] border border-slate-200 text-xs font-extrabold text-slate-700 py-2 px-3 rounded-xl focus:outline-none cursor-pointer"
            >
              <option value="October">Octobre 2026</option>
              <option value="November">Novembre 2026</option>
              <option value="December">Décembre 2026</option>
            </select>
          </div>
        </div>

        {/* SVG Revenue Chart */}
        <div className="relative w-full" style={{ height: 260 }}>
          <svg viewBox={`0 0 ${VW} ${VH}`} className="w-full h-full overflow-visible">
            <defs>
              <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#4880FF" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#4880FF" stopOpacity="0.01" />
              </linearGradient>
            </defs>

            {yticks.map((v, i) => (
              <g key={i}>
                <line
                  x1={PL}
                  y1={toY(v, ym)}
                  x2={VW - PR}
                  y2={toY(v, ym)}
                  stroke="#f1f5f9"
                  strokeWidth="1"
                  strokeDasharray="4 4"
                />
                <text
                  x={PL - 8}
                  y={toY(v, ym) + 4}
                  textAnchor="end"
                  fontSize="10"
                  fill="#94a3b8"
                  fontWeight="600"
                >
                  {(v / 1000).toFixed(0)}k
                </text>
              </g>
            ))}

            {data.map((pt, i) => (
              <text
                key={i}
                x={toX(i, data.length)}
                y={VH - 4}
                textAnchor="middle"
                fontSize="10"
                fill="#94a3b8"
                fontWeight="600"
              >
                {pt.label}
              </text>
            ))}

            <path d={AREA} fill="url(#chartGrad)" />
            <path
              d={CURVE}
              fill="none"
              stroke="#4880FF"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />

            {data.map((pt, i) => (
              <circle
                key={i}
                cx={toX(i, data.length)}
                cy={toY(pt[metrique], ym)}
                r={hoverIdx === i ? 7 : 5}
                fill={hoverIdx === i ? "#4880FF" : "white"}
                stroke="#4880FF"
                strokeWidth="3"
                className="cursor-pointer transition-all"
                onMouseEnter={() => setHoverIdx(i)}
              />
            ))}
          </svg>
        </div>
      </div>

      {/* Grid for Customers Donut & Top Selling Products */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Customers Donut */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-4">
          <h3 className="text-base font-extrabold text-slate-800">
            Répartition des Clients
          </h3>
          <div className="flex flex-col items-center py-4">
            <svg viewBox="0 0 100 100" className="w-40 h-40" style={{ transform: "rotate(-90deg)" }}>
              <circle cx="50" cy="50" r="40" fill="none" stroke="#F5F6FA" strokeWidth="12" />
              {custArcs.map((arc, i) => (
                <circle
                  key={i}
                  cx="50"
                  cy="50"
                  r="40"
                  fill="none"
                  stroke={arc.color}
                  strokeWidth="12"
                  strokeDasharray={`${arc.dash} ${DCIRC}`}
                  strokeDashoffset={arc.offset}
                  strokeLinecap="butt"
                />
              ))}
              <text
                x="50"
                y="47"
                textAnchor="middle"
                fontSize="12"
                fontWeight="900"
                fill="#1e293b"
                style={{ transform: "rotate(90deg)", transformOrigin: "50px 50px" }}
              >
                70.6%
              </text>
              <text
                x="50"
                y="59"
                textAnchor="middle"
                fontSize="7"
                fontWeight="600"
                fill="#94a3b8"
                style={{ transform: "rotate(90deg)", transformOrigin: "50px 50px" }}
              >
                Nouveaux
              </text>
            </svg>
            <div className="grid grid-cols-2 gap-4 w-full pt-4 border-t border-slate-100 text-center">
              {DONUT_CUSTOMERS.map((d) => (
                <div key={d.label}>
                  <h4 className="text-lg font-black text-slate-900">{formatNombre(d.val)}</h4>
                  <div className="flex items-center justify-center gap-1.5 mt-1">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: d.color }} />
                    <span className="text-[11px] font-bold text-slate-500">{d.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Product Showcase */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-base font-extrabold text-slate-800">
              Meilleure Vente Cosmétique
            </h3>
            <span className="text-xs font-bold text-amber-600 bg-amber-50 px-2.5 py-1 rounded-lg flex items-center gap-1">
              <span>{PRODUCTS_TOP[prodIdx].note}</span>
              <StarIcon size={12} className="text-amber-500 fill-amber-500" />
            </span>
          </div>

          <div className="flex flex-col items-center text-center space-y-3 py-2">
            <div className="w-36 h-36 rounded-2xl overflow-hidden border border-slate-100 shadow-sm">
              <img
                src={PRODUCTS_TOP[prodIdx].image}
                alt={PRODUCTS_TOP[prodIdx].nom}
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 text-sm">{PRODUCTS_TOP[prodIdx].nom}</h4>
              <p className="font-black text-[#4880FF] text-lg mt-1">
                {formatPrix(PRODUCTS_TOP[prodIdx].prix)} FCFA
              </p>
              <p className="text-xs text-slate-400 font-bold">{PRODUCTS_TOP[prodIdx].ventesTotal}</p>
            </div>
          </div>

          <div className="flex justify-center gap-2">
            {PRODUCTS_TOP.map((_, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setProdIdx(i)}
                className={`h-2 rounded-full transition-all ${
                  prodIdx === i ? "w-6 bg-[#4880FF]" : "w-2 bg-slate-200"
                }`}
              />
            ))}
          </div>
        </div>

        {/* Quick Links / Actions */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-extrabold text-slate-800">
              Rapports et Exportations
            </h3>
            <p className="text-xs text-slate-500 font-medium mt-1">
              Téléchargez les synthèses financières et d'inventaire back-office en un clic.
            </p>
          </div>

          <div className="space-y-3">
            <Link
              href="/admin/commandes"
              className="w-full p-3 rounded-2xl bg-blue-50/70 hover:bg-blue-50 text-[#4880FF] font-bold text-xs flex items-center justify-between transition-colors"
            >
              <span>Exporter l'historique des commandes</span>
              <ArrowRight01Icon size={16} />
            </Link>

            <Link
              href="/admin/stocks"
              className="w-full p-3 rounded-2xl bg-slate-50 hover:bg-slate-100 text-slate-700 font-bold text-xs flex items-center justify-between transition-colors"
            >
              <span>Rapport d'inventaire et rupture stock</span>
              <ArrowRight01Icon size={16} />
            </Link>

            <Link
              href="/admin/promotions"
              className="w-full p-3 rounded-2xl bg-indigo-50/70 hover:bg-indigo-50 text-indigo-600 font-bold text-xs flex items-center justify-between transition-colors"
            >
              <span>Statistiques des codes promo</span>
              <ArrowRight01Icon size={16} />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
