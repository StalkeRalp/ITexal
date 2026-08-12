import { Injectable } from '@nestjs/common';

@Injectable()
export class DashboardService {
  async obtenirStatistiques() {
    return {
      succes: true,
      donnees: {
        totalVentes: 12450000,
        nombreCommandes: 148,
        nombreClients: 42,
        produitsEnRupture: 3,
        ventesRecentes: [
          { date: '10/08', montant: 450000 },
          { date: '11/08', montant: 620000 },
          { date: '12/08', montant: 780000 },
        ],
      },
    };
  }
}
