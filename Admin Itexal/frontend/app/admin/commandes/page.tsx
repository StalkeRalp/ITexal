"use client";

import React, { useState } from "react";
import { CarteStatCommande } from "@/modules/commandes/composants/carte-stat-commande";
import { TableauCommandes } from "@/modules/commandes/composants/tableau-commandes";
import { ModalDetailCommande } from "@/modules/commandes/composants/modal-detail-commande";
import { Commande, StatutCommande } from "@/modules/commandes/types/commande";
import { formatNombre } from "@/lib/formatteur";
import {
  Download01Icon,
  ShoppingBag01Icon,
  Clock01Icon,
  CheckmarkCircle02Icon,
  CancelCircleIcon,
} from "hugeicons-react";

export default function PageCommandesAdmin() {
  const [commandes, setCommandes] = useState<Commande[]>([
    {
      id: "cmd-1",
      numeroCommande: "CMD-01",
      clientId: "cli-1",
      nomClient: "Christine Brooks",
      emailClient: "christine.b@gmail.com",
      telephoneClient: "+237 699 12 34 56",
      statut: "Livrée",
      statutPaiement: "Payé",
      modePaiement: "Orange Money",
      montantTotal: 45500,
      fraisLivraison: 2500,
      adresseLivraison: "089 Kutch Green Apt. 448, Akwa",
      villeLivraison: "Douala",
      creeLe: "04 Sep 2026",
      miseAJourLe: "04 Sep 2026",
      articles: [
        {
          id: "art-1",
          produitId: "p-1",
          nomProduit: "Sérum Visage Éclat Bio",
          quantite: 2,
          prixUnitaire: 12000,
          image:
            "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&auto=format&fit=crop&q=80",
        },
        {
          id: "art-2",
          produitId: "p-2",
          nomProduit: "Crème Hydratante Karité",
          quantite: 1,
          prixUnitaire: 19000,
          image:
            "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&auto=format&fit=crop&q=80",
        },
      ],
    },
    {
      id: "cmd-2",
      numeroCommande: "CMD-02",
      clientId: "cli-2",
      nomClient: "Rosie Pearson",
      emailClient: "rosie.p@yahoo.fr",
      telephoneClient: "+237 677 88 99 00",
      statut: "En traitement",
      statutPaiement: "Payé",
      modePaiement: "MTN Mobile Money",
      montantTotal: 33500,
      fraisLivraison: 1500,
      adresseLivraison: "Bastos, Avenue des Ambassades",
      villeLivraison: "Yaoundé",
      creeLe: "28 May 2026",
      miseAJourLe: "28 May 2026",
      articles: [
        {
          id: "art-3",
          produitId: "p-3",
          nomProduit: "Gamme Capillaire Argan",
          quantite: 1,
          prixUnitaire: 32000,
          image:
            "https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?w=400&auto=format&fit=crop&q=80",
        },
      ],
    },
    {
      id: "cmd-3",
      numeroCommande: "CMD-03",
      clientId: "cli-3",
      nomClient: "Darrell Caldwell",
      emailClient: "darrell.caldwell@gmail.com",
      telephoneClient: "+237 655 44 33 22",
      statut: "Annulée",
      statutPaiement: "Échoué",
      modePaiement: "Carte Bancaire",
      montantTotal: 17000,
      fraisLivraison: 2000,
      adresseLivraison: "Centre Ville, face Pharmacie",
      villeLivraison: "Bafoussam",
      creeLe: "23 Nov 2026",
      miseAJourLe: "23 Nov 2026",
      articles: [
        {
          id: "art-4",
          produitId: "p-4",
          nomProduit: "Lotion Tonique Bio",
          quantite: 1,
          prixUnitaire: 15000,
          image:
            "https://images.unsplash.com/photo-1608248597261-e4d091444d32?w=400&auto=format&fit=crop&q=80",
        },
      ],
    },
    {
      id: "cmd-4",
      numeroCommande: "CMD-04",
      clientId: "cli-4",
      nomClient: "Gilbert Johnston",
      emailClient: "gilbert.j@hotmail.com",
      telephoneClient: "+237 690 11 22 33",
      statut: "Livrée",
      statutPaiement: "Payé",
      modePaiement: "Orange Money",
      montantTotal: 58000,
      fraisLivraison: 3000,
      adresseLivraison: "Kribi Beach Resort Residence",
      villeLivraison: "Kribi",
      creeLe: "05 Feb 2026",
      miseAJourLe: "05 Feb 2026",
      articles: [
        {
          id: "art-5",
          produitId: "p-5",
          nomProduit: "Coffret Soin Anti-Âge Premium",
          quantite: 1,
          prixUnitaire: 55000,
          image:
            "https://images.unsplash.com/photo-1571781926291-c477ebfd024b?w=400&auto=format&fit=crop&q=80",
        },
      ],
    },
    {
      id: "cmd-5",
      numeroCommande: "CMD-05",
      clientId: "cli-5",
      nomClient: "Alan Cain",
      emailClient: "alan.cain@itexal.cm",
      telephoneClient: "+237 671 99 88 77",
      statut: "En transit",
      statutPaiement: "Payé",
      modePaiement: "Paiement à la livraison",
      montantTotal: 29500,
      fraisLivraison: 2500,
      adresseLivraison: "Quartier Roumde Adjia",
      villeLivraison: "Garoua",
      creeLe: "29 Jul 2026",
      miseAJourLe: "29 Jul 2026",
      articles: [
        {
          id: "art-6",
          produitId: "p-6",
          nomProduit: "Huile Essentielle Purifiante",
          quantite: 3,
          prixUnitaire: 9000,
          image:
            "https://images.unsplash.com/photo-1608248547160-fbc746581371?w=400&auto=format&fit=crop&q=80",
        },
      ],
    },
    {
      id: "cmd-6",
      numeroCommande: "CMD-06",
      clientId: "cli-6",
      nomClient: "Alfred Murray",
      emailClient: "alfred.m@gmail.com",
      telephoneClient: "+237 695 66 77 88",
      statut: "En attente",
      statutPaiement: "En attente",
      modePaiement: "MTN Mobile Money",
      montantTotal: 16500,
      fraisLivraison: 1500,
      adresseLivraison: "Rue Njo Njo, Bonapriso",
      villeLivraison: "Douala",
      creeLe: "15 Aug 2026",
      miseAJourLe: "15 Aug 2026",
      articles: [
        {
          id: "art-7",
          produitId: "p-7",
          nomProduit: "Beurre de Cacao Réparateur",
          quantite: 1,
          prixUnitaire: 15000,
          image:
            "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&auto=format&fit=crop&q=80",
        },
      ],
    },
  ]);

  const [commandeSelectionnee, setCommandeSelectionnee] = useState<Commande | null>(null);
  const [messageNotification, setMessageNotification] = useState("");

  const changerStatutCommande = (id: string, nouveauStatut: StatutCommande) => {
    setCommandes((prev) =>
      prev.map((c) => {
        if (c.id === id) {
          return {
            ...c,
            statut: nouveauStatut,
            miseAJourLe: new Date().toLocaleDateString("fr-FR"),
          };
        }
        return c;
      })
    );

    if (commandeSelectionnee && commandeSelectionnee.id === id) {
      setCommandeSelectionnee((prev) =>
        prev ? { ...prev, statut: nouveauStatut } : null
      );
    }

    setMessageNotification(
      `Le statut de la commande #${id} a été mis à jour vers "${nouveauStatut}".`
    );
    setTimeout(() => setMessageNotification(""), 4000);
  };

  const exporterRapport = () => {
    const entetes = "Numero;Client;Email;Ville;Statut;Paiement;MontantTotal\n";
    const lignes = commandes
      .map(
        (c) =>
          `${c.numeroCommande};"${c.nomClient}";${c.emailClient};${c.villeLivraison};${c.statut};${c.statutPaiement};${c.montantTotal}`
      )
      .join("\n");

    const blob = new Blob([entetes + lignes], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `commandes_itexal_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setMessageNotification("Rapport des commandes exporté au format CSV !");
    setTimeout(() => setMessageNotification(""), 4000);
  };

  const totalOrders = commandes.length;
  const totalPending = commandes.filter(
    (c) => c.statut === "Processing" || c.statut === "En traitement" || c.statut === "On Hold" || c.statut === "En attente"
  ).length;
  const totalCompleted = commandes.filter((c) => c.statut === "Completed" || c.statut === "Livrée").length;
  const totalCancelled = commandes.filter((c) => c.statut === "Rejected" || c.statut === "Annulée").length;

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Gestion des Commandes
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Suivi en temps réel des livraisons, des paiements Mobile Money et des statuts des commandes.
          </p>
        </div>

        <button
          type="button"
          onClick={exporterRapport}
          className="px-5 py-2.5 bg-[#4880FF] hover:bg-blue-600 text-white font-bold text-xs rounded-2xl shadow-lg shadow-blue-500/20 transition-all self-start sm:self-auto flex items-center gap-2"
        >
          <Download01Icon size={16} strokeWidth={2.5} />
          <span>Exporter Rapport CSV</span>
        </button>
      </div>

      {messageNotification && (
        <div className="p-4 bg-blue-50 border border-blue-200 text-[#4880FF] font-bold text-xs rounded-2xl animate-fadeIn">
          {messageNotification}
        </div>
      )}

      {/* KPI Cards Bar (DashStack Stat Cards) in French */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <CarteStatCommande
          titre="Total Commandes"
          valeur={formatNombre(totalOrders)}
          tendance="1.3%"
          estHaut={true}
          icone={<ShoppingBag01Icon size={22} strokeWidth={2} />}
          couleurBgIcone="bg-blue-50 text-[#4880FF]"
        />
        <CarteStatCommande
          titre="En Traitement"
          valeur={formatNombre(totalPending)}
          tendance="4.5%"
          estHaut={true}
          icone={<Clock01Icon size={22} strokeWidth={2} />}
          couleurBgIcone="bg-amber-50 text-amber-600"
        />
        <CarteStatCommande
          titre="Commandes Livrées"
          valeur={formatNombre(totalCompleted)}
          tendance="2.8%"
          estHaut={true}
          icone={<CheckmarkCircle02Icon size={22} strokeWidth={2} />}
          couleurBgIcone="bg-emerald-50 text-emerald-600"
        />
        <CarteStatCommande
          titre="Commandes Annulées"
          valeur={formatNombre(totalCancelled)}
          tendance="0.5%"
          estHaut={false}
          icone={<CancelCircleIcon size={22} strokeWidth={2} />}
          couleurBgIcone="bg-rose-50 text-rose-600"
        />
      </div>

      {/* Table & Filter Component */}
      <TableauCommandes
        commandes={commandes}
        onVoirCommande={(cmd) => setCommandeSelectionnee(cmd)}
        onChangerStatut={changerStatutCommande}
      />

      {/* Modal Detail Commande */}
      <ModalDetailCommande
        commande={commandeSelectionnee}
        onFermer={() => setCommandeSelectionnee(null)}
        onChangerStatut={changerStatutCommande}
      />
    </div>
  );
}
