"use client";

import React, { useState } from "react";
import { ModalFiltreStatut } from "@/modules/clients/composants/modal-filtre-statut";
import { ModalFiltreType } from "@/modules/clients/composants/modal-filtre-type";
import { ModalFiltreCalendrier } from "@/modules/clients/composants/modal-filtre-calendrier";
import { ModalAjouterClient } from "@/modules/clients/composants/modal-ajouter-client";
import { FicheDetailClient, ClientComplet } from "@/modules/clients/composants/fiche-detail-client";
import { ModalClientToutesLesInfos } from "@/modules/clients/composants/modal-client-toutes-les-infos";
import {
  Add01Icon,
  FilterIcon,
  Calendar01Icon,
  ShoppingBag01Icon,
  FlashIcon,
  ArrowDown01Icon,
  RefreshIcon,
  MoreHorizontalIcon,
  Tick01Icon,
  Delete02Icon,
} from "hugeicons-react";

export default function PageClientsAdmin() {
  const [clients, setClients] = useState<ClientComplet[]>([
    {
      id: "00001",
      nom: "Christine Brooks",
      email: "christine.b@gmail.com",
      telephone: "+237 699 12 34 56",
      adresse: "089 Kutch Green Apt. 448, Douala Akwa",
      dateInscrit: "04 Sep 2026",
      typeGamme: "Soin Visage",
      statut: "Completed",
      genre: "Female",
      metier: "Client VIP - Gamme Visage",
      totalDepense: 455000,
      totalCommandes: 14,
    },
    {
      id: "00002",
      nom: "Rosie Pearson",
      email: "rosie.p@yahoo.fr",
      telephone: "+237 677 88 99 00",
      adresse: "979 Immanuel Ferry Suite 526, Yaoundé Bastos",
      dateInscrit: "28 May 2026",
      typeGamme: "Gamme Capillaire",
      statut: "Processing",
      genre: "Female",
      metier: "Client Régulier",
      totalDepense: 280000,
      totalCommandes: 8,
    },
    {
      id: "00003",
      nom: "Darrell Caldwell",
      email: "darrell.caldwell@gmail.com",
      telephone: "+237 655 44 33 22",
      adresse: "8587 Frida Ports, Bafoussam Centre",
      dateInscrit: "23 Nov 2026",
      typeGamme: "Huiles Essentielles",
      statut: "Rejected",
      genre: "Male",
      metier: "Nouveau Client",
      totalDepense: 45000,
      totalCommandes: 2,
    },
    {
      id: "00004",
      nom: "Gilbert Johnston",
      email: "gilbert.j@hotmail.com",
      telephone: "+237 690 11 22 33",
      adresse: "768 Destiny Lake Suite 600, Kribi Beach",
      dateInscrit: "05 Feb 2026",
      typeGamme: "Soin du Corps",
      statut: "Completed",
      genre: "Male",
      metier: "Client Fidéle",
      totalDepense: 610000,
      totalCommandes: 19,
    },
    {
      id: "00005",
      nom: "Alan Cain",
      email: "alan.cain@itexal.cm",
      telephone: "+237 671 99 88 77",
      adresse: "042 Mylene Throughway, Garoua",
      dateInscrit: "29 Jul 2026",
      typeGamme: "Fashion & Beauty",
      statut: "Processing",
      genre: "Male",
      metier: "Client Pro",
      totalDepense: 195000,
      totalCommandes: 5,
    },
    {
      id: "00006",
      nom: "Alfred Murray",
      email: "alfred.m@gmail.com",
      telephone: "+237 695 66 77 88",
      adresse: "543 Weimann Mountain, Douala Bonapriso",
      dateInscrit: "14 Feb 2026",
      typeGamme: "Soin Visage",
      statut: "Completed",
      genre: "Male",
      metier: "Client Premium",
      totalDepense: 380000,
      totalCommandes: 11,
    },
  ]);

  const [clientSelectionne, setClientSelectionne] = useState<ClientComplet | null>(clients[0]);
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

  const clientsFiltres = clients.filter((c) => {
    const matchStatut =
      statutsFiltres.length === 0 ? true : statutsFiltres.includes(c.statut);

    const matchType =
      typesFiltres.length === 0 ? true : typesFiltres.includes(c.typeGamme);

    const matchDate =
      !dateFiltree ? true : c.dateInscrit.toLowerCase().includes(dateFiltree.toLowerCase());

    return matchStatut && matchType && matchDate;
  });

  const ouvrirToutesLesInfos = (client: ClientComplet) => {
    setClientAVisualiserIntegral(client);
    setModalToutesInfosOuvert(true);
  };

  const ajouterClient = (nouveau: {
    nom: string;
    email: string;
    telephone: string;
    adresse: string;
    genre: "Male" | "Female";
    typeGamme: string;
  }) => {
    const nouveauClient: ClientComplet = {
      id: `0000${clients.length + 1}`,
      nom: nouveau.nom,
      email: nouveau.email,
      telephone: nouveau.telephone,
      adresse: nouveau.adresse,
      dateInscrit: new Date().toLocaleDateString("fr-FR"),
      typeGamme: nouveau.typeGamme,
      statut: "Processing",
      genre: nouveau.genre,
      metier: "Nouveau Client ITexal",
      totalDepense: 0,
      totalCommandes: 0,
    };

    setClients((prev) => [nouveauClient, ...prev]);
    setClientSelectionne(nouveauClient);
    setNotification(`Client ${nouveau.nom} ajouté avec succès !`);
    setTimeout(() => setNotification(""), 3500);
  };

  const supprimerClient = (id: string) => {
    if (confirm("Voulez-vous vraiment supprimer ce client ?")) {
      setClients((prev) => prev.filter((c) => c.id !== id));
      if (clientSelectionne?.id === id) {
        setClientSelectionne(null);
      }
      setNotification("Client supprimé avec succès.");
      setTimeout(() => setNotification(""), 3000);
    }
  };

  const reinitialiserFiltres = () => {
    setStatutsFiltres([]);
    setTypesFiltres([]);
    setDateFiltree("");
    setNotification("Tous les filtres ont été réinitialisés.");
    setTimeout(() => setNotification(""), 3000);
  };

  const renduBadgeStatut = (statut: ClientComplet["statut"]) => {
    switch (statut) {
      case "Completed":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-lg bg-[#E6F4EA] text-[#137333] text-xs font-bold">
            Completed
          </span>
        );
      case "Processing":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-lg bg-[#F4F3FF] text-[#7A5AF8] text-xs font-bold">
            Processing
          </span>
        );
      case "Rejected":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-lg bg-[#FEE4E2] text-[#F04438] text-xs font-bold">
            Rejected
          </span>
        );
      case "On Hold":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-lg bg-[#FEF0C7] text-[#DC6803] text-xs font-bold">
            On Hold
          </span>
        );
      case "In Transit":
        return (
          <span className="inline-flex items-center px-3 py-1 rounded-lg bg-[#F9F5FF] text-[#9E77ED] text-xs font-bold">
            In Transit
          </span>
        );
    }
  };

  return (
    <div className="space-y-6">
      {/* Title & Add Customer Button */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
            Customer List
          </h1>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Gestion du répertoire clients et vue analytique détaillée avec graphiques d'achats.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setModalAjouterOuvert(true)}
          className="px-6 py-3 bg-[#4880FF] hover:bg-blue-600 text-white font-bold text-xs rounded-2xl shadow-lg shadow-blue-500/20 transition-all self-start sm:self-auto flex items-center gap-2"
        >
          <Add01Icon size={18} strokeWidth={2.5} /> Add Customer
        </button>
      </div>

      {notification && (
        <div className="p-4 bg-blue-50 border border-blue-200 text-[#4880FF] font-bold text-xs rounded-2xl animate-fadeIn flex items-center gap-2">
          <Tick01Icon size={16} /> <span>{notification}</span>
        </div>
      )}

      {/* Filter Bar */}
      <div className="bg-white rounded-2xl p-4 shadow-sm border border-slate-100 flex items-center flex-wrap gap-4 text-xs font-semibold text-slate-600">
        <div className="flex items-center gap-2 pr-4 border-r border-slate-200">
          <FilterIcon size={18} className="text-[#4880FF]" />
          <span className="font-extrabold text-slate-800">Filter By</span>
        </div>

        {/* Date Popup */}
        <button
          type="button"
          onClick={() => setModalCalendrierOuvert(true)}
          className={`px-4 py-2 rounded-xl border font-bold transition-all flex items-center gap-2 ${
            dateFiltree
              ? "bg-[#4880FF] text-white border-[#4880FF] shadow-sm shadow-blue-500/20"
              : "bg-white text-slate-700 border-slate-200 hover:border-[#4880FF]"
          }`}
        >
          <Calendar01Icon size={16} />
          <span>{dateFiltree ? dateFiltree : "Date"}</span>
          <ArrowDown01Icon size={14} />
        </button>

        {/* Order Type Popup */}
        <button
          type="button"
          onClick={() => setModalTypeOuvert(true)}
          className={`px-4 py-2 rounded-xl border font-bold transition-all flex items-center gap-2 ${
            typesFiltres.length > 0
              ? "bg-[#4880FF] text-white border-[#4880FF] shadow-sm shadow-blue-500/20"
              : "bg-white text-slate-700 border-slate-200 hover:border-[#4880FF]"
          }`}
        >
          <ShoppingBag01Icon size={16} />
          <span>
            {typesFiltres.length > 0
              ? `Order Type (${typesFiltres.length})`
              : "Order Type"}
          </span>
          <ArrowDown01Icon size={14} />
        </button>

        {/* Order Status Popup */}
        <button
          type="button"
          onClick={() => setModalStatutOuvert(true)}
          className={`px-4 py-2 rounded-xl border font-bold transition-all flex items-center gap-2 ${
            statutsFiltres.length > 0
              ? "bg-[#4880FF] text-white border-[#4880FF] shadow-sm shadow-blue-500/20"
              : "bg-white text-slate-700 border-slate-200 hover:border-[#4880FF]"
          }`}
        >
          <FlashIcon size={16} />
          <span>
            {statutsFiltres.length > 0
              ? `Order Status (${statutsFiltres.length})`
              : "Order Status"}
          </span>
          <ArrowDown01Icon size={14} />
        </button>

        {/* Reset Filter Button */}
        {(statutsFiltres.length > 0 || typesFiltres.length > 0 || dateFiltree) && (
          <button
            type="button"
            onClick={reinitialiserFiltres}
            className="ml-auto text-rose-500 hover:text-rose-600 font-bold flex items-center gap-1.5 transition-colors"
          >
            <RefreshIcon size={16} />
            <span>Reset Filter</span>
          </button>
        )}
      </div>

      {/* Main Grid: Left Table list + Right Customer Detail Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Customer Table (2 cols) */}
        <div className={`bg-white rounded-3xl p-6 shadow-sm border border-slate-100 space-y-6 ${clientSelectionne ? "lg:col-span-2" : "lg:col-span-3"}`}>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-100 text-slate-400 text-xs font-bold uppercase tracking-wider">
                  <th className="py-4 px-4">NAME</th>
                  <th className="py-4 px-4">EMAIL</th>
                  <th className="py-4 px-4">PHONE NUMBER</th>
                  <th className="py-4 px-4 text-center">GENDER</th>
                  <th className="py-4 px-4 text-center">STATUS</th>
                  <th className="py-4 px-4 text-center">ACTIONS</th>
                </tr>
              </thead>

              <tbody className="divide-y divide-slate-100 text-xs text-slate-700 font-medium">
                {clientsFiltres.map((client) => {
                  const estSelectionne = clientSelectionne?.id === client.id;
                  return (
                    <tr
                      key={client.id}
                      onClick={() => setClientSelectionne(client)}
                      className={`hover:bg-slate-50/80 transition-colors cursor-pointer ${
                        estSelectionne ? "bg-blue-50/40" : ""
                      }`}
                    >
                      {/* Name with Avatar */}
                      <td className="py-4 px-4 font-semibold text-slate-900">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-full bg-blue-50 text-[#4880FF] font-bold flex items-center justify-center text-xs overflow-hidden shrink-0">
                            {client.avatar ? (
                              <img src={client.avatar} alt={client.nom} className="w-full h-full object-cover" />
                            ) : (
                              client.nom.slice(0, 2).toUpperCase()
                            )}
                          </div>
                          <span className="font-bold text-slate-900">{client.nom}</span>
                        </div>
                      </td>

                      <td className="py-4 px-4 text-slate-500 font-mono">{client.email}</td>

                      <td className="py-4 px-4 text-slate-500">{client.telephone}</td>

                      {/* Gender Pill */}
                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <span
                          className={`px-3 py-1 rounded-full text-xs font-bold ${
                            client.genre === "Female"
                              ? "bg-rose-50 text-rose-600"
                              : "bg-blue-50 text-[#4880FF]"
                          }`}
                        >
                          {client.genre || "Male"}
                        </span>
                      </td>

                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        {renduBadgeStatut(client.statut)}
                      </td>

                      <td className="py-4 px-4 text-center whitespace-nowrap">
                        <div className="flex items-center justify-center gap-1.5">
                          {/* Bouton Plus (+) direct pour ouvrir toutes les infos du client */}
                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              ouvrirToutesLesInfos(client);
                            }}
                            className="w-7 h-7 rounded-lg bg-blue-50 hover:bg-[#4880FF] text-[#4880FF] hover:text-white font-extrabold text-sm transition-all flex items-center justify-center"
                            title="Voir toutes les informations du client (+)"
                          >
                            <Add01Icon size={16} strokeWidth={2.5} />
                          </button>

                          <button
                            type="button"
                            onClick={(e) => {
                              e.stopPropagation();
                              setClientSelectionne(client);
                            }}
                            aria-label="Sélectionner le client"
                            className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 font-bold transition-colors flex items-center justify-center"
                          >
                            <MoreHorizontalIcon size={16} />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          {clientsFiltres.length === 0 && (
            <div className="text-center py-10 text-slate-400 text-xs font-medium">
              Aucun client ne correspond aux filtres.
            </div>
          )}
        </div>

        {/* Right Customer Detail Panel */}
        {clientSelectionne && (
          <div className="lg:col-span-1">
            <FicheDetailClient
              client={clientSelectionne}
              onFermer={() => setClientSelectionne(null)}
              onSupprimer={supprimerClient}
              onOuvrirToutesLesInfos={ouvrirToutesLesInfos}
            />
          </div>
        )}
      </div>

      {/* Modal Toutes les infos Client (+) */}
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
    </div>
  );
}
