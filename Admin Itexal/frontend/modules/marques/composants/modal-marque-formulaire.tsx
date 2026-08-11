"use client";

import React, { useState, useEffect } from "react";
import { Marque } from "../types/marque";
import { Building02Icon, Cancel01Icon } from "hugeicons-react";

interface ModalMarqueFormulaireProps {
  ouvert: boolean;
  marqueAEditer: Marque | null;
  onFermer: () => void;
  onEnregistrer: (marque: Marque) => void;
}

export const ModalMarqueFormulaire: React.FC<ModalMarqueFormulaireProps> = ({
  ouvert,
  marqueAEditer,
  onFermer,
  onEnregistrer,
}) => {
  const [nom, setNom] = useState("");
  const [logo, setLogo] = useState("");
  const [paysOrigine, setPaysOrigine] = useState("Cameroun");
  const [description, setDescription] = useState("");
  const [siteWeb, setSiteWeb] = useState("");
  const [statut, setStatut] = useState<"Active" | "Inactive">("Active");

  useEffect(() => {
    if (marqueAEditer) {
      setNom(marqueAEditer.nom);
      setLogo(marqueAEditer.logo);
      setPaysOrigine(marqueAEditer.paysOrigine);
      setDescription(marqueAEditer.description);
      setSiteWeb(marqueAEditer.siteWeb || "");
      setStatut(marqueAEditer.statut);
    } else {
      setNom("");
      setLogo("ITexal");
      setPaysOrigine("Cameroun");
      setDescription("");
      setSiteWeb("");
      setStatut("Active");
    }
  }, [marqueAEditer, ouvert]);

  if (!ouvert) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nom) return;

    const marqueResultat: Marque = {
      id: marqueAEditer?.id || `mar-${Date.now()}`,
      nom,
      logo: logo || "ITexal",
      paysOrigine,
      description,
      siteWeb,
      statut,
      nombreProduits: marqueAEditer?.nombreProduits || 0,
      creeLe: marqueAEditer?.creeLe || new Date().toLocaleDateString("fr-FR"),
    };

    onEnregistrer(marqueResultat);
    onFermer();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#4880FF] font-extrabold flex items-center justify-center text-lg">
              <Building02Icon size={20} strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-lg font-bold text-slate-800">
                {marqueAEditer ? "Modifier la Marque" : "Ajouter une Marque Partenaire"}
              </h2>
              <p className="text-xs text-slate-500">
                Gestion des marques et maisons cosmétiques.
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onFermer}
            aria-label="Fermer la fenêtre"
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold flex items-center justify-center transition-colors text-xs"
          >
            <Cancel01Icon size={16} strokeWidth={2} />
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4 text-xs">
          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Nom de la marque *
            </label>
            <input
              type="text"
              required
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              placeholder="Ex: ITexal Cosméceutiques"
              className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-sm focus:outline-none focus:border-[#4880FF] text-slate-800"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Pays d'origine
              </label>
              <input
                type="text"
                value={paysOrigine}
                onChange={(e) => setPaysOrigine(e.target.value)}
                placeholder="Cameroun / France"
                className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4880FF] text-slate-800"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Identifiant / URL Logo
              </label>
              <input
                type="text"
                value={logo}
                onChange={(e) => setLogo(e.target.value)}
                placeholder="https://... ou ITexal"
                className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4880FF]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Site Web Officiel
              </label>
              <input
                type="url"
                value={siteWeb}
                onChange={(e) => setSiteWeb(e.target.value)}
                placeholder="https://itexal.cm"
                className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4880FF]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Statut
              </label>
              <select
                value={statut}
                onChange={(e) => setStatut(e.target.value as "Active" | "Inactive")}
                className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4880FF] text-slate-800 font-semibold"
              >
                <option value="Active">Active (Visible)</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold text-slate-700 mb-1">
              Description / Histoire de la marque
            </label>
            <textarea
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Présentation de la marque et engagements qualité..."
              className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4880FF] text-slate-800"
            />
          </div>

          {/* Footer Submit */}
          <div className="pt-4 flex items-center justify-between border-t border-slate-100">
            <button
              type="button"
              onClick={onFermer}
              className="px-5 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold hover:bg-slate-100 transition-colors"
            >
              Annuler
            </button>

            <button
              type="submit"
              className="px-6 py-2.5 bg-[#4880FF] hover:bg-blue-600 text-white font-bold rounded-xl transition-all shadow-md shadow-blue-500/20"
            >
              Enregistrer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
