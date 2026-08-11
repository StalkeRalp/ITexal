import React from "react";

export default function LoadingAdmin() {
  return (
    <div className="fixed inset-0 z-[9999] bg-slate-900/80 backdrop-blur-md flex flex-col items-center justify-center animate-fadeIn">
      <div className="relative w-20 h-20 flex items-center justify-center">
        <div className="loader"></div>
      </div>
      <p className="mt-8 text-xs font-black tracking-widest text-[#4880FF] uppercase animate-pulse">
        Chargement de l'espace Administrateur...
      </p>
    </div>
  );
}
