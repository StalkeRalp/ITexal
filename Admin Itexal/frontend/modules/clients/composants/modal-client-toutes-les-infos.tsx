"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ClientComplet } from "./fiche-detail-client";
import { formatPrix } from "@/lib/formatteur";
import {
  Cancel01Icon,
  ShoppingCart01Icon,
  SparklesIcon,
  Location01Icon,
  LicenseIcon,
  ShoppingBag01Icon,
  Mail01Icon,
  CallIcon,
  Edit02Icon,
  File01Icon,
  Tick01Icon,
} from "hugeicons-react";

interface ModalClientToutesLesInfosProps {
  ouvert: boolean;
  client: ClientComplet | null;
  onFermer: () => void;
  onEditer?: (client: ClientComplet) => void;
}

export const ModalClientToutesLesInfos: React.FC<
  ModalClientToutesLesInfosProps
> = ({ ouvert, client, onFermer, onEditer }) => {
  const [ongletActif, setOngletActif] = useState<
    "commandes" | "cosmetique" | "adresses" | "journal"
  >("commandes");

  if (!ouvert || !client) return null;

  const depense = client.totalDepense || 455000;
  const nbCommandes = client.totalCommandes || 14;

  // Mock list of orders for this customer
  const commandesClient = [
    {
      id: "CMD-00009",
      date: "08/08/2026",
      produits: "Sérum Visage Éclat Bio (x2), Lotion Tonique",
      montant: 45500,
      statut: "Completed",
      modePaiement: "Orange Money",
    },
    {
      id: "CMD-00007",
      date: "25/07/2026",
      produits: "Crème Hydratante Karité (x1)",
      montant: 18500,
      statut: "Completed",
      modePaiement: "MTN Mobile Money",
    },
    {
      id: "CMD-00003",
      date: "12/06/2026",
      produits: "Elixir Capillaire Pousse Rapide (x3)",
      montant: 49500,
      statut: "Completed",
      modePaiement: "Carte Bancaire",
    },
    {
      id: "CMD-00001",
      date: "04/05/2026",
      produits: "Pack Soin Visage Éclat complet",
      montant: 85000,
      statut: "Completed",
      modePaiement: "Paiement à la livraison",
    },
  ];

  const journalClient = [
    { date: "04 Sep 2026", action: "Création du compte client sur la boutique ITexal." },
    { date: "12 Mai 2026", action: "Première commande #CMD-00001 d'un montant de 85 000 FCFA." },
    { date: "20 Juin 2026", action: "Ajout du Sérum Visage Éclat dans la liste des favoris." },
    { date: "08 Août 2026", action: "Dernière commande passée #CMD-00009 (45 500 FCFA)." },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200/90 max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Header - Harmonized light header with DashStack theme */}
        <div className="p-6 bg-gradient-to-r from-slate-50 to-blue-50/50 text-slate-800 flex items-center justify-between border-b border-slate-200/80">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#4880FF] text-white font-extrabold flex items-center justify-center text-xl shadow-md border-2 border-blue-200 overflow-hidden shrink-0">
              {client.avatar ? (
                <img
                  src={client.avatar}
                  alt={client.nom}
                  className="w-full h-full object-cover"
                />
              ) : (
                client.nom.slice(0, 2).toUpperCase()
              )}
            </div>

            <div>
              <div className="flex items-center gap-3 flex-wrap">
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  {client.nom}
                </h2>
                <span className="px-3 py-1 rounded-xl bg-blue-100/70 text-[#4880FF] border border-blue-200 text-[11px] font-extrabold">
                  ID #{client.id}
                </span>
                <span
                  className={`px-3 py-1 rounded-xl text-[11px] font-extrabold ${
                    client.genre === "Female"
                      ? "bg-rose-100 text-rose-700 border border-rose-200"
                      : "bg-blue-100 text-blue-700 border border-blue-200"
                  }`}
                >
                  {client.genre || "Male"}
                </span>
              </div>

              <p className="text-xs text-slate-500 font-medium mt-1">
                Membre depuis le <span className="text-slate-800 font-bold">{client.dateInscrit}</span> • {client.metier || "Client Privilégié VIP"}
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onFermer}
            aria-label="Fermer la fenêtre"
            className="w-9 h-9 rounded-full bg-white hover:bg-rose-50 text-slate-500 hover:text-rose-600 font-extrabold flex items-center justify-center text-sm transition-colors border border-slate-200 shadow-xs"
            title="Fermer la fenêtre"
          >
            <Cancel01Icon size={16} strokeWidth={2} />
          </button>
        </div>

        {/* Quick KPI Bar */}
        <div className="grid grid-cols-2 sm:grid-cols-4 bg-blue-50/40 p-4 border-b border-blue-100/60 gap-4 text-center">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Total Commandes
            </span>
            <p className="text-lg font-black text-[#4880FF]">{nbCommandes} passées</p>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Dépense Cumulée
            </span>
            <p className="text-lg font-black text-[#4880FF]">
              {formatPrix(depense)} FCFA
            </p>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Gamme Préférée
            </span>
            <p className="text-sm font-bold text-slate-800 mt-1">
              {client.typeGamme}
            </p>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Statut Compte
            </span>
            <p className="text-sm font-bold text-emerald-600 mt-1 flex items-center justify-center gap-1">
              <Tick01Icon size={14} className="text-emerald-500" />
              <span>Compte Actif</span>
            </p>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="flex border-b border-slate-100 px-6 bg-slate-50/50 text-xs font-bold text-slate-600 overflow-x-auto">
          <button
            type="button"
            onClick={() => setOngletActif("commandes")}
            className={`py-3.5 px-4 border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
              ongletActif === "commandes"
                ? "border-[#4880FF] text-[#4880FF] font-extrabold"
                : "border-transparent hover:text-slate-900"
            }`}
          >
            <ShoppingCart01Icon size={16} />
            <span>Historique des Commandes ({commandesClient.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setOngletActif("cosmetique")}
            className={`py-3.5 px-4 border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
              ongletActif === "cosmetique"
                ? "border-[#4880FF] text-[#4880FF] font-extrabold"
                : "border-transparent hover:text-slate-900"
            }`}
          >
            <SparklesIcon size={16} />
            <span>Diagnostic Cosmétique & Préférences</span>
          </button>

          <button
            type="button"
            onClick={() => setOngletActif("adresses")}
            className={`py-3.5 px-4 border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
              ongletActif === "adresses"
                ? "border-[#4880FF] text-[#4880FF] font-extrabold"
                : "border-transparent hover:text-slate-900"
            }`}
          >
            <Location01Icon size={16} />
            <span>Adresses & Coordonnées</span>
          </button>

          <button
            type="button"
            onClick={() => setOngletActif("journal")}
            className={`py-3.5 px-4 border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
              ongletActif === "journal"
                ? "border-[#4880FF] text-[#4880FF] font-extrabold"
                : "border-transparent hover:text-slate-900"
            }`}
          >
            <LicenseIcon size={16} />
            <span>Journal d'Activité Client</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-slate-700">
          {/* TAB 1: Commandes */}
          {ongletActif === "commandes" && (
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold text-slate-800">
                Commandes passées par {client.nom}
              </h3>

              <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-xs">
                <table className="w-full text-left border-collapse">
                  <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                    <tr>
                      <th className="py-3 px-4">N° COMMANDE</th>
                      <th className="py-3 px-4">DATE</th>
                      <th className="py-3 px-4">PRODUITS</th>
                      <th className="py-3 px-4">MODE PAIEMENT</th>
                      <th className="py-3 px-4">TOTAL FCFA</th>
                      <th className="py-3 px-4 text-center">STATUT</th>
                    </tr>
                  </thead>

                  <tbody className="divide-y divide-slate-100 font-medium">
                    {commandesClient.map((cmd) => (
                      <tr key={cmd.id} className="hover:bg-slate-50/50">
                        <td className="py-3 px-4 font-bold text-[#4880FF]">
                          {cmd.id}
                        </td>
                        <td className="py-3 px-4 text-slate-500 font-mono">
                          {cmd.date}
                        </td>
                        <td className="py-3 px-4 text-slate-800">
                          {cmd.produits}
                        </td>
                        <td className="py-3 px-4 text-slate-600">
                          {cmd.modePaiement}
                        </td>
                        <td className="py-3 px-4 font-black text-slate-900">
                          {formatPrix(cmd.montant)} FCFA
                        </td>
                        <td className="py-3 px-4 text-center">
                          <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-[11px]">
                            {cmd.statut}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* TAB 2: Cosmétique */}
          {ongletActif === "cosmetique" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-100 space-y-3">
                <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                  <SparklesIcon size={18} className="text-[#4880FF]" />
                  <span>Profil Dermatologique</span>
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500 font-semibold">Type de peau :</span>
                    <span className="font-bold text-slate-800">Sèche & Sensible</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500 font-semibold">Préoccupation majeure :</span>
                    <span className="font-bold text-slate-800">Éclat & Hydratation</span>
                  </div>
                  <div className="flex justify-between py-1 border-b border-slate-200">
                    <span className="text-slate-500 font-semibold">Teint de peau :</span>
                    <span className="font-bold text-slate-800">Métissé / Brun</span>
                  </div>
                  <div className="flex justify-between py-1">
                    <span className="text-slate-500 font-semibold">Précautions d'emploi :</span>
                    <span className="font-bold text-amber-600">Éviter les parfums synthétiques</span>
                  </div>
                </div>
              </div>

              <div className="bg-blue-50/40 p-5 rounded-2xl border border-blue-100 space-y-3">
                <h4 className="font-extrabold text-[#4880FF] text-sm flex items-center gap-2">
                  <ShoppingBag01Icon size={18} />
                  <span>Produits Favoris ITexal</span>
                </h4>
                <div className="space-y-2">
                  <div className="p-2.5 bg-white rounded-xl border border-slate-100 flex items-center justify-between">
                    <span className="font-bold text-slate-800">Sérum Visage Éclat Bio</span>
                    <span className="text-xs font-black text-[#4880FF]">15 000 FCFA</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-100 flex items-center justify-between">
                    <span className="font-bold text-slate-800">Crème Hydratante Karité</span>
                    <span className="text-xs font-black text-[#4880FF]">18 500 FCFA</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: Adresses */}
          {ongletActif === "adresses" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                  <Location01Icon size={18} className="text-[#4880FF]" />
                  <span>Adresse de Livraison Principale</span>
                </h4>
                <div className="space-y-1 text-xs text-slate-600">
                  <p className="font-bold text-slate-900">{client.nom}</p>
                  <p>{client.adresse}</p>
                  <p>Douala, Cameroun</p>
                  <p className="font-mono text-slate-500 pt-1 flex items-center gap-1.5">
                    <CallIcon size={14} className="text-[#4880FF]" />
                    <span>{client.telephone}</span>
                  </p>
                </div>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                  <Mail01Icon size={18} className="text-[#4880FF]" />
                  <span>Coordonnées Numériques</span>
                </h4>
                <div className="space-y-1 text-xs text-slate-600">
                  <p><span className="font-semibold text-slate-400">Email :</span> {client.email}</p>
                  <p><span className="font-semibold text-slate-400">Téléphone Mobile :</span> {client.telephone}</p>
                  <p><span className="font-semibold text-slate-400">Canal Préféré :</span> WhatsApp & Email</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Journal */}
          {ongletActif === "journal" && (
            <div className="space-y-3">
              <h4 className="font-extrabold text-slate-800 text-sm">
                Historique des événements du compte
              </h4>

              <div className="relative border-l-2 border-blue-200 pl-4 space-y-4 ml-2">
                {journalClient.map((j, i) => (
                  <div key={i} className="relative">
                    <span className="absolute -left-[21px] top-0.5 w-3 h-3 rounded-full bg-[#4880FF] border-2 border-white"></span>
                    <span className="text-[10px] font-bold text-slate-400 font-mono">{j.date}</span>
                    <p className="text-xs font-semibold text-slate-700 mt-0.5">{j.action}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onFermer}
            className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold hover:bg-slate-100 transition-colors shadow-xs"
          >
            Fermer
          </button>

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => window.print()}
              className="px-5 py-2.5 bg-[#4880FF] hover:bg-blue-600 text-white font-extrabold rounded-xl shadow-md shadow-blue-500/20 transition-all text-xs flex items-center gap-1.5"
            >
              <File01Icon size={14} />
              <span>Imprimer la Fiche Client</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
