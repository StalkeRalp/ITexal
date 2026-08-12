import { Test, TestingModule } from '@nestjs/testing';
import { MarquesService } from './marques.service';
import { NotFoundException } from '@nestjs/common';

describe('MarquesService', () => {
  let service: MarquesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarquesService],
    }).compile();

    service = module.get<MarquesService>(MarquesService);
  });

  it('devrait être défini', () => {
    expect(service).toBeDefined();
  });

  it('devrait lister les marques', async () => {
    const res = await service.lister();
    expect(res.succes).toBe(true);
    expect(Array.isArray(res.donnees)).toBe(true);
    expect(res.donnees.length).toBeGreaterThan(0);
  });

  it('devrait créer une marque avec un logo valide', async () => {
    const nouvelleMarque = {
      nom: 'Test Dermo Care',
      logo: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==',
      description: 'Marque de test de soins',
      paysOrigine: 'Cameroun',
    };

    const res = await service.creer(nouvelleMarque);
    expect(res.succes).toBe(true);
    expect(res.donnees.nom).toBe('Test Dermo Care');
    expect(res.donnees.logo).toBe(nouvelleMarque.logo);
  });

  it('devrait lever une exception si la marque n\'existe pas', async () => {
    await expect(service.trouverParId('marq-inconnue')).rejects.toThrow(
      NotFoundException
    );
  });
});
