"use client";

import React, { useState } from "react";
import { useLanguage } from "@/lib/context/LanguageContext";
import {
  UtilisateurInterne,
  RoleUtilisateur,
} from "@/modules/utilisateurs/types/utilisateur";
import { ModalUtilisateurFormulaire } from "@/modules/utilisateurs/composants/modal-utilisateur-formulaire";
import {
  Add01Icon,
  Search01Icon,
  Edit02Icon,
  Delete02Icon,
  Key01Icon,
  PackageIcon,
  ShoppingBag01Icon,
  Edit01Icon,
  SparklesIcon,
} from "hugeicons-react";

export default function PageUtilisateursAdmin() {
  const { t } = useLanguage();
  const [recherche, setRecherche] = useState("");
  const [filtreRole, setFiltreRole] = useState<string>("Tous");

  const [utilisateurs, setUtilisateurs] = useState<UtilisateurInterne[]>([
    {
      id: "u-1",
      nomComplet: "Alexandre ITexal",
      email: "alexandre.admin@itexal.com",
      telephone: "+237 699 10 20 30",
      role: "Super Admin",
      statut: "Actif",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandre",
      dernierAcces: "Aujourd'hui à 11:42",
      creeLe: "01/01/2026",
    },
    {
      id: "u-2",
      nomComplet: "Vanessa Manga",
      email: "v.manga@itexal.com",
      telephone: "+237 677 44 55 66",
      role: "Gestionnaire de Stock",
      statut: "Actif",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vanessa",
      dernierAcces: "Hier à 16:10",
      creeLe: "15/02/2026",
    },
    {
      id: "u-3",
      nomComplet: "Samuel Ndombe",
      email: "s.ndombe@itexal.com",
      telephone: "+237 695 88 99 00",
      role: "Responsable Commandes",
      statut: "Actif",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Samuel",
      dernierAcces: "Il y a 3 heures",
      creeLe: "01/03/2026",
    },
    {
      id: "u-4",
      nomComplet: "Clarisse Atangana",
      email: "c.atangana@itexal.com",
      telephone: "+237 690 12 34 56",
      role: "Rédacteur Contenu",
      statut: "Inactif",
      avatar: "https://api.dicebear.com/7.x/avataaars/svg?seed=Clarisse",
      dernierAcces: "Il y a 2 semaines",
      creeLe: "10/04/2026",
    },
  ]);

  // Modal State
  const [modalOuvert, setModalOuvert] = useState(false);
  const [utilisateurAEditer, setUtilisateurAEditer] = useState<UtilisateurInterne | null>(null);

  // Filter Logic
  const utilisateursFiltres = utilisateurs.filter((u) => {
    const matchNom =
      u.nomComplet.toLowerCase().includes(recherche.toLowerCase()) ||
      u.email.toLowerCase().includes(recherche.toLowerCase());

    const matchRole = filtreRole === "Tous" ? true : u.role === filtreRole;
    return matchNom && matchRole;
  });

  const ouvrirCreation = () => {
    setUtilisateurAEditer(null);
    setModalOuvert(true);
  };

  const ouvrirEdition = (user: UtilisateurInterne) => {
    setUtilisateurAEditer(user);
    setModalOuvert(true);
  };

  const reinitialiserMotDePasse = (email: string) => {
    alert(`${t("utilisateurs.resetPasswordSent")} (${email})`);
  };

  const supprimerUtilisateur = (id: string) => {
    if (confirm(t("utilisateurs.confirmRevoke"))) {
      setUtilisateurs((prev) => prev.filter((u) => u.id !== id));
    }
  };

  const enregistrerUtilisateur = (user: UtilisateurInterne) => {
    setUtilisateurs((prev) => {
      const existe = prev.some((u) => u.id === user.id);
      if (existe) {
        return prev.map((u) => (u.id === user.id ? user : u));
      } else {
        return [user, ...prev];
      }
    });
  };

  const renduBadgeRole = (role: RoleUtilisateur) => {
    switch (role) {
      case "Super Admin":
        return (
          <span className="px-3 py-1 bg-purple-100 text-purple-700 text-xs font-extrabold rounded-lg inline-flex items-center gap-1.5">
            <SparklesIcon size={14} /> Super Admin
          </span>
        );
      case "Gestionnaire de Stock":
        return (
          <span className="px-3 py-1 bg-blue-100 text-blue-700 text-xs font-bold rounded-lg inline-flex items-center gap-1.5">
            <PackageIcon size={14} /> Stock & Inventaire
          </span>
        );
      case "Responsable Commandes":
        return (
          <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-lg inline-flex items-center gap-1.5">
            <ShoppingBag01Icon size={14} /> Commandes & Clients
          </span>
        );
      case "Rédacteur Contenu":
        return (
          <span className="px-3 py-1 bg-amber-100 text-amber-800 text-xs font-bold rounded-lg inline-flex items-center gap-1.5">
            <Edit01Icon size={14} /> Contenus & Promos
          </span>
        );
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            {t("utilisateurs.title")}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {t("utilisateurs.subtitle")}
          </p>
        </div>

        <button
          type="button"
          onClick={ouvrirCreation}
          className="px-5 py-2.5 bg-[#4880FF] hover:bg-blue-600 text-white font-bold text-xs rounded-xl shadow-md shadow-blue-500/20 transition-all flex items-center gap-2 cursor-pointer"
        >
          <Add01Icon size={16} strokeWidth={2.5} />
          <span>{t("utilisateurs.addUser")}</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-xs font-semibold text-slate-600">
        <div className="relative flex-1 max-w-md">
          <input
            type="text"
            value={recherche}
            onChange={(e) => setRecherche(e.target.value)}
            placeholder={t("common.search")}
            className="w-full pl-9 pr-4 py-2 bg-[#F8F9FD] border border-slate-200 rounded-xl focus:outline-none focus:border-[#4880FF] text-slate-800"
          />
          <Search01Icon size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>

        <div className="flex items-center gap-1 bg-[#F8F9FD] p-1 rounded-xl border border-slate-200/80 overflow-x-auto">
          {(["Tous", "Super Admin", "Gestionnaire de Stock", "Responsable Commandes", "Rédacteur Contenu"] as const).map((tab) => (
            <button
              key={tab}
              type="button"
              onClick={() => setFiltreRole(tab)}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all whitespace-nowrap cursor-pointer ${
                filtreRole === tab
                  ? "bg-white text-[#4880FF] shadow-xs"
                  : "text-slate-500 hover:text-slate-800"
              }`}
            >
              {tab === "Tous" ? t("common.all") : tab}
            </button>
          ))}
        </div>
      </div>

      {/* Table Users */}
      <div className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-100 text-slate-400 text-[10px] font-extrabold uppercase tracking-wider">
                <th className="py-4 px-4">{t("utilisateurs.member")}</th>
                <th className="py-4 px-4">{t("utilisateurs.emailPhone")}</th>
                <th className="py-4 px-4">{t("utilisateurs.rbacRole")}</th>
                <th className="py-4 px-4">{t("utilisateurs.lastAccess")}</th>
                <th className="py-4 px-4 text-center">{t("common.status")}</th>
                <th className="py-4 px-4 text-center">{t("common.actions")}</th>
              </tr>
            </thead>

            <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
              {utilisateursFiltres.map((user) => (
                <tr key={user.id} className="hover:bg-slate-50/80 transition-colors">
                  {/* Membre */}
                  <td className="py-4 px-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 overflow-hidden shrink-0">
                      <img
                        src={user.avatar}
                        alt={user.nomComplet}
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="font-bold text-slate-800 text-sm">
                        {user.nomComplet}
                      </p>
                      <p className="text-[10px] text-slate-400">
                        {t("clients.registrationDate")} {user.creeLe}
                      </p>
                    </div>
                  </td>

                  {/* Email & Tel */}
                  <td className="py-4 px-4">
                    <p className="font-medium text-slate-700">{user.email}</p>
                    <p className="text-slate-400 text-[11px]">{user.telephone}</p>
                  </td>

                  {/* Rôle Badge */}
                  <td className="py-4 px-4 whitespace-nowrap">
                    {renduBadgeRole(user.role)}
                  </td>

                  {/* Dernier accès */}
                  <td className="py-4 px-4 text-slate-500 whitespace-nowrap">
                    {user.dernierAcces}
                  </td>

                  {/* Statut Badge */}
                  <td className="py-4 px-4 text-center whitespace-nowrap">
                    <span
                      className={`px-3 py-1 rounded-xl text-xs font-bold ${
                        user.statut === "Actif"
                          ? "bg-emerald-100 text-emerald-700"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {user.statut === "Actif" ? t("common.active") : t("common.inactive")}
                    </span>
                  </td>

                  {/* Actions */}
                  <td className="py-4 px-4 text-center whitespace-nowrap">
                    <div className="inline-flex items-center gap-1.5">
                      <button
                        type="button"
                        onClick={() => reinitialiserMotDePasse(user.email)}
                        className="px-2.5 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors flex items-center gap-1 cursor-pointer"
                        title={t("utilisateurs.resetPassword")}
                      >
                        <Key01Icon size={14} />
                        <span>{t("utilisateurs.resetPassword")}</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => ouvrirEdition(user)}
                        aria-label={t("common.edit")}
                        className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold flex items-center justify-center text-xs transition-colors cursor-pointer"
                        title={t("common.edit")}
                      >
                        <Edit02Icon size={14} />
                      </button>

                      <button
                        type="button"
                        onClick={() => supprimerUtilisateur(user.id)}
                        aria-label={t("utilisateurs.revokeAccess")}
                        className="w-8 h-8 rounded-xl bg-rose-50 hover:bg-rose-500 text-rose-500 hover:text-white font-bold flex items-center justify-center text-xs transition-colors cursor-pointer"
                        title={t("utilisateurs.revokeAccess")}
                      >
                        <Delete02Icon size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Formulaire */}
      <ModalUtilisateurFormulaire
        ouvert={modalOuvert}
        utilisateurAEditer={utilisateurAEditer}
        onFermer={() => setModalOuvert(false)}
        onEnregistrer={enregistrerUtilisateur}
      />
    </div>
  );
}
