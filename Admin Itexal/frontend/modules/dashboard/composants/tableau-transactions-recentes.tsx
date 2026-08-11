"use client";

import React, { useState } from "react";
import {
  PackageIcon,
  SparklesIcon,
  Leaf01Icon,
  DropletIcon,
  Store01Icon,
  ArrowDown01Icon,
} from "hugeicons-react";

interface TransactionItem {
  id: string;
  nomProduit: string;
  categorie: string;
  IconProduit: React.ElementType;
  localisation: string;
  dateHeure: string;
  quantite: number;
  montant: string;
  statut: "Delivered" | "Pending" | "Rejected";
}

export const TableauTransactionsRecentes: React.FC = () => {
  const [periode, setPeriode] = useState("Octobre 2026");

  const transactions: TransactionItem[] = [
    {
      id: "1",
      nomProduit: "Apple Watch / Sérum Visage Éclat",
      categorie: "Cosmétique",
      IconProduit: PackageIcon,
      localisation: "6096 Marjolaine Landing, Douala",
      dateHeure: "12.09.2026 - 12.53 PM",
      quantite: 423,
      montant: "34,295 FCFA",
      statut: "Delivered",
    },
    {
      id: "2",
      nomProduit: "Crème Hydratante Karité Pure",
      categorie: "Soin du Corps",
      IconProduit: SparklesIcon,
      localisation: "Avenue Bastos, Yaoundé",
      dateHeure: "12.09.2026 - 11.20 AM",
      quantite: 180,
      montant: "18,500 FCFA",
      statut: "Delivered",
    },
    {
      id: "3",
      nomProduit: "Lotion Tonique Réparatrice",
      categorie: "Visage",
      IconProduit: Leaf01Icon,
      localisation: "Rue de la Joie Akwa, Douala",
      dateHeure: "11.09.2026 - 04.45 PM",
      quantite: 95,
      montant: "12,000 FCFA",
      statut: "Pending",
    },
    {
      id: "4",
      nomProduit: "Masque Capillaire Argan Premium",
      categorie: "Cheveux",
      IconProduit: Store01Icon,
      localisation: "Quartier Bonapriso, Douala",
      dateHeure: "10.09.2026 - 09.15 AM",
      quantite: 310,
      montant: "45,000 FCFA",
      statut: "Delivered",
    },
    {
      id: "5",
      nomProduit: "Huile Essentielle Bio ITexal",
      categorie: "Huiles",
      IconProduit: DropletIcon,
      localisation: "Avenue du Port, Kribi",
      dateHeure: "10.09.2026 - 08.30 AM",
      quantite: 50,
      montant: "9,800 FCFA",
      statut: "Rejected",
    },
  ];

  const renduStatut = (statut: TransactionItem["statut"]) => {
    switch (statut) {
      case "Delivered":
        return (
          <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#00B69B] text-white text-xs font-bold shadow-xs">
            Delivered
          </span>
        );
      case "Pending":
        return (
          <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#6200EE] text-white text-xs font-bold shadow-xs">
            Pending
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center justify-center px-4 py-1.5 rounded-full bg-[#EF3826] text-white text-xs font-bold shadow-xs">
            Rejected
          </span>
        );
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 space-y-6">
      {/* En-tête de la carte */}
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-bold text-slate-800">Deals Details</h3>

        <div className="relative">
          <select
            value={periode}
            onChange={(e) => setPeriode(e.target.value)}
            aria-label="Filtrer la période des transactions"
            className="appearance-none bg-[#F5F6FA] border border-slate-200 text-xs font-semibold text-slate-600 py-2 pl-3 pr-8 rounded-lg focus:outline-none cursor-pointer"
          >
            <option value="Octobre 2026">Octobre 2026</option>
            <option value="Septembre 2026">Septembre 2026</option>
          </select>
          <ArrowDown01Icon size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
        </div>
      </div>

      {/* Tableau responsive des transactions */}
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-[#F5F6FA] text-slate-700 text-xs font-bold uppercase tracking-wider">
              <th className="py-3.5 px-4 rounded-l-xl">Product Name</th>
              <th className="py-3.5 px-4">Location</th>
              <th className="py-3.5 px-4">Date - Time</th>
              <th className="py-3.5 px-4">Piece</th>
              <th className="py-3.5 px-4">Amount</th>
              <th className="py-3.5 px-4 rounded-r-xl text-center">Status</th>
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
            {transactions.map((item) => {
              const Icon = item.IconProduit;
              return (
                <tr key={item.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="py-4 px-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-50/60 border border-blue-100 text-[#4880FF] flex items-center justify-center shrink-0">
                        <Icon size={20} strokeWidth={2} />
                      </div>
                      <div>
                        <p className="font-bold text-slate-800 text-sm">{item.nomProduit}</p>
                        <p className="text-[11px] text-slate-400">{item.categorie}</p>
                      </div>
                    </div>
                  </td>

                  <td className="py-4 px-4 text-slate-600">{item.localisation}</td>

                  <td className="py-4 px-4 text-slate-500 whitespace-nowrap">{item.dateHeure}</td>

                  <td className="py-4 px-4 font-bold text-slate-800">{item.quantite}</td>

                  <td className="py-4 px-4 font-extrabold text-slate-900 whitespace-nowrap">
                    {item.montant}
                  </td>

                  <td className="py-4 px-4 text-center whitespace-nowrap">
                    {renduStatut(item.statut)}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};
