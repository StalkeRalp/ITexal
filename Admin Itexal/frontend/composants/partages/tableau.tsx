import React from "react";

export interface ColonneTableau<T> {
  cle: string;
  enTete: string;
  rendu?: (element: T) => React.ReactNode;
  alignement?: "gauche" | "centre" | "droite";
}

interface TableauProps<T> {
  colonnes: ColonneTableau<T>[];
  donnees: T[];
  cleExtraction: (element: T) => string | number;
  messageVide?: string;
}

export function Tableau<T>({
  colonnes,
  donnees,
  cleExtraction,
  messageVide = "Aucune donnée disponible",
}: TableauProps<T>) {
  return (
    <div className="w-full overflow-x-auto rounded-xl border border-slate-800 bg-slate-900/60 backdrop-blur">
      <table className="w-full text-left text-sm text-slate-300">
        <thead className="bg-slate-800/80 text-xs uppercase font-semibold text-slate-400 border-b border-slate-800">
          <tr>
            {colonnes.map((col) => (
              <th
                key={col.cle}
                className={`px-6 py-3.5 ${
                  col.alignement === "droite"
                    ? "text-right"
                    : col.alignement === "centre"
                    ? "text-center"
                    : "text-left"
                }`}
              >
                {col.enTete}
              </th>
            ))}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-800/60">
          {donnees.length === 0 ? (
            <tr>
              <td colSpan={colonnes.length} className="px-6 py-8 text-center text-slate-500 italic">
                {messageVide}
              </td>
            </tr>
          ) : (
            donnees.map((item) => (
              <tr key={cleExtraction(item)} className="hover:bg-slate-800/40 transition-colors">
                {colonnes.map((col) => (
                  <td
                    key={col.cle}
                    className={`px-6 py-4 ${
                      col.alignement === "droite"
                        ? "text-right"
                        : col.alignement === "centre"
                        ? "text-center"
                        : "text-left"
                    }`}
                  >
                    {col.rendu
                      ? col.rendu(item)
                      : String((item as Record<string, unknown>)[col.cle] ?? "")}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
