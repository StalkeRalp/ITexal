import { CommandesService } from './commandes.service';
export declare class CommandesController {
    private readonly commandesService;
    constructor(commandesService: CommandesService);
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
