"use client";

import React, { useState, useMemo } from "react";
import { CarteStatCommande } from "@/modules/commandes/composants/carte-stat-commande";
import { TableauCommandes } from "@/modules/commandes/composants/tableau-commandes";
import { ModalDetailCommande } from "@/modules/commandes/composants/modal-detail-commande";
import { Commande as CommandeVue, StatutCommande as StatutVue } from "@/modules/commandes/types/commande";
import { useCommandes } from "@/lib/context/CommandesContext";
import { formatNombre } from "@/lib/formatteur";
import {
  Download01Icon,
  ShoppingBag01Icon,
  Clock01Icon,
  CheckmarkCircle02Icon,
  CancelCircleIcon,
} from "hugeicons-react";

export default function PageCommandesAdmin() {
  const { commandes, modifierStatutCommande, supprimerCommande } = useCommandes();

  // Mapping des commandes centralisées vers le type CommandeVue de la vue
  const commandesVues: CommandeVue[] = useMemo(() => {
    return commandes.map((c) => {
      let sttVue: StatutVue = "Livrée";
      if (c.statut === "en_attente") sttVue = "En attente";
      else if (c.statut === "validee" || c.statut === "en_preparation") sttVue = "En traitement";
      else if (c.statut === "expediee") sttVue = "En transit";
      else if (c.statut === "annulee") sttVue = "Annulée";

      return {
        id: c.id,
        numeroCommande: c.reference,
        clientId: c.clientId,
        nomClient: c.clientNom,
        emailClient: c.clientEmail,
        telephoneClient: c.clientTelephone,
        statut: sttVue,
        statutPaiement: c.statutPaiement === "paye" ? "Payé" : c.statutPaiement === "rembourse" ? "Remboursé" : "En attente",
        modePaiement: c.methodePaiement === "mobile_money" ? "MTN Mobile Money" : "Carte Bancaire",
        montantTotal: c.montantTotal,
        fraisLivraison: c.fraisLivraison,
        adresseLivraison: `${c.adresseLivraison.numero} ${c.adresseLivraison.rue}`,
        villeLivraison: c.adresseLivraison.ville,
        creeLe: c.dateCommande,
        miseAJourLe: c.dateCommande,
        articles: c.articles.map((art) => ({
          id: art.id,
          produitId: art.produitId,
          nomProduit: art.nomProduit,
          quantite: art.quantite,
          prixUnitaire: art.prixUnitaire,
          image: art.imageProduit,
        })),
      };
    });
  }, [commandes]);

  const [commandeSelectionnee, setCommandeSelectionnee] = useState<CommandeVue | null>(null);

  // Cartes KPIs
  const totalCmd = commandesVues.length;
  const enTraitement = commandesVues.filter(
    (c) => c.statut === "En traitement" || c.statut === "En attente"
  ).length;
  const livrees = commandesVues.filter((c) => c.statut === "Livrée").length;
  const annulees = commandesVues.filter((c) => c.statut === "Annulée").length;

  const changerStatut = (id: string, nouveauStatut: StatutVue) => {
    let internalStatut: "en_attente" | "validee" | "en_preparation" | "expediee" | "livree" | "annulee" = "validee";
    if (nouveauStatut === "En attente") internalStatut = "en_attente";
    if (nouveauStatut === "En traitement") internalStatut = "en_preparation";
    if (nouveauStatut === "En transit") internalStatut = "expediee";
    if (nouveauStatut === "Livrée" || nouveauStatut === "Completed") internalStatut = "livree";
    if (nouveauStatut === "Annulée" || nouveauStatut === "Rejected") internalStatut = "annulee";

    modifierStatutCommande(id, internalStatut);
    if (commandeSelectionnee && commandeSelectionnee.id === id) {
      setCommandeSelectionnee({ ...commandeSelectionnee, statut: nouveauStatut });
    }
  };

  const verifierSuppression = (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer définitivement cette commande ?")) {
      supprimerCommande(id);
      if (commandeSelectionnee?.id === id) {
        setCommandeSelectionnee(null);
      }
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Entête de page */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Commandes ({totalCmd})
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Gestion du flux de commandes synchronisé avec le stock et les notifications.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert("Exportation du rapport de commandes générée.")}
          className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-extrabold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Download01Icon size={16} strokeWidth={2} /> Exporter Rapport
        </button>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <CarteStatCommande
          titre="Total Commandes"
          valeur={formatNombre(totalCmd)}
          icone={<ShoppingBag01Icon size={24} strokeWidth={2} />}
          couleurBgIcone="bg-blue-50"
          tendance="+12.5%"
          estHaut={true}
        />
        <CarteStatCommande
          titre="En Cours / Traitement"
          valeur={formatNombre(enTraitement)}
          icone={<Clock01Icon size={24} strokeWidth={2} />}
          couleurBgIcone="bg-amber-50"
          tendance="À traiter en priorité"
          estHaut={false}
        />
        <CarteStatCommande
          titre="Commandes Livrées"
          valeur={formatNombre(livrees)}
          icone={<CheckmarkCircle02Icon size={24} strokeWidth={2} />}
          couleurBgIcone="bg-emerald-50"
          tendance="Succès livraison 98%"
          estHaut={true}
        />
        <CarteStatCommande
          titre="Commandes Annulées"
          valeur={formatNombre(annulees)}
          icone={<CancelCircleIcon size={24} strokeWidth={2} />}
          couleurBgIcone="bg-rose-50"
          tendance="Taux de retour < 2%"
          estHaut={false}
        />
      </div>

      {/* Tableau des commandes */}
      <TableauCommandes
        commandes={commandesVues}
        onVoirCommande={(c: CommandeVue) => setCommandeSelectionnee(c)}
        onChangerStatut={changerStatut}
      />

      {/* Modal de détail d'une commande */}
      {commandeSelectionnee && (
        <ModalDetailCommande
          commande={commandeSelectionnee}
          onFermer={() => setCommandeSelectionnee(null)}
          onChangerStatut={changerStatut}
        />
      )}
    </div>
  );
}
