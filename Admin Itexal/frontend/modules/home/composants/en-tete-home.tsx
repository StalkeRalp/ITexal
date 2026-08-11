"use client";

import React from "react";
import Link from "next/link";

export const EnTeteHome: React.FC = () => {
  return (
    <header className="sticky top-0 z-50 bg-slate-950/80 backdrop-blur border-b border-slate-800/80">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-indigo-600 via-pink-600 to-rose-500 flex items-center justify-center font-bold text-white shadow-lg shadow-pink-500/20 text-lg">
            IT
          </div>
          <div>
            <span className="font-extrabold text-xl text-slate-100 tracking-wide">ITexal</span>
            <span className="text-xs text-rose-400 block font-medium uppercase tracking-widest -mt-1">Cosmétiques</span>
          </div>
        </Link>

        {/* Public Navigation */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
          <Link href="/" className="hover:text-rose-400 transition-colors">
            Accueil
          </Link>
          <Link href="#produits" className="hover:text-rose-400 transition-colors">
            Nos Soins
          </Link>
          <Link href="#categories" className="hover:text-rose-400 transition-colors">
            Catégories
          </Link>
          <Link href="#engagements" className="hover:text-rose-400 transition-colors">
            À Propos
          </Link>
        </nav>

        {/* Actions / Admin Shortcut */}
        <div className="flex items-center gap-4">
          <Link
            href="/admin"
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-all flex items-center gap-2 shadow-sm"
          >
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            Espace Administrateur
          </Link>
        </div>
      </div>
    </header>
  );
};
