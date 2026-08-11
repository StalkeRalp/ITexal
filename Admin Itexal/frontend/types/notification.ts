/**
 * Modèle de données central : Notification
 */

export type TypeNotification =
  | "commande"
  | "stock"
  | "client"
  | "paiement"
  | "promotion"
  | "systeme";

export interface NotificationItem {
  id: string;
  titre: string;
  message: string;
  type: TypeNotification;
  horodatage: string;
  lu: boolean;
  lien?: string;
  entiteId?: string;
}
