"use client";

import React, { useState } from "react";
import { LogAudit } from "@/modules/journal/types/journal";
import { TableauJournal } from "@/modules/journal/composants/tableau-journal";
import { ModalDetailLog } from "@/modules/journal/composants/modal-detail-log";
import { ModalExportation } from "@/composants-communs/modal-exportation";
import { formatNombre } from "@/lib/formatteur";
import { exporterCSV, exporterRapportPDF } from "@/lib/utilitaires/exportateur";
import { useLanguage } from "@/lib/context/LanguageContext";
import {
  File01Icon,
  Download01Icon,
  Delete02Icon,
  AlertCircleIcon,
  Settings02Icon,
} from "hugeicons-react";

export default function PageJournalAdmin() {
  const { t } = useLanguage();
  const [logs, setLogs] = useState<LogAudit[]>([
    {
      id: "log-109",
      typeEvenement: "Authentification",
      action: "CONNEXION_REUSSIE",
      description: "Connexion administrateur réussie via 2FA.",
      nomUtilisateur: "Alexandre ITexal",
      roleUtilisateur: "Super Admin",
      avatarUtilisateur: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandre",
      niveauSeverite: "Info",
      adresseIP: "197.234.221.14",
      naviguerNavigateur: "Mozilla/5.0 (Linux x86_64) Chrome/127.0.0.0",
      horodatage: "11/08/2026 12:45:10",
    },
    {
      id: "log-108",
      typeEvenement: "Stock",
      action: "AJUSTEMENT_STOCK",
      description: "Ajustement manuel de stock (+20 unités) sur 'Sérum Visage Éclat'. Motif: Réapprovisionnement.",
      nomUtilisateur: "Vanessa Manga",
      roleUtilisateur: "Gestionnaire de Stock",
      avatarUtilisateur: "https://api.dicebear.com/7.x/avataaars/svg?seed=Vanessa",
      niveauSeverite: "Info",
      adresseIP: "197.234.221.45",
      horodatage: "11/08/2026 12:30:22",
      donneesSensibles: {
        produitId: "1",
        ancienStock: 43,
        nouveauStock: 63,
        delta: 20,
      },
    },
    {
      id: "log-107",
      typeEvenement: "Commandes",
      action: "CHANGEMENT_STATUT_COMMANDE",
      description: "Passage de la commande #CMD-8924 du statut 'Processing' à 'In Transit'.",
      nomUtilisateur: "Samuel Ndombe",
      roleUtilisateur: "Responsable Commandes",
      avatarUtilisateur: "https://api.dicebear.com/7.x/avataaars/svg?seed=Samuel",
      niveauSeverite: "Info",
      adresseIP: "41.205.12.89",
      horodatage: "11/08/2026 11:15:05",
      donneesSensibles: {
        commandeId: "8924",
        statutPrecedent: "Processing",
        nouveauStatut: "In Transit",
      },
    },
    {
      id: "log-106",
      typeEvenement: "Authentification",
      action: "CONNEXION_ECHOUEE",
      description: "Échec d'authentification (mot de passe incorrect) pour l'utilisateur admin 'c.atangana@itexal.com'.",
      nomUtilisateur: "Inconnu (Clarisse Atangana)",
      roleUtilisateur: "Rédacteur Contenu",
      avatarUtilisateur: "https://api.dicebear.com/7.x/avataaars/svg?seed=Clarisse",
      niveauSeverite: "Critique",
      adresseIP: "102.129.144.12",
      horodatage: "11/08/2026 10:52:19",
      donneesSensibles: {
        tentatives: 3,
        ipBloqueeTemporairement: false,
      },
    },
    {
      id: "log-105",
      typeEvenement: "Produits",
      action: "SUPPRESSION_PRODUIT",
      description: "Suppression définitive du produit cosmétique 'Lotion Apaisante Hydratante Test' (REF: #LOT-TEST).",
      nomUtilisateur: "Alexandre ITexal",
      roleUtilisateur: "Super Admin",
      avatarUtilisateur: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandre",
      niveauSeverite: "Avertissement",
      adresseIP: "197.234.221.14",
      horodatage: "11/08/2026 09:40:00",
    },
    {
      id: "log-104",
      typeEvenement: "Utilisateurs",
      action: "CHANGEMENT_ROLE_UTILISATEUR",
      description: "Modification du rôle RBAC de 'Clarisse Atangana' : passage de 'Gestionnaire' à 'Rédacteur Contenu'.",
      nomUtilisateur: "Alexandre ITexal",
      roleUtilisateur: "Super Admin",
      avatarUtilisateur: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandre",
      niveauSeverite: "Avertissement",
      adresseIP: "197.234.221.14",
      horodatage: "10/08/2026 17:22:11",
    },
    {
      id: "log-103",
      typeEvenement: "Paramètres",
      action: "MISE_A_JOUR_PARAMETRES",
      description: "Modification du forfait de livraison Yaoundé : ajustement de 2.000 FCFA à 2.500 FCFA.",
      nomUtilisateur: "Alexandre ITexal",
      roleUtilisateur: "Super Admin",
      avatarUtilisateur: "https://api.dicebear.com/7.x/avataaars/svg?seed=Alexandre",
      niveauSeverite: "Info",
      adresseIP: "197.234.221.14",
      horodatage: "10/08/2026 14:05:44",
    },
  ]);

  const [logSelectionne, setLogSelectionne] = useState<LogAudit | null>(null);
  const [modalExportOuvert, setModalExportOuvert] = useState(false);
  const [messageAction, setMessageAction] = useState("");

  // KPIs
  const totalLogs = logs.length;
  const totalCritiques = logs.filter((l) => l.niveauSeverite === "Critique").length;
  const totalModifsSensibles = logs.filter((l) =>
    ["Produits", "Stock", "Utilisateurs", "Paramètres"].includes(l.typeEvenement)
  ).length;

  const executerExportationLogs = (format: "pdf" | "csv") => {
    const enTetes = [
      "ID",
      "Horodatage",
      "Utilisateur",
      "Rôle",
      "Module",
      "Action",
      "Description",
      "Adresse IP",
      "Sévérité",
    ];

    const lignes = logs.map((l) => [
      l.id,
      l.horodatage,
      l.nomUtilisateur,
      l.roleUtilisateur,
      l.typeEvenement,
      l.action,
      l.description,
      l.adresseIP || "127.0.0.1",
      l.niveauSeverite,
    ]);

    if (format === "csv") {
      exporterCSV("journal_audit_itexal", enTetes, lignes);
      setMessageAction(t("common.itemCreated"));
    } else {
      exporterRapportPDF(
        "RAPPORT DU JOURNAL D'AUDIT & SÉCURITÉ",
        "Traçabilité intégrale des événements administrateurs et accès système",
        [
          { label: "Total Événements", valeur: formatNombre(totalLogs) },
          { label: "Alertes / Sécurité", valeur: formatNombre(totalCritiques) },
          { label: "Actions Sensibles", valeur: formatNombre(totalModifsSensibles) },
        ],
        enTetes,
        lignes
      );
      setMessageAction(t("common.itemCreated"));
    }

    setTimeout(() => setMessageAction(""), 4000);
  };

  const purgerLogsAnciens = () => {
    if (confirm(t("journal.purgeConfirm"))) {
      setLogs((prev) => prev.slice(0, 3));
      setMessageAction(t("journal.archivedSuccess"));
      setTimeout(() => setMessageAction(""), 4000);
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-[1600px] mx-auto pb-12">
      {/* Title & Action buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            {t("journal.title")}
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            {t("journal.subtitle")}
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => setModalExportOuvert(true)}
            className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <Download01Icon size={16} className="text-[#4880FF]" />
            <span>{t("journal.exportAudit")}</span>
          </button>

          <button
            type="button"
            onClick={purgerLogsAnciens}
            className="px-4 py-2.5 bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white font-bold text-xs rounded-xl border border-rose-200 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Delete02Icon size={16} />
            <span>{t("journal.purgeLogs")}</span>
          </button>
        </div>
      </div>

      {messageAction && (
        <div className="p-4 bg-emerald-100 border border-emerald-200 text-emerald-800 font-bold text-xs rounded-2xl animate-fadeIn">
          {messageAction}
        </div>
      )}

      {/* KPI Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {t("journal.totalEvents")}
            </span>
            <h3 className="text-2xl font-black text-slate-800 mt-1">
              {formatNombre(totalLogs)}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#4880FF] flex items-center justify-center font-bold">
            <File01Icon size={24} strokeWidth={2} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider">
              {t("journal.securityAlerts")}
            </span>
            <h3 className="text-2xl font-black text-rose-600 mt-1">
              {totalCritiques}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center font-bold">
            <AlertCircleIcon size={24} strokeWidth={2} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100 flex items-center justify-between">
          <div>
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              {t("journal.businessChanges")}
            </span>
            <h3 className="text-2xl font-black text-emerald-600 mt-1">
              {totalModifsSensibles}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold">
            <Settings02Icon size={24} strokeWidth={2} />
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <TableauJournal journal={logs} onVoirLog={(log) => setLogSelectionne(log)} />

      {/* Detail Log Modal */}
      <ModalDetailLog
        log={logSelectionne}
        onFermer={() => setLogSelectionne(null)}
      />

      {/* Modal Exportation PDF / CSV */}
      <ModalExportation
        ouvert={modalExportOuvert}
        titre={t("journal.exportTitle")}
        description={t("journal.exportDesc")}
        nombreElements={totalLogs}
        onFermer={() => setModalExportOuvert(false)}
        onExporter={executerExportationLogs}
      />
    </div>
  );
}
