export declare class MarquesService {
    private marques;
    lister(): Promise<{
        succes: boolean;
        donnees: {
            id: string;
            nom: string;
            logo: string;
            paysOrigine: string;
            description: string;
            statut: string;
            nombreProduits: number;
            creeLe: string;
        }[];
    }>;
    trouverParId(id: string): Promise<{
        succes: boolean;
        donnees: {
            id: string;
            nom: string;
            logo: string;
            paysOrigine: string;
            description: string;
            statut: string;
            nombreProduits: number;
            creeLe: string;
        };
    }>;
    creer(donnees: any): Promise<{
        succes: boolean;
        message: string;
        donnees: {
            id: string;
            nom: any;
            description: any;
            logo: any;
            paysOrigine: any;
            statut: any;
            nombreProduits: number;
            creeLe: string;
        };
    }>;
    modifier(id: string, modifs: any): Promise<{
        succes: boolean;
        message: string;
        donnees: {
            id: string;
            nom: string;
            logo: string;
            paysOrigine: string;
            description: string;
            statut: string;
            nombreProduits: number;
            creeLe: string;
        };
    }>;
    supprimer(id: string): Promise<{
        succes: boolean;
        message: string;
    }>;
}
