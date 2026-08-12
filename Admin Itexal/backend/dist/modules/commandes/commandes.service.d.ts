export declare class CommandesService {
    private commandes;
    lister(): Promise<{
        succes: boolean;
        donnees: {
            id: string;
            reference: string;
            clientNom: string;
            clientEmail: string;
            montantTotal: number;
            statut: string;
            methodePaiement: string;
            dateCommande: string;
        }[];
    }>;
    trouverParId(id: string): Promise<{
        succes: boolean;
        donnees: {
            id: string;
            reference: string;
            clientNom: string;
            clientEmail: string;
            montantTotal: number;
            statut: string;
            methodePaiement: string;
            dateCommande: string;
        };
    }>;
    modifierStatut(id: string, statut: string): Promise<{
        succes: boolean;
        message: string;
        donnees: {
            id: string;
            reference: string;
            clientNom: string;
            clientEmail: string;
            montantTotal: number;
            statut: string;
            methodePaiement: string;
            dateCommande: string;
        };
    }>;
}
