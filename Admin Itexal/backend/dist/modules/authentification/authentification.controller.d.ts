import { AuthentificationService } from './authentification.service';
export declare class AuthentificationController {
    private readonly authentificationService;
    constructor(authentificationService: AuthentificationService);
    connecter(donnees: {
        email: string;
        motDePasse: string;
    }): Promise<{
        succes: boolean;
        message: string;
        jeton: string;
        utilisateur: {
            id: string;
            nom: string;
            email: string;
            role: string;
        };
    }>;
    login(donnees: {
        email: string;
        motDePasse: string;
    }): Promise<{
        succes: boolean;
        message: string;
        jeton: string;
        utilisateur: {
            id: string;
            nom: string;
            email: string;
            role: string;
        };
    }>;
    obtenirProfil(utilisateur: any): Promise<{
        succes: boolean;
        donnees: any;
    }>;
}
