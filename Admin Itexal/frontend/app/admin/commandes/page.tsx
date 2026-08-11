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
    <div className="space-y-8 animate-fadeIn max-w-[1600px] mx-auto pb-12">
      {/* Entête de page */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Orders List ({totalCmd})
          </h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            Gestion synchronisée des commandes, stocks et livraisons.
          </p>
        </div>

        <button
          type="button"
          onClick={() => alert("Rapport de commandes exporté avec succès.")}
          className="px-6 py-3 bg-[#5B63F6] hover:bg-indigo-600 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 self-start sm:self-auto"
        >
          <Download01Icon size={18} strokeWidth={2.5} /> Exporter Rapport
        </button>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <CarteStatCommande
          titre="Total Commandes"
          valeur={formatNombre(totalCmd)}
          icone={<ShoppingBag01Icon size={24} strokeWidth={2} />}
          couleurBgIcone="bg-indigo-50 text-[#5B63F6]"
          tendance="+12.5%"
          estHaut={true}
        />
        <CarteStatCommande
          titre="En Traitement"
          valeur={formatNombre(enTraitement)}
          icone={<Clock01Icon size={24} strokeWidth={2} />}
          couleurBgIcone="bg-amber-50 text-amber-600"
          tendance="En cours"
          estHaut={false}
        />
        <CarteStatCommande
          titre="Commandes Livrées"
          valeur={formatNombre(livrees)}
          icone={<CheckmarkCircle02Icon size={24} strokeWidth={2} />}
          couleurBgIcone="bg-emerald-50 text-emerald-600"
          tendance="Succès 98%"
          estHaut={true}
        />
        <CarteStatCommande
          titre="Commandes Annulées"
          valeur={formatNombre(annulees)}
          icone={<CancelCircleIcon size={24} strokeWidth={2} />}
          couleurBgIcone="bg-rose-50 text-rose-500"
          tendance="< 2%"
          estHaut={false}
        />
      </div>

      {/* Tableau des commandes */}
      <TableauCommandes
        commandes={commandesVues}
        onVoirCommande={(c: CommandeVue) => setCommandeSelectionnee(c)}
        onChangerStatut={changerStatut}
        onSupprimerCommande={verifierSuppression}
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
