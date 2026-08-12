import { Test, TestingModule } from '@nestjs/testing';
import { CategoriesService } from './categories.service';
import { NotFoundException } from '@nestjs/common';

describe('CategoriesService', () => {
  let service: CategoriesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CategoriesService],
    }).compile();

    service = module.get<CategoriesService>(CategoriesService);
  });

  it('devrait lister les catégories', async () => {
    const res = await service.lister();
    expect(res.succes).toBe(true);
    expect(res.donnees.length).toBeGreaterThan(0);
  });

  it('devrait trouver une catégorie par id', async () => {
    const res = await service.trouverParId('cat-01');
    expect(res.succes).toBe(true);
    expect(res.donnees.nom).toBe('Visage');
  });

  it('devrait lever NotFoundException pour une catégorie inexistante', async () => {
    await expect(service.trouverParId('cat-999')).rejects.toThrow(NotFoundException);
  });

  it('devrait créer une nouvelle catégorie', async () => {
    const res = await service.creer({ nom: 'Capillaire', description: 'Soins cheveu' });
    expect(res.succes).toBe(true);
    expect(res.donnees.nom).toBe('Capillaire');
  });

  it('devrait modifier une catégorie existante', async () => {
    const res = await service.modifier('cat-01', { nom: 'Soins Visage Bio' });
    expect(res.succes).toBe(true);
    expect(res.donnees.nom).toBe('Soins Visage Bio');
  });

  it('devrait lever NotFoundException si la catégorie à modifier n\'existe pas', async () => {
    await expect(service.modifier('cat-999', { nom: 'Inexistant' })).rejects.toThrow(NotFoundException);
  });

  it('devrait supprimer une catégorie', async () => {
    const res = await service.supprimer('cat-01');
    expect(res.succes).toBe(true);
  });
});
