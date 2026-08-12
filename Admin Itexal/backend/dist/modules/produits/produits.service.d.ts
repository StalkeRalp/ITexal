export declare class ProduitsService {
    private produits;
    lister(): Promise<{
        succes: boolean;
        donnees: {
            id: string;
            nom: string;
            reference: string;
            prix: number;
            stock: number;
            nomCategorie: string;
            nomMarque: string;
            disponible: boolean;
            creeLe: string;
        }[];
    }>;
    trouverParId(id: string): Promise<{
        succes: boolean;
        donnees: {
            id: string;
            nom: string;
            reference: string;
            prix: number;
            stock: number;
            nomCategorie: string;
            nomMarque: string;
            disponible: boolean;
            creeLe: string;
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
            nom: string;
            reference: string;
            prix: number;
            stock: number;
            nomCategorie: string;
            nomMarque: string;
            disponible: boolean;
            creeLe: string;
        };
    }>;
    supprimer(id: string): Promise<{
        succes: boolean;
        message: string;
    }>;
}
