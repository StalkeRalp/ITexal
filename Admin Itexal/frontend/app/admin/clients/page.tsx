"use client";

import React, { useState, useMemo } from "react";
import { ModalFiltreStatut } from "@/modules/clients/composants/modal-filtre-statut";
import { ModalFiltreType } from "@/modules/clients/composants/modal-filtre-type";
import { ModalFiltreCalendrier } from "@/modules/clients/composants/modal-filtre-calendrier";
import { ModalAjouterClient } from "@/modules/clients/composants/modal-ajouter-client";
import { FicheDetailClient, ClientComplet } from "@/modules/clients/composants/fiche-detail-client";
import { ModalClientToutesLesInfos } from "@/modules/clients/composants/modal-client-toutes-les-infos";
import { ModalExportation } from "@/composants-communs/modal-exportation";
import { useCommandes } from "@/lib/context/CommandesContext";
import { useLanguage } from "@/lib/context/LanguageContext";
import { exporterCSV, exporterRapportPDF } from "@/lib/utilitaires/exportateur";
import {
  Add01Icon,
  Download01Icon,
  FilterIcon,
  Calendar01Icon,
  ShoppingBag01Icon,
  FlashIcon,
  ArrowDown01Icon,
  RefreshIcon,
  MoreHorizontalIcon,
  Tick01Icon,
  UserGroupIcon,
  UserCheck01Icon,
  Coins01Icon,
  Chart01Icon,
  Edit02Icon,
  Delete02Icon,
} from "hugeicons-react";

export default function PageClientsAdmin() {
  const { clients, commandes, supprimerClient: supprimerClientContext } = useCommandes();
  const { t, formaterPrix, formaterDate } = useLanguage();

  // State pour le menu Popover d'action (`...` Edit/Delete)
  const [popoverOuvertId, setPopoverOuvertId] = useState<string | null>(null);

  // Mapping des clients issus du context
  const clientsComplets: ClientComplet[] = useMemo(() => {
    return clients.map((c) => {
      const cmdsDuClient = commandes.filter((cmd) => cmd.clientId === c.id || cmd.clientEmail === c.email);
      const totalCmds = cmdsDuClient.length || c.commandesEffectuees || 0;
      const totalDepenseReelle = cmdsDuClient.length > 0
        ? cmdsDuClient.reduce((sum, cmd) => sum + cmd.montantTotal, 0)
        : c.totalDepense;

      return {
        id: c.id,
        nom: c.nomComplet,
        email: c.email,
        telephone: c.telephone,
        adresse: `${c.adresse?.numero || 1} ${c.adresse?.rue || "Rue"}, ${c.adresse?.ville || "Douala"}`,
        dateInscrit: c.dateInscription,
        typeGamme: totalCmds > 3 ? t("clients.vipClient") : t("clients.regularClient"),
        statut: c.statut === "actif" ? "Completed" : "Rejected",
        genre: c.genre === "female" ? "Female" : "Male",
        metier: totalCmds > 5 ? t("clients.vipClient") : t("clients.regularClient"),
        totalDepense: totalDepenseReelle,
        totalCommandes: totalCmds,
        avatar: c.avatar,
      };
    });
  }, [clients, commandes, t]);

  // KPIs dynamiques
  const kpisClients = useMemo(() => {
    const total = clientsComplets.length;
    const actifs = clientsComplets.filter((c) => c.statut === "Completed").length;
    const totalDepenseCumulee = clientsComplets.reduce((sum, c) => sum + (c.totalDepense || 0), 0);
    const totalCommandesCumulees = clientsComplets.reduce((sum, c) => sum + (c.totalCommandes || 0), 0);
    const panierMoyenClient = totalCommandesCumulees > 0 ? Math.round(totalDepenseCumulee / totalCommandesCumulees) : 0;

    return {
      total,
      actifs,
      totalDepenseCumulee,
      totalCommandesCumulees,
      panierMoyenClient,
    };
  }, [clientsComplets]);

  const [clientSelectionne, setClientSelectionne] = useState<ClientComplet | null>(
    clientsComplets[0] || null
  );
  const [modalExportOuvert, setModalExportOuvert] = useState(false);
  const [modalAjouterOuvert, setModalAjouterOuvert] = useState(false);
  const [modalToutesInfosOuvert, setModalToutesInfosOuvert] = useState(false);
  const [clientAVisualiserIntegral, setClientAVisualiserIntegral] = useState<ClientComplet | null>(null);

  const [statutsFiltres, setStatutsFiltres] = useState<string[]>([]);
  const [typesFiltres, setTypesFiltres] = useState<string[]>([]);
  const [dateFiltree, setDateFiltree] = useState<string>("");

  const [modalStatutOuvert, setModalStatutOuvert] = useState(false);
  const [modalTypeOuvert, setModalTypeOuvert] = useState(false);
  const [modalCalendrierOuvert, setModalCalendrierOuvert] = useState(false);

  const [notification, setNotification] = useState("");

  const clientsFiltres = clientsComplets.filter((c) => {
    const matchStatut =
      statutsFiltres.length === 0 ? true : statutsFiltres.includes(c.statut);

    const matchType =
      typesFiltres.length === 0 ? true : typesFiltres.includes(c.typeGamme);

    const matchDate =
      !dateFiltree ? true : c.dateInscrit.toLowerCase().includes(dateFiltree.toLowerCase());

    return matchStatut && matchType && matchDate;
  });

  const executerExportationClients = (format: "pdf" | "csv") => {
    const enTetes = [
      "ID",
      t("clients.name"),
      t("clients.email"),
      t("clients.phone"),
      t("common.address"),
      t("clients.gender"),
      t("common.status"),
      t("navigation.orders"),
      t("clients.totalSpent"),
      t("clients.registrationDate"),
    ];

    const lignes = clientsComplets.map((c) => [
      c.id,
      c.nom,
      c.email,
      c.telephone,
      c.adresse,
      c.genre === "Female" ? t("clients.female") : t("clients.male"),
      c.statut === "Completed" ? t("common.active") : t("common.inactive"),
      c.totalCommandes || 0,
      formaterPrix(c.totalDepense || 0),
      formaterDate(c.dateInscrit),
    ]);

    if (format === "csv") {
      exporterCSV("liste_clients_itexal", enTetes, lignes);
    } else {
      exporterRapportPDF(
        t("clients.exportReportTitle"),
        t("clients.exportReportDesc"),
        [
          { label: t("clients.totalClients"), valeur: kpisClients.total.toString() },
          { label: t("clients.activeClients"), valeur: kpisClients.actifs.toString() },
          { label: t("navigation.orders"), valeur: kpisClients.totalCommandesCumulees.toString() },
          { label: t("clients.totalSpent"), valeur: formaterPrix(kpisClients.totalDepenseCumulee) },
        ],
        enTetes,
        lignes
      );
    }
  };

  const ouvrirToutesLesInfos = (client: ClientComplet) => {
    setClientAVisualiserIntegral(client);
    setModalToutesInfosOuvert(true);
  };

  const selectionnerClientHandler = (client: ClientComplet) => {
    setClientSelectionne(client);
  };

  const ajouterClient = (nouveau: {
    nom: string;
    email: string;
    telephone: string;
    adresse: string;
    genre: "Male" | "Female";
    typeGamme: string;
  }) => {
    setNotification(t("clients.addedSuccess"));
    setTimeout(() => setNotification(""), 3500);
  };

  const supprimerClient = (id: string) => {
    if (confirm(t("clients.confirmDelete"))) {
      supprimerClientContext(id);
      if (clientSelectionne?.id === id) {
        setClientSelectionne(null);
      }
      setNotification(t("clients.deletedSuccess"));
      setTimeout(() => setNotification(""), 3000);
    }
  };

  const reinitialiserFiltres = () => {
    setStatutsFiltres([]);
    setTypesFiltres([]);
    setDateFiltree("");
    setNotification(t("clients.resetFilter"));
    setTimeout(() => setNotification(""), 3000);
  };

  return (
    <div className="space-y-6 animate-fadeIn max-w-[1600px] mx-auto pb-12">
      {/* Header & Add Customer Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            {t("clients.title")} ({clientsComplets.length})
          </h1>
          <p className="text-xs text-slate-400 font-medium mt-1">
            {t("clients.subtitle")}
          </p>
        </div>

        <div className="flex items-center gap-3 self-start sm:self-auto">
          <button
            type="button"
            onClick={() => setModalExportOuvert(true)}
            className="px-5 py-3 bg-white hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-2xl border border-slate-200 shadow-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <Download01Icon size={18} className="text-[#5B63F6]" />
            <span>{t("clients.exportList")}</span>
          </button>

          <button
            type="button"
            onClick={() => setModalAjouterOuvert(true)}
            className="px-6 py-3 bg-[#5B63F6] hover:bg-indigo-600 text-white font-extrabold text-xs rounded-2xl shadow-lg shadow-indigo-500/20 transition-all flex items-center gap-2 cursor-pointer"
          >
            <Add01Icon size={18} strokeWidth={2.5} />
            <span>{t("clients.addCustomer")}</span>
          </button>
        </div>
      </div>

      {notification && (
        <div className="p-4 bg-blue-50 border border-blue-200 text-[#5B63F6] font-bold text-xs rounded-2xl animate-fadeIn flex items-center gap-2">
          <Tick01Icon size={16} /> <span>{notification}</span>
        </div>
      )}

      {/* Dynamic KPI Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {t("clients.totalClients")}
            </span>
            <h3 className="text-2xl font-black text-slate-800 mt-1">
              {kpisClients.total}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-[#5B63F6] flex items-center justify-center font-bold shrink-0">
            <UserGroupIcon size={24} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {t("clients.activeClients")}
            </span>
            <h3 className="text-2xl font-black text-slate-800 mt-1">
              {kpisClients.actifs}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center font-bold shrink-0">
            <UserCheck01Icon size={24} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {t("clients.totalSpent")}
            </span>
            <h3 className="text-xl font-black text-slate-800 mt-1">
              {formaterPrix(kpisClients.totalDepenseCumulee)}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold shrink-0">
            <Coins01Icon size={24} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 shadow-sm border border-slate-100/80 flex items-center justify-between">
          <div>
            <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider">
              {t("clients.averageBasket")}
            </span>
            <h3 className="text-xl font-black text-slate-800 mt-1">
              {formaterPrix(kpisClients.panierMoyenClient)}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-500 flex items-center justify-center font-bold shrink-0">
            <Chart01Icon size={24} />
          </div>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100/80 flex items-center flex-wrap gap-4 text-xs font-semibold text-slate-600">
        <div className="flex items-center gap-2 pr-4 border-r border-slate-200">
          <FilterIcon size={18} className="text-[#5B63F6]" />
          <span className="font-extrabold text-slate-800">{t("clients.filterBy")}</span>
        </div>

        <button
          type="button"
          onClick={() => setModalCalendrierOuvert(true)}
          className={`px-4 py-2 rounded-xl border font-bold transition-all flex items-center gap-2 cursor-pointer ${
            dateFiltree
              ? "bg-[#5B63F6] text-white border-[#5B63F6] shadow-sm shadow-indigo-500/20"
              : "bg-white text-slate-700 border-slate-200 hover:border-[#5B63F6]"
          }`}
        >
          <Calendar01Icon size={16} />
          <span>{dateFiltree ? dateFiltree : t("common.date")}</span>
          <ArrowDown01Icon size={14} />
        </button>

        <button
          type="button"
          onClick={() => setModalTypeOuvert(true)}
          className={`px-4 py-2 rounded-xl border font-bold transition-all flex items-center gap-2 cursor-pointer ${
            typesFiltres.length > 0
              ? "bg-[#5B63F6] text-white border-[#5B63F6] shadow-sm shadow-indigo-500/20"
              : "bg-white text-slate-700 border-slate-200 hover:border-[#5B63F6]"
          }`}
        >
          <ShoppingBag01Icon size={16} />
          <span>
            {typesFiltres.length > 0
              ? `${t("clients.orderType")} (${typesFiltres.length})`
              : t("clients.orderType")}
          </span>
          <ArrowDown01Icon size={14} />
        </button>

        <button
          type="button"
          onClick={() => setModalStatutOuvert(true)}
          className={`px-4 py-2 rounded-xl border font-bold transition-all flex items-center gap-2 cursor-pointer ${
            statutsFiltres.length > 0
              ? "bg-[#5B63F6] text-white border-[#5B63F6] shadow-sm shadow-indigo-500/20"
              : "bg-white text-slate-700 border-slate-200 hover:border-[#5B63F6]"
          }`}
        >
          <FlashIcon size={16} />
          <span>
            {statutsFiltres.length > 0
              ? `${t("clients.orderStatus")} (${statutsFiltres.length})`
              : t("clients.orderStatus")}
          </span>
          <ArrowDown01Icon size={14} />
        </button>

        {(statutsFiltres.length > 0 || typesFiltres.length > 0 || dateFiltree) && (
          <button
            type="button"
            onClick={reinitialiserFiltres}
            className="ml-auto text-rose-500 hover:text-rose-600 font-bold flex items-center gap-1.5 transition-colors cursor-pointer"
          >
            <RefreshIcon size={16} />
            <span>{t("clients.resetFilter")}</span>
          </button>
        )}
      </div>

      {/* Main Grid Layout: Left Table + Right Sticky Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-start">
        {/* Left Customer Table */}
        <div
          className={`bg-white rounded-3xl p-6 shadow-sm border border-slate-100/80 space-y-6 ${
            clientSelectionne ? "lg:col-span-2" : "lg:col-span-3"
          }`}
        >
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-xs font-semibold">
                  <th className="py-4 px-4 font-bold">
                    {t("clients.name")} <span className="inline-block text-[10px] ml-0.5">▾</span>
                  </th>
                  <th className="py-4 px-4 font-bold">
                    {t("clients.email")} <span className="inline-block text-[10px] ml-0.5">▾</span>
                  </th>
                  <th className="py-4 px-4 font-bold">
                    {t("clients.phone")} <span className="inline-block text-[10px] ml-0.5">▾</span>
                  </th>
                  <th className="py-4 px-4 text-center font-bold">
                    {t("clients.gender")} <span className="inline-block text-[10px] ml-0.5">▾</span>
                  </th>
                  <th className="py-4 px-4 text-center font-bold">{t("clients.actions")}</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100/60 text-xs text-slate-700 font-medium">
                {clientsFiltres.map((client) => {
                  const estSelectionne = clientSelectionne?.id === client.id;
                  const estPopoverOuvert = popoverOuvertId === client.id;

                  return (
                    <tr
                      key={client.id}
                      onClick={() => selectionnerClientHandler(client)}
                      className={`hover:bg-slate-50/80 transition-colors cursor-pointer ${
                        estSelectionne ? "bg-indigo-50/40" : ""
                      }`}
                    >
                      {/* Name with Avatar */}
                      <td className="py-4 px-4 font-semibold text-slate-800">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-slate-100 text-[#5B63F6] font-extrabold flex items-center justify-center text-xs overflow-hidden shrink-0 border border-slate-200/60">
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
                          <span className="font-bold text-slate-800">{client.nom}</span>
                        </div>
                      </td>

                      {/* Email */}
                      <td className="py-4 px-4 text-slate-500 font-normal">{client.email}</td>

                      {/* Phone number */}
                      <td className="py-4 px-4 text-slate-500 font-normal">{client.telephone}</td>

                      {/* Gender Pill */}
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <span
                          className={`px-4 py-1.5 rounded-full text-xs font-bold ${
                            client.genre === "Female"
                              ? "bg-[#FCE8E6] text-[#F43F5E]"
                              : "bg-[#E8F0FE] text-[#3B82F6]"
                          }`}
                        >
                          {client.genre === "Female" ? t("clients.female") : t("clients.male")}
                        </span>
                      </td>

                      {/* Actions Column */}
                      <td className="py-4 px-4 text-center whitespace-nowrap relative">
                        <button
                          type="button"
                          onClick={(e) => {
                            e.stopPropagation();
                            setPopoverOuvertId(estPopoverOuvert ? null : client.id);
                            selectionnerClientHandler(client);
                          }}
                          className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-500 font-bold transition-colors inline-flex items-center justify-center cursor-pointer"
                        >
                          <MoreHorizontalIcon size={18} />
                        </button>

                        {/* Interactive Popover Dropdown */}
                        {estPopoverOuvert && (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            className="absolute right-6 top-12 z-20 w-32 bg-white rounded-2xl p-1.5 shadow-xl border border-slate-100 animate-fadeIn text-left"
                          >
                            <button
                              type="button"
                              onClick={() => {
                                setPopoverOuvertId(null);
                                ouvrirToutesLesInfos(client);
                              }}
                              className="w-full px-3 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
                            >
                              <Edit02Icon size={14} className="text-blue-500" />
                              <span>{t("common.edit")}</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => {
                                setPopoverOuvertId(null);
                                supprimerClient(client.id);
                              }}
                              className="w-full px-3 py-2 text-xs font-bold text-rose-600 hover:bg-rose-50 rounded-xl flex items-center gap-2 transition-colors cursor-pointer"
                            >
                              <Delete02Icon size={14} />
                              <span>{t("common.delete")}</span>
                            </button>
                          </div>
                        )}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {clientsFiltres.length === 0 && (
            <div className="text-center py-10 text-slate-400 text-xs font-medium">
              {t("clients.noClientsFound")}
            </div>
          )}
        </div>

        {/* Right Sticky Customer Detail Panel */}
        {clientSelectionne && (
          <div className="lg:col-span-1 sticky top-6 self-start max-h-[calc(100vh-3rem)] overflow-y-auto pr-1 animate-fadeIn">
            <FicheDetailClient
              client={clientSelectionne}
              onFermer={() => setClientSelectionne(null)}
              onSupprimer={supprimerClient}
              onOuvrirToutesLesInfos={ouvrirToutesLesInfos}
            />
          </div>
        )}
      </div>

      {/* Modal Toutes les infos Client */}
      <ModalClientToutesLesInfos
        ouvert={modalToutesInfosOuvert}
        client={clientAVisualiserIntegral}
        onFermer={() => setModalToutesInfosOuvert(false)}
      />

      {/* Pop-up Modals */}
      <ModalAjouterClient
        ouvert={modalAjouterOuvert}
        onFermer={() => setModalAjouterOuvert(false)}
        onAjouter={ajouterClient}
      />

      <ModalFiltreStatut
        ouvert={modalStatutOuvert}
        onFermer={() => setModalStatutOuvert(false)}
        statutsSelectionnes={statutsFiltres}
        onAppliquer={(sts) => setStatutsFiltres(sts)}
      />

      <ModalFiltreType
        ouvert={modalTypeOuvert}
        onFermer={() => setModalTypeOuvert(false)}
        typesSelectionnes={typesFiltres}
        onAppliquer={(tps) => setTypesFiltres(tps)}
      />

      <ModalFiltreCalendrier
        ouvert={modalCalendrierOuvert}
        onFermer={() => setModalCalendrierOuvert(false)}
        dateSelectionnee={dateFiltree}
        onAppliquer={(dt) => setDateFiltree(dt)}
      />

      <ModalExportation
        ouvert={modalExportOuvert}
        titre={t("clients.exportReportTitle")}
        description={t("clients.exportReportDesc")}
        nombreElements={clientsComplets.length}
        onFermer={() => setModalExportOuvert(false)}
        onExporter={executerExportationClients}
      />
    </div>
  );
}
