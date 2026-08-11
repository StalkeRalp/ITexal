import React from "react";
import Link from "next/link";
import { ArrowRight01Icon } from "hugeicons-react";

export const SectionProduitsVedettes: React.FC = () => {
  const cartesDemo = [
    {
      titre: "Soins Visage & Éclat",
      description: "Sérums hydratants et crèmes nettoyantes douces pour tous types de peau.",
      categorie: "Dermatologie",
    },
    {
      titre: "Soins du Corps & Huiles",
      description: "Huiles précieuses et beurres corporels nourrissants longue durée.",
      categorie: "Corps & Bien-être",
    },
    {
      titre: "Gamme Capillaire",
      description: "Shampoings et masques réparateurs à base d'ingrédients naturels.",
      categorie: "Cheveux",
    },
  ];

  return (
    <section id="produits" className="py-20 bg-slate-900/40">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto mb-16">
          <h2 className="text-3xl font-bold text-slate-100">Nos Catégories Phares</h2>
          <p className="text-sm text-slate-400 mt-2">
            La plateforme e-commerce ITexal alimentée en temps réel par l&apos;espace d&apos;administration.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {cartesDemo.map((carte, index) => (
            <div
              key={index}
              className="p-6 rounded-2xl bg-slate-900 border border-slate-800 hover:border-blue-500/40 transition-all flex flex-col justify-between group"
            >
              <div>
                <span className="text-[11px] font-bold text-[#4880FF] uppercase tracking-widest bg-blue-500/10 px-2.5 py-1 rounded-md border border-blue-500/20">
                  {carte.categorie}
                </span>
                <h3 className="text-lg font-bold text-slate-100 mt-4 group-hover:text-[#4880FF] transition-colors">
                  {carte.titre}
                </h3>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  {carte.description}
                </p>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-slate-500">
                <span>Géré via l&apos;Admin</span>
                <Link href="/admin/produits" className="text-[#4880FF] hover:underline font-semibold flex items-center gap-1">
                  <span>Gérer les produits</span>
                  <ArrowRight01Icon size={14} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
