import React from "react";
import {
  Tick01Icon,
  AlertCircleIcon,
  InformationCircleIcon,
  Alert01Icon,
  Cancel01Icon,
} from "hugeicons-react";

interface NotificationProps {
  type: "succes" | "erreur" | "info" | "avertissement";
  message: string;
  surFermeture?: () => void;
}

export const Notification: React.FC<NotificationProps> = ({
  type,
  message,
  surFermeture,
}) => {
  const styles = {
    succes: "bg-emerald-950/80 border-emerald-800 text-emerald-300",
    erreur: "bg-rose-950/80 border-rose-800 text-rose-300",
    info: "bg-sky-950/80 border-sky-800 text-sky-300",
    avertissement: "bg-amber-950/80 border-amber-800 text-amber-300",
  };

  const Icones = {
    succes: Tick01Icon,
    erreur: AlertCircleIcon,
    info: InformationCircleIcon,
    avertissement: Alert01Icon,
  };

  const Icon = Icones[type];

  return (
    <div className={`p-4 border rounded-2xl flex items-center justify-between shadow-lg text-sm ${styles[type]}`}>
      <div className="flex items-center gap-3">
        <Icon size={20} strokeWidth={2} className="shrink-0" />
        <span>{message}</span>
      </div>
      {surFermeture && (
        <button
          type="button"
          onClick={surFermeture}
          aria-label="Fermer la notification"
          className="ml-4 p-1 rounded-lg hover:opacity-75 transition-opacity"
        >
          <Cancel01Icon size={16} strokeWidth={2} />
        </button>
      )}
    </div>
  );
};
