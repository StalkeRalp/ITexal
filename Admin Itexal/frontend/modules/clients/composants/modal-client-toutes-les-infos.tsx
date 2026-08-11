"use client";

import React, { useState } from "react";
import { ClientComplet } from "./fiche-detail-client";
import { formatPrix } from "@/lib/formatteur";
import { useCommandes } from "@/lib/context/CommandesContext";
import {
  Cancel01Icon,
  ShoppingCart01Icon,
  SparklesIcon,
  Location01Icon,
  LicenseIcon,
  ShoppingBag01Icon,
  Mail01Icon,
  CallIcon,
  File01Icon,
  Tick01Icon,
  Edit02Icon,
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
  const { commandes } = useCommandes();
  const [ongletActif, setOngletActif] = useState<
    "commandes" | "cosmetique" | "adresses" | "journal"
  >("commandes");

  if (!ouvert || !client) return null;

  // Filtrage des vraies commandes du client depuis le context
  const commandesReellesClient = commandes.filter(
    (cmd) => cmd.clientId === client.id || cmd.clientEmail.toLowerCase() === client.email.toLowerCase()
  );

  const depenseTotale = commandesReellesClient.length > 0
    ? commandesReellesClient.reduce((sum, c) => sum + c.montantTotal, 0)
    : (client.totalDepense || 0);

  const nbCommandes = commandesReellesClient.length || client.totalCommandes || 0;

  const journalClient = [
    { date: client.dateInscrit || "01/01/2026", action: "Création du compte client sur la boutique ITexal." },
    ...commandesReellesClient.map((cmd) => ({
      date: cmd.dateCommande,
      action: `Commande ${cmd.reference} effectuée pour un montant de ${formatPrix(cmd.montantTotal)} FCFA (${cmd.statut.toUpperCase()}).`,
    })),
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200/90 max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-slate-50 to-blue-50/50 text-slate-800 flex items-center justify-between border-b border-slate-200/80">
          <div className="flex items-center gap-4">
            <div className="w-14 h-14 rounded-full bg-[#5B63F6] text-white font-extrabold flex items-center justify-center text-xl shadow-md border-2 border-indigo-200 overflow-hidden shrink-0">
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
                <span className="px-3 py-1 rounded-xl bg-indigo-100/70 text-[#5B63F6] border border-indigo-200 text-[11px] font-extrabold">
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
        <div className="grid grid-cols-2 sm:grid-cols-4 bg-indigo-50/40 p-4 border-b border-indigo-100/60 gap-4 text-center">
          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Total Commandes
            </span>
            <p className="text-lg font-black text-[#5B63F6]">{nbCommandes} passée(s)</p>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Dépense Cumulée
            </span>
            <p className="text-lg font-black text-[#5B63F6]">
              {formatPrix(depenseTotale)} FCFA
            </p>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Gamme Préférée
            </span>
            <p className="text-xs font-bold text-slate-800 mt-1">
              {client.typeGamme}
            </p>
          </div>

          <div>
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">
              Statut Compte
            </span>
            <p className="text-xs font-bold text-emerald-600 mt-1 flex items-center justify-center gap-1">
              <Tick01Icon size={14} className="text-emerald-500" />
              <span>{client.statut === "Completed" ? "Compte Actif" : "Inactif"}</span>
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
                ? "border-[#5B63F6] text-[#5B63F6] font-extrabold"
                : "border-transparent hover:text-slate-900"
            }`}
          >
            <ShoppingCart01Icon size={16} />
            <span>Historique des Commandes ({commandesReellesClient.length})</span>
          </button>

          <button
            type="button"
            onClick={() => setOngletActif("cosmetique")}
            className={`py-3.5 px-4 border-b-2 transition-all whitespace-nowrap flex items-center gap-2 ${
              ongletActif === "cosmetique"
                ? "border-[#5B63F6] text-[#5B63F6] font-extrabold"
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
                ? "border-[#5B63F6] text-[#5B63F6] font-extrabold"
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
                ? "border-[#5B63F6] text-[#5B63F6] font-extrabold"
                : "border-transparent hover:text-slate-900"
            }`}
          >
            <LicenseIcon size={16} />
            <span>Journal d'Activité Client</span>
          </button>
        </div>

        {/* Tab Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-slate-700">
          {/* TAB 1: Commandes Réelles */}
          {ongletActif === "commandes" && (
            <div className="space-y-4">
              <h3 className="text-sm font-extrabold text-slate-800">
                Toutes les commandes de {client.nom} ({commandesReellesClient.length})
              </h3>

              {commandesReellesClient.length > 0 ? (
                <div className="border border-slate-100 rounded-2xl overflow-hidden shadow-xs">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-50 border-b border-slate-100 text-slate-400 font-bold uppercase text-[10px]">
                      <tr>
                        <th className="py-3 px-4">RÉFÉRANCE</th>
                        <th className="py-3 px-4">DATE</th>
                        <th className="py-3 px-4">ARTICLES ACHETÉS</th>
                        <th className="py-3 px-4">PAIEMENT</th>
                        <th className="py-3 px-4">TOTAL</th>
                        <th className="py-3 px-4 text-center">STATUT</th>
                      </tr>
                    </thead>

                    <tbody className="divide-y divide-slate-100 font-medium">
                      {commandesReellesClient.map((cmd) => (
                        <tr key={cmd.id} className="hover:bg-slate-50/50">
                          <td className="py-3 px-4 font-bold text-[#5B63F6]">
                            {cmd.reference}
                          </td>
                          <td className="py-3 px-4 text-slate-500 font-mono">
                            {cmd.dateCommande}
                          </td>
                          <td className="py-3 px-4 text-slate-800 max-w-xs">
                            {cmd.articles.map((art) => `${art.nomProduit} (x${art.quantite})`).join(", ")}
                          </td>
                          <td className="py-3 px-4 text-slate-600 capitalize">
                            {cmd.methodePaiement.replace(/_/g, " ")}
                          </td>
                          <td className="py-3 px-4 font-black text-slate-900 whitespace-nowrap">
                            {formatPrix(cmd.montantTotal)} FCFA
                          </td>
                          <td className="py-3 px-4 text-center">
                            <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-700 font-bold text-[11px] capitalize">
                              {cmd.statut.replace(/_/g, " ")}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-100 text-slate-400 font-medium">
                  Aucune commande enregistrée directement en base pour ce client.
                </div>
              )}
            </div>
          )}

          {/* TAB 2: Diagnostic Cosmétique */}
          {ongletActif === "cosmetique" && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-slate-50/80 p-5 rounded-2xl border border-slate-100 space-y-3">
                <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                  <SparklesIcon size={18} className="text-[#5B63F6]" />
                  <span>Profil Dermatologique & Peau</span>
                </h4>
                <div className="space-y-2 text-xs">
                  <div className="flex justify-between py-1.5 border-b border-slate-200/80">
                    <span className="text-slate-500 font-semibold">Type de peau :</span>
                    <span className="font-bold text-slate-800">Sèche & Sensible</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-200/80">
                    <span className="text-slate-500 font-semibold">Préoccupation majeure :</span>
                    <span className="font-bold text-slate-800">Éclat & Hydratation intense</span>
                  </div>
                  <div className="flex justify-between py-1.5 border-b border-slate-200/80">
                    <span className="text-slate-500 font-semibold">Gamme recommandée :</span>
                    <span className="font-bold text-indigo-600">{client.typeGamme}</span>
                  </div>
                  <div className="flex justify-between py-1.5">
                    <span className="text-slate-500 font-semibold">Remarques allergènes :</span>
                    <span className="font-bold text-amber-600">Éviter parfums synthétiques</span>
                  </div>
                </div>
              </div>

              <div className="bg-indigo-50/40 p-5 rounded-2xl border border-indigo-100 space-y-3">
                <h4 className="font-extrabold text-[#5B63F6] text-sm flex items-center gap-2">
                  <ShoppingBag01Icon size={18} />
                  <span>Recommandations Soins ITexal</span>
                </h4>
                <div className="space-y-2">
                  <div className="p-3 bg-white rounded-xl border border-slate-100 flex items-center justify-between">
                    <span className="font-bold text-slate-800">Sérum Visage Éclat Bio</span>
                    <span className="text-xs font-black text-[#5B63F6]">15 000 FCFA</span>
                  </div>
                  <div className="p-3 bg-white rounded-xl border border-slate-100 flex items-center justify-between">
                    <span className="font-bold text-slate-800">Crème Hydratante Karité</span>
                    <span className="text-xs font-black text-[#5B63F6]">18 500 FCFA</span>
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
                  <Location01Icon size={18} className="text-[#5B63F6]" />
                  <span>Adresse Principale de Livraison</span>
                </h4>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <p className="font-bold text-slate-900">{client.nom}</p>
                  <p>{client.adresse}</p>
                  <p>Douala, Cameroun</p>
                  <p className="font-mono text-slate-500 pt-1 flex items-center gap-1.5">
                    <CallIcon size={14} className="text-[#5B63F6]" />
                    <span>{client.telephone}</span>
                  </p>
                </div>
              </div>

              <div className="p-5 bg-white rounded-2xl border border-slate-200 space-y-3">
                <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                  <Mail01Icon size={18} className="text-[#5B63F6]" />
                  <span>Coordonnées de Contact</span>
                </h4>
                <div className="space-y-1.5 text-xs text-slate-600">
                  <p><span className="font-semibold text-slate-400">Email :</span> {client.email}</p>
                  <p><span className="font-semibold text-slate-400">Téléphone Mobile :</span> {client.telephone}</p>
                  <p><span className="font-semibold text-slate-400">Canaux Privilégiés :</span> Email & WhatsApp</p>
                </div>
              </div>
            </div>
          )}

          {/* TAB 4: Journal d'activité */}
          {ongletActif === "journal" && (
            <div className="space-y-3">
              <h4 className="font-extrabold text-slate-800 text-sm">
                Historique chronologique des actions
              </h4>

              <div className="relative border-l-2 border-indigo-200 pl-4 space-y-4 ml-2">
                {journalClient.map((j, i) => (
                  <div key={i} className="relative">
                    <span className="absolute -left-[21px] top-0.5 w-3 h-3 rounded-full bg-[#5B63F6] border-2 border-white"></span>
                    <span className="text-[10px] font-bold text-slate-400 font-mono">{j.date}</span>
                    <p className="text-xs font-semibold text-slate-700 mt-0.5">{j.action}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 bg-slate-50 border-t border-slate-100 flex items-center justify-between">
          <button
            type="button"
            onClick={onFermer}
            className="px-6 py-2.5 bg-white border border-slate-200 rounded-xl text-slate-700 font-bold hover:bg-slate-100 transition-colors shadow-xs"
          >
            Fermer
          </button>

          <div className="flex items-center gap-3">
            {onEditer && (
              <button
                type="button"
                onClick={() => onEditer(client)}
                className="px-5 py-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold rounded-xl text-xs transition-colors flex items-center gap-1.5"
              >
                <Edit02Icon size={14} />
                <span>Éditer Profil</span>
              </button>
            )}
            <button
              type="button"
              onClick={() => window.print()}
              className="px-5 py-2.5 bg-[#5B63F6] hover:bg-indigo-600 text-white font-extrabold rounded-xl shadow-md shadow-indigo-500/20 transition-all text-xs flex items-center gap-1.5"
            >
              <File01Icon size={14} />
              <span>Imprimer Fiche Complète</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
