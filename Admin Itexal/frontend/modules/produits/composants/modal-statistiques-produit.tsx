"use client";

import React, { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { Produit } from "@/types/produit";
import { Commande } from "@/types/commande";
import { formatPrix, formatNombre } from "@/lib/formatteur";
import { exporterStatistiquesProduitPDF } from "@/lib/utilitaires/exportateur";
import {
  Cancel01Icon,
  ShoppingBag01Icon,
  Coins01Icon,
  PackageIcon,
  Chart01Icon,
  StarIcon,
  Download01Icon,
  Calendar01Icon,
  Tick01Icon,
  SparklesIcon,
} from "hugeicons-react";

interface ModalStatistiquesProduitProps {
  ouvert: boolean;
  produit: Produit | null;
  onFermer: () => void;
  commandes: Commande[];
}

export const ModalStatistiquesProduit: React.FC<ModalStatistiquesProduitProps> = ({
  ouvert,
  produit,
  onFermer,
  commandes,
}) => {
  const [monte, setMonte] = useState(false);

  useEffect(() => {
    setMonte(true);
  }, []);

  // Extraction des statistiques réelles — doit être avant tout return conditionnel (Rules of Hooks)
  const statsProduit = useMemo(() => {
    if (!produit) return {
      quantiteTotaleVendue: 0,
      caTotalGenere: 0,
      totalOrdersCount: 0,
      stockTotalInitial: 0,
      tauxEcoulement: 0,
      panierMoyen: 0,
      commandesAssociees: [] as Array<{
        reference: string;
        dateCommande: string;
        nomClient: string;
        quantite: number;
        sousTotal: number;
        statut: string;
      }>,
    };

    let quantiteTotaleVendue = 0;
    let caTotalGenere = 0;
    const commandesAssociees: Array<{
      reference: string;
      dateCommande: string;
      nomClient: string;
      quantite: number;
      sousTotal: number;
      statut: string;
    }> = [];

    commandes.forEach((cmd) => {
      if (cmd.statut === "annulee") return;
      cmd.articles.forEach((art) => {
        if (art.produitId === produit.id || art.nomProduit.toLowerCase() === produit.nom.toLowerCase()) {
          quantiteTotaleVendue += art.quantite;
          caTotalGenere += art.sousTotal;

          commandesAssociees.push({
            reference: cmd.reference,
            dateCommande: cmd.dateCommande,
            nomClient: cmd.clientNom,
            quantite: art.quantite,
            sousTotal: art.sousTotal,
            statut: cmd.statut,
          });
        }
      });
    });

    const totalOrdersCount = commandesAssociees.length;
    const stockTotalInitial = produit.stock + quantiteTotaleVendue;
    const tauxEcoulement = stockTotalInitial > 0 ? Math.round((quantiteTotaleVendue / stockTotalInitial) * 100) : 0;
    const panierMoyen = totalOrdersCount > 0 ? Math.round(caTotalGenere / totalOrdersCount) : 0;

    return {
      quantiteTotaleVendue,
      caTotalGenere,
      totalOrdersCount,
      stockTotalInitial,
      tauxEcoulement,
      panierMoyen,
      commandesAssociees,
    };
  }, [produit, commandes]);

  if (!ouvert || !produit || !monte) return null;

  const exporterPDF = () => {
    exporterStatistiquesProduitPDF({
      produitNom: produit.nom,
      reference: produit.reference || `REF-#${produit.id}`,
      nomCategorie: produit.nomCategorie,
      marque: produit.nomMarque,
      prixUnitaire: produit.prix,
      stockRestant: produit.stock,
      image: produit.images?.[0] || produit.image,
      quantiteVendue: statsProduit.quantiteTotaleVendue,
      chiffreAffairesGenere: statsProduit.caTotalGenere,
      nombreCommandes: statsProduit.totalOrdersCount,
      tauxEcoulement: statsProduit.tauxEcoulement,
      commandesHistorique: statsProduit.commandesAssociees,
    });
  };

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
      <div className="bg-white w-full max-w-4xl rounded-3xl shadow-2xl border border-slate-200/90 max-h-[92vh] flex flex-col overflow-hidden">
        {/* Modal Header */}
        <div className="p-6 bg-gradient-to-r from-slate-50 via-indigo-50/30 to-blue-50/50 border-b border-slate-200/80 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-2xl bg-white border border-slate-200 p-1.5 shadow-sm shrink-0 overflow-hidden">
              <img
                src={produit.images?.[0] || produit.image}
                alt={produit.nom}
                className="w-full h-full object-cover rounded-xl"
              />
            </div>

            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                  {produit.nom}
                </h2>
                <span className="px-2.5 py-0.5 rounded-xl bg-indigo-100/70 text-[#5B63F6] border border-indigo-200 text-[11px] font-extrabold">
                  {produit.reference || `REF-#${produit.id}`}
                </span>
                <span className="px-2.5 py-0.5 rounded-xl bg-slate-100 text-slate-700 text-[11px] font-extrabold">
                  {produit.nomCategorie}
                </span>
              </div>

              <p className="text-xs text-slate-500 font-medium mt-1">
                Marque: <span className="text-slate-800 font-bold">{produit.nomMarque}</span> • Prix Unitaire:{" "}
                <span className="text-[#5B63F6] font-black">{formatPrix(produit.prix)} FCFA</span>
              </p>
            </div>
          </div>

          <button
            type="button"
            onClick={onFermer}
            aria-label="Fermer"
            className="w-9 h-9 rounded-full bg-white hover:bg-rose-50 text-slate-500 hover:text-rose-600 font-extrabold flex items-center justify-center text-sm transition-colors border border-slate-200 shadow-xs cursor-pointer"
          >
            <Cancel01Icon size={16} strokeWidth={2} />
          </button>
        </div>

        {/* Scrollable Content Body */}
        <div className="p-6 overflow-y-auto flex-1 space-y-6 text-xs text-slate-700">
          {/* KPI Cards Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="bg-[#F8F9FD] p-4 rounded-2xl border border-slate-100 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Chiffre d'Affaires
              </span>
              <p className="text-xl font-black text-[#5B63F6] mt-2">
                {formatPrix(statsProduit.caTotalGenere)} <span className="text-xs">FCFA</span>
              </p>
              <span className="text-[10px] font-bold text-emerald-600 mt-1 flex items-center gap-1">
                <Tick01Icon size={12} /> Total généré en boutique
              </span>
            </div>

            <div className="bg-[#F8F9FD] p-4 rounded-2xl border border-slate-100 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Quantité Vendue
              </span>
              <p className="text-xl font-black text-slate-800 mt-2">
                {formatNombre(statsProduit.quantiteTotaleVendue)} <span className="text-xs">unités</span>
              </p>
              <span className="text-[10px] font-bold text-indigo-600 mt-1">
                Dans {statsProduit.totalOrdersCount} commandes
              </span>
            </div>

            <div className="bg-[#F8F9FD] p-4 rounded-2xl border border-slate-100 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Taux d'Écoulement
              </span>
              <p className="text-xl font-black text-emerald-600 mt-2">
                {statsProduit.tauxEcoulement}%
              </p>
              <div className="w-full bg-slate-200 h-1.5 rounded-full overflow-hidden mt-1">
                <div
                  className="bg-emerald-500 h-full rounded-full transition-all duration-1000"
                  style={{ width: `${Math.min(statsProduit.tauxEcoulement, 100)}%` }}
                />
              </div>
            </div>

            <div className="bg-[#F8F9FD] p-4 rounded-2xl border border-slate-100 flex flex-col justify-between">
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                Stock Restant
              </span>
              <p className={`text-xl font-black mt-2 ${produit.stock <= 5 ? "text-rose-600" : "text-slate-800"}`}>
                {produit.stock} <span className="text-xs">en réserve</span>
              </p>
              <span className={`text-[10px] font-bold mt-1 ${produit.stock <= 5 ? "text-rose-500" : "text-slate-400"}`}>
                {produit.stock === 0 ? "Rupture de stock !" : produit.stock <= 5 ? "Alerte réappro !" : "Stock suffisant"}
              </span>
            </div>
          </div>

          {/* Performance & Skin Affinity Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Visual Stock & Sales Gauge */}
            <div className="bg-white p-5 rounded-2xl border border-slate-100 shadow-xs space-y-3">
              <h4 className="font-extrabold text-slate-800 text-sm flex items-center gap-2">
                <Chart01Icon size={18} className="text-[#5B63F6]" />
                <span>Rotation & Santé du Stock</span>
              </h4>

              <div className="space-y-2.5">
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-semibold">Stock Initial Estimé :</span>
                  <span className="font-bold text-slate-800">{statsProduit.stockTotalInitial} unités</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-semibold">Unités Vendues :</span>
                  <span className="font-bold text-emerald-600">{statsProduit.quantiteTotaleVendue} unités</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-semibold">Unités Restantes en Rayon :</span>
                  <span className="font-bold text-indigo-600">{produit.stock} unités</span>
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span className="text-slate-500 font-semibold">Panier Moyen par Vente :</span>
                  <span className="font-black text-slate-900">{formatPrix(statsProduit.panierMoyen)} FCFA</span>
                </div>
              </div>
            </div>

            {/* Dermatological & Feedback Card */}
            <div className="bg-indigo-50/40 p-5 rounded-2xl border border-indigo-100 space-y-3">
              <h4 className="font-extrabold text-[#5B63F6] text-sm flex items-center gap-2">
                <SparklesIcon size={18} />
                <span>Appréciation & Type de Peau</span>
              </h4>

              <div className="space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-semibold">Note Moyenne Clients :</span>
                  <div className="flex items-center gap-1 font-bold text-amber-500">
                    <StarIcon size={14} className="fill-amber-400 text-amber-400" />
                    <span>4.8 / 5 (38 avis)</span>
                  </div>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-slate-600 font-semibold">Cible Cosmétique :</span>
                  <span className="font-bold text-slate-800">{produit.typeDePeau || "Toutes peaux"}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Detailed Performance Metrics */}
          <div className="p-6 bg-slate-50 rounded-2xl border border-slate-200/80 space-y-4">
            <h3 className="font-extrabold text-sm text-slate-800 flex items-center gap-2">
              <SparklesIcon size={18} className="text-[#5B63F6]" />
              <span>Analyse de Performance Commerciale</span>
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs">
              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
                  <span className="font-semibold text-slate-600">Nombre de commandes incluant ce produit :</span>
                  <span className="font-black text-slate-900">{statsProduit.totalOrdersCount} commandes</span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
                  <span className="font-semibold text-slate-600">Prix unitaire de vente :</span>
                  <span className="font-black text-indigo-600">{formatPrix(produit.prix)} FCFA</span>
                </div>

                {produit.prixPromotionnel && (
                  <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
                    <span className="font-semibold text-slate-600">Prix promotionnel actif :</span>
                    <span className="font-black text-rose-600">{formatPrix(produit.prixPromotionnel)} FCFA</span>
                  </div>
                )}
              </div>

              <div className="space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
                  <span className="font-semibold text-slate-600">Niveau de disponibilité :</span>
                  <span
                    className={`font-extrabold px-2.5 py-0.5 rounded-full text-[10px] ${
                      produit.disponible !== false
                        ? "bg-emerald-100 text-emerald-800"
                        : "bg-rose-100 text-rose-800"
                    }`}
                  >
                    {produit.disponible !== false ? "En Vente" : "Masqué"}
                  </span>
                </div>

                <div className="flex justify-between items-center pb-2 border-b border-slate-200/60">
                  <span className="font-semibold text-slate-600">Appréciation globale (Avis clients) :</span>
                  <div className="flex items-center gap-1 text-amber-400 font-black">
                    <StarIcon size={14} className="fill-amber-400" />
                    <span className="text-slate-800">4.8 / 5</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Orders History Table */}
          <div className="space-y-3">
            <h3 className="font-extrabold text-sm text-slate-800">
              Historique Récent des Commandes ({statsProduit.commandesAssociees.length})
            </h3>

            {statsProduit.commandesAssociees.length > 0 ? (
              <div className="border border-slate-200 rounded-2xl overflow-hidden shadow-2xs">
                <table className="w-full text-left text-xs">
                  <thead className="bg-slate-50 text-slate-500 font-bold border-b border-slate-200">
                    <tr>
                      <th className="p-3">Réf Commande</th>
                      <th className="p-3">Client</th>
                      <th className="p-3">Date</th>
                      <th className="p-3 text-center">Quantité</th>
                      <th className="p-3 text-right">Montant</th>
                      <th className="p-3 text-center">Statut</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 bg-white">
                    {statsProduit.commandesAssociees.map((item, idx) => (
                      <tr key={idx} className="hover:bg-slate-50/80 transition-colors font-medium">
                        <td className="p-3 font-bold text-slate-900">{item.reference}</td>
                        <td className="p-3 text-slate-700">{item.nomClient}</td>
                        <td className="p-3 text-slate-500">{item.dateCommande}</td>
                        <td className="p-3 text-center font-black text-slate-900">{item.quantite}</td>
                        <td className="p-3 text-right font-black text-[#5B63F6]">
                          {formatPrix(item.sousTotal)} FCFA
                        </td>
                        <td className="p-3 text-center">
                          <span
                            className={`px-2 py-0.5 rounded-full text-[10px] font-extrabold ${
                              item.statut === "livree"
                                ? "bg-emerald-100 text-emerald-800"
                                : item.statut === "expediee"
                                ? "bg-blue-100 text-blue-800"
                                : "bg-amber-100 text-amber-800"
                            }`}
                          >
                            {item.statut}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="p-8 bg-slate-50 border border-slate-200 rounded-2xl text-center text-slate-400 text-xs font-semibold">
                Aucune commande enregistrée pour ce produit pour le moment.
              </div>
            )}
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-6 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
          <button
            type="button"
            onClick={onFermer}
            className="px-5 py-2.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl text-xs hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Fermer
          </button>

          <button
            type="button"
            onClick={exporterPDF}
            className="px-6 py-2.5 bg-[#5B63F6] hover:bg-indigo-600 text-white font-extrabold rounded-xl shadow-md shadow-indigo-500/20 transition-all text-xs flex items-center gap-2 cursor-pointer"
          >
            <Download01Icon size={16} />
            <span>Exporter Rapport Produit (PDF)</span>
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};
