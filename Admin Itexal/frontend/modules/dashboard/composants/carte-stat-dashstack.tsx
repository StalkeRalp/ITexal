import React from "react";
import { ChartIncreaseIcon, ChartDecreaseIcon } from "hugeicons-react";

interface CarteStatProps {
  titre: string;
  valeur: string;
  icone: React.ReactNode;
  couleurFondIcone: string;
  couleurTexteIcone: string;
  variation: string;
  estPositive: boolean;
  textePeriode: string;
}

export const CarteStatDashStack: React.FC<CarteStatProps> = ({
  titre,
  valeur,
  icone,
  couleurFondIcone,
  couleurTexteIcone,
  variation,
  estPositive,
  textePeriode,
}) => {
  return (
    <div className="bg-white rounded-2xl p-6 shadow-sm border border-slate-100 flex flex-col justify-between transition-all hover:shadow-md">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-500">{titre}</p>

          <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-800 mt-2 tracking-tight">
            {valeur}
          </h3>
        </div>

        {/* Soft rounded icon box */}
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shadow-xs shrink-0"
          style={{ backgroundColor: couleurFondIcone, color: couleurTexteIcone }}
        >
          {icone}
        </div>
      </div>

      {/* Trend indicator */}
      <div className="mt-6 flex items-center gap-1.5 text-xs font-medium">
        <span
          className={`flex items-center gap-1 font-bold ${
            estPositive ? "text-[#00B69B]" : "text-[#F35421]"
          }`}
        >
          {estPositive ? (
            <ChartIncreaseIcon size={16} strokeWidth={2.5} />
          ) : (
            <ChartDecreaseIcon size={16} strokeWidth={2.5} />
          )}
          {variation}
        </span>
        <span className="text-slate-400">{textePeriode}</span>
      </div>
    </div>
  );
};
