import React from "react";

interface CarteStatistiqueProps {
  titre: string;
  valeur: string | number;
  variation?: string;
  estPositive?: boolean;
}

export const CarteStatistique: React.FC<CarteStatistiqueProps> = ({
  titre,
  valeur,
  variation,
  estPositive = true,
}) => {
  return (
    <div className="p-5 rounded-xl bg-slate-900 border border-slate-800 flex flex-col gap-2">
      <span className="text-xs font-medium text-slate-400">{titre}</span>
      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-bold text-slate-100">{valeur}</span>
        {variation && (
          <span
            className={`text-xs font-semibold px-2 py-0.5 rounded-md ${
              estPositive
                ? "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20"
                : "bg-rose-500/10 text-rose-400 border border-rose-500/20"
            }`}
          >
            {variation}
          </span>
        )}
      </div>
    </div>
  );
};
