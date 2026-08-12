"use client";

import React, { useState, useMemo } from "react";
import { CarteStatCommande } from "@/modules/commandes/composants/carte-stat-commande";
import { TableauCommandes } from "@/modules/commandes/composants/tableau-commandes";
import { ModalDetailCommande } from "@/modules/commandes/composants/modal-detail-commande";
import { ModalExportation } from "@/composants-communs/modal-exportation";
import { Commande as CommandeVue, StatutCommande as StatutVue } from "@/modules/commandes/types/commande";
import { useCommandes } from "@/lib/context/CommandesContext";
import { useLanguage } from "@/lib/context/LanguageContext";
import { formatNombre } from "@/lib/formatteur";
import { exporterCSV, exporterRapportPDF } from "@/lib/utilitaires/exportateur";
import {
  Download01Icon,
  ShoppingBag01Icon,
  Clock01Icon,
  CheckmarkCircle02Icon,
  CancelCircleIcon,
} from "hugeicons-react";

export default function PageCommandesAdmin() {
  const { commandes, modifierStatutCommande, supprimerCommande } = useCommandes();
  const { t, formaterPrix, formaterDate, langue } = useLanguage();
  const [modalExportOuvert, setModalExportOuvert] = useState(false);

  // Mapping des commandes centralisées vers le type CommandeVue de la vue
  const commandesVues: CommandeVue[] = useMemo(() => {
    return commandes.map((c) => {
      let sttVue: StatutVue = "Livrée";
      if (c.statut === "en_attente") sttVue = t("orders.statusPending") as StatutVue;
      else if (c.statut === "validee" || c.statut === "en_preparation") sttVue = t("orders.statusPreparing") as StatutVue;
      else if (c.statut === "expediee") sttVue = t("orders.statusShipped") as StatutVue;
      else if (c.statut === "annulee") sttVue = t("orders.statusCancelled") as StatutVue;
      else sttVue = t("orders.statusDelivered") as StatutVue;

      return {
        id: c.id,
        numeroCommande: c.reference,
        clientId: c.clientId,
        nomClient: c.clientNom,
        emailClient: c.clientEmail,
        telephoneClient: c.clientTelephone,
        statut: sttVue,
        statutPaiement: (c.statutPaiement === "paye" ? "Payé" : c.statutPaiement === "rembourse" ? "Remboursé" : "En attente") as "En attente" | "Payé" | "Remboursé" | "Échoué",
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
  }, [commandes, t]);

  const [commandeSelectionnee, setCommandeSelectionnee] = useState<CommandeVue | null>(null);

  // Cartes KPIs
  const totalCmd = commandesVues.length;
  const enTraitement = commandesVues.filter(
    (c) => c.statut === t("orders.statusPreparing") || c.statut === t("orders.statusPending")
  ).length;
  const livrees = commandesVues.filter((c) => c.statut === t("orders.statusDelivered") || c.statut === "Livrée").length;
  const annulees = commandesVues.filter((c) => c.statut === t("orders.statusCancelled") || c.statut === "Annulée").length;
  const chiffreAffairesTotal = commandesVues.reduce((sum, c) => sum + c.montantTotal, 0);

  const changerStatut = (id: string, nouveauStatut: StatutVue) => {
    let internalStatut: "en_attente" | "validee" | "en_preparation" | "expediee" | "livree" | "annulee" = "validee";
    if (nouveauStatut.toLowerCase().includes("attente") || nouveauStatut.toLowerCase().includes("pending")) internalStatut = "en_attente";
    else if (nouveauStatut.toLowerCase().includes("traitement") || nouveauStatut.toLowerCase().includes("prepar")) internalStatut = "en_preparation";
    else if (nouveauStatut.toLowerCase().includes("transit") || nouveauStatut.toLowerCase().includes("shipped")) internalStatut = "expediee";
    else if (nouveauStatut.toLowerCase().includes("livr") || nouveauStatut.toLowerCase().includes("deliver")) internalStatut = "livree";
    else if (nouveauStatut.toLowerCase().includes("annul") || nouveauStatut.toLowerCase().includes("cancel")) internalStatut = "annulee";

    modifierStatutCommande(id, internalStatut);
    if (commandeSelectionnee && commandeSelectionnee.id === id) {
      setCommandeSelectionnee({ ...commandeSelectionnee, statut: nouveauStatut });
    }
  };

  const verifierSuppression = (id: string) => {
    if (confirm(t("common.confirmDeleteMessage"))) {
      supprimerCommande(id);
      if (commandeSelectionnee?.id === id) {
        setCommandeSelectionnee(null);
      }
    }
  };

  const executerExportationCommandes = (format: "pdf" | "csv") => {
    const enTetes = [
      t("orders.title"),
      t("common.date"),
      t("common.name"),
      t("common.email"),
      t("common.phone"),
      t("common.address"),
      t("common.status"),
      t("orders.paymentMethod"),
      t("common.total"),
    ];

    const lignes = commandesVues.map((c) => [
      c.numeroCommande,
      formaterDate(c.creeLe),
      c.nomClient,
      c.emailClient,
      c.telephoneClient,
      `${c.adresseLivraison}, ${c.villeLivraison}`,
      c.statut,
      `${c.modePaiement} (${c.statutPaiement})`,
      formaterPrix(c.montantTotal),
    ]);

    if (format === "csv") {
      exporterCSV("rapport_commandes_cosmetic_admin", enTetes, lignes);
    } else {
      exporterRapportPDF(
        t("orders.title"),
        t("orders.subtitle"),
        [
          { label: t("dashboard.kpiOrders"), valeur: formatNombre(totalCmd) },
          { label: t("orders.statusDelivered"), valeur: formatNombre(livrees) },
          { label: t("orders.statusPreparing"), valeur: formatNombre(enTraitement) },
          { label: t("dashboard.kpiRevenue"), valeur: formaterPrix(chiffreAffairesTotal) },
        ],
        enTetes,
        lignes
      );
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-[1600px] mx-auto pb-12">
      {/* Entête de page */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {t("orders.title")} ({totalCmd})
          </h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            {t("orders.subtitle")}
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModalExportOuvert(true)}
          className="px-6 py-3 bg-[#5B63F6] hover:bg-indigo-600 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 self-start sm:self-auto cursor-pointer hover:scale-[1.02]"
        >
          <Download01Icon size={18} strokeWidth={2.5} /> {t("common.export")}
        </button>
      </div>

      {/* Cartes de statistiques */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <CarteStatCommande
          titre={t("dashboard.kpiOrders")}
          valeur={formatNombre(totalCmd)}
          icone={<ShoppingBag01Icon size={24} strokeWidth={2} />}
          couleurBgIcone="bg-indigo-50 text-[#5B63F6]"
          tendance="+12.5%"
          estHaut={true}
        />
        <CarteStatCommande
          titre={t("orders.statusPreparing")}
          valeur={formatNombre(enTraitement)}
          icone={<Clock01Icon size={24} strokeWidth={2} />}
          couleurBgIcone="bg-amber-50 text-amber-600"
          tendance={t("orders.statusPending")}
          estHaut={false}
        />
        <CarteStatCommande
          titre={t("orders.statusDelivered")}
          valeur={formatNombre(livrees)}
          icone={<CheckmarkCircle02Icon size={24} strokeWidth={2} />}
          couleurBgIcone="bg-emerald-50 text-emerald-600"
          tendance={`${t("common.success")} 98%`}
          estHaut={true}
        />
        <CarteStatCommande
          titre={t("orders.statusCancelled")}
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

      {/* Pop-up Modale d'exportation */}
      <ModalExportation
        ouvert={modalExportOuvert}
        titre={t("orders.title")}
        description={t("orders.subtitle")}
        nombreElements={totalCmd}
        onFermer={() => setModalExportOuvert(false)}
        onExporter={executerExportationCommandes}
      />
    </div>
  );
}
