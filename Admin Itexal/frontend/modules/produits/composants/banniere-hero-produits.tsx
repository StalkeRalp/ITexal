"use client";

import React, { useState, useEffect } from "react";
import {
  SparklesIcon,
  Leaf01Icon,
  Store01Icon,
  GiftIcon,
  ArrowRight01Icon,
  ArrowLeft01Icon,
} from "hugeicons-react";

interface BannerData {
  id: number;
  badge: string;
  titre: string;
  description: string;
  ctaText: string;
  ctaBg: string;
  bgGradient: string;
  accentCircle1: string;
  accentCircle2: string;
  Icone: React.ElementType;
}

const BANNER_LIST: BannerData[] = [
  {
    id: 1,
    badge: "Offre Spéciale • Du 12 au 22 Septembre",
    titre: "Livraison Offerte sur toute la Gamme Cosmétique ITexal",
    description: "Bénéficiez de la livraison rapide gratuite dans tout le pays pour toute commande supérieure à 25.000 FCFA.",
    ctaText: "Découvrir l'offre",
    ctaBg: "bg-[#FF7043] hover:bg-[#F4511E]",
    bgGradient: "from-[#4880FF] via-[#5D5FEF] to-[#8B5CF6]",
    accentCircle1: "border-white/10 bg-white/5",
    accentCircle2: "bg-indigo-500/30",
    Icone: SparklesIcon,
  },
  {
    id: 2,
    badge: "Nouveauté Exclusive 2026",
    titre: "Sérums Bio & Soins Éclat à l'Acide Hyaluronique",
    description: "Une formule dermatologique 100% naturelle pour illuminer et régénérer votre teint au quotidien.",
    ctaText: "Explorer la Collection",
    ctaBg: "bg-[#F59E0B] hover:bg-[#D97706]",
    bgGradient: "from-[#059669] via-[#10B981] to-[#047857]",
    accentCircle1: "border-emerald-300/20 bg-emerald-400/10",
    accentCircle2: "bg-teal-400/20",
    Icone: Leaf01Icon,
  },
  {
    id: 3,
    badge: "Best-Seller Capillaire",
    titre: "Nutrition Intense pour Cheveux Crépus & Frisés",
    description: "Enrichi en beurre de karité brut et huile d'argan pure pour des cheveux hydratés, forts et soyeux.",
    ctaText: "Voir la Gamme Capillaire",
    ctaBg: "bg-[#9F1239] hover:bg-[#881337]",
    bgGradient: "from-[#E11D48] via-[#F43F5E] to-[#FB7185]",
    accentCircle1: "border-rose-300/20 bg-rose-400/10",
    accentCircle2: "bg-pink-400/20",
    Icone: Store01Icon,
  },
  {
    id: 4,
    badge: "Vente Flash • Jusqu'à -30%",
    titre: "Packs Coffret Routine Complète ITexal Cosméceutique",
    description: "Économisez jusqu'à 30% en optant pour nos coffrets cadeaux complets visage, corps et beauté.",
    ctaText: "Profiter des Ventes Flash",
    ctaBg: "bg-[#7C3AED] hover:bg-[#6D28D9]",
    bgGradient: "from-[#0F172A] via-[#1E1B4B] to-[#312E81]",
    accentCircle1: "border-indigo-400/20 bg-purple-500/10",
    accentCircle2: "bg-[#7C3AED]/30",
    Icone: GiftIcon,
  },
];

export const BanniereHeroProduits: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    if (isHovered) return;

    const timer = setInterval(() => {
      handleNext();
    }, 5000);

    return () => clearInterval(timer);
  }, [currentIdx, isHovered]);

  const handleNext = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev + 1) % BANNER_LIST.length);
      setIsTransitioning(false);
    }, 200);
  };

  const handlePrev = () => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIdx((prev) => (prev - 1 + BANNER_LIST.length) % BANNER_LIST.length);
      setIsTransitioning(false);
    }, 200);
  };

  const banner = BANNER_LIST[currentIdx];
  const IconBanner = banner.Icone;

  return (
    <div
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className={`relative bg-gradient-to-r ${banner.bgGradient} text-white rounded-3xl p-8 sm:p-12 overflow-hidden shadow-xl shadow-indigo-500/15 transition-all duration-700`}
    >
      <div
        className={`absolute -right-16 -top-16 w-80 h-80 rounded-full border-40 ${banner.accentCircle1} pointer-events-none transition-all duration-700`}
      />
      <div
        className={`absolute -left-20 -bottom-20 w-96 h-96 rounded-full ${banner.accentCircle2} blur-3xl pointer-events-none transition-all duration-700`}
      />

      <button
        type="button"
        onClick={handlePrev}
        aria-label="Bannière précédente"
        className="absolute left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white font-black transition-all z-20 shadow-md hover:scale-110 active:scale-95"
      >
        <ArrowLeft01Icon size={20} strokeWidth={2.5} />
      </button>

      <button
        type="button"
        onClick={handleNext}
        aria-label="Bannière suivante"
        className="absolute right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-white/15 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white font-black transition-all z-20 shadow-md hover:scale-110 active:scale-95"
      >
        <ArrowRight01Icon size={20} strokeWidth={2.5} />
      </button>

      <div
        className={`relative z-10 max-w-2xl px-6 transition-all duration-300 transform ${
          isTransitioning ? "opacity-0 translate-x-4" : "opacity-100 translate-x-0"
        }`}
      >
        <div className="flex items-center gap-2.5 mb-4">
          <span className="w-8 h-8 rounded-xl bg-white/20 backdrop-blur-md flex items-center justify-center text-white">
            <IconBanner size={18} strokeWidth={2} />
          </span>
          <span className="text-xs font-extrabold uppercase tracking-wider text-white bg-white/15 px-3.5 py-1.5 rounded-full backdrop-blur-md border border-white/20">
            {banner.badge}
          </span>
        </div>

        <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight drop-shadow-xs">
          {banner.titre}
        </h2>

        <p className="mt-3 text-white/90 text-sm sm:text-base leading-relaxed font-medium max-w-xl">
          {banner.description}
        </p>

        <div className="mt-8 flex items-center gap-4">
          <button
            type="button"
            className={`px-7 py-3.5 ${banner.ctaBg} text-white font-extrabold text-xs sm:text-sm rounded-xl shadow-lg transition-all transform hover:-translate-y-0.5 active:translate-y-0 flex items-center gap-2`}
          >
            <span>{banner.ctaText}</span>
            <ArrowRight01Icon size={16} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      <div className="absolute bottom-4 right-8 z-20 flex items-center gap-2">
        {BANNER_LIST.map((b, idx) => {
          const isActive = idx === currentIdx;
          return (
            <button
              key={b.id}
              type="button"
              onClick={() => {
                setIsTransitioning(true);
                setTimeout(() => {
                  setCurrentIdx(idx);
                  setIsTransitioning(false);
                }, 200);
              }}
              className={`relative overflow-hidden rounded-full transition-all duration-300 ${
                isActive ? "w-10 h-2.5 bg-white/40" : "w-2.5 h-2.5 bg-white/30 hover:bg-white/60"
              }`}
              aria-label={`Bannière ${idx + 1}`}
            >
              {isActive && (
                <span
                  className="absolute inset-0 bg-white rounded-full"
                  style={{
                    animation: "bannerProgress 5s linear infinite",
                    animationPlayState: isHovered ? "paused" : "running",
                  }}
                />
              )}
            </button>
          );
        })}
      </div>

      <style jsx>{`
        @keyframes bannerProgress {
          0% {
            width: 0%;
          }
          100% {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};
