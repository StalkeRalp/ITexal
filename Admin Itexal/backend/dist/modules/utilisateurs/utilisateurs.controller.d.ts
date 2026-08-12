import { UtilisateursService } from './utilisateurs.service';
export declare class UtilisateursController {
    private readonly utilisateursService;
    constructor(utilisateursService: UtilisateursService);
    lister(): Promise<{
        succes: boolean;
        donnees: {
            id: string;
            nom: string;
            email: string;
            role: string;
            statut: string;
            creeLe: string;
        }[];
    }>;
    trouverParId(id: string): Promise<{
        succes: boolean;
        donnees: {
            id: string;
            nom: string;
            email: string;
            role: string;
            statut: string;
            creeLe: string;
        };
    }>;
    creer(donnees: any): Promise<{
        succes: boolean;
        message: string;
        donnees: {
            id: string;
            nom: any;
            email: any;
            role: any;
            statut: string;
            creeLe: string;
        };
    }>;
    modifier(id: string, modifs: any): Promise<{
        succes: boolean;
        message: string;
        donnees: {
            id: string;
            nom: string;
            email: string;
            role: string;
            statut: string;
            creeLe: string;
        };
    }>;
    supprimer(id: string): Promise<{
        succes: boolean;
        message: string;
    }>;
}
