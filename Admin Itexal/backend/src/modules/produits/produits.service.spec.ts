import { Test, TestingModule } from '@nestjs/testing';
import { ProduitsService } from './produits.service';
import { NotFoundException } from '@nestjs/common';

describe('ProduitsService', () => {
  let service: ProduitsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProduitsService],
    }).compile();

    service = module.get<ProduitsService>(ProduitsService);
  });

  it('devrait être défini', () => {
    expect(service).toBeDefined();
  });

  it('devrait lister les produits', async () => {
    const res = await service.lister();
    expect(res.succes).toBe(true);
    expect(Array.isArray(res.donnees)).toBe(true);
  });

  it('devrait créer un nouveau produit avec une référence unique', async () => {
    const produit = {
      nom: 'Crème Solaire Haute Protection',
      reference: 'ITX-SOL-009',
      prix: 25000,
      stock: 30,
      nomCategorie: 'Visage',
      nomMarque: 'ITexal Cosméceutiques',
    };

    const res = await service.creer(produit);
    expect(res.succes).toBe(true);
    expect(res.donnees.nom).toBe('Crème Solaire Haute Protection');
  });

  it('devrait lever une exception lors de la suppression d\'un produit inexistant', async () => {
    await expect(service.trouverParId('prod-999')).rejects.toThrow(
      NotFoundException
    );
  });
});
