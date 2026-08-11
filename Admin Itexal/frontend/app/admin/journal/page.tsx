"use client";

import React, { useState } from "react";
import { LogAudit } from "@/modules/journal/types/journal";
import { TableauJournal } from "@/modules/journal/composants/tableau-journal";
import { ModalDetailLog } from "@/modules/journal/composants/modal-detail-log";
import { formatNombre } from "@/lib/formatteur";
import {
  File01Icon,
  Download01Icon,
  Delete02Icon,
  AlertCircleIcon,
  Settings02Icon,
} from "hugeicons-react";

export default function PageJournalAdmin() {
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
  const [messageAction, setMessageAction] = useState("");

  // KPIs
  const totalLogs = logs.length;
  const totalCritiques = logs.filter((l) => l.niveauSeverite === "Critique").length;
  const totalModifsSensibles = logs.filter((l) =>
    ["Produits", "Stock", "Utilisateurs", "Paramètres"].includes(l.typeEvenement)
  ).length;

  const exporterLogsCSV = () => {
    const entetes = "ID;Horodatage;Utilisateur;Role;Module;Action;Description;IP;Severite\n";
    const lignes = logs
      .map(
        (l) =>
          `${l.id};${l.horodatage};"${l.nomUtilisateur}";"${l.roleUtilisateur}";${l.typeEvenement};${l.action};"${l.description}";${l.adresseIP};${l.niveauSeverite}`
      )
      .join("\n");

    const blob = new Blob([entetes + lignes], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", `journal_audit_itexal_${new Date().toISOString().split("T")[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    setMessageAction("Le fichier du journal d'audit CSV a été généré et téléchargé.");
    setTimeout(() => setMessageAction(""), 4000);
  };

  const purgerLogsAnciens = () => {
    if (
      confirm(
        "Êtes-vous sûr de vouloir archiver et purger les événements d'audit anciens ? Cette action est réservée au Super Admin."
      )
    ) {
      setLogs((prev) => prev.slice(0, 3));
      setMessageAction("Les anciens logs d'audit ont été archivés avec succès.");
      setTimeout(() => setMessageAction(""), 4000);
    }
  };

  return (
    <div className="space-y-8">
      {/* Title & Action buttons */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Journal d'Activités & Log d'Audit
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Traçabilité intégrale des événements administrateurs, accès et modifications système.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={exporterLogsCSV}
            className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-2"
          >
            <Download01Icon size={16} className="text-[#4880FF]" />
            <span>Exporter CSV / Audit</span>
          </button>

          <button
            type="button"
            onClick={purgerLogsAnciens}
            className="px-4 py-2.5 bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white font-bold text-xs rounded-xl border border-rose-200 transition-all flex items-center gap-2"
          >
            <Delete02Icon size={16} />
            <span>Purger Anciens Logs</span>
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
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Total Événements Audit</span>
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
            <span className="text-xs font-semibold text-rose-500 uppercase tracking-wider">Alertes / Échecs Connexion</span>
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
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Modifications Métier</span>
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
    </div>
  );
}
