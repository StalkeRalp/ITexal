import { JournalService } from './journal.service';
export declare class JournalController {
    private readonly journalService;
    constructor(journalService: JournalService);
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
