import { Test, TestingModule } from '@nestjs/testing';
import { PromotionsService } from './promotions.service';
import { NotFoundException } from '@nestjs/common';

describe('PromotionsService', () => {
  let service: PromotionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PromotionsService],
    }).compile();

    service = module.get<PromotionsService>(PromotionsService);
  });

  it('devrait lister les promotions', async () => {
    const res = await service.lister();
    expect(res.succes).toBe(true);
    expect(res.donnees.length).toBeGreaterThan(0);
  });

  it('devrait créer une promotion', async () => {
    const res = await service.creer({ code: 'FLASH30', reductionPourcentage: 30 });
    expect(res.succes).toBe(true);
    expect(res.donnees.code).toBe('FLASH30');
  });

  it('devrait modifier une promotion', async () => {
    const res = await service.modifier('promo-01', { reductionPourcentage: 25 });
    expect(res.succes).toBe(true);
    expect(res.donnees.reductionPourcentage).toBe(25);
  });

  it('devrait lever NotFoundException pour une modification de promotion inexistante', async () => {
    await expect(service.modifier('promo-999', { code: 'INVALIDE' })).rejects.toThrow(NotFoundException);
  });

  it('devrait supprimer une promotion', async () => {
    const res = await service.supprimer('promo-01');
    expect(res.succes).toBe(true);
  });
});
