export declare class ContenusService {
    private contenus;
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
