import React from "react";
import Link from "next/link";

export const PiedDePageHome: React.FC = () => {
  return (
    <footer className="bg-slate-950 border-t border-slate-800 py-12 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <p className="font-semibold text-slate-200 text-sm">ITexal — E-commerce Cosmétique</p>
          <p className="text-slate-500 mt-1">© 2026 ITexal. Tous droits réservés.</p>
        </div>

        <div className="flex items-center gap-6 text-slate-400">
          <Link href="/admin" className="hover:text-slate-200 transition-colors">
            Back-Office Admin
          </Link>
          <Link href="/admin/produits" className="hover:text-slate-200 transition-colors">
            Gestion Produits
          </Link>
          <Link href="/admin/commandes" className="hover:text-slate-200 transition-colors">
            Gestion Commandes
          </Link>
        </div>
      </div>
    </footer>
  );
};
