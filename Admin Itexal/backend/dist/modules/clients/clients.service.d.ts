export declare class ClientsService {
    private clients;
    lister(): Promise<{
        succes: boolean;
        donnees: {
            id: string;
            nomComplet: string;
            email: string;
            telephone: string;
            ville: string;
            dateInscription: string;
            totalCommandes: number;
            totalDepense: number;
            statut: string;
        }[];
    }>;
    trouverParId(id: string): Promise<{
        succes: boolean;
        donnees: {
            id: string;
            nomComplet: string;
            email: string;
            telephone: string;
            ville: string;
            dateInscription: string;
            totalCommandes: number;
            totalDepense: number;
            statut: string;
        };
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
            nomComplet: string;
            email: string;
            telephone: string;
            ville: string;
            dateInscription: string;
            totalCommandes: number;
            totalDepense: number;
            statut: string;
        };
    }>;
    supprimer(id: string): Promise<{
        succes: boolean;
        message: string;
    }>;
}
