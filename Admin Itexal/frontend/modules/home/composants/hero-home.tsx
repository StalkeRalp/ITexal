import React from "react";
import Link from "next/link";
import { SparklesIcon, ArrowRight01Icon } from "hugeicons-react";

export const HeroHome: React.FC = () => {
  return (
    <section className="relative overflow-hidden py-20 lg:py-32 bg-slate-950 border-b border-slate-800/60">
      {/* Background glow effects */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/20 via-pink-600/20 to-rose-500/10 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10 text-center">
        <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold uppercase tracking-wider mb-6">
          <SparklesIcon size={16} /> Excellence & Sublime Cosmétique
        </span>

        <h1 className="text-4xl sm:text-6xl font-extrabold text-slate-100 tracking-tight max-w-4xl mx-auto leading-tight">
          La haute qualité cosmétique pour votre beauté naturelle avec{" "}
          <span className="bg-gradient-to-r from-rose-400 via-pink-400 to-[#4880FF] bg-clip-text text-transparent">
            ITexal
          </span>
        </h1>

        <p className="mt-6 text-slate-400 text-base sm:text-lg max-w-2xl mx-auto leading-relaxed">
          Découvrez notre gamme exclusive de soins dermatologiques et produits de beauté conçus avec rigueur et passion.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/admin"
            className="px-6 py-3.5 rounded-xl bg-[#4880FF] hover:bg-blue-600 text-white font-semibold text-sm shadow-xl shadow-blue-500/20 transition-all flex items-center gap-2"
          >
            <span>Accéder à l&apos;Administration Admin</span>
            <ArrowRight01Icon size={18} />
          </Link>
          <a
            href="#produits"
            className="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm transition-all"
          >
            Découvrir le catalogue (Bientôt)
          </a>
        </div>
      </div>
    </section>
  );
};
