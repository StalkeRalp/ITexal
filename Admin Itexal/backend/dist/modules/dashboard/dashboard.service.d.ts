export declare class DashboardService {
    obtenirStatistiques(): Promise<{
        succes: boolean;
        donnees: {
            totalVentes: number;
            nombreCommandes: number;
            nombreClients: number;
            produitsEnRupture: number;
            ventesRecentes: {
                date: string;
                montant: number;
            }[];
        };
    }>;
}
