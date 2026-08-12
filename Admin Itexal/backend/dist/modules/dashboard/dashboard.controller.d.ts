import { DashboardService } from './dashboard.service';
export declare class DashboardController {
    private readonly dashboardService;
    constructor(dashboardService: DashboardService);
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
