"use client";

import React from "react";

interface EmblemeCosmeticAdminProps {
  taille?: "sm" | "md" | "lg";
  afficherCadreArch?: boolean;
}

export const EmblemeCosmeticAdmin: React.FC<EmblemeCosmeticAdminProps> = ({
  taille = "md",
  afficherCadreArch = true,
}) => {
  return (
    <div className="relative flex flex-col items-center justify-center select-none">
      {/* Visual Container with Arch shape matching exact user image design */}
      <div className="relative w-full flex items-center justify-center py-8">
        
        {/* Background Arch Shape if enabled */}
        {afficherCadreArch && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-[320px] sm:w-[460px] md:w-[540px] h-[340px] sm:h-[480px] md:h-[520px] bg-gradient-to-b from-[#7CA5FF] to-[#6090FF] rounded-t-[160px] sm:rounded-t-[240px] md:rounded-t-[270px] rounded-b-[60px] sm:rounded-b-[100px] shadow-2xl opacity-90 backdrop-blur-md transform transition-transform duration-500 hover:scale-[1.02]">
              {/* Inner subtle cutout arch highlight */}
              <div className="absolute inset-2 bg-gradient-to-b from-white/10 to-transparent rounded-t-[155px] sm:rounded-t-[235px] pointer-events-none" />
            </div>
          </div>
        )}

        {/* Logo Core Content */}
        <div className="relative z-10 flex flex-col items-center text-center p-6 space-y-4">
          
          {/* 3D Dashboard & Orbit Graphic */}
          <div className="relative w-44 sm:w-56 md:w-64 h-44 sm:h-56 md:h-64 flex items-center justify-center">
            
            {/* Outer Glowing Orbit Ring */}
            <div className="absolute inset-0 rounded-full border-4 border-white/60 shadow-lg shadow-blue-600/30 transform -rotate-12 animate-pulse" />
            <div className="absolute inset-2 rounded-full border-2 border-blue-200/50 transform rotate-45" />

            {/* Central Monitor Badge Icon */}
            <div className="relative w-32 sm:w-40 md:w-44 h-28 sm:h-36 md:h-40 bg-gradient-to-tr from-[#1E40AF] via-[#3B82F6] to-[#60A5FA] rounded-2xl shadow-2xl border-2 border-white/80 p-3 flex flex-col justify-between overflow-hidden">
              
              {/* Window Header Dots */}
              <div className="flex items-center gap-1.5 pb-2 border-b border-white/20">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
              </div>

              {/* Internal Monitor Content (Charts & Modules) */}
              <div className="grid grid-cols-3 gap-2 my-auto">
                {/* Bar chart mockup */}
                <div className="col-span-2 bg-white/20 backdrop-blur-xs rounded-lg p-2 flex items-end justify-between h-14 border border-white/20">
                  <div className="w-2 bg-white/90 rounded-t h-4" />
                  <div className="w-2 bg-white/90 rounded-t h-8" />
                  <div className="w-2 bg-white/90 rounded-t h-12" />
                  <div className="w-2 bg-white/90 rounded-t h-6" />
                </div>
                {/* Donut / Pie chart mockup */}
                <div className="bg-white/20 backdrop-blur-xs rounded-lg p-1.5 flex items-center justify-center border border-white/20">
                  <div className="w-8 h-8 rounded-full border-4 border-white border-t-transparent animate-spin-slow" />
                </div>
              </div>

              {/* Bottom status line */}
              <div className="flex items-center justify-between text-[9px] text-white/80 font-bold">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 rounded-full bg-emerald-300 animate-ping" />
                  <span>Actif</span>
                </div>
                <span>v2.4</span>
              </div>
            </div>

            {/* Floating 3D Gear Icon (Top Right) */}
            <div className="absolute top-2 right-2 sm:top-4 sm:right-4 w-11 sm:w-14 h-11 sm:h-14 rounded-2xl bg-gradient-to-tr from-[#3B82F6] to-[#93C5FD] text-white flex items-center justify-center shadow-xl border-2 border-white transform rotate-12 hover:rotate-45 transition-transform duration-300">
              <svg className="w-6 sm:w-8 h-6 sm:h-8 animate-spin-slow" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
              </svg>
            </div>

            {/* Floating 3D User Icon Badge (Bottom Left) */}
            <div className="absolute bottom-2 left-2 sm:bottom-4 sm:left-4 w-12 sm:w-16 h-12 sm:h-16 rounded-full bg-gradient-to-br from-[#2563EB] to-[#60A5FA] text-white flex items-center justify-center shadow-xl border-2 border-white transform -rotate-6">
              <svg className="w-7 sm:w-9 h-7 sm:h-9" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Typography Branding (Matching exact visual format of user image) */}
          <div className="space-y-1.5 pt-2 drop-shadow-md">
            {/* Title: COSMETIC */}
            <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-[#1E3A8A] tracking-[0.18em] uppercase font-serif drop-shadow-sm">
              COSMETIC
            </h1>

            {/* Subtitle bar: — ADMIN — */}
            <div className="flex items-center justify-center gap-3">
              <span className="w-8 sm:w-12 h-1 bg-[#3B82F6] rounded-full" />
              <span className="text-xl sm:text-3xl md:text-4xl font-black text-[#3B82F6] tracking-[0.25em] uppercase">
                ADMIN
              </span>
              <span className="w-8 sm:w-12 h-1 bg-[#3B82F6] rounded-full" />
            </div>

            {/* Motto: TABLEAU DE BORD • GESTION • PERFORMANCE */}
            <p className="text-[10px] sm:text-xs md:text-sm font-black text-[#2563EB] tracking-[0.2em] uppercase pt-1">
              TABLEAU DE BORD • GESTION • PERFORMANCE
            </p>
          </div>

        </div>
      </div>
    </div>
  );
};
