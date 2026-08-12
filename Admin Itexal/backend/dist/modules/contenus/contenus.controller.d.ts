import { ContenusService } from './contenus.service';
export declare class ContenusController {
    private readonly contenusService;
    constructor(contenusService: ContenusService);
    obtenir(): Promise<{
        succes: boolean;
        donnees: {
            banniereAccueil: {
                titre: string;
                sousTitre: string;
                texteBouton: string;
                image: string;
            };
            actualites: {
                id: string;
                titre: string;
                date: string;
            }[];
        };
    }>;
    modifier(nouveauxContenus: any): Promise<{
        succes: boolean;
        message: string;
        donnees: {
            banniereAccueil: {
                titre: string;
                sousTitre: string;
                texteBouton: string;
                image: string;
            };
            actualites: {
                id: string;
                titre: string;
                date: string;
            }[];
        };
    }>;
}
