"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";

interface LayoutAuthBaseProps {
  titre: string;
  sousTitre?: string;
  afficherResociaux?: boolean;
  afficherSeparateur?: boolean;
  lienFooter?: React.ReactNode;
  illustrationSrc?: string;
  children: React.ReactNode;
}

export const LayoutAuthBase: React.FC<LayoutAuthBaseProps> = ({
  titre,
  sousTitre,
  afficherResociaux = false,
  afficherSeparateur = false,
  lienFooter,
  illustrationSrc = "/signUp.svg",
  children,
}) => {
  return (
    <div className="h-screen w-full flex bg-[#F8FAFC] select-none font-sans overflow-hidden">
      
      {/* ── Left Column: Form Panel ── */}
      <div className="w-full md:w-[480px] lg:w-[520px] bg-white h-full max-h-screen p-5 sm:p-6 md:p-8 flex flex-col justify-between z-10 border-r border-slate-200/60 shadow-xs shrink-0 overflow-hidden">
        <div className="my-auto space-y-3.5 sm:space-y-4">
          
          {/* Official Cosmetic Admin Logo */}
          <div className="flex items-center justify-center py-2">
            <img
              src="/Admin Cosmetic.png"
              alt="Cosmetic Admin"
              className="h-24 sm:h-28 md:h-32 w-auto max-w-[360px] sm:max-w-[420px] object-contain drop-shadow-md transition-transform hover:scale-[1.02]"
            />
          </div>

          {/* Page Title */}
          <div className="text-center space-y-0.5">
            <h1 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              {titre}
            </h1>
            {sousTitre && (
              <p className="text-[11px] sm:text-xs text-slate-500 font-medium">
                {sousTitre}
              </p>
            )}
          </div>

          {/* Social Logins (Google / Facebook) */}
          {afficherResociaux && (
            <div className="flex items-center gap-2.5">
              <button
                type="button"
                className="flex-1 py-2.5 px-3 bg-[#F4F6FA] hover:bg-slate-100 border border-slate-200/80 rounded-xl text-xs font-extrabold text-slate-700 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
              >
                <svg width="16" height="16" viewBox="0 0 24 24">
                  <path
                    fill="#4285F4"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="#34A853"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="#FBBC05"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"
                  />
                  <path
                    fill="#EA4335"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"
                  />
                </svg>
                <span>Google</span>
              </button>

              <button
                type="button"
                className="flex-1 py-2.5 px-3 bg-[#F4F6FA] hover:bg-slate-100 border border-slate-200/80 rounded-xl text-xs font-extrabold text-slate-700 flex items-center justify-center gap-2 transition-all cursor-pointer shadow-2xs"
              >
                <svg width="16" height="16" fill="#1877F2" viewBox="0 0 24 24">
                  <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                </svg>
                <span>Facebook</span>
              </button>
            </div>
          )}

          {/* Divider "Or" */}
          {afficherSeparateur && (
            <div className="relative flex items-center justify-center my-1">
              <div className="border-t border-slate-200/80 w-full" />
              <span className="bg-white px-3 text-[10px] font-extrabold text-slate-400 uppercase tracking-widest absolute">
                Or
              </span>
            </div>
          )}

          {/* Main Form Fields */}
          {children}

        </div>

        {/* Footer Links & Legal Pages */}
        <div className="text-center text-xs text-slate-500 font-bold pt-3 border-t border-slate-100 mt-2 shrink-0 space-y-1.5">
          {lienFooter && <div>{lienFooter}</div>}
          <div className="flex items-center justify-center gap-3 text-[11px] font-semibold text-slate-400">
            <Link href="/conditions-generales" className="hover:text-[#5B63F6] hover:underline transition-colors">
              Conditions Générales
            </Link>
            <span>•</span>
            <Link href="/politique-confidentialite" className="hover:text-[#5B63F6] hover:underline transition-colors">
              Politique de Confidentialité
            </Link>
          </div>
        </div>
      </div>

      {/* ── Right Column: Vector Illustration ── */}
      <div className="flex-1 bg-[#EBF3FF] hidden md:flex items-center justify-center p-8 lg:p-12 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 bg-[#7CA5FF]/60 rounded-br-[140px] pointer-events-none transform -translate-x-10 -translate-y-10" />
        <div className="absolute top-0 right-0 w-80 h-96 bg-[#4880FF]/70 rounded-bl-[200px] pointer-events-none transform translate-x-12 -translate-y-12" />
        <div className="absolute bottom-0 right-0 w-96 h-80 bg-[#3B82F6]/75 rounded-tl-[220px] pointer-events-none transform translate-x-10 translate-y-10" />

        <div className="relative z-10 max-w-xl w-full flex items-center justify-center p-4">
          <Image
            src={illustrationSrc}
            alt="Cosmetic Admin Auth"
            width={650}
            height={600}
            priority
            className="w-full h-auto max-h-[82vh] object-contain drop-shadow-md rounded-2xl transition-transform duration-500 hover:scale-[1.01]"
          />
        </div>
      </div>

    </div>
  );
};
