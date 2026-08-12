import { ParametresService } from './parametres.service';
export declare class ParametresController {
    private readonly parametresService;
    constructor(parametresService: ParametresService);
    obtenir(): Promise<{
        succes: boolean;
        donnees: {
            nomSite: string;
            devise: string;
            tva: number;
            emailSupport: string;
            telephoneSupport: string;
            notificationsEmail: boolean;
        };
    }>;
    modifier(nouveauxParametres: any): Promise<{
        succes: boolean;
        message: string;
        donnees: {
            nomSite: string;
            devise: string;
            tva: number;
            emailSupport: string;
            telephoneSupport: string;
            notificationsEmail: boolean;
        };
    }>;
}
