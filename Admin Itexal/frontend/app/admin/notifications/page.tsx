"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useNotifications } from "@/lib/context/NotificationContext";
import { useLanguage } from "@/lib/context/LanguageContext";
import { ModalConfirmation } from "@/composants-communs/modal-confirmation";
import {
  Notification01Icon,
  ShoppingBag01Icon,
  Store01Icon,
  UserIcon,
  AlertCircleIcon,
  Discount01Icon,
  Tick01Icon,
  Delete02Icon,
  Cancel01Icon,
  Clock01Icon,
  ArrowRight01Icon,
} from "hugeicons-react";

export default function PageNotificationsAdmin() {
  const {
    notifications,
    nombreNonLues,
    marquerCommeLue,
    basculerLecture,
    toutMarquerCommeLu,
    supprimerNotification,
    purgerToutesNotifications,
  } = useNotifications();

  const { t } = useLanguage();
  const [filtreType, setFiltreType] = useState<string>("Tous");
  const [modalPurgerOuvert, setModalPurgerOuvert] = useState(false);

  const renduIconeNotification = (type: string) => {
    switch (type) {
      case "commande":
        return <ShoppingBag01Icon size={20} className="text-[#4880FF]" />;
      case "stock":
        return <Store01Icon size={20} className="text-amber-500" />;
      case "securite":
        return <AlertCircleIcon size={20} className="text-rose-500" />;
      default:
        return <Notification01Icon size={20} className="text-slate-500" />;
    }
  };

  const notifsFiltrees = notifications.filter((n) => {
    if (filtreType === "Tous") return true;
    if (filtreType === "Non lues") return !n.lue;
    return n.type === filtreType;
  });

  const countCommandes = notifications.filter((n) => n.type === "commande").length;
  const countStock = notifications.filter((n) => n.type === "stock").length;
  const countSecurite = notifications.filter((n) => n.type === "securite").length;

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* Title & Action Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <h1 className="text-3xl font-extrabold text-slate-800 tracking-tight">
              {t("centreNotifications")}
            </h1>
            {nombreNonLues > 0 && (
              <span className="px-3.5 py-1 bg-rose-500 text-white font-black text-xs rounded-full shadow-md shadow-rose-500/30 animate-pulse">
                {nombreNonLues} {t("nonLues")}
              </span>
            )}
          </div>
          <p className="text-xs text-slate-500 font-medium mt-1">
            Gestion centralisée des alertes en temps réel pour le back-office ITexal.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toutMarquerCommeLu}
            className="px-4 py-2.5 bg-white border border-slate-200 hover:bg-slate-50 text-slate-700 font-bold text-xs rounded-xl shadow-xs transition-all flex items-center gap-1.5"
          >
            <Tick01Icon size={16} />
            <span>{t("toutMarquerLu")}</span>
          </button>

          <button
            type="button"
            onClick={() => setModalPurgerOuvert(true)}
            className="px-4 py-2.5 bg-rose-50 hover:bg-rose-500 text-rose-600 hover:text-white font-bold text-xs rounded-xl border border-rose-200 transition-all flex items-center gap-1.5"
          >
            <Delete02Icon size={16} />
            <span>{t("purgerTout")}</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Bar */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-6">
        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {t("nonLues")}
            </span>
            <h3 className="text-2xl font-extrabold text-rose-600 mt-1">
              {nombreNonLues}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-rose-50 text-rose-600 flex items-center justify-center font-bold">
            <Notification01Icon size={24} strokeWidth={2} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {t("alertesCommandes")}
            </span>
            <h3 className="text-2xl font-extrabold text-[#4880FF] mt-1">
              {countCommandes}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#4880FF] flex items-center justify-center font-bold">
            <ShoppingBag01Icon size={24} strokeWidth={2} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {t("alertesStock")}
            </span>
            <h3 className="text-2xl font-extrabold text-amber-600 mt-1">
              {countStock}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center font-bold">
            <Store01Icon size={24} strokeWidth={2} />
          </div>
        </div>

        <div className="bg-white rounded-3xl p-5 border border-slate-100 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              {t("securiteLog")}
            </span>
            <h3 className="text-2xl font-extrabold text-slate-800 mt-1">
              {countSecurite}
            </h3>
          </div>
          <div className="w-12 h-12 rounded-2xl bg-slate-100 text-slate-700 flex items-center justify-center font-bold">
            <AlertCircleIcon size={24} strokeWidth={2} />
          </div>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="bg-white rounded-2xl p-2 shadow-sm border border-slate-100 flex items-center gap-2 overflow-x-auto text-xs font-bold">
        {["Tous", "Non lues", "commande", "stock", "securite"].map((typeFiltre) => (
          <button
            key={typeFiltre}
            type="button"
            onClick={() => setFiltreType(typeFiltre)}
            className={`px-4 py-2 rounded-xl transition-all whitespace-nowrap capitalize ${
              filtreType === typeFiltre
                ? "bg-[#4880FF] text-white shadow-md shadow-blue-500/20"
                : "text-slate-600 hover:bg-slate-100"
            }`}
          >
            {typeFiltre}
          </button>
        ))}
      </div>

      {/* Notifications List */}
      <div className="space-y-4">
        {notifsFiltrees.map((notif) => (
          <div
            key={notif.id}
            onClick={() => marquerCommeLue(notif.id)}
            className={`p-5 rounded-3xl border transition-all flex items-start justify-between gap-4 cursor-pointer hover:shadow-md ${
              notif.lue
                ? "bg-white border-slate-100 opacity-80"
                : "bg-blue-50/40 border-blue-100 shadow-sm ring-1 ring-blue-200/50"
            }`}
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200/80 shadow-xs flex items-center justify-center text-xl shrink-0">
                {renduIconeNotification(notif.type)}
              </div>

              <div className="space-y-1">
                <div className="flex items-center gap-3">
                  <h3 className="font-extrabold text-slate-900 text-sm">
                    {notif.titre}
                  </h3>
                  {notif.important && (
                    <span className="px-2.5 py-0.5 rounded-md bg-rose-100 text-rose-700 font-bold text-[10px]">
                      Urgent
                    </span>
                  )}
                  {!notif.lue && (
                    <span className="w-2.5 h-2.5 rounded-full bg-[#4880FF] animate-ping"></span>
                  )}
                </div>

                <p className="text-xs text-slate-600 font-medium">
                  {notif.message}
                </p>

                <div className="flex items-center gap-4 pt-2">
                  <span className="text-[10px] font-bold text-slate-400 font-mono flex items-center gap-1">
                    <Clock01Icon size={12} />
                    <span>{notif.horodatage}</span>
                  </span>

                  <Link
                    href={`/admin/${notif.type === "commande" ? "commandes" : notif.type === "stock" ? "stocks" : "journal"}`}
                    className="text-[11px] font-extrabold text-[#4880FF] hover:underline flex items-center gap-1 bg-white px-2.5 py-1 rounded-lg border border-blue-100"
                  >
                    <span>Inspecter dans le module</span>
                    <ArrowRight01Icon size={12} />
                  </Link>
                </div>
              </div>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                supprimerNotification(notif.id);
              }}
              aria-label="Supprimer la notification"
              className="w-8 h-8 rounded-full bg-slate-50 hover:bg-rose-50 text-slate-400 hover:text-rose-500 font-bold flex items-center justify-center text-xs transition-colors shrink-0"
              title="Supprimer la notification"
            >
              <Cancel01Icon size={14} />
            </button>
          </div>
        ))}

        {notifsFiltrees.length === 0 && (
          <div className="bg-white rounded-3xl p-12 text-center border border-slate-100 text-slate-400 text-xs">
            Aucune notification dans cette catégorie.
          </div>
        )}
      </div>

      {/* Confirmation modal for Purge */}
      <ModalConfirmation
        ouvert={modalPurgerOuvert}
        titre="Purger toutes les notifications"
        message="Voulez-vous vraiment effacer définitivement l'ensemble des notifications de votre centre d'alerte ?"
        texteConfirmer="Purger tout"
        variante="danger"
        onConfirmer={() => {
          purgerToutesNotifications();
          setModalPurgerOuvert(false);
        }}
        onAnnuler={() => setModalPurgerOuvert(false)}
      />
    </div>
  );
}
