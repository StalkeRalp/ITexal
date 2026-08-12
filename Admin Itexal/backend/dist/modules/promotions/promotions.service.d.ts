export declare class PromotionsService {
    private promotions;
    lister(): Promise<{
        succes: boolean;
        donnees: {
            id: string;
            code: string;
            reductionPourcentage: number;
            dateDebut: string;
            dateFin: string;
            statut: string;
            nombreUtilisations: number;
        }[];
    }>;
    creer(donnees: any): Promise<{
        succes: boolean;
        message: string;
        donnees: any;
    }>;
    modifier(id: string, modifs: any): Promise<{
        succes: boolean;
        message: string;
        donnees: {
            id: string;
            code: string;
            reductionPourcentage: number;
            dateDebut: string;
            dateFin: string;
            statut: string;
            nombreUtilisations: number;
        };
    }>;
    supprimer(id: string): Promise<{
        succes: boolean;
        message: string;
    }>;
}
