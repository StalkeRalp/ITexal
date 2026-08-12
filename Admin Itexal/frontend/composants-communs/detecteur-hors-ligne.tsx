"use client";

import React, { useEffect, useState } from "react";
import { RefreshIcon, WifiOff02Icon } from "hugeicons-react";

export const DetecteurHorsLigne: React.FC = () => {
  const [estHorsLigne, setEstHorsLigne] = useState(false);

  useEffect(() => {
    // Check initial online status
    if (typeof window !== "undefined") {
      setEstHorsLigne(!navigator.onLine);
    }

    const enLigneHandler = () => setEstHorsLigne(false);
    const horsLigneHandler = () => setEstHorsLigne(true);

    window.addEventListener("online", enLigneHandler);
    window.addEventListener("offline", horsLigneHandler);

    return () => {
      window.removeEventListener("online", enLigneHandler);
      window.removeEventListener("offline", horsLigneHandler);
    };
  }, []);

  const testerConnexion = () => {
    if (navigator.onLine) {
      setEstHorsLigne(false);
    } else {
      const element = document.getElementById("offline-content");
      if (element) {
        element.classList.add("animate-pulse");
        setTimeout(() => element.classList.remove("animate-pulse"), 600);
      }
    }
  };

  if (!estHorsLigne) return null;

  return (
    <div className="fixed inset-0 z-[999999] bg-white flex flex-col items-center justify-center p-6 text-slate-800 animate-fadeIn select-none overflow-hidden">
      {/* Dynamic Keyframes Animation for Endless Walking Dinosaur/Bird & Scrolling Ground */}
      <style jsx>{`
        @keyframes legWalkLeft {
          0%, 100% { transform: rotate(-25deg); transform-origin: top center; }
          50% { transform: rotate(25deg); transform-origin: top center; }
        }
        @keyframes legWalkRight {
          0%, 100% { transform: rotate(25deg); transform-origin: top center; }
          50% { transform: rotate(-25deg); transform-origin: top center; }
        }
        @keyframes bodyBobbing {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-6px) rotate(2deg); }
        }
        @keyframes headBobbing {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-3px) rotate(-3deg); }
        }
        @keyframes infiniteRunner {
          0% { transform: translateX(0); }
          100% { transform: translateX(-400px); }
        }
        @keyframes birdAdvanceLoop {
          0% { transform: translateX(-120px); }
          50% { transform: translateX(120px); }
          100% { transform: translateX(-120px); }
        }
        .anim-leg-left {
          animation: legWalkLeft 0.5s infinite ease-in-out;
        }
        .anim-leg-right {
          animation: legWalkRight 0.5s infinite ease-in-out;
        }
        .anim-body-bob {
          animation: bodyBobbing 0.5s infinite ease-in-out;
        }
        .anim-head-bob {
          animation: headBobbing 0.5s infinite ease-in-out;
        }
        .anim-ground-infinite {
          animation: infiniteRunner 4s linear infinite;
        }
        .anim-bird-march {
          animation: birdAdvanceLoop 12s ease-in-out infinite;
        }
      `}</style>

      {/* Conteneur global sans aucun cadre */}
      <div
        id="offline-content"
        className="max-w-xl w-full flex flex-col items-center justify-center text-center space-y-6"
      >
        {/* Badge Hors Ligne */}
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-rose-50 border border-rose-200 text-rose-600 text-xs font-extrabold shadow-xs">
          <WifiOff02Icon size={16} />
          <span>Connexion Interrompue</span>
        </div>

        {/* ── Décoration Forêt Bleue + Oiseau Animé en Marche Infinie (Style Google Dino) ── */}
        <div className="w-full max-w-lg mx-auto py-2 relative overflow-hidden rounded-3xl">
          {/* SVG Forêt Bleue en Arrière-plan */}
          <svg
            viewBox="0 0 800 360"
            className="w-full h-auto"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Soleil / Ciel doux */}
            <circle cx="400" cy="100" r="70" fill="#EEF2FF" />
            <path
              d="M320 110 Q335 85 365 90 Q385 70 415 80 Q445 65 475 85 Q495 90 505 110 Z"
              fill="#E0E7FF"
              opacity="0.8"
            />

            {/* Collines d'arrière-plan en dégradé bleu */}
            <path
              d="M0 270 Q180 200 400 240 T800 230 L800 360 L0 360 Z"
              fill="#DBEAFE"
            />
            <path
              d="M0 250 Q240 295 480 230 T800 255 L800 360 L0 360 Z"
              fill="#BFDBFE"
            />

            {/* Arbres sapins et feuillus bleus */}
            <path d="M110 245 L130 175 L150 245 Z" fill="#93C5FD" />
            <path d="M115 205 L130 155 L145 205 Z" fill="#60A5FA" />
            <rect x="127" y="245" width="6" height="25" fill="#3B82F6" />

            <path d="M210 260 L235 180 L260 260 Z" fill="#60A5FA" />
            <path d="M216 220 L235 160 L254 220 Z" fill="#3B82F6" />
            <rect x="232" y="260" width="6" height="30" fill="#2563EB" />

            <path d="M370 250 L400 140 L430 250 Z" fill="#3B82F6" />
            <path d="M376 200 L400 115 L424 200 Z" fill="#2563EB" />
            <path d="M382 160 L400 90 L418 160 Z" fill="#1D4ED8" />
            <rect x="396" y="250" width="8" height="40" fill="#1E40AF" />

            <path d="M520 260 L545 175 L570 260 Z" fill="#60A5FA" />
            <path d="M526 215 L545 150 L564 215 Z" fill="#3B82F6" />
            <rect x="542" y="260" width="6" height="30" fill="#2563EB" />

            <path d="M630 245 L650 175 L670 245 Z" fill="#93C5FD" />
            <path d="M635 205 L650 155 L665 205 Z" fill="#60A5FA" />
            <rect x="647" y="245" width="6" height="25" fill="#3B82F6" />

            {/* Arbres Arrondis */}
            <circle cx="75" cy="225" r="28" fill="#60A5FA" />
            <circle cx="60" cy="235" r="20" fill="#3B82F6" />
            <circle cx="90" cy="235" r="20" fill="#2563EB" />
            <rect x="72" y="250" width="6" height="30" fill="#1E40AF" />

            <circle cx="725" cy="220" r="30" fill="#3B82F6" />
            <circle cx="710" cy="230" r="22" fill="#2563EB" />
            <circle cx="740" cy="230" r="22" fill="#60A5FA" />
            <rect x="722" y="245" width="6" height="35" fill="#1E40AF" />

            {/* Reliefs et Buissons Bleus */}
            <path
              d="M-20 285 Q150 240 320 275 T700 265 Q760 255 820 285 L820 360 L-20 360 Z"
              fill="#3B82F6"
            />
            <path
              d="M0 300 Q200 265 420 295 T800 290 L800 340 L0 340 Z"
              fill="#2563EB"
            />
            <path
              d="M0 320 Q250 295 500 315 T800 310 L800 340 L0 340 Z"
              fill="#1D4ED8"
            />

            {/* Buissons Bleus Denses au Premier Plan */}
            <circle cx="160" cy="290" r="16" fill="#93C5FD" />
            <circle cx="180" cy="285" r="22" fill="#60A5FA" />
            <circle cx="202" cy="292" r="15" fill="#3B82F6" />

            <circle cx="300" cy="298" r="18" fill="#93C5FD" />
            <circle cx="322" cy="292" r="24" fill="#60A5FA" />
            <circle cx="345" cy="300" r="16" fill="#3B82F6" />

            <circle cx="450" cy="300" r="16" fill="#60A5FA" />
            <circle cx="470" cy="292" r="23" fill="#3B82F6" />
            <circle cx="494" cy="300" r="16" fill="#2563EB" />

            <circle cx="590" cy="290" r="20" fill="#93C5FD" />
            <circle cx="615" cy="283" r="26" fill="#60A5FA" />
            <circle cx="640" cy="292" r="18" fill="#3B82F6" />
          </svg>

          {/* ── L'OISEAU / PERSONNAGE ANIMÉ MARCHANT SUR LE SOL EN AVANÇANT (Style Dino Google) ── */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center justify-center anim-bird-march">
            <div className="relative scale-75 sm:scale-90">
              {/* Corps & Tête Animés */}
              <div className="anim-body-bob flex flex-col items-center">
                {/* Tête */}
                <div className="anim-head-bob">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="80"
                    height="60"
                    viewBox="0 0 115 88"
                  >
                    <g strokeMiterlimit="10">
                      <path
                        d="M195.12889,128.77752c0,-26.96048 21.33334,-48.81626 47.64934,-48.81626c26.316,0 47.64935,21.85578 47.64935,48.81626"
                        transform="translate(-191.87889,-75.62023)"
                        fill="none"
                        stroke="#5B63F6"
                        strokeWidth="6"
                      ></path>
                      <path
                        d="M195.31785,124.43649c0,-26.96048 21.33334,-48.81626 47.64934,-48.81626c26.316,0 47.64935,21.85578 47.64935,48.81626"
                        transform="translate(-191.87889,-75.62023)"
                        fill="#1E293B"
                      ></path>
                      {/* Bec / Bec Oiseau Bleu */}
                      <path
                        d="M271.10348,122.46768l10.06374,-3.28166l24.06547,24.28424"
                        transform="translate(-191.87889,-75.62023)"
                        fill="none"
                        stroke="#5B63F6"
                        strokeWidth="6"
                        strokeLinecap="round"
                      ></path>
                      {/* Œil */}
                      <circle cx="50" cy="45" r="7" fill="#FFFFFF" />
                      <circle cx="52" cy="45" r="3.5" fill="#5B63F6" />
                    </g>
                  </svg>
                </div>

                {/* Corps */}
                <div className="-mt-4">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="100"
                    height="80"
                    viewBox="0 0 144 144"
                  >
                    <g transform="translate(-164.41679,-112.94712)">
                      <path
                        d="M166.9168,184.02633c0,-36.49454 35.0206,-66.07921 72.05288,-66.07921c37.03228,0 67.05288,29.58467 67.05288,66.07921"
                        fill="#1E293B"
                        stroke="#5B63F6"
                        strokeWidth="5"
                      ></path>
                      {/* Plume d'aile */}
                      <path
                        d="M216.22445,188.06994c0,0 1.02834,11.73245 -3.62335,21.11235c-4.65169,9.3799 -13.06183,10.03776 -13.06183,10.03776"
                        fill="none"
                        stroke="#5B63F6"
                        strokeWidth="4"
                        strokeLinecap="round"
                      ></path>
                    </g>
                  </svg>
                </div>
              </div>

              {/* Jambes qui marchent (Walking legs alternating) */}
              <div className="flex justify-center gap-4 -mt-6">
                <div className="anim-leg-left">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="45"
                    viewBox="0 0 20 68"
                  >
                    <path
                      d="M10 0 L10 50 L18 65"
                      fill="none"
                      stroke="#5B63F6"
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>

                <div className="anim-leg-right">
                  <svg
                    version="1.1"
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="45"
                    viewBox="0 0 20 68"
                  >
                    <path
                      d="M10 0 L10 50 L18 65"
                      fill="none"
                      stroke="#3B82F6"
                      strokeWidth="7"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    ></path>
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Titre & Message directement sur la page sans aucun cadre */}
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-black text-slate-900 tracking-tight">
            Vous êtes hors ligne
          </h1>
          <p className="text-slate-500 text-sm max-w-md mx-auto font-medium leading-relaxed">
            Veuillez vérifier votre connexion internet pour continuer à utiliser le back-office ITexal.
          </p>
        </div>

        {/* Bouton Réessayer de couleur Bleue (#5B63F6) */}
        <div className="pt-2">
          <button
            type="button"
            onClick={testerConnexion}
            className="px-8 py-3.5 bg-[#5B63F6] hover:bg-indigo-600 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-indigo-500/25 transition-all flex items-center justify-center gap-2 hover:scale-[1.03] active:scale-[0.98]"
          >
            <RefreshIcon size={18} />
            <span>Réessayer la connexion</span>
          </button>
        </div>
      </div>
    </div>
  );
};
