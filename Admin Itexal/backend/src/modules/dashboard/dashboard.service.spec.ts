import { Test, TestingModule } from '@nestjs/testing';
import { DashboardService } from './dashboard.service';

describe('DashboardService', () => {
  let service: DashboardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DashboardService],
    }).compile();

    service = module.get<DashboardService>(DashboardService);
  });

  it('devrait retourner les statistiques du dashboard', async () => {
    const res = await service.obtenirStatistiques();
    expect(res.succes).toBe(true);
    expect(res.donnees.totalVentes).toBeGreaterThan(0);
    expect(Array.isArray(res.donnees.ventesRecentes)).toBe(true);
  });
});
