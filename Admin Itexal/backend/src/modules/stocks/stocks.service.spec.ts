import { Test, TestingModule } from '@nestjs/testing';
import { StocksService } from './stocks.service';
import { NotFoundException } from '@nestjs/common';

describe('StocksService', () => {
  let service: StocksService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [StocksService],
    }).compile();

    service = module.get<StocksService>(StocksService);
  });

  it('devrait lister le stock des produits', async () => {
    const res = await service.lister();
    expect(res.succes).toBe(true);
    expect(res.donnees.length).toBeGreaterThan(0);
  });

  it('devrait ajuster la quantité de stock et mettre le statut en Alerte Stock Faible si sous le seuil', async () => {
    const res = await service.ajusterStock('prod-01', { stock: 5, seuilMin: 10 });
    expect(res.succes).toBe(true);
    expect(res.donnees.stock).toBe(5);
    expect(res.donnees.statut).toBe('Alerte Stock Faible');
  });

  it('devrait passer le statut à Suffisant si le stock dépasse le seuil', async () => {
    const res = await service.ajusterStock('prod-02', { stock: 50 });
    expect(res.succes).toBe(true);
    expect(res.donnees.statut).toBe('Suffisant');
  });

  it('devrait lever NotFoundException pour un produit inexistant', async () => {
    await expect(service.ajusterStock('prod-999', { stock: 10 })).rejects.toThrow(NotFoundException);
  });
});
