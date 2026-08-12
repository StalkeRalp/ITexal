import { CategoriesService } from './categories.service';
export declare class CategoriesController {
    private readonly categoriesService;
    constructor(categoriesService: CategoriesService);
    lister(): Promise<{
        succes: boolean;
        donnees: {
            id: string;
            nom: string;
            description: string;
            nombreProduits: number;
            creeLe: string;
        }[];
    }>;
    trouverParId(id: string): Promise<{
        succes: boolean;
        donnees: {
            id: string;
            nom: string;
            description: string;
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
            description: string;
            nombreProduits: number;
            creeLe: string;
        };
    }>;
    supprimer(id: string): Promise<{
        succes: boolean;
        message: string;
    }>;
}
