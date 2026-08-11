import React from "react";
import { Bouton } from "./bouton";

interface PaginationProps {
  pageActuelle: number;
  totalPages: number;
  surChangementPage: (page: number) => void;
}

export const Pagination: React.FC<PaginationProps> = ({
  pageActuelle,
  totalPages,
  surChangementPage,
}) => {
  return (
    <div className="flex items-center justify-between py-3 px-1 text-sm text-slate-400">
      <div>
        Page <span className="font-semibold text-slate-200">{pageActuelle}</span> sur{" "}
        <span className="font-semibold text-slate-200">{totalPages || 1}</span>
      </div>
      <div className="flex gap-2">
        <Bouton
          variante="neutre"
          taille="sm"
          disabled={pageActuelle <= 1}
          onClick={() => surChangementPage(pageActuelle - 1)}
        >
          Précédent
        </Bouton>
        <Bouton
          variante="neutre"
          taille="sm"
          disabled={pageActuelle >= totalPages}
          onClick={() => surChangementPage(pageActuelle + 1)}
        >
          Suivant
        </Bouton>
      </div>
    </div>
  );
};
