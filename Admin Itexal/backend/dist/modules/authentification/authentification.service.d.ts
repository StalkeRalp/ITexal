import { JwtService } from '@nestjs/jwt';
export declare class AuthentificationService {
    private readonly jwtService;
    private readonly utilisateurs;
    constructor(jwtService: JwtService);
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
    hacherMotDePasse(motDePasseClair: string): Promise<string>;
    verifierMotDePasse(motDePasseClair: string, hash: string): Promise<boolean>;
}
