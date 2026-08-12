export declare class JournalService {
    private logs;
    lister(): Promise<{
        succes: boolean;
        donnees: {
            id: string;
            horodatage: string;
            utilisateurId: string;
            nomUtilisateur: string;
            roleUtilisateur: string;
            typeEvenement: string;
            action: string;
            description: string;
            niveauSeverite: string;
            adresseIP: string;
        }[];
    }>;
    enregistrer(log: any): Promise<{
        succes: boolean;
        message: string;
        donnees: any;
    }>;
}
