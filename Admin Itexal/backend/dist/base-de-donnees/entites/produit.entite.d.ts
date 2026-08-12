export declare class EntiteProduit {
    id: string;
    nom: string;
    reference: string;
    description: string;
    prix: number;
    prixPromotionnel?: number;
    composition?: string;
    typeDePeau?: string;
    contenance?: string;
    origine?: string;
    conseilsUtilisation?: string;
    precautions?: string;
    categorieId: string;
    marqueId: string;
    creeLe: Date;
    misAJourLe: Date;
}
