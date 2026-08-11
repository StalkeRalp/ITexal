"use client";

import React, { useState, useEffect } from "react";
import {
  UtilisateurInterne,
  RoleUtilisateur,
  StatutUtilisateur,
} from "../types/utilisateur";
import { UserIcon, Cancel01Icon } from "hugeicons-react";

interface ModalUtilisateurFormulaireProps {
  ouvert: boolean;
  utilisateurAEditer: UtilisateurInterne | null;
  onFermer: () => void;
  onEnregistrer: (utilisateur: UtilisateurInterne) => void;
}

export const ModalUtilisateurFormulaire: React.FC<
  ModalUtilisateurFormulaireProps
> = ({ ouvert, utilisateurAEditer, onFermer, onEnregistrer }) => {
  const [nomComplet, setNomComplet] = useState("");
  const [email, setEmail] = useState("");
  const [telephone, setTelephone] = useState("");
  const [role, setRole] = useState<RoleUtilisateur>("Responsable Commandes");
  const [statut, setStatut] = useState<StatutUtilisateur>("Actif");

  useEffect(() => {
    if (utilisateurAEditer) {
      setNomComplet(utilisateurAEditer.nomComplet);
      setEmail(utilisateurAEditer.email);
      setTelephone(utilisateurAEditer.telephone);
      setRole(utilisateurAEditer.role);
      setStatut(utilisateurAEditer.statut);
    } else {
      setNomComplet("");
      setEmail("");
      setTelephone("+237 699 00 11 22");
      setRole("Responsable Commandes");
      setStatut("Actif");
    }
  }, [utilisateurAEditer, ouvert]);

  if (!ouvert) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!nomComplet || !email) return;

    const utilisateurResultat: UtilisateurInterne = {
      id: utilisateurAEditer?.id || `user-${Date.now()}`,
      nomComplet,
      email,
      telephone,
      role,
      statut,
      avatar:
        utilisateurAEditer?.avatar ||
        `https://api.dicebear.com/7.x/avataaars/svg?seed=${encodeURIComponent(
          nomComplet
        )}`,
      dernierAcces: utilisateurAEditer?.dernierAcces || "À l'instant",
      creeLe: utilisateurAEditer?.creeLe || new Date().toLocaleDateString("fr-FR"),
    };

    onEnregistrer(utilisateurResultat);
    onFermer();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl border border-slate-100 flex flex-col overflow-hidden">
        {/* Header */}
        <div className="px-6 py-5 border-b border-slate-100 flex items-center justify-between bg-slate-50/60">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#4880FF] font-extrabold flex items-center justify-center text-lg">
              <UserIcon size={20} strokeWidth={2} />
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-800">
                {utilisateurAEditer
                  ? "Modifier l'Utilisateur Interne"
                  : "Nouveau Membre de l'Équipe"}
              </h2>
              <p className="text-xs text-slate-500 font-medium">
                Définition du rôle RBAC et des privilèges système.
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
              Nom complet *
            </label>
            <input
              type="text"
              required
              value={nomComplet}
              onChange={(e) => setNomComplet(e.target.value)}
              placeholder="Ex: Jean-Marc Eboa"
              className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-sm font-bold focus:outline-none focus:border-[#4880FF]"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                E-mail professionnel *
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="jm.eboa@itexal.com"
                className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4880FF]"
              />
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Téléphone
              </label>
              <input
                type="text"
                value={telephone}
                onChange={(e) => setTelephone(e.target.value)}
                placeholder="+237 699 00 11 22"
                className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs focus:outline-none focus:border-[#4880FF]"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Rôle système (RBAC) *
              </label>
              <select
                value={role}
                onChange={(e) => setRole(e.target.value as RoleUtilisateur)}
                className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs font-bold text-[#4880FF] focus:outline-none focus:border-[#4880FF]"
              >
                <option value="Super Admin">Super Admin</option>
                <option value="Gestionnaire de Stock">Gestionnaire de Stock</option>
                <option value="Responsable Commandes">Responsable Commandes</option>
                <option value="Rédacteur Contenu">Rédacteur Contenu</option>
              </select>
            </div>

            <div>
              <label className="block font-bold text-slate-700 mb-1">
                Statut du compte *
              </label>
              <select
                value={statut}
                onChange={(e) => setStatut(e.target.value as StatutUtilisateur)}
                className="w-full px-4 py-2.5 bg-[#F8F9FD] border border-slate-200 rounded-xl text-xs font-semibold focus:outline-none focus:border-[#4880FF]"
              >
                <option value="Actif">Actif</option>
                <option value="Inactif">Inactif</option>
                <option value="Suspendu">Suspendu</option>
              </select>
            </div>
          </div>

          {/* Submit */}
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
              {utilisateurAEditer ? "Mettre à jour" : "Ajouter au Système"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
