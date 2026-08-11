import React from "react";
import { Modal } from "./modal";
import { Bouton } from "./bouton";

interface ConfirmationProps {
  ouvert: boolean;
  titre: string;
  message: string;
  surConfirmer: () => void;
  surAnnuler: () => void;
  texteConfirmer?: string;
  enChargement?: boolean;
}

export const Confirmation: React.FC<ConfirmationProps> = ({
  ouvert,
  titre,
  message,
  surConfirmer,
  surAnnuler,
  texteConfirmer = "Confirmer",
  enChargement = false,
}) => {
  return (
    <Modal
      ouvert={ouvert}
      surFermeture={surAnnuler}
      titre={titre}
      piedDePage={
        <>
          <Bouton variante="neutre" onClick={surAnnuler} disabled={enChargement}>
            Annuler
          </Bouton>
          <Bouton variante="danger" onClick={surConfirmer} enChargement={enChargement}>
            {texteConfirmer}
          </Bouton>
        </>
      }
    >
      <p className="text-sm text-slate-300 leading-relaxed">{message}</p>
    </Modal>
  );
};
