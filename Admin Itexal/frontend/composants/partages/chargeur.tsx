import React from "react";

interface ChargeurProps {
  message?: string;
}

export const Chargeur: React.FC<ChargeurProps> = ({
  message = "Chargement en cours...",
}) => {
  return (
    <div className="flex flex-col items-center justify-center py-12 gap-3">
      <div className="w-10 h-10 border-4 border-indigo-500/30 border-t-indigo-500 rounded-full animate-spin"></div>
      <p className="text-sm font-medium text-slate-400">{message}</p>
    </div>
  );
};
