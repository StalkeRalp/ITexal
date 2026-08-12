"use client";

import React, { useEffect, useState } from "react";
import { Download01Icon, Cancel01Icon } from "hugeicons-react";

export const PwaInstaller: React.FC = () => {
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [banniereVisible, setBanniereVisible] = useState(false);

  useEffect(() => {
    // Enregistrement du Service Worker
    if (typeof window !== "undefined" && "serviceWorker" in navigator) {
      navigator.serviceWorker
        .register("/sw.js")
        .then((reg) => console.log("PWA Service Worker enregistré :", reg.scope))
        .catch((err) => console.error("Erreur enregistrement SW PWA :", err));
    }

    const handler = (e: Event) => {
      e.preventDefault();
      setDeferredPrompt(e);
      setBanniereVisible(true);
    };

    window.addEventListener("beforeinstallprompt", handler);
    return () => window.removeEventListener("beforeinstallprompt", handler);
  }, []);

  const installerPwa = async () => {
    if (!deferredPrompt) return;
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === "accepted") {
      console.log("PWA Cosmetic Admin installée !");
    }
    setDeferredPrompt(null);
    setBanniereVisible(false);
  };

  if (!banniereVisible) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50 max-w-sm bg-white rounded-3xl p-4 shadow-2xl border border-indigo-100 animate-fadeIn flex items-center justify-between gap-3 text-slate-800">
      <div className="flex items-center gap-3">
        <div className="w-12 h-12 rounded-2xl bg-white border border-slate-100 shadow-md flex items-center justify-center p-1 shrink-0 overflow-hidden">
          <img
            src="/Admin Cosmetic.png"
            alt="Logo Cosmetic Admin"
            className="w-full h-full object-contain"
            onError={(e) => {
              (e.target as HTMLElement).style.display = "none";
            }}
          />
        </div>
        <div>
          <h4 className="font-extrabold text-xs text-slate-900">Installer Cosmetic Admin</h4>
          <p className="text-[11px] text-slate-400 font-medium">Application d'administration rapide</p>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={installerPwa}
          className="px-3 py-1.5 bg-[#5B63F6] hover:bg-indigo-600 text-white font-extrabold rounded-xl text-xs shadow-sm transition-all flex items-center gap-1 cursor-pointer"
        >
          <Download01Icon size={14} />
          <span>Installer</span>
        </button>
        <button
          type="button"
          onClick={() => setBanniereVisible(false)}
          className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-400 font-bold flex items-center justify-center transition-colors cursor-pointer"
        >
          <Cancel01Icon size={14} />
        </button>
      </div>
    </div>
  );
};
